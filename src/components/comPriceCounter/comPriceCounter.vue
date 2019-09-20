<template>
  <span class="price-counter">{{getPriceCount}}</span>
</template>

<script>
export default {
  props: {
    price: {
      type: Number,
      default () {
        return 0
      }
    },
    num: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  computed: {
    getPriceCount () {
      console.log('价格计算器：' + this.price + 'x' + this.num)
      return (this.price * this.num).toFixed(2)
    }
  }
}
</script>