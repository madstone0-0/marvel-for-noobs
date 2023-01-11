const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const port = process.env.PORT || 3003;

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    devtool: "inline-source-map",
    output: {
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
            {
                test: /\.css$/i,
                // include: path.resolve("node_modules"),
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jp(e*)g|svg|gif|ico)$/,
                exclude: /node_modules/,
                use: "file-loader?name=[name].[ext]",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            // filename: "./public/index.html",
            // favicon: "./public/favicon.ico",
        }),
    ],

    devServer: {
        host: "localhost",
        port: port,
        historyApiFallback: true,
        open: true,
    },
};
