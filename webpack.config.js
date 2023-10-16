const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");


module.exports = {
    entry: "./src/scripts/app.js",
    module: {
        rules: [
            { test: /\.css$/i, use: ["style-loader", "css-loader"] },
            { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: "asset/resource" },
            { test: /\.(woff|woff2|eot|ttf|otf)$/i, type: "asset/resource" },
        ],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new CopyWebpackPlugin({ 
            patterns: [ 
                { from: "./src/assets/favicon.ico" },
            ]
        })
    ],
};