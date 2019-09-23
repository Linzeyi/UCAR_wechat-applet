<template>
  <swiper class="swiper com-swiper" indicator-dots="true" autoplay="true" @change="changeImg" display-multiple-items="1" circular="true">
    <block v-for="(item, index) in imgList" :index="index" :key="index">
      <swiper-item>
        <image class="slide-image" :src="isLink ? item.pic : item" mode="aspectFill" @click="showImg(item)" />
      </swiper-item>
    </block>
    <block v-if="imgList.length === 0">
      <swiper-item>
        <image class="slide-image" :src="getDefaultImg" mode="aspectFill" @click="showImg(getDefaultImg)" />
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
  computed: {
    getDefaultImg () {
      return this.Utils.getSwiperDefaultImg()
    }
  },
  methods: {
    changeImg (e) {
      console.log('图片切换', e)
    },
    showImg (item) {
      if (this.isLink) {
        mpvue.navigateTo({url: '/pages/goodsDetail/main?goodsNo=' + item.goodsNo})
      } else {
        wx.previewImage({
          current: item,
          urls: this.imgList.length ? this.imgList : [item]
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.com-swiper {
  height: 160px;
  /deep/ swiper-item {
    padding: 0 10px;
    box-sizing: border-box;
  }
  image {
    background-color: #fff;
    border-radius: 4px;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
}
</style>