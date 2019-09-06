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
    <div class="order-panel goods-panel">
      <div class="goods-box">
        <div class="header">
          <span class="header-title">商品信息</span>
        </div>
        <div class="info-box flex-box">
          <div class="left-box">
            <div class="img-box">
              <img src="https://images.unsplash.com/photo-1530977875151-aae9742fde19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80" alt="商品图片">
            </div>
          </div>
          <div class="content-box">
            <p class="title">{{goods.title}}</p>
            <p class="type">
              <span class="type-title">
                商品分类：
              </span>
              <span class="type-item">最大规格</span>
            </p>
          </div>
          <div class="right-box">
            <p class="price"><span class="logo">¥</span>{{goods.discountPrice > 0 ? goods.discountPrice : goods.price}}</p>
            <p class="num">x{{num}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      goods: {
        id: undefined,
        title: '车载打火器，X3汽车应急启动电源12v移动搭电宝车载备用电瓶充电打火器',
        store: {
          name: '米其林4S店'
        },
        text: '<h1>车载打火器，X3汽车应急启动电源12v移动搭电宝车载备用电瓶充电打火器</h1><p>asfjah卡少暗示法护暗示法科技撒回复，sad 跟萨芬和感慨阿斯顿个， 阿拉善个</p><img src="https://images.unsplash.com/photo-1567494355252-047444d52a43?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80" /><p>asfjah卡少暗示法护暗示法科技撒回复，sad 跟萨芬和感慨阿斯顿个， 阿拉善个</p>',
        price: 80,
        discountPrice: 64,
        stock: 199,
        sales: 2422
      },
      num: 0
    }
  },
  mounted () {
    console.log(this.$root.$mp.query)
    this.goods.id = this.$root.$mp.query.goodsId
    this.num = this.$root.$mp.query.num
  },
  onUnload () {
    this.init()
  },
  methods: {
    init () {
      this.goodsId = undefined
      this.num = 0
    }
  }
}
</script>

<style lang="less" scoped>
.orderConfirm-wrap {
  padding: 10px;
  background-color: #eee;
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
      .left-box {
        .img-box {
          border-radius: 4px;
          width: 60px;
          height: 60px;
          overflow: hidden;
          text-align: center;
          img {
            margin: 0 auto;
            width: 100%;
          }
        }
      }
      .content-box {
        p {
          font-size: 12px;
          padding-bottom: 4px;
          .title {
            color: #333;
          }
          .price {
            padding: 2px;
            background-color: #e8e8e8;
            border-radius: 4px;
            color: #aaa;
          }
        }
      }
      .right-box {
        .price {
          font-size: 12px;
          .logo {
            font-size: 10px;
          }
        }
        .num {
          font-size: 10px;
          color: #ddd;
        }
      }
    }
  }
}
</style>