<template>
  <div style="height: 100%">
    <base-navigation-bar name="订单详情">
      <i class="iconfont" @click="backOff">&#xe625;</i>
    </base-navigation-bar>
    <base-custom-box>
      <div class="orderPay-wrap lzy-list-wrap">
        <div class="wrap-panel top-panel">
          <div class="left-box">
            <p class="status" v-if="order.status === 0"><i class="iconfont">&#xe694;</i> 等待买家付款...</p>
            <p class="status" v-if="order.status === 1"><i class="iconfont">&#xe6cf;</i> 已付款，等待卖家发货...</p>
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
              <div class="info-box lzy-flex-box">
                <div class="left-box">
                  <div class="img-box">
                    <image :src="goodsItem.property.picList[0] ? goodsItem.property.picList[0] : getDefaultImg" alt="商品图片"></image>
                  </div>
                </div>
                <div class="content-box">
                  <p class="title">{{goodsItem.goodsName}}</p>
                  <p class="type">
                    <span class="type-title">
                      规格:
                    </span>
                    <span class="type-item">{{goodsItem.property.propertyName}}；</span>
                  </p>
                </div>
                <div class="right-box">
                  <p class="price"><span class="logo">¥</span>{{goodsItem.property.discountPrice ? goodsItem.property.discountPrice : goodsItem.property.salePrice}}</p>
                  <p class="num">x{{goodsItem.num}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="goods-footer">
            <p class="small-font">
              <span class="left">商品总价</span>
              <span class="right">¥ {{order.payPrice}}</span>
            </p>
            <p class="small-font">
              <span class="left">其他开销</span>
              <span class="right">无</span>
            </p>
            <p class="order-price-font">
              <span class="left">订单总价</span>
              <span class="right">¥ {{order.payPrice}}</span>
            </p>
            <p class="total-price-font" v-if="order.status === 0">
              <span class="left">需付款</span>
              <span class="right"><span class="logo">¥</span> {{order.payPrice}}</span>
            </p>
            <p class="total-price-font" v-else>
              <span class="left">已付款</span>
              <span class="right"><span class="logo">¥</span> {{order.payPrice}}</span>
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
          </div>
          <div class="content-panel">
            <span class="title">创建时间</span>
            <span>{{order.createTime}}</span>
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
              <span class="balance"><span class="logo">¥</span> {{item.balance}}</span>
            </p>
          </div>
        </div>
        <div class="pay-footer lzy-footer">
          <div class="right-box">
            <button class="pay-btn" @click="payOrder" v-if="order.status === 0">付款</button>
            <button class="cancel-btn" @click="cancelOrder" v-if="order.status < 1">取消订单</button>
            <button class="cancel-btn" @click="confirmReceipt" v-if="order.status === 2">确认收货</button>
            <button class="cancel-btn" @click="toGoodsComments()" v-if="checkOrderCommentStatus">评价</button>
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
        receiptInfo: {}
      },
      payTypeList: [
        {
          name: '余额',
          balance: 8551
        },
        {
          name: '支付宝',
          balance: 25000
        }
      ],
      selectPayType: {}
    }
  },
  onLoad (option) {
    this.order.orderNo = option.orderNo
    console.log(option)
    this.getOrder()
    this.getBalance()
    let title = '订单详情'
    if (this.order.status === 0 || this.order.status === '0') {
      title = '订单支付'
    }
    wx.setNavigationBarTitle({
      title: title
    })
  },
  onUnload () {
    this.init()
  },
  async onPullDownRefresh() {
    this.getOrder()
    this.getBalance()
  },
  computed: {
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
    },
    checkOrderCommentStatus () {
      if (this.order.status > 1 && this.order.status < 3 && this.checkAllGoodsIsCommented) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    init () {
      console.log('orderDetail页面销毁')
      this.$store.commit('Goods/SET_SHOWTYPEDIALOG', false)
    },
    backOff () {
      mpvue.navigateBack({ delta: 1 })
    },
    getBalance () {
      this.$http.get('/action/wallet/getBalance').then(res => {
        console.log(res)
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
          this.order.createTime = this.Utils.formatTime(this.order.createTime)
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
      wx.showModal({
        title: '取消订单',
        content: '是否确认取消订单',
        cancelText: '否',
        confirmText: '是',
        success (res) {
          if (res.confirm) {
            console.log('取消订单')
          }
        }
      })
    },
    confirmReceipt () {
      let that = this
      wx.showModal({
        title: '确认收货',
        content: '是否确认收货',
        cancelText: '否',
        confirmText: '是',
        success (res) {
          if (res.confirm) {
            that.$http.get('/action/order/confirmOrder', {
              orderNo: that.order.orderNo
            }).then(res => {
              if (res.data) {
                wx.showToast({
                  title: '确认成功',
                  icon: 'success',
                  duration: 2000
                })
                that.getOrderList()
              } else {
                wx.showToast({
                  title: '确认失败！',
                  icon: 'none',
                  duration: 2000
                })
              }
            }).catch(err => {
              console.log(err)
              wx.showToast({
                title: '确认失败！',
                icon: 'none',
                duration: 2000
              })
            })
          }
        }
      })
    },
    payOrder () {
      let that = this
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

              }
            }
          })
        } else {
          wx.showModal({
            title: '确认付款',
            content: '本次应付金额共计' + this.order.payPrice,
            confirmText: '支付',
            success (res) {
              if (res.confirm) {
                that.$http.get('/action/order/payOrder', {
                  orderNo: that.order.orderNo
                }).then(res => {
                  console.log(res)
                  if (res.data) {
                    wx.showModal({
                      title: '支付成功',
                      content: '将为您跳转至我的订单界面',
                      showCancel: false,
                      success (res) {
                        console.log('付款成功，支付订单：', that.order)
                        mpvue.navigateTo({ url: '/pages/myOrders/main' })
                      }
                    })
                  } else {
                    wx.showToast({
                      title: '支付失败',
                      icon: 'none',
                      duration: 2000
                    })
                  }
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
    }
  }
}
</script>

<style lang="less" scoped>
.orderPay-wrap {
  box-sizing: border-box;
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
    }
    &.top-panel {
      padding: 20px 0;
      margin-bottom: 0;
      background-color: #ee1010;
      display: flex;
      align-items: center;
      .left-box {
        width: 60%;
        p {
          text-indent: 35px;
          color: #fff;
          &.status {
            font-size: 14px;
            .iconfont {
              font-size: 14px;
              margin-right: 4px;
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
      line-height: 34px;
      button {
        height: 34px;
        line-height: 34px;
        border-radius: 20px;
      }
      .cancel-btn {
        background-color: #fff;
        border: 1px solid #ddd;
        color: #777;
        box-sizing: border-box;
        &:active {
          color: #555;
          border: 1px solid #bbb;
        }
      }
      .pay-btn {
        background-color: #ff6421;
        color: #fff;
        &:active {
          background-color: #ec4e09;
        }
      }
    }
  }
}
</style>