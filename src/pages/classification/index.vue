<template>
  <div>
    <button @click="navToLogin('/pages/login/main')">登录页</button>
    <button @click="navToLogin('/pages/register/main')">注册页</button>
  </div>
</template>

<script>
export default {
  methods: {
    navToLogin(url) {
      mpvue.navigateTo({url})
    }
  }
}
</script>

<style>

</style>