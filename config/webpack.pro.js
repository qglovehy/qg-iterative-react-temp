const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const runtimePath = process.cwd();

const resolve = (dir) => path.join(runtimePath, dir);

const webpackConfig = merge(common, {
  mode: 'production',
  devtool: false,
  plugins: [
    // 复制public内的自定义内容
    new CopyPlugin({
      patterns: [
        {
          from: resolve('public'), //打包的静态资源目录地址
          to: resolve('dist'), //打包到 dist
          globOptions: {
            // 忽略index.html文件 '**/imgs/**',
            ignore: ['**/index.html', '**/README.md'],
          },
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].css',
      ignoreOrder: false,
    }),
  ],
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
