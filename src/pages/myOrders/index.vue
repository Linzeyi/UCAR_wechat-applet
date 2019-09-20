<template>
  <div class="myOrders-wrap">
    <div class="tab-panel">
      <div 
      class="tab-item" 
      v-for="(item, index) in typeTabList" 
      :key="index" 
      :class="{'on': item.key == selectTypeKey}" 
      @click="selectTypeKey = item.key">
        <span>{{item.name}}</span>
      </div>
    </div>
    <div class="order-list-wrap" v-if="orderList.length !== 0">
      <div class="order-box" v-for="(orderItem, orderIndex) in orderList" :key="orderIndex">
        <div class="header">
          <div class="left-box">
            <span class="order-id">订单编号：{{orderItem.orderNo}}</span>
          </div>
          <div class="right-box">
            <span class="status">{{getStatusList[orderItem.status + 1]}}</span>
          </div>
        </div>
        <div class="goods-list">
          <div class="goods-box" v-for="(goodsItem, goodsIndex) in orderItem.shopGoodsList" :key="goodsIndex">
            <div class="flex-box">
              <div class="left-box">
                <div class="img-box">
                  <image :src="goodsItem.propertyVO.picList[0] ? goodsItem.propertyVO.picList[0] : getDefaultImg" alt="商品图片"></image>
                </div>
              </div>
              <div class="content-box">
                <p class="title">{{goodsItem.goodsName}}</p>
                <p class="type">规格:{{goodsItem.propertyVO.propertyName}}</p>
              </div>
              <div class="right-box">
                <p class="price">
                  <span class="logo">¥</span>{{goodsItem.propertyVO.discountPrice}}
                </p>
                <p class="num">x{{goodsItem.num}}</p>
              </div>
            </div>
          </div>
          <div class="computed-info">
            <span class="num">共{{orderItem.shopGoodsList.length}}件商品，</span>
            合计：<span class="price"><span class="logo">¥</span>{{orderItem.payPrice}}</span>
          </div>
          <div class="goods-footer">
            <span class="option-btn" @click="toOrderDetail(orderItem.orderNo)">查看订单</span>
            <span class="option-btn" v-if="orderItem.status === 1" @click="confirmReceipt(orderItem)">确认收货</span>
            <span class="option-btn" v-if="orderItem.status < 1" @click="cancelOrder(orderItem)">取消订单</span>
            <span class="option-btn" v-if="orderItem.status === 0" @click="toPayOrder(orderItem)">去支付</span>
            <span class="option-btn" @click="toGoodsComments(orderItem)" v-if="orderItem.status > 1 && orderItem.status < 3">评价</span>
          </div>
        </div>
      </div>
    </div>
    <div class="no-orders-panel" v-else>
      <p>
        <i class="iconfont icon-no-orders">&#xe6ee;</i>
        订单列表暂时为空...
      </p>
    </div>
  </div>
</template>

<script>

export default {
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
          name: '待收货',
          key: '1'
        },
        {
          name: '已完成',
          key: '2'
        },
        {
          name: '已取消',
          key: '3'
        }
      ],
      orderList: []
    }
  },
  onShow () {
    console.log('onShow')
  },
  onLoad () {
    this.getOrderList()
  },
  watch: {
    selectTypeKey () {
      this.getOrderList()
    }
  },
  async onPullDownRefresh() {
    this.getOrderList()
  },
  computed: {
    getDefaultImg () {
      return this.Utils.getSquareDefaultImg()
    },
    getStatusList () {
      return this.$store.getters['Order/statusList']
    }
  },
  methods: {
    getOrderList (status) {
      wx.showLoading({
        title: '正在加载',
        mask: true
      })
      this.$http.get('/action/order/getOrderList', {
        status: this.selectTypeKey
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
        wx.hideLoading()
        wx.stopPullDownRefresh()
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
        wx.stopPullDownRefresh()
        wx.showToast({
          title: '加载失败！',
          icon: 'none',
          duration: 2000
        })
      })
    },
    confirmReceipt (order) {},
    cancelOrder (order) {},
    toPayOrder (order) {},
    toGoodsComments (order) {
      this.$store.commit('Comment/SET_ORDER', order)
      mpvue.navigateTo({ url: '/pages/goodsComments/main?orderNo=' + order.orderNo })
    },
    toOrderDetail (orderNo) {
      mpvue.navigateTo({ url: '/pages/orderDetail/main?orderNo=' + orderNo })
    }
  }
}
</script>

<style lang="less" scoped>
.myOrders-wrap {
  height: 100%;
  background-color: #f3f3f3;
  .no-orders-panel {
    position: relative;
    top: 40px;
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
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
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
    top: 40px;
    height: calc(100% - 40px);
    overflow-y: auto;
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
                font-size: 13px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
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
            &:active {
              color: #555;
              border: 1px solid #bbb;
            }
          }
        }
      }
    }
  }
}
</style>
