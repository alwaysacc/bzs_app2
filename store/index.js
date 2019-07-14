import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const TOKEN = uni.getStorageSync("token") || "";
const OPENID = uni.getStorageSync("openId") || "";
const USER = uni.getStorageSync("user") || {};
const CUSTOMER_INFO = uni.getStorageSync("customerInfo") || {};
const hasLogin = uni.getStorageSync("hasLogin") || false;

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		token:TOKEN,
		forcedLogin: false,
		hasLogin: hasLogin,
		user: USER,
	},
	mutations: {
		SET_USER: (state, token) => {
			state.user = token
			uni.setStorageSync('user', token);
		},
		SET_TOKEN: (state, token) => {
			state.token = token
			uni.setStorageSync('token', token);
		},
		login(state) {
			state.hasLogin = true;
			uni.setStorageSync('hasLogin', true);
		},
		logout(state) {
			state.hasLogin = false;
			uni.clearStorage()
		}
	}
})

export default store
