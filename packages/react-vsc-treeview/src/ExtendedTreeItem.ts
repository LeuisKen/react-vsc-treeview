/**
 * @file TreeItem 扩展，增加了对父子的引用和 change 事件
 * @author weijiaxun <weijiaxun@baidu.com>
 */

import * as vscode from 'vscode';
import {UpdatePayload} from './VSCTreeItem';

export default class ExtendedTreeItem {

    children: ExtendedTreeItem[] = [];
    parent: ExtendedTreeItem | null = null;

    private _onDidChange = new vscode.EventEmitter<ExtendedTreeItem>();
    readonly onDidChange = this._onDidChange.event;

    constructor(public value: vscode.TreeItem) {
    }

    appendChild(element: ExtendedTreeItem) {
        element.parent = this;
        this.children.push(element);
        this._onDidChange.fire(this);
    }

    removeChild(element: ExtendedTreeItem) {
        this.children = this.children.filter(item => item !== element);
        this._onDidChange.fire(this);
    }

    insertBefore(element: ExtendedTreeItem, beforeElement: ExtendedTreeItem) {
        const index = this.children.findIndex(item => item === beforeElement);
        this.children.splice(index + 1, 0, element);
        this._onDidChange.fire(this);
    }

    update(props: UpdatePayload[]) {
        props.forEach((payload) => {
            this.value[payload.type] = payload.value;
        });
        this._onDidChange.fire(this);
    }
}
