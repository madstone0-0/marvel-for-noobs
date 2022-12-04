const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const port = process.env.PORT || 4004;

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
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            url: {
                                filter: (url) => {
                                    // Semantic-UI-CSS has an extra semi colon in one of the URL due to which CSS loader along
                                    // with webpack 5 fails to generate a build.
                                    // Below if condition is a hack. After Semantic-UI-CSS fixes this, one can replace use clause with just
                                    // use: ['style-loader', 'css-loader']
                                    if (url.includes("charset=utf-8;;")) {
                                        return false;
                                    }
                                    return true;
                                },
                            },
                        },
                    },
                ],
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
