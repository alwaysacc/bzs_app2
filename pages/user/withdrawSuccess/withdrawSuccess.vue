<template>
	<view class="home1">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText" @tap="BackPage">返回</block>
			<block slot="content">立即提现</block>
		</cu-custom>
		<view class="bg-white text-center ">
			<view class="text-xsl ">
				<text class="cuIcon-roundcheckfill text-blue lg"></text>
			</view>
			<view class="text-xxl text-bold text-black text-center">提现成功</view>
			<view class="flex padding-xs">
				<view class="flex-sub radius text-right">
					提现金额：
				</view>
				<view class="flex-sub  radius text-left">
					￥{{map.money}}
				</view>
			</view>
			<view class="flex padding-xs">
				<view class="flex-sub radius text-right">
					提现账户：
				</view>
				<view class="flex-sub  radius text-left">
					{{map.payAccount.type}}
				</view>
			</view>
			<view class="flex padding-xs">
				<view class="flex-sub radius text-right">
					账号：
				</view>
				<view class="flex-sub  radius text-left">
					{{map.payAccount.amount}}
				</view>
			</view>
			<view class="flex padding-xs">
				<view class="flex-sub radius text-right">
					姓名：
				</view>
				<view class="flex-sub  radius text-left">
					{{map.payAccount.name}}
				</view>
			</view>
			<view class="flex padding-xs">
				<view class="flex-sub radius text-right">
					到账时间：
				</view>
				<view class="flex-sub  radius text-left">
					48小时内
				</view>
			</view>
			<view class="flex padding-xs">
				<view class="flex-sub radius text-right">
					当前余额：
				</view>
				<view class="flex-sub  radius text-left">
					￥{{map.balanceTotal}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				map: {}
			}
		},
		methods: {
			BackPage() {
				uni.navigateBack({
					delta: 2
				});
			}
		},
		onLoad(e) {
			this.map = JSON.parse(e.param)
			console.log(JSON.parse(e.param));
			switch (this.map.payAccount.type) {
				case 0:
					this.map.payAccount.type = '支付宝'
					break;
				case 1:
					this.map.payAccount.type = '微信'
					break;
				case 2:
					this.map.payAccount.type = '银行卡'
					break;
			}
		}
	}
</script>

<style>
	.item {
		display: flex;
		flex-shrink: 0;
		margin-top: 10px;
	}

	.item text:first-child {
		text-align: justify;
		text-align-last: justify;
		width: 160upx;
	}
</style>
