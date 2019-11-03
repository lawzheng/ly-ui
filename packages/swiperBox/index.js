// 导入组件，组件必须声明 name
import SwiperBox from './src/main'

// 为组件提供 install 安装方法，供按需引入
SwiperBox.install = function(Vue) {
        Vue.component(SwiperBox.name, SwiperBox)
    }
    // 默认导出组件
export default SwiperBox