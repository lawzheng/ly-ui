<template>
  <button 
    class="ly-btn _ellipsis _flex" 
    :class="{disabled: disabled}"
    :type="type"
    :style="{
      backgroundColor: disabled ? disabledColor : bgColor,
      color: color,
      width: width,
      border: border
    }"
    @click.stop="clickButton"
  >
    <slot></slot>
  </button>
</template>

<script>
import common from '@/js/common.js'

export default {
  name: "ly-button",
  baseName: "Button",
  data () {
    return {
      disabledColor: common.disabledColor
    }
  },
  props: {
    type: {
      type: String,
      default: "button"
    },
    bgColor: {
      type: String,
      default: common.mainColor
    },
    border: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: common.whiteColor
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: ''
    }
  },
  methods: {
    clickButton () {
      if (this.disabled) return
      this.$emit('clickButton')
    }
  }
};
</script>

<style lang="less" scoped>
.ly-btn {
  width: 100%;
  height: 0.76rem;
  border-radius: 0.06rem;
  text-align: center;
  font-size: 0.32rem;
  &.disabled {
    &:active {
      opacity: 1;
    }
  }
}
</style>