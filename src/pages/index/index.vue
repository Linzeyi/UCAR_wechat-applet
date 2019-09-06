<template>
  <div>
    <com-swiper :imgList="imgList"></com-swiper>
    <div class="weui-panel weui-panel_access goodsList-panel">
      <div class="weui-panel__hd">
        <span class="panel-title">热门推荐</span>
        <span class="more-btn" @click="switchTab('/pages/classification/main')">
          <i class="iconfont icon-more">&#xe601;</i> 更多
        </span>
      </div>
      <div class="weui-panel__bd">
        <goods-grid-list :goodsList="goodsList"></goods-grid-list>
      </div>
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
        },
        {
          url: 'https://images.unsplash.com/photo-1563062067-bb3786dc5855?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
          alt: '4'
        }
      ],
      goodsList: [
        {
          id: 1421,
          name: '商品一',
          src: 'https://images.unsplash.com/photo-1491832541507-17ee9fc8d164?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1566&q=80',
          price: 188
        },
        {
          id: 21,
          name: '商品一',
          src: 'https://images.unsplash.com/photo-1491832541507-17ee9fc8d164?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1566&q=80',
          price: 188
        },
        {
          id: 532,
          name: '商品一',
          src: 'https://images.unsplash.com/photo-1491832541507-17ee9fc8d164?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1566&q=80',
          price: 188
        },
        {
          id: 152,
          name: '商品一',
          src: 'https://images.unsplash.com/photo-1491832541507-17ee9fc8d164?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1566&q=80',
          price: 188
        },
        {
          id: 84,
          name: '商品一',
          src: 'https://images.unsplash.com/photo-1491832541507-17ee9fc8d164?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1566&q=80',
          price: 188
        },
        {
          id: 762,
          name: '商品一',
          src: 'https://images.unsplash.com/photo-1491832541507-17ee9fc8d164?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1566&q=80',
          price: 188
        },
        {
          id: 153,
          name: '商品一',
          src: 'https://images.unsplash.com/photo-1491832541507-17ee9fc8d164?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1566&q=80',
          price: 188
        },
        {
          id: 943,
          name: '商品一',
          src: 'https://images.unsplash.com/photo-1491832541507-17ee9fc8d164?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1566&q=80',
          price: 188
        },
        {
          id: 1136,
          name: '商品一',
          src: 'https://images.unsplash.com/photo-1491832541507-17ee9fc8d164?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1566&q=80',
          price: 188
        }
      ]
    }
  },

  components: {
    comSwiper,
    goodsGridList
  },

  methods: {
    // routeTo (type) {
    //   switch (type) {
    //     case 'switchTab': // switchTab方法由于跳转tabBar的页面
    //       mpvue.switchTab({ url: '/pages/userCenter/main' })
    //       break
    //     case 'redirectTo': // redirectTo方法由于跳转次级页面（关闭当前页，导航栏没有返回键，不显示tabBar）
    //       mpvue.redirectTo({ url: '/pages/goodsDetail/main' })
    //       break
    //     case 'navigateTo': // navigateTo方法由于跳转次级页面（保留当前页，不显示tabBar）
    //       mpvue.navigateTo({ url: '/pages/goodsDetail/main' })
    //       break
    //   }
    // }
    switchTab (url) {
      mpvue.switchTab({ url })
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
.goodsList-panel {
  &:after {
    border-bottom: none;
  }
  .weui-panel__hd {
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
</style>
