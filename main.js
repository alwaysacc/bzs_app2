import Vue from 'vue'
import App from './App'
import store from './store'
import cuCustom from './colorui/components/cu-custom.vue'
// 引入文件
import http from './api/http.js'
import api from './api/api.js'
import xform from './comment/async-validator-uniapp/src/xForm.vue'
import xinput from './comment/async-validator-uniapp/src/xInput.vue'
import xcheckboxGroup from './comment/async-validator-uniapp/src/xCheckboxGroup.vue'
import x from './comment/async-validator-uniapp/src/xCheckbox.vue'
import xradioGroup from './comment/async-validator-uniapp/src/xRadioGroup.vue'
import xradio from './comment/async-validator-uniapp/src/xRadio.vue'
import xpicker from './comment/async-validator-uniapp/src/xPicker.vue'
import xtextarea from './comment/async-validator-uniapp/src/xTextarea.vue'
Vue.component("x-form", xform)
Vue.component("x-input", xinput)
Vue.component("x-checkbox-group", xcheckboxGroup)
// Vue.component("x-checkbox", xcheckbox)
Vue.component("x-radio-group", xradioGroup)
Vue.component("x-radio", xradio)
Vue.component("x-picker", xpicker)
Vue.component("x-textarea", xtextarea)
Vue.component('cu-custom', cuCustom)
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$http = http
Vue.prototype.$api = api.api
App.mpType = 'app'
Vue.prototype.statusBarHeight = uni.getSystemInfoSync().statusBarHeight

const app = new Vue({
	store,
	...App
})
app.$mount()
