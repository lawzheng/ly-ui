// 导入组件，组件必须声明 name
import Upload from './src/main'

// 为组件提供 install 安装方法，供按需引入
Upload.install = function(Vue) {
        Vue.component(Upload.name, Upload)
    }
    // 默认导出组件
export default Upload