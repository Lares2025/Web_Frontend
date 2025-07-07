const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: '/',
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      "/lares": {
        target: "https://lares.wwwxsv19.com",
        changeOrigin: true,
      },
    },
  },
});