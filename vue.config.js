const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/lares": {
        target: "https://wwwxsv19.com",
        changeOrigin: true,
      },
    },
  },
});
