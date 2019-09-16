<template>
  <div class="selectAddress-wrap">
    <div class="address-list">
      <ul>
        <li 
          class="address-box" 
          v-for="(item, index) in addressList" 
          :key="index"
          @click="selectAddress(index)">
          <div class="address-select"> 
            <i class="iconfont icon-select-no" v-if="!item.isSelected">&#xe656;</i>
            <i class="iconfont icon-select-fill" v-else>&#xe655;</i>
          </div>
          <div class="address-info">
            <div class="receiver-info">
              <span class="receiver-name">{{ item.receiverName }}</span>
              <span>{{ item.encodePhone }}</span>
              <p class="address">{{ item.region[0] + item.region[1] + item.region[2] + item.address }}</p>
            </div>
            <p class="default-address" v-if="item.isDefault">默认地址</p>
          </div>
        </li>
      </ul>
    </div>
    <button class="confirm-btn" @click="confirm">确定</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      addressList: this.$store.state.UserCenter.addressList,
      selectedAddress: this.$store.state.UserCenter.selectedAddress,
      selected: 0 // 记录选中了哪条地址
    }
  },
  onLoad () {
    let that = this
    let addr = this.addressList
    let hasSelected = Boolean(this.selectedAddress)
    for (let i = 0; i < addr.length; i++) {
      console.log(hasSelected, addr[i].isDefault)
      if (!hasSelected && addr[i].isDefault) {
        this.selected = i
        addr[i].isSelected = true
      } else if (hasSelected && that.selectedAddress.addressId === addr[i].addressId) {
        this.selected = i
        addr[i].isSelected = true
      } else {
        addr[i].isSelected = false
      }
    }
  },
  methods: {
    selectAddress (index) {
      if (index !== this.selected) {
        let addrList = this.addressList
        addrList[this.selected].isSelected = !addrList[this.selected].isSelected
        addrList[index].isSelected = !addrList[index].isSelected
        this.selected = index
      }
    },
    confirm () {
      let store = this.$store.state.UserCenter
      store.selectedAddress = store.addressList[this.selected]
      mpvue.navigateBack()
    }
  }
}
</script>

<style lang="less" scoped>
@baoWoBlack: rgb(51, 51, 51);
@baoWoFont: 'PingFangSC-Light';

.selectAddress-wrap {
  background-color: #f3f3f3;
  box-sizing: border-box;
  padding: 5px 10px;
  height: 100%;
  font-family: @baoWoFont;
  .address-list {
    margin-top: 10px;
    .address-box {
      border: 0 solid #ffffff;
      border-radius: 10px;
      background-color: rgb(255, 255, 255);
      padding: 10px 10px;
      margin: 10px 0;
      display: flex;
      align-content: center;
      .address-select {
        flex: 1.6;
        display: flex;
        justify-content: center;
        align-items: center;
        .iconfont {
          font-size: 25px;
          color: #771212;
        }
      }
      .address-info {
        flex: 8;
        font-size: 17px;
        .receiver-name {
          margin-right: 10px;
        }
        .default-address {
          display: block;
          color: #771212;
          font-size: 16px;
        }
      }
    }
  }
  .confirm-btn {
    position: fixed;
    bottom: 40px;
    width: 94%;
    transform: translate(-50%, 0);
    left: 50%;
    background-color: @baoWoBlack;
    color: #ffffff;
  }
}
</style>