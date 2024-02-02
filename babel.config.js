const presets = [['@babel/preset-env'], '@babel/preset-react'];

const plugins = [
  '@babel/plugin-transform-runtime', //重用 Babel 注入的帮助函数，减少代码冗余
  '@babel/plugin-syntax-dynamic-import', //解析动态导入语法（即 import() 函数）
  '@babel/plugin-proposal-function-bind',
  '@babel/plugin-proposal-optional-chaining', //转换可选链操作符（?.），它允许您安全地访问深层嵌套的属性，而不必每一级都检查是否存在
  ['@babel/plugin-proposal-decorators', { legacy: true }], //转换装饰器语法
  ['@babel/plugin-proposal-class-properties', { loose: false }], //类属性语法
];

const config = { presets, plugins };

module.exports = config;
