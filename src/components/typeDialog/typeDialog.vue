<template>
  <div class="type-actionSheet-wrap" :class="{'open': checkOpenTypeDialog}">
    <div class="mask" @click="showTypeDialog(false)"></div>
    <div class="content-wrap">
      <div class="content-panel header-panel">
        <div class="img-box">
          <image :src="getImgSrc" alt="商品图片" mode="aspectFit"></image>
        </div>
        <div class="title-box">
          <i class="iconfont icon-close" @click="showTypeDialog(false)">&#xe711;</i>
          <p class="price">
            <span class="original-price" :class="{'hasDiscount': checkDiscount}">
              <span class="logo">¥</span> {{getPrice}}
            </span>
            <span class="discount-price" v-if="checkDiscount">
              优惠价 <span class="logo">
                {{getDiscountPrice}}
              </span>
            </span>
          </p>
          <p class="stock">库存{{selectedType.stock}}件</p>
          <p class="info">已选：{{selectedType.content}}</p>
        </div>
      </div>
      <div class="content-panel">
        <div class="header">
          <span>{{selectedType.title}}</span>
        </div>
        <div class="type-list-wrap">
          <div 
          class="type-item-box" 
          v-for="(typeItem, typeIndex) in types" 
          :key="typeIndex" 
          :class="{'selected': typeItem.isSelected}"
          @click="selectType(typeItem)">
            <span>{{typeItem.content}}</span>
          </div>
        </div>
      </div>
      <div class="content-panel numPicker-panel">
        <div class="header">
          <span>购买数量</span>
          <span class="right-box"><num-picker :min="1" :max="selectedType.stock" :num.sync="num"></num-picker></span>
        </div>
      </div>
      <div class="content-panel dialog-footer">
        <div class="goods-detail-btn btn-panel" v-if="parentType === 'goodsDetail'">
          <span class="confirm-btn" @click="handlerSelectedType">确定</span>
        </div>
        <div class="shopping-cart-btn btn-panel" v-if="parentType === 'shoppingCart'">
          <span class="left-btn" @click="handlerSelectedType">确定</span>
          <span class="right-btn" @click="toOrderConfirm">购买</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numPicker from '../numPicker/numPicker'
export default {
  components: {
    numPicker
  },
  props: {
    parentType: {
      type: String,
      default () {
        return 'goodsDetail'
      }
    }
  },
  data () {
    return {
      types: [],
      selectedType: {},
      num: 0
    }
  },
  onUnload () {
    this.init()
  },
  watch: {
    checkOpenTypeDialog () {
      this.types = JSON.parse(JSON.stringify(this.$store.getters['Goods/goods'].type))
      this.num = this.$store.getters['Goods/goods'].num
      this.selectedType = this.types[0]
      this.types.map(item => {
        if (item.isSelected) {
          this.selectedType = item
        }
      })
      this.selectedType.isSelected = true
    }
  },
  computed: {
    checkDiscount () {
      if (this.selectedType.discountPrice) {
        return true
      } else {
        return false
      }
    },
    getPrice () {
      if (JSON.stringify(this.selectedType) === '{}') {
        return 0.00
      } else {
        return this.selectedType.price.toFixed(2)
      }
    },
    getDiscountPrice () {
      if (JSON.stringify(this.selectedType) === '{}') {
        return 0.00
      } else {
        return this.selectedType.discountPrice.toFixed(2)
      }
    },
    getSelectedPrice () {
      if (JSON.stringify(this.selectedType) === '{}') {
        return 0
      } else {
        return this.selectedType.discountPrice ? this.selectedType.discountPrice.toFixed(2) : this.selectedType.price.toFixed(2)
      }
    },
    getImgSrc () {
      if (JSON.stringify(this.selectedType) === '{}') {
        return ''
      } else {
        return this.selectedType.imgList[0]
      }
    },
    checkOpenTypeDialog () {
      return this.$store.getters['Goods/isShowTypeDialog']
    }
  },
  methods: {
    init () {
      this.types = []
      this.selectedType = {}
    },
    showTypeDialog (flag) {
      this.$store.commit('Goods/SET_SHOWTYPEDIALOG', flag)
    },
    handlerSelectedType () {
      this.$store.commit('Goods/SET_GOODSTYPE', this.types)
      this.$store.commit('Goods/SET_NUM', this.num)
      this.showTypeDialog(false)
      // mpvue.navigateTo({ url: '/pages/' + this.parentType + '/main' })
    },
    selectType (type) {
      this.types.map(item => {
        if (item.content === type.content) {
          item.isSelected = true
          this.selectedType = item
        } else {
          item.isSelected = false
        }
      })
    },
    toOrderConfirm () {
      let goods = JSON.parse(JSON.stringify(this.$store.getters['Goods/goods']))
      goods.type = this.selectedType
      goods.num = this.num
      this.$store.commit('Goods/SET_GOODSTYPE', this.types)
      this.$store.commit('Goods/SET_NUM', this.num)
      this.$store.commit('Order/SET_GOODSLIST', [goods])
      this.showTypeDialog(false)
      mpvue.navigateTo({ url: '/pages/orderConfirm/main' })
    }
  }
}
</script>

<style lang="less" scoped>
.type-actionSheet-wrap {
  z-index: 99999999999999999;
  display: none;
  position: fixed;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  &.open {
    display: block;
    top: 0;
    bottom: 0;
    .content-wrap {
      bottom: 0;
    }
  }
  .mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .content-wrap {
    transition: all 0.6s;
    position: absolute;
    bottom: -1000px;
    left: 0;
    right: 0;
    background-color: #fff;
    padding: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    .content-panel {
      border-bottom: 1px solid #eee;
      margin-bottom: 10px;
      padding-bottom: 10px;
      .header {
        font-size: 12px;
        padding: 4px 0;
        margin-bottom: 10px;
      }
      &.header-panel {
        display: flex;
        align-items: flex-end;
        position: relative;
        .img-box {
          width: 90px;
          height: 90px;
          overflow: hidden;
          border-radius: 5px;
          image {
            width: 100%;
            height: 100%;
          }
        }
        .title-box {
          flex-grow: 1;
          padding: 0 10px;
          .price {
            font-size: 16px;
            color: #ff6421;
            .original-price {
              margin-right: 4px;
              &.hasDiscount {
                font-size: 14px;
                color: #777;
                text-decoration: line-through;
              }
            }
            .logo {
              margin-right: 2px;
            }
          }
          .stock {
            font-size: 12px;
            color: #888;
          }
          .info {
            font-size: 12px;
            color: #444;
          }
        }
        .icon-close {
          font-size: 16px;
          right: 0;
          top: 0;
          color: #888;
          position: absolute;
        }
      }
      .type-list-wrap {
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 20px;
        margin-bottom: 30px;
        .type-item-box {
          font-size: 24rpx;
          padding: 6px 8px;
          border-radius: 6rpx;
          margin-right: 12rpx;
          margin-bottom: 6px;
          background-color: #eee;
          border: 2rpx solid #eee;
          color: #666;
          &.selected {
            border: 1px solid #ff6421;
            color: #ff6421;
            background-color: #ffeee7;
          }
        }
      }
      &.numPicker-panel {
        .header {
          display: flex;
          align-items: center;
          .right-box {
            flex-grow: 1;
            text-align: right;
          }
        }
      }
      &.dialog-footer {
        border: none;
        padding: 10px 0 0;
        .btn-panel {
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            font-size: 14px;
            text-align: center;
            padding: 8px 10px;
            border-radius: 20px;
            flex-grow: 1;
            color: #fff;
            &.confirm-btn {
              background-color: #ff6421;
              &:active {
                background-color: #ec4e09;
              }
            }
            &.left-btn {
              border-top-right-radius: 0;
              border-bottom-right-radius: 0;
              background-color: orange;
              &:active {
                background-color: #ff9a00;
              }
            }
            &.right-btn {
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
  }
}
</style>