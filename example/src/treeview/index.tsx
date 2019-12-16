/**
 * @file workspace tree view
 * @author weijiaxun <weijiaxun@baidu.com>
 */

import React, {useState, useEffect} from 'react';
import ReactTreeView, {TreeItem} from 'react-vsc-treeview';
import {getUser, User} from './api';

const App = () => {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        getUser().then((res) => {
            setUser(res);
        })
    }, []);
    if (user === null) {
        return <TreeItem label="Loading..." />;
    }
    return (
        <>
            <TreeItem label={user.username}></TreeItem>
            <TreeItem label={user.email}></TreeItem>
            <TreeItem label="collection">
                {
                    user.collection.map((item) => (
                        <TreeItem key={item} label={item}></TreeItem>
                    ))
                }
            </TreeItem>
        </>
    );
};

const treeview = ReactTreeView.render(<App />, 'baidu.tree.example');

export default treeview;
