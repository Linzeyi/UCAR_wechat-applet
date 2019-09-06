<template>
  <div class="num-picker">
    <div class="num-box">
      <span class="reduce" @click="reduce()" :class="{'disabled': num == 0}">-</span>
      <input type="number" v-model="value" @input="checkNum" @blur="blurEvent" />
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
  data () {
    return {
      value: 0
    }
  },
  watch: {
    num () {
      this.value = this.num
    }
  },
  methods: {
    blurEvent () {
      if (isNaN(this.value)) {
        wx.showToast({
          title: '非法字符',
          icon: 'none',
          duration: 2000
        })
        this.value = 0
        this.$emit('update:num', 0)
      }
    },
    checkNum (e) {
      let val = e.target.value
      let reg = new RegExp(/^[1-9]\d*$/)
      if ((val === '' || val === 0 || reg.test(val)) && val <= this.max) {
        this.$emit('update:num', parseInt(val))
      } else {
        this.value = 0
        this.$emit('update:num', 0)
        if (val > this.max) {
          wx.showToast({
            title: '数值不能超过上限' + this.max,
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '非法字符',
            icon: 'none',
            duration: 2000
          })
        }
      }
    },
    reduce () {
      if (this.num !== 0) {
        this.$emit('update:num', this.num - 1)
      } else {
        wx.showToast({
          title: '数值不能小于0',
          icon: 'none',
          duration: 2000
        })
      }
    },
    plus () {
      if (this.num !== this.max) {
        this.$emit('update:num', this.num + 1)
      } else {
        wx.showToast({
          title: '数值不能超过上限' + this.max,
          icon: 'none',
          duration: 2000
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
@wh: 60rpx;
.num-picker {
  display: inline-block;
  height: 100%;
  vertical-align: top;
  .num-box {
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      width: 60rpx;
      height: @wh;
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
      width: @wh;
      height: @wh;
      font-size: 15px;
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