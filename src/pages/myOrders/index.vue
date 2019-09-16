<template>
<div style="height: 100%">
  <base-navigation-bar name="我的订单">
    <i class="iconfont icon-back" @click="Utils.switchTab('/pages/userCenter/main')">&#xe625;</i>
  </base-navigation-bar>
  <base-custom-box>
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
      <div class="order-list-wrap">
        <div class="order-box" v-for="(orderItem, orderIndex) in orderList" :key="orderIndex">
          <div class="header">
            <div class="left-box">
              <span class="order-id">订单编号：{{orderItem.orderId}}</span>
            </div>
            <div class="right-box">
              <span class="status">{{getStatusList[orderItem.status]}}</span>
            </div>
          </div>
          <div class="goods-list">
            <div class="goods-box" v-for="(goodsItem, goodsIndex) in orderItem.goodsList" :key="goodsIndex">
              <div class="flex-box">
                <div class="left-box">
                  <div class="img-box">
                    <image :src="goodsItem.type.imgList[0]" alt="商品图片"></image>
                  </div>
                </div>
                <div class="content-box">
                  <p class="title">{{goodsItem.title}}</p>
                  <p class="type">{{goodsItem.type.title}}:{{goodsItem.type.content}}</p>
                </div>
                <div class="right-box">
                  <p class="price">
                    <span class="logo">¥</span>{{goodsItem.type.price}}
                  </p>
                  <p class="num">x{{goodsItem.num}}</p>
                </div>
              </div>
            </div>
            <div class="computed-info">
              <span class="num">共{{orderItem.goodsList.length}}件商品，</span>
              合计：<span class="price"><span class="logo">¥</span><comTotalPrice :goodsList="orderItem.goodsList"></comTotalPrice></span>
            </div>
            <div class="goods-footer">
              <span class="option-btn" @click="toOrderDetail(orderItem)">查看订单</span>
              <span class="option-btn" v-if="orderItem.status <= 1 ">取消订单</span>
              <span class="option-btn" v-if="orderItem.status === 0">去支付</span>
              <span class="option-btn" @click="toGoodsComments(orderItem)">评价</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </base-custom-box>
</div>
</template>

<script>
import BaseCustomBox from "@/components/base/BaseCustomBox"
import BaseNavigationBar from "@/components/base/BaseNavigationBar"
import comTotalPrice from '@/components/myOrders/totalPrice'

export default {
  data () {
    return {
      selectTypeKey: 0,
      typeTabList: [
        {
          name: '全部',
          key: '0'
        },
        {
          name: '待付款',
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
      orderList: [
        {
          orderId: 'XD215135',
          status: '等待付款',
          goodsList: [
            {
              id: undefined,
              title: '车载打火器，X3汽车应急启动电源12v移动搭电宝车载备用电瓶充电打火器',
              src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=895649508,3172694042&fm=11&gp=0.jpg',
              store: {
                name: '米其林4S店'
              },
              type: {
                title: '规格/型号',
                content: '最大/2090',
                price: 54
              },
              num: 3
            },
            {
              id: undefined,
              title: '【二手9成新】苹果8Plus Apple iPhone8',
              src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3269194731,1185787292&fm=11&gp=0.jpg',
              store: {
                name: '苹果旗舰店店'
              },
              type: {
                title: '内存',
                content: '64G',
                price: 3162
              },
              num: 1
            }
          ]
        },
        {
          orderId: 'XD532325',
          status: '交易成功',
          goodsList: [
            {
              id: undefined,
              title: '车载打火器，X3汽车应急启动电源12v移动搭电宝车载备用电瓶充电打火器',
              src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=895649508,3172694042&fm=11&gp=0.jpg',
              store: {
                name: '米其林4S店'
              },
              type: {
                title: '规格/型号',
                content: '最大/9595',
                price: 80
              },
              num: 6
            },
            {
              id: undefined,
              title: '【二手9成新】苹果8Plus Apple iPhone8',
              src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3269194731,1185787292&fm=11&gp=0.jpg',
              store: {
                name: '苹果旗舰店店'
              },
              type: {
                title: '内存',
                content: '256G',
                price: 4999
              },
              num: 2
            }
          ]
        },
        {
          orderId: 'XD532325',
          status: '未支付',
          goodsList: [
            {
              id: undefined,
              title: '车载打火器，X3汽车应急启动电源12v移动搭电宝车载备用电瓶充电打火器',
              src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=895649508,3172694042&fm=11&gp=0.jpg',
              store: {
                name: '米其林4S店'
              },
              type: {
                title: '规格/型号',
                content: '最大/9595',
                price: 80
              },
              num: 6
            },
            {
              id: undefined,
              title: '【二手9成新】苹果8Plus Apple iPhone8',
              src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3269194731,1185787292&fm=11&gp=0.jpg',
              store: {
                name: '苹果旗舰店店'
              },
              type: {
                title: '内存',
                content: '256G',
                price: 4999
              },
              num: 2
            }
          ]
        }
      ]
    }
  },
  components: {
    comTotalPrice,
    BaseCustomBox,
    BaseNavigationBar
  },
  onShow () {
    console.log('onShow')
  },
  onLoad () {
    this.init()
  },
  watch: {
  },
  async onPullDownRefresh() {
    console.log('下拉刷新')
    console.log(this)
    // 停止下拉刷新
    // wx.stopPullDownRefresh()
  },
  computed: {
    getStatusList () {
      return this.$store.getters['Order/statusList']
    }
  },
  methods: {
    init () {
      this.orderList = this.$store.getters['Order/orderList']
      console.log("我的订单列表获取：", this.orderList)
    },
    toGoodsComments (order) {
      this.$store.commit('Comment/SET_ORDER', order)
      mpvue.navigateTo({ url: '/pages/goodsComments/main?orderId=' + order.orderId })
    },
    toOrderDetail (item) {
      mpvue.navigateTo({ url: '/pages/orderDetail/main?orderId=' + item.orderId })
    }
  }
}
</script>

<style lang="less" scoped>
.myOrders-wrap {
  height: 100%;
  background-color: #f3f3f3;
  position: relative;
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
                background-color: #f6f6f6;
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
