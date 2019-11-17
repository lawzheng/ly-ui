<template>
  <div class="ly-form-item _flex-column _rel" :class="{'has-input': formItem.value}">
    <label
      class="input-title _flex flex-start"
      :for="formItem.id"
      :class="{'no-required': !formItem.required}"
    >{{formItem.title}}</label>
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
    ></ly-input>
    <p class="err-message">{{errMessage}}</p>
  </div>
</template>

<script>
import common from "@/js/common.js";
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
    }
  },
  mounted() {
    this.$on("validate", this.validator);
  },
  methods: {
    del () {
      this.$refs.lyInput.del()
    },
    inputFocus() {
      this.$emit("inputFocus");
    },
    validator() {
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
          this.errStatus = "";
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../../public/less/common.less");
.ly-form-item {
  width: 100%;
  height: 100%;
  padding-top: 0.25rem;
  &:first-child {
    padding-top: 0;
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
    padding-top: 0.1rem;
  }
}
</style>