import * as vscode from 'vscode';
import {counterIncreaseEvent, counterDecreaseEvent} from '../events/treeview';

class CommandCenter implements vscode.Disposable {

    private disposables: vscode.Disposable[] = [];

    constructor() {
        this.disposables.push(
            vscode.commands.registerCommand('example.counterIncrease', this.counterIncrease.bind(this)),
            vscode.commands.registerCommand('example.counterDecrease', this.counterDecrease.bind(this)),
        );
    }

    private counterIncrease() {
        counterIncreaseEvent.fire();
    }

    private counterDecrease() {
        counterDecreaseEvent.fire();
    }

    dispose() {
        this.disposables.forEach(disposable => disposable.dispose());
        this.disposables = [];
    }
}

export const commands = new CommandCenter();
