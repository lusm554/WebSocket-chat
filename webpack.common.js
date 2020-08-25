/**
 * webpack.common.js included any plugins 
 * that are required for both environments
 */
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        client: './public/client.js',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            chunks: ['client'],
            template: './public/index.html',
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            inject: true,
            chunks: [],
            template: './public/signin.html',
            filename: 'signin.html'
        }),
        new HtmlWebpackPlugin({
            inject: true,
            chunks: [],
            template: './public/signup.html',
            filename: 'signup.html'
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'build'),
    }
}