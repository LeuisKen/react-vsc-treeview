/**
 * @file workspace tree view
 * @author weijiaxun <weijiaxun@baidu.com>
 */

import React, {useState, useEffect, useMemo} from 'react';
import ReactTreeView, {TreeItem} from 'react-vsc-treeview';
import * as vscode from 'vscode';
import {counterIncreaseEvent, counterDecreaseEvent} from '../events/treeview';
import {getUser, User} from './api';

const Counter = () => {
    const [count, setCount] = useState(0);
    const contextValue = useMemo(
        () => {
            const availableCommands: string[] = [];
            availableCommands.push(
                'counterIncrease',
                'counterDecrease'
            );
            return availableCommands.join('.');
        },
        []
    );
    useEffect(
        () => {
            const disposable = counterIncreaseEvent.event(() => {
                setCount(count + 1);
            })
            return () => {
                disposable.dispose();
            };
        },
        [count, setCount]
    );
    useEffect(
        () => {
            const disposable = counterDecreaseEvent.event(() => {
                setCount(count - 1);
            });
            return () => {
                disposable.dispose();
            };
        },
        [count, setCount]
    );
    return (
        <TreeItem
            label={`Count: ${count}`}
            contextValue={contextValue}
        />
    );
};

const App = () => {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        getUser().then((res) => {
            setUser(res);
        });
    }, []);
    if (user === null) {
        return <TreeItem label="Loading..." />;
    }
    return (
        <>
            <Counter />
            <TreeItem
                label={user.username}
                iconPath={vscode.ThemeIcon.Folder}
            />
            <TreeItem
                label={user.email}
                iconPath={vscode.ThemeIcon.Folder}
            />
            <TreeItem
                label="Operation"
                iconPath={vscode.ThemeIcon.Folder}
            >
                {
                    user.collection.map((item) => (
                        <TreeItem key={item} label={item} />
                    ))
                }
            </TreeItem>
        </>
    );
};

const treeview = ReactTreeView.render(<App />, 'baidu.tree.example');

export default treeview;
