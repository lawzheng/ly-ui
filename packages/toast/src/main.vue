<template>
  <transition name="fadein">
    <div class="ly-toast-main _point-events-none" v-show="isToastShow" @click="hide">
      <div class="toast" v-show="!toastType">
        <span class="toast-text">{{toastText}}</span>
      </div>
      <div class="toast-type _flex" v-show="toastType">
        <div class="toast-box _flex-column">
          <img :src="toastImg" alt class="toast-img" />
          <span class="toast-text _ellipsis2">{{toastText}}</span>
          <span class="toast-sub-text _ellipsis2" v-show="toastSubText">{{toastSubText}}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import common from "@/js/common.js";

export default {
  name: "ly-toast",
  data() {
    return {};
  },
  props: {},
  computed: {
    toastImg() {
      switch (this.toastType) {
        case "success":
          return "//image.greenplayer.cn/share/img/icon/icon_success.svg";
        case "error":
          return "//image.greenplayer.cn/share/img/icon/icon_error.svg";
        case "warning":
          return "//image.greenplayer.cn/share/img/icon/icon_warning.svg";
      }
    }
  },
  methods: {
  }
};
</script>

<style lang="less" scoped>
.ly-toast-main {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
}
.toast {
  position: fixed;
  z-index: 99;
  top: 75%;
  left: 0;
  right: 0;
  font-size: 0;
  text-align: center;
  .toast-text {
    display: inline-block;
    font-size: 0.28rem;
    max-width: 80%;
    padding: 0.1rem 0.4rem;
    line-height: 0.4rem;
    color: #fff;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.5);
  }
}
.toast-type {
  width: 100%;
  height: 100%;
  .toast-box {
    width: 2.4rem;
    height: 2.4rem;
    background-color: #3a3a3a;
    border-radius: 0.08rem;
    opacity: 0.9;
    text-align: center;
    color: #ffffff;
    align-items: center;
    .toast-img {
      width: 0.72rem;
      height: 0.72rem;
      margin-bottom: 0.16rem;
    }
    .toast-text {
      max-width: 2rem;
      line-height: 1.2;
    }
    .toast-sub-text {
      max-width: 2rem;
      font-size: 0.24rem;
      line-height: 1.2;
      padding-top: 0.11rem;
      color: #ffffff;
      opacity: 0.56;
    }
  }
}
</style>