// 导入组件，组件必须声明 name
import FooterButton from './src/main'

// 为组件提供 install 安装方法，供按需引入
FooterButton.install = function(Vue) {
        Vue.component(FooterButton.name, FooterButton)
    }
    // 默认导出组件
export default FooterButton