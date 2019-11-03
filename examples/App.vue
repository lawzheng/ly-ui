<template>
  <div id="app">
    <ly-input v-model="xx"></ly-input>
    {{xx}}
    <!-- <ly-button @clickButton="showLoading = !showLoading" width="3rem">22</ly-button>
    <ly-footer-button :btnList="btnList">11</ly-footer-button>
    <ly-loading :showLoading="showLoading"></ly-loading>
    <ly-list-item defaultTitle="11" defaultSubTitle="fwerf" :showArrowType="1" :showBtn="true"></ly-list-item>
    <ly-empty-box></ly-empty-box>
    <ly-swiper-box title="haha" :list="list" :num="1" subTitle="df" @loadMore="f1"></ly-swiper-box> -->
    <!-- <ly-tab :navList="navList"></ly-tab> -->
  </div>
</template>

<script>
const H = () => import("./components/HelloWorld");
export default {
  name: "app",
  data() {
    return {
      xx: '',
      showLoading: false,
      list: [
        {
          img:
            "http://image.greenplayer.cn/share/img/icon/mark_brand_goods_empty.png",
          name: "11"
        },
        {
          img:
            "http://image.greenplayer.cn/share/img/icon/mark_brand_goods_empty.png",
          name: "11"
        },
        {
          img:
            "http://image.greenplayer.cn/share/img/icon/mark_brand_goods_empty.png",
          name: "11"
        },
        {
          img:
            "http://image.greenplayer.cn/share/img/icon/mark_brand_goods_empty.png",
          name: "11"
        },
        {
          img:
            "http://image.greenplayer.cn/share/img/icon/mark_brand_goods_empty.png",
          name: "11"
        },
        {
          img:
            "http://image.greenplayer.cn/share/img/icon/mark_brand_goods_empty.png",
          name: "11"
        }
      ],
      btnList: [
        {
          type: "button",
          value: "fewfwe",
          fn: this.f1,
          disabled: true
        },
        {
          type: "button",
          bgColor: "red",
          value: "2",
          fn: this.f2,
          width: "2rem"
        }
      ],
      navList: [
        {
          name: "tab1",
          compIntance: H
        }
      ]
    };
  },
  methods: {
    f1() {
      console.log(1111111111);
    },
    f2() {
      console.log(222222);
    }
  }
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
