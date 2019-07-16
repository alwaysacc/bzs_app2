<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">找回密码</block>
		</cu-custom>
		<form>
			<view class="cu-form-group">
				<view class="title">账号</view>
				<m-input type="text" v-model="accountInfo.loginName" placeholder="请输入账号"></m-input>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号</view>
				<m-input type="text" v-model="accountInfo.mobile" placeholder="请输入手机号"></m-input>
			</view>
			<view class="cu-form-group">
				<view class="title">验证码</view>
				<m-input type="text" v-model="code" placeholder="请输入验证码"></m-input>
				<button class="bg-green cu-btn" :disabled="btnDis" @tap="sendCode">{{btnText}}</button>
			</view>
			<view class="cu-form-group ">
				<view class="title">新密码</view>
				<m-input type="password" displayable v-model="accountInfo.loginPwd" placeholder="请输入新密码"></m-input>
			</view>
		</form>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="findPassword">提交</button>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import mInput from '../../components/m-input.vue';
	import util from '../../comment/similar.js'
	export default {
		components: {
			mInput
		},
		data() {
			return {
				accountInfo: {
					loginName: '',
					loginPwd: '',
					mobile: '',
				},
				code: '',
				btnDis: false,
				submitBtnDis: false,
				btnText: "发送验证码",
				resultCode: '',
			}
		},
		methods: {
			findPassword() {
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
				let param=this.accountInfo
				this.$http.post(this.$api.updatePassWord, param).then((e) => {
					if(e.code==200){
						uni.showToast({
							icon: 'success',
							title: '修改成功'
						});
						setTimeout(function() {
							uni.navigateBack({
								delta:1
							})
						}, 1000)	
					}else{
						uni.showToast({
							icon: 'none',
							title: '失败，请稍后重试'
						});
					}
				})
			},
			// 发送验证码
			async sendCode() {
				if (!util.checkMobile(this.accountInfo.mobile)) {
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
		}
	}
</script>

<style>
	.home {
		padding-top: 80px;
	}

	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}

	/* #ifdef MP-WEIXIN */
	.cu-form-group .cu-btn {
		width: 350upx
	}

	/* #endif */

	.input-row {
		justify-content: center;
		/*水平居中*/
		align-items: center;
		/*垂直居中*/
	}

	.input-row button {
		font-size: 16px;
	}
</style>
