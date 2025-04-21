const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    home: "./src/page/home/index.js",
    menu: "./src/page/menu/index.js",
    aboutus: "./src/page/aboutus/index.js",
    store: "./src/page/store/index.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /.scss$/,
        use: [
          "style-loader", //把 CSS 插進 < style>
          "css-loader", //讓 JS 可以處理 CSS
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: [path.resolve(__dirname, "src")],
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: "html-loader",
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/i, // 匹配圖片類型
        type: "asset/resource",
        generator: {
          filename: "images/[name][hash][ext][query]", // 輸出的圖片路徑和命名規則
        },
      },
      {
        test: /\.ejs$/,
        use: [
          {
            loader: "ejs-loader",
            options: {
              esModule: false, // 禁用 esModule
              variable: "data", // 設置模板變數
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/page/home/index.ejs",
      chunks: ["home"],
    }),
    new HtmlWebpackPlugin({
      filename: "menu.html",
      template: "./src/page/menu/index.ejs",
      chunks: ["menu"],
    }),
    new HtmlWebpackPlugin({
      filename: "aboutus.html",
      template: "./src/page/aboutus/index.ejs",
      chunks: ["aboutus"],
    }),
    new HtmlWebpackPlugin({
      filename: "store.html",
      template: "./src/page/store/index.ejs",
      chunks: ["store"],
    }),

    new webpack.ProvidePlugin({
      $: "jquery",
      _: "lodash",
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  devServer: {
    static: path.resolve(__dirname, "dist"), // 靜態文件路徑
    open: true,
    hot: true,
    port: 8080,
  },
  mode: "development", // 開發模式
  devtool: "eval-source-map", //映射回原始狀態 除錯
};
