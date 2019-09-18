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
                <span class="name">{{getAddress.receiverName}}</span>
                <span class="phone">{{getAddress.receiverPhone}}</span>
                <span class="type" v-if="getAddress.isDefault">默认</span>
              </p>
              <p>
                {{getAddress.address}}
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
            <div class="info-box lzy-flex-box">
              <div class="left-box">
                <div class="img-box">
                  <image :src="goodsItem.type.imgList[0]" alt="商品图片" mode="aspectFit" ></image>
                </div>
              </div>
              <div class="content-box"  @click="toGoodsDetail(goodsItem)">
                <p class="title">{{goodsItem.title}}</p>
                <p class="type">
                  <span class="type-title">
                    {{goodsItem.type.title}}:
                  </span>
                  <span class="type-item">{{goodsItem.type.content}}；</span>
                </p>
              </div>
              <div class="right-box">
                <p class="price"><span class="logo">¥</span>{{goodsItem.type.discountPrice ? goodsItem.type.discountPrice : goodsItem.type.price}}</p>
                <p class="num">x{{goodsItem.num}}</p>
              </div>
            </div>
            <div class="footer">
              <p>
                <span class="num">共{{goodsItem.num}}件</span>
                小记：<span class="price"><span class="logo">¥</span>{{(goodsItem.type.discountPrice ? goodsItem.type.discountPrice : goodsItem.type.price) * goodsItem.num}}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="order-panel">
          <div class="header">
            <span class="header-title">备注<span class="tips">（非必填）</span></span>
          </div>
          <div class="remarks">
            <textarea v-model="order.remark" placeholder="请输入针对该订单的备注信息..." maxlength="300" auto-height="true"></textarea>
          </div>
        </div>
        <div class="order-footer lzy-footer">
          <div class="right-box">
            <span class="num">共{{getTotalNum}}件，</span>
            合计:<span class="total-price"><span class="logo">¥</span>{{getTotalPrice}}</span>
            <button class="confirmOrder-btn" @click="toOrderDetail">提交订单</button>
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
        orderId: 'XD100024',
        remark: '',
        addressInfo: {
          name: '林泽毅',
          phone: '13107927091',
          address: '福建省厦门市思明区宝龙一城西塔21楼',
          isDefault: true
        },
        goodsList: []
      }
    }
  },
  onShow () {
    console.log('onShow')
  },
  onLoad () {
    this.getGoodsList()
  },
  onUnload () {
    // this.init()
  },
  computed: {
    getAddress () {
      console.log(this.$store.getters['UserCenter/selectedAddress'])
      return this.$store.getters['UserCenter/selectedAddress']
    },
    toEditAddress () {
      mpvue.navigateTo({ url: '/pages/selectAddress/main' })
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
        price += item.num * (item.type.discountPrice ? item.type.discountPrice : item.type.price)
      })
      return price
    }
  },
  methods: {
    init () {
      this.order.remark = ''
      this.order.goodsList = []
      // this.orderId = ''
      console.log('orderConfirm页面销毁')
      this.$store.commit('Order/INIT_ORDER')
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
      let that = this
      wx.showModal({
        title: '订单未提交',
        content: '您的订单尚未提交，如果离开此页面将不会保存订单信息，是否继续？',
        cancelText: '否',
        confirmText: '是',
        success (res) {
          if (res.confirm) {
            that.$store.commit('Goods/SET_GOODS', goodsItem)
            mpvue.navigateTo({ url: '/pages/goodsDetail/main' })
          }
        }
      })
    },
    toOrderDetail () {
      let that = this
      wx.showModal({
        title: '提交订单',
        content: '是否提交该订单',
        cancelText: '否',
        confirmText: '是',
        success (res) {
          if (res.confirm) {
            that.order.createTime = that.Utils.formatTime(new Date())
            that.order.status = 0
            that.order.addressInfo = that.getAddress
            that.$store.commit('Order/SET_ORDER', that.order)
            mpvue.redirectTo({ url: '/pages/orderDetail/main' })
          }
        }
      })
    },
    getGoodsList () {
      this.order.goodsList = JSON.parse(JSON.stringify(this.$store.getters['Order/goodsList']))
      console.log('确认订单获取到的商品列表：', this.order.goodsList)
    }
  }
}
</script>

<style lang="less" scoped>
.orderConfirm-wrap {
  box-sizing: border-box;
  padding: 10px;
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
}
</style>