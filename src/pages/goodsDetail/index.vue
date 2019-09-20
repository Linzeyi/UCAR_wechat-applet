<template>
  <div style="height: 100%">
    <base-navigation-bar :name="goods.goodsName ? goods.goodsName : ''">
      <i class="iconfont" @click="backOff">&#xe625;</i>
    </base-navigation-bar>
    <base-custom-box>
      <div class="goodsDetail" :class="{'invalid': checkInvalid}">
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
              <goods-info :goods.sync="goods" :num.sync="num" :property.sync="property" v-if="checkPropertyList"></goods-info>
            </swiper-item>
            <swiper-item class="no-bg-color">
              <goods-comment :goods="goods"></goods-comment>
            </swiper-item>
          </swiper>
        </div>
        <div class="invalid-tips">
          该商品已下架
        </div>
        <div class="tab-footer lzy-footer">
          <div class="left-box" :class="{'small': getTotalPrice >= 100000}">
            <span class="price"><span class="logo">¥</span>{{getTotalPrice}}</span>
          </div>
          <div class="right-box">
            <button class="shoppingCart-btn" @click="addToShoppingCart" :disabled="checkInvalid">加入购物车</button>
            <button class="toOrderConfirm-btn" type="primary" @click="toOrderConfirm" :disabled="checkInvalid">立即购买</button>
          </div>
        </div>
        <type-dialog :parentType="'goodsDetail'" :goodsNo="goods.goodsNo" :property="property" :pNum="num" @changeType="changeType"></type-dialog>
      </div>
    </base-custom-box>
  </div>
</template>

<script>
import BaseCustomBox from "@/components/base/BaseCustomBox"
import BaseNavigationBar from "@/components/base/BaseNavigationBar"
import goodsInfo from '@/components/goodsDetail/goodsInfo/goodsInfo'
import goodsComment from '@/components/goodsDetail/goodsComment/goodsComment'
import typeDialog from '@/components/typeDialog/typeDialog'

export default {
  components: {
    goodsInfo,
    goodsComment,
    typeDialog,
    BaseCustomBox,
    BaseNavigationBar
  },
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
      goods: {
      },
      property: {},
      num: 1
    }
  },
  computed: {
    checkPropertyList () {
      return this.goods.hasOwnProperty('propertyList')
    },
    checkProperty () {
      if (JSON.stringify(this.property) !== '{}') {
        console.log('有选中规格！')
        return true
      } else {
        console.log('无选中规格！')
        return false
      }
    },
    checkInvalid () {
      return this.goods.status === 2
    },
    getTotalPrice () {
      if (!this.checkProperty || this.checkInvalid) {
        return 0
      } else {
        return (this.getSelectedTypePrice * (this.num ? this.num : 0)).toFixed(2)
      }
    },
    getSelectedTypePrice () {
      if (!this.checkProperty) {
        return 0.00
      } else {
        return this.property.discountPrice ? this.property.discountPrice : this.property.salePrice
      }
    }
  },
  onLoad (option) {
    this.goods.goodsNo = option.goodsNo
    this.getGoodsByNo()
  },
  onUnload () {
    this.init()
  },
  async onPullDownRefresh() {
    this.getGoodsByNo()
  },
  methods: {
    init () {
      this.currentTabKey = 0
      this.goods = {}
      this.property = {}
      this.num = 0
      this.$store.commit('Goods/SET_SHOWTYPEDIALOG', false)
    },
    changeType (property, num) {
      this.property = property
      this.num = num
      console.log('赋值规格后的商品', this.goods)
    },
    getGoodsByNo () {
      wx.showLoading({
        title: '正在加载',
        mask: true
      })
      this.$http.get('/action/goods/getGoodsDetailByGoodsNo', {
        goodsNo: this.goods.goodsNo
      }).then(res => {
        if (res.data) {
          this.goods = res.data
          console.log('goods:', this.goods)
        } else {
          wx.showToast({
            title: '加载失败',
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
    backOff () {
      mpvue.navigateBack({ delta: 1 })
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
      } else if (!this.checkProperty) {
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
              that.$http.get('/action/order/updateGoodsInCart', {
                goodsNo: that.goods.goodsNo,
                goodsName: that.goods.goodsName,
                property: that.property,
                num: that.num
              }).then(res => {
                console.log(res)
                if (res.status) {
                  wx.showToast({
                    title: '添加成功',
                    icon: 'success',
                    duration: 2000
                  })
                } else {
                  wx.showToast({
                    title: '添加失败',
                    icon: 'none',
                    duration: 2000
                  })
                }
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
      if (this.checkProperty) {
        if (this.goods.num === 0) {
          wx.showToast({
            title: '商品数量不能为0',
            icon: 'none',
            duration: 2000
          })
        } else {
          let goods = JSON.parse(JSON.stringify(this.goods))
          goods.num = this.num
          goods.property = this.property
          let goodsList = [goods]
          this.$store.commit('Order/SET_GOODSLIST', goodsList)
          mpvue.navigateTo({ url: '/pages/orderConfirm/main' })
        }
      } else {
        this.$store.commit('Goods/SET_SHOWTYPEDIALOG', true)
      }
    }
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
    height: 45px;
    line-height: 45px;
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
    flex-shrink: 0;
    height: calc(100% - 45px - 70px);
    swiper {
      height: 100%;
      swiper-item {
        background-color: #f3f3f3;
        &.no-bg-color {
          background-color: #fff;
        }
        box-sizing: border-box;
        height: 100%;
        overflow-y: auto;
      }
    }
  }
  .invalid-tips {
    display: none;
  }
  .tab-footer {
    .left-box {
      font-size: 14px;
      text-align: right;
      padding-right: 15px;
      box-sizing: border-box;
      display: inline-block;
      flex-grow: 1;
      &.small {
        font-size: 12px;
        .price {
          font-size: 13px;
          .logo {
            font-size: 11px;
          }
        }
      }
      .price {
        color: #ff6421;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .logo {
          font-size: 13px;
          margin-right: 3px;
        }
      }
    }
    .right-box {
      flex-grow: 0;
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
  &.invalid {
    /deep/ .type-box, /deep/ .shop-box {
      display: none;
    }
    .tab-content {
      height: calc(100% - 45px - 70px - 45px);
    }
    .invalid-tips {
      display: block;
      width: 100%;
      position: fixed;
      bottom: 70px;
      height: 45px;
      line-height: 45px;
      background-color: #888;
      color: #fff;
      text-align: center;
    }
    .tab-footer {
      .right-box {
        button {
          &.shoppingCart-btn {
            color: #fcc868;
            background-color: orange;
            &:active {
              background-color: orange;
            }
          }
          &.toOrderConfirm-btn {
            color: #fda27b;
            background-color: #ff6421;
            &:active {
              background-color: #ff6421;
            }
          }
        }
      }
    }
  }
}
</style>
