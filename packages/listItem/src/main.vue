<template>
  <div class="ly-content-box _flex space-between" @click="clickItem">
    <div class="content-img" :class="{ radius: imgCircle }">
      <img v-if="lazyLoad" v-lazy="defaultImg" :key="defaultImg" />
      <img v-else :src="defaultImg" />
    </div>
    <div class="content-title _flex-item _flex-column space-between">
      <div class="main-title _ellipsis">
        {{ defaultTitle }}
      </div>
      <div class="sub-title _ellipsis">
        {{ defaultSubTitle }}
      </div>
    </div>
    <div class="arrow" v-if="showArrowType !== 0">
      <div class="ly-icon-right" v-if="showArrowType === 1"></div>
      <div class="arrow-right-black" v-else-if="showArrowType === 2"></div>
    </div>
    <div class="content-btn-list _flex" v-if="showBtn">
      <ly-button class="content-btn" @clickButton="clickBtn(item, 2)">拒绝</ly-button>
      <ly-button class="content-btn" @clickButton="clickBtn(item, 1)">同意</ly-button>
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
      default: false
    },
    defaultImg: {
      type: String,
      default: '//image.greenplayer.cn/share/img/icon_default_portrait.svg'
    },
    defaultTitle: {
      type: String,
      default: ''
    },
    defaultSubTitle: {
      type: String,
      default: ''
    },
    showArrowType: {
      type: Number,
      default: 0
    },
    showBtn: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clickItem () {
      this.$emit('clickItem')
    },
    clickBtn (content, status) {
      this.$emit('clickBtn', content, status)
    }
  }
};
</script>

<style lang="less" scoped>
@import url(../../../public/less/common.less);
.ly-content-box {
  width: 100%;
  background-color: #fff;
  padding: 0.15rem 0.32rem 0.21rem;
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
      border-radius: 0.06rem;
      border: solid 0.02rem #e3e3e4;
      &:first-child {
        margin-right: 0.16rem;
        background-color: #fff!important;
        color: #000!important;
      }
    }
    .content-btn-green {
      color: #ffffff;
      background-color: @mainColor;
      border: solid 0.02rem @mainColor;
    }
  }
}
</style>