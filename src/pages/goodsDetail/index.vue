<template>
  <div class="goodsDetail">
    <com-swiper :imgList="imgList"></com-swiper>
    <div class="tab-navbar">
      <div class="flex-box">
          <div class="tab-navbar-item" 
            v-for="(item, index) in navbarList" 
            :key="index" 
            :class="{'on': currentTabKey == index}"
            @click="selectNavTab(index)"
          >
            {{item.name}}
          </div>
      </div>
    </div>
    <div class="tab-content">
      <swiper :current="currentTabKey" @change="changeTabContent">
        <swiper-item>
          <goods-info :goods.sync="goods" :num.sync="num"></goods-info>
        </swiper-item>
        <swiper-item>
          <goods-text :goodsText.sync="goods.text"></goods-text>
        </swiper-item>
        <swiper-item >
          <goods-comment :goodsId="goods.id"></goods-comment>
        </swiper-item>
      </swiper>
    </div>
    <div class="weui-footer">
      <div class="weui-flex">
        <div class="weui-flex__item">
          <p class="total-price">
            <span>商品金额：</span>¥{{getTotalPrice}}
          </p>
        </div>
        <div class="weui-flex__item">
          <button type="default" @click="toShoppingCart">购物车</button>
        </div>
        <div class="weui-flex__item">
          <button class="toPay-btn" type="primary" @click="toPay">去结算</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import comSwiper from '../../components/comSwiper/comSwiper'
import goodsInfo from '../../components/goodsDetail/goodsInfo/goodsInfo'
import goodsText from '../../components/goodsDetail/goodsText/goodsText'
import goodsComment from '../../components/goodsDetail/goodsComment/goodsComment'

export default {
  data () {
    return {
      currentTabKey: 0,
      navbarList: [
        {
          key: 'info',
          name: '商品信息'
        },
        {
          key: 'text',
          name: '详情'
        },
        {
          key: 'comment',
          name: '评论'
        }
      ],
      imgList: [
        {
          url: 'https://images.unsplash.com/photo-1567494355252-047444d52a43?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80',
          alt: '1'
        },
        {
          url: 'https://images.unsplash.com/photo-1530977875151-aae9742fde19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80',
          alt: '2'
        },
        {
          url: 'https://images.unsplash.com/photo-1455894127589-22f75500213a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1579&q=80',
          alt: '3'
        }
      ],
      goods: {
        id: 1,
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

  watch: {
    num (val) {
      console.log('num改变:' + val)
    }
  },

  computed: {
    getTotalPrice () {
      return (this.goods.discountPrice > 0 ? this.goods.discountPrice : this.goods.price) * (this.num ? this.num : 0)
    }
  },
  components: {
    comSwiper,
    goodsInfo,
    goodsText,
    goodsComment
  },

  methods: {
    changeTabContent (e) {
      this.currentTabKey = e.mp.detail.current
    },
    selectNavTab (index) {
      this.currentTabKey = index
    },
    toShoppingCart () {

    },
    toPay () {
      if (this.num === 0) {
        wx.showToast({
          title: '商品数量不能为0',
          icon: 'none',
          duration: 2000
        })
      }
    }
  },

  mounted () {
    // this.$http.get('/api').then(res => {
    //   console.log(res)
    // })
    wx.setNavigationBarTitle({
      title: this.goods.title
    })
  }
}
</script>

<style lang="less" scoped>
.goodsDetail {
  height: 100%;
  display: flex;
  flex-direction: column;
  .tab-navbar {
    background-color: #fff;
    border: none;
    align-items: center;
    height: 40px;
    line-height: 40px;
    .flex-box {
      display: flex;
      position: relative;
      height: 40px;
    }
    .tab-navbar-item {
      display: block;
      padding: 0;
      box-sizing: border-box;
      height: 40px;
      line-height: 40px;
      text-align: center;
      flex-grow: 1;
      font-size:28rpx;
      color: #aaa;
      font-weight: 600;
      border-bottom: 1px solid #ddd;
      &.on {
        color: #1abc9c;
        border-bottom: 2px solid #1abc9c;
      }
    }
  }
  .tab-content {
    flex-grow: 1;
    background-color: #fff;
    swiper {
      height: 100%;
      swiper-item {
        padding: 10px 20px;
        box-sizing: border-box;
        height: 100%;
        overflow-y: auto;
      }
    }
  }

  .weui-footer {
    background-color: #fff;
    border-top: 1px solid #ddd;
    width: 100%;
    height: 52px;
    line-height: 52px;
    .weui-flex {
      height: 100%;
      .weui-flex__item {
        flex-grow: 1;
        box-sizing: border-box;
        font-size: 26rpx;
        font-weight: 600;
        &:first-child {
          text-align: left;
          padding: 0 20px;
          border-right: 1px solid #ddd;
        }
        .total-price {
          color: red;
          span {
            color: #666;
          }
        }
        button {
          border: none;
          height: 100%;
          width: 100%;
          font-size: 26rpx;
          line-height: 52px;
          padding: 0;
          border-radius: 0;
          color: #666;
          &.toPay-btn {
            color: #fff;
            background-color: #1abc9c;
            &:active {
              background-color: #16a085;
            }
          }
          &::after {
            border: none
          }
          &::before {
            border: none;
          }
        }
      }
    }
  }
}
</style>
