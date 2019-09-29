<template>
  <div style="height: 100%">
    <base-navigation-bar name="我的订单">
      <i class="iconfont" @click="backOff">&#xe625;</i>
    </base-navigation-bar>
    <base-custom-box>
      <div class="myOrders-wrap">
        <div class="order-list-wrap">
          <div class="tab-panel" :style="{'top': customTabTop}">
            <div 
            class="tab-item" 
            v-for="(item, index) in typeTabList" 
            :key="index" 
            :class="{'on': item.key == selectTypeKey}" 
            @click="selectTypeKey = item.key">
              <span>{{item.name}}</span>
            </div>
          </div>
          <div class="order-box" v-for="(orderItem, orderIndex) in orderList" :key="orderIndex">
            <div class="header">
              <div class="left-box">
                <span class="order-id">订单编号：{{orderItem.orderNo}}</span>
              </div>
              <div class="right-box">
                <span class="status">{{typeTabList[orderItem.status + 1].name}}</span>
              </div>
            </div>
            <div class="goods-list">
              <div class="goods-box" v-for="(goodsItem, goodsIndex) in orderItem.shopGoodsList" :key="goodsIndex">
                <div class="flex-box" @click="toGoodsDetail(goodsItem)">
                  <div class="left-box">
                    <div class="img-box">
                      <image :src="goodsItem.property.picList[0] ? goodsItem.property.picList[0] : getDefaultImg" alt="商品图片" mode="aspectFit"></image>
                    </div>
                  </div>
                  <div class="content-box">
                    <p class="title" :class="{'inValid': !goodsItem.status}">
                      <span class="valid-tips">商品失效</span>
                      <span class="goods-name">{{goodsItem.goodsName}}</span>
                    </p>
                    <p class="type">规格:{{goodsItem.property.propertyName}}</p>
                  </div>
                  <div class="right-box">
                    <p class="price" v-if="orderItem.orderType">
                      {{goodsItem.property.discountPrice}} 分
                    </p>
                    <p class="price" v-else>
                      <span class="logo">¥</span>{{goodsItem.property.discountPrice}}
                    </p>
                    <p class="num">x{{goodsItem.num}}</p>
                  </div>
                </div>
              </div>
              <div class="goods-footer">
                <span class="option-btn" v-if="orderItem.status < 1" @click="cancelOrder(orderItem.orderNo)">取消订单</span>
                <span class="option-btn" @click="toOrderDetail(orderItem.orderNo)">查看订单</span>
                <span class="option-btn change-status-btn" v-if="orderItem.status === 0" @click="toPayOrder(orderItem.orderNo)">去支付</span>
                <span class="option-btn change-status-btn" v-if="orderItem.status === 2" @click="confirmReceipt(orderItem)">确认收货</span>
                <span class="option-btn change-status-btn" @click="toGoodsComments(orderItem)" v-if="orderItem.commentStatus === 0 && orderItem.status === 3">评价</span>
                <span class="option-btn has-comment" v-if="orderItem.commentStatus">已评价</span>
              </div>
            </div>
          </div>
          <div class="bottom-font-panel" v-if="!loading && size > orderList.length && orderList.length > 2">
            <p>
              到底啦
            </p>
          </div>
          <div class="bottom-font-panel" v-if="!loading && size <= orderList.length">
            <p>
              下拉获取更多
            </p>
          </div>
          <div class="bottom-font-panel" v-if="loading">
            <p>
              加载中...
            </p>
          </div>
        </div>
        <div class="no-orders-panel" v-if="orderList.length === 0">
          <p>
            <i class="iconfont icon-no-orders">&#xe6ee;</i>
            您还没有相关订单
          </p>
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
      selectTypeKey: '-1',
      typeTabList: [
        {
          name: '全部',
          key: '-1'
        },
        {
          name: '待付款',
          key: '0'
        },
        {
          name: '待发货',
          key: '1'
        },
        {
          name: '待收货',
          key: '2'
        },
        {
          name: '已完成',
          key: '3'
        },
        {
          name: '已取消',
          key: '4'
        }
      ],
      orderList: [],
      start: 0,
      size: 8,
      pageSize: 8,
      loading: false
    }
  },
  onLoad () {
    this.getOrderList()
  },
  onShow () {
    this.getOrderList()
  },
  onUnload () {
    this.size = this.pageSize
  },
  watch: {
    selectTypeKey () {
      this.size = this.pageSize
      this.getOrderList()
    }
  },
  async onPullDownRefresh() {
    this.getOrderList()
  },
  async onReachBottom () {
    console.log('触底')
    if (this.size <= this.orderList.length) {
      this.size += this.pageSize
      this.getOrderList()
    }
  },
  computed: {
    customTabTop () {
      return this.$store.getters["SystemInfo/customNavHeight"] + "px"
    },
    getDefaultImg () {
      return this.Utils.getSquareDefaultImg()
    },
    getStatusList () {
      return this.$store.getters['Order/statusList']
    }
  },
  methods: {
    backOff () {
      mpvue.navigateBack({ delta: 1 })
    },
    toGoodsDetail (goodsItem) {
      mpvue.navigateTo({ url: '/pages/goodsDetail/main?goodsNo=' + goodsItem.goodsNo })
    },
    getOrderList () {
      this.loading = true
      wx.showLoading({
        title: '加载中',
        duration: 2000
      })
      this.$http.get('/action/order/getOrderList', {
        status: this.selectTypeKey,
        start: this.start,
        size: this.size
      }).then(res => {
        console.log(res)
        if (res.data) {
          this.orderList = res.data
        } else {
          wx.showToast({
            title: '加载失败！',
            icon: 'none',
            duration: 2000
          })
        }
        this.loading = false
        wx.hideLoading()
        wx.stopPullDownRefresh()
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
        wx.stopPullDownRefresh()
        this.loading = false
        wx.showToast({
          title: '加载失败！',
          icon: 'none',
          duration: 2000
        })
      })
    },
    confirmReceipt (order) {
      let that = this
      let isValid = true
      order.shopGoodsList.map(item => {
        if (!item.status) {
          isValid = false
        }
      })
      if (isValid) {
        wx.showModal({
          title: '确认收货',
          content: '是否确认收货',
          cancelText: '否',
          confirmText: '是',
          success (res) {
            if (res.confirm) {
              that.$http.get('/action/order/confirmOrder', {
                orderNo: order.orderNo
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
                    title: res.msg,
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
      } else {
        wx.showToast({
          title: '有无效商品',
          icon: 'none',
          duration: 2000
        })
      }
    },
    cancelOrder (orderNo) {
      let that = this
      wx.showModal({
        title: '取消订单',
        content: '是否取消订单',
        cancelText: '否',
        confirmText: '是',
        success (res) {
          if (res.confirm) {
            that.$http.get('/action/order/cancelOrder', {
              orderNo: orderNo
            }).then(res => {
              if (res.data) {
                wx.showToast({
                  title: '取消成功',
                  icon: 'success',
                  duration: 2000
                })
                that.getOrderList()
              } else {
                wx.showToast({
                  title: res.msg,
                  icon: 'none',
                  duration: 2000
                })
              }
            }).catch(err => {
              console.log(err)
              wx.showToast({
                title: '取消失败！',
                icon: 'none',
                duration: 2000
              })
            })
          }
        }
      })
    },
    toPayOrder (orderNo) {
      this.toOrderDetail(orderNo)
    },
    toGoodsComments (order) {
      this.$store.commit('Comment/SET_ORDER', order)
      mpvue.navigateTo({ url: '/pages/goodsComments/main?orderNo=' + order.orderNo })
    },
    toOrderDetail (orderNo) {
      mpvue.redirectTo({ url: '/pages/orderDetail/main?orderNo=' + orderNo })
    }
  }
}
</script>

<style lang="less" scoped>
.myOrders-wrap {
  height: 100%;
  background-color: #f3f3f3;
  .bottom-font-panel {
    padding: 15px 0 20px;
    p {
      font-size: 12px;
      color: #b5b5b5;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      .iconfont {
        font-size: 24px;
        margin-right: 3px;
      }
    }
  }
  .no-orders-panel {
    position: relative;
    padding: 30px 0;
    p {
      font-size: 16px;
      color: #bbb;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      .iconfont {
        font-size: 36px;
        margin-right: 3px;
      }
    }
  }
  .tab-panel {
    position: sticky;
    z-index: 11;
    top: 64px;
    margin-bottom: 10px;
    margin-left: -10px;
    width: calc(100% + 20px);
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    .tab-item {
      text-align: center;
      flex-grow: 1;
      font-size: 12px;
      &.on {
        color: orangered;
      }
    }
  }
  .order-list-wrap {
    position: relative;
    background-color: #f3f3f3;
    padding: 10px;
    box-sizing: border-box;
    .order-box {
      width: 100%;
      background-color: #fff;
      padding: 10px;
      box-sizing: border-box;
      border-radius: 10px;
      margin-bottom: 10px;
      .header {
        width: 100%;
        height: 35px;
        line-height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        .left-box {
          font-size: 12px;
        }
        .right-box {
          flex-grow: 1;
          text-align: right;
          .status {
            display: inline-block;
            font-size: 12px;
            color: orangered;
          }
        }
      }
      .goods-list {
        .goods-box {
          padding-bottom: 20px;
          .flex-box {
            display: flex;
            justify-content: center;
            .left-box {
              .img-box {
                width: 60px;
                height: 60px;
                border-radius: 4px;
                text-align: center;
                overflow: hidden;
                image {
                  margin: 0 auto;
                  width: 100%;
                  height: 100%;

                }
              }
            }
            .content-box {
              padding: 0 10px;
              flex-grow: 1;
              .title {
                margin-bottom: 5px;
                .goods-name {
                  font-size: 13px;
                }
                .valid-tips {
                  display: none;
                  font-size: 10px;
                  margin-right: 6px;
                  padding: 2px 4px;
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
              .type {
                font-size: 10px;
                padding: 2px 4px;
                background-color: #f3f3f3;
                border-radius: 4px;
                color: #999;
              }
            }
            .right-box {
              padding-left: 10px;
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
        }
        .computed-info {
          padding-top: 10px;
          font-size: 11px;
          text-align: right;
          .num {
            color: #999;
          }
          .price {
            color: #ff6421;
            font-size: 13px;
            .logo {
              font-size: 10px;
              margin-right: 1px;
            }
          }
        }
        .goods-footer {
          padding: 15px 0 10px 0;
          text-align: right;
          .option-btn {
            font-size: 12px;
            padding: 6px 15px;
            border: 1px solid #ddd;
            border-radius: 15px;
            color: #777;
            margin-left: 10px;
            box-sizing: border-box;
            background-color: #fff;
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
  }
}
</style>
