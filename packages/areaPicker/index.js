// 导入组件，组件必须声明 name
import AreaPicker from './src/main'

// 为组件提供 install 安装方法，供按需引入
AreaPicker.install = function(Vue) {
        Vue.component(AreaPicker.name, AreaPicker)
    }
    // 默认导出组件
export default AreaPicker