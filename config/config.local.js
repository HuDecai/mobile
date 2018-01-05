const host = '0.0.0.0';
const APIURL = '';
// const proxyURL = 'http://192.168.0.199:8080'; // 本地代理请求地址
const proxyURL = 'http://front.covazsport.com';
module.exports = {
    host: host,
    port: '3004',
    proxyURL: proxyURL,
    app: {
        ENV: JSON.stringify('local'),
        APIURL: JSON.stringify(''),
        coustomServiceURL: JSON.stringify('http://kf1.learnsaas.com/chat/chatClient/chatbox.jsp?companyID=920677&configID=70323&jid=2218668569'),
        // app版本
        app_version: JSON.stringify('1'),
    },
};
