const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const baseUrl = process.env.VUE_APP_BASE_URL;

// console.log('#####', baseUrl);

function resolve(dir) {
    console.log(path.join(__dirname, dir));
    return path.join(__dirname, dir);
}
module.exports = defineConfig({
    devServer: {
        port: 5503,
    },
    transpileDependencies: true,
    publicPath: baseUrl,
    outputDir: 'dist',
    configureWebpack: {
        resolve: {
            alias: {
                '#': resolve('/'),
                '@': resolve('src'),
                '@img': resolve('public/img'),
            },
        },
    },
});
