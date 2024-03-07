const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const WebpackBar = require('webpackbar');
const { getPostCssConfigPath } = require('./util');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const runtimePath = process.cwd();

const isProd = () => process.env.NODE_ENV === 'production';

const resolve = (dir) => path.join(runtimePath, dir);

const tsRegex = /\.(ts|tsx)$/;
const svgRegex = /\.svg$/;
const otherRegex = /\.(woff2?|ttf)$/;
const jsRegex = /\.(js|mjs|jsx|ts|tsx)$/;
const imgRegex = /\.(jpe?g|png|gif|webp)$/;
const cssRegex = /\.css$/;
const sassRegex = /\.(scss|sass)$/;
const moduleRegex = /node_modules/;

const babelConfig = {
  presets: [['@babel/preset-env'], '@babel/preset-react'],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-function-bind',
    '@babel/plugin-proposal-optional-chaining',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
  ],
  cacheDirectory: true,
};

// 返回处理样式loader函数
const getStyleLoaders = (pre) =>
  [
    //解决react 样式 冲突 CssModule
    isProd() ? MiniCssExtractPlugin.loader : 'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: '[path][name]-[local]', //--[hash:base64:5]
        },
      },
    },
    // 配合package.json中browserslist来指定兼容性
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          config: getPostCssConfigPath(runtimePath),
        },
      },
    },
    pre && {
      loader: pre,
      options: {},
    },
  ].filter(Boolean);

module.exports = {
  entry: resolve('src/main.js'),
  output: {
    path: isProd() ? resolve('dist') : void 0,
    publicPath: '/', //上线后服务器文件夹路径可能需要调整
    filename: isProd() ? 'js/[name].[contenthash:10].js' : 'js/[name].js',
    chunkFilename: isProd() ? 'js/[name].[contenthash:10].chunk.js' : 'js/[name].chunk.js',
    clean: true,
  },
  plugins: [
    //index.html 文件配置
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('public/index.html'),
      hash: true, // 防止缓存
      minify: {
        removeAttributeQuotes: true, // 压缩 去掉引号
      },
      version: Date.now(), // 将版本号传递给模板  防止index.html  图标和公共样式缓存
    }),
    //import全局导入
    new webpack.ProvidePlugin({
      _: 'lodash',
      $: 'jquery',
    }),
    //优雅的进度条
    new WebpackBar({ reporters: ['profile'], profile: true }),
    //web端使用 process
    new NodePolyfillPlugin(),
  ],
  optimization: {
    splitChunks: false,
  },
  // 选择性地控制要显示的信息类型
  stats: {
    assets: true,
    colors: true,
    errors: true,
    errorDetails: true,
    modules: false,
  },
  module: {
    rules: [
      // 处理css
      // 处理 Ant Design 样式
      {
        test: cssRegex,
        use: ['style-loader', 'css-loader'],
      },
      //处理scss
      {
        test: sassRegex,
        exclude: moduleRegex,
        use: getStyleLoaders('sass-loader'),
      },
      // 处理图片
      {
        test: imgRegex,
        exclude: moduleRegex,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024,
          },
        },
      },
      // 处理Svg
      {
        test: svgRegex,
        include: [resolve('src/assets')], // 只处理指定文件夹下的文件
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId: 'icon-[name]', // symbol id 格式
            },
          },
        ],
      },
      // 处理其他资源
      {
        test: otherRegex,
        exclude: moduleRegex,
        type: 'asset/resource',
      },
      // 处理 JS TS 文件
      {
        test: jsRegex,
        exclude: moduleRegex,
        use: [
          {
            loader: 'babel-loader',
            options: babelConfig,
          },
        ],
      },
      // 处理 TS 文件
      {
        test: tsRegex,
        exclude: moduleRegex,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: resolve('tsconfig.json'), // 指定 TypeScript 配置文件
            },
          },
        ],
      },
    ],
  },
  // webpack解析模块加载选项
  resolve: {
    // 自动补全文件扩展名
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json', '.scss', '.less'], // 自动解析确定的扩展
    // 设置别名
    alias: {
      '@': resolve('src'),
    },
  },
};
