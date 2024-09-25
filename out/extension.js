"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
let timer;
let startTime;
function activate(context) {
    console.log('Timed Site Opener is now active!');
    let startDisposable = vscode.commands.registerCommand('timedSiteOpener.start', () => {
        const config = vscode.workspace.getConfiguration('timedSiteOpener');
        const minutes = config.get('minutes', 30);
        const url = config.get('url', 'https://example.com');
        vscode.window.showInformationMessage(`Timer started! Site will open in ${minutes} minutes.`);
        startTime = Date.now();
        timer = setTimeout(() => {
            vscode.env.openExternal(vscode.Uri.parse(url));
        }, minutes * 60 * 1000);
    });
    let stopDisposable = vscode.commands.registerCommand('timedSiteOpener.stop', () => {
        if (timer) {
            clearTimeout(timer);
            timer = undefined;
            startTime = undefined;
            vscode.window.showInformationMessage('Timer stopped.');
        }
        else {
            vscode.window.showInformationMessage('No timer is currently running.');
        }
    });
    let statusDisposable = vscode.commands.registerCommand('timedSiteOpener.status', () => {
        if (timer && startTime) {
            const elapsedMinutes = Math.floor((Date.now() - startTime) / 60000);
            const config = vscode.workspace.getConfiguration('timedSiteOpener');
            const totalMinutes = config.get('minutes', 30);
            const remainingMinutes = totalMinutes - elapsedMinutes;
            vscode.window.showInformationMessage(`Timer is running. ${remainingMinutes} minutes remaining.`);
        }
        else {
            vscode.window.showInformationMessage('No timer is currently running.');
        }
    });
    context.subscriptions.push(startDisposable, stopDisposable, statusDisposable);
}
function deactivate() {
    if (timer) {
        clearTimeout(timer);
    }
}
//# sourceMappingURL=extension.js.map