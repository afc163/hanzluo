const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = (env = {}) => {
  const isProd = !!env.prod
  return {
    mode: isProd ? 'production' : 'development',
    target: 'node',
    watch: !isProd,
    externals: [nodeExternals()],
    entry: './src/components/app.server.js',
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
      new webpack.DefinePlugin({
        __CLIENT__: 'false',
        __SERVER__: 'true',
        __DEV__: JSON.stringify(!isProd),
        __PROD__: JSON.stringify(isProd),
      }),
    ],
  }
}
