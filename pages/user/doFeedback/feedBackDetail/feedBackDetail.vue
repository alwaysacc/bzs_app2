<template>
	<view class="home1">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="false">
			<block slot="backText">返回</block>
			<block slot="content">详情</block>
		</cu-custom>
		<view class="center">
			<view class="padding solid-bottom">
				<view class="text-xxl">{{ map.title }}</view>
				<view class="text-gray text-df margin-top-xs">{{ map.createTime }}</view>
			</view>
			<view class="padding">{{ map.content }}</view>
			<view class="padding-bottom-xs bg-gray light"></view>
			<view v-if="map.status == 1">
				<view class="padding flex justify-between">
					<view>
						<text class="cuIcon-titles text-red"></text>
						回复内容
					</view>
					<view class="text-gray text-df">回复时间：{{ map.updateTime }}</view>
				</view>
				<view class="padding">{{ map.replyContent }}</view>
			</view>
			<view v-else>
				<form>
					<view class="cu-form-group align-start">
						<view class="title">回复内容</view>
						<textarea maxlength="200" style="height: 300rpx;" @input="textareaBInput" placeholder="请输入内容,200字以内"></textarea>
					</view>
					<view class="head padding text-center align-center solid-bottom solids-top justify-center ">
						<button class="cu-btn bg-gradual-blue lg" style="width: 50%;" @tap="save">提交</button>
						</view>
				</form>
			</view>
		</view>
	</view>
</template>

<script>
import util from '@/comment/similar.js';
export default {
	data() {
		return {
			map: {},
			content: ''
		};
	},
	methods: {
		textareaBInput(e) {
			this.content = e.detail.value;
		},
		save(){
			if(this.content==''){
				uni.showToast({
					title: '请输入回复内容',
					icon:'none'
				});
				return
			}
			let param={
				id:this.map.id,
				replyContent:this.content,
				status:1
			}
			this.$http.post(this.$api.resultFeedback, param).then(e => {
				console.log(e);
				if(e.code==200){
					uni.showToast({
						title: '回复成功'
					});
					setTimeout(function() {
						uni.navigateBack({
							delta: 1
						});
					}, 1000);
				}
			})
		}
	},
	onLoad(e) {
		this.map = JSON.parse(e.map);
		this.map.updateTime = util.formatDate(this.map.updateTime);
	}
};
</script>

<style></style>
