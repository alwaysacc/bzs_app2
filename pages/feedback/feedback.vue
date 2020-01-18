<template>
	<view class="home1">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="false">
			<block slot="backText">返回</block>
			<block slot="content">我要反馈</block>
		</cu-custom>
		<view class="center">
			<form>
				<view class="cu-form-group">
					<view class="title">标题</view>
					<input placeholder="请输入标题,1-50字" v-model="map.title" name="input"></input>
				</view>
				<view class="cu-form-group align-start">
					<view class="title">内容</view>
					<textarea maxlength="1000" style="height: 300rpx;" @input="textareaBInput" placeholder="请输入内容,1000字以内"></textarea>
				</view>
				<view class="cu-form-group">
					<view class="title">姓名</view>
					<input placeholder="" v-model="map.name" type="text"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">电话</view>
					<input placeholder="选填" v-model="map.tel" type="text"></input>
				</view>
			</form>
		</view>
		<view class="padding flex flex-direction solids-top" style="position:fixed;bottom:0rpx;align-content:center;background-color:#ffffff;width:100%;z-index: 10;">
			<button class="cu-btn bg-blue lg" @tap="save()"></text>提交</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		computed: mapState(['user']),
		data() {
			return {
				map:{},
				content: '',
				autoHeight: false
			}
		},
		methods: {
			textareaBInput(e) {
				this.content = e.detail.value
				// if (this.content > 60) {
				// 	this.autoHeight = true
				// } else {
				// 	this.autoHeight = false
				// }
			},
			save(){
				if (this.title == '') {
					uni.showToast({
						title: '标题不能为空',
						icon: 'none'
					});
					return
				}
				if (this.content == '') {
					uni.showToast({
						title: '内容不能为空',
						icon: 'none'
					});
					return
				}
				let param=this.map
				param.content=this.content
				param.createUser=this.user.accountId
				createUser:this.user.accountId
				this.$http.post(this.$api.addFeedback,param).then(e=>{
					if(e.code==200){
						uni.showToast({
							title: '成功',
							icon:'success'
						});
						setTimeout(function() {
							uni.navigateBack({
								delta:1
							})
						}, 1000);
						
					}else{
						uni.showToast({
							title: '请稍后重试',
							icon:'none'
						});
					}
				})
			}
		}
	}
</script>

<style>

</style>
