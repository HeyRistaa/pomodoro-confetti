"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);
var vscode = __toESM(require("vscode"));
var timer;
var startTime;
function activate(context) {
  let startCommandDisposable = vscode.commands.registerCommand(
    "confettiOpener.start",
    () => startConfettiTherapy()
  );
  let stopCommandDisposable = vscode.commands.registerCommand(
    "confettiOpener.stop",
    () => stopConfettiTherapy()
  );
  let statusCommandDisposable = vscode.commands.registerCommand(
    "confettiOpener.status",
    () => showConfettiTherapyStatus()
  );
  context.subscriptions.push(
    startCommandDisposable,
    stopCommandDisposable,
    statusCommandDisposable
  );
}
var startConfettiTherapy = () => {
  const minutes = vscode.workspace.getConfiguration("confettiOpener").get("minutes", 1);
  const url = "https://confettitherapy.com/";
  vscode.window.showInformationMessage(`Confetti Time! Confetti Therapy starts in ${minutes} minutes.`);
  startTime = Date.now();
  timer = setInterval(() => {
    vscode.env.openExternal(vscode.Uri.parse(url));
  }, minutes * 60 * 1e3);
};
var stopConfettiTherapy = () => {
  if (timer) {
    clearInterval(timer);
    timer = void 0;
    startTime = void 0;
    vscode.window.showInformationMessage("Confetti therapy stopped. :(");
  } else {
    vscode.window.showInformationMessage("No confetti therapy is currently running.");
  }
};
var showConfettiTherapyStatus = () => {
  if (timer && startTime) {
    const elapsedMinutes = Math.floor((Date.now() - startTime) / 6e4);
    const totalMinutes = vscode.workspace.getConfiguration("confettiOpener").get("minutes", 30);
    const remainingMinutes = totalMinutes - elapsedMinutes;
    vscode.window.showInformationMessage(`Confetti therapy is running. ${remainingMinutes} minutes remaining.`);
  } else {
    vscode.window.showInformationMessage("No confetti therapy is currently running.");
  }
};
function deactivate() {
  if (timer) {
    clearInterval(timer);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
