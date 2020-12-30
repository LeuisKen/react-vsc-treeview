import * as vscode from 'vscode';
import treeView from './treeview';
import {commands} from './services/commands';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(treeView);
    context.subscriptions.push(commands);
}

// this method is called when your extension is deactivated
export function deactivate() {}
