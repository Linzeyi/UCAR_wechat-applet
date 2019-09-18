<template>
  <swiper class="swiper com-swiper" indicator-dots="true" autoplay="true">
    <block v-for="(item, index) in imgList" :index="index" :key="index">
      <swiper-item>
        <image class="slide-image" :src="item" mode="aspectFill" @click="showImg(item)" />
      </swiper-item>
    </block>
  </swiper>
</template>

<script>
export default {
  props: {
    imgList: {
      type: Array,
      default () {
        return []
      }
    },
    isLink: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  methods: {
    showImg (item) {
      if (this.isLink) {
        mpvue.navigateTo({url: '/pages/goodsDetail/main?goodsId=' + item.goodsId})
      } else {
        wx.previewImage({
          current: item,
          urls: this.imgList
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.com-swiper {
  height: 160px;
  image {
    width: 100%;
  }
}
</style>