const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");

module.exports = {
    entry: "./src/index.js",
    devtool: "source-map",
    output: {
        filename: "bundle.[contenthash].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/marvel-for-noobs/",
    },
    mode: "production",
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
                use: [
                    MiniCssExtractPlugin.loader,
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
            filename: "index.html",
            favicon: "./public/favicon.ico",
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),

        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].[contenthash].css",
        }),
        new ImageMinimizerPlugin({
            minimizer: {
                implementation: ImageMinimizerPlugin.imageminMinify,
                options: {
                    plugins: [
                        ["gifsicle", { interlaced: true }],
                        ["jpegtran", { progressive: true }],
                        ["optipng", { optimizationLevel: 5 }],
                        [
                            "svgo",
                            {
                                name: "preset-default",
                                params: {
                                    overrides: {
                                        removeViewBox: {
                                            active: false,
                                        },

                                        addAttributesToSVGElement: {
                                            attributes: [
                                                {
                                                    xmlns: "http://www.w3.org/2000/svg",
                                                },
                                            ],
                                        },
                                    },
                                },
                            },
                        ],
                    ],
                },
            },
        }),
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
            }),
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        "default",
                        { discardComments: { removeAll: true } },
                    ],
                },
            }),
        ],
    },
};
