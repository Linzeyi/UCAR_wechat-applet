<template>
  <div class="wrap">
    <div class="left-tab">
      <div
        :class="{active: isActive === idx}"
        @click="isActive = idx"
        v-for="(item, idx) in classList"
        :key="item.id"
      ><span>{{item.name}}</span></div>
    </div>
    <div class="right-tab"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: null,
      classList: [
        { id: '1', name: '品类一' },
        { id: '2', name: '品类二' },
        { id: '3', name: '品类三' },
        { id: '4', name: '品类四' }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.active {
  background-color: rgb(200, 200, 200);
  color: aquamarine;
}

.wrap {
  width: 100%;
  height: 100%;
}

.left-tab {
  width: 120px;
  height: 100%;
  text-align: center;
  border-right: 1px solid rgb(200, 200, 200);
  overflow: scroll;

  > div {
    height: 40px;
    border: 1px solid rgb(200, 200, 200);

    > span {
      line-height: 40px;
    }
  }
}
</style>