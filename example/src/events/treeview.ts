import * as vscode from 'vscode';

export const counterIncreaseEvent = new vscode.EventEmitter<void>();
export const counterDecreaseEvent = new vscode.EventEmitter<void>();
