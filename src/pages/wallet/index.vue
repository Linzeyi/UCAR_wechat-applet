<template>
  <div class="wallet-wrap" v-if="true">
    <BaseNavigationBar name="充值">
      <i class="iconfont" @click="back">&#xe625;</i>
    </BaseNavigationBar>
    <BaseCustomBox>
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
    </BaseCustomBox>
    <message-toast v-if="hidden"></message-toast>
  </div>
  <base-no-result v-else></base-no-result>
</template>

<script>
import baseNoResult from '@/components/base/BaseNoResult'
import messageToast from '@/components/message/messageToast'
import BaseNavigationBar from "@/components/base/BaseNavigationBar"
import BaseCustomBox from "@/components/base/BaseCustomBox"

export default {
  components: {
    baseNoResult,
    messageToast,
    BaseNavigationBar,
    BaseCustomBox
  },
  data () {
    return {
      amount: null
    }
  },
  onUnload () {
    this.amount = null
  },
  computed: {
    canConfirm () {
      if (this.amount) {
        return true
      } else {
        return false
      }
    },
    hidden () {
      return this.$store.getters['Message/showMessageToast']
    }
  },
  methods: {
    confirm () {
      if (this.Utils.regularRule.money.test(this.amount) && this.amount <= 9999999) {
        if (Number(this.amount) === 0) {
          this.showToast('充值金额不能为0', 'none', 2000)
        } else {
          wx.showModal({
            title: '提示',
            content: '请再次确认充值金额',
            confirmText: '确认充值',
            success: res => {
              if (res.confirm) {
                this.$http.post('/action/wallet/recharge', {balance: Number(this.amount)}).then(res => {
                  if (res !== '' && res.status === 20000) {
                    mpvue.navigateBack()
                    this.showToast('充值成功', 'success', 2000)
                  } else {
                    this.showToast('充值失败')
                  }
                })
              }
            }
          })
        }
      } else {
        this.showToast('请输入正确的金额，至多输入7位数字和两位小数', 'none', 2000)
      }
    },

    // 提示
    showToast (content, i, dur) {
      wx.showToast({
        title: content,
        icon: i || 'none',
        duration: dur || 1500
      })
    },

    // 页面返回
    back () {
      mpvue.navigateBack()
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