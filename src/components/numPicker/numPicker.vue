<template>
  <div class="num-picker">
    <div class="num-box">
      <span class="reduce" @click="reduce()" :class="{'disabled': num == 0}">-</span>
      <input type="number" v-model="num" :input="checkNum" />
      <span class="plus" @click="plus()" :class="{'disabled': num == max}">+</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    max: {
      type: Number,
      default () {
        return 1
      }
    },
    num: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  watch: {
    num (val) {
      this.$emit('update:num', val)
    }
  },
  methods: {
    checkNum (val) {
      console.log(val)
    },
    reduce () {
      if (this.num !== 0) {
        this.num--
      }
    },
    plus () {
      if (this.num !== this.max) {
        this.num++
      }
    }
  }
}
</script>

<style scoped lang="less">
.num-picker {
  display: inline-block;
  height: 100%;
  vertical-align: top;
  .num-box {
    display: flex;
    input {
      width: 80rpx;
      height: 60rpx;
      color: #777;
      flex-grow: 1;
      margin: 0 4px;
      border-radius: 4px;
      text-align: center;
    }
    span {
      box-sizing: border-box;
      color: #777;
      border: 1px solid #ddd;
      border-radius: 4px;
      flex-grow: 1;
      width: 60rpx;
      height: 60rpx;
      font-size: 36rpx;
      line-height: 50rpx;
      text-align: center;
      &.disabled {
        background-color: #eee;
        color: #aaa;
      }
    }
  }
}
</style>