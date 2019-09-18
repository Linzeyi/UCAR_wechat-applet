<template>
  <div class="addAddress-wrap">
    <BaseNavigationBar name="添加地址">
      <i class="iconfont" @click="back">&#xe625;</i>
    </BaseNavigationBar>
    <BaseCustomBox>
      <div class="weui-cells weui-cells_form" @submit="submitForm('submit')">
        <div class="weui-cell">
          <div class="weui-cell__hd">姓名</div>
          <input 
            type="text" 
            placeholder="请输入姓名"
            v-model="formData.receiverName"
            class="weui-input" 
            :class="{'clear': formData.receiverName.length > 0 && focus === 'name'}" 
            @focus="focus = 'name'"
            @blur="focus = undefined">
          <i class="iconfont clear-icon" @click="clearInput(1)">&#xe600;</i>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">手机号码</div>
          <input 
            type="number"
            placeholder="请输入手机号码"
            v-model="formData.receiverPhone"
            class="weui-input" 
            :class="{'clear': formData.receiverPhone.length > 0 && focus === 'phone'}" 
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
            v-model="formData.postCode"
            placeholder="自动根据区域生成"
            disabled="true"
            pattern="[0-9]{6}"
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
        :style="formCanSubmit ? 'opacity: 1' : 'opacity: 0.5'" 
        @click="submitForm">
        保存
      </button>
    </BaseCustomBox>
  </div>
</template>

<script>
import BaseNavigationBar from "@/components/base/BaseNavigationBar";
import BaseCustomBox from "@/components/base/BaseCustomBox";

export default {
  components: {
    BaseNavigationBar,
    BaseCustomBox
  },
  data () {
    return {
      formData: {
        receiverName: '',
        receiverPhone: '',
        postCode: '',
        region: [],
        address: '',
        isDefault: false // 标示新增地址是否为默认
      },
      focus: undefined // 用于存储目前聚焦的input
    }
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
  onUnload () {
    this.formData.receiverName = ''
    this.formData.receiverPhone = ''
    this.formData.postCode = ''
    this.formData.region.length = 0
    this.formData.address = ''
    this.formData.isDefault = false
    this.focus = undefined
  },
  methods: {
    // 设置默认地址
    setDefault () {
      this.formData.isDefault = !this.formData.isDefault
    },

    // 表单验证
    validateForm () {
      if (!this.Utils.regularRule.phone.test(this.formData.receiverPhone)) {
        this.showToast('请输入正确的手机号', 'none')
        return false
      }
      if (!this.Utils.regularRule.postCode.test(this.formData.postCode)) {
        this.showToast('请输入正确的邮政编码', 'none')
        return false
      }
      return true
    },

    // 提交表单
    submitForm (str) {
      // 检验表单是否有空
      if (this.formCanSubmit) {
        // 检验表单内容合法性
        if (this.validateForm()) {
          console.log('提交！')
          mpvue.navigateBack()
          this.showToast('添加成功', 'success')
        }
      } else {
        this.showToast('地址信息未填写完整', 'none')
      }
    },

    // toast提示
    showToast (text, type) {
      wx.showToast({
        title: text,
        icon: type,
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

    // 区域选择器
    regionPick: function (e) {
      console.log('picker发送选择改变，携带值为', e.mp.detail.value)
      this.formData.region = e.mp.detail.value
      if (e.mp.detail.postcode) {
        this.formData.postCode = e.mp.detail.postcode
      }
    },

    // 检查表单是否为空
    formIsEmpty () {
      for (const key in this.formData) {
        if (key !== 'isDefault') {
          if (key !== 'region' && this.formData[key]) {
            return false
          } else if (key === 'region' && this.formData[key].length > 0) {
            return false
          }
        }
      }
      return true
    },

    // 页面返回
    back () {
      let that = this
      if (!this.formIsEmpty()) {
        wx.showModal({
          title: '保存地址',
          content: '是否保存地址',
          cancelText: '不保存',
          confirmText: '保存',
          success (res) {
            if (res.confirm) {
              that.submitForm()
            } else if (res.cancel) {
              mpvue.navigateBack()
            }
          }
        })
      } else {
        mpvue.navigateBack()
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
.addAddress-wrap {
  font-family: @baoWoFont;
  color: @baoWoBlack;
  height: 100%;
  .weui-cells {
    margin-top: 0;
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
  }
  .isDefault {
    padding-left: 15px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    i {
      margin-right: 5px;
      font-size: 0.8em;
      color: @orange;
    }
    span {
      font-size: 0.8em;
    }
  }
  .btn-save {
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