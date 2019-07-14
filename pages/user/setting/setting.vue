<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">设置</block>
		</cu-custom>
		<view class="cu-list menu ">
			<view class="cu-item arrow">
				<view class="content">
					<text class="">常见问题</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">
					<text class="">关于我们</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">
					<text class="">问题反馈</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">
					<text class="">客服电话</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">15051820077</text>
				</view>
			</view>
		</view>
		<view class="margin-top-xl text-center">
			<button class="cu-btn bg-red lg" style="width: 50%;" @tap="loginOut">退出登录</button>
		</view>
	</view>
</template>
this.$store.commit('login')
<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			
			loginOut() {
				uni.showLoading({
					title: '退出登录中',
					mask: false
				});
				this.$store.commit('logout')
				uni.navigateTo({
					url: '../../login/login',
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
