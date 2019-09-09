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
    <div class="tab-footer lzy-footer">
      <div class="left-box">
        <span>商品金额：</span>
        <span class="price"><span class="logo">¥</span>{{getTotalPrice}}</span>
      </div>
      <div class="right-box">
        <button class="shoppingCart-btn" @click="addToShoppingCart">加入购物车</button>
        <button class="toPay-btn" type="primary" @click="toPay">立即购买</button>
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
        sales: 2422,
        score: 4.3
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
    init () {
      this.num = 0
      this.currentTabKey = 0
    },
    changeTabContent (e) {
      this.currentTabKey = e.mp.detail.current
    },
    selectNavTab (index) {
      this.currentTabKey = index
    },
    addToShoppingCart () {
      if (this.num === 0) {
        wx.showToast({
          title: '商品数量不能为0',
          icon: 'none',
          duration: 2000
        })
      } else {
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 2000
        })
      }
    },
    toShoppingCart () {
      mpvue.navigateTo({ url: '/pages/shoppingCart/main' })
    },
    toPay () {
      if (this.num === 0) {
        wx.showToast({
          title: '商品数量不能为0',
          icon: 'none',
          duration: 2000
        })
      } else {
        this.$store.commit('Order/SET_GOODSLIST', {
          goodsList: [
            {
              id: this.goods.id,
              num: this.num
            }
          ]
        })
        mpvue.navigateTo({ url: '/pages/orderConfirm/main' })
      }
    }
  },
  mounted () {
    const data = {
      username: 'heoning',
      password: 'qqq',
      type: {
        id: 14,
        name: '214'
      }
    }
    this.$http.get('action/test', data).then(res => {
      console.log(res)
    })
    this.goods.id = this.$root.$mp.query.goodsId
    wx.setNavigationBarTitle({
      title: this.goods.title
    })
  },
  onUnload () {
    this.init()
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
      border-bottom: 1px solid #ddd;
      &.on {
        color: #1abc9c;
        border-bottom: 2px solid #1abc9c;
      }
    }
  }
  .tab-content {
    flex-grow: 1;
    background-color: #f3f3f3;
    height: calc(100% - 140px - 40px - 70px);
    swiper {
      height: 100%;
      swiper-item {
        box-sizing: border-box;
        height: 100%;
        overflow-y: auto;
      }
    }
  }
  .tab-footer {
    .left-box {
      font-size: 14px;
      .price {
        color: #ff6421;
        font-size: 18px;
        .logo {
          font-size: 12px;
          margin-right: 3px;
        }
      }
    }
    .right-box {
      button {
        margin-left: 0px;
        border-radius: 20px;
        color: #fff;
        &.shoppingCart-btn {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          background-color: orange;
          &:active {
            background-color: #ff9a00;
          }
        }
        &.toPay-btn {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          background-color: #ff6421;
          &:active {
            background-color: #ec4e09;
          }
        }
      }
    }
  }
}
</style>
