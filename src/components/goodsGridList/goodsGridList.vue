<template>
  <div class="weui-grids goods-grids">
    <a v-for="(item, index) in goodsList" :key="index" href="javascripts:;" class="weui-grid">
      <div class="weui-grid__img">
        <img :src="item.src" :alt="item.name">
      </div>
      <p class="weui-grid__text">{{item.name}}</p>
      <p class="weui-grid__label">¥{{item.price}}</p>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    goodsList: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.goods-grids {
  border: none;
  .weui-grid {
    padding: 10px 20px;
    border: none;
    .weui-grid__img {
      height: 50px;
      width: 100%;
      box-sizing: border-box;
      border: 4px solid #ddd;
      margin: 0 auto 5px auto;
      overflow: hidden;
    }
    .weui-grid__text {
      text-align: center;
      font-size: 26rpx;
      font-weight: 600;
    }
    .weui-grid__label {
      color: #aaa;
      font-size: 22rpx;
      line-height: 20rpx;
    }
  }
}
</style>