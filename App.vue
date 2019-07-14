<script>
	import Vue from 'vue'
	export default {
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif       
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
		},
	}
</script>

<style>
	/*每个页面公共css */
	/* uni-app默认全局使用flex布局。因为flex布局有利于跨更多平台，尤其是采用原生渲染的平台。如不了解flex布局，请参考http://www.w3.org/TR/css3-flexbox/。如不使用flex布局，请删除或注释掉本行。*/
	@import "colorui/main.css";
	@import "colorui/icon.css";

	html,
	body {
		width: 100%;
		height: 100%;
	}

	body,
	page {
		min-height: 100%;
		display: flex;
		font-size: 32upx;
		display: -webkit-box;
		-webkit-box-orient: vertical;

	}

	.home {
		display: flex;
		height: 100%;
		/* #ifdef H5 */
		height: 100vh;
		/* #endif */
		overflow-y: hidden;
		display: -webkit-flex;
		/* vh 相对于可视区域的高度 */
		min-height: 100vh;
		/* 设置主轴方向 */
		flex-direction: column;
		background-color: #FFFFFF;
	}

	.home1 {
		display: flex;
		overflow-y: hidden;
		display: -webkit-flex;
		/* vh 相对于可视区域的高度 */
		/* 设置主轴方向 */
		flex-direction: column;
		background-color: #FFFFFF;
		height: 100%;
	}

	.center {
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}

	.head {
		height: 120upx;
		display: flex;
		align-items: center;
	}

	.head button {
		font-size: 32upx;
	}

	* {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	/* #ifdef MP-BAIDU */
	page {
		width: 100%;
		height: 100%;
		display: block;

	}

	swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	/* 原生组件模式下需要注意组件外部样式 */
	m-input {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	.input-group {
		background-color: #ffffff;
		margin-top: 40upx;
		position: relative;
	}

	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
		height: 60px;
		align-items: center;
	}

	.input-row .title {
		width: 20%;
		height: 60px;
		min-height: 50upx;
		padding-left: 30upx;
		line-height: 60px;
	}

	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 15upx;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.btn-row {
		display: flex;
		margin-top: 50upx;
		justify-content: center;
		align-items: center
	}

	.btn-row button {
		width: 300upx;
	}

	button.primary {
		background-color: #0faeff;
	}


	@keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}

	@-webkit-keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}
</style>
