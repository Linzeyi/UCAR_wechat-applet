<template>
  <mp-toast
    v-model="$store.state.UserInfo.showToast"
    :type="$store.getters['UserInfo/type']"
    :content="$store.getters['UserInfo/content']"
    :duration="$store.getters['UserInfo/duration']"
  ></mp-toast>
</template>

<script>
import mpToast from "mpvue-weui/src/toast";
export default {
  components: {
    mpToast
  }
};
</script>