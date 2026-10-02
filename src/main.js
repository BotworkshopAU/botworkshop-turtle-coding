import * as Blockly from "blockly";
import "blockly/blocks";
import * as enLocale from "blockly/msg/en";
import * as arLocale from "blockly/msg/ar";
import {
  defineTurtleBlocks,
  getTurtleToolbox,
  starterWorkspace,
  demos,
} from "./blocks.js";
import { workspaceToSketch } from "./generator.js";
import { initFacePad, setFaceHex, SMILE } from "./face_pad.js";
import { getMotorFlip, setMotorFlip, getLineSense, setLineSense } from "./motors_pref.js";
import { getLang, setLang, ui } from "./i18n.js";
import { uploadTurtleSketch, webSerialSupported, compileApiAvailable, isLocalCodingHost } from "./upload.js";
import "./code.css";

let lang = getLang();
Blockly.setLocale(lang === "ar" ? arLocale : enLocale);
defineTurtleBlocks(lang);

const blocklyDiv = document.getElementById("blockly");
const codeEl = document.getElementById("arduino-code");
const statusEl = document.getElementById("status");
const statusBar = document.getElementById("status-bar");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const progressTrack = document.getElementById("progress-track");
const progressFill = document.getElementById("progress-fill");
const demoSelect = document.getElementById("demo-select");
const langSelect = document.getElementById("lang-select");
const downloadBtn = document.getElementById("download-btn");
const uploadBtn = document.getElementById("upload-btn");
const copyBtn = document.getElementById("copy-btn");
const newBtn = document.getElementById("new-btn");
const codeTitle = document.getElementById("code-title");
const turtleSteps = document.getElementById("turtle-steps");
const setupHeader = document.getElementById("setup");
const facePad = document.getElementById("face-pad");

let workspace = null;

function hideStatusBar() {
  if (statusBar) statusBar.hidden = true;
  if (statusEl) statusEl.textContent = "";
  if (progressBar) progressBar.hidden = true;
  if (progressText) progressText.textContent = "";
  if (progressTrack) progressTrack.hidden = true;
  if (progressFill) progressFill.style.width = "0%";
}

function showFailBar(message) {
  if (progressBar) progressBar.hidden = true;
  if (statusEl) statusEl.textContent = message;
  if (statusBar) statusBar.hidden = false;
}

function showProgressBar(message, pct) {
  if (statusBar) statusBar.hidden = true;
  if (progressText) progressText.textContent = message;
  if (progressBar) progressBar.hidden = false;
  if (typeof pct === "number" && Number.isFinite(pct)) {
    const clamped = Math.max(0, Math.min(100, Math.round(pct)));
    if (progressTrack) progressTrack.hidden = false;
    if (progressFill) progressFill.style.width = `${clamped}%`;
  } else {
    if (progressTrack) progressTrack.hidden = true;
    if (progressFill) progressFill.style.width = "0%";
  }
}

function injectWorkspace() {
  if (workspace) {
    workspace.dispose();
    workspace = null;
  }
  workspace = Blockly.inject(blocklyDiv, {
    toolbox: getTurtleToolbox(lang),
    renderer: "zelos",
    theme: Blockly.Themes.Classic,
    rtl: lang === "ar",
    zoom: { controls: true, wheel: true, startScale: 0.9 },
    trashcan: true,
    move: { scrollbars: true, drag: true, wheel: true },
  });
  workspace.addChangeListener(onWorkspaceChange);
}

function onWorkspaceChange() {
  refreshCode();
  saveWorkspace();
}

function saveWorkspace() {
  if (!workspace) return;
  localStorage.setItem("bw-turtle-workspace", JSON.stringify(Blockly.serialization.workspaces.save(workspace)));
}

function loadWorkspace() {
  const fallback = starterWorkspace();
  const saved = localStorage.getItem("bw-turtle-workspace");
  if (saved) {
    try {
      Blockly.serialization.workspaces.load(JSON.parse(saved), workspace);
      return;
    } catch {
      /* broken save */
    }
  }
  Blockly.serialization.workspaces.load(fallback, workspace);
}

function fillDemos(options, selected) {
  demoSelect.innerHTML = "";
  for (const [value, label] of options) {
    const opt = document.createElement("option");
    opt.value = value;
    opt.textContent = label;
    demoSelect.append(opt);
  }
  demoSelect.value = selected && [...demoSelect.options].some((o) => o.value === selected)
    ? selected
    : "";
}

function applyFacePadLabels(t) {
  if (!facePad) return;
  const header = facePad.querySelector(":scope > header");
  const help = facePad.querySelector(":scope > .face-help");
  if (header) header.textContent = t.faceTitle;
  if (help) help.textContent = t.faceHelp;
  const map = {
    smile: t.faceSmile,
    clear: t.faceClear,
    flip180: t.faceFlip180,
    fliph: t.faceFlipH,
    flipv: t.faceFlipV,
  };
  for (const [key, label] of Object.entries(map)) {
    const btn = facePad.querySelector(`[data-face='${key}']`);
    if (btn) btn.textContent = label;
  }
  const motorPrefs = document.getElementById("motor-prefs");
  if (motorPrefs) {
    const mHeader = motorPrefs.querySelector("header");
    const helps = motorPrefs.querySelectorAll(".face-help");
    const labels = motorPrefs.querySelectorAll(".motor-flip-label > span");
    const sel = document.getElementById("motor-flip");
    const lineSel = document.getElementById("line-sense");
    const lineHeader = motorPrefs.querySelector(".prefs-subhead");
    if (mHeader) mHeader.textContent = t.motorTitle;
    if (helps[0]) helps[0].textContent = t.motorHelp;
    if (labels[0]) labels[0].textContent = t.motorFlip;
    if (sel) {
      const opts = [t.motorFlip0, t.motorFlip1, t.motorFlip2, t.motorFlip3];
      [...sel.options].forEach((opt, i) => {
        if (opts[i]) opt.textContent = opts[i];
      });
      sel.setAttribute("aria-label", t.motorFlip);
    }
    if (lineHeader) lineHeader.textContent = t.lineTitle;
    if (helps[1]) helps[1].textContent = t.lineHelp;
    if (labels[1]) labels[1].textContent = t.lineSense;
    if (lineSel) {
      const byVal = { 1: t.lineSenseStandard, 0: t.lineSenseFlipped };
      [...lineSel.options].forEach((opt) => {
        if (byVal[opt.value] != null) opt.textContent = byVal[opt.value];
      });
      lineSel.setAttribute("aria-label", t.lineSense);
    }
  }
}

let uploadReady = false;

function syncUploadButton() {
  if (!uploadBtn) return;
  uploadBtn.hidden = !uploadReady;
  uploadBtn.disabled = !uploadReady;
  uploadBtn.classList.toggle("primary", uploadReady);
  if (uploadReady) {
    uploadBtn.textContent = ui(lang).uploadTurtle;
    downloadBtn.classList.remove("primary");
  } else {
    downloadBtn.classList.add("primary");
  }
}

async function refreshUploadAvailability() {
  if (!uploadBtn) return;
  if (!isLocalCodingHost() || !webSerialSupported()) {
    uploadReady = false;
    syncUploadButton();
    return;
  }
  const health = await compileApiAvailable();
  uploadReady = Boolean(health.ok && health.cli);
  syncUploadButton();
}

function applyChrome() {
  const t = ui(lang);
  document.documentElement.lang = lang === "ar" ? "ar" : "en";
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.body.classList.toggle("lang-ar", lang === "ar");

  const hub = document.querySelector(".brand.hub");
  const home = document.querySelector(".brand.home");
  if (hub) hub.textContent = t.agenda;
  if (home) home.textContent = t.installGuide;

  const demoLabel = document.querySelector('[data-i18n="demo"]');
  if (demoLabel) demoLabel.textContent = t.demo;

  newBtn.textContent = t.newBtn;
  copyBtn.textContent = t.copyCode;
  downloadBtn.textContent = t.downloadArduino;
  downloadBtn.classList.add("primary");
  if (uploadBtn) {
    uploadBtn.hidden = true;
    uploadBtn.textContent = t.uploadTurtle;
  }
  if (setupHeader) setupHeader.textContent = t.setup;
  if (codeTitle) codeTitle.textContent = t.codeArduino;
  if (turtleSteps) turtleSteps.innerHTML = t.turtleStepsHtml;
  applyFacePadLabels(t);
  if (langSelect) langSelect.value = lang;
  fillDemos(t.turtleDemos, localStorage.getItem("bw-turtle-demo"));
  void refreshUploadAvailability();
}

function refreshCode() {
  if (!workspace) return;
  codeEl.textContent = workspaceToSketch(workspace);
}

function setLanguage(next) {
  const nextLang = setLang(next);
  if (nextLang === lang && workspace) {
    applyChrome();
    return;
  }
  const saved = workspace ? Blockly.serialization.workspaces.save(workspace) : null;
  lang = nextLang;
  Blockly.setLocale(lang === "ar" ? arLocale : enLocale);
  defineTurtleBlocks(lang);
  injectWorkspace();
  if (saved) {
    try {
      Blockly.serialization.workspaces.load(saved, workspace);
    } catch {
      loadWorkspace();
    }
  } else {
    loadWorkspace();
  }
  applyChrome();
  refreshCode();
  hideStatusBar();
}

injectWorkspace();
applyChrome();
initFacePad(() => refreshCode());

const motorFlipSelect = document.getElementById("motor-flip");
if (motorFlipSelect) {
  motorFlipSelect.value = String(getMotorFlip());
  motorFlipSelect.addEventListener("change", () => {
    setMotorFlip(motorFlipSelect.value);
    refreshCode();
  });
}

const lineSenseSelect = document.getElementById("line-sense");
if (lineSenseSelect) {
  lineSenseSelect.value = String(getLineSense());
  lineSenseSelect.addEventListener("change", () => {
    setLineSense(lineSenseSelect.value);
    refreshCode();
  });
}

const demoParam = new URLSearchParams(location.search).get("demo");
if (demoParam && demos[demoParam]) {
  Blockly.serialization.workspaces.load(demos[demoParam], workspace);
  localStorage.setItem("bw-turtle-demo", demoParam);
  demoSelect.value = demoParam;
  if (demoParam === "face") setFaceHex(SMILE);
} else {
  loadWorkspace();
}
refreshCode();
hideStatusBar();

langSelect?.addEventListener("change", () => setLanguage(langSelect.value));

newBtn.addEventListener("click", () => {
  if (!confirm(ui(lang).confirmNew)) return;
  workspace.clear();
  Blockly.serialization.workspaces.load(starterWorkspace(), workspace);
  demoSelect.value = "";
  localStorage.removeItem("bw-turtle-demo");
  hideStatusBar();
});

demoSelect.addEventListener("change", () => {
  const id = demoSelect.value;
  if (!id || !demos[id]) return;
  try {
    workspace.clear();
    Blockly.serialization.workspaces.load(demos[id], workspace);
    if (id === "face") setFaceHex(SMILE);
    localStorage.setItem("bw-turtle-demo", id);
    hideStatusBar();
  } catch (err) {
    console.error(err);
    showFailBar(ui(lang).statusDemoFail);
  }
});

copyBtn.addEventListener("click", async () => {
  await navigator.clipboard.writeText(codeEl.textContent);
  hideStatusBar();
});

downloadBtn.addEventListener("click", () => {
  const blob = new Blob([codeEl.textContent], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "turtle.ino";
  a.click();
  URL.revokeObjectURL(a.href);
  hideStatusBar();
});

let uploading = false;
uploadBtn?.addEventListener("click", async () => {
  if (uploading) return;
  await refreshUploadAvailability();
  if (!uploadReady) return;
  const t = ui(lang);
  uploading = true;
  uploadBtn.disabled = true;
  hideStatusBar();
  try {
    await uploadTurtleSketch(codeEl.textContent, (phase, pct) => {
      if (phase === "compiling") showProgressBar(t.statusUploadingCompile);
      else if (phase === "pick-port") showProgressBar(t.statusUploadingPort);
      else if (phase === "opening") showProgressBar(t.statusUploadingOpen);
      else if (phase === "flashing") {
        if (typeof pct === "number") {
          showProgressBar(
            t.statusUploadingFlashPct.replace("{pct}", String(Math.round(pct))),
            pct,
          );
        } else {
          showProgressBar(t.statusUploadingFlash);
        }
      } else if (phase === "done") {
        showProgressBar(t.statusUploadDone, 100);
      }
    });
    hideStatusBar();
  } catch (err) {
    console.error(err);
    const code = err?.code;
    if (code === "no-serial") showFailBar(t.statusUploadNoSerial);
    else if (code === "not-local") showFailBar(t.statusUploadNotLocal);
    else if (code === "no-api") showFailBar(t.statusUploadNoApi);
    else if (code === "no-cli") showFailBar(t.statusUploadNoCli);
    else if (code === "cancelled" || err?.name === "NotFoundError") {
      showFailBar(t.statusUploadCancelled);
    } else {
      showFailBar(`${t.statusUploadFail} ${String(err?.message || err).slice(0, 160)}`);
    }
  } finally {
    uploading = false;
    await refreshUploadAvailability();
  }
});

window.addEventListener("resize", () => Blockly.svgResize(workspace));
if (new URLSearchParams(location.search).has("embed")) {
  document.body.classList.add("embed");
}
requestAnimationFrame(() => Blockly.svgResize(workspace));
