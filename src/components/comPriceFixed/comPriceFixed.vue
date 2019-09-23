<template>
  <span>{{fixedPrice}}</span>
</template>

<script>
export default {
  props: {
    price: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  computed: {
    fixedPrice () {
      return this.price.toFixed(2)
    }
  }
}
</script>