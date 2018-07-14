const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

const htmlWebpackPlugin = new HtmlWebPackPlugin({
    template: "./app/index.html",
    filename: "./index.html"
});

module.exports = {
    entry: {
        vendor: ['react', 'react-dom'],
        main: [
            'react-hot-loader/patch',
            'babel-runtime/regenerator',
            './app/index.jsx',
        ],
    },
    mode: 'development',
    output: {
        filename: '[name]-bundle.js',
        chunkFilename: '[name].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js(x)*$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env", "react"]
                    }
                }
            },
            {
                test: /\.(c|sc|)ss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: "[name]_[local]_[hash:base64]",
                            sourceMap: true,
                            minimize: true
                        }
                    },
                    {
                        loader: 'postcss-loader', // Run post css actions
                        options: {
                            plugins: function () { // post css plugins, can be exported to postcss.config.js
                                return [
                                    require('precss'),
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        loader: 'sass-loader' // compiles Sass to CSS
                    }
                ]
            }
        ]
    },
    plugins: [htmlWebpackPlugin]
};