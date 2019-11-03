<template>
  <div class="ly-input _flex">
    <input 
      class="ly-input-item _flex-item" 
      :type="type" 
      :value="value" 
      @input="onInput">
    <div class="ly-input-func">
      
    </div>
  </div>
</template>

<script>
import common from "@/js/common.js";

export default {
  name: "ly-input",
  baseName: "Input",
  data() {
    return {
    };
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    }
  },
  methods: {
    onInput(e) {
      let value = e.target.value;
      this.$emit("input", value);
      this.$parent.$emit("validate");
    }
  }
};
</script>

<style lang="less" scoped>
.ly-input {
  width: 100%;
  height: 0.8rem;
}
</style>