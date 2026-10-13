#!/usr/bin/env bash
# The full gate: formatting, lints, every test, then the end-to-end smoke test.
# Run this before every commit. Exits non-zero on the first failure.
set -euo pipefail
cd "$(dirname "$0")/.."
echo "== rustfmt";  cargo fmt --all --check
echo "== clippy";   cargo clippy --all-targets -- -D warnings -A clippy::field_reassign_with_default
echo "== tests";    cargo test --all
echo "== smoke";    ./scripts/smoke.sh
echo
echo "ALL CHECKS PASSED"
