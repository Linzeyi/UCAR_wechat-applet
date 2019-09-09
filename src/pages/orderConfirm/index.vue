<template>
  <div class="orderConfirm-wrap">
    <div class="order-panel">
      <div class="address-box flex-box">
        <div class="left-box">
          <i class="iconfont icon-address">&#xe613;</i>
        </div>
        <div class="content-box">
          <p>
            <span class="name">林泽毅</span>
            <span class="phone">13107927091</span>
            <span class="type">默认</span>
          </p>
          <p>
            福建省厦门市思明区宝龙一城西塔21楼
          </p>
        </div>
        <div class="right-box">
          <i class="iconfont icon-right">&#xe601;</i>
        </div>
      </div>
    </div>
    <div class="order-panel goods-panel" v-for="(item, index) in goodsList" :key="index">
      <div class="goods-box">
        <div class="header">
          <span class="header-title">{{item.store.name}}</span>
        </div>
        <div class="info-box flex-box">
          <div class="left-box">
            <div class="img-box">
              <image :src="item.src" alt="商品图片" mode="aspectFit" ></image>
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
        <div class="footer">
          <p>
            <span class="num">共{{item.num}}件</span>
            小记：<span class="price"><span class="logo">¥</span>{{item.num * item.price}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="order-footer lzy-footer">
      <div class="right-box">
        <span class="num">共{{getTotalNum}}件，</span>
        合计:<span class="total-price"><span class="logo">¥</span>{{getTotalPrice}}</span>
        <button class="confirmOrder-btn">提交订单</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
      ]
    }
  },
  mounted () {
    this.getGoodsList()
  },
  onUnload () {
    // this.init()
  },
  computed: {
    getTotalNum () {
      let num = 0
      this.goodsList.map(item => {
        num += item.num
      })
      return num
    },
    getTotalPrice () {
      let price = 0
      this.goodsList.map(item => {
        price += item.num * item.price
      })
      return price
    }
  },
  methods: {
    init () {
      this.goodsList = []
      this.num = 0
    },
    getGoodsList () {
      // this.goodsList = this.$store.getters['Order/goodsList']
    }
  }
}
</script>

<style lang="less" scoped>
.orderConfirm-wrap {
  height: 100%;
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
    .flex-box {
      display: flex;
      align-items: center;
      justify-content: center;
      .left-box, .right-box {
        text-align: center;
      }
      .content-box {
        flex-grow: 1;
      }
    }
    .address-box {
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
      .header {
        font-size: 12px;
        margin-bottom: 10px;
      }
      .flex-box {
        align-items: flex-start;
        .left-box {
          .img-box {
            border-radius: 4px;
            width: 60px;
            height: 60px;
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