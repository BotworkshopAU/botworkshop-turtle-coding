# Offline classroom kit

Copy this whole `offline/` folder with the project (USB stick) so class laptops can set up **without internet**.

## Contents

| Folder | What |
|--------|------|
| `node/` | **Node.js** (includes **npm**). Use only if Node is not already on the laptop. |
| `npm/node_modules.zip` | **Project packages** for this coding site — see “Why npm folder?” below. |
| `drivers/cp210x/` | Silicon Labs CP210x USB-UART drivers (Windows + Mac) |
| `arduino-ide/` | **Arduino IDE 1.8.19** installers (includes Uno/AVR boards offline) |

### Why the `npm/` folder? (not a second npm)

**Node already includes npm.** This folder is *not* “add npm to Node.”

It is a zip of the **libraries this project needs** (Blockly, Vite, Express, …). Online you would run `npm install` once; offline we bring the same packages as `node_modules.zip` and extract them next to `package.json`.

| Package | Version range (`package.json`) | What for |
|---------|--------------------------------|----------|
| blockly | `^12.3.1` | Drag-and-drop blocks |
| express | `^5.2.1` | Local API used by `npm run dev` |
| webserial-flasher | `^1.0.1` | Optional browser flash helper |
| vite | `^7.1.7` | Local web server |
| @types/express | `^5.0.6` | Dev types for Express |

Exact versions are pinned in `npm/package-lock.json`.

## One-time setup (no internet)

### Windows

1. **Extract project packages** (from project root) — this is *not* installing npm; Node already has npm. The script only unzips Blockly/Vite/etc.:

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
