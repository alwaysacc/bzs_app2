<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">今日佣金</block>
		</cu-custom>
		<view class="padding grid col-3 solids-bottom ">
			<view class="text-left">保险公司</view>
			<view class="text-center">代理人佣金</view>
			<view class="text-right">平台补贴</view>
		</view>
		<view class="padding grid col-3 solid-bottom" v-for="item in list">
			<view class="text-left">
				<text v-if="item.source==1">太平洋</text>
				<text v-if="item.source==2">平安</text>
				<text v-if="item.source==4">人保</text>
			</view>
			<view class="text-center">{{item.bizPercentage}}%</view>
			<view class="text-right">{{item.subsidy}}%</view>
		</view>
		<view class="padding text-center solid-bottom bg-blue light">
			交强险佣金：4%
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: {}
			}
		},
		methods: {
			getCommList() {
				let param = {}
				this.$http.post(this.$api.todayCommList, param).then((e) => {
					if (e.code == 200) {
						this.list = e.data.list
					}
				})

			}
		},
		onShow() {
			this.getCommList()
		}
	}
</script>

<style>

</style>
