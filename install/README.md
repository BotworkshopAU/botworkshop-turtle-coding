# Install guide (Markdown)

See also **install/index.html** when the site is running.

## Offline kit

| Path | Purpose |
|------|---------|
| `offline/npm/node_modules.zip` | Site dependencies |
| `offline/arduino-ide/` | Arduino IDE 1.8.19 (Uno included) |
| `offline/drivers/cp210x/` | CP210x USB-UART drivers |
| `offline/node/` | Portable Node (Windows) |

### Windows

```powershell
powershell -ExecutionPolicy Bypass -File scripts\offline-setup.ps1
```

Install `offline/arduino-ide/arduino-1.8.19-windows.exe` and the CP210x driver zip.

### Mac

```bash
bash scripts/offline-setup.sh
```

Install the macOS Arduino zip and Mac CP210x driver.

## Class session

```bash
npm run dev
```

http://localhost:5173/ → Code → **Download .ino** → Arduino IDE (Uno + CP210x port) → Upload. Unplug Bluetooth first.
