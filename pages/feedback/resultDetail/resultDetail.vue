<template>
	<view class="home1">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="false">
			<block slot="backText">返回</block>
			<block slot="content">回复详情</block>
		</cu-custom>
		<view class="center">
			<view class="padding solid-bottom">
				<view class="text-xxl">
					{{map.title}}
				</view>
				<view class="text-gray text-df margin-top-xs">
					{{map.createTime}}
				</view>
			</view>
			<view class="padding">
				{{map.content}}
			</view>
			<view class="padding-bottom-xs bg-gray light"></view>
			<view v-if="map.status==1">
				<view class="padding flex justify-between">
					<view>
						<text class="cuIcon-titles text-red"></text>
						回复内容
					</view>
					<view class="text-gray text-df">回复时间：{{map.updateTime}}</view>
				</view>
				<view class="padding">
					{{map.replyContent}}
				</view>
			</view>
			<view v-else class="padding text-center">
				暂未回复
			</view>
		</view>
	</view>
</template>

<script>
	import util from "@/comment/similar.js"
	export default {
		data() {
			return {
				map: {}
			}
		},
		methods: {

		},
		onLoad(e) {
			this.map = JSON.parse(e.map)
			this.map.updateTime=util.formatDate(this.map.updateTime)
		}
	}
</script>

<style>

</style>
