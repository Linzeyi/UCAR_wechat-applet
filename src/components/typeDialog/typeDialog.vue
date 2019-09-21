<template>
  <div class="property-actionSheet-wrap" :class="{'open': checkOpenTypeDialog}">
    <div class="mask" @click="showTypeDialog(false)"></div>
    <div class="content-wrap">
      <div class="content-panel header-panel">
        <div class="img-box">
          <image :src="getImgSrc" alt="商品图片" mode="aspectFit"></image>
        </div>
        <div class="title-box">
          <i class="iconfont icon-close" @click="showTypeDialog(false)">&#xe711;</i>
          <p class="price intergral" v-if="goods.categoryName === '积分'">
            <span class="intergral-price">积分 {{getIntergralPrice}}</span>
          </p>
          <p class="price" v-else>
            <span class="original-price" :class="{'hasDiscount': checkDiscount}">
              <span class="logo">¥</span> {{getPrice}}
            </span>
            <span class="discount-price" v-if="checkDiscount">
              优惠价 <span class="logo">
                {{getDiscountPrice}}
              </span>
            </span>
          </p>
          <p class="stock">库存{{selectedProperty.stock}}件</p>
          <p class="info">已选：{{selectedProperty.propertyName}}</p>
        </div>
      </div>
      <div class="content-panel">
        <div class="header">
          <span>规格</span>
        </div>
        <div class="property-list-wrap">
          <div 
          class="property-item-box" 
          v-for="(propertyItem, propertyIndex) in propertyList" 
          :key="propertyIndex" 
          :class="{'selected': propertyItem.id === selectedProperty.id}"
          @click="selectType(propertyItem)">
            <span>{{propertyItem.propertyName}}</span>
          </div>
        </div>
      </div>
      <div class="content-panel numPicker-panel">
        <div class="header">
          <span>购买数量</span>
          <span class="right-box"><num-picker :min="1" :max="selectedProperty.stock" :num.sync="num"></num-picker></span>
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
    },
    goods: {
      type: Object,
      default () {
        return {}
      }
    },
    property: {
      type: Object,
      default () {
        return {}
      }
    },
    pNum: {
      type: Number,
      default () {
        return 1
      }
    }
  },
  data () {
    return {
      propertyList: [],
      num: 1,
      selectedProperty: {}
    }
  },
  onUnload () {
    this.init()
  },
  watch: {
    checkOpenTypeDialog (val) {
      if (val) {
        this.getPropertyByNo()
      }
    }
  },
  computed: {
    getDefaultImg () {
      return this.Utils.getSquareDefaultImg()
    },
    checkProperty () {
      if (JSON.stringify(this.selectedProperty) !== '{}' && this.selectedProperty) {
        return true
      } else {
        return false
      }
    },
    checkDiscount () {
      if (this.checkProperty) {
        if (this.selectedProperty.discountPrice) {
          console.log('检测到有优惠价')
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    getPrice () {
      if (this.checkProperty) {
        return this.selectedProperty.salePrice.toFixed(2)
      } else {
        return 0.00
      }
    },
    getIntergralPrice () {
      if (this.checkProperty) {
        return this.selectedProperty.discountPrice
      } else {
        return 0
      }
    },
    getDiscountPrice () {
      if (this.checkProperty) {
        return this.selectedProperty.discountPrice.toFixed(2)
      } else {
        return 0.00
      }
    },
    getSelectedPrice () {
      if (this.checkProperty) {
        return this.selectedProperty.discountPrice ? this.selectedProperty.discountPrice.toFixed(2) : this.selectedProperty.salePrice.toFixed(2)
      } else {
        return 0
      }
    },
    getImgSrc () {
      if (this.checkProperty) {
        console.log('规格组件图片显示', this.selectedProperty.picList)
        return this.selectedProperty.picList[0] ? this.selectedProperty.picList[0] : 'https://fs.zhenjiang365.cn/bbsimg/fcmb/image/nopic590.jpg'
      } else {
        return this.getDefaultImg
      }
    },
    checkOpenTypeDialog () {
      return this.$store.getters['Goods/isShowTypeDialog']
    }
  },
  methods: {
    init () {
      this.propertyList = []
    },
    getPropertyByNo () {
      this.propertyList = []
      this.selectedProperty = {}
      this.$http.get('/action/goods/getGoodsPropertyByGoodsNo', {
        goodsNo: this.goods.goodsNo
      }).then(res => {
        if (res.data) {
          console.log('规格数组：', res.data.propertyReList)
          this.propertyList = res.data.propertyReList
          this.num = this.pNum ? this.pNum : 1
          if (JSON.stringify(this.property) === '{}') {
            this.selectedProperty = this.propertyList[0]
          } else {
            this.selectedProperty = this.property
          }
        }
      })
    },
    showTypeDialog (flag) {
      let that = this
      this.$nextTick(function() {
        that.$store.commit('Goods/SET_SHOWTYPEDIALOG', flag)
      })
    },
    handlerSelectedType () {
      this.$emit('changeProperty', this.selectedProperty, this.num, this.property, this.pNum, this.goods)
      this.showTypeDialog(false)
    },
    selectType (property) {
      this.selectedProperty = property
    },
    toOrderConfirm () {
      let goods = JSON.parse(JSON.stringify(this.goods))
      goods.property = this.selectedProperty
      goods.num = this.num
      this.showTypeDialog(false)
      mpvue.navigateTo({ url: '/pages/orderConfirm/main' })
    }
  }
}
</script>

<style lang="less" scoped>
.property-actionSheet-wrap {
  z-index: 99999999999;
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
      .property-list-wrap {
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 20px;
        margin-bottom: 30px;
        .property-item-box {
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