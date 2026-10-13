//! Undo/redo over edit recipes.
//!
//! The stack holds whole recipes, not diffs: a recipe is small, and storing it
//! whole means a restored session can never desynchronise from its history.

use crate::recipe::EditRecipe;
use serde::{Deserialize, Serialize};

/// Entries beyond this are dropped from the oldest end.
pub const MAX_HISTORY: usize = 200;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct HistoryEntry {
    pub label: String,
    pub recipe: EditRecipe,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct History {
    entries: Vec<HistoryEntry>,
    /// Index of the entry currently in effect.
    cursor: usize,
}

impl Default for History {
    fn default() -> Self {
        Self::new()
    }
}

impl History {
    pub fn new() -> Self {
        Self {
            entries: vec![HistoryEntry {
                label: "imported".to_string(),
                recipe: EditRecipe::default(),
            }],
            cursor: 0,
        }
    }

    pub fn current(&self) -> &EditRecipe {
        &self.entries[self.cursor].recipe
    }

    pub fn current_label(&self) -> &str {
        &self.entries[self.cursor].label
    }

    pub fn len(&self) -> usize {
        self.entries.len()
    }

    pub fn is_empty(&self) -> bool {
        false
    }

    pub fn cursor(&self) -> usize {
        self.cursor
    }

    pub fn labels(&self) -> Vec<&str> {
        self.entries.iter().map(|e| e.label.as_str()).collect()
    }

    /// Record a new state. Anything that had been undone is discarded, which is
    /// what every editor does and what users expect.
    pub fn push(&mut self, label: impl Into<String>, recipe: EditRecipe) {
        self.entries.truncate(self.cursor + 1);
        self.entries.push(HistoryEntry {
            label: label.into(),
            recipe,
        });
        if self.entries.len() > MAX_HISTORY {
            let overflow = self.entries.len() - MAX_HISTORY;
            self.entries.drain(0..overflow);
        }
        self.cursor = self.entries.len() - 1;
    }

    pub fn can_undo(&self) -> bool {
        self.cursor > 0
    }

    pub fn can_redo(&self) -> bool {
        self.cursor + 1 < self.entries.len()
    }

    /// Step back one state. Returns the label stepped away from.
    pub fn undo(&mut self) -> Option<String> {
        if !self.can_undo() {
            return None;
        }
        let was = self.entries[self.cursor].label.clone();
        self.cursor -= 1;
        Some(was)
    }

    /// Step forward one state. Returns the label stepped onto.
    pub fn redo(&mut self) -> Option<String> {
        if !self.can_redo() {
            return None;
        }
        self.cursor += 1;
        Some(self.entries[self.cursor].label.clone())
    }

    pub fn to_json(&self) -> String {
        serde_json::to_string(self).expect("history is always serialisable")
    }

    pub fn from_json(s: &str) -> crate::Result<Self> {
        let mut h: History = serde_json::from_str(s)?;
        if h.entries.is_empty() {
            h = History::new();
        }
        if h.cursor >= h.entries.len() {
            h.cursor = h.entries.len() - 1;
        }
        Ok(h)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn with_exposure(ev: f32) -> EditRecipe {
        let mut r = EditRecipe::default();
        r.adjustments.exposure_ev = ev;
        r
    }

    #[test]
    fn a_fresh_history_is_neutral_and_cannot_undo() {
        let mut h = History::new();
        assert!(h.current().is_neutral());
        assert!(!h.can_undo());
        assert!(!h.can_redo());
        assert!(h.undo().is_none());
    }

    #[test]
    fn undo_and_redo_walk_the_stack() {
        let mut h = History::new();
        h.push("exposure 1", with_exposure(1.0));
        h.push("exposure 2", with_exposure(2.0));
        assert_eq!(h.current().adjustments.exposure_ev, 2.0);
        h.undo();
        assert_eq!(h.current().adjustments.exposure_ev, 1.0);
        h.undo();
        assert!(h.current().is_neutral());
        assert!(!h.can_undo());
        h.redo();
        assert_eq!(h.current().adjustments.exposure_ev, 1.0);
        h.redo();
        assert_eq!(h.current().adjustments.exposure_ev, 2.0);
        assert!(!h.can_redo());
    }

    #[test]
    fn editing_after_an_undo_discards_the_abandoned_branch() {
        let mut h = History::new();
        h.push("a", with_exposure(1.0));
        h.push("b", with_exposure(2.0));
        h.undo();
        h.push("c", with_exposure(3.0));
        assert!(!h.can_redo());
        assert_eq!(h.current().adjustments.exposure_ev, 3.0);
        assert_eq!(h.labels(), vec!["imported", "a", "c"]);
    }

    #[test]
    fn the_stack_is_capped_but_keeps_the_newest_state() {
        let mut h = History::new();
        for i in 0..(MAX_HISTORY + 50) {
            h.push(format!("step {i}"), with_exposure(i as f32));
        }
        assert_eq!(h.len(), MAX_HISTORY);
        assert_eq!(
            h.current().adjustments.exposure_ev,
            (MAX_HISTORY + 49) as f32
        );
    }

    #[test]
    fn json_roundtrip_survives_a_restart() {
        let mut h = History::new();
        h.push("a", with_exposure(1.0));
        h.push("b", with_exposure(2.0));
        h.undo();
        let back = History::from_json(&h.to_json()).unwrap();
        assert_eq!(back.current().adjustments.exposure_ev, 1.0);
        assert!(back.can_redo());
        assert_eq!(back.cursor(), h.cursor());
    }

    #[test]
    fn a_corrupt_cursor_is_repaired_rather_than_panicking() {
        let json =
            r#"{"entries":[{"label":"imported","recipe":{"schema_version":1}}],"cursor":99}"#;
        let h = History::from_json(json).unwrap();
        assert_eq!(h.cursor(), 0);
        assert!(h.current().is_neutral());
    }
}
