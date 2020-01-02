const webpack = require('webpack')
const path = require('path')
const AssetsPlugin = require('assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { getWebpackDefinePlugin } = require('./utils')
const { DEV_SERVER_URL, PROD_ROOT_URL } = require('../constants')

const emptyFunc = () => {}

module.exports = (env = {}) => {
  const isProd = !!env.prod
  const isAnalysis = !!env.analysis
  const mainEntry = ['./src/client/index.js']

  if (!isProd) {
    mainEntry.unshift(`webpack-hot-middleware/client?path=${DEV_SERVER_URL}__webpack_hmr&noInfo=true`)
  }

  return {
    mode: isProd ? 'production' : 'development',
    stats: 'errors-warnings',
    target: 'web',
    entry: {
      main: mainEntry,
    },
    resolve: {
      alias: {
        // Temp solution for antd icons bundle size issue https://github.com/ant-design/ant-design/issues/12011
        '@ant-design/icons/lib/dist$': path.resolve(__dirname, '../src/client/icons.js'),
      },
    },
    output: {
      path: path.resolve(__dirname, '../dist/client'),
      filename: 'bundle-[hash].js',
      chunkFilename: '[id][chunkhash].js',
      publicPath: !isProd ? DEV_SERVER_URL : PROD_ROOT_URL,
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
                hmr: !isProd,
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
                    libraryDirectory: 'es',
                    style: true,
                  },
                ],
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-syntax-dynamic-import',
              ],
            },
          },
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin(
        getWebpackDefinePlugin({
          __CLIENT__: true,
          __SERVER__: false,
          __DEV__: !isProd,
          __PROD__: isProd,
        })
      ),
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
      isProd ? new CompressionPlugin() : emptyFunc,
      isAnalysis ? new BundleAnalyzerPlugin() : emptyFunc,
    ],
    devtool: !isProd ? 'cheap-module-source-map' : 'hidden-cheap-module-source-map',
  }
}
