<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">添加账户</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav text-center solid-bottom">
			<view class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in array" :key="index" @tap="tabSelect"
			 :data-id="index">
				{{item}}
			</view>
		</scroll-view>
		<view>
			<form v-if="TabCur==0">
				<view class="cu-form-group margin-top">
					<view class="title1">支付宝账号</view>
					<input placeholder="请输入支付宝账号" v-model="amount" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title1">支付宝姓名</view>
					<input placeholder="请输入支付宝姓名" v-model="name" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title1">手机号</view>
					<input placeholder="请输入手机号" name="input"></input>
				</view>
				<view class="cu-form-group solid-bottom">
					<view class="title1">验证码</view>
					<input placeholder="请输入收到的验证码" name="input"></input>
					<button class="bg-green cu-btn" :disabled="btnDis" @tap="sendCode">{{btnText}}</button>
				</view>

			</form>

			<form v-if="TabCur==1">
				<view class="cu-form-group margin-top">
					<view class="title">微信账号</view>
					<input placeholder="请输入微信账号" v-model="amount" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">微信昵称</view>
					<input placeholder="请输入微信昵称" v-model="name" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">手机号</view>
					<input placeholder="请输入手机号" name="input"></input>
				</view>
				<view class="cu-form-group solid-bottom">
					<view class="title">验证码</view>
					<input placeholder="请输入收到的验证码" name="input"></input>
					<button class="bg-green cu-btn" :disabled="btnDis" @tap="sendCode">{{btnText}}</button>
				</view>
			</form>

			<form v-if="TabCur==2">
				<view class="cu-form-group margin-top">
					<view class="title">银行卡号</view>
					<input placeholder="请输入银行卡号" v-model="amount" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">姓名</view>
					<input placeholder="请输入姓名" v-model="name" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">手机号</view>
					<input placeholder="请输入手机号" name="input"></input>
				</view>
				<view class="cu-form-group solid-bottom">
					<view class="title">验证码</view>
					<input placeholder="请输入收到的验证码" name="input"></input>
					<button class="bg-green cu-btn" :disabled="btnDis" @tap="sendCode">{{btnText}}</button>
				</view>
			</form>
		</view>
		<view class="margin-top-xl text-center">
			<button class="margin-top-xl cu-btn bg-blue lg" style="width: 50%;" @tap="save">保存</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		computed: mapState(['user']),
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				array: ['支付宝', '微信', '银行卡'],
				btnDis: false,
				submitBtnDis: false,
				btnText: '获取验证码',
				amount: '',
				name: ''
			}
		},
		methods: {
			save() {
				let param = {
					amount: this.amount,
					name: this.name,
					type: Number(this.TabCur),
					accountId: this.user.accountId
				}
				this.name=''
				this.amount=''
				this.$http.post(this.$api.saveAccount, param).then((e) => {
					console.log(e);
					if (e.code == 200) {
						uni.showToast({
							title: '保存成功',
							icon: 'success'
						});
					} else {
						uni.showToast({
							title: '保存失败',
						});
					}
				})
				console.log(param);
			},
			tabSelect(e) {
				if (e.currentTarget.dataset.id != this.TabCur) {
					this.TabCur = e.currentTarget.dataset.id;
					this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
					this.name = ''
					this.amount = ''
				} 
			},
			// 发送验证码
			async sendCode() {

				/* let checkRes = graceChecker.check(this.params, formRuleConfig.sendCodeRule);
				if (!checkRes) {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
					return;
				}
			
				await this.$apis.getMsgCode({
					type: 0,
					phoneNo: this.params.phoneNo
				}); */

				uni.showToast({
					title: '发送成功'
				});
				// 开启倒计时
				this.countDown();
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
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}

	.cu-form-group .title1 {
		text-align: justify;
		padding-right: 30upx;
		font-size: 30upx;
		position: relative;
		height: 60upx;
		line-height: 60upx;
		min-width: calc(5em + 15px);
	}
</style>
