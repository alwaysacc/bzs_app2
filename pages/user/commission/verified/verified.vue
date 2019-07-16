<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText" @tap="BackPage">返回</block>
			<block slot="content">实名认证</block>
		</cu-custom>
		<view class="center">
			<view class="padding text-center solids-bottom" v-if="isShow">
				<view>
					<text class="">请输入本人真实身份证信息，一经上传无法修改 </text>
				</view>
			</view>
			<view v-if="isShow">
				<view class="">
					<view class="text-center" :data-url="img">
						<image :src="frontList != '' ? frontList[0] : '../../../../static/img/front.jpg'" @tap="showModal(0)" data-target="bottomModal"
						 mode="aspectFit"></image>
					</view>
					<!-- <view class="text-center">上传身份证头像面</view> -->
				</view>
				<view class="">
					<view class="text-center">
						<image :src="backList != '' ? backList[0] : '../../../../static/img/back.jpg'" @tap="showModal(1)" data-target="bottomModal"
						 mode="aspectFit"></image>
						<!-- <view class="text-center">上传身份证国徽面</view> -->
					</view>
				</view>
				<neil-modal :show="show" @close="closeModal" :show-cancel="false" :showConfirm="false">
					<view class="input-view text-left">
						<view class="input-view">
							<view class="input-name" @tap="choose(1)">拍摄</view>
							<view class="input-password" @tap="choose(0)">从相册上传</view>
						</view>
					</view>
				</neil-modal>
			</view>
			<view v-else>
				<view class="padding text-center solids-bottom" v-if="verifiedStat">
					<view>
						<text class="">已上传，待审核</text>
					</view>
				</view>

				<view v-else>
					<view class="padding text-center solids-bottom">
						<view>
							<text class="">认证通过</text>
						</view>
					</view>
					<form>
						<view class="cu-form-group">
							<view class="title">姓名</view>
							<input type="text" v-model="userName" disabled placeholder="请输入真实姓名" />
						</view>
						<view class="cu-form-group solids-bottom">
							<view class="title">身份证号</view>
							<input type="text" v-model="idCard" disabled placeholder="请输入身份证号" />
						</view>
					</form>
				</view>

			</view>
		</view>
		<view class="head padding text-center align-center justify-center solid-bottom solids-top margin-top" v-if="isShow">
			<button class="cu-btn lg bg-blue" style="width: 50%;" @tap="submitImg">确认提交</button>
		</view>
	</view>
</template>

<script>
	import neilModal from '@/components/neil-modal/neil-modal.vue';
	import util from '../../../../comment/similar.js';
	import {
		mapState
	} from 'vuex';
	export default {
		computed: mapState(['user']),
		components: {
			neilModal
		},
		data() {
			return {
				userName: '',
				idCard: '',
				isShow: true,
				u: '',
				img: '../../../../static/img/fornt.jpg',
				frontList: '',
				backList: '',
				show: false,
				direction: false,
				backPath: '',
				frontPath: '',
				loading: true,
				verifiedStat: true
			};
		},
		methods: {
			submitImg() {
				if (this.frontPath == '') {
					uni.showToast({
						title: '请选择头像面图片',
						icon: 'none'
					});
					return;
				}
				if (this.backPath == '') {
					uni.showToast({
						title: '请选择国徽面图片',
						icon: 'none'
					});
					return;
				}
				let stat = 0;
				uni.uploadFile({
					url: this.$http.base + this.$api.accountVerified,
					filePath: this.frontPath,
					name: 'file',
					formData: {
						accountId: this.user.accountId,
						type: 0
					},
					success: uploadFileRes => {
						if (JSON.parse(uploadFileRes.data).code == 200) {
							stat += 1
							if (stat == 2) {
								uni.showToast({
									title: '上传成功'
								});
								setTimeout(function() {
									uni.navigateBack({
										delta: 1
									});
								}, 1000);
							}
						} else {
							uni.showToast({
								title: '上传失败，请稍后重试'
							});
						}
					}
				});
				uni.uploadFile({
					url: this.$http.base + this.$api.accountVerified,
					filePath: this.backPath,
					name: 'file',
					formData: {
						accountId: this.user.accountId,
						type: 1
					},
					success: uploadFileRes => {
						if (JSON.parse(uploadFileRes.data).code == 200) {
							stat += 1
							if (stat == 2) {
								uni.showToast({
									title: '上传成功'
								});
								setTimeout(function() {
									uni.navigateBack({
										delta: 1
									});
								}, 1000);
								
							}
						} else {
							uni.showToast({
								title: '上传失败，请稍后重试'
							});
						}
					}
				});
			},
			getVerifiedStatById() {
				let param = {
					accountId: this.user.accountId
				}
				this.$http.post(this.$api.getVerifiedStatById, param).then(e => {
					console.log(e);
					if (e.code == 200) {
						if (e.data.verified_stat == 0) {
							this.isShow = true;
						} else if (e.data.verified_stat == 1) {
							this.isShow = false;
						} else if (e.data.verified_stat == 2) {
							this.isShow = true;
							uni.showModal({
								title: '审核未通过',
								content: e.data.msg,
								success: function(res) {
									if (res.confirm) {
									} else if (res.cancel) {
									}
								}
							});
						} else if (e.data.verified_stat == 3) {
							this.isShow = false;
							this.verifiedStat=false
							this.userName=e.data.user_name.substr(0, 1) + '**'
							this.idCard=util.handle(e.data.id_card);
						}
					}
				})
			},
			submit() {
				if (!/^[\u4e00-\u9fa5]{2,4}$/.test(this.userName)) {
					uni.showToast({
						title: '姓名格式不正确',
						icon: 'none'
					});
					return;
				}
				if (!util.IdCodeValid(this.idCard)) {
					uni.showToast({
						title: '身份证号格式不正确',
						icon: 'none'
					});
					return;
				}
				let param = {
					accountId: this.user.accountId,
					userName: this.userName,
					idCard: this.idCard
				};
				this.$http.post(this.$api.updateUserIdCard, param).then(e => {
					if (e.code == 200) {
						let u = this.user;
						u.userName = this.userName;
						u.idCard = this.idCard;
						this.$store.commit('SET_USER', u);
						uni.showModal({
							title: '提示',
							content: '提交成功',
							showCancel: false,
							cancelText: '',
							confirmText: '确定',
							success: res => {
								if (res.confirm) {
									uni.navigateBack({
										delta: 1
									});
								} else if (res.cancel) {
									return;
								}
							},
							fail: () => {},
							complete: () => {}
						});
					}
				});
			},
			showModal(e) {
				this.show = true;
				if (e == 0) {
					this.direction = true;
				} else {
					this.direction = false;
				}
			},
			closeModal() {
				this.show = false;
			},
			choose(e) {
				this.closeModal();
				if (this.direction) {
					this.chooseFront(e);
				} else {
					this.chooseBack(e);
				}
			},
			chooseFront(e) {
				let type;
				if (e == 0) {
					type = ['album'];
				} else {
					type = ['camera'];
				}
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: type, //从相册选择
					success: res => {
						this.frontList = res.tempFilePaths;
						this.frontPath = res.tempFilePaths[0];
						/* uni.uploadFile({
							url: 'http://localhost:8082/account/info/accountVerified', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								accountId: this.user.accountId,
								type: 'front'
							},
							success: uploadFileRes => {
								console.log(uploadFileRes.data);
							}
						}); */
					}
				});
			},
			chooseBack(e) {
				let type;
				if (e == 0) {
					type = ['album'];
					console.log(0);
				} else {
					type = ['camera'];
					console.log(1);
				}
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: type, //从相册选择
					success: res => {
						this.backList = res.tempFilePaths;
						this.backPath = res.tempFilePaths[0];
						// let tempFilePaths = res.tempFilePaths;
						/* uni.uploadFile({
							url: 'http://localhost:8082/account/info/accountVerified', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								accountId: this.user.accountId,
								type: 'back'
							},
							success: uploadFileRes => {
								console.log(uploadFileRes.data);
							}
						}); */
					}
					/* success: function(res) {
						console.log(res);
						this.imgList = res.tempFilePaths[0]
						this.img = res.tempFilePaths[0]
						this.imgList='../../../../static/img/back.jpg',
						console.log(this.img);
					} */
				});
			}
		},
		onShow() {
			this.getVerifiedStatById()
		},
	};
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}

	.input-name,
	.input-password {
		height: 80upx;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		position: relative;
		padding-left: 30upx;
		box-sizing: border-box;
	}

	.input-name::after {
		content: ' ';
		position: absolute;
		left: 30upx;
		bottom: 0;
		right: 0;
		height: 1px;
		border-top: 1px solid #e5e5e5;
		transform-origin: 0 0;
		transform: scaleY(0.5);
	}
</style>
