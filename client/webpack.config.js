const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// Define paths
const PATHS = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
  assets: path.resolve(__dirname, 'src/assets'),
};

// Plugins configuration
const plugins = [
  new HtmlWebpackPlugin({
    template: 'index.html',
    title: 'Jate',
  }),
  new InjectManifest({
    swSrc: path.join(PATHS.src, 'src-sw.js'),
    swDest: 'sw.js',
  }),
  new WebpackPwaManifest({
    name: 'Jate',
    short_name: 'Jate',
    description: 'Jate is a simple note taking app',
    background_color: '#ffffff',
    theme_color: '#2196f3',
    crossorigin: 'use-credentials',
    icons: [
      {
        src: path.resolve(PATHS.assets, 'icon.png'),
        sizes: [96, 128, 192, 256, 384, 512],
        destination: path.join('assets', 'icons'),
      },
    ],
  }),
];

// Module rules configuration
const rules = [
  {
    test: /\.css$/i,
    use: ['style-loader', 'css-loader'],
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        plugins: ['@babel/plugin-transform-runtime'],
        presets: ['@babel/preset-env'],
      },
    },
  },
];

// Webpack configuration
module.exports = {
  mode: 'development',
  entry: {
    main: path.join(PATHS.src, 'js/index.js'),
    install: path.join(PATHS.src, 'js/install.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: PATHS.dist,
  },
  plugins,
  module: {
    rules,
  },
};