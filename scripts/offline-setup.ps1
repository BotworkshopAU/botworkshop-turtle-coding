# Offline class setup (Windows) — NO ADMIN required for Node + project packages.
# From project root:
#   powershell -ExecutionPolicy Bypass -File scripts\offline-setup.ps1
#
# Student accounts: do NOT use the Node Windows installer (needs admin).
# This script extracts portable Node into tools\node\ and packages into node_modules\.

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

Write-Host "== BotWorkshop Turtle · offline setup (no admin) ==" -ForegroundColor Cyan

# --- Project packages → project root\node_modules ---
if (-not (Test-Path "node_modules")) {
  $zip = Join-Path $Root "offline\npm\node_modules.zip"
  if (-not (Test-Path $zip)) { throw "Missing $zip" }
  Write-Host "Extracting project packages → .\node_modules\ …"
  Expand-Archive -Path $zip -DestinationPath $Root -Force
} else {
  Write-Host "node_modules already present — skip"
}

# --- Portable Node → tools\node\ (no admin, no system install) ---
$nodeTools = Join-Path $Root "tools\node"
$existing = Get-ChildItem $nodeTools -Directory -ErrorAction SilentlyContinue |
  Where-Object { $_.Name -like "node-*-win-x64" } |
  Select-Object -First 1

if (-not $existing) {
  $nodeZip = Get-ChildItem (Join-Path $Root "offline\node") -Filter "node-*-win-x64.zip" -ErrorAction SilentlyContinue |
    Select-Object -First 1
  if (-not $nodeZip) {
    throw "Missing offline\node\node-*-win-x64.zip — copy the portable Node zip onto the USB kit."
  }
  Write-Host "Extracting portable Node (no admin) → tools\node\ …"
  New-Item -ItemType Directory -Force -Path $nodeTools | Out-Null
  Expand-Archive -Path $nodeZip.FullName -DestinationPath $nodeTools -Force
  $existing = Get-ChildItem $nodeTools -Directory |
    Where-Object { $_.Name -like "node-*-win-x64" } |
    Select-Object -First 1
}

if (-not $existing) { throw "Portable Node folder not found under tools\node\" }
Write-Host "Portable Node: $($existing.FullName)"
Write-Host "  node.exe and npm.cmd live inside that folder (not a system install)."

$ideZip = Join-Path $Root "offline\arduino-ide\arduino-1.8.19-windows.zip"
$ideExe = Join-Path $Root "offline\arduino-ide\arduino-1.8.19-windows.exe"
$drv = Join-Path $Root "offline\drivers\cp210x\CP210x_Universal_Windows_Driver.zip"

Write-Host ""
Write-Host "Next (may need a teacher/admin for drivers):" -ForegroundColor Yellow
Write-Host "  • Arduino IDE without admin: unzip  $ideZip"
Write-Host "    into e.g. Documents\Arduino-1.8.19  (avoid the .exe installer if locked)."
Write-Host "  • CP210x USB driver usually NEEDS admin once per PC:  $drv"
Write-Host "    Ask IT/teacher to install if Device Manager shows no CP210x port."
Write-Host ""
Write-Host "Every class session (student, no admin):" -ForegroundColor Green
Write-Host "  Double-click  scripts\start-dev.cmd"
Write-Host "  or:  powershell -ExecutionPolicy Bypass -File scripts\start-dev.ps1"
Write-Host "  Then open http://localhost:5173/"
Write-Host "  Code → Download .ino → Arduino IDE → Uno + CP210x → Upload (unplug Bluetooth)"
