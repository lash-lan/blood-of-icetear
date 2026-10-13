#!/usr/bin/env bash
# Regenerate docs/SBOM.tsv (software bill of materials) from the real
# dependency graph. No network access needed; reads the resolved lockfile.
set -euo pipefail
cd "$(dirname "$0")/.."
cargo metadata --format-version 1 --all-features | python3 -c "
import json, sys
m = json.load(sys.stdin)
local = {'lc-core', 'lc-catalog', 'darkroom-cli'}
rows = sorted({(p['name'], p['version'], p.get('license') or 'UNSTATED',
                p.get('repository') or '') for p in m['packages']
               if p['name'] not in local})
print('name\tversion\tlicense\trepository')
for r in rows:
    print('\t'.join(r))
" > docs/SBOM.tsv
echo "wrote docs/SBOM.tsv ($(($(wc -l < docs/SBOM.tsv) - 1)) third-party crates)"
