<template>
  <div class="ly-swiper-box">
    <div class="list-title _flex space-between" @click="clickTitle">
      <div class="title-name _flex-item _flex flex-start">
        {{ title }}
        <div v-if="+num > 0">（{{ num }}）</div>
      </div>
      <div
        class="_flex"
        @click.stop="clickSubTitle"
      >
        <div 
          v-if="subTitle" 
          class="ly-btn-text" 
          :style="{color: subTitleColor}"
        >
          {{ subTitle }}
        </div>
        <i
          v-if="showArrow"
          :style="{ color: subTitleColor }"
          class="ly-icon-right"
        ></i>
      </div>
    </div>
    <slot>
      <swiper 
        class="nav-list" 
        :options="Object.keys(swiperOption).length > 0 ? swiperOption : pageOption">
        <swiper-slide
          class="nav-item"
          v-for="(item, index) in list"
          :key="'swiperBox' + index"
          @click="clickItem(item, index)"
        >
          <div class="nav-item-img">
            <div class="nav-item-img-content active">
              <img v-lazy="item.img" :key="index" />
            </div>
          </div>
          <p class="_ellipsis">
            {{ item.name }}
          </p>
        </swiper-slide>
      </swiper>
    </slot>
  </div>
</template>

<script>
export default {
  name: "ly-swiper-box",
  baseName: "SwiperBox",
  data() {
    const self = this;
    return {
      pageOption: {
        autoplay: false,
        initialSlide: 0,
        slidesPerView: 5.5,
        on: {
          reachEnd() {
            self.$emit("loadMore");
          }
        }
      }
    };
  },
  props: {
    title: {
      type: String,
      default: "",
      required: true
    },
    subTitle: {
      type: String,
      default: ""
    },
    subTitleColor: {
      type: String,
      default: "#b1b2b3"
    },
    showArrow: {
      type: Boolean,
      default: true
    },
    list: {
      type: Array,
      default: () => []
    },
    swiperOption: {
      type: Object,
      default: () => {return {}}
    },
    num: {
      default: ""
    }
  },
  mounted() {},
  methods: {
    clickTitle() {
      if (this.list.length === 0) return;
      this.$emit("clickTitle");
    },
    clickItem(item, index) {
      this.$emit("clickItem", item, index);
    },
    clickSubTitle() {
      this.$emit("clickSubTitle");
    }
  }
};
</script>

<style lang="less" scoped>
@mainColor: #3db657;
.ly-swiper-box {
  width: 100%;
  background-color: #fff;
  padding-bottom: 0.1rem;
  .list-title {
    padding: 0.25rem 0.32rem 0.25rem;
    font-size: 0.3rem;
    .title-name {
      justify-content: flex-start;
    }
  }
  .nav-list {
    &::-webkit-scrollbar {
      display: none;
    }
    .nav-item {
      height: 1.8rem;
      padding: 0.1rem 0.1rem 0 0.1rem;
      .nav-item-img {
        width: 1rem;
        height: 1rem;
        margin: 0.15rem auto;
        display: block;
        overflow: hidden;
        .nav-item-img-content {
          width: 90%;
          height: 90%;
          margin: 0 auto;
          overflow: hidden;
          display: flex;
          align-items: center;
          position: relative;
          img {
            width: 100%;
            height: auto;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
          }
          &.active {
            border-radius: 0.08rem;
            border: 0.02rem solid #f5f5f5;
          }
        }
      }
      p {
        font-size: 0.22rem;
        text-align: center;
      }
    }
  }
  .ly-btn-text {
    padding-right: 0.1rem
  }
}
</style>
