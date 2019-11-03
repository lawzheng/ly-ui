// 导入组件，组件必须声明 name
import Tab from './src/main'

// 为组件提供 install 安装方法，供按需引入
Tab.install = function(Vue) {
        Vue.component(Tab.name, Tab)
    }
    // 默认导出组件
export default Tab