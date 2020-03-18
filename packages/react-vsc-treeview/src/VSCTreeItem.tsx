/**
 * @file 暴露给 React Reconciler 的组件，和 vscode TreeItem 直接对应
 * @author weijiaxun <weijiaxun@baidu.com>
 */

import React from 'react';
import * as vscode from 'vscode';

const VSCTreeItem: React.FC<VSCTreeItemProps> = (props) => {
    // 为了保证类型不出问题，这里借用了 div 标签
    return <div {...props}></div>;
};

export default VSCTreeItem;

export interface VSCTreeItemProps {
    label?: string;
    id?: string;
    iconPath?: string | vscode.Uri | { light: string | vscode.Uri; dark: string | vscode.Uri } | vscode.ThemeIcon;
    description?: string | boolean;
    resourceUri?: vscode.Uri;
    tooltip?: string | undefined;
    command?: vscode.Command;
    collapsibleState?: vscode.TreeItemCollapsibleState;
    contextValue?: string;
}

export type Props = React.PropsWithChildren<VSCTreeItemProps>;

export const propKeys: (keyof Props)[] = [
    'label', 'id', 'iconPath', 'description', 'resourceUri', 'tooltip',
    'command', 'collapsibleState', 'contextValue', 'children'
];

export interface UpdatePayload<T extends keyof Props = keyof Props> {
    type: T;
    value: Props[T];
}
