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

- `npm/node_modules.zip` — site dependencies  
- `arduino-ide/` — **Arduino IDE 1.8.19** (Uno/AVR included)  
- `drivers/cp210x/` — USB-UART drivers  
- `node/` — portable Node (Windows)

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
