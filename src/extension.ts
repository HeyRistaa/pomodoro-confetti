import * as vscode from 'vscode';

let timer: NodeJS.Timeout | undefined;
let startTime: number | undefined;

export function activate(context: vscode.ExtensionContext): void {
    let startCommandDisposable = vscode.commands.registerCommand(
        'confettiOpener.start',
        () => startConfettiTherapy()
    );

    let stopCommandDisposable = vscode.commands.registerCommand(
        'confettiOpener.stop',
        () => stopConfettiTherapy()
    );

    let statusCommandDisposable = vscode.commands.registerCommand(
        'confettiOpener.status',
        () => showConfettiTherapyStatus()
    );

    context.subscriptions.push(
        startCommandDisposable,
        stopCommandDisposable,
        statusCommandDisposable
    );
}

const startConfettiTherapy = (): void => {
    const minutes = vscode.workspace.getConfiguration('confettiOpener').get<number>('minutes', 1);
    const url = 'https://confettitherapy.com/';

    vscode.window.showInformationMessage(`Confetti Time! Confetti Therapy starts in ${minutes} minutes.`);

    startTime = Date.now();
    timer = setInterval(() => {
        vscode.env.openExternal(vscode.Uri.parse(url));
    }, minutes * 60 * 1000);
}

const stopConfettiTherapy = (): void => {
    if (timer) {
        clearInterval(timer);
        timer = undefined;
        startTime = undefined;
        vscode.window.showInformationMessage('Confetti therapy stopped. :(');
    } else {
        vscode.window.showInformationMessage('No confetti therapy is currently running.');
    }
}

const showConfettiTherapyStatus = (): void => {
    if (timer && startTime) {
        const elapsedMinutes = Math.floor((Date.now() - startTime) / 60000);
        const totalMinutes = vscode.workspace.getConfiguration('confettiOpener').get<number>('minutes', 30);
        const remainingMinutes = totalMinutes - elapsedMinutes;
        vscode.window.showInformationMessage(`Confetti therapy is running. ${remainingMinutes} minutes remaining.`);
    } else {
        vscode.window.showInformationMessage('No confetti therapy is currently running.');
    }
}

export function deactivate() {
    if (timer) {
        clearInterval(timer);
    }
}