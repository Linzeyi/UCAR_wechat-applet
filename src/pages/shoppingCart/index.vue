<template>
  <div style="height: 100%">
    <base-navigation-bar name="购物车">
      <i class="iconfont" @click="Utils.navigateTo('/pages/search/main')">&#xe60b;</i>
    </base-navigation-bar>
    <base-custom-box>
      <div class="shoppingCart-wrap lzy-list-wrap">
        <div class="goods-list-wrap">
          <div class="goods-list" v-if="goodsList.length !== 0">
            <div class="goods-box" v-for="(goodsItem, goodsIndex) in goodsList" :key="goodsIndex">
              <movable-area class="movable-area">
                <movable-view x="65" y="0" out-of-bounds="true" class="movable-view" direction="horizontal" inertia="true" damping="100">
                  <div class="left-box">
                    <div class="select-box" @click="selectGoods(goodsItem)">
                      <i class="iconfont icon-select-no" v-if="!goodsItem.isSelected">&#xe656;</i>
                      <i class="iconfont icon-select-fill" v-else>&#xe655;</i>
                    </div>
                    <div class="img-box">
                      <image :src="goodsItem.property.picList[0] ? goodsItem.property.picList[0] : getDefaultImg" alt="商品图片" mode="aspectFit" @click="showImg(goodsItem.property)"></image>
                    </div>
                  </div>
                  <div class="content-box">
                    <div class="info-box">
                      <p class="title" @click="toGoodsDetail(goodsItem)">{{goodsItem.goodsName}}</p>
                      <p class="type" @click="handlerShowTypeDialog(goodsItem)">
                        规格:{{goodsItem.property.propertyName}}
                      </p>
                      <p class="bottom-p">
                        <span class="price"><span class="logo">¥</span>{{(goodsItem.property.discountPrice ? goodsItem.property.discountPrice : goodsItem.property.salePrice )* goodsItem.num}}</span>
                        <span class="numPicker-box">
                          <num-picker :min="1" :isSmall="true" :max="goodsItem.property.stock" :num.sync="goodsItem.num" @changeProperty="changeProperty"></num-picker>
                        </span>
                      </p>
                    </div>
                  </div>
                </movable-view>
                <button class="delete-btn" @click="deleteItem(goodsList, goodsItem, goodsIndex)">删除</button>
              </movable-area>
            </div>
          </div>
          <div class="no-goods-panel" v-else>
            <p>
              <i class="iconfont icon-no-goods">&#xe617;</i>
              购物车空啦！
            </p>
          </div>
          <div class="invalid-goods-list" v-if="invalidGoodsList.length !== 0">
            <div class="header">
              <span class="title">失效商品{{invalidGoodsList.length}}件</span>
            </div>
            <div class="invalid-goods-box" v-for="(unGoodsItem, unGoodsIndex) in invalidGoodsList" :key="unGoodsIndex">
              <movable-area class="movable-area">
                <movable-view x="65" y="0" out-of-bounds="true" class="movable-view" direction="horizontal" inertia="true" damping="100">
                  <div class="left-box">
                    <div class="tips-box">
                      <span class="invalid-tips">失效</span>
                    </div>
                    <div class="img-box" :key="typeIndex">
                      <image :src="unGoodsItem.property.picList[0] ? unGoodsItem.property.picList[0] : getDefaultImg" alt="商品图片" mode="aspectFit"></image>
                    </div>
                  </div>
                  <div class="content-box">
                    <div class="info-box">
                      <p class="title" @click="toGoodsDetail(unGoodsItem)">{{unGoodsItem.goodsName}}</p>
                      <p class="invalid-msg">{{unGoodsItem.invalidMsg}}</p>
                    </div>
                  </div>
                </movable-view>
                <button class="delete-btn" @click="deleteItem(invalidGoodsList, unGoodsItem, unGoodsIndex)">删除</button>
              </movable-area>
            </div>
          </div>
        </div>
        <div class="cart-footer lzy-footer">
          <div class="left-box">
            <div class="select-box">
              <i class="iconfont icon-select-no" v-if="!isAllSelected" @click="selectAll(true)">&#xe656;</i>
              <i class="iconfont icon-select-fill" v-else  @click="selectAll(false)">&#xe655;</i>
            </div>
            <span class="select-title">全选</span>
          </div>
          <div class="right-box">
            <span class="total">合计：</span>
            <span class="price"><span class="logo">¥</span>{{getTotalPrice}}</span>
            <button class="to-pay-btn" @click="toOrderConfirm">结算({{getSelectedNum}})</button>
          </div>
        </div>
        <type-dialog :parentType="'shoppingCart'" :goodsNo="selectedGoods.goodsNo" :property="selectedGoods.property" :pNum="selectedGoods.num" @changeProperty="changeProperty"></type-dialog>
      </div>
    </base-custom-box>
  </div>
</template>

<script>
import BaseCustomBox from "@/components/base/BaseCustomBox"
import BaseNavigationBar from "@/components/base/BaseNavigationBar"
import numPicker from '@/components/numPicker/numPicker'
import typeDialog from '@/components/typeDialog/typeDialog'

export default {
  components: {
    numPicker,
    typeDialog,
    BaseCustomBox,
    BaseNavigationBar
  },
  data () {
    return {
      isAllSelected: false,
      goodsList: [],
      invalidGoodsList: [],
      selectedGoods: {
        goodsNo: ''
      }
    }
  },
  computed: {
    getDefaultImg () {
      return this.Utils.getSquareDefaultImg()
    },
    getTotalPrice () {
      let price = 0
      this.goodsList.map(goodsItem => {
        if (goodsItem.isSelected) {
          price += ((goodsItem.property.discountPrice ? goodsItem.property.discountPrice : goodsItem.property.price) * goodsItem.num)
        }
      })
      return price
    },
    getSelectedNum () {
      let num = 0
      this.goodsList.map(item => {
        if (item.isSelected) {
          num++
        }
      })
      return num
    },
    getSelectedGoodsList () {
      let selectedGoodsList = []
      this.goodsList.map(item => {
        if (item.isSelected) {
          selectedGoodsList.push(item)
        }
      })
      return selectedGoodsList
    }
  },
  onLoad () {
    this.getShoppingCartGoodsList()
  },
  async onPullDownRefresh() {
    this.getShoppingCartGoodsList()
  },
  methods: {
    showImg (item) {
      wx.previewImage({
        current: item.picList[0],
        urls: item.picList
      })
    },
    changeProperty () {
      console.log('选中商品', this.selectedGoods)
      this.getShoppingCartGoodsList()
    },
    getShoppingCartGoodsList () {
      this.goodsList = []
      this.invalidGoodsList = []
      wx.showLoading({
        title: '正在加载',
        mask: true
      })
      this.$http.get('/action/order/getShoppingCartList').then(res => {
        console.log(res)
        if (res) {
          this.goodsList = res.data.validCart
          this.invalidGoodsList = res.data.invalidCart
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
          title: '加载失败',
          icon: 'none',
          duration: 2000
        })
      })
    },
    handlerShowTypeDialog (goodsItem) {
      this.selectedGoods = goodsItem
      this.showTypeDialog(true)
    },
    showTypeDialog (flag) {
      this.$store.commit('Goods/SET_SHOWTYPEDIALOG', flag)
    },
    deleteItem (list, item, index) {
      list.splice(index, 1)
    },
    toGoodsDetail (goodsItem) {
      this.$store.commit('Goods/SET_GOODS', goodsItem)
      mpvue.navigateTo({ url: '/pages/goodsDetail/main' })
    },
    toOrderConfirm () {
      if (this.getSelectedNum === 0) {
        wx.showToast({
          title: '商品数量不能为0',
          icon: 'none',
          duration: 2000
        })
      } else {
        let selectedGoodsList = JSON.parse(JSON.stringify(this.getSelectedGoodsList))
        this.$store.commit('Order/SET_GOODSLIST', selectedGoodsList)
        console.log('购物车选中商品：', selectedGoodsList)
        console.log('购物车发起订单')
        mpvue.navigateTo({ url: '/pages/orderConfirm/main' })
      }
    },
    selectAll (flag) {
      this.isAllSelected = flag
      for (let index in this.goodsList) {
        this.goodsList[index].isSelected = flag
      }
    },
    selectGoods (item) {
      item.isSelected = !item.isSelected
      for (let index in this.goodsList) {
        let flag = this.goodsList[index].isSelected
        if (!flag) {
          this.isAllSelected = false
          return void 0
        }
      }
      this.isAllSelected = true
    }
  }
}
</script>

<style lang="less">
.shoppingCart-wrap {
  box-sizing: border-box;
  padding: 10px 0;
  background-color: #f3f3f3;
  .select-box, .tips-box {
    width: 40px;
    .iconfont {
      margin-left: 5px;
      font-size: 21px;
      color: #ddd;
      &.icon-select-fill {
        color: orangered
      }
    }
  }
  .goods-list-wrap {
    padding: 0 10px 30px 10px;
    box-sizing: border-box;
    .no-goods-panel {
      padding: 30px 0;
      p {
        font-size: 16px;
        color: #bbb;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        .iconfont {
          font-size: 24px;
          margin-right: 9px;
        }
      }
    }
    .goods-list, .invalid-goods-list {
      .goods-box, .invalid-goods-box {
        padding: 10px;
        box-sizing: border-box;
        overflow: hidden;
        .movable-area {
          position: relative;
          left: -55px;
          width: calc(100% + 55px);
          height: auto;
          .movable-view {
            width: calc(100% - 55px);
            height: auto;
            clear: both;
            display: flex;
            position: relative;
            background-color: #fff;
            z-index: 9;
            .left-box {
              height: 70px;
              display: flex;
              justify-content: center;
              align-items: center;
              .img-box {
                border-radius: 2px;
                flex-grow: 1;
                width: 70px;
                height: 70px;
                overflow: hidden;
                image {
                  width: 100%;
                  height: 100%;
                }
              }
            }
            .content-box {
              width: 100%;
              .info-box {
                display: inline-block;
                vertical-align: top;
                width: 100%;
                padding: 0 10px;
                box-sizing: border-box;
                p {
                  font-size: 12px;
                  &.title {
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                  }
                }
              }
            }
          }
          .delete-btn {
            z-index: 8;
            width: 50px;
            height: 30px;
            background-color: #ff6421;
            color: #fff;
            position: absolute;
            right: 0;
            top: 50%;
            margin-top: -30rpx;
            padding: 0;
            font-size: 12px;
            line-height: 30px;
            &:active {
              background-color: #ec4e09;
            }
          }
        }
      }
    }
    .goods-list {
      margin-bottom: 10px;
      .goods-box {
        border-radius: 10px;
        background-color: #fff;
        margin-bottom: 10px;
        .content-box {
          width: 100%;
          p {
            font-size: 12px;
            margin-bottom: 4px;
            &.title {
              color: #333;
            }
            &.type {
              font-size: 10px;
              padding: 2px 4px;
              background-color: #f6f6f6;
              border-radius: 4px;
              color: #999;
            }
            .price {
              font-size: 12px;
              color: #ff6421;
              .logo {
                font-size: 10px;
                margin-right: 5px;
              }
            }
            &.bottom-p {
              margin-top: 5px;
              height: 30px;
              position: relative;
              padding: 0;
              .price {
                display: inline-block;
                height: 30px;
                line-height: 30px;
                vertical-align: top;
              }
              .numPicker-box {
                padding: 5px 0;
                float: right;
                top: 0;
              }
            }
          }
        }
      }
    }
    .invalid-goods-list {
      padding-bottom: 10px;
      border-radius: 10px;
      overflow: hidden;
      background-color: #fff;
      .header {
        padding: 15px 10px 5px;
        font-size: 14px;
        text-indent: 5px;
        color: #555;
        margin-bottom: 10px;
      }
      .invalid-goods-box {
        .left-box {
          .tips-box {
            .invalid-tips {
              font-size: 20rpx;
              color: #fff;
              width: 88%;
              border-radius: 16rpx;
              // padding: 2rpx 0;
              background-color: #999;
              display: inline-block;
              text-align: center;
            }
          }
        }
        .title {
          margin-bottom: 15px;
          color: #888;
        }
        .invalid-msg {
          color: #333;
        }
      }
    }
  }
  .cart-footer {
    .left-box {
      .select-title {
        font-size: 12px;
        color: #666;
      }
    }
    .right-box {
      .price {
        color: #ff6421;
        font-size: 16px;
        .logo {
          font-size: 11px;
          margin-right: 6px;
        }
      }
      .to-pay-btn {
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