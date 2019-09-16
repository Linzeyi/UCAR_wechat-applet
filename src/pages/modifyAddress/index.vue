<template>
  <div class="modifyAddress-wrap" v-if="formData" style="height: 100%">
    <base-navigation-bar name="分类">
      <i class="iconfont" style="font-size: medium" @click="Utils.navigateTo('/pages/search/main')">&#xe60b;</i>
    </base-navigation-bar>
    <base-custom-box>
      <div class="weui-cells weui-cells_form" @submit="submitForm('submit')">
        <div class="weui-cell">
          <div class="weui-cell__hd">姓名</div>
          <input 
            type="text" 
            class="weui-input" 
            :class="{'clear': formData.receiverName.length > 0 && focus === 'name'}" 
            placeholder="请输入姓名" 
            v-model="formData.receiverName"
            @focus="focus = 'name'"
            @blur="focus = undefined">
          <i class="iconfont clear-icon" @click="clearInput(1)">&#xe600;</i>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">手机号码</div>
          <input 
            type="number" 
            class="weui-input"
            :class="{'clear': formData.receiverPhone.length > 0 && focus === 'phone'}"
            placeholder="请输入手机号码" 
            v-model="formData.receiverPhone"
            @focus="focus = 'phone'"
            @blur="focus = undefined">
          <i class="iconfont clear-icon" @click="clearInput(2)">&#xe600;</i>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">邮政编码</div>
          <input 
            type="number" 
            class="weui-input" 
            :class="{'clear': formData.postCode.length > 0 && focus === 'postCode'}"
            placeholder="自动根据区域生成" 
            disabled="true"
            pattern="[0-9]{6}" 
            v-model="formData.postCode"
            @focus="focus = 'postCode'"
            @blur="focus = undefined">
          <i class="iconfont clear-icon" @click="clearInput(3)">&#xe600;</i>
        </div>
        <div class="weui-cell region" @click="chooseRegion">
          <div class="weui-cell__hd">所在区域</div>
          <picker 
            class="auth-pick-tip region-picker" 
            mode="region" 
            :value="formData.region" 
            :custom-item="customItem" 
            @change="regionPick">
            <div v-if="!formData.region.length" class="region-picker-placeholder">请选择区域</div>
            <view v-if="formData.region.length">
              {{formData.region[0]}}，{{formData.region[1]}}，{{formData.region[2]}}
            </view>
          </picker>
          <div class="weui-cell__ft">
            <i class="iconfont">&#xe601;</i>
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">详细地址</div>
          <input 
            type="text" 
            class="weui-input"
            :class="{'clear': formData.address.length > 0 && focus === 'address'}"
            placeholder="请输入街道，门牌等详细地址" 
            v-model="formData.address"
            @focus="focus = 'address'"
            @blur="focus = undefined">
          <i class="iconfont clear-icon" @click="clearInput(4)">&#xe600;</i>
        </div>
      </div>
      <div class="isDefault" @click="setDefault">
        <i class="iconfont icon-select-no tick" v-if="!formData.isDefault">&#xe656;</i>
        <i class="iconfont icon-select-fill tick" v-else>&#xe655;</i>
        <span>设为默认地址</span>
      </div>
      <button 
        class="weui-btn btn-save" 
        @click="submitForm"
        :style="formCanSubmit ? 'opacity: 1' : 'opacity: 0.5'">
        保存</button>
    </base-custom-box>
  </div>
</template>

<script>
import BaseNavigationBar from "@/components/base/BaseNavigationBar";

export default {
  compoents: {
    BaseNavigationBar
  },
  data () {
    return {
      formData: undefined, // 收件地址表单
      focus: undefined // 用于判断目前聚焦的input
    }
  },
  onLoad (option) {
    var addressList = this.$store.getters['UserCenter/addressList']
    this.formData = addressList.find(item => {
      return item.addressId + '' === option.addressId
    })
  },
  onUnload () {
    // let that = this
    wx.showModal({
      title: '保存地址',
      content: '是否保存地址',
      cancelText: '不保存',
      confirmText: '保存'
      // success () {
      //   if (that.formCanSubmit && that.validateForm()) {
      //     mpvue.navigateBack()
      //   } else {}
      // },
      // fail () {
      //   mpvue.redirectTo({ url: '/pages/address/main' })
      // }
    })
  },
  computed: {
    formCanSubmit () {
      let obj = this.formData
      for (const key in obj) {
        if (key !== 'isDefault') {
          if (key === 'region') {
            if (obj[key].length === 0) {
              return false
            }
          } else {
            if (obj[key] === '') {
              return false
            }
          }
        }
      }
      return true
    }
  },
  methods: {
    // 设为默认地址
    setDefault () {
      this.formData.isDefault = !this.formData.isDefault
    },

    // 表单验证
    validateForm () {
      if (!this.Utils.regularRule.phone.test(this.formData.receiverPhone)) {
        this.showToast('请输入正确的手机号')
        return false
      }
      if (!this.Utils.regularRule.postCode.test(this.formData.postCode)) {
        this.showToast('请输入正确的邮政编码')
        return false
      }
      return true
    },

    // 提交表单
    submitForm (str) {
      console.log(this.formData)
      if (this.formCanSubmit && this.validateForm()) {
        console.log('提交！')
      }
    },

    // toast提示
    showToast (text) {
      wx.showToast({
        title: text,
        icon: 'none',
        duration: 2000
      })
    },

    // 清空输入框
    clearInput (num) {
      switch (num) {
        case 1: {
          this.formData.receiverName = ''
          break
        }
        case 2: {
          this.formData.receiverPhone = ''
          break
        }
        case 3: {
          this.formData.postCode = ''
          break
        }
        case 4: {
          this.formData.address = ''
          break
        }
      }
    },
    regionPick: function (e) {
      console.log('picker发送选择改变，携带值为', e.mp.detail)
      this.formData.region = e.mp.detail.value
      if (e.mp.detail.postcode) {
        this.formData.postCode = e.mp.detail.postcode
      }
    }
  }
}
</script>

<style lang="less" scoped>
@baoWoBlack: #515151;
@baoWoRed: #771212;
@baoWoFont: 'PingFangSC-Light';
.modifyAddress-wrap {
  font-family: @baoWoFont;
  color: @baoWoBlack;
  .weui-cell {
    display: flex;
    & :nth-child(1) {
      flex: 2.3;
    }
    & :nth-child(2) {
      flex: 6;
    }
  }
  .clear-icon {
    visibility: hidden;
    line-height: 36px;
    flex: 0.8;
    text-align: center;
  }
  input.clear + .clear-icon {
    visibility: visible;
  }
  .region {
    .region-picker-placeholder {
      color: rgb(131, 131, 131);
      font-family: 'PingFangSC';
    }
    .region-picker {
      margin: 10px 0;
    }
  }
  .isDefault {
    padding-left: 15px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    i {
      margin-right: 5px;
      font-size: 0.8em;
      color: @baoWoRed;
    }
    span {
      font-size: 0.8em;
    }
  }
  .btn-save {
    position: absolute;
    bottom: 40px;
    color: white;
    background: @baoWoBlack;
    font-family: @baoWoFont;
    width: 94%;
    left: 50%;
    transform: translate(-50%, 0);
  }
}
</style>