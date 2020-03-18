/**
 * @file 基于 reconciler 的 tree view 工厂
 * @author weijiaxun <weijiaxun@baidu.com>
 */

import * as vscode from 'vscode';
import ExtendedTreeDataProvider from './ExtendedTreeDataProvider';
import reconciler from './reconciler';

const ReactTreeView = {
    render(whatToRender, viewId) {
        const treeDataProvider = new ExtendedTreeDataProvider();
        const treeView = vscode.window.createTreeView(viewId, {
            treeDataProvider
        });
        const container = reconciler.createContainer(treeDataProvider, false, false);
        reconciler.updateContainer(whatToRender, container, null, null);
        return treeView;
    }
};

export {default as TreeItem} from './TreeItem';
export {default as ExtendedTreeItem} from './ExtendedTreeItem';
export default ReactTreeView;
