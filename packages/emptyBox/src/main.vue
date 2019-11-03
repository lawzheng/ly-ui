<template>
  <div class="ly-empty-box _flex">
    <div class="ly-empty-content">
      <img :src="imgSrc" alt="" />
      <div>{{ infoText }}</div>
    </div>
  </div>
</template>

<script>
import common from "@/js/common.js";
const IMGLIST = {
  line: "http://image.greenplayer.cn/share/img/icon/mark_brand_goods_empty.png"
};

export default {
  name: "ly-empty-box",
  baseName: "EmptyBox",
  data() {
    return {
      disabledColor: common.disabledColor
    };
  },
  props: {
    infoText: {
      type: String,
      default: "暂无比赛"
    },
    imgType: {
      type: String,
      default: "line"
    }
  },
  computed: {
    imgSrc() {
      return IMGLIST[this.imgType];
    }
  },
  methods: {
  }
};
</script>

<style lang="less" scoped>
.ly-empty-box {
  width: 100%;
  height: 100%;
  text-align: center;
  color: rgba(25, 31, 37, 0.56);
  .ly-empty-content {
    font-size: 0.32rem;
    img {
      height: 1.2rem;
      margin-bottom: 0.2rem;
    }
  }
}
</style>