/**
 * @file TreeItem 组件，为了类型不出问题，实际上是 div
 * @author weijiaxun<weijiaxun@baidu.com>
 */

import * as vscode from 'vscode';
import React from 'react';

const TreeItem: React.SFC<TreeItemProps> = props => <div {...props}></div>;

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
}

export type Props = React.PropsWithChildren<TreeItemProps>

export const propKeys: (keyof Props)[] = [
    'label', 'id', 'iconPath', 'description', 'resourceUri', 'tooltip',
    'command', 'contextValue', 'children'
];

export interface UpdatedPayload<T extends keyof Props = keyof Props> {
    type: T;
    value: Props[T];
}
