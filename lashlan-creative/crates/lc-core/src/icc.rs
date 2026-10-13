//! Minimal ICC profile inspection.
//!
//! v0.1 does **not** perform arbitrary ICC -> working-space conversion. What it
//! does do is tell the truth: it reports whether an embedded profile exists and
//! whether it is an sRGB-class profile. Anything else is surfaced to the user as
//! *unmanaged*, so a wide-gamut file is never silently rendered as if it were
//! sRGB without the user being told.

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum IccStatus {
    /// No embedded profile. Treated as sRGB, which is the correct default for
    /// untagged JPEG/PNG on the web.
    Absent,
    /// An embedded profile whose description identifies it as sRGB.
    Srgb { description: String },
    /// An embedded profile we can read but will not convert from.
    Unmanaged { description: String },
    /// Bytes were present but could not be parsed as an ICC profile.
    Unreadable,
}

impl IccStatus {
    /// True when the decoded pixels can be trusted as sRGB-encoded.
    pub fn is_srgb_assumption_safe(&self) -> bool {
        matches!(self, IccStatus::Absent | IccStatus::Srgb { .. })
    }

    pub fn summary(&self) -> String {
        match self {
            IccStatus::Absent => "no embedded profile (assuming sRGB)".to_string(),
            IccStatus::Srgb { description } => format!("sRGB ({description})"),
            IccStatus::Unmanaged { description } => {
                format!("UNMANAGED: {description} — conversion not supported in v0.1")
            }
            IccStatus::Unreadable => "embedded profile present but unreadable".to_string(),
        }
    }
}

pub fn inspect(profile: Option<&[u8]>) -> IccStatus {
    let Some(bytes) = profile else {
        return IccStatus::Absent;
    };
    match description(bytes) {
        Some(desc) => {
            let lower = desc.to_ascii_lowercase();
            if lower.contains("srgb") {
                IccStatus::Srgb { description: desc }
            } else {
                IccStatus::Unmanaged { description: desc }
            }
        }
        None => IccStatus::Unreadable,
    }
}

fn be_u32(b: &[u8], at: usize) -> Option<u32> {
    let s = b.get(at..at + 4)?;
    Some(u32::from_be_bytes([s[0], s[1], s[2], s[3]]))
}

/// Read the `desc` tag of an ICC profile, handling both the v2
/// `textDescriptionType` and the v4 `multiLocalizedUnicodeType`.
fn description(bytes: &[u8]) -> Option<String> {
    if bytes.len() < 132 {
        return None;
    }
    // Byte 36..40 must be the 'acsp' signature.
    if &bytes[36..40] != b"acsp" {
        return None;
    }
    let tag_count = be_u32(bytes, 128)? as usize;
    if tag_count > 1024 {
        return None;
    }
    for i in 0..tag_count {
        let entry = 132 + i * 12;
        let sig = bytes.get(entry..entry + 4)?;
        let offset = be_u32(bytes, entry + 4)? as usize;
        let size = be_u32(bytes, entry + 8)? as usize;
        if sig != b"desc" {
            continue;
        }
        let tag = bytes.get(offset..offset.checked_add(size)?)?;
        let kind = tag.get(0..4)?;
        if kind == b"desc" {
            // v2: 4 sig + 4 reserved + 4 ascii length, then NUL-terminated ascii.
            let len = be_u32(tag, 8)? as usize;
            let text = tag.get(12..12 + len)?;
            let text = text.split(|&c| c == 0).next().unwrap_or(&[]);
            return Some(String::from_utf8_lossy(text).trim().to_string());
        }
        if kind == b"mluc" {
            // v4: records of (lang, country, length, offset) after a 16-byte head.
            let records = be_u32(tag, 8)? as usize;
            if records == 0 {
                return None;
            }
            let len = be_u32(tag, 20)? as usize;
            let off = be_u32(tag, 24)? as usize;
            let raw = tag.get(off..off.checked_add(len)?)?;
            let utf16: Vec<u16> = raw
                .chunks_exact(2)
                .map(|c| u16::from_be_bytes([c[0], c[1]]))
                .collect();
            return Some(String::from_utf16_lossy(&utf16).trim().to_string());
        }
        return None;
    }
    None
}

#[cfg(test)]
mod tests {
    use super::*;

    /// Build a minimal but structurally valid ICC profile carrying one v2
    /// `desc` tag, so the parser is exercised without shipping a binary blob.
    fn fake_profile(desc: &str) -> Vec<u8> {
        let text = desc.as_bytes();
        let tag_size = 12 + text.len() + 1;
        let tag_offset = 132 + 12;
        let mut p = vec![0u8; tag_offset + tag_size];
        p[36..40].copy_from_slice(b"acsp");
        p[128..132].copy_from_slice(&1u32.to_be_bytes());
        p[132..136].copy_from_slice(b"desc");
        p[136..140].copy_from_slice(&(tag_offset as u32).to_be_bytes());
        p[140..144].copy_from_slice(&(tag_size as u32).to_be_bytes());
        p[tag_offset..tag_offset + 4].copy_from_slice(b"desc");
        p[tag_offset + 8..tag_offset + 12]
            .copy_from_slice(&((text.len() + 1) as u32).to_be_bytes());
        p[tag_offset + 12..tag_offset + 12 + text.len()].copy_from_slice(text);
        let total = p.len() as u32;
        p[0..4].copy_from_slice(&total.to_be_bytes());
        p
    }

    #[test]
    fn absent_profile_is_srgb_safe() {
        assert!(inspect(None).is_srgb_assumption_safe());
    }

    #[test]
    fn srgb_profile_is_recognised() {
        let p = fake_profile("sRGB IEC61966-2.1");
        let s = inspect(Some(&p));
        assert!(matches!(s, IccStatus::Srgb { .. }), "{s:?}");
        assert!(s.is_srgb_assumption_safe());
    }

    #[test]
    fn wide_gamut_profile_is_flagged_unmanaged_not_assumed() {
        let p = fake_profile("Display P3");
        let s = inspect(Some(&p));
        assert!(matches!(s, IccStatus::Unmanaged { .. }), "{s:?}");
        assert!(!s.is_srgb_assumption_safe());
    }

    #[test]
    fn garbage_is_unreadable_not_a_panic() {
        assert_eq!(inspect(Some(&[1, 2, 3])), IccStatus::Unreadable);
        assert_eq!(inspect(Some(&[0u8; 400])), IccStatus::Unreadable);
    }
}
