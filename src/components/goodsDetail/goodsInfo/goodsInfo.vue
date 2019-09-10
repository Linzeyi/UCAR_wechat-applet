<template>
  <div class="goodsInfo-wrap">
    <div class="panel-box imgList-box">
      <com-swiper :imgList="getImgList"></com-swiper>
    </div>
    <div class="panel-box title-box">
      <p class="price-panel"><span class="price"><span class="logo">¥</span>{{getGoodsPrice}}</span></p>
      <h2 class="goods-title">{{goods.title}}<span class="score">{{goods.score}}</span></h2>
    </div>
    <div class="panel-box">
      <div class="panel">
        <p>
          <span class="panel-title">商家</span>
          <span class="store">{{goods.store.name}}</span>
        </p>
      </div>
      <div class="panel">
        <p>
          <span class="panel-title">描述</span>
          <span class="desc">{{goods.desc}}</span>
        </p>
      </div>
      <div class="panel">
        <p>
          <span class="panel-title">销量</span>已售
          <span class="sales">{{getGoodsSales}}</span>
          件
        </p>
      </div>
    </div>
    <div class="panel-box">
      <div class="panel">
        <p @click="showTypeDialog">
          <span class="panel-title">选择</span>
          <span class="select-type" v-if="checkSelectedType">已选：“{{getSelectedType.title + ':' + getSelectedType.content}};”</span>
          <span class="select-type" v-else>未选择任何规格样式...</span>
          <i class="iconfont icon-right">&#xe601;</i>
        </p>
      </div>
      <div class="panel" v-if="checkSelectedType">
        <p>
          <span class="panel-title">库存</span>尚余
          <span class="stock">{{getSelectedType.stock}}</span>
          件
        </p>
      </div>
    </div>
    <div class="panel-box shop-box">
      <div class="panel num-panel">
        <p v-if="checkSelectedType">
          <span class="panel-title">数量</span>
          <num-picker :max="getSelectedType.stock" :num.sync="goods.num"></num-picker>
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
        return {
          title: '未定义',
          store: {
            name: '无'
          },
          text: '',
          num: 0,
          type: []
        }
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    showTypeDialog () {
      this.$store.commit('Goods/SET_SHOWTYPEDIALOG', true)
    }
  },
  computed: {
    getImgList () {
      this.goods.type.map(item => {
        if (item.isSelected) {
          return item.imgList
        }
      })
      return this.goods.type[0].imgList
    },
    checkSelectedType () {
      let arr = this.goods.type
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].isSelected) {
          return true
        }
      }
      return false
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
    getGoodsSales () {
      let sales = 0
      this.goods.type.map(item => {
        sales += item.sales
      })
      return sales
    },
    getGoodsPrice () {
      let minPrice = 0
      let maxPrice = 0
      this.goods.type.map(item => {
        let price = item.discountPrice ? item.discountPrice : item.price
        if (price >= maxPrice) {
          maxPrice = price
        }
        if (price <= minPrice) {
          minPrice = price
        }
      })
      if (minPrice === maxPrice) {
        return minPrice
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
    .price-panel {
      .price {
        font-size: 22px;
        color: #ff6421;
        .logo {
          font-size: 14px;
          margin-right: 5px;
        }
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