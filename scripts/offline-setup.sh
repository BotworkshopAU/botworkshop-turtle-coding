#!/usr/bin/env bash
# Offline class setup (macOS). From project root: bash scripts/offline-setup.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "== BotWorkshop Turtle · offline setup (Mac) =="

if [[ ! -d node_modules ]]; then
  ZIP="$ROOT/offline/npm/node_modules.zip"
  [[ -f "$ZIP" ]] || { echo "Missing $ZIP"; exit 1; }
  echo "Extracting node_modules.zip…"
  unzip -qo "$ZIP" -d "$ROOT"
else
  echo "node_modules already present — skip"
fi

echo ""
echo "Next (manual, once per laptop):"
echo "  1. Install Arduino IDE from: $ROOT/offline/arduino-ide/arduino-1.8.19-macosx.zip"
echo "  2. Install CP210x driver:    $ROOT/offline/drivers/cp210x/Mac_OSX_VCP_Driver.zip"
echo "     Allow in System Settings → Privacy & Security if blocked."
echo "  3. In Arduino IDE: Tools → Board → Arduino Uno"
echo ""
echo "Done extracting npm. Every class session:"
echo "  npm run dev"
echo "  Open http://localhost:5173/  → Code → Download .ino → Upload in Arduino IDE"
echo "  (Unplug Bluetooth before upload)"
