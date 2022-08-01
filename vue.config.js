const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true
})

// Vant
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');

module.exports = {
    configureWebpack: {
        plugins: [
            ComponentsPlugin({
                resolvers: [VantResolver()],
            }),
        ],
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'https://music.163.com',//这里填入你要请求的接口的前缀
                ws: true,//代理websocked
                changeOrigin: true,//虚拟的站点需要更管origin
                secure: true,                   //是否https接口
                pathRewrite: {
                    '^/api': ''//重写路径
                }
            }
        }
    }
};
