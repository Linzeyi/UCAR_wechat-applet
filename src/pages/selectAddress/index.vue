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
              <p class="address">{{ item.address }}</p>
            </div>
            <p class="default-address" v-if="item.isDefault">默认地址</p>
          </div>
        </li>
      </ul>
    </div>
    <button class="confirm-btn">确定</button>
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
        isDefault: true,
        isSelected: true
      },
      {
        addressId: 1,
        receiverName: '阿徽超级帅',
        receiverPhone: '13073827938',
        encodePhone: '130****7938',
        postCode: '361001',
        region: ['福建省', '厦门市', '思明区'],
        address: '展鸿路1号',
        isDefault: false,
        isSelected: false
      },
      {
        addressId: 2,
        receiverName: 'John',
        receiverPhone: '13015768195',
        encodePhone: '130****8195',
        postCode: '3500095',
        region: ['香港特别行政区', '香港特别行政区', '屯门区'],
        address: '屯门市中心',
        isDefault: false,
        isSelected: false
      }],
      selected: 0 // 记录选中了哪条地址
    }
  },
  methods: {
    selectAddress (index) {
      if (index !== this.selected) {
        let addList = this.addressList
        addList[this.selected].isSelected = !addList[this.selected].isSelected
        addList[index].isSelected = !addList[index].isSelected
        this.selected = index
      }
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