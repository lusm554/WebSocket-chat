/**
 * webpack.prod.js for production mode 
 */
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        // filename: '[name].[contenthash].js', // for production
        // chunkFilename: '[name].[contenthash].js', // for production
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
        publicPath: '/chat/'
    },
    // optimization: { // for production 
    //     moduleIds: 'hashed',
    //     runtimeChunk: 'single',
    //     splitChunks: {
    //         cacheGroups: {
    //           vendor: {
    //             test: /[\\/]node_modules[\\/]/,
    //             name: 'vendors',
    //             chunks: 'all'
    //           }
    //         }
    //     }
    // }
})