<template>
  <transition :name="transitionName" @enter="enter">
    <div class="portrait-select-slide overlay" @click="hide">
      <transition name="slidebottom">
        <div class="func-btn" v-show="showFuncBtn">
          <div class="portrait-container" v-if="mode === 0">
            <ul class="default-portrait" v-if="defaultPortraitList.length > 0">
              <li class="def-por-item" v-for="item in defaultPortraitList">
                <img
                  class="def-por"
                  :src="item.url || item.Portrait || item.avatar"
                  @click="selectDefault(item)"
                  alt=""
                />
              </li>
            </ul>
            <div class="portrait-file">
              <span>拍照/相册</span>
              <input
                type="file"
                class="file-input"
                accept="image/*"
                @change="flieChange"
                v-show="!noAlbum"
                @click.stop
              />
              <input
                id="takePic"
                type="file"
                class="file-input"
                accept="image/*"
                capture="camera"
                @change="flieChange"
                ref="takePic"
                v-show="noAlbum"
                @click.stop
              />
            </div>
            <div class="portrait-file" v-show="catchVideo">
              <span>视频</span>
              <input
                type="file"
                class="file-input"
                accept="video/*"
                @change="flieChange"
                v-show="!noAlbum"
              />
              <input
                type="file"
                class="file-input"
                accept="video/*"
                @change="flieChange"
                capture="camcorder"
                v-show="noAlbum"
                ref="takeVideo"
              />
            </div>
            <div class="cancel-slide" @click="$emit('hide')">取消</div>
          </div>
          <!--新样式-->
          <div v-else class="media-btn">
            <div class="btn-list _flex">
              <div
                class="media-btn-list"
                v-for="(item, index) in btnList"
                v-if="index === 0 || (index === 1 && showVideo)"
              >
                <img :src="item.img" alt="" />
                <div class="txt">{{ item.txt }}</div>
                <input
                  type="file"
                  class="file-input"
                  multiple
                  :accept="item.accept"
                  @change="flieChange"
                />
              </div>
            </div>
            <div class="close-btn _flex" @click="hide">
              <img
                src="https://image.greenplayer.cn/share/img/icon/icon_close_white.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </transition>
      <transition name="slidebottom">
        <div
          class="dialog-box overlay"
          @touchmove.prevent
          v-show="showCrop"
          @click="showCrop = false"
        >
          <div class="crop-container">
            <crop-image
              :cropOption="cropOption"
              @crop="crop"
              ref="crop"
              @hideCrop="hideCrop"
            ></crop-image>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
const CropImage = () => import('@/components/common/CropImage')

export default {
  name: "PortraitFile",
  components: { CropImage },
  data() {
    return {
      showCrop: false,
      isVideo: false,
      btnList: [
        {
          img:
            "https://image.greenplayer.cn/share/img/game/minpage/icon_pic.svg",
          txt: "拍照/相册",
          accept: "image/*"
        },
        // {
        //   img: 'https://image.greenplayer.cn/share/img/game/minpage/icon_write.svg',
        //   txt: '写动态'
        // },
        {
          img:
            "https://image.greenplayer.cn/share/img/game/minpage/icon_video.svg",
          txt: "视频",
          accept: "video/*"
        }
      ],
      showFuncBtn: false
    };
  },
  watch: {},
  computed: {
    transitionName() {
      return this.mode === 0 ? "fadein" : "fadein";
    }
  },
  props: {
    defaultPortraitList: {
      default: () => []
    },
    catchVideo: {
      default: false
    },
    cropOption: {
      default: ""
    },
    noAlbum: {
      // 直接调相机拍照，不经过相册
      type: Boolean,
      default: false
    },
    mode: {
      // 0旧样式 1新样式
      type: Number,
      default: 0
    },
    showVideo: {
      // 显示新版的视频按钮
      type: Boolean,
      default: true
    }
  },
  methods: {
    enter() {
      this.showFuncBtn = true;
    },
    hide() {
      // if (this.mode === 0) {
      this.showFuncBtn = false;
      this.$emit("hide");
      // }
    },
    takePic() {
      this.$nextTick(() => {
        console.log(document.getElementById("takePic"));
        document.getElementById("takePic").click();
        // this.$refs.takePic.click()
      });
    },
    takeVideo() {
      this.$nextTick(() => {
        this.$refs.takeVideo.click();
      });
    },
    flieChange(e) {
      console.log("options" + JSON.stringify(this.cropOption));
      if (this.cropOption) {
        let _vm = this;
        _vm.showCrop = true;
        this.showPortraitSelect = false;
        let files = e.target.files || e.srcElement.files;
        var reader = new FileReader();
        reader.onload = (function(file) {
          return function(e) {
            _vm.$refs.crop.changeUrl(this.result);
            // _vm.cropOption.img = this.result
          };
        })(files[0]);
        reader.readAsDataURL(files[0]);
      } else {
        this.upLoadFile(e);
      }
    },
    upLoadFile(e) {
      console.log("*-*-*-*");
      // let _this = this
      // this.showLoading()
      let target = e.target || e.srcElement;
      let files = Array.from(e.target.files || e.srcElement.files);
      files.forEach((item, index) => {
        this.uploadToAli(target, files, index);
      });
    },
    /**
     * 上传去阿里云
     * @param target
     * @param files
     * @param index
     */
    uploadToAli(target, files, index) {
      const _this = this;
      this.showLoading();
      this.$uploadFile(
        files,
        index,
        (res, url, type) => {
          _this.hideLoading();
          console.log("uploadFile:" + url);
          target.value = "";
          this.$emit("hide");
          _this.$emit("change", url, /video+/.test(type));
        },
        err => {
          _this.hideLoading();
          target.value = "";
          if (err.code) {
            _this.showToast(`${err.code}:${err.msg}`);
          } else if (err.data) {
            _this.showToast(`${err.data.code}:${err.data.msg}`);
          } else {
            console.log(err);
            _this.showToast(`上传失败`);
          }
        }
      );
    },
    selectDefault(item) {
      this.$emit(
        "change",
        item.url || item.Portrait || item.avatar,
        this.isVideo
      );
    },
    crop(imgUrl) {
      this.showCrop = false;
      this.$emit("hide");
      this.$emit("change", imgUrl);
    },
    hideCrop() {
      this.showCrop = false;
      this.$emit("hide");
    }
  }
};
</script>

<style lang="less">
.func-btn {
  width: 100%;
  position: absolute;
  bottom: 0;
}
.portrait-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  text-align: center;
  font-size: 0.26rem;
  .default-portrait {
    max-height: 6rem;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    padding: 0.2rem;
    box-shadow: 0 0 1px #a0a0a0;
    .def-por-item {
      float: left;
      width: 25%;
      margin: 0.2rem 0;
    }
    .def-por {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
    }
  }
  .portrait-file {
    position: relative;
    .file-input {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 2;
      opacity: 0;
    }
  }
  .cancel-slide,
  .portrait-file {
    margin: 0.2rem auto;
    width: 6rem;
    height: 0.7rem;
    line-height: 0.7rem;
    border: 1px solid #ddd;
  }
}
.crop-container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
.media-btn {
  width: 100%;
  position: absolute;
  bottom: 0.75rem;
  background-color: transparent;
  .btn-list {
    width: 100%;
    padding: 0 15%;
    .media-btn-list {
      text-align: center;
      width: 1.8rem;
      height: 1.8rem;
      position: relative;
      margin-right: 0.5rem;
      &:last-child {
        margin-right: 0;
      }
      img {
        width: 1.8rem;
        height: 1.8rem;
      }
      .txt {
        font-size: 0.24rem;
        color: #ffffff;
        margin-top: -0.3rem;
      }
      input {
        width: 1.8rem;
        height: 1.8rem;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border-radius: 50%;
        opacity: 0;
      }
    }
  }
  .close-btn {
    text-align: center;
    width: 0.88rem;
    height: 0.88rem;
    margin: 0.7rem auto;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    img {
      width: 0.5rem;
      height: 0.5rem;
    }
  }
}
</style>