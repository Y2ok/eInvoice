const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: path.join(__dirname, 'client', 'app-client.js'),
    output: {
        path: path.join(__dirname, 'client', 'static', 'dist'),
        filename: 'eInvoice.js'
    },
    module: {
        loaders: [{
            test: path.join(__dirname, 'client'),
            loaders: ['react-hot-loader', 'babel-loader']
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            mangle: true,
            sourcemap: false,
            beautify: false,
            dead_code: true
        })
    ]
};