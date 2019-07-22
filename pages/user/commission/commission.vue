<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">佣金提现</block>
		</cu-custom>
		<view class="center">
			<view class="padding bg-gradual-blue text-center">
				<view class="flex padding justify-between align-center">
					<view>
						<view class="text-xl">累计收益</view>
						<view class="text-xxl text-red">{{info.commissionTotal+info.drawPercentageTotal}}元</view>
					</view>
					<view>
						<view class="text-xl">余额</view>
						<view class="text-xxl text-red">{{info.balanceTotal}}元</view>
					</view>
					<view>
						<button class="cu-btn bg-white round shadow" @tap="toWithdarw">立即提现</button>
					</view>
				</view>

				<view class="flex justify-between padding-left padding-right">
					<view>佣金:{{info.commissionTotal}}</view>
					<view>提成:{{info.drawPercentageTotal}}</view>
				</view>

			</view>
			<view class="cu-list menu ">			
<!-- 				<view class="cu-item arrow" @tap="todayCommission">
					<view class="content">
						<text class="">今日佣金</text>
					</view>
				</view> -->
				<view class="cu-item arrow" @tap="toVerfied">
					<view class="content">
						<text class="">实名认证</text>
					</view>
				</view>
				<view class="cu-item arrow" @tap="toSetting">
					<view class="content">
						<text class="">提现账户</text>
					</view>
				</view>
				<view class="cu-item arrow" @tap="toCommList">
					<view class="content">
						<text class="">收益记录</text>
					</view>
				</view>
				<view class="cu-item arrow" @tap="toWithdrawList">
					<view class="content">
						<text class="">提现记录</text>
					</view>
				</view>
			</view>

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
				array: ['佣金', '提成'],
				list: [],
				info: ''
			}
		},
		methods: {
			todayCommission(){
				uni.navigateTo({
					url: 'todayCommission/todayCommission',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			toWithdrawList() {
				uni.navigateTo({
					url: 'withdrawAnnal/withdrawAnnal',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			toSetting() {
				uni.navigateTo({
					url: 'amountList/amountList',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			toCommList() {
				uni.navigateTo({
					url: 'commissionList/commissionList',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			toVerfied(){
				uni.navigateTo({
					url: 'verified/verified',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			toWithdarw() {
				if (this.user.idCard == null) {
					uni.showModal({
						title: '提示',
						content: '您还未实名认证，是否去实名认证？',
						showCancel: true,
						cancelText: '取消',
						confirmText: '确定',
						success: res => {
							if (res.confirm) {
								uni.navigateTo({
									url: 'verified/verified',
									success: res => {},
									fail: () => {},
									complete: () => {}
								});
							} else if (res.cancel) {
								return
							}
						},
						fail: () => {},
						complete: () => {}
					});

				} else {
					uni.navigateTo({
						url: '../withdraw/withdraw',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}
			},
			getWithdrowInfo() {
				let param = {
					accountId: this.user.accountId
				}
				this.$http.post(this.$api.getWithdraw, param).then((e) => {
					console.log(e);
					if (e.code == 200) {
						this.info = e.data

					}
				})

			}
		},
		onShow() {
			this.getWithdrowInfo()
		}

	}
</script>

<style>

</style>
