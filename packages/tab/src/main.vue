<template>
  <div class="ly-dynamic-post overhide _rel">
    <div class="nav-list _flex" id="nav">
      <div
        class="nav-item"
        v-for="(item, index) in navList"
        :key="index"
        @click="changeNav(index)"
      >
        <div class="title" :class="{ selected: curNav === index }">
          {{ item.name }}
        </div>
        <div class="line" v-show="curNav === index"></div>
      </div>
    </div>
    <div
      class="page-group _flex flex-start transition fill"
      :style="{ left: `${translateX}` }"
    >
      <!--动态-->
      <div
        class="page-tab bg-white"
        v-for="(item, index) in navList"
        :key="item.compPath"
      >
        <component
          :is="item.compIntance"
          :propList="item.propList"
          v-if="pageShow[index]"
          v-show="curNav === index"
        />
        <!-- <dynamic
            :propFansClubId="fansInfo.id"
            :propTeamId="fansInfo.teamId"
            :canScroll="canScroll"
          ></dynamic> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ly-tab",
  baseName: "Tab",
  data() {
    return {
      curNav: 0
    };
  },
  props: {
    navList: {
      type: Array,
      default: () => []
    },
    defaultTabIndex: {
      type: Number,
      default: 0
    }
  },
  computed: {
    pageShow() {
      let arr = [];
      this.navList.forEach((item, index) => {
        arr[index] = false;
      });
      arr[this.defaultTabIndex] = true;
      return arr;
    },
    translateX() {
      return `${-this.curNav * 100}%`;
    }
  },
  watch: {
    curNav(val) {
      if (val) {
        if (!this.pageShow[val]) this.pageShow[val] = true;
      }
    }
  },
  created() {
    console.log(this.navList[0].compIntance)
    this.curNav = this.defaultTabIndex;
  },
  methods: {
    componentInstance(item) {
      return () => import(item.compPath);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../public/less/common.less";
.ly-dynamic-post {
  width: 100%;
  height: 100%;
  position: relative;
  .nav-list {
    width: 100%;
    height: 0.98rem;
    background-color: #fff;
    border-bottom: 0.02rem solid #f0f0f0;
    .nav-item {
      height: 100%;
      width: 1.3rem;
      position: relative;
      .title {
        width: 100%;
        height: 0.98rem;
        line-height: 0.98rem;
        font-size: 0.32rem;
        text-align: center;
        color: #b8b8b8;
        &.selected {
          color: #282828;
        }
      }
      .line {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
        margin: auto;
        margin-top: 0.16rem;
        width: 0.48rem;
        height: 0.04rem;
        background: @mainColor;
      }
    }
  }
  .page-group {
    width: 100%;
    height: auto;
    position: absolute;
    top: 0.98rem;
    bottom: 0;
  }
  .page-tab {
    flex: 0 0 100%;
    width: 100%;
    height: 100%;
  }
}
</style>