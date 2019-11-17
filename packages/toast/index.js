// 导入组件，组件必须声明 name
import Toast from './src/main'

// 为组件提供 install 安装方法，供按需引入
Toast.install = function (Vue) {
    Vue.component(Toast.name, Toast)
}
// 默认导出组件
export default Toast