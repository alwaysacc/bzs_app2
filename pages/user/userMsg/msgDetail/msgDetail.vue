<template>
	<view class="home1">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="false">
			<block slot="backText">返回</block>
			<block slot="content">通知详情</block>
		</cu-custom>
		<view class="margin-sm" v-if="map != ''">
			<view class="bg-white">
				<view class="padding-sm solid-bottom">通知时间：{{ map.createTime }}</view>
				<view class="padding-sm solid-bottom" v-if="map.title">标题：{{ map.title }}</view>

				<view class="padding-top-sm padding-left-sm">通知内容：</view>
				<view class="padding-left-sm padding-right-sm padding-bottom-sm">{{ map.content }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			map: ''
		};
	},
	methods: {
		updateState() {
			let param = {
				id: this.map.id
			};
			this.$http.post(this.$api.updateMessageStatus, param).then(e => {});
		}
	},
	onLoad(e) {
		this.map = JSON.parse(e.map);
		if (this.map.status == 0) {
			this.updateState();
		}
	}
};
</script>

<style></style>
