<template>
  <div>
    <button @click="navToLogin">登录页</button>
  </div>
</template>

<script>
export default {
  methods: {
    navToLogin() {
      mpvue.navigateTo({ url: '/pages/login/main' })
    }
  }
}
</script>

<style>

</style>