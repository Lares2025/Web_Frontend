const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
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
