const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, /*关闭语法检查*/
  // 开启代理服务器(方式一)
  /* devServer: {
    proxy: "http://localhost:5000"
  } */
  // 开启代理服务器(方式二)
  devServer: {
    proxy: {
      '/atguigu': {// 匹配所有以 '/api1'开头的请求路径
        target: 'http://localhost:5000',// 代理目标的基础路径
        // ws: true,  // 用于支持 websocket
        // changeOrigin: true, // 用于控制请求头中的host值
        pathRewrite: { '^/atguigu': '' }//代理服务器将请求地址转给真实服务器时会将 /api1 去掉
      },
      '/demo': {// 匹配所有以 '/api1'开头的请求路径
        target: 'http://localhost:5001',// 代理目标的基础路径
        // ws: true,  // 用于支持 websocket
        // changeOrigin: true, // 用于控制请求头中的host值
        pathRewrite: { '^/demo': '' }//代理服务器将请求地址转给真实服务器时会将 /api1 去掉
      },
    }
  }
})
