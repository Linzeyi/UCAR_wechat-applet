<template>
  <div class="goodsInfo-wrap">
    <div class="panel-box imgList-box">
      <com-swiper :imgList="getImgList"></com-swiper>
    </div>
    <div class="panel-box title-box integral-panel" v-if="goods.categoryName === '积分'">
      <h2 class="goods-title"><span class="integral-tips">积分商品</span> {{goods.goodsName}}<span class="score">{{getGoodsScore}}</span></h2>
    </div>
    <div class="panel-box title-box" v-else>
      <p class="price-panel section-price" v-if="!checkProperty">
        <span class="price">
          <span class="logo">¥</span>{{getGoodsPriceSection}}
        </span>
      </p>
      <p class="price-panel" v-else>
        <span class="price">
          <span class="logo">¥</span>{{getCurrentPrice}}
        </span>
      </p>
      <p class="price-panel original-price" v-if="checkDiscount">
        原价 ¥ {{getOriginalPrice}}
      </p>
      <h2 class="goods-title">{{goods.goodsName}}<span class="score">{{getGoodsScore}}</span></h2>
    </div>
    <div class="panel-box">
      <div class="panel">
        <p>
          <span class="panel-title">商家</span>
          <span class="store">自营店</span>
        </p>
      </div>
      <div class="panel">
        <p>
          <span class="panel-title">描述</span>
          <span class="desc">{{goods.goodsDetail}}</span>
        </p>
      </div>
      <div class="panel">
        <p>
          <span class="panel-title">销量</span>已售
          <span class="sales">{{goods.sales}}</span>
          件
        </p>
      </div>
    </div>
    <div class="panel-box property-box">
      <div class="panel">
        <p @click="showTypeDialog">
          <span class="panel-title">选择</span>
          <span class="select-property" v-if="checkProperty">已选：“{{'规格:' + property.propertyName}};”</span>
          <span class="select-property" v-else>未选择任何规格样式...</span>
          <i class="iconfont icon-right">&#xe601;</i>
        </p>
      </div>
      <div class="panel" v-if="checkProperty">
        <p>
          <span class="panel-title">库存</span>尚余
          <span class="stock">{{property.stock}}</span>
          件
        </p>
      </div>
    </div>
    <div class="panel-box shop-box">
      <div class="panel num-panel">
        <p v-if="checkProperty">
          <span class="panel-title">数量</span>
          <num-picker :min="1" :max="goods.categoryName === '积分' ? 1 : property.stock" :num.sync="num"></num-picker>
        </p>
        <p v-else>
          <span class="panel-title">数量</span>
          <span class="default-num-font">0<span class="tips">（请选择一个规格样式）</span></span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import comSwiper from '../../comSwiper/comSwiper'
import numPicker from '../../numPicker/numPicker'

export default {
  props: {
    goods: {
      type: Object,
      default () {
        return {}
      }
    },
    num: {
      type: Number,
      default () {
        return 0
      }
    },
    property: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
    }
  },
  watch: {
    num () {
      console.log('num change')
      this.$emit('update:num', this.num)
    }
  },
  methods: {
    showTypeDialog () {
      let that = this
      this.$nextTick(function () {
        that.$store.commit('Goods/SET_SHOWTYPEDIALOG', true)
      })
    }
  },
  computed: {
    getGoodsScore () {
      return this.goods.goodsScore.toFixed(1)
    },
    getImgList () {
      if (this.checkProperty) {
        return this.property.picList
      } else {
        return this.goods.propertyList[0].picList
      }
    },
    checkProperty () {
      if (JSON.stringify(this.property) !== '{}' && JSON.stringify(this.property) !== 'undefined') {
        return true
      } else {
        return false
      }
    },
    checkDiscount () {
      if (this.checkProperty) {
        if (this.property.discountPrice) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    getCurrentIntegral () {
      if (this.checkProperty) {
        return this.property.discountPrice
      } else {
        return 0
      }
    },
    getCurrentPrice () {
      if (this.checkProperty) {
        return this.property.discountPrice ? this.property.discountPrice.toFixed(2) : this.property.salePrice.toFixed(2)
      } else {
        return 0.00
      }
    },
    getOriginalPrice () {
      if (this.checkProperty) {
        return this.property.salePrice.toFixed(2)
      } else {
        return 0.00
      }
    },
    getGoodsPriceSection() {
      let minPrice = 0
      let maxPrice = 0
      if (this.goods.hasOwnProperty('propertyList')) {
        this.goods.propertyList.map(item => {
          let price = item.discountPrice ? item.discountPrice : item.salePrice
          if (price >= maxPrice) {
            maxPrice = price
          }
          if (price <= minPrice) {
            minPrice = price
          }
        })
      }
      if (minPrice === maxPrice) {
        return minPrice.toFixed(2)
      } else {
        return minPrice + '-' + maxPrice
      }
    }
  },
  components: {
    numPicker,
    comSwiper
  }
}
</script>

<style lang="less" scoped>
.goodsInfo-wrap {
  background-color: #f8f8f8;
  .title-box {
    // border-bottom: 1px solid #ddd;
    &.integral-panel {
      .goods-title {
        padding-top: 8px;
      }
    }
    .integral-tips {
      display: inline-block;
      padding: 2px 4px;
      font-size: 13px;
      border-radius: 4px;
      background-color: rgb(253, 107, 22);
      color: #fff;
      margin-right: 5px;
    }
    .price-panel {
      &:last-child {
        margin-bottom: 10px;
      }
      .price {
        font-size: 22px;
        color: #ff6421;
        .logo {
          font-size: 14px;
          margin-right: 5px;
        }
      }
      &.original-price {
        font-size: 12px;
        font-weight: 400;
        color: #888;
        text-decoration: line-through;
      }
    }
    .goods-title {
      font-size: 14px;
      padding: 0 0 8px 0;
      .score {
        color: #ff6421;
        font-size: 11px;
        padding: 4px;
        background-color: #fff5f2;
        border-radius: 5px;
        margin-left: 6px;
      }
    }
  }
  .panel-box {
    background-color: #fff;
    padding: 5px 15px;
    margin-bottom: 10px;
    .panel {
      padding: 4px 0;
      font-size: 12px;
      position: relative;
      color: #666;
      margin-bottom: 5px;
      &:last-child {
        margin: 0;
      }
      .iconfont {
        font-size: 12px;
      }
      .icon-right {
        float: right;
        color: #ddd;
      }
      .panel-title {
        color: #a8a8a8;
        margin-right: 15px;
      }
      .sales {
        color: #ff6421;
      }
      .desc {
        display: inline-block;
        width: calc(100% - 56px);
        vertical-align: top;
        padding-bottom: 10px;
      }
      &.num-panel {
        color: #444;
        span {
          line-height: 30px;
          vertical-align: top;
        }
        .default-num-font {
          .tips {
            font-size: 10px;
            color: #ff6421;
          }
        }
        .shop-btn {
          border-radius: 10px;
          margin-left: 10px;
          height: 30px;
          line-height: 30px;
          font-size: 12px;
          float: right;
          color: #fff;
          vertical-align: top;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: orange;
          &:active {
            background-color: #ff9a00;
          }
          .iconfont {
            margin-right: 5px;
            font-size: 18px;
          }
        }
      }
    }
  }
}
</style>