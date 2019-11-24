// 导入组件，组件必须声明 name
import NavTab from './src/main'

// 为组件提供 install 安装方法，供按需引入
NavTab.install = function (Vue) {
    Vue.component(NavTab.name, NavTab)
}
// 默认导出组件
export default NavTab