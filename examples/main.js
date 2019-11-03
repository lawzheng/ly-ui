import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

require('@/less/base.less')

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    loading: require('@/img/logo_load_img.svg'), //加载中图片，一定要有，不然会一直重复加载占位图
    error: require('@/img/logo_load_img.svg') //加载失败图片
});

import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */ )


// import common from '@/js/common.js'
// Vue.prototype.common = common

import lyUi from 'packages/index'
Vue.use(lyUi)


new Vue({
    render: h => h(App),
}).$mount('#app')