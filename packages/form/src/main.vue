<template>
  <form @submit.prevent="formSubmit" @reset.prevent="reset">
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: "ly-form",
  // provide() {
  //   return {
  //     lyForm: this
  //   };
  // },
  // props: {
  //   model: {
  //     type: Object
  //   },
  //   rules: {
  //     type: Object
  //   }
  // },
  methods: {
    formSubmit () {
      this.$emit('formSubmit')
      console.log(this.$children)
      this.$children.forEach(item => {
        item.validator && item.validator()
      })
    },
    reset () {
      this.$children.forEach(item => {
        item.del && item.del()
      })
    }
  }
};
</script>

<style lang="less" scoped>
// @import url("../../../public/less/common.less");
</style>