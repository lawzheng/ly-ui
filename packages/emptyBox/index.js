// 导入组件，组件必须声明 name
import emptyBox from './src/main'

// 为组件提供 install 安装方法，供按需引入
emptyBox.install = function(Vue) {
        Vue.component(emptyBox.name, emptyBox)
    }
    // 默认导出组件
export default emptyBox