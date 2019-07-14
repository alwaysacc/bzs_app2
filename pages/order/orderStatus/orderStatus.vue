<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="false" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">订单状态</block>
		</cu-custom>
		<view v-if="info.orderId!=''">
			<view class=" text-xxsl padding-top-sm text-center">
				<text class="cuIcon-roundcheckfill text-green"></text>
			</view>
			<view class="text-center">
				<text class="text-xl">提交成功</text>
			</view>
			<view class="text-center padding-xs">
				<text class="text-lg text-gray">创建成功</text>
			</view>
		</view>
		<view v-if="info.orderId==''">
			<view class=" text-xxsl padding-top-sm text-center">
				<text class="cuIcon-roundclosefill text-red"></text>
			</view>
			<view class="text-center">
				<text class="text-xl">提交成功</text>
			</view>
			<view class="text-center padding-xs">
				<text class="text-lg text-gray">创建失败</text>
			</view>
		</view>
		<view class="padding-bottom-sm bg-grey light"></view>
		<view v-if="info.orderId==''">
			<view class="padding">
				<view class="text-xl">失败原因：</view>
				<text class="margin-top-xs">{{info.message}}</text>
			</view>
		</view>
		<view class="padding-bottom-sm bg-grey light"></view>
		<view class="padding flex justify-between text-xl">
			<button class="cu-btn bg-blue lg" @tap="toHome">返回首页</button>
			<button class="cu-btn bg-blue lg" @tap="toDetail">查看订单详情</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: '',
				show: true,
				orderId:'',
			}
		},
		methods: {
			toHome() {
				uni.reLaunch({
					url: "../../main/main"
				})
			},
			toDetail() {
				uni.navigateTo({
					url: '../orderDetail/orderDetail?orderId='+this.orderId,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		onLoad(e) {
			//console.log(prevPage);
			/* var pages = getCurrentPages();
			var prevPage = pages[pages.length - 2]; //上一个页面
			// #ifdef MP-WEIXIN
			this.dataInfo = prevPage.data.data
			// #endif
			// #ifdef H5
			this.dataInfo = prevPage.data
			// #endif
			//JSON.stringify(e.info) */
			console.log(e);
			this.orderId=e.orderId
			//this.info=JSON.parse(e.info)
		}
	}
</script>

<style>
	button {
		font-size: 32upx;
	}
</style>
