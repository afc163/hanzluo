const webpack = require('webpack')
const path = require('path')
const AssetsPlugin = require('assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = (env = {}) => {
  const isProd = !!env.prod
  const mainEntry = ['./src/client/index.js']

  if (!isProd) {
    mainEntry.unshift('webpack-hot-middleware/client?path=http://localhost:3001/__webpack_hmr&noInfo=true')
  }

  return {
    mode: isProd ? 'production' : 'development',
    target: 'web',
    entry: {
      main: mainEntry,
    },
    output: {
      path: path.resolve(__dirname, '../dist/client'),
      filename: 'bundle-[hash].js',
      publicPath: !isProd ? 'http://localhost:3001/dist/' : 'https://hanzluo.com/',
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                sourceMap: !isProd,
              },
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: !isProd,
              },
            },
            {
              loader: 'less-loader',
              options: {
                modifyVars: require('./antd.global'),
                javascriptEnabled: true,
                paths: [path.resolve(__dirname, 'node_modules')],
                sourceMap: !isProd,
              },
            },
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: isProd ? '> 1%, not dead' : { esmodules: true } }],
                ['@babel/preset-react'],
              ],
              plugins: [
                [
                  'import',
                  {
                    libraryName: 'antd',
                    style: true,
                  },
                ],
                '@babel/plugin-proposal-class-properties',
              ],
            },
          },
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        __CLIENT__: 'true',
        __SERVER__: 'false',
        __DEV__: JSON.stringify(!isProd),
        __PROD__: JSON.stringify(isProd),
      }),
      new CopyPlugin([
        {
          from: 'src/server/public/',
          to: 'public/',
        },
      ]),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      new AssetsPlugin({
        filename: './dist/server/assets.json',
        // fileTypes: ['js', 'css', 'jpg'],
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: !isProd ? 'cheap-module-source-map' : 'hidden-cheap-module-source-map',
  }
}