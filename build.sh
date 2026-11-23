#!/usr/bin/env bash
# Regenera los .js planos a partir de los .jsx fuente.
# El navegador carga los .js ya transpilados (sin Babel en runtime).
# Requiere `bun` (o ajusta a esbuild/tsc). Ejecuta: bash build.sh
set -e
cd "$(dirname "$0")"

for name in exercises app; do
  bun build "src/$name.jsx" \
    --no-bundle \
    --jsx-runtime classic \
    --jsx-factory React.createElement \
    --jsx-fragment React.Fragment \
    --outfile "src/$name.js"
  echo "✓ src/$name.jsx → src/$name.js"
done

echo "Listo. Abre index.html servido por HTTP."
