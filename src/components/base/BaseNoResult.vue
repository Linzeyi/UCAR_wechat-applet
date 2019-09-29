<template>
  <div class="no-result-wrap">
    <div v-for="(item, index) in imgSource" :key="index">
      <img :src="imgSource[index]" alt="" v-if="imgIndex === index">
    </div>
    <p>暂无结果</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgSource: [
        '../../../static/images/noResult-icon/one.png',
        '../../../static/images/noResult-icon/two.png',
        '../../../static/images/noResult-icon/three.png',
        '../../../static/images/noResult-icon/four.png',
        '../../../static/images/noResult-icon/five.png',
        '../../../static/images/noResult-icon/six.png',
        '../../../static/images/noResult-icon/seven.png'
      ],
      imgIndex: 0
    }
  },
  onShow () {
    setTimeout(() => {
      this.imgIndex++
    }, 2000)
  }
}
</script>

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