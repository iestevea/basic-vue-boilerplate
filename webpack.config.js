const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const basePath = __dirname;

module.exports = (env, argv) => {
  const isDev = argv.mode !== "production";
  return {
    context: path.join(basePath, "src"),
    resolve: {
      extensions: [".js", ".ts", ".vue"],
      alias: {
        vue: "vue/dist/vue.runtime.esm.js",
      },
    },
    entry: {
      app: "./main.ts",
      vendor: ["vue", "vuetify", "vue-router"],
      vendorStyles: ["../node_modules/vuetify/dist/vuetify.min.css"],
    },
    output: {
      path: path.join(basePath, "dist"),
      filename: "[name].js",
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          loader: "vue-loader",
        },
        {
          test: /\.ts$/,
          use: {
            loader: "ts-loader",
            options: {
              appendTsSuffixTo: [/\.vue$/],
              transpileOnly: true,
            },
          },
        },
        {
          test: /\.css$/,
          oneOf: [
            {
              resourceQuery: /module/,
              use: [
                "vue-style-loader",
                {
                  loader: "css-loader",
                  options: {
                    localsConvention: "camelCase",
                    modules: {
                      mode: "local",
                      localIdentName: "[name]__[local]__[hash:base64:5]",
                    },
                  },
                },
              ],
            },
            {
              use: [isDev ? "vue-style-loader" : MiniCssExtractPlugin.loader, "css-loader"],
            },
          ],
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: 'img/[name].[ext]',
          },
        },
      ],
    },
    devtool: isDev ? "inline-source-map" : "hidden-source-map",
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        favicon: 'assets/favicon.ico',
        filename: "index.html",
        template: "index.html",
        hash: true,
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: path.join(basePath, "./tsconfig.json"),
          vue: true,
        },
      }),
      isDev &&
        new webpack.DefinePlugin({
          "process.env.NODE_ENV": JSON.stringify("development"),
        }),
    ].filter(Boolean),
  };
};
