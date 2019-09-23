<template>
  <div style="height: 100%">
    <div class="loading-box" v-if="loadStatus === 'loading'">
      <img src="/static/images/loading.gif" alt="加载中..." />
    </div>
    <div class="offline-box" v-if="loadStatus === 'offline'">
      <img src="/static/images/offline.svg" alt="您的信号飞到外星球了哦~" />
      <p>您的信号飞到外星球了哦~</p>
      <div class="reload" @click="$emit('reLoad')">
        <span>重新加载</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loadStatus: String
  }
};
</script>

<style lang="less" scoped>
.loading-box {
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
}
.offline-box {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    width: 500rpx;
  }
  p {
    color: #a8a6a5;
  }
  .reload {
    margin-top: 40rpx;
    border-radius: 4rpx;
    height: 70rpx;
    line-height: 70rpx;
    text-align: center;
    width: 200rpx;
    background-color: #ffd161;
  }
}
</style>