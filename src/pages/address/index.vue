<template>
  <div class="address-wrap">
    <BaseNavigationBar name="地址管理">
      <i class="iconfont" @click="back">&#xe625;</i>
    </BaseNavigationBar>
    <BaseCustomBox>
      <div class="address-list">
        <div class="mo-box" v-for="(item, index) in addressList" :key="index">
          <movable-area class="mo-area">
            <movable-view 
              class="mo-view" 
              x="66" y="0" 
              out-of-bounds="true" 
              direction="horizontal" 
              inertia="true" 
              damping="100">
              <div class="receiver-info">
                <span class="receiver-name">{{ item.receiverName }}</span>
                <span>{{ item.receiverPhone }}</span>
                <p class="address">{{ item.region[0] + item.region[1] + item.region[2] + item.address}}</p>
              </div>
              <div class="info-edit">
                <div class="default-address" @click="setDefault(index)">
                  <span>
                    <i class="iconfont icon-select-no tick" v-if="!item.isDefault">&#xe656;</i>
                    <i class="iconfont icon-select-fill tick" v-else>&#xe655;</i>
                    默认地址
                  </span>
                </div>
              </div>
            </movable-view>
            <div class="action-box">
              <div class="edit" @click="routeTo('modify', index)">
                <i class="iconfont edit">&#xe66e;</i>
              </div>
              <div class="delete" @click="deleteAddress(index)">
                <i class="iconfont delete">&#xe637;</i>
              </div>
            </div>
          </movable-area>
        </div>
      </div>
    </BaseCustomBox>
    <div class="add" @click="routeTo('add')" @touchmove="hideAdd" v-if="!isHideAdd">
      <i class="iconfont">&#xe608;</i>
    </div>
    <message-toast v-if="hidden"></message-toast>
  </div>
</template>

<script>
import messageToast from '@/components/message/messageToast'
import BaseNavigationBar from "@/components/base/BaseNavigationBar"
import BaseCustomBox from "@/components/base/BaseCustomBox"

export default {
  components: {
    messageToast,
    BaseNavigationBar,
    BaseCustomBox
  },
  data () {
    return {
      currentDefault: 0,
      editScoll: undefined,
      isHideAdd: false // 隐藏添加地址按钮标识
    }
  },
  onShow () {
    // 获取地址
    this.$http.get('/action/addr/list').then(res => {
      if (res) {
        console.log(res.data.addressList, 'all address')
        this.$store.commit('UserCenter/SET_ADDRESS_LIST', res.data.addressList)
      } else {
        wx.showToast({
          title: '获取地址失败',
          icon: 'none'
        })
      }
    })
    this.isHideAdd = false
  },
  computed: {
    addressList () {
      return this.$store.getters['UserCenter/addressList']
    },
    // 新消息弹窗
    hidden () {
      return this.$store.getters['Message/showMessageToast']
    }
  },
  methods: {
    // 删除地址
    deleteAddress (index) {
      let that = this
      let address = this.addressList
      if (address[index].isDefault) {
        wx.showModal({
          title: '提示',
          content: '默认地址不能删除',
          showCancel: false,
          confirmText: '知道了'
        })
      } else {
        wx.showModal({
          title: '删除地址',
          content: '确认删除此收件地址',
          confirmText: '删除',
          cancelText: '取消',
          confirmColor: '#d34e44',
          success: function (res) {
            if (res.confirm) {
              console.log(address[index].id, 'delete addrId')
              that.$http.post('/action/addr/delete', {addrId: address[index].id}).then(res => {
                if (res !== '' && res.status === 20000) {
                  that.showToast('删除成功', 'success')
                  address.splice(index, 1)
                } else {
                  that.showToast('删除失败')
                }
              })
            }
          }
        })
      }
    },

    // 设置默认地址
    setDefault (index) {
      let that = this
      let address = this.addressList
      if (!address[index].isDefault) {
        wx.showModal({
          title: '设置默认地址',
          content: '确认设置此条为默认地址',
          confirmText: '确定',
          cancelText: '取消',
          success: function (res) {
            if (res.confirm) {
              that.$http.post('/action/addr/setDefault', {addrId: address[index].id}).then(res => {
                if (res.status === 20000) {
                  that.showToast('设置成功', 'success')
                  wx.pageScrollTo({
                    selector: '.address-wrap',
                    duration: 600
                  })
                } else {
                  that.showToast('设置失败')
                }
              })
              address[0].isDefault = false
              address[index].isDefault = true
            }
          }
        })
      }
    },

    // 提示
    showToast(content, i, dur) {
      wx.showToast({
        title: content,
        icon: i || 'none',
        duration: dur || 1500
      })
    },

    // 路由跳转
    routeTo (type, index) {
      if (type === 'add') {
        mpvue.navigateTo({ url: '/pages/addAddress/main' })
      } else if (type === 'modify') {
        console.log(index, 'index')
        console.log(this.addressList, 'address list')
        console.log(this.addressList[index].addressId, 'addressId')
        mpvue.navigateTo({ url: '/pages/modifyAddress/main?addressId=' + this.addressList[index].id })
      }
    },

    // 页面返回
    back () {
      mpvue.navigateBack()
    },

    // 隐藏添加地址按钮
    hideAdd () {
      this.isHideAdd = true
      setTimeout(() => {
        this.isHideAdd = false
      }, 2500)
    }
  }
}
</script>

<style lang="less" scoped>
@baoWoBlack: #515151;
@baoWoRed: #771212;
@baoWoFont: 'PingFangSC-Light';
@sliderX: 60px;
@orange: #ff6421;
@keyframes showAdd {
  0% {
    position: fixed;
    right: -30px;
    bottom: 40px;
    z-index: 9;
  }
  100% {
    position: fixed;
    right: 18px;
    bottom: 40px;
    z-index: 9;
  }
}
.address-wrap {
  font-family: @baoWoFont;
  color: @baoWoBlack;
  background-color: #f3f3f3;
  height: 100%;
  .address-list {
    padding-top: 2px;
    height: 100%;
    background-color: #f3f3f3;
    .mo-box {
      overflow: hidden;
      margin: 10px 10px;
      border-radius: 15px;
      .mo-area {
        position: relative;
        left: -@sliderX;
        width: calc(100% + @sliderX);
        height: auto;
        background-color: #ffffff;
        border-radius: 15px;
        .mo-view {
          position: relative;
          width: calc(100% - @sliderX);
          height: auto;
          z-index: 9;
          background-color: #ffffff;
          border-radius: 15px;
        }
      }
      .action-box {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: @sliderX;
        z-index: 8;
        .edit {
          display: flex;
          justify-content: center;
          align-items: center;
          // background-color: #f7ba5e;
          background-color: @baoWoBlack; 
          height: 50%;
          border-top-right-radius: 15px;
          i {
            font-size: 30px;
            color: #ffffff;
          }
        }
        .delete {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: @orange;
          height: 50%;
          border-bottom-right-radius: 15px;
          i {
            font-size: 21px;
            color: #ffffff;
          }
        }
      }
    }
    .receiver-info {
      box-shadow: 0 0.01px 3px rgb(221, 221, 221);
      font-size: 13px;
      padding: 12px 15px;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      .receiver-name {
        margin-right: 8px;
      }
      .address {
        color: rgb(175, 175, 175);
        margin-top: 3px;
      }
    }
    .info-edit {
      display: flex;
      font-size: 0.8em;
      padding: 4px 18px;
      align-items: center;
      .default-address {
        flex: 8;
        line-height: 32px;
        .tick {
          font-size: 12px;
          margin-right: 5px;
          color: @orange;
          vertical-align: middle;
        }
      }
    }
  }
  .add {
    position: fixed;
    right: 18px;
    bottom: 40px;
    z-index: 9;
    animation: showAdd 1s ease;
    i {
      font-size: 1rem;
      color: @orange;
    }
  }
}
</style>