<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">邀请好友</block>
		</cu-custom>
		<view class="center" @tap="seeImage">
			<image style="width: 100%;" :src="url" mode="widthFix" @error="error"></image>
			<!-- <canvas class="_qrCodeCanvas" id="_myQrCodeCanvas" canvas-id="_myQrCodeCanvas" /> -->
			<!-- <view class="text-center margin-top-xl" @tap="seeImage">
				<view class="text-center text-xxl">
					保之顺兼业平台
				</view>
				<view class="padding text-left">是一个省钱投保、兼业赚钱和车辆全方位服务的平台。
					提供：车保询价、拖车、抢修、事故（咨询、定损、维修）等服务，识别或扫描二维码，加入我们您将有意想不到的收获</view>
				<tki-qrcode ref="qrcode" :icon="icon" :val="val" :size="500" :onval="true" :loadMake="true" @result="qrR" />
			</view> -->
			<view class="margin-top-sm text-center">打开图片，长按可保存或发送给好友。</view>
		</view>
		<!-- <view class="head padding text-center align-center justify-center solid-bottom solids-top margin-top"> -->
			<!-- <button class="cu-btn bg-blue lg" @tap.prevent.stop="saveImage()">保存二维码</button> -->
		<!-- </view> -->
	</view>
</template>

<script>
	import tkiQrcode from 'tki-qrcode/components/tki-qrcode/tki-qrcode.vue';
	import _app from '@/comment/QS-SharePoster/app.js';
	import getSharePoster from '@/comment/QS-SharePoster/QS-SharePoster.js';
	import {
		mapState
	} from 'vuex';
	export default {
		computed: mapState(['user']),
		components: {
			tkiQrcode
		},
		data() {
			return {
				url:'http://img.cdn.baozhishun.com/12.png',
				icon: '/static/img/logo.png',
				poster: {},
				qrShow: true,
				val: 'https://www.baozhishun.com/register?invitecode=102&accountId=20190703155113178417',
				canvasId: 'default_PosterCanvasId',
				imgUrl: ''
			};
		},
		onLoad() {
			var d=new Date()
			this.url='http://img.cdn.baozhishun.com/'+this.user.accountId+'-invite.png'+'?'+d.getSeconds()
			console.log(this.url);
		},
		methods: {
			error(e){
				this.val = 'https://www.baozhishun.com/register?invitecode=' + this.user.invitecode + '&accountId=' + this.user.accountId;
				let param={
					url:this.val,
					accountId:this.user.accountId
				}
				this.$http.post(this.$api.genInviteImage, param).then(e => {
					if(e.code==200){
						var d=new Date()
						this.url=e.data+'?'+d.getSeconds()
					}
				});
			},
			seeImage() {
				var a = new Array();
				a.push(this.url);
				uni.previewImage({
					urls: a,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			qrR(e) {
				this.imgUrl = e;
			},
			shareFc() {
				this.qrShow = true;
			},
			saveImage() {
				// #ifndef H5
				uni.downloadFile({
				    url: this.url,
				    success: (res) => {
						console.log(res);
				        if (res.statusCode === 200) {
				            console.log('下载成功');
				        }
				    }
				});
				
				uni.saveImageToPhotosAlbum({
					filePath: this.imgUrl,
					success(res) {
						_app.showToast('保存成功');
					}
				});
				// #endif
				// #ifdef H5
				_app.showToast('保存了');
				// #endif
			},
			share() {
				/* uni.share({
				    provider: "weixin",
				    scene: "WXSceneSession",
				    type: 1,
				    summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				}); */
				uni.share({
					provider: 'weixin',
					scene: 'WXSceneSession',
					type: 2,
					imageUrl: this.imgUrl,
					success: function(res) {
						console.log('success:' + JSON.stringify(res));
					},
					fail: function(err) {
						console.log('fail:' + JSON.stringify(err));
					}
				});
			},
			hideQr() {
				this.qrShow = false;
			}
		}
	};
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
		transition: all 0.3s ease-in-out;
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
