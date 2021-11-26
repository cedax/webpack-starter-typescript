const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'production',
    optimization: {
        minimizer: [ new OptimizeCssAssetsPlugin() ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[contenthash].js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx|ts)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: '[name].[ext]',
                            outputPath: 'assets/'
                        }
                    }
                ]
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
                options: {
                    sources: false,
                    minimize: true
                }
            },
            {
                test: /\.(scss|css)$/i,
                exclude: /styles\.scss$/i,
                use: ["css-loader", "sass-loader"]
            },
            {
                test: /styles\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new MinifyPlugin()
    ]
    
}