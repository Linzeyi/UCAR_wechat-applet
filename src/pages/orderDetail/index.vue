<template>
  <div class="orderPay-wrap lzy-list-wrap">
    <div class="wrap-panel top-panel">
      <div class="left-box">
        <p class="status">等待买家付款...</p>
      </div>
    </div>
    <div class="wrap-panel goods-panel">
      <div class="header">
        <i class="iconfont icon-goods">&#xe618;</i>
        <span class="title">选购商品</span>
      </div>
      <div class="goods-list">
        <div class="goods-box" v-for="(item, index) in goodsList" :key="index">
          <div class="info-box lzy-flex-box">
            <div class="left-box">
              <div class="img-box">
                <image :src="item.src" alt="商品图片"></image>
              </div>
            </div>
            <div class="content-box">
              <p class="title">{{item.title}}</p>
              <p class="type">
                <span class="type-title">
                  {{item.type.title}}:
                </span>
                <span class="type-item">{{item.type.content}}；</span>
              </p>
            </div>
            <div class="right-box">
              <p class="price"><span class="logo">¥</span>{{item.price}}</p>
              <p class="num">x{{item.num}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="goods-footer">
        <p class="small-font">
          <span class="left">商品总价</span>
          <span class="right">¥ {{getTotalPrice}}</span>
        </p>
        <p class="small-font">
          <span class="left">其他开销</span>
          <span class="right">无</span>
        </p>
        <p class="order-price-font">
          <span class="left">订单总价</span>
          <span class="right">¥ {{getTotalPrice}}</span>
        </p>
        <p class="total-price-font">
          <span class="left">需付款</span>
          <span class="right"><span class="logo">¥</span> {{getTotalPrice}}</span>
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
        <span>{{addressInfo.name}}</span>
      </div>
      <div class="content-panel">
        <span class="title">联系方式</span>
        <span>{{addressInfo.phone}}</span>
      </div>
      <div class="content-panel">
        <span class="title">收货地址</span>
        <span>{{addressInfo.address}}</span>
      </div>
    </div>
    <div class="wrap-panel order-info-panel">
      <div class="header">
        <i class="iconfont icon-order">&#xe643;</i>
        <span class="title">订单信息</span>
      </div>
      <div class="content-panel">
        <span class="title">订单编号</span>
        <span>{{order.orderId}}</span>
      </div>
      <div class="content-panel">
        <span class="title">创建时间</span>
        <span>{{order.createTime}}</span>
      </div>
    </div>
    <div class="wrap-panel pay-type-panel">
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
        <button class="cancel-btn" @click="cancelOrder">取消订单</button>
        <button class="pay-btn" @click="payOrder">付款</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      order: {
        orderId: 'XDD0001',
        createTime: this.Utils.formatTime(new Date())
      },
      addressInfo: {
        name: '萨芬',
        phone: '12412515222',
        address: '北京市朝阳区广顺大街与来广西路交汇处'
      },
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
            content: '最大/2090'
          },
          price: 54,
          stock: 199,
          sales: 2422,
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
            content: '64G'
          },
          price: 3162,
          stock: 2422,
          sales: 155,
          num: 1
        }
      ],
      payTypeList: [
        {
          name: '余额',
          balance: 1551
        },
        {
          name: '支付宝',
          balance: 5000
        }
      ],
      selectPayType: {}
    }
  },
  mounted () {
    this.selectPayType = this.payTypeList[0]
  },
  onUnload () {
  },
  computed: {
    getTotalPrice () {
      let price = 0
      this.goodsList.map(item => {
        price += item.num * item.price
      })
      return price
    }
  },
  methods: {
    cancelOrder () {
      wx.showToast({
        title: '取消订单',
        icon: 'none',
        duration: 2000
      })
    },
    payOrder () {
      if (this.getTotalPrice > this.selectPayType.balance) {
        wx.showToast({
          title: '您的余额已不足',
          icon: 'none',
          duration: 2000
        })
      } else {
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 2000
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.orderPay-wrap {
  box-sizing: border-box;
  padding: 10px 0;
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
          .status {
            font-size: 14px;
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