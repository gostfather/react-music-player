'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: 'eval-source-map',
    entry: [//输入文件
        'webpack-dev-server/client?http://localhost:3000',//监听端口
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',//热更新
        path.join(__dirname, 'app/index.js')//入口文件地址
    ],
    output: {//输出
        path: path.join(__dirname, '/dist/'),
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './index.tpl.html',//模板文件
          inject: 'body',
          filename: './index.html'//最后打包好展示的页面
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
	module: {
		resolve:{
            extensions:['','.js','.json']
        },        
        loaders: [//打包模块
            {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: "babel-loader",
              query:
                {
                  presets:['react','es2015']
                }
            },
            {
                test: /\.json?$/,
                loader: 'json'
            },
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.less/,
                loader: 'style-loader!css-loader!less-loader'
            }
        ]
	}
}
