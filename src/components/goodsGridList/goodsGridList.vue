<template>
  <div class="goods-grids">
    <div v-for="(goodsItem, goodsIndex) in goodsList" :key="goodsIndex" class="grid-box" :style="'width: calc(100% / ' + col + ')'">
      <div class="content-box" @click="toGoodsDetail(goodsItem)">
        <div class="img-box">
          <image :src="goodsItem.type[0].imgList[0]" :alt="goodsItem.title" mode="widthFix"></image>
        </div>
        <p class="title">{{goodsItem.title}}</p>
        <p class="label">
          <span class="price">
            <span class="logo">¥</span>
            {{goodsItem.type[0].discountPrice ? goodsItem.type[0].discountPrice : goodsItem.type[0].price}}
          </span>
        </p>
      </div>
    </div>
    <div class="loading-footer">
      <p v-if="!isLoading">
        下拉显示更多
      </p>
      <p v-else>
        加载中...
      </p>
    </div>
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
    },
    col: {
      type: Number,
      default () {
        return 3
      }
    }
  },
  data () {
    return {
      isLoading: false
    }
  },
  onLoad () {

  },
  async onReachBottom () {
    let that = this
    console.log('触底')
    if (!this.isLoading) {
      this.isLoading = true
      setTimeout(function () {
        console.log('结束')
        that.isLoading = false
      }, 1500)
    }
  },
  methods: {
    toGoodsDetail (goods) {
      this.$store.commit('Goods/SET_GOODS', goods)
      mpvue.navigateTo({ url: '/pages/goodsDetail/main' })
    }
  }
}
</script>

<style lang="less" scoped>
.goods-grids {
  border: none;
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  .grid-box {
    padding: 5px;
    width: calc(100% / 3);
    border: none;
    box-sizing: border-box;
    .content-box {
      overflow: hidden;
      border-radius: 10px;
      padding-bottom: 10px;
      background-color: #fff;
      .img-box {
        width: 100%;
        margin: 0 auto 5px auto;
        overflow: hidden;
        text-align: center;
        image {
          width: 100%;
          height: 100%;
          margin: 0 auto;
        }
      }
      .title {
        margin-top: 10px;
        font-size: 12px;
        font-weight: 600;
        padding: 0 10px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .label {
        padding: 0 10px;
        margin-top: 4px;
        font-size: 14px;
        .price {
          color: #ff6421;
          .logo {
            font-size: 10px;
            margin-right: 3px;
          }
        }
      }
    }
  }
  .loading-footer {
    width: 100%;
    p {
      text-align: center;
      padding: 15px 0 20px;
      font-size: 14px;
      color: #888;
    }
  }
}
</style>