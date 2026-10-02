@echo off
REM Start Turtle coding without admin / without Node on PATH.
REM Uses portable Node from tools\node\ (created by scripts\offline-setup.ps1).
setlocal
cd /d "%~dp0.."

set "NODE_DIR="
for /d %%D in ("%~dp0..\tools\node\node-*-win-x64") do set "NODE_DIR=%%~fD"
if not defined NODE_DIR (
  echo Portable Node not found under tools\node\
  echo Run once:  powershell -ExecutionPolicy Bypass -File scripts\offline-setup.ps1
  echo That extracts offline\node\*.zip and offline\npm\node_modules.zip — no admin needed.
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo Missing node_modules\ in the project root.
  echo Run once:  powershell -ExecutionPolicy Bypass -File scripts\offline-setup.ps1
  pause
  exit /b 1
)

set "PATH=%NODE_DIR%;%PATH%"
echo Using Node from: %NODE_DIR%
"%NODE_DIR%\node.exe" -v
"%NODE_DIR%\npm.cmd" run dev
pause
