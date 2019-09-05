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
            <div class="default-address">
              <span><i class="iconfont tick" :style="item.isDefault ? 'color: #3ed474' : 'color: #bfbfbf'">&#xe65b;</i>默认地址</span>
            </div>
            <div class="edit">
              <i class="iconfont">&#xe603;</i>
              <i class="iconfont delete" @click="deleteAddress(index)">&#xe625;</i>
            </div>
          </div>
        </li>
      </ul>
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
        address: '广东省中山市石岐区兴中道',
        isDefault: true
      },
      {
        addressId: 1,
        receiverName: 'John',
        receiverPhone: '13073827938',
        encodePhone: '130****7938',
        address: '福建省厦门市思明区展鸿路',
        isDefault: false
      }]
    }
  },
  methods: {
    deleteAddress (index) {
      this.addressList.splice(index, 1)
    }
  }
}
</script>

<style lang="less" scoped>
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
    padding: 8px 10px;
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
</style>