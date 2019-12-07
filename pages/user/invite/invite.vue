<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">邀请好友</block>
		</cu-custom>
		<view class="center margin-top-xl">
			<view class="text-center margin-top-xl">
				<!-- <tki-qrcode ref="qrcode" icon="../../../static/img/rb.png" :val="val" :size="300" :onval="true" :loadMake="true" @result="qrR" /> -->
				<tki-qrcode ref="qrcode" :val="val" :size="500" :onval="true" :loadMake="true" @result="qrR" />
			</view>
		</view>
		<view class="head padding text-center align-center justify-center solid-bottom solids-top margin-top">
			<button class="cu-btn bg-blue lg" @tap.prevent.stop="saveImage()">保存二维码</button>
		</view>
	</view>
</template>

<script>
	import tkiQrcode from "tki-qrcode/components/tki-qrcode/tki-qrcode.vue"
	import _app from '@/comment/QS-SharePoster/app.js';
	import getSharePoster from '@/comment/QS-SharePoster/QS-SharePoster.js';
	import {
		mapState
	} from 'vuex'
	export default {
		computed: mapState(['user']),
		components: {
			tkiQrcode
		},
		data() {
			return {
				poster: {},
				qrShow: true,
				val: 'https://www.baozhishun.com/register?invitecode=102&accountId=20190703155113178417',
				canvasId: 'default_PosterCanvasId',
				imgUrl: ''
			}
		},
		onLoad() {
			this.val = 'https://www.baozhishun.com/register?invitecode=' + this.user.invitecode + '&accountId=' + this.user.accountId
		},
		methods: {
			qrR(e) {
				this.imgUrl = e
				console.log(e);
			},
			shareFc() {
				this.qrShow = true;
			},
			saveImage() {
				// #ifndef H5
				uni.saveImageToPhotosAlbum({
					filePath: this.imgUrl,
					success(res) {
						_app.showToast('保存成功');
					}
				})
				// #endif
				// #ifdef H5
				_app.showToast('保存了');
				// #endif
			},
			share() {
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 2,
					imageUrl: this.imgUrl,
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});

			},
			hideQr() {
				this.qrShow = false;
			}
		}
	}
</script>

<style>
	.hideCanvasView {
		position: relative;
	}

	.hideCanvas {
		position: fixed;
		top: -99999upx;
		left: -99999upx;
		z-index: -99999;
	}

	.flex_row_c_c {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.modalView {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		outline: 0;
		transform: scale(3);
		perspective: 2500upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all .3s ease-in-out;
		pointer-events: none;
		backface-visibility: hidden;
		z-index: 999;
	}

	.modalView.show {
		opacity: 1;
		transform: scale(1);
		pointer-events: auto;
	}

	.flex_column {
		display: flex;
		flex-direction: column;
	}

	.backgroundColor-white {
		background-color: white;
	}

	.border_radius_10px {
		border-radius: 10px;
	}

	.padding1vh {
		padding: 1vh;
	}

	.posterImage {
		width: 60vw;
	}

	.flex_row {
		display: flex;
		flex-direction: row;
	}

	.marginTop2vh {
		margin-top: 2vh;
	}
</style>
