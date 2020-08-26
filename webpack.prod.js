/**
 * webpack.prod.js for production mode 
 */
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js', 
        chunkFilename: '[name].[contenthash].js', 
        publicPath: '/chat/'
    },
    optimization: { 
        moduleIds: 'hashed',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all'
              }
            }
        }
    }
})