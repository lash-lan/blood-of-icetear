//! Versioned, portable, non-destructive edit recipes.
//!
//! A recipe is the *only* thing Darkroom stores about an edit. The original
//! file on disk is never modified. Every field has a neutral default, so an
//! empty recipe renders a bit-faithful copy of the decoded source.

use serde::{Deserialize, Serialize};

/// Schema version understood by this build. Bump on any breaking change and
/// add a migration in [`EditRecipe::from_json`].
pub const RECIPE_SCHEMA_VERSION: u32 = 1;

/// Clockwise rotation in 90-degree steps. Arbitrary-angle straightening is
/// deliberately **not** offered in v0.1 (see docs/FEATURE_MATRIX.md).
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Default)]
pub enum Rotate {
    #[default]
    None,
    Cw90,
    Cw180,
    Cw270,
}

impl Rotate {
    pub fn parse(s: &str) -> Option<Self> {
        match s.trim() {
            "0" | "none" => Some(Rotate::None),
            "90" => Some(Rotate::Cw90),
            "180" => Some(Rotate::Cw180),
            "270" => Some(Rotate::Cw270),
            _ => None,
        }
    }
    pub fn degrees(self) -> u32 {
        match self {
            Rotate::None => 0,
            Rotate::Cw90 => 90,
            Rotate::Cw180 => 180,
            Rotate::Cw270 => 270,
        }
    }
}

/// Crop rectangle in **source pixel coordinates**, applied before rotation.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub struct Crop {
    pub x: u32,
    pub y: u32,
    pub width: u32,
    pub height: u32,
}

/// The adjustment set. Ranges are documented per field and are *clamped*, not
/// rejected, so a recipe written by a newer build with a wider range still
/// renders sensibly.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(default)]
pub struct Adjustments {
    /// Exposure in stops (EV). Linear gain of 2^ev. Range -5..=5.
    pub exposure_ev: f32,
    /// Perceptual contrast around mid grey. Range -1..=1.
    pub contrast: f32,
    /// Highlight recovery / boost, masked to the upper tones. Range -1..=1.
    pub highlights: f32,
    /// Shadow lift / crush, masked to the lower tones. Range -1..=1.
    pub shadows: f32,
    /// Relative white balance along the blue<->amber axis. Range -1..=1.
    /// NOTE: relative, not absolute Kelvin — absolute Kelvin needs RAW sensor
    /// metadata, which v0.1 does not read.
    pub temperature: f32,
    /// Relative white balance along the green<->magenta axis. Range -1..=1.
    pub tint: f32,
    /// Uniform saturation. Range -1..=1 (-1 is fully greyscale).
    pub saturation: f32,
    /// Saturation weighted towards already-muted colours. Range -1..=1.
    pub vibrance: f32,
}

impl Default for Adjustments {
    fn default() -> Self {
        Self {
            exposure_ev: 0.0,
            contrast: 0.0,
            highlights: 0.0,
            shadows: 0.0,
            temperature: 0.0,
            tint: 0.0,
            saturation: 0.0,
            vibrance: 0.0,
        }
    }
}

/// Every individually resettable control.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Control {
    Exposure,
    Contrast,
    Highlights,
    Shadows,
    Temperature,
    Tint,
    Saturation,
    Vibrance,
    Crop,
    Rotate,
}

impl Control {
    pub const ALL: [Control; 10] = [
        Control::Exposure,
        Control::Contrast,
        Control::Highlights,
        Control::Shadows,
        Control::Temperature,
        Control::Tint,
        Control::Saturation,
        Control::Vibrance,
        Control::Crop,
        Control::Rotate,
    ];

    pub fn parse(s: &str) -> Option<Self> {
        match s.trim().to_ascii_lowercase().as_str() {
            "exposure" => Some(Control::Exposure),
            "contrast" => Some(Control::Contrast),
            "highlights" => Some(Control::Highlights),
            "shadows" => Some(Control::Shadows),
            "temperature" | "temp" => Some(Control::Temperature),
            "tint" => Some(Control::Tint),
            "saturation" | "sat" => Some(Control::Saturation),
            "vibrance" => Some(Control::Vibrance),
            "crop" => Some(Control::Crop),
            "rotate" => Some(Control::Rotate),
            _ => None,
        }
    }

    pub fn name(self) -> &'static str {
        match self {
            Control::Exposure => "exposure",
            Control::Contrast => "contrast",
            Control::Highlights => "highlights",
            Control::Shadows => "shadows",
            Control::Temperature => "temperature",
            Control::Tint => "tint",
            Control::Saturation => "saturation",
            Control::Vibrance => "vibrance",
            Control::Crop => "crop",
            Control::Rotate => "rotate",
        }
    }
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct EditRecipe {
    /// Schema version of this recipe document.
    pub schema_version: u32,
    #[serde(default)]
    pub adjustments: Adjustments,
    #[serde(default)]
    pub crop: Option<Crop>,
    #[serde(default)]
    pub rotate: Rotate,
}

impl Default for EditRecipe {
    fn default() -> Self {
        Self {
            schema_version: RECIPE_SCHEMA_VERSION,
            adjustments: Adjustments::default(),
            crop: None,
            rotate: Rotate::None,
        }
    }
}

impl EditRecipe {
    /// True when the recipe would leave the decoded source untouched.
    pub fn is_neutral(&self) -> bool {
        self.adjustments == Adjustments::default()
            && self.crop.is_none()
            && self.rotate == Rotate::None
    }

    pub fn to_json(&self) -> String {
        serde_json::to_string_pretty(self).expect("recipe is always serialisable")
    }

    /// Parse a recipe, refusing a schema version this build does not
    /// understand rather than silently mis-rendering it.
    pub fn from_json(s: &str) -> crate::Result<Self> {
        #[derive(Deserialize)]
        struct Probe {
            schema_version: u32,
        }
        let probe: Probe = serde_json::from_str(s)?;
        if probe.schema_version > RECIPE_SCHEMA_VERSION {
            return Err(crate::CoreError::RecipeVersion {
                found: probe.schema_version,
                supported: RECIPE_SCHEMA_VERSION,
            });
        }
        // Version 1 is the earliest; no migration steps exist yet.
        Ok(serde_json::from_str(s)?)
    }

    /// Reset a single control to its neutral value.
    pub fn reset(&mut self, control: Control) {
        let d = Adjustments::default();
        match control {
            Control::Exposure => self.adjustments.exposure_ev = d.exposure_ev,
            Control::Contrast => self.adjustments.contrast = d.contrast,
            Control::Highlights => self.adjustments.highlights = d.highlights,
            Control::Shadows => self.adjustments.shadows = d.shadows,
            Control::Temperature => self.adjustments.temperature = d.temperature,
            Control::Tint => self.adjustments.tint = d.tint,
            Control::Saturation => self.adjustments.saturation = d.saturation,
            Control::Vibrance => self.adjustments.vibrance = d.vibrance,
            Control::Crop => self.crop = None,
            Control::Rotate => self.rotate = Rotate::None,
        }
    }

    pub fn reset_all(&mut self) {
        *self = EditRecipe::default();
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn default_recipe_is_neutral() {
        assert!(EditRecipe::default().is_neutral());
    }

    #[test]
    fn json_roundtrip_preserves_every_field() {
        let mut r = EditRecipe::default();
        r.adjustments.exposure_ev = -1.25;
        r.adjustments.contrast = 0.4;
        r.adjustments.highlights = -0.3;
        r.adjustments.shadows = 0.6;
        r.adjustments.temperature = 0.2;
        r.adjustments.tint = -0.1;
        r.adjustments.saturation = 0.5;
        r.adjustments.vibrance = 0.25;
        r.crop = Some(Crop {
            x: 1,
            y: 2,
            width: 30,
            height: 40,
        });
        r.rotate = Rotate::Cw270;
        let back = EditRecipe::from_json(&r.to_json()).unwrap();
        assert_eq!(r, back);
    }

    #[test]
    fn missing_fields_fall_back_to_neutral() {
        let r = EditRecipe::from_json(r#"{"schema_version":1}"#).unwrap();
        assert!(r.is_neutral());
    }

    #[test]
    fn future_schema_version_is_refused_not_guessed() {
        let err = EditRecipe::from_json(r#"{"schema_version":99}"#).unwrap_err();
        assert!(matches!(
            err,
            crate::CoreError::RecipeVersion { found: 99, .. }
        ));
    }

    #[test]
    fn reset_touches_only_the_named_control() {
        let mut r = EditRecipe::default();
        r.adjustments.exposure_ev = 2.0;
        r.adjustments.contrast = 0.5;
        r.reset(Control::Exposure);
        assert_eq!(r.adjustments.exposure_ev, 0.0);
        assert_eq!(r.adjustments.contrast, 0.5);
    }

    #[test]
    fn every_control_name_parses_back() {
        for c in Control::ALL {
            assert_eq!(Control::parse(c.name()), Some(c));
        }
    }
}
