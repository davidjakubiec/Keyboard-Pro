const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index.bundle.js',
        publicPath: '/'
    },
    devServer: {
        port: 3010,
        open: true,
        hot: true,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
                // options: {
                //     presets: ['@babel/preset-env', '@babel/preset-react'],
                //     plugins: [
                //       ['@babel/plugin-transform-react-jsx', { 'throwIfNamespace': false }]
                //     ]
                //   }
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
              {
                test: /\.svg$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]', // Output the file with its original name and extension
                      outputPath: 'images/', // Output path for the processed SVG files
                    },
                  },
                ],
              },
              {
                test: /\.(png|jpe?g|gif)$/i,
                use: {
                  loader: 'file-loader',
                  options: {
                    name: '[name].[ext]', // Output file name and extension
                    outputPath: 'images/', // Output folder for the PNG files
                  },
                },
              }
        ]
    },
    plugins: [new MiniCssExtractPlugin()]
};