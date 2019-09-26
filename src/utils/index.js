function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  date = new Date(date)
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

export function getYMDTime(date) {
  return formatTime(date).split(' ')[0]
}

export function getHMSTime(date) {
  return formatTime(date).split(' ')[1]
}

export const regularRule = {
  phone: /^(13[0-9]|14[5|7]|15[0-9]|17[0-9]|18[0-9])\d{8}$/,
  money: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
  mail: /^\w+@[a-zA-Z0-9]{2,10}\.(com|cn)$/,
  postCode: /^([0-9]{6})|0$/
}

export function limitMoney(val) {
  let sNum = val.toString() // 先转换成字符串类型
  if (sNum.indexOf('.') === 0) { // 第一位就是 .
    console.log('first str is .')
    sNum = '0' + sNum
  }
  sNum = sNum.replace(/[^\d.]/g, ''); // 清除“数字”和“.”以外的字符
  sNum = sNum.replace(/\.{2,}/g, '.'); // 只保留第一个. 清除多余的
  sNum = sNum.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
  sNum = sNum.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); // 只能输入两个小数
  if (sNum.indexOf('.') < 0 && sNum !== '') {
    sNum = parseFloat(sNum);
  }
}

export function navigateTo(url) {
  mpvue.navigateTo({ url })
}

export function switchTab(url) {
  mpvue.switchTab({ url })
}

// 时间戳转时间
export function timestampTo(time = +new Date()) {
  var date = new Date(time + 8 * 3600 * 1000); // 增加8小时
  return date.toJSON().substr(0, 19).replace('T', ' ');
}

export function getSwiperDefaultImg() {
  return '/static/images/default-img_swiper.png'
}

export function getSquareDefaultImg() {
  return '/static/images/default-img_80x80.png'
}

export function sleep(interval) {
  return new Promise(resolve => {
    setTimeout(resolve, interval);
  })
}

export function handleDebounce(func) {
  let timer = false
  return function debounce() {
    if (timer) {
      clearTimeout(timer)
      timer = setTimeout(() => (timer = false), 500)
      return
    }
    timer = setTimeout(() => (timer = false), 500)
    func()
  }
}

export default {
  formatNumber,
  formatTime,
  getYMDTime,
  getHMSTime,
  regularRule,
  navigateTo,
  timestampTo,
  getSwiperDefaultImg,
  getSquareDefaultImg,
  switchTab,
  sleep,
  handleDebounce
}
