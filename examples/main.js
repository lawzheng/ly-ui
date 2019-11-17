import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// import common from '@/js/common.js'
// Vue.prototype.common = common

import lyUi from 'packages/index'
Vue.use(lyUi)


new Vue({
    render: h => h(App),
}).$mount('#app')