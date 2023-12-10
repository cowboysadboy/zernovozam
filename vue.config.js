const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    publicPath: process.env.NODE_ENV === "production" ? "/zernovozam/" : "/",
    transpileDependencies: true,
    css: {
        loaderOptions: {
            sass: {
                // prependData: `@import "./styles/styles.scss";`
            }
        }
    }

})