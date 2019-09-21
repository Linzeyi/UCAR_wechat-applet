<template>
  <div class="num-picker" :class="{'small': isSmall}">
    <div class="num-box">
      <span class="reduce" @click="reduce()" :class="{'disabled': num == min}">-</span>
      <input type="number" v-model="value" @input="checkNum" @blur="blurEvent" />
      <span class="plus" @click="plus()" :class="{'disabled': num == max}">+</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    objItem: {
      type: Object,
      default () {
        return {}
      }
    },
    isSmall: {
      type: Boolean,
      default () {
        return false
      }
    },
    min: {
      type: Number,
      default () {
        return 0
      }
    },
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
  onLoad () {
    this.value = this.num
  },
  watch: {
    num () {
      this.value = this.num
      this.$emit('changeObjectNum', this.objItem)
    }
  },
  methods: {
    blurEvent () {
      if (isNaN(this.value) && this.value !== 0) {
        wx.showToast({
          title: '非法字符',
          icon: 'none',
          duration: 2000
        })
        this.value = this.min
        this.$emit('update:num', this.min)
      }
      this.$emit('changeType')
    },
    checkNum (e) {
      let val = e.target.value
      let reg = new RegExp(/^[1-9]\d*$/)
      if (val === '' || Number(val) === this.min || reg.test(val)) {
        if (Number(val) > this.max) {
          this.value = this.min
          this.$emit('update:num', this.min)
          wx.showToast({
            title: '数值不能超过' + this.max,
            icon: 'none',
            duration: 2000
          })
        } else if (Number(val) < this.min) {
          this.value = this.min
          this.$emit('update:num', this.min)
          wx.showToast({
            title: '数值不能低于' + this.min,
            icon: 'none',
            duration: 2000
          })
        } else {
          this.$emit('update:num', parseInt(val))
        }
      } else {
        this.value = this.min
        this.$emit('update:num', this.min)
        wx.showToast({
          title: '非法字符',
          icon: 'none',
          duration: 2000
        })
      }
    },
    reduce () {
      if (this.num > this.min) {
        this.$emit('update:num', this.num - 1)
        this.$emit('changeType')
      } else {
        wx.showToast({
          title: '数值不能低于' + this.min,
          icon: 'none',
          duration: 2000
        })
      }
    },
    plus () {
      if (this.num !== this.max) {
        this.$emit('update:num', this.num + 1)
        this.$emit('changeType')
      } else {
        wx.showToast({
          title: '数值不能超过' + this.max,
          icon: 'none',
          duration: 2000
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
@wh: 30px;
@swh: 24px;
.num-picker {
  display: inline-block;
  height: 100%;
  vertical-align: top;
  .num-box {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    input {
      width: @wh;
      height: @wh;
      color: #777;
      flex-grow: 1;
      text-align: center;
      box-sizing: border-box;
    }
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-grow: 1;
      box-sizing: border-box;
      color: #777;
      border: 1px solid #ddd;
      border-radius: 4px;
      width: @wh;
      height: @wh;
      line-height: 50rpx;
      font-size: 16px;
      text-align: center;
      &.disabled {
        background-color: #eee;
        color: #aaa;
      }
    }
  }
  &.small {
    .num-box {
      box-sizing: border-box;
      border-radius: 2px;
      height: @swh;
      border: 1px solid #ddd;
      input {
        font-size: 12px;
        width: 25px;
        margin: 0 5px;
        display: inline-block;
        line-height: @swh;
        height: @swh;
        border: none;
        outline: none;
        color: #777;
        flex-grow: 1;
        text-align: center;
      }
      span {
        display: inline-block;
        border-radius: 0;
        border: none;
        outline: none;
        font-size: 16px;
        color: #888;
        height: @swh;
        width: @swh;
        line-height: 47rpx;
        &.reduce {
          border-right: 1px solid #ddd;
        }
        &.plus {
          border-left: 1px solid #ddd;
        }
      }
    }
  }
}
</style>