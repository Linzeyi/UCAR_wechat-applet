<template>
  <span>
    {{getTotalPrice}}
  </span>
</template>

<script>
export default {
  props: {
    goodsList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    getTotalPrice () {
      let totalPrice = 0
      for (let key in this.goodsList) {
        totalPrice += this.goodsList[key].type.price * this.goodsList[key].num
      }
      return totalPrice.toFixed(2)
    }
  }
}
</script>