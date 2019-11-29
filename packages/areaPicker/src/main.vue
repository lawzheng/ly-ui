<template>
  <transition name="fadein">
    <div
      class="ly-overlay ly-dialog-container"
      @touchmove.prevent
      v-show="showContent"
      @click="hideAreaPicker"
    >
      <vue-picker
        v-model="visible"
        :data-items="areaItems"
        @change="onValuesChange"
        ref="vuePicker"
      >
        <div
          class="picker-top-content btn-container _flex border-bottom space-between"
          slot="top-content"
        >
          <div class="simple-container _flex" @click.stop="hideArea">
            <div class="btn">取消</div>
          </div>
          <div class="simple-container _flex" @click.stop="confirmSelect">
            <div class="btn confirm">确定</div>
          </div>
        </div>
      </vue-picker>
    </div>
  </transition>
</template>

<script>
let areas = [];

export default {
  name: "ly-area-picker",
  data() {
    return {
      currentSelect: [],
      areaItems: [{ values: [] }, { values: [] }, { values: [] }],
      visible: false,
      curResult1: {},
      curResult2: {},
      curResult3: {},
      showPicker: false,
      showContent: false
    };
  },
  props: {
    areaData: {
      required: true,
      type: Object
    },
    showAll: {
      // 是否要显示'全部'
      default: true
    },
    showBlank: {
      // 是否要显示'空白'
      default: true
    },
    areaId: {
      default: ""
    }
  },
  watch: {
    areaId() {
      this.initArea();
    },
    areaData(val) {
      if (val) {
        this.areaId = val.areaId;
      }
    }
    // visible(val) {
    //   this.areaData.hideArea(val);
    // }
  },
  mounted() {
    this.utils
      .getScript("//share.greenplayer.cn/share/js/area.min.js")
      .then(() => {
        if (window.area) {
          areas = window.area;
          // 是否要显示全部
          if (!this.showAll) {
            areas.splice(0, 1);
          }
          this.initArea();
        }
      });
  },
  methods: {
    hideAreaPicker() {
      this.visible = false;
      this.showPicker = false;
      this.showContent = false;
    },
    enter() {
      this.showPicker = true;
      this.visible = true;
    },
    initArea() {
      for (var i = 0; i < areas.length; i++) {
        this.areaItems[0].values.push({
          value: areas[i].areaName,
          areaId: areas[i].areaId,
          index: i
        });
      }
      console.log(this.areaItems);
    },
    confirmSelect() {
      // 确定选择
      let p = this.currentSelect[0];
      let c = this.currentSelect[1];
      let a = this.currentSelect[2];
      let areaName = `${p.value} ${c.value} ${a.value}`;
      let shortName = a.value.trim()
        ? a.value
        : c.value.trim()
        ? c.value
        : p.value.trim()
        ? p.value
        : "未知";
      let areaId = a.areaId || c.areaId || p.areaId;
      // this.$set(this.areaData, 'areaName', areaName)
      // this.$set(this.areaData, 'areaId', areaId)
      // this.$set(this.areaData, 'shortName', shortName)
      this.areaData.areaName = areaName;
      this.areaData.areaId = areaId;
      this.areaData.shortName = shortName;
      console.log(areaName, areaId, shortName);
      this.hideAreaPicker();
    },
    onValuesChange(result1, result2, result3) {
      if (this.curResult1 !== result1 && result1 !== undefined) {
        this.areaItems[1].values = [];
        var chileArray = areas[result1.index].children;
        for (var i = 0; i < chileArray.length; i++) {
          this.areaItems[1].values.push({
            value: chileArray[i].areaName,
            areaId: chileArray[i].areaId,
            index: i
          });
        }
      }
      if (this.curResult2 !== result2 && result2 !== undefined) {
        this.areaItems[2].values = [];
        chileArray = areas[result1.index].children[result2.index].children;
        // 添加一个空白项 2018-3-15
        if (this.showBlank) {
          this.areaItems[2].values.push({ value: "", areaId: "", index: 0 });
        }
        for (i = 0; i < chileArray.length; i++) {
          this.areaItems[2].values.push({
            value: chileArray[i].areaName,
            areaId: chileArray[i].areaId,
            index: i + 1
          });
        }
      }
      this.curResult1 = this.currentSelect[0] = result1;
      this.curResult2 = this.currentSelect[1] = result2;
      this.curResult3 = this.currentSelect[2] = result3;
      const arr = Array.from(
        this.$refs.vuePicker.$el.querySelectorAll(".picker-item")
      );
      arr.forEach(item => {
        const i = item.querySelector(".picker-item-content");
        if (i.style.transform === "rotateX(0deg)") {
          i.style.transform = "rotateX(0.01deg)";
          setTimeout(() => {
            i.style.transform = "rotateX(0deg)";
          }, 100);
        }
      });
    },
    hideArea() {
      this.areaData.hideArea(false);
    }
  }
};
</script>

<style>
.picker-item {
  font-size: 0.34rem;
}
</style>
<style lang="less" scoped>
.picker-backdrop {
  background: none;
}
.ly-dialog-container {
  font-size: 0.32rem;
  width: 100%;
  .btn-container {
    width: 100%;
    height: 1rem;
    background-color: #fff;
    .simple-container {
      padding-left: 0.3rem;
      padding-right: 0.3rem;
      height: 100%;
    }
    .btn {
      font-size: 0.32rem;
      line-height: 0.6rem;
      text-align: center;
      width: 1.5rem;
      height: 0.6rem;
      border: 0.02rem solid #969696;
      border-radius: 0.06rem;
      color: #646464;
      &.confirm {
        background: #32b847;
        border: 0;
        color: #fff;
      }
    }
  }
}
</style>