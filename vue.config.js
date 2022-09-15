module.exports={
  publicPath:'./',
  devServer:{
      host: '0.0.0.0',
      port:'8080',
      https: false,
      // proxy:{
      //   "/api": {
      //     // target: '',  // API服务器环境   http://weletech.com:8082/public   本地开发环境 http://192.168.0.25:8082/public
      //     ws: true, // 代理的WebSockets
      //     changeOrigin: true, // 允许websockets跨域
      //     pathRewrite: {
      //       "^/api": ""
      //     }
      //   }
      // },
  }
}