<template>
  <button
    class="ly-btn _ellipsis _flex"
    :class="{
      disabled: disabled,
      'ly-btn-light': mode === 'light' && !disabled,
      'ly-btn-line': mode === 'line' && !disabled
    }"
    :type="type"
    :style="{
      backgroundColor: disabled ? disabledColor : bgColor,
      color: color,
      width: width,
      border: border
    }"
    @click.stop="click"
  >
    <slot></slot>
  </button>
</template>

<script>
import common from "@/js/common.js";

export default {
  name: "ly-button",
  data() {
    return {
      disabledColor: common.disabledColor
    };
  },
  props: {
    type: {
      type: String,
      default: "button",
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ["button", "submit", "reset"].indexOf(value) !== -1;
      }
    },
    bgColor: {
      type: String,
      default: common.mainColor
    },
    border: {
      type: String,
      default: ""
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
      default: ""
    },
    mode: {
      type: String,
      default: "",
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ["", "light", "line"].indexOf(value) !== -1;
      }
    }
  },
  methods: {
    click() {
      if (this.disabled) return;
      this.$emit("click");
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
  &:hover {
    cursor: pointer;
  }
  &.disabled {
    &:active {
      opacity: 1;
    }
  }
  &.ly-btn-line {
    border: 0.02rem solid #e3e3e4;
    background-color: #fff !important;
    color: rgb(102, 102, 102, 102) !important;
  }
  &.ly-btn-light {
    box-shadow: 0 0.02rem 0.06rem rgba(0, 0, 0, 0.1);
    background-color: #fff !important;
    color: rgb(102, 102, 102, 102) !important;
  }
}
</style>