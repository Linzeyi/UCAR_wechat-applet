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
.lzy-list-wrap {
  height: calc(100% - 54px);
  overflow-y: auto;
}
.lzy-footer {
  background-color: #fff;
  border-top: 1px solid #eee;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
  padding: 15px 10px;
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
.lzy-flex-box {
  display: flex;
  justify-content: center;
  .left-box {
    .img-box {
      border-radius: 4px;
      width: 68px;
      height: 68px;
      overflow: hidden;
      text-align: center;
      image {
        margin: 0 auto;
        width: 100%;
        height: 100%;
      }
    }
  }
  .content-box {
    box-sizing: border-box;
    padding: 2px 10px;
    flex-grow: 1;
    p {
      font-size: 12px;
      padding-bottom: 4px;
      .title {
        color: #333;
      }
      &.type {
        font-size: 10px;
        padding: 2px 4px;
        background-color: #f6f6f6;
        border-radius: 4px;
        color: #999;
      }
    }
  }
  .right-box {
    padding-left: 5px;
    text-align: right;
    .price {
      margin-top: 5px;
      font-size: 12px;
      line-height: 12px;
      .logo {
        font-size: 8px;
        margin-right: 2px;
      }
    }
    .num {
      font-size: 10px;
      color: #999;
    }
  }
}
</style>
