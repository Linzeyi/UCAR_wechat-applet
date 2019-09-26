<template>
  <div style="height: 100%">
    <base-navigation-bar name="确认订单">
      <i class="iconfont" @click="backOff">&#xe625;</i>
    </base-navigation-bar>
    <base-custom-box>
      <div class="orderConfirm-wrap lzy-list-wrap">
        <div class="order-panel">
          <div class="address-box lzy-flex-box" @click="toEditAddress">
            <div class="left-box">
              <i class="iconfont icon-address">&#xe613;</i>
            </div>
            <div class="content-box">
              <p>
                <span class="name">{{address.receiptName}}</span>
                <span class="phone">{{address.receiptTel}}</span>
                <span class="type" v-if="address.isDefault">默认</span>
              </p>
              <p>
                {{address.receiptAddress}}
              </p>
            </div>
            <div class="right-box">
              <i class="iconfont icon-right">&#xe601;</i>
            </div>
          </div>
        </div>
        <div class="order-panel goods-panel" v-for="(goodsItem, goodsIndex) in order.goodsList" :key="goodsIndex">
          <div class="goods-box">
            <div class="header">
            </div>
            <div class="info-box lzy-flex-box" @click="toGoodsDetail(goodsItem)">
              <div class="left-box">
                <div class="img-box">
                  <image :src="goodsItem.property.picList[0] ? goodsItem.property.picList[0] : getDefaultImg" alt="商品图片" mode="aspectFit" ></image>
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
                <p class="price" v-if="checkIntegral">{{goodsItem.property.discountPrice}} 分</p>
                <p class="price" v-else>
                  <span class="logo">¥</span>{{goodsItem.property.discountPrice ? goodsItem.property.discountPrice : goodsItem.property.salePrice}}
                </p>
                <p class="num">x{{goodsItem.num}}</p>
              </div>
            </div>
            <div class="footer">
              <p>
                <span class="num" v-if="checkIntegral">共1件</span>
                <span class="num" v-else>共{{goodsItem.num}}件</span>
                小记：
                <span class="price" v-if="checkIntegral">
                  {{goodsItem.property.discountPrice}} 点积分
                </span>
                <span class="price" v-else>
                  <span class="logo">¥</span>
                  <com-price-counter :price="goodsItem.property.discountPrice ? goodsItem.property.discountPrice : goodsItem.property.salePrice" :num="goodsItem.num"></com-price-counter>
                </span>
              </p>
              <p class="integral-font" v-if="checkIntegral">该商品是积分商品，仅能通过积分兑换，且仅能兑换一件！</p>
            </div>
          </div>
        </div>
        <div class="order-panel discount-panel">
          <p class="discount-font">
            <span class="font-title">会员等级</span>
            <span class="font-content">{{discountInfo.grade}}</span>
          </p>
          <p class="discount-font">
            <span class="font-title">享受折扣</span>
            <span class="font-content" v-if="discountInfo.discount !== 1">{{discountInfo.discount * 10}} 折</span>
            <span class="font-content" v-else>暂无折扣</span>
          </p>
        </div>
        <div class="order-panel">
          <div class="header">
            <span class="header-title">备注<span class="tips">（非必填）</span></span>
          </div>
          <div class="remarks">
            <textarea v-model="order.remark" placeholder="请输入针对该订单的备注信息..." maxlength="300" auto-height="true"></textarea>
          </div>
        </div>
      </div>
      <div class="order-footer lzy-footer">
        <div class="right-box">
          <span class="num">共{{getTotalNum}}件，</span>
          合计:
          <span class="total-price" v-if="checkIntegral">
            {{getCurrentIntegral}} 点积分
          </span>
          <span class="total-price" v-else>
            <span class="logo">¥</span>{{getTotalPrice}}
          </span>
          <button class="confirmOrder-btn" @click="toOrderDetail">提交订单</button>
        </div>
      </div>
    </base-custom-box>
</div>
</template>

<script>
import BaseCustomBox from "@/components/base/BaseCustomBox"
import BaseNavigationBar from "@/components/base/BaseNavigationBar"
import comPriceCounter from '@/components/comPriceCounter/comPriceCounter'
export default {
  components: {
    BaseCustomBox,
    BaseNavigationBar,
    comPriceCounter
  },
  data () {
    return {
      order: {
        remark: '',
        receiptInfo: {},
        goodsList: [],
        orderSource: 0
      },
      address: {},
      discountInfo: {
        discount: 1
      }
    }
  },
  onLoad (option) {
    console.log('orderSource:' + option.orderSource)
    this.order.orderSource = option.orderSource
    this.getGoodsList()
    this.getDiscount()
    this.getDefaultAddress()
    this.setAddress()
  },
  onShow () {
    this.setAddress()
  },
  onUnload () {
    this.init()
  },
  async onPullDownRefresh() {
    this.getDefaultAddress()
  },
  computed: {
    checkIntegral () {
      if (this.order.goodsList.length) {
        return this.order.goodsList[0].categoryName === '积分'
      } else {
        return false
      }
    },
    getCurrentIntegral () {
      let price = 0
      this.order.goodsList.map(item => {
        price += item.num * item.property.discountPrice
      })
      return price.toFixed(0)
    },
    getDefaultImg () {
      return this.Utils.getSquareDefaultImg()
    },
    getTotalNum () {
      let num = 0
      this.order.goodsList.map(item => {
        num += item.num
      })
      return num
    },
    getTotalPrice () {
      let price = 0
      this.order.goodsList.map(item => {
        price += item.num * (item.property.discountPrice ? item.property.discountPrice : item.property.salePrice)
      })
      if (this.discountInfo.discount !== 1) {
        price = price * this.discountInfo.discount
      }
      return price.toFixed(2)
    }
  },
  methods: {
    init () {
      this.order.remark = ''
      this.order.goodsList = []
      console.log('orderConfirm页面销毁')
      this.$store.commit('Order/INIT_ORDER')
    },
    getDiscount () {
      this.$http.get('/action/user/getDiscount').then(res => {
        console.log(res)
        if (res.data) {
          this.discountInfo = res.data
        }
      })
    },
    setAddress () {
      let address = this.$store.getters['UserCenter/selectedAddress']
      if (address) {
        this.address = {
          'receiptName': address.receiverName,
          'receiptAddress': address.address,
          'receiptTel': address.receiverPhone,
          'isDefault': address.isDefault
        }
      }
    },
    getDefaultAddress () {
      this.$http.get('/action/addr/getDefault').then(res => {
        if (res.data) {
          this.$set(this.address, 'receiptName', res.data.address.receiver)
          this.$set(this.address, 'receiptAddress', res.data.address.province + res.data.address.city + res.data.address.district + res.data.address.addressDetail)
          this.$set(this.address, 'receiptTel', res.data.address.phone)
          this.$set(this.address, 'isDefault', res.data.address.isDefault)
        } else {
          wx.showToast({
            title: '获取地址失败',
            icon: 'none',
            duration: 2000
          })
        }
      }).catch(err => {
        console.log(err)
        wx.showToast({
          title: '获取地址失败',
          icon: 'none',
          duration: 2000
        })
      })
    },
    getGoodsList () {
      this.order.goodsList = this.$store.getters['Order/goodsList']
      console.log('确认订单获取到的商品列表：', this.order.goodsList)
    },
    toEditAddress () {
      mpvue.navigateTo({ url: '/pages/selectAddress/main' })
    },
    backOff () {
      wx.showModal({
        title: '订单未提交',
        content: '您的订单尚未提交，如果离开此页面将不会保存订单信息，是否继续？',
        cancelText: '否',
        confirmText: '是',
        success (res) {
          if (res.confirm) {
            mpvue.navigateBack({ delta: 1 })
          }
        }
      })
    },
    toGoodsDetail (goodsItem) {
      wx.showModal({
        title: '订单未提交',
        content: '您的订单尚未提交，如果离开此页面将不会保存订单信息，是否继续？',
        cancelText: '否',
        confirmText: '是',
        success (res) {
          if (res.confirm) {
            mpvue.navigateTo({ url: '/pages/goodsDetail/main?goodsNo=' + goodsItem.goodsNo })
          }
        }
      })
    },
    toOrderDetail () {
      let that = this
      console.log('订单提交')
      wx.showModal({
        title: '提交订单',
        content: '是否提交该订单',
        cancelText: '否',
        confirmText: '是',
        success (res) {
          if (res.confirm) {
            wx.showLoading({
              title: '正在提交',
              mask: true
            })
            that.order.createTime = that.Utils.formatTime(new Date())
            that.order.receiptInfo = that.address
            if (that.checkIntegral) {
              that.order.orderType = 1
            } else {
              that.order.orderType = 0
            }
            that.$http.post('/action/order/setOrder', that.order).then(res => {
              console.log(res)
              if (res.data) {
                wx.showModal({
                  title: '下单成功',
                  content: '是否前往订单详情页',
                  cancelText: '返回',
                  confirmText: '订单详情',
                  success (modalRes) {
                    if (modalRes.confirm) {
                      mpvue.redirectTo({ url: '/pages/orderDetail/main?orderNo=' + res.data.orderNo })
                    } else {
                      mpvue.navigateBack({ delta: 1 })
                    }
                  }
                })
              } else {
                wx.showToast({
                  title: '下单失败',
                  icon: 'none',
                  duration: 2000
                })
              }
              wx.hideLoading()
            }).catch(err => {
              console.log(err)
              wx.showToast({
                title: '下单失败',
                icon: 'none',
                duration: 2000
              })
              wx.hideLoading()
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.orderConfirm-wrap {
  box-sizing: border-box;
  min-height: calc(100% - 70px);
  padding: 10px 0 80px;
  background-color: #f3f3f3;
  .order-panel {
    background-color: #fff;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
    box-sizing: border-box;
    &:last-child {
      margin-bottom: 0;
    }
    .header {
      font-size: 12px;
      margin-bottom: 10px;
      .tips {
        font-size: 11px;
        color: #ff6421;
      }
    }
    .remarks {
      margin: 14px 0;
      font-size: 12px;
      color: #555;
      textarea {
        width: 100%;
        text-indent: 0;
        padding-left: 0;
      }
    }
    .address-box {
      text-align: left;
      align-items: center;
      .left-box {
        color: orange;
        .icon-address {
          font-size: 24px;
        }
      }
      .right-box {
        color: #bbb;
        .icon-right {
          font-size: 12px;
        }
      }
      .content-box {
        padding: 0;
        p {
          font-size: 12px;
          color: #333;
          padding: 2px 10px;
          margin-bottom: 2px;
          &:last-child {
            margin-bottom: 0;
          }
          .name {
            margin-right: 5px;
            font-size: 14px;
          }
          .phone {
            color: #bbb;
            font-size: 12px;
            margin-right: 7px;
          }
          .type {
            padding: 2px 7px;
            border-radius: 2px;
            border: 1px solid orange;
            color: orange;
          }
        }
      }
    }
    .goods-box {
      .flex-box {
        align-items: flex-start;
      }
      .footer {
        padding-top: 10px;
        font-size: 13px;
        .integral-font {
          font-size: 12px;
          margin-top: 7px;
          color: #ec4e09;
        }
        p {
          font-size: 11px;
          text-align: right;
          .num {
            color: #999;
          }
          .price {
            color: #ff6421;
            font-size: 13px;
            .logo {
              font-size: 9px;
              margin-right: 2px;
            }
          }
        }
      }
    }
    &.discount-panel {
      padding: 4px 20px;
      .discount-font {
        display: flex;
        align-items: center;
        padding: 8px 0;
        &:last-child {
          border: none;
        }
        .font-title {
          width: 70px;
          font-size: 12px;
          color: #999;
        }
        .font-content {
          padding-left: 10px;
          flex-grow: 1;
          font-size: 12px;
          color: #444;
        }
      }
    }
  }
}
.order-footer {
  .right-box {
    .num {
      font-size: 11px;
      color: #999;
    }
    .total-price {
      margin-left: 6px;
      font-size: 16px;
      color: #ff6421;
      .logo {
        font-size: 11px;
        margin-right: 4px;
      }
    }
    .confirmOrder-btn {
      background-color: #ff6421;
      color: #fff;
      &:active {
        background-color: #ec4e09;
      }
    }
  }
}
</style>