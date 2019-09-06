<template>
  <div class="search-wrap">
    <div class="weui-cell search-bar">
      <i class="iconfont weui-cell__hd search-icon">&#xe60b;</i>
      <input type="text" class="weui-cell__bd" placeholder="汽车用品">
    </div>
    <b class="popular-title">热门搜索</b>
    <div class="popular-list" v-for="(item, index) in popularSearch" :key="index">
      <p>{{ item }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      popularSearch: ['车贴', '车窗窗帘', '香水', '坐垫', '抱枕']
    }
  }
}
</script>

<style lang="less" scoped>
@baoWoBlack: rgb(51, 51, 51);
@baoWoFont: 'PingFangSC-Light';
.search-wrap {
  font-family: @baoWoFont;
  color: @baoWoBlack;
  padding: 0 13px;
  .search-bar {
    border: 0.1px solid @baoWoBlack;
    border-radius: 10px;
    background: rgb(243, 243, 243);
    .search-icon {
      margin-right: 18px;
      align-self: center;
    }
  }
  .popular-title {
    margin: 16px 0 12px 0;
    font-family: 'PingFangSC';
  }
  .popular-list {
    margin: 5px 0;
    box-shadow: 0 0.08px rgb(179, 179, 179);
    padding: 10px 0;
    font-size: 16px;
  }
}
</style>