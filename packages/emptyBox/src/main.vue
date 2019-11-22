<template>
  <div class="ly-empty-box _flex">
    <div class="ly-empty-content">
      <img :src="imgSrc" alt="" />
      <div class="ly-empty-content-text">{{ infoText }}</div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import common from "@/js/common.js";
const IMG_LIST = {
  "page": "http://image.greenplayer.cn/share/img/icon/mark_brand_goods_empty.png",
  "person": '//image.greenplayer.cn/share/img/club/minpage/icon_minpage_default_graph.svg'
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
      default: "page",
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ["page", "person"].indexOf(value) !== -1;
      }
    }
  },
  computed: {
    imgSrc() {
      return IMG_LIST[this.imgType];
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
    .ly-empty-content-text {
      padding-bottom: 0.2rem;
    }
  }
}
</style>