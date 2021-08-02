const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { DefinePlugin } = require('webpack');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: './.env' });

module.expçorts = {
  entry: './src/index.ts',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, '../src/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // babel + webpack을 이용해서 자바스크립트 트랜스파일링
          options: {
            configFile: './.babelrc',
          },
        },
      },
      {
        test: /\.(png|jpe?g|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'public/images/',
            },
          },
        ],
      },
      {
        test: /\.(sc|sa|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin(),
    new DefinePlugin({
      'process.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL),
      'process.env.GITHUB_SIGN_URL': JSON.stringify(process.env.GITHUB_SIGN_URL),
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },
  devServer: {
    host: '127.0.0.1',
    contentBase: './static',
    hot: true,
  },
};
