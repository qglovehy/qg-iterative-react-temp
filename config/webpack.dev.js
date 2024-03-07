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
  //分割包
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // react react-dom react-router-dom 一起打包成一个js文件
        react: {
          test: /[\\/]node_modules[\\/]react(.*)?[\\/]/,
          name: 'chunk-react',
          priority: 100,
        },
        // antd 单独打包
        antd: {
          test: /[\\/]node_modules[\\/]antd[\\/]/,
          name: 'chunk-antd',
          priority: 90,
        },
        // echarts 单独打包
        echarts: {
          test: /[\\/]node_modules[\\/]echarts(-*)?[\\/]/,
          name: 'chunk-echarts',
          priority: 80,
        },
        // 公共组件库单独打包
        'qg-react-components': {
          test: /[\\/]node_modules[\\/]qg-react-components(-*)?[\\/]/,
          name: 'chunk-qg-react-components',
          priority: 60,
        },
        // 剩下node_modules单独打包
        libs: {
          test: /[\\/]node_modules[\\/]/,
          name: 'chunk-libs',
          priority: 10,
        },
      },
    },
  },
});

module.exports = webpackConfig;
