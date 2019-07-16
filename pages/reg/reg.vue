<template>
	<view class="home">
		<form>
			<view class="padding text-xl">注册代理人</view>
			<view class="cu-form-group margin-top">
				<view class="title">姓名</view>
				<input type="text" name="userName" v-model="accountInfo.userName" placeholder="请输入真实姓名"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号</view>
				<input type="text" v-model="accountInfo.mobile" @blur="checkUserMobile()" placeholder="请输入手机号"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">验证码</view>
				<m-input type="text" v-model="code" placeholder="请输入验证码"></m-input>
				<button class="cu-btn bg-blue sm" :disabled="btnDis" @tap="sendCode">{{btnText}}</button>
			</view>
			<view class="cu-form-group ">
				<view class="title">登录账号</view>
				<input type="text" v-model="accountInfo.loginName" @blur="checkLoginName()" placeholder="请输入登录账号"></input>
			</view>
			<view class="cu-form-group ">
				<view class="title">密码</view>
				<m-input type="password" displayable v-model="accountInfo.loginPwd" placeholder="请输入密码"></m-input>
			</view>
			<view class="cu-form-group ">
				<view class="title">邀请码</view>
				<input type="text" :value="inviteCode" disabled="true"></input>
			</view>
			<view class="btn-row">
				<button class="cu-btn bg-blue lg" @tap="register">下一步</button>
			</view>
			<view class="text-right padding-right padding-top-sm">已有账号，<text class="text-blue" @tap="toLogin">去登录</text></view>
		</form>

	</view>
</template>

<script>
	var graceChecker = require("../../comment/graceChecker.js");
	import service from '../../service.js';
	import mInput from '../../components/m-input.vue';
	import util from '../../comment/similar.js'
	export default {
		components: {
			mInput
		},
		data() {
			return {
				btnDis: false,
				submitBtnDis: false,
				btnText: '获取验证码',
				inviteCode: 0,
				accountInfo: {
					loginName: '',
					loginPwd: '',
					mobile: '',
					userName: '',
					parentId: '',
				},
				code: '',
				resultCode: '',
				stat: false,
				mobileStat: false
			}
		},
		methods: {
			toLogin() {
				uni.navigateTo({
					url: '../login/login',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			register() {
				if (this.stat) {
					uni.showToast({
						icon: 'none',
						title: '用户名已存在'
					});
					return;
				}
				if (this.mobileStat) {
					uni.showToast({
						icon: 'none',
						title: '手机号已存在'
					});
					return;
				}
				if (this.resultCode == '') {
					uni.showToast({
						icon: 'none',
						title: '请先获取验证码'
					});
					return;
				}
				if (this.code == '') {
					uni.showToast({
						icon: 'none',
						title: '验证码不能为空'
					});
					return;
				} else if (this.code != this.resultCode) {
					uni.showToast({
						icon: 'none',
						title: '验证码不正确'
					});
					return;
				}

				if (this.accountInfo.userName.length < 2 || !util.checkUserName(this.accountInfo.userName)) {
					uni.showToast({
						icon: 'none',
						title: '姓名格式不正确'
					});
					return;
				}

				if (this.accountInfo.loginName.length < 5) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 5 个字符'
					});
					return;
				}
				if (this.accountInfo.loginPwd.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				let param = this.accountInfo
				param.superiorinvitecode = parseInt(this.inviteCode)
				console.log(param);
				this.$http.post(this.$api.registerForWX, param).then((e) => {
					console.log(e);
					if (e.code == 200) {
						uni.showToast({
							title: '注册成功'
						});
						setTimeout(function() {
							uni.navigateTo({
								url: 'regReview/regReview?map=' + JSON.stringify(e.data),
								success: res => {},
								fail: () => {},
								complete: () => {}
							});
						}, 1000);
					} else {
						uni.showToast({
							title: '注册失败，请稍后重试',
							icon: 'none'
						});
					}
				})
			},
			checkLoginName() {
				if (this.accountInfo.loginName < 5) {
					uni.showToast({
						icon: 'none',
						title: '账号不能小于5位'
					});
					return;
				}
				let param = {
					loginName: this.accountInfo.loginName
				}
				this.$http.post(this.$api.checkUserLoginName, param).then((e) => {
					this.stat = e.data
				})
			},
			checkUserMobile() {
				console.log(util.checkMobile(this.accountInfo.mobile));
				if (util.checkMobile(this.accountInfo.mobile)) {
					let param = {
						mobile: this.accountInfo.mobile
					}
					this.$http.post(this.$api.checkUserLoginName, param).then((e) => {
						this.mobileStat = e.data
					})
				} else {
					uni.showToast({
						title: '手机号格式不正确',
						icon: 'none'
					});
					return
				}
			},
			// 发送验证码
			sendCode() {
				if (!util.checkMobile(this.accountInfo.mobile)){
					uni.showToast({
						title: '手机号格式不正确',
						icon: 'none'
					});
					return
				}
				let param = {
					mobile: this.accountInfo.mobile
				}
				this.$http.post(this.$api.getCode, param).then((e) => {
					this.resultCode = e.data
					console.log(e);
					uni.showToast({
						title: '发送成功'
					});
					// 开启倒计时
					this.countDown();
				})
			},

			// 验证码倒计时
			countDown() {
				let t = null;
				let timer = 60;
				this.btnDis = true;
				clearInterval(t);
				this.btnText = `${timer}s`;
				t = setInterval(() => {
					if (timer == 0) {
						clearInterval(t);
						this.btnText = "重新发送";
						this.btnDis = false;
						return;
					}
					timer--;
					this.btnText = `${timer}s`;
				}, 1000)
			}
		},
		onLoad(e) {
			if (e.q) {
				let url = decodeURIComponent(e.q)
				this.inviteCode = util.getQueryString(url, 'invitecode')
				this.accountInfo.parentId = util.getQueryString(url, 'accountId')
			} else {
				this.inviteCode = e.invitecode
				this.accountInfo.parentId = e.accountId
			}

			// let url=decodeURIComponent(e.q)
			// this.inviteCode = util.getQueryString(url,'invitecode')
			// this.accountInfo.parentId = util.getQueryString(url,'accountId')
		}
	}
</script>

<style>
	.home {
		padding-top: 50px;
	}

	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}

	/* #ifdef MP-WEIXIN */
	.cu-form-group .cu-btn {
		width: 350upx
	}

	/* #endif */
</style>
