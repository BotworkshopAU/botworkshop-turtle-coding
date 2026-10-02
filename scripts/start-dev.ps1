# Same as start-dev.cmd — portable Node, no admin / no global PATH.
$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

$nodeDir = Get-ChildItem (Join-Path $Root "tools\node") -Directory -ErrorAction SilentlyContinue |
  Where-Object { $_.Name -like "node-*-win-x64" } |
  Select-Object -First 1

if (-not $nodeDir) {
  Write-Host "Portable Node missing. Run once:"
  Write-Host "  powershell -ExecutionPolicy Bypass -File scripts\offline-setup.ps1"
  exit 1
}
if (-not (Test-Path "node_modules")) {
  Write-Host "Missing node_modules. Run offline-setup.ps1 once."
  exit 1
}

$env:Path = "$($nodeDir.FullName);$env:Path"
Write-Host "Using Node: $($nodeDir.FullName)"
& (Join-Path $nodeDir.FullName "node.exe") -v
& (Join-Path $nodeDir.FullName "npm.cmd") "run" "dev"
