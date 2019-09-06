<template>
  <div class="modifyAddress-wrap">
    <div class="weui-cells weui-cells_form" @submit="submitForm('submit')">
      <div class="weui-cell">
        <div class="weui-cell__hd">姓名</div>
        <input type="text" class="weui-input" placeholder="请输入姓名" v-model="formData.receiverName">
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">手机号码</div>
        <input type="number" class="weui-input" placeholder="请输入手机号码" v-model="formData.receiverPhone">
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">邮政编码</div>
        <input type="number" class="weui-input" placeholder="请输入邮政编码" pattern="[0-9]{6}" v-model="formData.postCode">
      </div>
      <div class="weui-cell region" @click="chooseRegion">
        <div class="weui-cell__hd">所在区域</div>
        <!-- <input type="text" class="weui-input" placeholder="选择所在区域，街道，区县"> -->
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
        <input type="text" class="weui-input" placeholder="请输入街道，门牌等详细地址" v-model="formData.address">
      </div>
    </div>
    <div class="isDefault" @click="setDefault">
      <i class="iconfont tick" :style="formData.isDefault ? 'color: #3ed474' : 'color: #bfbfbf'">&#xe65b;</i>
      <span>设为默认地址</span>
    </div>
    <button class="weui-btn btn-save" @click="submitForm">保存</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: undefined // 收件地址
    }
  },
  methods: {
    // 设为默认地址
    setDefault () {
      this.formData.isDefault = !this.formData.isDefault
    },

    // 提交表单
    submitForm (str) {
      console.log(str)
    },

    // 选择所在区域
    chooseRegion () {

    },
    regionPick: function (e) {
      console.log('picker发送选择改变，携带值为', e.mp.detail)
      this.region = e.mp.detail.value
      if (e.mp.detail.postcode) {
        this.formData.postCode = e.mp.detail.postcode
      }
    }
  },
  onLoad (option) {
    this.formData = JSON.parse(option.address)
  }
}
</script>

<style lang="less" scoped>
@baoWoBlack: rgb(51, 51, 51);
@baoWoFont: 'PingFangSC-Light';
.modifyAddress-wrap {
  font-family: @baoWoFont;
  color: @baoWoBlack;
  .weui-cell {
    display: flex;
    & :nth-child(1) {
      flex: 2;
    }
    & :nth-child(2) {
      flex: 6;
    }
  }
  .region {
    & :nth-child(2) {
      padding-left: 8px;
    }
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
    }
    span {
      font-size: 0.8em;
    }
  }
  .btn-save {
    position: absolute;
    bottom: 12px;
    color: white;
    background: @baoWoBlack;
    font-family: @baoWoFont;
    width: 94%;
    left: 50%;
    transform: translate(-50%, 0);
  }
}
</style>