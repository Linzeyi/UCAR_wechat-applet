<template>
  <div style="height: 100%">
    <base-navigation-bar name="首页">
      <i class="iconfont" @click="Utils.navigateTo('/pages/search/main')">&#xe60b;</i>
    </base-navigation-bar>
    <base-custom-box>
      <div class="home-wrap">
        <com-swiper :imgList="imgList" :isLink="true"></com-swiper>
        <div class="goodsList-panel">
          <div class="header">
            <span class="panel-title">热门推荐</span>
            <span class="more-btn" @click="switchTab('/pages/classification/main')">
              更多
            </span>
          </div>
          <div class="list-content">
            <goods-grid-list :goodsList="goodsList" :col="2"></goods-grid-list>
          </div>
        </div>
      </div>
    </base-custom-box>
  </div>
</template>

<script>

import BaseCustomBox from "@/components/base/BaseCustomBox"
import BaseNavigationBar from "@/components/base/BaseNavigationBar"
import comSwiper from '@/components/comSwiper/comSwiper'
import goodsGridList from '@/components/goodsGridList/goodsGridList'

export default {
  data () {
    return {
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      },
      imgList: [],
      goodsList: []
    }
  },
  components: {
    comSwiper,
    goodsGridList,
    BaseCustomBox,
    BaseNavigationBar
  },
  onLoad () {
    this.getRecommendGoodsList()
  },
  async onPullDownRefresh() {
    console.log('下拉刷新')
    this.getRecommendGoodsList()
    // 停止下拉刷新
  },
  methods: {
    getRandomImgList () {
      this.imgList = []
      let goodsList = JSON.parse(JSON.stringify(this.goodsList))
      let arr = []
      let count = goodsList.length
      let swiperNum = count < 3 ? count : Math.floor(Math.random() * 2 + 3)
      for (let i = 0; i < swiperNum; i++) {
        let randomIndex = Math.floor(Math.random() * count)
        let el = {
          pic: goodsList[randomIndex].pic,
          goodsNo: goodsList[randomIndex].goodsNo
        }
        arr.push(el)
        goodsList.splice(randomIndex, 1)
        count = goodsList.length
      }
      console.log('随机图片数组：', arr)
      console.log('=-----------------------------------------=')
      this.imgList = arr
    },
    getRecommendGoodsList () {
      wx.showLoading({
        title: '正在加载',
        mask: true
      })
      this.$http.get('/action/goods/getRecommendGoodsList').then(res => {
        console.log(res)
        if (res.data) {
          this.goodsList = res.data
        }
        wx.hideLoading()
        wx.stopPullDownRefresh()
        this.getRandomImgList()
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
      })
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
  background-color: #f3f3f3;
  .goodsList-panel {
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    &:after {
      border-bottom: none;
    }
    .header {
      z-index: 1;
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
    .list-content {
      flex: 1;
    }
    .weui-panel__bd {
      padding-top: 10px;
    }
  }
}
</style>
