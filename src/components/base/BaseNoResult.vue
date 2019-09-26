<template>
  <div class="no-result-wrap">
    <img src="../../../static/images/no_result_rocket.svg" alt="">
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
@baoWoBlack: #515151;
@orange: #ff6421;
.no-result-wrap {
  display: flex;
  height: 50%;
  width: 100%;
  justify-content: center;
  align-items: center;
  img {
    width: 80%;
  }
  slot {
    display: block;
    margin-top: 10px;
    font-size: 30px;
  }
}
</style>