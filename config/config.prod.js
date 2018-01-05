// const APIURL = 'https://campus.alipay-eco.com';
// module.exports = {
//   host: '0.0.0.0',
//   port: '3000',
//   publicPath: 'http://dash.oss-cn-beijing.aliyuncs.com/fe/',
//   // proxyURL: APIURL,
//   app: {
//     // ENV: JSON.stringify('production'),
//     // APIURL: JSON.stringify(APIURL),
//     'process.env': {
//       NODE_ENV: JSON.stringify('production')
//     }
//   },
//   // dingtalk: {
//   //   webhook: 'https://oapi.dingtalk.com/robot/send?access_token=9c1ad5953b07726890536f36a5243725ba6ddc4b86afd2c99c54c401b81ccb70',
//   // }
// };

const APIURL = ''; // 线上环境接口请求地址前缀
module.exports = {
  host: '0.0.0.0',
  port: '3000',
  publicPath: 'http://dash.oss-cn-beijing.aliyuncs.com/fe-mobile/yihe/',
  // proxyURL: APIURL,
  app: {
    coustomServiceURL: JSON.stringify('http://kf1.learnsaas.com/chat/chatClient/chatbox.jsp?companyID=920677&configID=70323&jid=2218668569'),
    // app版本
    app_version: JSON.stringify('1'),
    ENV: JSON.stringify('production'),
    APIURL: JSON.stringify(APIURL),
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  },
};
