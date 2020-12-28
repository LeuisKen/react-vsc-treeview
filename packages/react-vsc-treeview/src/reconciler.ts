import * as vscode from 'vscode';
import ReactReconciler from 'react-reconciler';
import ExtendedTreeDataProvider from './ExtendedTreeDataProvider';
import ExtendedTreeItem from './ExtendedTreeItem';
import {Props, propKeys, UpdatePayload} from './VSCTreeItem';

export default ReactReconciler<
    'div', Props, ExtendedTreeDataProvider, ExtendedTreeItem, ExtendedTreeItem,
    unknown, unknown, unknown, UpdatePayload[], unknown, unknown, unknown
>({
    supportsMutation: true,

    createInstance(_type, props, container) {
        const {
            label = '',
            id,
            iconPath,
            description,
            resourceUri,
            tooltip,
            command,
            collapsibleState,
            contextValue
        } = props;
        const treeItem = new vscode.TreeItem(label, collapsibleState);
        treeItem.id = id;
        treeItem.iconPath = iconPath;
        treeItem.description = description;
        treeItem.resourceUri = resourceUri;
        treeItem.tooltip = tooltip;
        treeItem.command = command;
        treeItem.contextValue = contextValue;
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

    prepareUpdate(_instance, _type, oldProps, newProps) {
        const res: UpdatePayload[] = [];
        for (const key of propKeys) {
            if (oldProps[key] !== newProps[key]) {
                res.push({
                    type: key,
                    value: newProps[key]
                });
            }
        }
        return res;
    },
    commitUpdate(instance, updatePayload) {
        instance.update(updatePayload);
    },

    clearContainer() {},

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
