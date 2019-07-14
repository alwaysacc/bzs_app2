<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">详情</block>
		</cu-custom>
		<view>
			<view class="flex padding justify-between align-center solid-bottom">
				<view class="action">
					<view class="cu-avatar round margin-right-xs" :style="imgUrl"></view>
					{{detail.quote_insurance_name}}
				</view>
				<view class="action">
					<text class="text-price text-red">{{detail.total}}</text>
				</view>
			</view>
			<view class="padding-left padding-bottom solid-bottom">
				<view class="margin-top-sm">车牌号码:{{detail.car_number}}</view>
				<view class="margin-top-xs">订单完成时间:{{detail.finish_time}}</view>
				<view class="margin-top-xs">税率:1.06</view>
				<view class="margin-top-xs">商业险保费:{{detail.biz_total}}元</view>
				<view class="margin-top-xs">商业险佣金比率:{{detail.biz_percentage}}%</view>
				<view class="margin-top-xs">商业险佣金:{{detail.biz_cash}}元</view>
				<view class="margin-top-xs">交强险保费:{{detail.force_total}}元</view>
				<view class="margin-top-xs">交强险佣金比率:{{detail.force_percentage}}%</view>
				<view class="margin-top-xs">交强险佣金:{{detail.force_cash}}元</view>
			</view>
			<view class="flex padding justify-between align-center solid-bottom">
				<view class="action">
					佣金合计
				</view>
				<view class="action">
					{{detail.force_cash+detail.biz_cash}}元
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl:'',
				detail: []
			}
		},
		methods: {

		},
		onLoad(e) {
			this.detail = JSON.parse(e.detail)
			console.log(this.detail);
			switch (this.detail.quote_source) {
				case '1':
					this.imgUrl = 'background-image:url(http://bao.91bihu.com/resources/images/quote/tpy.png)'
					break;
				case '2':
					this.imgUrl = 'background-image:url(http://bao.91bihu.com/resources/images/quote/pa.png)'
					break;
				case '4':
					this.imgUrl = 'background-image:url(http://bao.91bihu.com/resources/images/quote/rb.png)'
					break;
			}
		}
	}
</script>

<style>

</style>
