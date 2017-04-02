var webpack = require("webpack");

module.exports = {
    devtool: "source-map",
    entry: "./src/index.js",  //náš vstupní bod aplikace
    output: {
        filename: "bundle.js",   //výstupní balík všech zdrojových kódů
        path: "build"
    },
    module: { //sem budeme zanedlouho vkládat transformační moduly
        loaders : [
            {
                test: /.css$/,
                loader: "style!css"
                //exclude: "node_modules"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['eslint-loader', 'babel-loader?presets[]=es2015']
            },
            {
              test: /\.(jpe?g|png|gif|svg)$/i,
              exclude: /node_modules/,
              loader: 'file-loader?name=[name].[ext]',
            },
            //{ test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ]
};
