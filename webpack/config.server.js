const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const { getWebpackDefinePlugin } = require('./utils')

module.exports = (env = {}) => {
  const isProd = !!env.prod
  return {
    mode: isProd ? 'production' : 'development',
    stats: 'errors-warnings',
    target: 'node',
    watch: !isProd,
    externals: [nodeExternals()],
    entry: './src/components/app.js',
    output: {
      path: path.resolve(__dirname, '../dist/server'),
      filename: 'app.js',
      libraryTarget: 'commonjs',
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            {
              loader: 'ignore-loader',
            },
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { targets: { node: 'current' } }], ['@babel/preset-react']],
              plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-syntax-dynamic-import'],
            },
          },
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin(
        getWebpackDefinePlugin({
          __CLIENT__: false,
          __SERVER__: true,
          __DEV__: !isProd,
          __PROD__: isProd,
        })
      ),
    ],
  }
}
