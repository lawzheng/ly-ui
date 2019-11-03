// 导入组件，组件必须声明 name
import Loading from './src/main'

// 为组件提供 install 安装方法，供按需引入
Loading.install = function(Vue) {
        Vue.component(Loading.name, Loading)
    }
    // 默认导出组件
export default Loading