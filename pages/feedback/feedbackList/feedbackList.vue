<template>
	<view class="home1">
		<cu-custom bgColor="bg-bg" :isBack="true" :isCustom="false">
			<block slot="backText">返回</block>
			<block slot="content">我要反馈</block>
		</cu-custom>
		<view class="cu-list menu">
			<view class="cu-item arrow" @tap="toFeedback">
				<view class="content">
					<text class="cuIcon-edit"></text>
					<text class="">我要反馈</text>
				</view>
			</view>
			<view class="cu-item arrow" @tap="toResult">
				<view class="content">
					<text class="cuIcon-text"></text>
					<text class="">反馈回复</text>
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
			toFeedback() {
				uni.navigateTo({
					url: '../feedback',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			toResult() {
				uni.navigateTo({
					url: '../feedbackResult/feedbackResult',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}

		}
	}
</script>

<style>

</style>
