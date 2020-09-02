const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.min.js"
    },
    resolve: {
        extensions: ['*', '.js']
    },
    devServer: {
        disableHostCheck: true,
        contentBase: path.join(__dirname, 'dist'), // boolean | string | array, static file location
        compress: false, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        // ...
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'SHOSHO CANEL',
            template: './src/index.html'
        }),
        new CopyPlugin({
            patterns: [
                { from: './src/manifest.webmanifest', to: './' },
                { from: './src/icon', to: './icon' },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: (path) => /node_modules/.test(path) && !(/node_modules\/@sidanmor/.test(path) || /node_modules\/@sidanmor/.test(path)), //TODO: remove this ugly exclusion
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
                loader: 'url-loader',
                options: {
                    limit: 8192 * 8,
                },
            },
            {
                test: /sw\.js$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ]
    }
};
