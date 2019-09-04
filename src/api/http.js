const Fly = require('flyio/dist/npm/wx')
const config = require('./config')

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
  'apiGroupCode': 'tranning'
}
Object.assign(fly.config, {
  headers: headers,
  baseURL: baseURL,
  timeout: 10000,
  widthCredentials: true
})

fly.interceptors.request.use(request => {
  return request
})

fly.interceptors.response.use(response => {
  return response.data
}, err => {
  log(err)
})
export default fly
