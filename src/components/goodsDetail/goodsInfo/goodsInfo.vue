<template>
  <div>
    <div class="title-box">
      <h2 class="goods-title">{{goods.title}}</h2>
      <p class="store"><span>商家：</span>{{goods.store.name}}</p>
    </div>
    <div class="shop-box">
      <div class="panel price-panel">
        <p v-if="goods.discountPrice > 0"><span>优惠价：</span>¥{{goods.discountPrice}}</p>
        <p v-else><span>价格：</span>¥{{goods.price}}</p>
      </div>
      <div class="panel">
        <p><span>库存：</span>{{goods.stock}}</p>
      </div>
      <div class="panel">
        <p><span>销量：</span>{{goods.sales}}</p>
      </div>
      <div class="panel num-panel">
        <num-picker :max="goods.stock" :num.sync="num"></num-picker>
        <button class="shop-btn" type="warn" size="mini">加入购物车</button>
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
          title: '车载打火器，X3汽车应急启动电源12v移动搭电宝车载备用电瓶充电打火器',
          store: {
            name: '米其林4S店'
          },
          price: 80,
          discountPrice: 64,
          stock: 199,
          sales: 2422
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
      color: red;
      span {
        color: #000;
      }
    }
    &.num-panel {
      padding-top: 10px;
      .shop-btn {
        border-radius: 4px;
        margin-left: 10px;
        height: 30px;
        line-height: 30px;
        float: right;
        vertical-align: top;
      }
    }
  }
}
</style>