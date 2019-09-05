<template>
  <div class="text-wrap">
    <wx-parse :content="goodsText"></wx-parse>
  </div>
</template>

<script>
import wxParse from 'mpvue-wxparse'
export default {
  props: {
    goodsText: {
      type: String,
      default () {
        return ''
      }
    }
  },
  components: {
    wxParse
  }
}
</script>

<style lang="less" scoped>
.text-wrap {
  width: 100%;
  /deep/ .wxParse {
    width: 100%;
    .h1 {
      font-size: 40rpx;
      font-weight: 600;
      margin-top: 8px;
      margin-bottom: 15px;
    }
    .h2 {
      font-size: 34rpx;
      font-weight: 600;
      margin-top: 6px;
      margin-bottom: 12px;
    }
    .h3 {
      font-size: 30rpx;
      font-weight: 600;
      margin-top: 4px;
      margin-bottom: 8px;
    }
    .p {
      font-size: 28rpx;
      margin-bottom: 4px;
      color: #555;
    }
    image {
      width: 100% !important;
    }
  } 
}
</style>