const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const _ = require('lodash');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    context: __dirname,
    devtool: isProduction ? (void 0) : 'eval',
    entry: [
        './styles/main.scss',
        './src/index.js'
    ],
    stats: {
      warnings: false
    },
    node: {
        fs: "empty"
    },
    resolve: {
        root: path.resolve('./src'),
        alias: {
            'local_lodash': 'lib/lodash',
            'underscore': 'lodash'
        }
    },
    module: {
        loaders: [
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract(
                'style-loader',
                isProduction
                    ? ['css-loader?importLoaders=1', 'postcss-loader', 'sass-loader?outputStyle=expanded']
                    : ['css-loader?sourceMap&importLoaders=1','postcss-loader?sourceMap','sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true']
            ) },
            { test: /\.(woff|woff2|otf|ttf|eot|svg|png|htc)$/, loader: 'file-loader' }
        ],
        preLoaders: _.compact([
            isProduction ? null : { test: /\.js$/, loader: 'source-map-loader' }
        ])
    },
    output: {
        library: 'MathGamesAPIExample',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        path: './dist',
        filename: 'example.js',
        pathinfo: true
    },
    plugins: _.compact([
        new ExtractTextPlugin('example.css'),
        new webpack.optimize.UglifyJsPlugin({compress: false, mangle: true, sourceMap: true})
    ])
};
