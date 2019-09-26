<template>
  <div class="selectAddress-wrap">
    <div class="address-list">
      <ul>
        <li 
          class="address-box" 
          v-for="(item, index) in addressList" 
          :key="index"
          @click="selectAddress(item.id, index)">
          <div class="address-select"> 
            <i class="iconfont icon-select-fill" v-if="selected === item.id">&#xe655;</i>
            <i class="iconfont icon-select-no" v-else>&#xe656;</i>
          </div>
          <div class="address-info">
            <div class="receiver-info">
              <span class="receiver-name">{{ item.receiverName }}</span>
              <span>{{ item.receiverPhone }}</span>
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
      selected: 0 // 记录选中了哪条地址
    }
  },
  onShow () {
    // 获取所有地址
    this.$http.get('/action/addr/list').then(res => {
      if (res) {
        this.$store.commit('UserCenter/SET_ADDRESS_LIST', res.data.addressList)
      } else {
        wx.showToast({
          title: '获取地址失败',
          icon: 'none'
        })
      }
    })
    let addr = this.addressList.find(item => {
      return item.isDefault
    })
    this.selected = addr.id
  },
  computed: {
    addressList () {
      let addrList = this.$store.getters['UserCenter/addressList']
      return addrList
    }
  },
  methods: {
    selectAddress (addrId, index) {
      this.selected = addrId
    },
    confirm () {
      this.$store.commit('UserCenter/SET_SELECTED_ADDRESS', this.selected)
      mpvue.navigateBack()
    }
  }
}
</script>

<style lang="less" scoped>
@baoWoBlack: rgb(51, 51, 51);
@baoWoFont: 'PingFangSC-Light';
@orange: #ff6421;
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
        flex: 1.2;
        display: flex;
        justify-content: center;
        align-items: center;
        .iconfont {
          font-size: 20px;
          color: @orange;
        }
      }
      .address-info {
        flex: 8;
        font-size: 13px;
        min-height: 47px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .receiver-name {
          margin-right: 10px;
        }
        .address {
          color: #7a7a7a;
          margin-top: 2px;
        }
        .default-address {
          display: block;
          color: @orange;
          font-size: 13px;
          margin-top: 1px;
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
    background-color: @orange;
    color: #ffffff;
  }
}
</style>