# BotWorkshop · Turtle coding (local)

Small package for class laptops: **Turtle robot block coding only** — no full website, no Tello.

## Pages

| Page | URL (after `npm run dev`) |
|------|---------------------------|
| Coding | http://localhost:5173/code.html |
| Turtle agenda / projects | http://localhost:5173/agenda.html |
| Install & USB-UART setup | http://localhost:5173/install/index.html |

## Quick start (teachers)

1. Clone or copy **this repo** onto each programming laptop.
2. Follow **[install/index.html](install/index.html)** or **[install/README.md](install/README.md)** (Node, `npm run setup:cli`, CP210x driver for Windows or Mac).
3. Each session: `npm run dev` → open **code.html** → unplug Bluetooth → **Upload to Turtle**.

Upload uses **Chrome/Edge Web Serial** and a local compile service on `127.0.0.1` — it does not work from a static file or public hosting alone.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm install` | Blockly, Vite, compile API |
| `npm run setup:cli` | Arduino CLI + Uno core + libraries (once) |
| `npm run dev` | Vite + compile API (class default) |
| `npm run dev:lan` | Same, reachable on LAN (upload still on host PC) |
| `npm run build` | Static build of code / agenda / install pages |

## Related

Full workshop site (Foundation hub, marketing, GitHub Pages):  
https://github.com/BotworkshopAU/robotics-class
