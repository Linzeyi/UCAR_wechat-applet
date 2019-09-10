<template>
  <div class="home-wrap">
    <com-swiper :imgList="imgList"></com-swiper>
    <div class="goodsList-panel">
      <div class="header">
        <span class="panel-title">热门推荐</span>
        <span class="more-btn" @click="switchTab('/pages/classification/main')">
          <i class="iconfont icon-more">&#xe601;</i> 更多
        </span>
      </div>
      <goods-grid-list :goodsList="goodsList"></goods-grid-list>
    </div>
  </div>
</template>

<script>

import comSwiper from '@/components/comSwiper/comSwiper'
import goodsGridList from '@/components/goodsGridList/goodsGridList'

export default {
  data () {
    return {
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      },
      imgList: [
        'https://images.unsplash.com/photo-1567494355252-047444d52a43?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80',
        'https://images.unsplash.com/photo-1530977875151-aae9742fde19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80',
        'https://images.unsplash.com/photo-1455894127589-22f75500213a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1579&q=80',
        'https://images.unsplash.com/photo-1563062067-bb3786dc5855?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
      ],
      goodsList: []
    }
  },
  components: {
    comSwiper,
    goodsGridList
  },
  onLoad () {
    this.getRecommentGoodsList()
  },
  async onPullDownRefresh() {
    console.log('下拉刷新')
    console.log(this)
    // 停止下拉刷新
    // wx.stopPullDownRefresh()
  },
  methods: {
    getRecommentGoodsList () {
      this.goodsList = this.$store.getters['Goods/goodsList']
    },
    switchTab (url) {
      mpvue.switchTab({ url })
    }
  }
}
</script>

<style lang="less" scoped>
.home-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  .goodsList-panel {
    width: 100%;
    flex-grow: 1;
    background-color: #f3f3f3;
    &:after {
      border-bottom: none;
    }
    .header {
      background-color: #fff;
      box-shadow: 0 3px 10px 0 #ddd;
      font-weight: 600;
      font-size: 26rpx;
      color: #555;
      padding: 22rpx 30rpx 22rpx;
      .more-btn {
        float: right;
        color: #ddd;
        .icon-more {
          font-size: 12px;
        }
      }
      &:after {
        border-bottom: none;
      }
    }
    .weui-panel__bd {
      padding-top: 10px;
    }
  }
}
</style>
