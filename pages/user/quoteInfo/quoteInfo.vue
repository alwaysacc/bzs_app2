<template>
	<view class="home1">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">报价记录</block>
		</cu-custom>
		<view class="padding solid-bottom text-lg">
			<view class="flex justify-between align-center">
				<view>车牌号</view>
				<view>苏A513</view>
			</view>
			<view class="flex justify-between align-center margin-top-xs">
				<view>交强险起保时间</view>
				<view>2019年5月8日</view>
			</view>
			<view class="flex justify-between align-center margin-top-xs">
				<view>商业险起保时间</view>
				<view>2019年5月8日</view>
			</view>
		</view>
		<view class="cu-list menu ">
			<view class="cu-item arrow" @tap="toOrderList(0)">
				<view class="content flex align-center  padding-bottom-sm padding-top-sm">
					<view class="cu-avatar  round margin-left line-black" style="background-image:url(../../../static/img/tpy.png)"></view>
					<view class="margin-left-sm ">
						<text class="">太平洋车险</text>
						<view class="text-df">
							<text class="text-red">报价失败</text>
							<text class="margin-left text-gray">未核保</text>
						</view>
					</view>
				</view>
				<view class="action">
					<text class="text-grey text-sm">失败原因</text>
				</view>
			</view>
			
			<view class="cu-item arrow" @tap="toOrderList(0)">
				<view class="content flex align-center padding-bottom-sm padding-top-sm">
					<view class="cu-avatar  round margin-left line-black" style="background-image:url(../../../static/img/pa.png)"></view>
					<view class="margin-left-sm ">
						<text class="">平安车险</text>
						<view class="text-df">
							<text class="text-green text-price">3594.00</text>
							<text class="margin-left text-red">核保失败</text>
						</view>
					</view>
				</view>
				<view class="action">
					<text class="text-grey text-sm">失败原因</text>
				</view>
			</view>
			<view class="cu-item arrow" @tap="toOrderList(0)">
				<view class="content flex align-center padding-bottom-sm padding-top-sm">
					<view class="cu-avatar  round margin-left line-black" style="background-image:url(../../../static/img/rb.png)"></view>
					<view class="margin-left-sm ">
						<text class="">人保车险</text>
						<view class="text-df">
							<text class="text-green text-price">3594.00</text>
							<text class="margin-left text-green">核保成功</text>
						</view>
					</view>
				</view>
				<view class="action">
					<text class="text-grey text-sm">报价详情</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
