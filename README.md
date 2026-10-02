# BotWorkshop · Turtle coding (local)

Small package for class laptops: **Turtle robot block coding only** — no full website, no Tello.

## Pages

| Page | URL (after `npm run dev`) |
|------|---------------------------|
| **Home** | http://localhost:5173/ |
| Coding | http://localhost:5173/code.html |
| Turtle agenda | http://localhost:5173/agenda.html |
| Install guide | http://localhost:5173/install/index.html |

## Student PCs without admin (school laptops)

Do **not** use the Node **Windows installer** — it needs admin and often fails with “unauthorized”.

Use **portable Node** from this kit (no install, no admin):

| Step | What to do |
|------|------------|
| 1 | Copy the whole `botworkshop-turtle-coding` folder onto the laptop (or USB). |
| 2 | Once: run `powershell -ExecutionPolicy Bypass -File scripts\offline-setup.ps1` |
| 3 | Every class: double‑click `scripts\start-dev.cmd` |
| 4 | Browser: http://localhost:5173/ |

That script:

1. Extracts **portable Node** → `tools\node\node-…-win-x64\` (includes `node.exe` + `npm.cmd`)  
2. Extracts **project packages** → `node_modules\` **in the project root** (same folder as `package.json`)

```
botworkshop-turtle-coding/
  package.json
  code.html
  node_modules/                 ← project packages HERE
  tools/
    node/
      node-v24.xx.x-win-x64/    ← portable Node HERE (not a system install)
  offline/
    node/node-…-win-x64.zip
    npm/node_modules.zip
```

`start-dev.cmd` runs that portable `npm` — you never need `npm` on the system PATH.

### Arduino + USB (may need teacher once)

| Item | No-admin option |
|------|-----------------|
| **Arduino IDE** | Unzip `offline\arduino-ide\arduino-1.8.19-windows.zip` into the student’s Documents (portable). Avoid the `.exe` installer if it asks for admin. |
| **CP210x driver** | Usually **needs admin once**. Ask IT/teacher to install from `offline\drivers\cp210x\`. Without it, Arduino IDE will not see the Turtle COM port. |

## Offline kit contents

| Path | What it is |
|------|------------|
| `offline/node/` | Portable **Node.js** zip (includes **npm**) — for no-admin students |
| `offline/npm/node_modules.zip` | **Project packages** (Blockly, Vite, …) — not a second npm install |
| `offline/arduino-ide/` | Arduino IDE 1.8.19 |
| `offline/drivers/cp210x/` | USB-UART drivers (admin usually required) |

### Why `offline/npm/`?

Node already includes the **npm** tool. This zip is only the libraries this project needs (`npm install` offline). Versions from `package.json`:

| Package | Version range | Role |
|---------|---------------|------|
| blockly | `^12.3.1` | Blocks UI |
| express | `^5.2.1` | Local server |
| webserial-flasher | `^1.0.1` | Optional browser flash |
| vite | `^7.1.7` | Dev server |
| @types/express | `^5.0.6` | Types |

## Every class session

```text
scripts\start-dev.cmd
```

Open **http://localhost:5173/** → **Code** → **Download .ino** → Arduino IDE → Board **Uno**, Port **CP210x** → unplug Bluetooth → **Upload**.

## Scripts

| File | Purpose |
|------|---------|
| `scripts/offline-setup.ps1` | Once: extract portable Node + `node_modules` (no admin) |
| `scripts/start-dev.cmd` | Every session: start the site with portable Node |
| `scripts/offline-setup.sh` | Mac equivalent extract |

More detail: [offline/README.md](offline/README.md) · [install/index.html](install/index.html)

## Related

Full workshop site: https://github.com/BotworkshopAU/robotics-class
