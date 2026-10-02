import { spawn } from "node:child_process";
import { existsSync } from "node:fs";

function whichCli() {
  if (process.env.ARDUINO_CLI) return process.env.ARDUINO_CLI;
  const windows = "C:\\Program Files\\Arduino CLI\\arduino-cli.exe";
  if (process.platform === "win32" && existsSync(windows)) return windows;
  return process.platform === "win32" ? "arduino-cli.exe" : "arduino-cli";
}

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "inherit", windowsHide: true });
    child.on("error", reject);
    child.on("close", (code) =>
      code === 0 ? resolve() : reject(new Error(`${cmd} ${code}`)),
    );
  });
}

const cli = whichCli();

console.log(
  "Optional: Arduino CLI for browser Upload. Classrooms without internet should use Arduino IDE from offline/arduino-ide/ instead (Download .ino → IDE Upload).",
);
console.log("Using:", cli);

await run(cli, ["core", "update-index"]);
await run(cli, ["core", "install", "arduino:avr"]);
await run(cli, ["lib", "update-index"]);
await run(cli, ["lib", "install", "Servo"]);
await run(cli, ["lib", "install", "IRremote@2.6.1"]);
console.log("Ready. npm run dev → http://localhost:5173/");
