/**
 * @file TreeItem 组件，这一层主要的目的是为了把一些 props 计算的逻辑拿出来
 * @author weijiaxun<weijiaxun@baidu.com>
 */

import * as vscode from 'vscode';
import React, {useMemo} from 'react';
import VSCTreeItem, {VSCTreeItemProps} from './VSCTreeItem';

const TreeItem: React.FC<TreeItemProps> = ({
    label = '',
    id,
    iconPath,
    description,
    resourceUri,
    tooltip,
    command: rawCommand,
    contextValue,
    expanded,
    children
}) => {
    const collapsibleState = useMemo(
        () => {
            if (children == null) {
                return vscode.TreeItemCollapsibleState.None;
            }
            if (expanded === true) {
                return vscode.TreeItemCollapsibleState.Expanded;
            }
            return vscode.TreeItemCollapsibleState.Collapsed;
        },
        [children, expanded]
    );

    const command = useMemo(
        () => {
            if (!rawCommand) {
                return undefined;
            }
            return typeof rawCommand === 'string'
                ? {command: rawCommand, title: ''}
                : rawCommand;
        },
        [rawCommand]
    );

    const vscTreeItemProps: VSCTreeItemProps = {
        label,
        id,
        iconPath,
        description,
        resourceUri,
        tooltip,
        command,
        collapsibleState,
        contextValue
    };

    return <VSCTreeItem {...vscTreeItemProps}>{children}</VSCTreeItem>;
};

export default TreeItem;

export interface TreeItemProps {
    label?: string;
    id?: string;
    iconPath?: string | vscode.Uri | { light: string | vscode.Uri; dark: string | vscode.Uri } | vscode.ThemeIcon;
    description?: string | boolean;
    resourceUri?: vscode.Uri;
    tooltip?: string | undefined;
    command?: string | vscode.Command;
    contextValue?: string;
    expanded?: boolean;
}
