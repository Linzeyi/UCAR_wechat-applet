<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    let logs
    if (mpvuePlatform === 'my') {
      logs = mpvue.getStorageSync({key: 'logs'}).data || []
      logs.unshift(Date.now())
      mpvue.setStorageSync({
        key: 'logs',
        data: logs
      })
    } else {
      logs = mpvue.getStorageSync('logs') || []
      logs.unshift(Date.now())
      mpvue.setStorageSync('logs', logs)
    }
  },
  log () {
    console.log(`log at:${Date.now()}`)
  }
}
</script>

<style lang="less">
page {
  height: 100%;
}
button {
  &::before, &::after {
    border: none;
  }
}
.lzy-footer {
  background-color: #fff;
  border-top: 1px solid #eee;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  .left-box {
    flex-grow: 1;
    display: flex;
    align-items: center;
  }
  .right-box {
    text-align: right;
    flex-grow: 1;
    font-size: 12px;
    height: 38px;
    line-height: 38px;
    button {
      display: inline-block;
      vertical-align: top;
      height: 38px;
      line-height: 38px;
      font-size: 14px;
      margin-left: 10px;
      border-radius: 10px;
      padding: 0 20px;
      .iconfont {
        font-size: 14px;
        margin-right: 6px;
      }
    }
  }
}
</style>
