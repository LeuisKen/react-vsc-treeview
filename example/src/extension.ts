import * as vscode from 'vscode';
import treeView from './treeview';


export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(treeView);
}

// this method is called when your extension is deactivated
export function deactivate() {}
