<template>
  <mp-toast
    v-model="$store.state.BaseStore.showToast"
    :type="$store.getters['BaseStore/type']"
    :content="$store.getters['BaseStore/content']"
    :duration="$store.getters['BaseStore/duration']"
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