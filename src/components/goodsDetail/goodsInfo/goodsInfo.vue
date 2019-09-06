<template>
  <div>
    <div class="title-box">
      <h2 class="goods-title">{{goods.title}}</h2>
      <p class="store"><span>商家：</span>{{goods.store.name}}</p>
    </div>
    <div class="shop-box">
      <div class="panel price-panel">
        <p v-if="goods.discountPrice > 0">优惠价：<span class="price"><span class="logo">¥</span>{{goods.discountPrice}}</span></p>
        <p v-else>价格：<span class="price"><span class="logo">¥</span>{{goods.price}}</span></p>
      </div>
      <div class="panel">
        <p><span>库存：</span>{{goods.stock}}</p>
      </div>
      <div class="panel">
        <p><span>销量：</span>{{goods.sales}}</p>
      </div>
      <div class="panel num-panel">
        <p>
          <span>数量：</span>
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
.title-box {
  border-bottom: 1px solid #ddd;
  .goods-title {
    padding: 6px 0 8px 0;
  }
  .store {
    font-size: 24rpx;
    margin-bottom: 14px;
  }
}
.shop-box {
  .panel {
    padding: 4px 0;
    font-size: 28rpx;
    position: relative;
    &:first-child {
      padding-top: 28rpx;
    }
    &.price-panel {
      .price {
        color: orangered;
        font-size: 16px;
        .logo {
          font-size: 12px;
          margin-right: 5px;
        }
      }
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
</style>