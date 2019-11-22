<template>
  <form @submit.prevent="formSubmit" @reset.prevent="reset">
    <div class="ly-form-list" v-for="(item, index) in formList" :key="index">
      <div class="legend">{{ item.legend }}</div>
      <div class="ly-form-list-item">
        <ly-form-item
          v-for="(i, x) in item.fields"
          :key="i.label + x"
          :formItem="i"
        ></ly-form-item>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "ly-form",
  props: {
    formList: {
      required: true,
      type: Array
    },
    model: {
      type: Object
    }
  },
  methods: {
    formSubmit() {
      let success = true;
      this.$children.forEach(item => {
        if (item.validator) {
          let status = item.validator();
          if (!status) {
            success = status;
          }
        }
      });
      if (success) {
        if (Object.keys(this.model).length > 0) {
          this.formList.forEach(item => {
            item.fields.forEach(i => {
              if (i.modelKey) {
                this.$set(this.model, i.modelKey, i.value);
              }
            });
          });
        }
        this.$emit("formSubmit");
      }
    },
    reset() {
      this.$children.forEach(item => {
        item.del && item.del();
      });
    }
  }
};
</script>

<style lang="less" scoped>
// @import url("../../../public/less/common.less");
.ly-form-list {
  .legend {
    font-size: 0.34rem;
    padding: 0.1rem 0 0.2rem;
  }
  .ly-form-list-item {
    background-color: #fff;
    padding: 0 0.2rem;
  }
}
</style>