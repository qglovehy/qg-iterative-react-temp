const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const { merge } = require('webpack-merge');

const runtimePath = process.cwd();

const resolve = (dir) => path.join(runtimePath, dir);

const webpackConfig = merge(common, {
  mode: 'production',
  entry: resolve('src/index.js'),
  devtool: 'cheap-module-source-map',
  output: {
    path: resolve('lib'), // 输出目录
    filename: 'index.js', // 输出文件名
    library: {
      type: 'umd', // 通用模块定义
    },
    globalObject: 'this', // 兼容不同环境下的全局对象
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.css', // 输出的 CSS 文件名
    }),
  ],
  optimization: {
    // 是否需要压缩
    minimize: true,
    minimizer: [
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin({
        terserOptions: {
          compress: {
            // drop_console: true, // 移除console.log
            drop_debugger: true, // 移除debugger
          },
          mangle: true, // 注意 `mangle.properties` 选项
          output: {
            comments: false, // 删除所有的注释
          },
        },
      }),
    ],
  },
  // 外部依赖，避免将某些 import 的包打包到 bundle 中
  externals: {
    antd: 'antd',
    moment: 'moment',
    classnames: 'classnames',
    react: 'react',
    'react-dom': 'react-dom',
    'react-router-dom': 'react-router-dom',
    '@ant-design/happy-work-theme': '@ant-design/happy-work-theme',
    '@ant-design/icons': '@ant-design/icons',
    'prop-types': 'prop-types',
  },
});

module.exports = webpackConfig;

// 移除 HtmlWebpackPlugin
module.exports.plugins = module.exports.plugins.filter(
  (plugin) => !(plugin instanceof HtmlWebpackPlugin),
);

// 移除 ProvidePlugin
module.exports.plugins = module.exports.plugins.filter(
  (plugin) => !(plugin instanceof webpack.ProvidePlugin),
);
