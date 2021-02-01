const webpack = require('webpack');
const path = require('path');

// const config = {
//     entry: './src/index.js',
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: 'bundle.js'
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.css$/,
//                 use: [
//                     { loader: "style-loader" },
//                     { loader: "css-loader" }
//                 ]
//             }
//         ]
//     }
// };

// module.exports = config;

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};