@echo off
REM Offline setup without PowerShell scripts (school PCs often block .ps1).
REM Double-click this file, or run from cmd in the project folder.
setlocal EnableExtensions
cd /d "%~dp0.."

echo == BotWorkshop Turtle · offline setup (CMD, no admin / no .ps1) ==
echo.

where tar >nul 2>&1
if errorlevel 1 (
  echo ERROR: "tar" not found. Use File Explorer instead:
  echo   1. Right-click offline\npm\node_modules.zip - Extract All
  echo      Extract TO this folder: %CD%
  echo      so you get %CD%\node_modules\
  echo   2. Right-click offline\node\node-*-win-x64.zip - Extract All
  echo      Extract TO: %CD%\tools\node\
  echo   3. Then double-click scripts\start-dev.cmd
  pause
  exit /b 1
)

if not exist "node_modules\" (
  if not exist "offline\npm\node_modules.zip" (
    echo Missing offline\npm\node_modules.zip
    pause
    exit /b 1
  )
  echo Extracting project packages -^> .\node_modules\
  tar -xf "offline\npm\node_modules.zip" -C .
) else (
  echo node_modules already present - skip
)

if not exist "tools\node\" mkdir "tools\node"

set "NODEDIR="
for /d %%D in ("tools\node\node-*-win-x64") do set "NODEDIR=%%~fD"
if not defined NODEDIR (
  set "NODEZIP="
  for %%Z in ("offline\node\node-*-win-x64.zip") do set "NODEZIP=%%~fZ"
  if not defined NODEZIP (
    echo Missing offline\node\node-*-win-x64.zip
    pause
    exit /b 1
  )
  echo Extracting portable Node -^> tools\node\
  tar -xf "%NODEZIP%" -C "tools\node"
  for /d %%D in ("tools\node\node-*-win-x64") do set "NODEDIR=%%~fD"
)

if not defined NODEDIR (
  echo Portable Node folder not found under tools\node\
  pause
  exit /b 1
)

echo.
echo Portable Node: %NODEDIR%
echo Project packages: %CD%\node_modules\
echo.
echo Every class: double-click scripts\start-dev.cmd
echo Then open http://localhost:5173/
echo.
echo Arduino IDE (no admin): unzip offline\arduino-ide\arduino-1.8.19-windows.zip
echo CP210x driver: usually needs teacher/admin once from offline\drivers\cp210x\
echo.
pause
