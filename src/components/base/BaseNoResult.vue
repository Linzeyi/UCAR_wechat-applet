<template>
  <div class="no-result-wrap">
    <img :src="imgSource[imgIndex]" alt="">
    <img src="../../../static/images/noResult-icon/no-result.png" alt="" class="text">
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgSource: [
        '/static/images/noResult-icon/one.svg',
        '/static/images/noResult-icon/two.svg',
        '/static/images/noResult-icon/three.svg',
        '/static/images/noResult-icon/four.svg',
        '/static/images/noResult-icon/five.svg',
        '/static/images/noResult-icon/six.svg',
        '/static/images/noResult-icon/seven.svg',
        '/static/images/noResult-icon/eight.svg'
      ],
      imgIndex: this.randomNum(0, 7)
    }
  },
  methods: {
    randomNum (minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10)
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
        default:
          return 0
      }
    }
  }
}
</script>

<style lang="less" scoped>
@baoWoBlack: #515151;
@orange: #ff6421;
.no-result-wrap {
  display: flex;
  height: 70%;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f3f3f3;
  font-family: 'Umbrella Man DEMO';
  img {
    height: 200px;
    width: 200px;
  }
  .text {
    margin-top: 7px;
    height: 40px;
    width: 218px;
  }
}
</style>