import * as vscode from 'vscode';
import ReactReconciler from 'react-reconciler';
import ExtendedTreeDataProvider from './ExtendedTreeDataProvider';
import ExtendedTreeItem from './ExtendedTreeItem';
import {TreeItemProps} from './ReactTreeItem';

export default ReactReconciler<
    'div', TreeItemProps, ExtendedTreeDataProvider, ExtendedTreeItem, ExtendedTreeItem,
    unknown, unknown, unknown, UpdatedPayload, unknown, unknown, unknown
>({
    supportsMutation: true,

    createInstance(_type, props, container) {
        const {
            label = '',
            children,
            command
        } = props;
        const collapsibleState = children
            ? vscode.TreeItemCollapsibleState.Collapsed
            : vscode.TreeItemCollapsibleState.None;
        const treeItem = new vscode.TreeItem(label, collapsibleState);
        if (command) {
            treeItem.command = typeof command === 'string'
                ? treeItem.command = {command, title: ''}
                : treeItem.command = command;
        }
        return container.createTreeItem(treeItem);
    },

    appendChildToContainer(container, child) {
        container.appendChildToRoot(child);
    },
    appendChild(parentInstance, child) {
        parentInstance.appendChild(child);
    },
    appendInitialChild(parentInstance, child) {
        parentInstance.appendChild(child);
    },

    removeChildFromContainer(container, child) {
        container.removeChildFromRoot(child);
    },
    removeChild(parentInstance, child) {
        parentInstance.removeChild(child);
    },
    insertInContainerBefore(container, child, beforeChild) {
        container.insertInRootBefore(child, beforeChild);
    },
    insertBefore(parentInstance, child, beforeChild) {
        parentInstance.insertBefore(child, beforeChild);
    },

    prepareUpdate(_instance, _type, oldProps, newProps, _rootContainerInstance) {
        if (oldProps.label !== newProps.label) {
            return {label: newProps.label || ''};
        }
        return null;
    },
    commitUpdate(instance, updatePayload) {
        instance.update(updatePayload);
    },

    // @ts-ignore
    finalizeInitialChildren() {},
    getChildHostContext() {},
    getPublicInstance() {},
    getRootHostContext() {},
    prepareForCommit() {},
    resetAfterCommit() {},

    shouldSetTextContent() {
        return false;
    }
});

interface UpdatedPayload {
    label: string
}
