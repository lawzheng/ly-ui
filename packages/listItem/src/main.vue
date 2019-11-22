<template>
  <div class="ly-content-box _flex space-between" @click="clickItem">
    <div class="content-img" :class="{ radius: imgCircle }">
      <img v-if="lazyLoad" v-lazy="defaultImg" :key="defaultImg" />
      <img v-else :src="defaultImg" />
    </div>
    <div
      v-if="defaultTitle || defaultSubTitle"
      class="content-title _flex-item _flex-column space-between"
    >
      <div class="main-title _ellipsis">
        {{ defaultTitle }}
      </div>
      <div class="sub-title _ellipsis">
        {{ defaultSubTitle }}
      </div>
    </div>
    <slot>
    </slot>
    <div class="content-btn-list _flex" v-if="showBtn">
      <ly-button class="content-btn" mode="line" @click="clickBtn(0)">拒绝</ly-button>
      <ly-button class="content-btn" @click="clickBtn(1)">同意</ly-button>
    </div>
    <div class="arrow" v-if="showArrowType !== 0">
      <div class="ly-icon-right"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ly-list-item",
  baseName: "ListItem",
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    lazyLoad: {
      type: Boolean,
      default: false
    },
    imgCircle: {
      type: Boolean,
      default: true
    },
    defaultImg: {
      type: String,
      default: "//image.greenplayer.cn/share/img/icon_default_portrait.svg"
    },
    defaultTitle: {
      type: String,
      default: ""
    },
    defaultSubTitle: {
      type: String,
      default: ""
    },
    showArrowType: {
      type: Boolean,
      default: false
    },
    showBtn: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clickItem() {
      this.$emit("clickItem", this.item);
    },
    clickBtn(status) {
      this.$emit("clickBtn", this.item, status);
    }
  }
};
</script>

<style lang="less" scoped>
@import url(../../../public/less/common.less);
.ly-content-box {
  width: 100%;
  background-color: #fff;
  padding: 0.15rem 0.2rem 0.2rem;
  font-size: 0.32rem;
  .content-img {
    width: 0.94rem;
    height: 0.94rem;
    position: relative;
    &.radius {
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    img {
      width: 0.72rem;
      height: auto;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .content-title {
    padding: 0 0.22rem;
    .main-title {
      font-size: 0.34rem;
      padding-bottom: 0.15rem;
      line-height: 1.2;
    }
    .sub-title {
      font-size: 0.26rem;
      color: #7e8185;
      line-height: 1.2;
    }
  }
  .content-btn-list {
    .content-btn {
      width: 1.34rem;
      height: 0.64rem;
      &:first-child {
        margin-right: 0.16rem;
      }
    }
    .content-btn-green {
      color: #ffffff;
      background-color: @mainColor;
      border: solid 0.02rem @mainColor;
    }
  }
  .arrow {
    padding-left: 0.1rem;
  }
}
</style>