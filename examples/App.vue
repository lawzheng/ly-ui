<template>
  <div id="app">

    <ly-input
      v-model="formItem.value"
      :type="formItem.type"
      :id="formItem.id"
      :maxlength="formItem.maxlength"
      :disabled="formItem.disabled"
      :readonly="formItem.readonly"
      :showEye="formItem.showEye"
      :clearable="formItem.clearable"
      :placeholder="formItem.placeholder"
    ></ly-input>

    <ly-form @formSubmit="formSubmit" :formList="formList" :model=model></ly-form>

    <ly-button @click="showLoadings" mode="" style="margin-top: 1rem">default</ly-button>
    <ly-button @click="showLoadings" mode="line" style="margin-top: 0.2rem">line</ly-button>
    <ly-button @click="showLoadings" mode="light" style="margin-top: 0.2rem">light</ly-button>
    <ly-button @click="showLoadings" :disabled="true" style="margin-top: 0.2rem">disabled</ly-button>

    <ly-footer-button :btnList="btnList"></ly-footer-button>

    <ly-loading :showLoading="showLoading"></ly-loading>

    <ly-list-item
      defaultTitle="defaultTitle"
      defaultSubTitle="defaultSubTitle"
      :showArrowType="true"
      :showBtn="true"
    >
    </ly-list-item>
    <ly-list-item 
      :showArrowType="true" 
      :showBtn="true" 
      style="margin-top: 0.2rem"
    >slot</ly-list-item>

    <ly-empty-box>slot</ly-empty-box>

    <ly-swiper-box title="title" :list="list" :num="21" subTitle="subTitle" @clickSubTitle="f1"></ly-swiper-box>
    <ly-tab :navList="navList"></ly-tab>

    
    <ly-nav-tab v-model="curNav" :mode="1" :navList="navList"></ly-nav-tab>
    <ly-button @click="showT">haha</ly-button>
    <ly-button @click="showA">haha</ly-button>

    {{areaData.areaName}}
    {{areaData.areaId}}
    {{areaData.shortName}}
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      areaData: {
        areaName: '',
        areaId: '',
        shortName: ''
      },
      curNav: 0,
      navList: ['tab1', 'tab2', 'tab3'],
      xx: "",
      model: {
        username: "",
        phone: ""
      },
      formItem: {
        title: "真实姓名",
        id: "name",
        modelKey: "username",
        value: "",
        maxlength: 15,
        type: "text",
        disabled: false,
        required: true,
        showEye: {
          open: true,
          reverse: false
        },
        clearable: {
          visible: true,
          blurHidden: true
        },
        placeholder: 'haha'
      },
      formList: [
        {
          legend: "基础",
          fields: [
            {
              label: "input",
              title: "真实姓名",
              id: "name",
              modelKey: "username",
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
              label: "input",
              title: "手机号码",
              id: "phone",
              modelKey: "phone",
              value: "",
              maxlength: 11,
              type: "tel",
              disabled: false,
              rules: [
                { required: true, message: "您的手机号码未输入" },
                {
                  pattern: /^1[3456789]\d{9}$/,
                  message: "您的手机号码输入错误"
                }
              ]
            }
          ]
        },
        {
          fields: [
            {
              label: "button",
              type: "submit",
              value: "submit"
              // fn: this.f1
            },
            {
              label: "button",
              type: "reset",
              value: "reset",
              mode: "line"
            }
          ]
        }
      ],
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
          value: "左按钮",
          fn: this.f1,
          disabled: false
        },
        {
          type: "button",
          bgColor: "red",
          value: "右按钮",
          fn: this.f2,
          width: "2rem"
        }
      ]
    };
  },
  computed: {
    disabled() {
      console.log(111111, this.model.username && this.model.phone);
      return this.model.username && this.model.phone;
    }
  },
  mounted() {
    // console.log(this.showLoading)
  },
  methods: {
    showA () {
      this.showAreaPicker({
        areaData: this.areaData
      })
    },
    showT () {
      this.showToast({
        type: 'success',
        text: '1',
        subText: '2'
      })
    },
    showLoadings() {
      this.showLoading();
      setTimeout(() => {
        this.hideLoading();
      }, 1000);
    },
    formSubmit() {
      console.log(this.model);
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
  position: absolute;
  top: 0;
  bottom: 0;
  /* padding: 0.32rem; */
  background-color: #f6f6f6;
}
</style>
