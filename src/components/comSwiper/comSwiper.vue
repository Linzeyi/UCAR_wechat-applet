<template>
  <swiper class="swiper com-swiper" indicator-dots="true" autoplay="true">
    <block v-for="(item, index) in imgList" :index="index" :key="index">
      <swiper-item>
        <image class="slide-image" :src="item.url" mode="aspectFill" />
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
    }
  }
}
</script>

<style lang="less" scoped>
.com-swiper {
  height: 140px;
  image {
    width: 100%;
  }
}
</style>