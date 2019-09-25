<template>
  <div class="wrap-mask" v-if="showAgreement" @click="$emit('click')">
    <div class="mask"></div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showAgreement: false
  },
  methods: {
    touchmoveHandler() {}
  }
};
</script>
<style lang="less" scoped>
.wrap-mask {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 30px;
  background-color: rgba(0, 0, 0, 0.7);
  .content {
    background-color: white;
    border-radius: 20rpx;
    height: 90%;
    width: 90%;
    overflow: auto;
    padding: 30rpx;
    word-break: break-all;
    text-align: justify;
  }
}
</style>