<template>
	<view class="home1">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="content">{{title}}</block>
		</cu-custom>
		<view class="padding text-center">
			由于某些原因，此功能暂时关闭。
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:''
			}
		},
		methods: {
			
		},
		onLoad(e) {
			this.title=e.title
		}
	}
</script>

<style>

</style>
