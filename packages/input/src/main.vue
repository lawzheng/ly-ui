<template>
  <div
    class="ly-input _rel _flex"
    :class="{
      'show-focus-border': showFocusBorder
    }"
  >
    <input
      class="input-content _flex-item"
      :class="{
        'show-bottom-border': showBottomBorder
      }"
      :value="value"
      :type="inputType"
      :id="id"
      :maxlength="maxlength"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
    />
    <div v-show="showFunc" class="input-func _flex">
      <i
        v-if="showDel && !hideDel && value"
        class="ly-icon-del"
        @click="del"
      ></i>
      <i
        v-if="openEye"
        :class="eyeReverse ? 'ly-icon-eye-close' : 'ly-icon-eye'"
        @click="reverseEye"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "ly-input",
  data() {
    return {
      eyeReverse: false,
      blurHidden: true,
      hideDel: true
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
    },
    id: {
      type: String,
      default: ""
    },
    maxlength: {
      type: Number
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    showEye: {
      default: ""
    },
    clearable: {
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    showBottomBorder: {
      type: Boolean,
      default: false
    },
    showFocusBorder: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    showDel() {
      const type = typeof this.clearable;
      if (type === "boolean") {
        return this.clearable;
      } else if (type === "object") {
        this.blurHidden = this.clearable.blurHidden || false;
        return this.clearable.visible || false;
      } else {
        return false;
      }
    },
    openEye() {
      const type = typeof this.showEye;
      if (type === "boolean") {
        return this.showEye;
      } else if (type === "object") {
        this.eyeReverse = this.showEye.reverse || false;
        return this.showEye.open || false;
      } else {
        return false;
      }
    },
    showFunc() {
      return this.showEye || this.showDel;
    },
    inputType() {
      return this.showEye && this.eyeReverse ? "password" : this.type;
    }
  },
  methods: {
    onBlur() {
      if (this.blurHidden) {
        setTimeout(() => {
          this.hideDel = true;
        }, 16);
      }
    },
    del() {
      this.$emit("input", "");
      // this.$parent.$emit("validate");
    },
    reverseEye() {
      this.eyeReverse = !this.eyeReverse;
    },
    onFocus() {
      if (this.blurHidden) {
        this.hideDel = false;
      }
      this.$emit("onFocus");
    },
    onInput(e) {
      const value = e.target.value;
      this.$emit("input", value);
      // this.$parent.$emit("validate");
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../../public/less/common.less");
.ly-input {
  width: 100%;
  height: 0.8rem;
  background-color: #fff;
  border-radius: 0.05rem;
  border: 0.02rem solid #ffffff;
  &:focus-within {
    &.show-focus-border {
      border: 0.02rem solid @mainColor;
    }
  }
  .input-content {
    width: 100%;
    height: 0.75rem;
    font-size: 0.34rem;
    border: none;
    padding: 0 0.2rem;
    &:disabled {
      background-color: #fff;
    }
    &.show-bottom-border {
      border-bottom: 0.02rem solid #ededee;
    }
  }
  .input-func {
    height: 0.6rem;
    [class*=" ly-icon-"],
    [class^="ly-icon-"] {
      padding: 0 0.2rem;
    }
  }
}
</style>