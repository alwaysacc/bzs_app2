<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">{{map.userName}}</block>
		</cu-custom>
		<view class="padding flex justify-between solid-bottom">
			<view>
				启用账号
			</view>
			<view>
				<switch @change="SetShadow" :checked="map.accountState==0" :class="map.accountState==0?'checked':''" color="#39B54A"></switch>
			</view>
		</view>
		<view class="padding flex justify-between solid-bottom">
			<view>
				登录账号
			</view>
			<view>
				{{map.loginName}}
			</view>
		</view>
		<view class="padding flex justify-between solid-bottom">
			<view>
				登录密码
			</view>
			<view>
				{{map.loginPwd}}
			</view>
		</view>
		<view class="padding text-center margin-top-xl">
			<button class="cu-btn bg-blue lg" style="width: 300upx;" @tap="save">保存</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				map:[],
				stat:''
			}
		},
		methods: {
			SetShadow(){
				if (this.map.accountState==0) {
					this.map.accountState=1
				} else{
					this.map.accountState=0
				}
			},
			save(){
				delete this.map.updatedTime
				delete this.map.createdTime
				delete this.map.loginTime
				delete this.map.loginPwd
				let param=this.map
				this.$http.post(this.$api.update, param).then((e) => {
					console.log(e);
					if (e.code==200) {
						uni.showToast({
							title: '保存成功',
							icon:'success'
						});
					} else{
						uni.showToast({
							title: '保存失败',
							icon:'success'
						});
					}
				})
			}
		},
		onLoad(e) {
			this.map=JSON.parse(e.map)
		}
	}
</script>

<style>

</style>
