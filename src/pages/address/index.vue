<template>
  <div class="address-wrap">
    <div class="address-list">
      <ul>
        <li v-for="(item, index) in addressList" :key="index">
          <div class="receiver-info">
            <span class="receiver-name">{{ item.receiverName }}</span>
            <span>{{ item.encodePhone }}</span>
            <p class="address">{{ item.address }}</p>
          </div>
          <div class="info-edit">
            <div class="default-address" @click="setDefault(index)">
              <span><i class="iconfont tick" :style="item.isDefault ? 'color: #3ed474' : 'color: #bfbfbf'">&#xe65b;</i>默认地址</span>
            </div>
            <div class="edit">
              <i class="iconfont" @click="routeTo('modify', index)">&#xe603;</i>
              <i class="iconfont delete" @click="deleteAddress(index)">&#xe625;</i>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <button class="weui-btn add" @click="routeTo('add')">添加地址</button>
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
        receiverName: 'John',
        receiverPhone: '13073827938',
        encodePhone: '130****7938',
        postCode: '3500095',
        region: ['福建省', '厦门市', '思明区'],
        address: '展鸿路1号',
        isDefault: false
      }],
      currentDefault: 0
    }
  },
  methods: {
    // 删除地址
    deleteAddress (index) {
      let address = this.addressList
      wx.showModal({
        title: '删除地址',
        content: '确认删除此收件地址',
        confirmText: '删除',
        cancelText: '取消',
        confirmColor: 'red',
        success: function (res) {
          if (res.confirm) {
            address.splice(index, 1)
          }
        }
      })
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
          confirmColor: 'green',
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
@baoWoBlack: rgb(51, 51, 51);
@baoWoFont: 'PingFangSC-Light';
.address-wrap {
  font-family: @baoWoFont;
  color: @baoWoBlack;
  .address-list {
    li {
      margin: 20px 0;
    }
    .receiver-info {
      box-shadow: 0 -0.08px 5px rgb(223, 223, 223), 0 0.01px 1px rgb(221, 221, 221);
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
      box-shadow: 0 0.08px 5px rgb(223, 223, 223);
      padding: 8px 18px;
      .default-address {
        flex: 8;
        line-height: 32px;
        .tick {
          font-size: 0.35rem;
          margin-right: 5px;
          color: #3ed474;
          vertical-align: middle;
        }
      }
      .edit {
        flex: 1;
        font-size: 0.25rem;
        vertical-align: middle;
        i {
          margin: 0 5px; 
        }
        .delete {
          font-size: 0.4rem;
        }
      }
    }
  }
}
</style>