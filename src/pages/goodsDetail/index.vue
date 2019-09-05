<template>
  <div>
    <com-swiper :imgList="imgList"></com-swiper>
    <div class="tab-navbar">
      <div class="tab-navbar-item" 
        v-for="(item, index) in navbarList" 
        :key="index" 
        :class="{'on': item.on}"
        @click="selectNavTab(item)"
      >
        {{item.name}}
      </div>
    </div>
    <div class="tab-content">
      <goods-info v-if="navbarList[0].on" :num.sync="num"></goods-info>
    </div>
  </div>
</template>

<script>
import comSwiper from '../../components/comSwiper/comSwiper'
import goodsInfo from '../../components/goodsDetail/goodsInfo/goodsInfo'

export default {
  data () {
    return {
      navbarList: [
        {
          name: '商品信息',
          on: true
        },
        {
          name: '详情',
          on: false
        },
        {
          name: '评论',
          on: false
        }
      ],
      imgList: [
        {
          url: 'https://images.unsplash.com/photo-1567494355252-047444d52a43?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80',
          alt: '1'
        },
        {
          url: 'https://images.unsplash.com/photo-1530977875151-aae9742fde19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80',
          alt: '2'
        },
        {
          url: 'https://images.unsplash.com/photo-1455894127589-22f75500213a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1579&q=80',
          alt: '3'
        }
      ],
      goods: {},
      num: 0
    }
  },

  watch: {
    num (val) {
      console.log('num改变:' + val)
    }
  },

  components: {
    comSwiper,
    goodsInfo
  },

  methods: {
    selectNavTab (item) {
      for (let i = 0; i < this.navbarList.length; i++) {
        if (item.name === this.navbarList[i].name) {
          this.navbarList[i].on = true
        } else {
          this.navbarList[i].on = false
        }
      }
    }
  },

  mounted () {
    // this.$http.get('/api').then(res => {
    //   console.log(res)
    // })
  }
}
</script>

<style lang="less" scoped>
.tab-navbar {
  display: flex;
  position: relative;
  border: none;
  align-items: center;
  .tab-navbar-item {
    display: block;
    padding:26rpx 0;
    text-align: center;
    flex-grow: 1;
    font-size:28rpx;
    line-height:18rpx;
    color: #aaa;
    font-weight: 600;
    border-bottom: 1px solid #ddd;
    &.on {
      color: #222;
      border-bottom: 2px solid #222;
    }
  }
}
.tab-content {
  padding: 10px 30px;
  
}
</style>
