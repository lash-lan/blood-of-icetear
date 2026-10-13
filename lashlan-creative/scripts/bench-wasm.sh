#!/usr/bin/env bash
# Serve the benchmark page so it can be opened in a real browser, on a real
# phone if one is on the same network. Numbers from an emulator are an
# estimate; numbers from a handset are a measurement.
set -euo pipefail
cd "$(dirname "$0")/../web"
PORT="${1:-8900}"
echo "Open http://localhost:$PORT/bench.html on this machine,"
echo "or http://<this machine's address>:$PORT/bench.html on a phone."
python3 -m http.server "$PORT"
