<template>
  <div class="goodsInfo-wrap">
    <div class="panel-box title-box">
      <p class="price-panel"><span class="price"><span class="logo">¥</span>{{goods.price}}</span></p>
      <h2 class="goods-title">{{goods.title}}</h2>
      <p class="store"><span>商家：</span>{{goods.store.name}}</p>
    </div>
    <div class="panel-box shop-box">
      <div class="panel">
        <p><span class="panel-title">库存</span>{{goods.stock}}</p>
      </div>
      <div class="panel">
        <p><span class="panel-title">销量</span>{{goods.sales}}</p>
      </div>
      <div class="panel num-panel">
        <p>
          <span class="panel-title">数量</span>
          <num-picker :max="goods.stock" :num.sync="num"></num-picker>
          <button class="shop-btn" type="warn" size="mini">加入购物车</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
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
          price: 0,
          discountPrice: 0,
          stock: 0,
          sales: 0
        }
      }
    },
    num: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  watch: {
    num (val) {
      this.$emit('update:num', val)
    }
  },
  components: {
    numPicker
  }
}
</script>

<style lang="less" scoped>
.goodsInfo-wrap {
  background-color: #eee;
  .panel-box {
    background-color: #fff;
    padding: 10px 15px;
    margin-bottom: 10px;
  }
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
    }
    .store {
      font-size: 12px;
    }
  }
  .shop-box {
    .panel {
      padding: 4px 0;
      font-size: 12px;
      position: relative;
      .panel-title {
        color: #aaa;
        margin-right: 15px;
      }
      &.num-panel {
        padding-top: 10px;
        span {
          line-height: 30px;
          vertical-align: top;
        }
        .shop-btn {
          border-radius: 4px;
          margin-left: 10px;
          height: 30px;
          line-height: 30px;
          font-size: 12px;
          float: right;
          border: none;
          vertical-align: top;
          &::before, &::after {
            border: none;
          }
        }
      }
    }
  }
}
</style>