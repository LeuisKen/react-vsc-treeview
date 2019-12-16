/**
 * @file TreeItem 组件，为了类型不出问题，实际上是 div
 * @author weijiaxun<weijiaxun@baidu.com>
 */

import * as vscode from 'vscode';
import React from 'react';

const TreeItem = (props: TreeItemProps) => <div {...props}></div>;

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
    children?: React.ReactNode;
}
