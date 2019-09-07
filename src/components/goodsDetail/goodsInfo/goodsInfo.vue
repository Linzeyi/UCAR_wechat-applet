<template>
  <div class="goodsInfo-wrap">
    <div class="panel-box title-box">
      <p class="price-panel"><span class="price"><span class="logo">¥</span>{{goods.price}}</span></p>
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
          <span class="panel-title">销量</span>已售
          <span class="sales">{{goods.sales}}</span>
          件
        </p>
      </div>
    </div>
    <div class="panel-box">
      <div class="panel">
        <p>
          <span class="panel-title">选择</span>
          <span class="select-type">已选：“iphone6p/6sp一拳超人ok”</span>
          <i class="iconfont icon-right">&#xe601;</i>
        </p>
      </div>
      <div class="panel">
        <p>
          <span class="panel-title">库存</span>尚余
          <span class="stock">{{goods.stock}}</span>
          件
        </p>
      </div>
      <div class="panel">
        <p>
          <span class="panel-title">参数</span>
          <span class="stock">品牌 型号...</span>
          <i class="iconfont icon-right">&#xe601;</i>
        </p>
      </div>
    </div>
    <div class="panel-box shop-box">
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
      .stock {
      }
      .sales {
        color: #ff6421;
      }
      &.num-panel {
        color: #444;
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