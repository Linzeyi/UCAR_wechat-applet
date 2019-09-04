<template>
  <div @click="clickHandle">
    <com-swiper :imgList="imgList"></com-swiper>
    <div class="weui-panel weui-panel_access goodsList-panel">
      <div class="weui-panel__hd">
        <span class="panel-title">热门推荐</span>
        <span class="more-btn">
          <i class="iconfont icon-more">&#xe601;</i> 更多
        </span>
      </div>
      <div class="weui-panel__bd">
        <goods-grid-list :goodsList="goodsList"></goods-grid-list>
      </div>
    </div>

    <div class="route-option">
      <panel>
        <button class="weui-btn weui-btn_primary" @click="routeTo('switchTab')">switchTab方法跳转，仅适用tabBar页面</button>
      </panel>
      <panel>
        <button class="weui-btn weui-btn_primary" @click="routeTo('redirectTo')">redirectTo方法跳转，次级跳转，无法返回</button>
        </panel>
      <panel>
        <button class="weui-btn weui-btn_primary" @click="routeTo('navigateTo')">navigateTo方法跳转，次级跳转，可返回</button>
      </panel>
      <panel>
        <button class="weui-btn weui-btn_primary">
          <a href="/pages/userCenter/main">a标签跳转，同navigateTo()</a>
        </button>    
      </panel>
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
          name: '商品一',
          src: 'https://images.unsplash.com/photo-1491832541507-17ee9fc8d164?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1566&q=80',
          price: 188
        },
        {
          name: '商品一',
          src: 'https://images.unsplash.com/photo-1491832541507-17ee9fc8d164?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1566&q=80',
          price: 188
        },
        {
          name: '商品一',
          src: 'https://images.unsplash.com/photo-1491832541507-17ee9fc8d164?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1566&q=80',
          price: 188
        },
        {
          name: '商品一',
          src: 'https://images.unsplash.com/photo-1491832541507-17ee9fc8d164?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1566&q=80',
          price: 188
        },
        {
          name: '商品一',
          src: 'https://images.unsplash.com/photo-1491832541507-17ee9fc8d164?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1566&q=80',
          price: 188
        },
        {
          name: '商品一',
          src: 'https://images.unsplash.com/photo-1491832541507-17ee9fc8d164?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1566&q=80',
          price: 188
        },
        {
          name: '商品一',
          src: 'https://images.unsplash.com/photo-1491832541507-17ee9fc8d164?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1566&q=80',
          price: 188
        },
        {
          name: '商品一',
          src: 'https://images.unsplash.com/photo-1491832541507-17ee9fc8d164?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1566&q=80',
          price: 188
        },
        {
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
    routeTo (type) {
      switch (type) {
        case 'switchTab': // switchTab方法由于跳转tabBar的页面
          mpvue.switchTab({ url: '/pages/userCenter/main' })
          break
        case 'redirectTo': // redirectTo方法由于跳转次级页面（关闭当前页，导航栏没有返回键，不显示tabBar）
          mpvue.redirectTo({ url: '/pages/counter/main' })
          break
        case 'navigateTo': // navigateTo方法由于跳转次级页面（保留当前页，不显示tabBar）
          mpvue.navigateTo({ url: '/pages/counter/main' })
          break
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

.route-option {
  text-align: center;
  padding: 1rem;
}
.route-option panel button {
  margin-bottom: 0.4rem;
  font-size: 14px;
}
</style>
