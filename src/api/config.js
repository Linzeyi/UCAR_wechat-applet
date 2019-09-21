const config = {
  Host: {
    production: 'https://apiproxytest.ucarinc.com/ucarincapiproxy/',
    development: 'https://apiproxytest.ucarinc.com/ucarincapiproxy/',
    test: 'https://apiproxytest.ucarinc.com/ucarincapiproxy/'
  },
  Auth: {
    cid: '007001',
    accountKey: '7vL5EioNUyQ9Rs5gv7Jm'
  },
  AccessUrl: [
    '/action/user/login',
    '/action/user/register',
    '/action/user/getCaptcha',
    '/action/goods/getPopularSearch',
    '/action/goods/searchGoods'
  ]
}
module.exports = config
