<template>
  <div class="goods-grids-wrap">
    <div class="goods-grids" v-if="goodsList.length !== 0">
      <div class="goods-col" v-for="item in col" :key="item" :style="'width: calc( 100% / ' + col + ' )' ">
        <div v-for="(goodsItem, goodsIndex) in goodsList" :key="goodsIndex" class="grid-box" :class="{'no-show' : goodsIndex % col !== item}">
          <div class="content-box" @click="toGoodsDetail(goodsItem)">
            <div class="img-box">
              <image :src="goodsItem.pic ? goodsItem.pic : 'https://fs.zhenjiang365.cn/bbsimg/fcmb/image/nopic590.jpg'" :alt="goodsItem.goodsName" mode="widthFix"></image>
            </div>
            <p class="title">
              <span>{{goodsItem.goodsName}}</span>
            </p>
            <p class="label">
              <span class="price" v-if="isIntegral">
                {{goodsItem.minPrice === goodsItem.maxPrice ? goodsItem.minPrice : goodsItem.minPrice + '-' + goodsItem.maxPrice}} 分
              </span>
              <span class="price" v-else>
                <span class="logo">¥</span>
                {{goodsItem.minPrice === goodsItem.maxPrice ? goodsItem.minPrice : goodsItem.minPrice + '-' + goodsItem.maxPrice}}
              </span>
              <span class="right">
                ...
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="no-goods-panel" v-else>
      <p><i class="iconfont icon-no-goods">&#xe65d;</i>暂无商品...</p>
    </div>
    <div class="loading-footer" v-if="isScroll">
      <p v-if="checkMoreShow">
        下拉显示更多
      </p>
      <p v-if="isLoading && goodsList.length !== 0">
        加载中...
      </p>
      <p v-if="checkNoMoreShow">
        没有更多啦
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isIntegral: {
      type: Boolean,
      default () {
        return false
      }
    },
    isScroll: {
      type: Boolean,
      default () {
        return true
      }
    },
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
    },
    start: {
      type: Number,
      default () {
        return 0
      }
    },
    size: {
      type: Number,
      default () {
        return 10
      }
    },
    pageSize: {
      type: Number,
      default () {
        return 10
      }
    }
  },
  data () {
    return {
      isLoading: false
    }
  },
  watch: {
    goodsList: {
      handler () {
        console.log('检测到数组变化')
        this.setLoading(false)
      },
      deep: true
    }
  },
  computed: {
    checkNoMoreShow () {
      return !this.isLoading && (this.goodsList.length < this.size) && this.goodsList.length !== 0
    },
    checkMoreShow () {
      return this.goodsList.length === this.size && this.goodsList.length !== 0
    }
  },
  async onReachBottom () {
    if (this.checkMoreShow && !this.isLoading && this.isScroll) {
      console.log('触底')
      this.setLoading(true)
      let that = this
      this.$emit('update:size', this.size + this.pageSize)
      setTimeout(function() {
        if (that.isLoading) {
          that.setLoading(false)
          if (that.size - that.pageSize !== 0) {
            that.$emit('update:size', that.size - that.pageSize)
          }
        }
      }, 20000)
    }
  },
  methods: {
    loadErr () {
      if (this.size - this.pageSize !== 0) {
        this.$emit('update:size', this.size - this.pageSize)
      }
      this.setLoading(false)
    },
    setLoading (flag) {
      this.isLoading = flag
    },
    toGoodsDetail (goods) {
      mpvue.navigateTo({ url: '/pages/goodsDetail/main?goodsNo=' + goods.goodsNo })
    }
  }
}
</script>

<style lang="less" scoped>
.goods-grids-wrap {
  height: 100%;
  padding: 5px;
  background-color: #f1f1f1;
  .no-goods-panel {
    padding: 30px 0;
    p {
      font-size: 16px;
      color: #bbb;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      .iconfont {
        font-size: 21px;
        margin-right: 7px;
      }
    }
  }
  .goods-grids {
    border: none;
    column-gap: 0;
    height: calc(100% - 75px);
    display: flex;
    .grid-box {
      padding: 5px;
      break-inside: avoid;
      border: none;
      box-sizing: border-box;
      &.no-show {
        display: none;
      }
      .content-box {
        overflow: hidden;
        border-radius: 6px;
        padding-bottom: 10px;
        background-color: #fff;
        box-shadow: 0 3px 3px 0 #eee;
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
          margin-top: 3px;
          font-size: 12px;
          padding: 0 10px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          .hot-tips {
            font-size: 10px;
            font-weight: 300;
            color: #fff;
            margin-right: 4px;
            padding: 1px 2px;
            background-color: #ff6421;
            border-radius: 2px;
            vertical-align: top;
          }
        }
        .label {
          padding: 0 10px;
          margin-top: 12px;
          font-size: 16px;
          position: relative;
          display: flex;
          align-items: center;
          .price {
            flex: 1;
            color: #ff6421;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            .logo {
              font-size: 11px;
            }
          }
          .right {
            color: #aaa;
          }
        }
      }
    }
  }
  .loading-footer {
    width: 100%;
    p {
      text-align: center;
      padding: 20px 0 30px;
      font-size: 12px;
      color: #888;
    }
  }
}
</style>