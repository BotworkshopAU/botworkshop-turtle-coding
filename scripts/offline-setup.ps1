# Offline class setup (Windows) — no internet after the kit is on the laptop.
# From project root:
#   powershell -ExecutionPolicy Bypass -File scripts\offline-setup.ps1

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

Write-Host "== BotWorkshop Turtle · offline setup ==" -ForegroundColor Cyan

# --- node_modules ---
if (-not (Test-Path "node_modules")) {
  $zip = Join-Path $Root "offline\npm\node_modules.zip"
  if (-not (Test-Path $zip)) { throw "Missing $zip" }
  Write-Host "Extracting node_modules.zip…"
  Expand-Archive -Path $zip -DestinationPath $Root -Force
} else {
  Write-Host "node_modules already present — skip"
}

# --- Optional portable Node ---
$nodeCmd = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodeCmd) {
  $nodeZip = Get-ChildItem (Join-Path $Root "offline\node") -Filter "node-*-win-x64.zip" -ErrorAction SilentlyContinue | Select-Object -First 1
  if ($nodeZip) {
    $nodeTools = Join-Path $Root "tools\node"
    Write-Host "Extracting portable Node into tools\node …"
    New-Item -ItemType Directory -Force -Path $nodeTools | Out-Null
    Expand-Archive -Path $nodeZip.FullName -DestinationPath $nodeTools -Force
    $inner = Get-ChildItem $nodeTools -Directory | Select-Object -First 1
    if ($inner) {
      $env:Path = "$($inner.FullName);$env:Path"
      Write-Host "Added $($inner.FullName) to PATH for this session"
    }
  } else {
    Write-Warning "Node.js not found. Install Node LTS or extract offline\node\*.zip first."
  }
}

$ideExe = Join-Path $Root "offline\arduino-ide\arduino-1.8.19-windows.exe"
$drv = Join-Path $Root "offline\drivers\cp210x\CP210x_Universal_Windows_Driver.zip"

Write-Host ""
Write-Host "Next (manual, once per laptop):" -ForegroundColor Yellow
Write-Host "  1. Install Arduino IDE:  $ideExe"
Write-Host "     (or unzip arduino-1.8.19-windows.zip for portable)"
Write-Host "  2. Install CP210x driver from:  $drv"
Write-Host "  3. In Arduino IDE: Tools → Board → Arduino Uno"
Write-Host ""
Write-Host "Done extracting npm. Every class session:" -ForegroundColor Green
Write-Host "  npm run dev"
Write-Host "  Open http://localhost:5173/  → Code → Download .ino → Upload in Arduino IDE"
Write-Host "  (Unplug Bluetooth before upload)"
