<template>
  <transition name="fadein">
    <div class="ly-toast-main _point-events-none">
      <div class="toast" v-if="!type">
        <span class="toast-text">{{text}}</span>
      </div>
      <div class="toast-type _flex" v-if="type">
        <div class="toast-box _flex-column">
          <img :src="toastImg" alt class="toast-img" />
          <span class="toast-text _ellipsis2">{{text}}</span>
          <span class="toast-sub-text _ellipsis2" v-if="subText">{{subText}}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ly-toast",
  data() {
    return {};
  },
  props: {
    text: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: '',
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['', 'success', 'warning', 'error'].indexOf(value) !== -1
      }
    },
    subText: {
      type: String,
      default: ''
    }
  },
  computed: {
    toastImg() {
      switch (this.type) {
        case "success":
          return "//image.greenplayer.cn/share/img/icon/icon_success.svg";
        case "error":
          return "//image.greenplayer.cn/share/img/icon/icon_error.svg";
        case "warning":
          return "//image.greenplayer.cn/share/img/icon/icon_warning.svg";
        default:
          return "";
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
      font-size: 0.28rem;
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