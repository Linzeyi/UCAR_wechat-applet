<template>
  <div style="height: 100%">
    <base-navigation-bar name="订单详情">
      <i class="iconfont" @click="toMyOrder">&#xe625;</i>
    </base-navigation-bar>
    <base-custom-box>
      <div class="orderPay-wrap lzy-list-wrap">
        <div class="wrap-panel top-panel" :class="'top-status' + order.status + '-panel'">
          <div class="left-box">
            <p class="status" v-if="order.status === 0 && !checkIntegral"><i class="iconfont">&#xe694;</i> 等待买家付款...</p>
            <p class="status" v-if="order.status === 0 && checkIntegral"><i class="iconfont">&#xe694;</i> 等待买家支付积分...</p>
            <p class="status" v-if="order.status === 1 && !checkIntegral"><i class="iconfont">&#xe6cf;</i> 已付款，等待卖家发货...</p>
            <p class="status" v-if="order.status === 1 && checkIntegral"><i class="iconfont">&#xe6cf;</i> 兑换成功，等待卖家发货...</p>
            <p class="status" v-if="order.status === 2"><i class="iconfont">&#xe67e;</i> 已发货，等待签收...</p>
            <p class="status" v-if="order.status === 3"><i class="iconfont">&#xe6a5;</i> 订单已完成</p>
            <p class="status" v-if="order.status === 4"><i class="iconfont">&#xe6a6;</i> 订单已取消</p>
          </div>
        </div>
        <div class="wrap-panel goods-panel">
          <div class="header">
            <i class="iconfont icon-goods">&#xe618;</i>
            <span class="title">选购商品</span>
          </div>
          <div class="goods-list">
            <div class="goods-box" v-for="(goodsItem, goodsIndex) in order.shopGoodsList" :key="goodsIndex">
              <div class="info-box lzy-flex-box" @click="toGoodsDetail(goodsItem)">
                <div class="left-box">
                  <div class="img-box">
                    <image :src="goodsItem.property.picList[0] ? goodsItem.property.picList[0] : getDefaultImg" alt="商品图片"></image>
                  </div>
                </div>
                <div class="content-box">
                  <p class="title" :class="{'inValid': !goodsItem.status}">
                    <span class="valid-tips">商品失效</span>
                    <span class="goods-name">{{goodsItem.goodsName}}</span>
                  </p>
                  <p class="type">
                    <span class="type-title">
                      规格:
                    </span>
                    <span class="type-item">{{goodsItem.property.propertyName}}；</span>
                  </p>
                </div>
                <div class="right-box">
                  <p class="price" v-if="goodsItem.categoryName === '积分'">
                    {{goodsItem.property.discountPrice}} 分
                  </p>
                  <p class="price" v-else><span class="logo">¥</span>{{goodsItem.property.discountPrice ? goodsItem.property.discountPrice : goodsItem.property.salePrice}}</p>
                  <p class="num">x{{goodsItem.num}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="goods-footer">
            <p class="small-font" v-if="!checkIntegral">
              <span class="left">商品总价</span>
              <span class="right">¥ {{order.orderPrice}}</span>
            </p>
            <p class="small-font dicount-font" v-if="discountInfo.discount === 1 && !checkIntegral">
              <span class="left">会员优惠</span>
              <span class="right">无</span>
            </p>
            <p class="small-font dicount-font" v-if="discountInfo.discount !== 1 && !checkIntegral">
              <span class="left">会员优惠</span>
              <span class="right">{{discountInfo.discount * 10}}折</span>
            </p>
            <p class="order-price-font" v-if="checkIntegral">
              <span class="left">商品积分</span>
              <span class="right">{{order.payPrice}} 点积分</span>
            </p>
            <p class="order-price-font" v-else>
              <span class="left">订单总价</span>
              <span class="right">¥ {{order.payPrice}}</span>
            </p>
            <p class="total-price-font" v-if="order.status === 0">
              <span class="left" v-if="checkIntegral">需花费</span>
              <span class="left" v-else>需付款</span>
              <span class="right" v-if="checkIntegral">
                {{order.payPrice}} 点积分
              </span>
              <span class="right" v-else><span class="logo">¥</span> {{order.payPrice}}</span>
            </p>
            <p class="total-price-font" v-else>
              <span class="left" v-if="checkIntegral && order.status !== 4">已花费</span>
              <span class="left" v-if="!checkIntegral && order.status !== 4">已付款</span>
              <span class="left" v-if="order.status === 4">订单已取消</span>
              <span class="right" v-if="checkIntegral && order.status !== 4">
                {{order.payPrice}} 点积分
              </span>
              <span class="right" v-if="!checkIntegral && order.status !== 4"><span class="logo">¥</span> {{order.payPrice}}</span>
            </p>
          </div>
        </div>
        <div class="wrap-panel address-panel">
          <div class="header">
            <i class="iconfont icon-goods">&#xe613;</i>
            <span class="title">收货信息</span>
          </div>
          <div class="content-panel">
            <span class="title">收货人</span>
            <span>{{order.receiptInfo.receiptName}}</span>
          </div>
          <div class="content-panel">
            <span class="title">联系方式</span>
            <span>{{order.receiptInfo.receiptTel}}</span>
          </div>
          <div class="content-panel">
            <span class="title">收货地址</span>
            <span>{{order.receiptInfo.receiptAddress}}</span>
          </div>
        </div>
        <div class="wrap-panel order-info-panel">
          <div class="header">
            <i class="iconfont icon-order">&#xe643;</i>
            <span class="title">订单信息</span>
          </div>
          <div class="content-panel">
            <span class="title">订单编号</span>
            <span>{{order.orderNo}}</span>
          </div>
          <div class="content-panel">
            <span class="title">订单状态</span>
            <span>{{getStatusList}}</span>
            <span class="order-remark" v-if="order.orderRemark">（{{order.orderRemark}}）</span>
          </div>
          <div class="content-panel">
            <span class="title">创建时间</span>
            <span>{{order.createTime}}</span>
          </div>
          <div class="content-panel" v-if="order.status !== 0">
            <span class="title" v-if="order.status === 1">付款时间</span>
            <span class="title" v-if="order.status === 2">发货时间</span>
            <span class="title" v-if="order.status === 3 && !checkAllGoodsIsCommented">收货时间</span>
            <span class="title" v-if="order.status === 3 && checkAllGoodsIsCommented">评价时间</span>
            <span class="title" v-if="order.status === 4">取消时间</span>
            <span>{{order.modifyTime}}</span>
          </div>
          <div class="content-panel">
            <span class="title">我的备注</span>
            <span>{{order.remark}}</span>
          </div>
        </div>
        <div class="wrap-panel pay-type-panel" v-if="order.status === 0">
          <div class="header">
            <span class="iconfont icon-pay-type">&#xe60e;</span>
            <span class="title">支付方式</span>
          </div>
          <div class="content-panel" v-for="(item, index) in payTypeList" :key="index">
            <p class="flex-box">
              <span class="icon-box" @click="selectPayType = item">
                <i class="iconfont icon-select-no" v-if="selectPayType.name != item.name">&#xe656;</i>
                <i class="iconfont icon-select-fill" v-else>&#xe655;</i>
              </span>
              <span class="pay-type-name">{{item.name}}</span>
              <span class="balance"><span class="logo" v-if="!checkIntegral">¥</span> {{item.balance}}</span>
            </p>
          </div>
        </div>
        <div class="pay-footer lzy-footer">
          <div class="right-box">
            <button class="toOrder-btn" @click="toMyOrder">我的订单</button>
            <button class="cancel-btn" @click="cancelOrder" v-if="order.status < 1">取消订单</button>
            <button class="pay-btn change-status-btn" @click="payOrder" v-if="order.status === 0 && !checkIntegral">付款</button>
            <button class="pay-btn change-status-btn" @click="payOrder" v-if="order.status === 0 && checkIntegral">兑换</button>
            <button class="confirm-btn change-status-btn" @click="confirmReceipt" v-if="order.status === 2">确认收货</button>
            <button class="has-comment" v-if="order.status === 3 && checkAllGoodsIsCommented">已评价</button>
            <button class="comment-btn change-status-btn" @click="toGoodsComments()" v-if="order.status === 3 && !checkAllGoodsIsCommented">评价</button>
          </div>
        </div>
      </div>
    </base-custom-box>
  </div>
</template>

<script>
import BaseCustomBox from "@/components/base/BaseCustomBox"
import BaseNavigationBar from "@/components/base/BaseNavigationBar"
export default {
  components: {
    BaseCustomBox,
    BaseNavigationBar
  },
  data () {
    return {
      order: {
        orderNo: '',
        createTime: this.Utils.formatTime(new Date()),
        status: '0',
        receiptInfo: {},
        shopGoodsList: []
      },
      payTypeList: [
        {
          name: '余额',
          balance: 0
        }
      ],
      selectPayType: {},
      discountInfo: {
        discount: 1
      }
    }
  },
  onLoad (option) {
    this.order.orderNo = option.orderNo
  },
  onShow() {
    this.getOrder()
  },
  onUnload () {
    this.init()
  },
  async onPullDownRefresh() {
    this.getOrder()
  },
  computed: {
    checkValid () {
      let flag = true
      this.order.shopGoodsList.map(item => {
        if (!item.status) {
          flag = false
        }
      })
      return flag
    },
    checkIntegral () {
      return this.order.orderType
    },
    getDefaultImg () {
      return this.Utils.getSquareDefaultImg()
    },
    getStatusList () {
      return this.$store.getters['Order/statusList'][parseInt(this.order.status)]
    },
    checkAllGoodsIsCommented () {
      let flag = true
      if (this.order.shopGoodsList) {
        this.order.shopGoodsList.map(item => {
          if (!item.commentStatus) {
            flag = false
          }
        })
      }
      return flag
    }
  },
  methods: {
    init () {
      console.log('orderDetail页面销毁')
      this.payTypeList = [{ balance: 0 }]
      this.order = {
        receiptInfo: {},
        shopGoodsList: []
      }
      this.selectPayType = {}
      this.$store.commit('Goods/SET_SHOWTYPEDIALOG', false)
    },
    backOff () {
      mpvue.navigateBack({ delta: 1 })
    },
    toGoodsDetail (goodsItem) {
      mpvue.navigateTo({ url: '/pages/goodsDetail/main?goodsNo=' + goodsItem.goodsNo })
    },
    toMyOrder () {
      mpvue.redirectTo({ url: '/pages/myOrders/main' })
    },
    getIntergral () {
      this.$http.get('/action/user/rewordPoint').then(res => {
        console.log(res)
        if (res.data) {
          this.payTypeList[0].balance = res.data.rewordPoint
        }
      })
    },
    getBalance () {
      this.$http.get('/action/wallet/getBalance').then(res => {
        console.log(res)
        if (res.data) {
          this.payTypeList[0].balance = res.data.balance
        }
      })
    },
    getDiscount () {
      this.$http.get('/action/user/getDiscount').then(res => {
        console.log(res)
        if (res.data) {
          this.discountInfo = res.data
        }
      })
    },
    getOrder () {
      wx.showLoading({
        title: '获取订单信息',
        mask: true
      })
      this.$http.get('/action/order/getOrder', {
        orderNo: this.order.orderNo
      }).then(res => {
        console.log(res)
        if (res.data) {
          this.order = res.data
          this.getDiscount()
          // this.order.createTime = this.Utils.formatTime(this.order.createTime)
          if (this.order.status === 0 || this.order.status === '0') {
            console.log('支付订单')
            wx.setNavigationBarTitle({
              title: '订单支付'
            })
          } else {
            wx.setNavigationBarTitle({
              title: '订单详情'
            })
          }
          if (this.checkIntegral) {
            this.payTypeList = [
              {
                name: '积分',
                balance: 0
              }
            ]
            this.getIntergral()
          } else {
            this.payTypeList = [
              {
                name: '余额',
                balance: 0
              }
            ]
            this.getBalance()
          }
        } else {
          wx.showToast({
            title: '获取失败',
            icon: 'none',
            duration: 2000
          })
        }
        wx.hideLoading()
        wx.stopPullDownRefresh()
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
        wx.stopPullDownRefresh()
        wx.showToast({
          title: '获取失败',
          icon: 'none',
          duration: 2000
        })
      })
    },
    cancelOrder () {
      let that = this
      wx.showModal({
        title: '取消订单',
        content: '是否确认取消订单',
        cancelText: '否',
        confirmText: '是',
        success (res) {
          if (res.confirm) {
            wx.showLoading({
              title: '取消中',
              mask: true
            })
            that.$http.get('/action/order/cancelOrder', {
              orderNo: that.order.orderNo
            }).then(res => {
              if (res.data) {
                wx.showToast({
                  title: '取消成功',
                  icon: 'success',
                  duration: 2000
                })
                that.getOrder()
              } else {
                wx.showToast({
                  title: '取消失败！',
                  icon: 'none',
                  duration: 2000
                })
              }
              wx.hideLoading()
            }).catch(err => {
              console.log(err)
              wx.hideLoading()
              wx.showToast({
                title: '取消失败！',
                icon: 'none',
                duration: 2000
              })
            })
            console.log('取消订单')
          }
        }
      })
    },
    confirmReceipt () {
      let that = this
      if (this.checkValid) {
        wx.showModal({
          title: '确认收货',
          content: '是否确认收货',
          cancelText: '否',
          confirmText: '是',
          success (res) {
            if (res.confirm) {
              wx.showLoading({
                title: '确认中',
                mask: true
              })
              that.$http.get('/action/order/confirmOrder', {
                orderNo: that.order.orderNo
              }).then(res => {
                if (res.data) {
                  wx.showToast({
                    title: '确认成功',
                    icon: 'success',
                    duration: 2000
                  })
                  that.getOrder()
                } else {
                  wx.showToast({
                    title: res.msg,
                    icon: 'none',
                    duration: 2000
                  })
                }
                wx.hideLoading()
              }).catch(err => {
                console.log(err)
                wx.hideLoading()
                wx.showToast({
                  title: '确认失败！',
                  icon: 'none',
                  duration: 2000
                })
              })
            }
          }
        })
      } else {
        wx.showToast({
          title: '有无效商品',
          icon: 'none',
          duration: 2000
        })
      }
    },
    payOrder () {
      let that = this
      if (this.checkValid) {
        if (JSON.stringify(this.selectPayType) === '{}') {
          wx.showToast({
            title: '请选择支付方式',
            icon: 'none',
            duration: 2000
          })
        } else {
          if (this.order.payPrice > this.selectPayType.balance) {
            wx.showModal({
              title: '您的余额已不足',
              content: '请充值或选用其他支付方式',
              cancelText: '选用其他',
              confirmText: '前往充值',
              success (res) {
                if (res.confirm) {
                  mpvue.navigateTo({ url: '/pages/wallet/main' })
                }
              }
            })
          } else {
            wx.showModal({
              title: this.checkIntegral ? '确认兑换' : '确认付款',
              content: this.checkIntegral ? '本次应支付的积分共计' + this.order.payPrice + '点' : '本次应付的金额共计' + this.order.payPrice + '元',
              confirmText: this.checkIntegral ? '兑换' : '支付',
              success (res) {
                if (res.confirm) {
                  wx.showLoading({
                    title: '支付中',
                    mask: true
                  })
                  that.$http.get('/action/order/payOrder', {
                    orderNo: that.order.orderNo
                  }).then(res => {
                    console.log(res)
                    if (res.data) {
                      wx.showModal({
                        title: '支付成功',
                        content: '将为您跳转至我的订单界面',
                        confirmText: '跳转',
                        cancelText: '不跳转',
                        success (res) {
                          if (res.confirm) {
                            mpvue.navigateTo({ url: '/pages/myOrders/main' })
                          } else {
                            console.log('付款成功，支付订单：', that.order)
                            that.getOrder()
                          }
                        }
                      })
                    } else {
                      wx.showToast({
                        title: res.msg,
                        icon: 'none',
                        duration: 2000
                      })
                    }
                    wx.hideLoading()
                  }).catch(err => {
                    console.log(err)
                    wx.hideLoading()
                    wx.showToast({
                      title: '支付失败',
                      icon: 'none',
                      duration: 2000
                    })
                  })
                } else {
                  wx.showToast({
                    title: '取消支付',
                    icon: 'none',
                    duration: 2000
                  })
                }
              }
            })
          }
        }
      } else {
        wx.showToast({
          title: '有无效商品',
          icon: 'none',
          duration: 2000
        })
      }
    },
    toGoodsComments () {
      this.$store.commit('Comment/SET_ORDER', this.order)
      mpvue.navigateTo({ url: '/pages/goodsComments/main?orderNo=' + this.order.orderNo })
    }
  }
}
</script>

<style lang="less" scoped>
.orderPay-wrap {
  box-sizing: border-box;
  min-height: calc(100% - 70px);
  padding: 0;
  background-color: #f3f3f3;
  .wrap-panel {
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
    box-sizing: border-box;
    &:last-child {
      margin-bottom: 0;
    }
    .header {
      font-size: 13px;
      color: #666;
      padding-bottom: 10px;
      display: flex;
      align-items: center;
      .iconfont {
        font-size: 18px;
        margin-right: 8px;
      }
    }
    .content-panel {
      padding: 10px 0;
      font-size: 12px;
      border-bottom: 1px solid #eee;
      &:last-child {
        border: none;
      }
      .title {
        display: inline-block;
        width: 70px;
        vertical-align: top;
        color: #999;
      }
      .order-remark {
        color: orangered;
      }
    }
    &.top-panel {
      padding: 20px 0;
      margin-bottom: 0;
      display: flex;
      align-items: center;
      &.top-status0-panel {
        background-color: #e05e5e;
      }
      &.top-status1-panel {
        background-color: #3daeca;
      }
      &.top-status2-panel {
        background-color: #5772cc;
      }
      &.top-status3-panel {
        background-color: #48af76;
      }
      &.top-status4-panel {
        background-color: #757575;
      }
      .left-box {
        width: 100%;
        p {
          text-indent: 35px;
          font-weight: 600;
          color: #fff;
          display: flex;
          align-items: center;
          &.status {
            font-size: 18px;
            .iconfont {
              font-size: 22px;
              padding-right: 10px;
              color: #fff;
            }
          }
        }
      }
    }
    &.goods-panel {
      .goods-list {
        padding-bottom: 10px;
        .goods-box {
          padding: 10px 0;
          .content-box {
            .title {
              margin-bottom: 5px;
              .goods-name {
                font-size: 13px;
              }
              .valid-tips {
                display: none;
                font-size: 10px;
                margin-right: 6px;
                padding: 1px 4px;
                border-radius: 2px;
                background-color: rgb(218, 91, 91);
                color: #fff;
                vertical-align: top;
                text-decoration: none;
              }
              &.inValid {
                .goods-name {
                  text-decoration: line-through;
                }
                .valid-tips {
                  display: inline-block;
                }
              }
            }
          }
        }
      }
      .goods-footer {
        // padding: 10px 0;
        p {
          padding: 2px 0;
          display: flex;
          align-items: center;
          &.small-font {
            color: #999;
            font-size: 11px;
          }
          // &.dicount-font {
          //   font-size: 13px;
          //   color: #ff6421;
          // }
          &.order-price-font {
            color: #444;
            font-size: 14px;
            padding-bottom: 8px;
            border-bottom: 1px solid #eee;
          }
          &.total-price-font {
            color: #444;
            font-size: 15px;
            padding-top: 8px;
            color: #ff6421;
            .right {
              font-size: 17px;
              .logo {
                font-size: 13px;
              }
            }
          }
          span {
            &.left {
              flex-grow: 1;
              text-align: left;
            }
            &.right {
              flex-grow: 1;
              text-align: right;
            }
          }
        }
      }
    }
    &.address-panel {
    }
    &.pay-type-panel {
      .content-panel {
        padding: 5px 0;
        font-size: 12px;
        .flex-box {
          display: flex;
          align-items: center;
          font-size: 12px;
          .icon-box {
            padding: 0 15px 0 0;
            .iconfont {
              font-size: 21px;
              color: #ddd;
              &.icon-select-fill {
                color: orangered
              }
            }
          }
          .pay-type-name {
            text-align: left;
            flex-grow: 1;
          }
          .balance {
            text-align: right;
            flex-grow: 1;
            color: #777;
          }
        }
      }
    }
  }
  .pay-footer {
    .right-box {
      height: 34px;
      button {
        height: 34px;
        line-height: 33px;
        border-radius: 20px;
        background-color: #fff;
        border: 1px solid #ddd;
        color: #777;
        box-sizing: border-box;
        &.has-comment:active {
          color: #777;
          background-color: #fff;
          border-color: #ddd;
        }
        &:active {
          color: #555;
          background-color: #eee;
          border-color: #bbb;
        }
        &.change-status-btn {
        border-color: #ff6421;
        color: #ff6421;
        &:active {
          color: orangered;
          border-color: orangered;
          background-color: #ffd8c7;
        }
      }
      }
    }
  }
}
</style>