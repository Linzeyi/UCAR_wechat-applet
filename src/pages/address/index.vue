<template>
  <div class="address-wrap">
    <div class="address-list">
      <div class="mo-box" v-for="(item, index) in addressList" :key="index">
        <movable-area class="mo-area">
          <movable-view class="mo-view" x="66" y="0" out-of-bounds="true" direction="horizontal" inertia="true" damping="100">
            <div class="receiver-info">
              <span class="receiver-name">{{ item.receiverName }}</span>
              <span>{{ item.encodePhone }}</span>
              <p class="address">{{ item.address }}</p>
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
              <i class="iconfont delete">&#xe625;</i>
            </div>
          </div>
        </movable-area>
      </div>
    </div>
    <div class="add" @click="routeTo('add')">
      <i class="iconfont">&#xe608;</i>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      addressList: [{
        addressId: 0,
        receiverName: 'Thomas',
        receiverPhone: '13015768195',
        encodePhone: '130****8195',
        postCode: '3500095',
        region: ['广东省', '中山市', '石岐区街道'],
        address: '兴中道体育场',
        isDefault: true
      },
      {
        addressId: 1,
        receiverName: '阿徽超级帅',
        receiverPhone: '13073827938',
        encodePhone: '130****7938',
        postCode: '361001',
        region: ['福建省', '厦门市', '思明区'],
        address: '展鸿路1号',
        isDefault: false
      },
      {
        addressId: 2,
        receiverName: 'John',
        receiverPhone: '13015768195',
        encodePhone: '130****8195',
        postCode: '3500095',
        region: ['香港特别行政区', '香港特别行政区', '屯门区'],
        address: '屯门市中心',
        isDefault: false
      }],
      currentDefault: 0
    }
  },
  methods: {
    // 删除地址
    deleteAddress (index) {
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
              address.splice(index, 1)
            }
          }
        })
      }
    },
    // 设置默认地址
    setDefault (index) {
      let me = this
      let address = this.addressList
      if (!address[index].isDefault) {
        wx.showModal({
          title: '设置默认地址',
          content: '确认设置此条为默认地址',
          confirmText: '确定',
          cancelText: '取消',
          // confirmColor: 'green',
          success: function (res) {
            if (res.confirm) {
              address[index].isDefault = true
              address[me.currentDefault].isDefault = false
              me.currentDefault = index
            }
          }
        })
      }
    },
    routeTo (type, index) {
      if (type === 'add') {
        mpvue.navigateTo({ url: '/pages/addAddress/main' })
      } else if (type === 'modify') {
        mpvue.navigateTo({ url: '/pages/modifyAddress/main?address=' + JSON.stringify(this.addressList[index]) })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@baoWoBlack: #515151;
@baoWoRed: #771212;
@baoWoFont: 'PingFangSC-Light';
@sliderX: 60px;
.address-wrap {
  font-family: @baoWoFont;
  color: @baoWoBlack;
  height: 100%;
  background-color: #f3f3f3;
  .address-list {
    padding-top: 2px;
    .mo-box {
      overflow: hidden;
      margin: 10px 10px;
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
          background-color: @baoWoRed;
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
      font-size: 0.35rem;
      padding: 8px 15px;
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
      padding: 8px 18px;
      align-items: center;
      .default-address {
        flex: 8;
        line-height: 32px;
        .tick {
          font-size: 0.35rem;
          margin-right: 5px;
          color: @baoWoRed;
          vertical-align: middle;
        }
      }
    }
  }
  .add {
    position: fixed;
    right: 18px;
    bottom: 40px;
    i {
      font-size: 1rem;
      color: @baoWoBlack;
    }
  }
}
</style>