# Offline classroom kit

**School laptops (no admin):** do not use the Node Windows installer. Use portable Node + `scripts\start-dev.cmd`.

## Contents

| Folder | What |
|--------|------|
| `node/` | Portable **Node.js** zip (includes **npm**) — extract to `tools\node\` (no admin) |
| `npm/node_modules.zip` | **Project packages** → extract to project root as `node_modules\` |
| `drivers/cp210x/` | CP210x USB driver — usually needs **admin once** |
| `arduino-ide/` | Prefer **`.zip`** portable IDE if `.exe` installer is blocked |

### Why the `npm/` folder?

Not a second npm. Node already has npm. This zip is Blockly / Vite / Express / etc. for offline use.

| Package | Version range | What for |
|---------|---------------|----------|
| blockly | `^12.3.1` | Blocks |
| express | `^5.2.1` | Local server |
| webserial-flasher | `^1.0.1` | Optional flash helper |
| vite | `^7.1.7` | Dev server |
| @types/express | `^5.0.6` | Types |

## Windows — no admin (students)

1. Once, in the project folder — **prefer CMD** (school PCs often block `.ps1`):

   Double‑click `scripts\offline-setup.cmd`

   Or File Explorer: Extract All on the two zips (see README).

2. Arduino IDE: unzip `arduino-ide\arduino-1.8.19-windows.zip` into Documents (portable).

3. USB driver: ask teacher/IT to install `drivers\cp210x\` if the COM port is missing.

4. Every class: double‑click `scripts\start-dev.cmd` → open http://localhost:5173/

## Mac

```bash
bash scripts/offline-setup.sh
```

Then `npm run dev` if Node is available, or use a portable Node similarly.

## Upload in class

Code → **Download .ino** → Arduino IDE → Uno + CP210x → unplug Bluetooth → Upload.
