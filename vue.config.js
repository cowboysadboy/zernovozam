const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    publicPath:'/zernovozam/',
    transpileDependencies: true,
    css: {
        loaderOptions: {
            sass: {
                // prependData: `@import "./styles/styles.scss";`
            }
        }
    }

})