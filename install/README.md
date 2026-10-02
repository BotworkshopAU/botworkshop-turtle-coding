# Install guide — Turtle coding (local only)

Give students **this folder only** (not the full BotWorkshop website). Upload to the Turtle works from **Chrome or Edge on the same laptop** as the USB cable.

## 1. Node.js and npm

Install **Node.js LTS** (includes npm):

| OS | How |
|----|-----|
| **Windows** | [nodejs.org](https://nodejs.org/) installer, or `winget install OpenJS.NodeJS.LTS` |
| **Mac** | [nodejs.org](https://nodejs.org/) installer, or `brew install node` |

Check in a terminal:

```bash
node --version
npm --version
```

## 2. Project dependencies (every laptop, once per clone)

In this folder:

```bash
npm install
npm run setup:cli
```

`setup:cli` installs **Arduino CLI**, the **Arduino Uno** core, and libraries (**Servo**, **IRremote 2.6.1**). It can take several minutes the first time.

If `arduino-cli` is not found, install it manually:

| OS | How |
|----|-----|
| **Windows** | [Arduino CLI install](https://arduino.github.io/arduino-cli/latest/installation/) or `winget install ArduinoSA.CLI` |
| **Mac** | `brew install arduino-cli` |

Optional: set `ARDUINO_CLI` to the full path of the executable if it is not on PATH.

## 3. USB-UART driver (CP210x) — once per laptop

The Keyestudio Turtle uses a **Silicon Labs CP2102** USB–serial chip. Without the driver, Upload will not see the port.

Download **CP210x VCP drivers** from Silicon Labs (Windows and Mac packages):

https://www.silabs.com/software-and-tools/usb-to-uart-bridge-vcp-drivers?tab=downloads

### Windows

1. Install the CP210x driver (run the installer from Silicon Labs).
2. Plug in the Turtle USB cable.
3. Open **Device Manager** → **Ports (COM & LPT)**.
4. You should see something like **Silicon Labs CP210x USB to UART Bridge (COM5)**.  
   The **COM number** (e.g. COM5) changes per USB socket; that is normal.
5. In Coding, **Upload to Turtle** opens a port picker — choose the **CP210x** entry (not a random Bluetooth or printer port).

### Mac

1. Install the CP210x driver from Silicon Labs.
2. On first use, allow the driver in **System Settings → Privacy & Security** if macOS blocks it, then restart if asked.
3. Plug in the Turtle USB cable.
4. In Terminal you can check:

   ```bash
   ls /dev/cu.SLAB*
   ```

   Typical device: **`/dev/cu.SLAB_USBtoUART`** (the browser picker shows a friendly name; you do not type this path in Coding).

5. **Upload to Turtle** → select the CP210x / SLAB port in the Chrome dialog.

## 4. Every class session

```bash
npm run dev
```

Open in **Chrome or Edge**:

**http://localhost:5173/code.html**

Before upload:

- Robot **batteries** in, DIP **ON** when driving.
- **Unplug the DX-BT24 Bluetooth** module (TX/RX are used for USB upload).
- Click **Upload to Turtle** → pick the **CP210x** serial port.

## 5. Troubleshooting

| Problem | Try |
|---------|-----|
| No **Upload to Turtle** button | Use `npm run dev` (not `npm run vite` alone). Open `localhost`, not a file:// URL. |
| Port list empty | Reinstall CP210x driver; try another USB cable/port; on Mac check Security settings. |
| Upload fails immediately | Unplug Bluetooth module; close other apps using the serial port; retry. |
| Compile errors | Run `npm run setup:cli` again; ensure internet for first Arduino core download. |

## 6. Optional: LAN access

To open Coding from another device on the same Wi‑Fi (upload still only from the PC running the server):

```bash
npm run dev:lan
```

Use the URL Vite prints; upload still requires Web Serial on the machine that runs `npm run dev`.
