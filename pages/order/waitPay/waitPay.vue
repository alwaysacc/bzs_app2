<template>
	<view :class="loading?'home':''">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">等待支付</block>
		</cu-custom>
		<view class="center" v-if="loading">
			<view class="padding">
				<view>
					<text class="">二维码过期时间:</text>
					<text class="text-red">{{map.quoteInfo.payEndDate}}</text>
				</view>
			</view>
			<view class="padding text-xxl solid-top solid-bottom">
				金额:<text class="text-price text-red text-xxl">{{map.quoteInfo.total}}</text>
			</view>
			<view class="padding solid-bottom">
				<view class="flex margin-bottom-sm justify-between align-center">
					<text class="text-grey">姓名</text>
					<text class="text-grey">{{map.carInfo.licenseOwner}}</text>
				</view>
				<view class="flex margin-bottom-sm justify-between align-center">
					<text class="text-grey">车牌号</text>
					<text class="text-grey">{{map.carInfo.carNumber}}</text>
				</view>
				<view class="flex justify-between align-center">
					<text class="text-grey">缴费通知单号</text>
					<text class="text-grey">{{map.quoteInfo.paymentNotice}}</text>
				</view>
			</view>
			<view class="text-center text-xxl margin-sm">
				微信支付
				<!-- <view  v-if="!show" class="margin-top-xs">
					<view class="cu-avatar xl radius margin-left" :style="val"></view>
				</view> -->

				<view class="qrimg margin-top-xs">
					<!-- <tki-qrcode ref="qrcode" icon="../../../static/img/rb.png" :val="val" :size="300" :onval="true" :loadMake="true" @result="qrR" /> -->
					<tki-qrcode :icon="icon" ref="qrcode" :val="val" :size="300" :onval="true" :loadMake="true" @result="qrR" />
				</view>
			</view>
			<view class="padding bg">
				<text class="text-red">温馨提示：</text>
				<view class="margin-top-sm">1、微信扫一扫识别、付款</view>
				<view>2、保存截图识别二维码付款。</view>
				<view>3、二维码失效后，请刷新支付页面。</view>
				<view>4、如已支付，请点击确认支付。</view>
			</view>
		</view>
		<view class="head padding text-center align-center justify-end solid-bottom solids-top margin-top" v-if="loading">
			<button  class="cu-btn bg-blue lg margin-right" @tap="toHome">返回首页</button>
			<button  class="cu-btn bg-blue lg" @tap="okPay">确认支付</button>
		</view>
	</view>
</template>

<script>
	import uniCountdown from "@dcloudio/uni-ui/lib/uni-countdown/uni-countdown.vue"
	import tkiQrcode from "tki-qrcode/components/tki-qrcode/tki-qrcode.vue"
		import {
		mapState
	} from 'vuex'
	export default {
		computed: mapState(['user']),
		data() {
			return {
				loading: false,
				val: '123123123123213',
				date: '',
				map: [],
				show: false,
				price: '',
				iconsize: 50,
				icon: '',

			}
		},
		methods: {
			okPay() {
				uni.showLoading({
					title: '拼命加载中',
					mask: true
				});
				let param={
					carVin:this.map.carInfo.frameNumber,
					licenseNo:this.map.carInfo.carNumber,
					source:this.map.quoteInfo.quoteSource,
					buid:this.map.quoteInfo.buid,
					bizNo:this.map.quoteInfo.bizNo,
					forceNo:this.map.quoteInfo.forceNo,
					channelId:this.map.quoteInfo.channelId,
					orderId:this.map.orderInfo.orderId,
					quoteId:this.map.quoteInfo.quoteId,
					createBy:this.user.accountId
				}
				this.$http.post(this.$api.WX_GetPayResult, param, 1).then((e) => {
					if(e.code==200){
						uni.showModal({
							title: '提示',
							content: '已确认缴费',
							showCancel: false,
							cancelText: '',
							confirmText: '确定',
							success: res => {
								uni.navigateBack({
									delta:1
								})
							},
							fail: () => {},
							complete: () => {}
						});
					}else{
						uni.showModal({
							title: '提示',
							content: '待缴费!',
							showCancel: false,
							cancelText: '',
							confirmText: '确定',
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
					}
					uni.hideLoading()
				})
			},
			toHome() {
				uni.reLaunch({
					url: "../../home/home"
				})
			},
			orderDetail(e) {
				let t = this
				let param = {
					orderId: e
				}
				this.$http.post(this.$api.getOrderDetail, param, 1).then((e) => {
					if (e.code == 200) {
						switch (e.data.quoteInfo.quoteSource) {
							case '1':
								this.icon = '/static/img/tpy.png'
								break;
							case '2':
								this.icon = '/static/img/pa.png'
								break;
							case '4':
								this.icon = '/static/img/rb.png'
								break;
						}
						this.map = e.data
						this.show = true
						this.val = e.data.quoteInfo.payUrl
					}
					const date = new Date(e.data.orderInfo.createTime)
					const y = date.getFullYear()
					let MM = date.getMonth() + 1
					MM = MM < 10 ? ('0' + MM) : MM
					let d = date.getDate()
					d = d < 10 ? ('0' + d) : d
					let h = date.getHours()
					h = h < 10 ? ('0' + h) : h
					let m = date.getMinutes()
					m = m < 10 ? ('0' + m) : m
					let s = date.getSeconds()
					s = s < 10 ? ('0' + s) : s
					d = d + 3
					this.date = y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
					d = d
					this.map.orderInfo.createTime = y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
					setTimeout(function() {
						uni.hideLoading()
						t.loading = true
					}, 1000)
				})
			},
		},
		created() {
			uni.showLoading({
				title: '拼命加载中',
				mask: true
			});
		},
		onLoad(e) {
			this.orderDetail(e.orderId);
		},
		components: {
			uniCountdown,
			tkiQrcode
		}
	}
</script>

<style>
	.bg {
		background-color: #F8F8F8;
	}

	.cu-avatar.xl {
		width: 300upx;
		height: 300upx;
	}
</style>
