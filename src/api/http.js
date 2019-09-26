const Fly = require('flyio/dist/npm/wx')
const config = require('./config')
const { CryptoApi } = require('./crypto')
const { SignApi } = require('./sign')
const cid = config.Auth.cid
const accountKey = config.Auth.accountKey
const key = CryptoApi.getKeys(accountKey) // 密钥

const log = function (msg) {
  console.log(msg)
}

const baseURL = process.env.NODE_ENV === 'development'
  ? config.Host.development
  : process.env.NODE_ENV === 'production'
    ? config.Host.production
    : config.Host.test

let fly = new Fly()

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'apigroupcode': 'tranning'
}

Object.assign(fly.config, {
  headers: headers,
  baseURL: baseURL,
  timeout: 50000,
  widthCredentials: true
})

fly.interceptors.request.use(request => {
  // console.log(request)
  const uid = ''
  // console.log('accountKey:' + accountKey)
  // console.log('key:' + key)
  // const data = request.body ? JSON.stringify(request.body) : '' // 需要加密的请求数据，转成字符串
  // const data = request.body
  // console.log('data:', data)
  const q = CryptoApi.aesEncrypt(request.body ? request.body : {}, key) // 利用请求参数data和密钥key
  // const q = data
  // console.log('q:' + q)
  const sign = SignApi.getSign({ // 利用cid、q、uid、accountKey生成签名
    cid,
    q,
    uid,
    accountKey
  })
  // console.log('sign:' + sign)
  var queryData = { // 最终的请求体
    cid
  }
  if (uid) {
    queryData.uid = uid
  }
  if (q) {
    queryData.q = q
  }
  queryData.sign = sign
  request.body = queryData // 放入请求体

  const token = wx.getStorageSync('token')
  if (token) {
    request.headers["token"] = token;
  }

  return request
})

let status = false
let timer
fly.interceptors.response.use(response => {
  if (response.data.code === 5) {
    wx.removeStorageSync('token')
    if (status) {
      clearTimeout(timer)
      timer = setTimeout(() => (status = false), 300)
      return response.data.content
    }
    status = true;
    timer = setTimeout(() => (status = false), 300)
    wx.showModal({
      title: "跳转登录",
      content: "您还未登陆，请前往登录页面。",
      confirmColor: '#FF6421',
      cancelText: '回到首页',
      success(res) {
        if (res.confirm) {
          mpvue.navigateTo({ url: '/pages/login/main' })
        } else if (res.cancel) {
          mpvue.switchTab({ url: '/pages/index/main' })
        }
      }
    });
  }
  return response.data.content
}, err => {
  console.log(err)
  log(err)
})
export default fly
