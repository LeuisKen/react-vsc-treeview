/**
 * @file vscode webpack 构建配置
 * @author weijiaxun <weijiaxun@baidu.com>
 * @desc ref: https://code.visualstudio.com/api/working-with-extensions/bundling-extension#configure-webpack
 */

// @ts-check

'use strict';

const path = require('path');

/** @type {import('webpack').Configuration} */
const config = {
    target: 'node', // vscode extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/

    entry: './src/extension.ts', // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
    output: { // the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
        path: path.resolve(__dirname, 'dist'),
        filename: 'extension.js',
        libraryTarget: 'commonjs2',
        devtoolModuleFilenameTemplate: '../[resource-path]'
    },
    devtool: 'source-map',
    externals: {
        vscode: 'commonjs vscode' // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', 'jsx'],
        alias: {
            '@utils': path.resolve(__dirname, '../@utils')
        },
        symlinks: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
        ]
    }
};

module.exports = config;
