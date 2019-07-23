<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">配送信息</block>
		</cu-custom>
		<!-- 		<view class="padding">
			<text>配送方式：</text>
			<view class="margin-top-xs">
				<button class="cu-btn margin-right-xs" :class="stat==1?'line-red':'line-black'" @tap="choice(1)">快递保单</button>
				<button class="cu-btn  margin-right-xs" :class="stat==2?'line-red':'line-black'" @tap="choice(2)">网点配送</button>
				<button class="cu-btn " :class="stat==3?'line-red':'line-black'" @tap="choice(3)">网点自取</button>
			</view>
		</view> -->
		<!-- 		<view class="padding-bottom-xs bg-grey light"></view>
 -->
		<view v-if="stat!=3">
			<view class="cu-form-group margin-top">
				<view class="title">联系人姓名</view>
				<input placeholder="请输入" v-model="info.name"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">联系电话</view>
				<input placeholder="请输入" v-model="info.tel"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">配送地址</view>
				<input placeholder="请输入" v-model="info.address"></input>
			</view>
		</view>
		<view v-if="stat==3">
			<view class="cu-form-group margin-top">
				<view class="title">联系人姓名</view>
				<input v-model="stat" disabled></input>
			</view>
			<view class="cu-form-group">
				<view class="title">联系电话</view>
				<input v-model="stat" disabled></input>
			</view>
			<view class="cu-form-group">
				<view class="title">网点地址</view>
				<input v-model="stat" disabled></input>
			</view>
		</view>
		<view class="head padding text-center align-center justify-center solid-bottom margin-top">
			<button class="cu-btn bg-blue lg" @tap="ok">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				stat: 1,
				info: {
					name: '',
					tel: '',
					address: ''
				}
			}
		},
		methods: {
			onCityClick(e) {
				this.provinceName = e.province.label;
				this.cityName = e.city.label;
				this.countyName = e.county.label;
				this.townName = e.town.label;
				this.togglePopup()
			},
			togglePopup() {
				this.tankuang.close()
			},
			choice(e) {
				this.stat = e
			},
			ok() {
				if (this.info.address == '') {
					uni.showToast({
						title: '地址不能为空',
						icon: 'none'
					});
					return
				}
				if (this.info.name == '') {
					uni.showToast({
						title: '联系人不能为空',
						icon: 'none'
					});
					return
				}
				if (this.info.tel == '') {
					uni.showToast({
						title: '联系电话不能为空',
						icon: 'none'
					});
					return
				}
				var pages = getCurrentPages();
				var currPage = pages[pages.length - 1]; //当前页面
				var prevPage = pages[pages.length - 2]; //上一个页面
				//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
				// prevPage.setData({
				// 	hope_job: "test"
				// })
				// #ifdef MP-WEIXIN
				prevPage.setData({
					info: this.info,
					tag: this.stat
				})
				wx.navigateBack({
					delta: 1
				})
				// #endif
				// #ifdef H5
				prevPage.info = this.info
				prevPage.tag = this.stat
				uni.navigateBack({
					delta: 1
				});
				// #endif
			}
		},
		onShow: function(e) {
			var pages = getCurrentPages();
			var prevPage = pages[pages.length - 2]; //上一个页面
			// #ifdef MP-WEIXIN
			this.info = prevPage.data.info
			this.tag = prevPage.data.tag
			// #endif
			// #ifdef H5
			this.info = prevPage.info
			this.stat = prevPage.tag
			// #endif
		}

	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(5em + 15px);
	}

	.head button {
		width: 50%;
	}
</style>
