# Offline classroom kit

Copy this whole `offline/` folder with the project (USB stick) so class laptops can set up **without internet**.

## Contents

| Folder | What |
|--------|------|
| `npm/node_modules.zip` | Project dependencies (Blockly, Vite, …) |
| `drivers/cp210x/` | Silicon Labs CP210x USB-UART drivers (Windows + Mac) |
| `arduino-ide/` | **Arduino IDE 1.8.19** installers (includes Uno/AVR boards offline) |
| `node/` | Portable Node.js for Windows (if Node is not installed) |

## One-time setup (no internet)

### Windows

1. **Node + npm packages** (from project root):

   ```powershell
   powershell -ExecutionPolicy Bypass -File scripts\offline-setup.ps1
   ```

2. **Arduino IDE** — run  
   `offline\arduino-ide\arduino-1.8.19-windows.exe`  
   (or unzip `arduino-1.8.19-windows.zip` for a portable copy).

3. **CP210x driver** — unzip `offline\drivers\cp210x\CP210x_Universal_Windows_Driver.zip` and install.

### Mac

1. From project root: `bash scripts/offline-setup.sh`
2. Unzip/install `offline/arduino-ide/arduino-1.8.19-macosx.zip`
3. Install `offline/drivers/cp210x/Mac_OSX_VCP_Driver.zip` (allow in Privacy & Security if asked)

## Every class session

```bash
npm run dev
```

Open **http://localhost:5173/** → **Code**.

**Upload path in class (no Arduino CLI needed):**

1. Snap blocks → **Download .ino**
2. Open the file in **Arduino IDE**
3. Board: **Arduino Uno** · Port: **CP210x** · Unplug Bluetooth · **Upload**

## Note for GitHub

Arduino IDE installers are ~100–200 MB each (over GitHub’s file limit). Keep them on the **USB / local `offline/arduino-ide/`** copy you bring to class. The repo may omit those binaries; download once at home using URLs in `arduino-ide/SOURCES.txt`.
