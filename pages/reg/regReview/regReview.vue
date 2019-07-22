<template>
	<view>
		<view class="home">
			<view class="padding">
				<view class="text-xxsl text-center">
					<text class="cuIcon-timefill text-red"></text>
					<view class="text-xxl text-bold">账号待审核</view>
					<view class="text-df text-gray padding-top">您的账号正在审核中，请耐心等待~~</view>
					<view class="text-df text-gray padding-top-xs">也可直接联系上级代理人:{{map.superior.userName}}({{map.superior.mobile}})</view>
				</view>
				<view class="padding-top solids-bottom"></view>
				<view class="flex justify-between padding-top">
					<text>姓名</text>
					<text>{{map.account.userName}}</text>
				</view>
				<view class="flex justify-between padding-top">
					<text>邀请码</text>
					<text>{{map.account.invitecode}}</text>
				</view>
				<view class="flex justify-between padding-top">
					<text>手机号</text>
					<text>{{map.account.mobile}}</text>
				</view>
				<view class="flex justify-between padding-top">
					<text>代理商</text>
					<text>{{map.account.superior}}</text>
				</view>

				<view class="padding text-center">
					<button class="cu-btn bg-blue lg margin-top-xl" @tap="register">去登录</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				map: [],
			}
		},
		methods: {
			register() {
				uni.navigateTo({
					url: '../../login/login',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		onLoad(e) {
			this.map = JSON.parse(e.map)
		}
	}
</script>

<style>
	.padding button {
		width: 300upx;
	}
</style>
