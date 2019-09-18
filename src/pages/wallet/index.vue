<template>
  <div class="wallet-wrap">
    <div class="recharge-content">
      <p>充值金额</p>
      <div class="amount">
        <i class="iconfont">&#xe808;</i>
        <input type="number" pattern="[0-9]*" class="weui-input" placeholder="输入金额" v-model="amount">
      </div>
    </div>
    <button 
      class="weui-btn confirm" 
      :disabled="!amount" 
      @click="confirm"
      :style="canConfirm ? 'opacity: 1' : 'opacity: 0.5'">确定</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      amount: null
    }
  },
  computed: {
    canConfirm () {
      if (this.amount) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    confirm () {
      if (this.Utils.regularRule.money.test(this.amount)) {
        console.log('充值！')
      } else {
        wx.showToast({
          title: '请输入正确的金额，至多输入7位数字和两位小数',
          icon: 'none',
          duration: 2000
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@baoWoBlack: #515151;
@baoWoRed: #771212;
@baoWoFont: 'PingFangSC-Light';
@orange: #ff6421;
.wallet-wrap {
  font-family: @baoWoFont;
  .recharge-content {
    box-shadow: 0 0.08px rgb(194, 194, 194);
    padding: 0 20px;
    p {
      font-size: 0.5rem;
    }
    .amount {
      display: flex;
      align-items: center;
      i {
        margin-right: 5px;
        font-size: 0.7rem;
        line-height: inherit;
        color: @baoWoBlack;
      }
      input {
        font-size: 0.5rem;
        color: @orange;
      }
    }
  }
  .confirm {
    position: absolute;
    bottom: 40px;
    color: white;
    background: @orange;
    font-family: @baoWoFont;
    width: 94%;
    left: 50%;
    transform: translate(-50%, 0);
  }
}
</style>