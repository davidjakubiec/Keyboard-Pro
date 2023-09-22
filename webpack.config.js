const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index.bundle.js'
    },
    devServer: {
        port: 3010,
        open: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                exclude: /aos\.css$/, // Exclude aos.css from the general rule
                use: ['style-loader', 'css-loader'],
              },
              {
                test: /aos\.css$/, // Apply aos.css specific loader rule
                use: ['style-loader', 'css-loader'],
              },
        ]
    },
    plugins: [new MiniCssExtractPlugin()]
};