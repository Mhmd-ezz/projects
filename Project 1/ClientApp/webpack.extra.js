const webpack = require("webpack");

module.exports = {
    plugins: [
        // @ issue -> https://medium.jonasbandi.net/angular-cli-and-moment-js-a-recipe-for-disaster-and-how-to-fix-it-163a79180173
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
};
