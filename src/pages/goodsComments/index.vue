<template>
  <div class="goodsComments-wrap">
    <div class="comment-panel" v-for="(goodsItem, goodsIndex) in order.shopGoodsList" :key="goodsIndex">
      <div class="goods-box">
        <div class="left-box">
          <div class="img-box">
            <image :src="goodsItem.property.picList[0]" alt="商品图片" mode="aspectFit"></image>
          </div>
        </div>
        <div class="right-box">
          <p class="title">{{goodsItem.goodsName}}</p>
        </div>
      </div>
      <div class="comment-box">
        <comment-editor :goods.sync="goodsItem" :orderNo="order.orderNo" @commentSucceed="commentSucceed"></comment-editor>
      </div>
    </div>
  </div>
</template>

<script>
import commentEditor from '../../components/commentEditor/commentEditor'
export default {
  components: {
    commentEditor
  },
  data () {
    return {
      order: {}
    }
  },
  watch: {
  },
  onLoad () {
    this.init()
  },
  computed: {
  },
  methods: {
    init () {
      this.order = this.$store.getters['Comment/order']
    },
    commentSucceed () {
      console.log('评论成功')
    }
  }
}
</script>

<style lang="less" scoped>
.goodsComments-wrap {
  height: 100%;
  background-color: #f3f3f3;
  .comment-panel {
    padding: 0 10px;
    margin-bottom: 10px;
    background-color: #fff;
    .goods-box {
      display: flex;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #ddd;
      .left-box {
        .img-box {
          width: 80px;
          height: 80px;
          border-radius: 4px;
          overflow: hidden;
          text-align: center;
          image {
            margin: 0 auto;
            width: 100%;
            height: 100%;
          }
        }
      }
      .right-box {
        padding: 2px 10px;
        flex-grow: 1;
        box-sizing: border-box;
        .title {
          font-size: 14px;
          color: #333;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
