# BotWorkshop · Turtle coding (local)

Small package for class laptops: **Turtle robot block coding only** — no full website, no Tello.

## Pages

| Page | URL (after `npm run dev`) |
|------|---------------------------|
| **Home** | http://localhost:5173/ |
| Coding | http://localhost:5173/code.html |
| Turtle agenda | http://localhost:5173/agenda.html |
| Install guide | http://localhost:5173/install/index.html |

## Offline classroom (no internet)

The **`offline/`** folder includes:

| Path | What it is |
|------|------------|
| `offline/node/` | **Node.js** runtime (includes **npm**). Only needed if the laptop has no Node yet. |
| `offline/npm/node_modules.zip` | **Project packages** for this site — not a second npm install. See below. |
| `offline/arduino-ide/` | **Arduino IDE 1.8.19** (Uno/AVR included) |
| `offline/drivers/cp210x/` | USB-UART drivers (Windows + Mac) |

### Why `offline/npm/`? (packages, not the npm tool)

A normal Node install already comes with **npm**. You do **not** install npm separately.

`offline/npm/` is only a pre-downloaded copy of this project’s dependencies (what `npm install` would fetch from the internet). In class there is no network, so we ship them as `node_modules.zip` and extract them once.

From `package.json` (ranges resolved when the zip was built):

| Package | Role | Version range |
|---------|------|----------------|
| **blockly** | Block coding UI | `^12.3.1` |
| **express** | Local compile API server | `^5.2.1` |
| **webserial-flasher** | Browser USB upload helper (optional path) | `^1.0.1` |
| **vite** | Dev server / build | `^7.1.7` |
| **@types/express** | Type hints for Express | `^5.0.6` |

Exact locked versions are in `package-lock.json` (also under `offline/npm/`).

**Windows (once):**

```powershell
powershell -ExecutionPolicy Bypass -File scripts\offline-setup.ps1
```

Then install Arduino IDE + CP210x from `offline/`.

**Mac (once):** `bash scripts/offline-setup.sh`, then install IDE + driver from `offline/`.

Details: [offline/README.md](offline/README.md) · [install/index.html](install/index.html)

## Every class session

```bash
npm run dev
```

Open **http://localhost:5173/** → **Code** → **Download .ino** → open in **Arduino IDE** → Board **Uno**, port **CP210x**, unplug Bluetooth → **Upload**.

## Scripts

| Command | Purpose |
|---------|---------|
| `scripts/offline-setup.ps1` / `.sh` | Extract `node_modules` (and portable Node on Windows) |
| `npm run dev` | Local coding site |
| `npm run build` | Static build |

## Related

Full workshop site: https://github.com/BotworkshopAU/robotics-class
