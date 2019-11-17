require('@/less/base.less')

import VueLazyload from 'vue-lazyload'

import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'

import create from '@/js/create'

// 导入单个组件
import Button from "./button/index"
import FooterButton from "./footerButton/index"
import Loading from "./loading/index"
import Tab from "./tab/index"
import ListItem from "./listItem/index"
import EmptyBox from "./emptyBox/index"
import SwiperBox from "./swiperBox/index"
import Input from "./input/index"
import Form from "./form/index"
import FormItem from "./formItem/index"
import Toast from "./toast/index"

// 以数组的结构保存组件，便于遍历
const components = [
    Button,
    FooterButton,
    Loading,
    Tab,
    ListItem,
    EmptyBox,
    SwiperBox,
    Input,
    Form,
    FormItem,
    Toast
]

// 定义 install 方法
const install = function(Vue) {
    if (install.installed) return
    install.installed = true
    // 遍历并注册全局组件
    components.map(component => {
        Vue.component(component.name, component)
    })
    Vue.use(VueAwesomeSwiper, /* { default global options } */ )
    Vue.use(VueLazyload, {
        loading: require('@/img/logo_load_img.svg'), //加载中图片，一定要有，不然会一直重复加载占位图
        error: require('@/img/logo_load_img.svg') //加载失败图片
    });
    Vue.prototype.$create = create
    // Vue.prototype.showToast = create(Toast)
    const loading = create(Loading)
    Vue.prototype.showLoading = loading.append
    Vue.prototype.hideLoading = loading.remove
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
    // 组件列表
    ...components
}