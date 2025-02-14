const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  //让校验没有那么严格
  lintOnSave: false,
});
