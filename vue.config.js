const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      "/lares": {
        target: "https://wwwxsv19.com",
        changeOrigin: true,
      },
    },
  },
});
