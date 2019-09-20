<template>
  <div class="goods-grids-wrap">
    <div class="goods-grids" :style="'column-count: ' + col">
      <div v-for="(goodsItem, goodsIndex) in computedGoodsList" :key="goodsIndex" class="grid-box">
        <div class="content-box" @click="toGoodsDetail(goodsItem)">
          <div class="img-box">
            <image :src="goodsItem.pic ? goodsItem.pic : 'https://fs.zhenjiang365.cn/bbsimg/fcmb/image/nopic590.jpg'" :alt="goodsItem.goodsName" mode="widthFix"></image>
          </div>
          <p class="title">{{goodsItem.goodsName}}</p>
          <p class="label">
            <span class="price">
              <span class="logo">¥</span>
              {{goodsItem.minPrice === goodsItem.maxPrice ? goodsItem.minPrice : goodsItem.minPrice + '-' + goodsItem.maxPrice}}
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="loading-footer">
      <p v-if="checkMoreShow">
        下拉显示更多
      </p>
      <p v-if="isLoading">
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
        return 2
      }
    }
  },
  data () {
    return {
      isLoading: false,
      size: 4
    }
  },
  computed: {
    computedGoodsList () {
      return this.goodsList.slice(0, this.size)
    },
    checkMoreShow () {
      return (this.goodsList.length > this.size) && !this.isLoading
    }
  },
  onLoad () {
  },
  async onReachBottom () {
    if (this.checkMoreShow && !this.isLoading) {
      console.log('触底')
      this.isLoading = true
      let that = this
      setTimeout(function() {
        that.size += 4
        that.isLoading = false
      }, 1500)
    }
  },
  methods: {
    toGoodsDetail (goods) {
      mpvue.navigateTo({ url: '/pages/goodsDetail/main?goodsNo=' + goods.goodsNo })
    }
  }
}
</script>

<style lang="less" scoped>
.goods-grids-wrap {
  padding: 5px;
  background-color: #f3f3f3;
  .goods-grids {
    border: none;
    column-gap: 0;
    .grid-box {
      padding: 5px;
      break-inside: avoid;
      // width: calc(100% / 3);
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
  }
  .loading-footer {
    width: 100%;
    p {
      text-align: center;
      padding: 15px 0 40px;
      font-size: 14px;
      color: #888;
    }
  }
}
</style>