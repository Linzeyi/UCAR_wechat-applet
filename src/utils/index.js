function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('-')
  const t2 = [hour, minute, second].map(formatNumber).join(':')
  return `${t1} ${t2}`
}

export function getYMDTime (date) {
  return formatTime(date).split(' ')[0]
}

export function getHMSTime (date) {
  return formatTime(date).split(' ')[1]
}

export const regularRule = {
  phone: /^(13[0-9]|14[5|7]|15[0-9]|17[0-9]|18[0-9])\d{8}$/,
  money: /^(([1-9]{0,7})?|0)(\.[0-9]{1,2})*$/,
  mail: /^\w+@[a-zA-Z0-9]{2,10}\.(com|cn)$/,
  postCode: /^([0-9]{6})|0$/
}

export function navigateTo(url) {
  mpvue.navigateTo({url})
}

export function switchTab(url) {
  mpvue.switchTab({url})
}

// 时间戳转时间
export function timestampTo(time = +new Date()) {
  var date = new Date(time + 8 * 3600 * 1000); // 增加8小时
  return date.toJSON().substr(0, 19).replace('T', ' ');
}

export default {
  formatNumber,
  formatTime,
  getYMDTime,
  getHMSTime,
  regularRule,
  navigateTo,
  timestampTo
}
