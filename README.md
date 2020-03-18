# React VS Code TreeView

## 背景

TreeView 是 VS Code 为第三方插件开发提供的最主要的视图定制方式。此 API 用于构建一个基本的树状结构来承载用户交互，如下图所示。

![TreeViewExample](/assets/TreeViewExample.png)

VS Code 为用户编写 TreeView 提供了递归式的 API，即：

**getChildren**

用于获取某个节点下属的节点数组，根节点记为 null；

**getTreeItem**

用于获取实际渲染的 TreeItem 实例。

这种 API 非常适合文件树的场景（例如 ftp 文件浏览插件、github 文件浏览插件）：不知道每一层有多少个节点，也不知道有多少层，并且对懒加载的支持也非常好。其基本使用形式如下（代码来自 [vscode-github-explorer](https://github.com/LeuisKen/vscode-github-explorer/blob/master/src/view/fileTreeDataProvider.ts#L12) ）：

```ts
class FileTreeView
    implements vscode.TreeDataProvider<FileTreeNode>, vscode.Disposable {

    private disposables: vscode.Disposable[] = [];

    // 这些事件用于更新树中的内容
    private _onDidChangeTreeData = new vscode.EventEmitter<FileTreeNode>();
    readonly onDidChangeTreeData? = this._onDidChangeTreeData.event;

    // 这里获取 children 信息，作为数组返回
    async getChildren(node?: FileTreeNode) {
        const data = await github.getFileEntries(repository, ref, path);
        return data;
    }

    // 这里将每一个 children 再一一映射到 TreeItem 数据结构
    getTreeItem(node: FileTreeNode) {
        const uri = vscode.Uri.parse('...');
        const item = new vscode.TreeItem(uri);
        return item;
    }

    dispose() {
        this.disposables.forEach(disposable => disposable.dispose());
        this.disposables = [];
    }
}
```

不过，我们在使用这一 API 开发业务的过程中，会去创建的常常不止是文件树，也包括了比较常见的菜单——虽然可能不知道每层有多少个节点，但是我们知道一共有多少层，懒加载也并不总是那么必要。这种情况下，用前端更为熟悉的类 HTML 语法声明式的编写一个这样的 TreeView 是非常简单的。对于如下图的 TreeView，相信大家都能很直观的想到如何用 HTML 描述（这里为了简洁采用 markdown 描述）：

![SimpleMenuTree](/assets/SimpleMenuTree.png)

```html
- John
- john@example.com
- Operation
    - Add
    - Update
    - Delete
```

而如果使用 VS Code TreeView 的递归式 API，去表示这种声明式更擅长的树状结构，代码就会稍显得有些冗余，不够清晰。

```ts
class SimpleTreeView
    implements vscode.TreeDataProvider<Node> {

    private disposables: vscode.Disposable[] = [];

    // getChildren 无法直观的展示数据间存在的父子关系
    // 当然你可以借助数据结构和循环来优化下面的代码
    // 但我们更希望找到更为通用的解决方案，并且尽量复用我们已有的知识
    async getChildren(node?: Node) {
        if (node === null) {
            return ['John', 'john@example.com', 'Operation'];
        }
        else if (node === 'Operation') {
            return ['Add', 'Update', 'Delete'];
        }
        return [];
    }
}
```

为了能够更加清晰高效地解决类似“菜单”这样：我们知道有多少层，并且为每层赋予了确切含义的树状视图的开发问题，我们决定使用 React 做为视图描述方式。因此开发了本代码库。

## 下载

使用 npm 或者 yarn 安装：

```sh
$ npm i react-vsc-treeview --save
```

```sh
$ yarn add react-vsc-treeview
```

## 使用文档

### 如何在 VS Code 中添加一个 TreeView

无论你使用那种方式创建 TreeView，这里的步骤都是必须的。

关于如何创建一个 VS Code 插件，可以使用官方提供的 Yeoman Generator，具体参考官方文档：[Your First Extension](https://code.visualstudio.com/api/get-started/your-first-extension)。简化的命令如下：

```sh
$ npm install -g yo generator-code
$ yo code       # 会有交互式命令行提示你如何配置
$ code ./helloworld
```

创建一个 TreeView 需要在 package.json 里面做一些基础的声明，具体参考官方文档：[Tree View Guide](https://code.visualstudio.com/api/extension-guides/tree-view)。其中包括 viewsContainer 和 view 两个概念，可以理解成 View 的 Tab 容器和 View 本身，官方内置提供了四个 viewsContainer （explorer：文件浏览窗口、debug：调试窗口、scm：版本控制窗口、test：测试窗口）。简单起见，我们可以像代码库中自带的 example 一样把 view 添加到现有的 test viewContainer 中，这样今需要在 `package.json` 中添加如下内容即可：

```json
"contributes": {
    "views": {
        "test": [
            {
                "id": "baidu.tree.example",
                "name": "用户面板"
            }
        ]
    }
},
```

### 使用 React VSC TreeView

使用起来就像正常编写 React 组件一样自然：

```jsx
import React, {useState, useEffect} from 'react';
import ReactTreeView, {TreeItem} from 'react-vsc-treeview';
import {getUser, User} from './api';

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
            <TreeItem label={user.username}></TreeItem>
            <TreeItem label={user.email}></TreeItem>
            <TreeItem label="Operation">
                {
                    user.collection.map((item) => (
                        <TreeItem key={item} label={item}></TreeItem>
                    ))
                }
            </TreeItem>
        </>
    );
};

const treeview = ReactTreeView.render(
    <App />,
    'baidu.tree.example'        // 这里对应 package.json 中配置的 view id 字段
);
```

React VSC TreeView 仅提供了上述示例代码中展示的两个 API，`ReactTreeView` 和 `TreeItem`。

**ReactTreeView**

你可以简单的把它理解成 `ReactDOM`，正像我们常用的那样：

```jsx
ReactDOM.render(<App />, document.getElementById('app'));
```

他提供的能力也是 render，使用如下：

```jsx
const treeview = ReactTreeView.render(
    <App />,
    'baidu.tree.example'        // 这里对应 package.json 中配置的 view id 字段
);
```

**TreeItem**

TreeItem 是唯一允许被使用的 React 组件（因此不要尝试使用 `p` `div` `span` 这样的传统 HTML 标签）。其 Props 接口如下，除了 command 属性额外做了对字符串类型的支持，其余均与 VS Code API 提供的 [TreeItem API](https://code.visualstudio.com/api/references/vscode-api#TreeItem) 保持一致：

```ts
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
```

接下来，就请愉快的使用你所熟悉的 React 吧，推荐使用 React hooks API。

## 感谢

本代码库灵感和代码参考都来源于 Sophie Alpert 在 React Conf 2019 上所做的分享—— [Building a Custom React Renderer](https://youtu.be/CGpMlWVcHok) ，在此感谢。
