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
});

module.exports = webpackConfig;
