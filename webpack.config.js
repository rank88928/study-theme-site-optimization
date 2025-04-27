const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: {
    home: "./src/page/home/index.js",
    menu: "./src/page/menu/index.js",
    aboutus: "./src/page/aboutus/index.js",
    store: "./src/page/store/index.js",
    cart: "./src/page/cart/index.js",
    space: "./src/page/space/index.js",
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
          options: {
            sourceMaps: false,
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
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
        test: /\.(jpg|jpeg|png|gif|svg|webp)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name][hash:5][ext][query]",
        },
      },
      {
        test: /\.ejs$/,
        use: [
          {
            loader: "ejs-loader",
            options: {
              esModule: false,
              variable: "data",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      _: "lodash",
    }),
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
    new HtmlWebpackPlugin({
      filename: "cart.html",
      template: "./src/page/cart/index.ejs",
      chunks: ["cart"],
    }),
    new HtmlWebpackPlugin({
      filename: "space.html",
      template: "./src/page/space/index.ejs",
      chunks: ["space"],
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
      chunkFilename: "css/common.[contenthash].css",
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  devServer: {
    static: path.resolve(__dirname, "dist"),
    open: true,
    hot: true,
    port: 8080,
  },
  // mode: "development",
  // devtool: "eval-source-map",
  mode: "production",
  devtool: false,
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 0,
      cacheGroups: {
        default: {
          minChunks: 2,
        },
      },
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
};
