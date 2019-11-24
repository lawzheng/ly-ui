<template>
  <ul class="ly-nav-tab _flex" v-if="mode === 1">
    <li
      v-for="(item, index) in navList"
      :key="index"
      class="nav-item _flex-item _flex"
      :class="{active: curNav === index}"
      @click.stop="changeNav(index)"
    >{{item}}</li>
  </ul>
  <div class="ly-nav-list _flex" v-else-if="mode === 2">
    <div
      class="nav-item"
      v-for="(item, index) in navList"
      :key="index"
      @click.stop="changeNav(index)"
    >
      <div class="title" :class="{'selected' : curNav === index}">{{item}}</div>
      <div class="line" v-show="curNav === index"></div>
    </div>
  </div>
</template>

<script>
import common from "@/js/common.js";

export default {
  name: "ly-nav-tab",
  data() {
    return {};
  },
  model: {
    prop: "curNav",
    event: "changeNav"
  },
  props: {
    curNav: {
      type: Number,
      default: 0
    },
    navList: {
      required: true,
      type: Array,
      default: () => []
    },
    mode: {
      type: Number,
      default: 1
    }
  },
  mounted() {},
  methods: {
    changeNav(index) {
      this.$emit("changeNav", index);
      // this.$emit("input", index);
    }
  }
};
</script>

<style lang="less" scoped>
@mainColor: #3db657;
.ly-nav-tab {
  width: 100%;
  height: 0.88rem;
  background-color: #fff;
  padding: 0 0.2rem;
  .nav-item {
    height: 100%;
    line-height: 1.2;
    font-size: 0.32rem;
    color: #666666;
    border-bottom: 0.04rem solid #ffffff;
    &.active {
      color: @mainColor;
      border-bottom: 0.04rem solid @mainColor;
    }
  }
}
.ly-nav-list {
  width: 100%;
  height: 0.98rem;
  background-color: #fff;
  border-bottom: 0.02rem solid #f0f0f0;
  .nav-item {
    width: auto;
    height: 100%;
    padding: 0 0.2rem;
    position: relative;
    .title {
      width: 100%;
      height: 0.98rem;
      line-height: 0.98rem;
      font-size: 0.32rem;
      text-align: center;
      color: #b8b8b8;
      &.selected {
        color: #282828;
      }
    }
    .line {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 0);
      margin: auto;
      margin-top: 0.16rem;
      width: 60%;
      height: 0.04rem;
      background: @mainColor;
    }
  }
}
</style>