const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");


module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "index.html",
        title: "Jate",
      }),

      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "sw.js",
      }),

      new WebpackPwaManifest({
        name: "Jate",
        short_name: "Jate",
        description: "Jate is a simple note taking app",
        background_color: "#ffffff",
        theme_color: "#2196f3",
        crossorigin: "use-credentials",
        icons: [
          {
            src: path.resolve("src/assets/icon.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },

        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              plugins: ["@babel/plugin-transform-runtime"],
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  };
};