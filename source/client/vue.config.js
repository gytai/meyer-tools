/**
 *Author: TaiGuangYin
 *Date: 2019
 *Description: vue 配置
 */
module.exports = {
  productionSourceMap: false,
  devServer: {
    // 设置代理
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3008', // 域名
        ws: true, // 是否启用websockets
        changOrigin: true, // 开启代理
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
};
