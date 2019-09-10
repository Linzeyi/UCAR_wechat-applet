<template>
  <div class="goodsDetail">
    
    <div class="tab-navbar">
      <div class="flex-box">
          <div class="tab-navbar-item" 
            v-for="(item, index) in navbarList" 
            :key="index" 
            @click="selectNavTab(index)">
            <span class="nav-name" :class="{'on': currentTabKey == index}">{{item.name}}</span>
          </div>
      </div>
    </div>
    <div class="tab-content">
      <swiper :current="currentTabKey" @change="changeTabContent">
        <swiper-item>
          <goods-info :goods.sync="goods" :num.sync="goods.num"></goods-info>
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
        <button class="toOrderConfirm-btn" type="primary" @click="toOrderConfirm">立即购买</button>
      </div>
    </div>
    <type-dialog :parentType="'goodsDetail'"></type-dialog>
  </div>
</template>

<script>
import goodsInfo from '../../components/goodsDetail/goodsInfo/goodsInfo'
import goodsComment from '../../components/goodsDetail/goodsComment/goodsComment'
import typeDialog from '../../components/typeDialog/typeDialog'

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
          key: 'comment',
          name: '评论'
        }
      ],
      goods: {}
    }
  },
  computed: {
    getTotalPrice () {
      if (!this.checkSelectedType) {
        return 0
      } else {
        return this.getSelectedTypePrice * (this.goods.num ? this.goods.num : 0)
      }
    },
    getSelectedTypePrice () {
      let type = this.getSelectedType
      return type.discountPrice ? type.discountPrice : type.price
    },
    getSelectedType () {
      let arr = this.goods.type
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].isSelected) {
          return arr[i]
        }
      }
      return {}
    },
    checkSelectedType () {
      let arr = this.goods.type
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].isSelected) {
          return true
        }
      }
      return false
    }
  },
  onLoad () {
    this.goods = this.$store.getters['Goods/goods']
  },
  components: {
    goodsInfo,
    goodsComment,
    typeDialog
  },
  async onPullDownRefresh() {
    console.log('下拉刷新')
    console.log(this)
    // 停止下拉刷新
    // wx.stopPullDownRefresh()
  },
  methods: {
    init () {
      this.currentTabKey = 0
      this.$store.commit('Goods/SET_GOODS', {})
      this.$store.commit('Goods/SET_SHOWTYPEDIALOG', false)
    },
    changeTabContent (e) {
      this.currentTabKey = e.mp.detail.current
    },
    selectNavTab (index) {
      this.currentTabKey = index
    },
    addToShoppingCart () {
      let that = this
      if (this.goods.num === 0) {
        wx.showToast({
          title: '商品数量不能为0',
          icon: 'none',
          duration: 2000
        })
      } else if (!this.checkSelectedType) {
        wx.showToast({
          title: '请选择一个规格类型',
          icon: 'none',
          duration: 2000
        })
      } else {
        wx.showModal({
          title: '添加购物车',
          content: '是否将本商品加入购物车',
          confirmText: '确定',
          success (res) {
            if (res.confirm) {
              that.$store.commit('ShoppingCart/ADD_GOODS', that.goods)
              wx.showToast({
                title: '添加成功',
                icon: 'success',
                duration: 2000
              })
            }
          }
        })
      }
    },
    toShoppingCart () {
      mpvue.navigateTo({ url: '/pages/shoppingCart/main' })
    },
    toOrderConfirm () {
      if (this.checkSelectedType) {
        if (this.goods.num === 0) {
          wx.showToast({
            title: '商品数量不能为0',
            icon: 'none',
            duration: 2000
          })
        } else {
          let goodsList = [this.goods]
          let selectedGoodsList = JSON.parse(JSON.stringify(goodsList))
          selectedGoodsList.map(goodsItem => {
            let selectedType
            for (let i = 0; i < goodsItem.type.length; i++) {
              if (goodsItem.type[i].isSelected) {
                selectedType = goodsItem.type[i]
                break
              }
            }
            goodsItem.type = selectedType
          })
          this.$store.commit('Order/SET_GOODSLIST', selectedGoodsList)
          mpvue.navigateTo({ url: '/pages/orderConfirm/main' })
        }
      } else {
        this.$store.commit('Goods/SET_SHOWTYPEDIALOG', true)
      }
    }
  },
  mounted () {
    // const data = {
    //   username: 'heoning',
    //   password: 'qqq',
    //   type: {
    //     id: 14,
    //     name: '214'
    //   }
    // }
    // this.$http.get('action/test', data).then(res => {
    //   console.log(res)
    // })
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
    .flex-box {
      display: flex;
      position: relative;
    }
    .tab-navbar-item {
      display: block;
      padding: 0;
      box-sizing: border-box;
      height: 45px;
      line-height: 45px;
      text-align: center;
      flex-grow: 1;
      font-size:28rpx;
      color: #aaa;
      .nav-name {
        display: inline-block;
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
        border-bottom: 2px solid #ddd;
        &.on {
          color: #ec4e09;
          border-bottom: 2px solid #ec4e09;
        }
      }
    }
  }
  .tab-content {
    background-color: #f3f3f3;
    flex-shrink: 0;
    height: calc(100% - 62px - 50px);
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
        &.toOrderConfirm-btn {
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
