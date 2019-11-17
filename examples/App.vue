<template>
  <div id="app">
    <ly-form @formSubmit="formSubmit">
      <ly-form-item v-for="(item, index) in defaultInputList" :formItem="item" :key="index"></ly-form-item>
      <div class="_flex">
        <ly-button type="submit" style="margin-top: 0.2rem;">submit</ly-button>
        <ly-button type="reset" style="margin-top: 0.2rem;">reset</ly-button>
      </div>
    </ly-form>
    <ly-button @clickButton="showLoadings" width="3rem">22</ly-button>
    <!-- <ly-footer-button :btnList="btnList">11</ly-footer-button>
    <ly-loading :showLoading="showLoading"></ly-loading>
    <ly-list-item defaultTitle="11" defaultSubTitle="fwerf" :showArrowType="1" :showBtn="true"></ly-list-item>
    <ly-empty-box></ly-empty-box>
    <ly-swiper-box title="haha" :list="list" :num="1" subTitle="df" @loadMore="f1"></ly-swiper-box>-->
    <!-- <ly-tab :navList="navList"></ly-tab> -->
  </div>
</template>

<script>
const H = () => import("./components/HelloWorld");
export default {
  name: "app",
  data() {
    return {
      xx: "",
      defaultInputList: [
        {
          title: "真实姓名",
          id: "name",
          value: "",
          maxlength: 15,
          type: "text",
          disabled: false,
          required: true,
          rules: [
            { required: true, message: "请输入用户名" },
            { min: 6, max: 10, message: "请输入6~10的用户名" }
          ],
          showEye: {
            open: true,
            reverse: false
          },
          clearable: {
            visible: true,
            blurHidden: true
          }
        },
        {
          title: "手机号码",
          id: "phone",
          value: "",
          maxlength: 11,
          type: "tel",
          disabled: false,
          rules: [
            { required: true, message: "您的手机号码未输入" },
            { pattern: /^1[3456789]\d{9}$/, message: "您的手机号码输入错误" }
          ]
        }
      ],
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
  mounted () {
    // console.log(this.showLoading)
  },
  methods: {
    showLoadings () {
      this.showLoading()
      setTimeout(() => {
        this.hideLoading()
      }, 1000)
    },
    formSubmit(e) {
      console.log(e);
    },
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
  padding: 0.32rem;
}
</style>
