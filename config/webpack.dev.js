const webpack = require('webpack');
const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const common = require('./webpack.common.js');

const webpackConfig = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    host: '0.0.0.0',
    compress: true,
    historyApiFallback: true,
    client: {
      overlay: true, // 浏览器全屏显示错误信息
    },
    open: true, // 开启自动打开浏览器页面
    hot: true, // 启动模块热更新 HMR
    // clientLogLevel: 'none', // 不再输出繁琐的信息
  },
  plugins: [new ReactRefreshWebpackPlugin(), new webpack.HotModuleReplacementPlugin()],
});

module.exports = webpackConfig;
