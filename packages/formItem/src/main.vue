<template>
  <div
    class="ly-form-item _flex-column _rel"
    :class="{ 'has-input': formItem.value }"
  >
    <template v-if="formItem.label === 'input'">
      <label
        class="input-title _flex flex-start"
        :for="formItem.id"
        :class="{ 'no-required': !formItem.required }"
        >{{ formItem.title }}</label
      >
      <ly-input
        ref="lyInput"
        v-model="formItem.value"
        :type="formItem.type"
        :id="formItem.id"
        :maxlength="formItem.maxlength"
        :disabled="formItem.disabled"
        :readonly="formItem.readonly"
        :showEye="formItem.showEye"
        :clearable="formItem.clearable"
        :placeholder="formItem.placeholder"
        :showBottomBorder="true"
        :showFocusBorder="false"
      ></ly-input>
      <p class="err-message">{{ errMessage }}</p>
    </template>
    <ly-button
      v-else-if="formItem.label === 'button'"
      :type="formItem.type"
      :mode="formItem.mode"
      :color="formItem.color"
      :bgColor="formItem.bgColor"
      :disabled="formItem.disabled"
      :width="formItem.width"
      @click="formItem.fn ? formItem.fn() : ''"
    >{{ formItem.value }}</ly-button>
  </div>
</template>

<script>
import Schema from "async-validator";

export default {
  name: "ly-form-item",
  data() {
    return {
      errMessage: "",
      errStatus: false
    };
  },
  props: {
    formItem: {
      required: true,
      type: Object,
      default: () => {
        return {};
      }
    },
    modelData: {
      type: String,
      default: ""
    }
  },
  mounted() {
    // this.$on("validate", this.validator);
  },
  methods: {
    del() {
      if (this.formItem.label === 'input') {
        this.$refs.lyInput.del();
      }
    },
    inputFocus() {
      this.$emit("inputFocus");
    },
    validator() {
      if (this.formItem.label !== 'input') return true
      const rules = this.formItem.rules;
      const value = this.formItem.value;
      const id = this.formItem.id;

      // 描述对象
      const descriptor = { [id]: rules };
      const schema = new Schema(descriptor);
      schema.validate({ [id]: value }, errors => {
        if (errors) {
          this.errMessage = errors[0].message;
          this.errStatus = true;
        } else {
          this.errMessage = "";
          this.errStatus = false;
        }
      });
      return !this.errStatus
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../../public/less/common.less");
.ly-form-item {
  width: 100%;
  height: 100%;
  padding: 0.2rem 0 0;
  &:last-child {
    padding-bottom: 0.2rem;
  }
  &:focus-within {
    .input-title {
      font-size: 0.28rem;
      color: @mainColor;
    }
  }
  &.has-input {
    .input-title {
      font-size: 0.28rem;
    }
  }
  .input-title {
    font-size: 0.34rem;
    height: 0.4rem;
    margin-bottom: 0.1rem;
    &::before {
      content: "*";
      display: block;
      margin-top: 0.05rem;
      margin-right: 0.1rem;
      color: #e64340;
    }
    &.no-required {
      &::before {
        display: none;
      }
    }
  }
  .err-message {
    height: 0.42rem;
    font-size: 0.28rem;
    color: #e64340;
    line-height: 1.2;
    padding: 0.05rem 0;
  }
}
</style>