var path = require("path"),
    webpack = require("webpack"),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

const dirname = path.resolve("./");

const vendorModules = ["jquery", "lodash", "socket.io-client", "rxjs"];

function createClientConfig(isDebug) {
    const devTool = isDebug ? "eval-source-map" : "source-map";
    const plugins = [new webpack.optimize.CommonsChunkPlugin({name: "vendor", filename: "vendor.js"})];

    const cssLoader = {test: /\.css$/, loader: "style-loader!css-loader"};
    const sassLoader = {test: /\.scss$/, loader: "style-loader!css-loader!sass-loader"};
    const appEntry = ["./src/client/application.js"];

    if(!isDebug){
        plugins.push(new webpack.optimize.UglifyJsPlugin());
        plugins.push(new ExtractTextPlugin("[name].css"));

        cssLoader.loader = ExtractTextPlugin.extract({fallback:"style-loader", use: "css-loader"});
        sassLoader.loader = ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader!sass-loader"});
    } else {
        plugins.push(new webpack.HotModuleReplacementPlugin());
        appEntry.splice(0,0,"webpack-hot-middleware/client");
    }

    //WEBPACK CONFIG
    return {
        devtool: devTool,
        entry: {
            application: appEntry,
            vendor: vendorModules
        },
        output: {
            path: path.join(dirname, "public", "build"),
            filename: "[name].js",
            publicPath: "/build/"
        },
        resolve: {
            alias: {
                shared: path.join(dirname, "src", "shared")
            }
        },
        module: {
            loaders: [
                {test: /\.js$/, loader: "babel-loader", exclude: /node_modules/},
                {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/},
                {test: /\.(png|jpg|jpeg|gif|woff|ttf|eot|svg|woff2)$/, loader: "url-loader?limit=1024"},
                cssLoader,
                sassLoader
            ]
        },
        plugins: plugins
    };
}

module.exports = createClientConfig;
