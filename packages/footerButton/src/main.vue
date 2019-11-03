<template>
  <footer class="ly-footer-btn _flex">
    <div class="ly-btn-item"
      v-for="item in btnList"
      :key="item.value"
      :style="{width: item.width}"
    >
      <ly-button
        :type="item.type"
        :color="item.color"
        :bgColor="item.bgColor"
        :disabled="item.disabled"
        :width="item.width"
        @clickButton="item.fn ? item.fn() : ''"
      >{{item.value}}</ly-button>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'ly-footer-button',
  baseName: "FooterButton",
  props: {
    btnList: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="less" scoped>
.ly-footer-btn {
  width: 100%;
  height: 1.16rem;
  padding: .2rem .32rem;
  background-color: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  .ly-btn-item {
    width: 100%;
    margin-left: 0.2rem;
    &:first-child {
      margin-left: 0;
    }
  }
}
</style>