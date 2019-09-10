<template>
  <div class="shoppingCart-wrap lzy-list-wrap">
    <div class="goods-list-wrap">
      <div class="goods-list">
        <div class="goods-box" v-for="(goodsItem, goodsIndex) in goodsList" :key="goodsIndex">
          <movable-area class="movable-area">
            <movable-view x="65" y="0" out-of-bounds="true" class="movable-view" direction="horizontal" inertia="true" damping="100">
              <div class="left-box">
                <div class="select-box" @click="selectGoods(goodsItem)">
                  <i class="iconfont icon-select-no" v-if="!goodsItem.isSelected">&#xe656;</i>
                  <i class="iconfont icon-select-fill" v-else>&#xe655;</i>
                </div>
                <div class="img-box" v-for="(typeItem, typeIndex) in goodsItem.type" :key="typeIndex" :class="{'isSelected': typeItem.isSelected}">
                  <image :src="typeItem.imgList[0]" alt="商品图片" mode="aspectFit"></image>
                </div>
              </div>
              <div class="content-box">
                <div class="info-box">
                  <p class="title" @click="toGoodsDetail(goodsItem)">{{goodsItem.title}}</p>
                  <p class="type" 
                  v-for="(typeItem, typeIndex) in goodsItem.type" 
                  :key="typeIndex" 
                  :class="{'isSelected': typeItem.isSelected}"
                  @click="showTypeDialog(goodsItem)">
                    {{typeItem.title}}:{{typeItem.content}}
                  </p>
                  <p class="bottom-p" v-for="(typeItem, typeIndex) in goodsItem.type" :key="typeIndex" :class="{'isSelected': typeItem.isSelected}">
                    <span class="price"><span class="logo">¥</span>{{(typeItem.discountPrice ? typeItem.discountPrice : typeItem.price )* goodsItem.num}}</span>
                    <span class="numPicker-box">
                      <num-picker :min="1" :isSmall="1" :max="typeItem.stock" :num.sync="goodsItem.num"></num-picker>
                    </span>
                  </p>
                </div>
              </div>
            </movable-view>
            <button class="delete-btn" @click="deleteItem(goodsItem, goodsIndex)">删除</button>
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
    <type-dialog :parentType="'shoppingCart'"></type-dialog>
  </div>
</template>

<script>
import numPicker from '../../components/numPicker/numPicker'
import typeDialog from '../../components/typeDialog/typeDialog'

export default {
  components: {
    numPicker,
    typeDialog
  },
  data () {
    return {
      isAllSelected: false,
      goodsList: []
    }
  },
  computed: {
    getTotalPrice () {
      let price = 0
      this.goodsList.map(goodsItem => {
        if (goodsItem.isSelected) {
          let selectedType
          goodsItem.type.map(typeItem => {
            if (typeItem.isSelected) {
              selectedType = typeItem
            }
          })
          price += ((selectedType.discountPrice ? selectedType.discountPrice : selectedType.price) * goodsItem.num)
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
    this.goodsList = this.$store.getters['ShoppingCart/goodsList']
  },
  async onPullDownRefresh() {
    console.log('下拉刷新')
    console.log(this)
    // 停止下拉刷新
    // wx.stopPullDownRefresh()
  },
  methods: {
    showTypeDialog (goodsItem) {
      this.$store.commit('Goods/SET_GOODS', goodsItem)
      this.$store.commit('Goods/SET_SHOWTYPEDIALOG', true)
    },
    deleteItem (item, index) {
      this.goodsList.splice(index, 1)
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
  .select-box {
    width: 40px;
    text-align: center;
    .iconfont {
      font-size: 21px;
      color: #ddd;
      &.icon-select-fill {
        color: orangered
      }
    }
  }
  .goods-list-wrap {
    height: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    .goods-list {
      height: 100%;
      .goods-box {
        overflow: hidden;
        padding: 10px;
        border-radius: 10px;
        margin-bottom: 10px;
        box-sizing: border-box;
        background-color: #fff;
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
                display: none;
                &.isSelected {
                  display: inline-block;
                }
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
                  padding-bottom: 4px;
                  &.title {
                    color: #333;
                  }
                  &.type {
                    display: none;
                    font-size: 10px;
                    padding: 2px 4px;
                    background-color: #f6f6f6;
                    border-radius: 4px;
                    color: #999;
                    &.isSelected {
                      display: block;
                    }
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
                    display: none;
                    margin-top: 5px;
                    height: 30px;
                    position: relative;
                    padding: 0;
                    &.isSelected {
                      display: block;
                    }
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