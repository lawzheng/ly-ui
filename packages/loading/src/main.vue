<template>
 <!-- v-show="showLoading" -->
  <div class="_flex ly-ove" @touchmove.prevent>
    <img class="ly-circle-loading" :src=loadingImg alt="loadingImg">
  </div>
</template>

<script>
export default {
  name: "ly-loading",
  baseName: "Loading",
  props: {
    loadingImg: {
      type: String,
      default: '//image.greenplayer.cn/share/img/playerloading.gif'
    },
    showLoading: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="less" scoped>
.ly-ove {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
}
.ly-circle-loading {
  width: 1.6rem;
  height: 1.6rem;
}
</style>