<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">确认关系人</block>
		</cu-custom>
		<view class="center">
			<view class="padding bg-yellow light text-center">
				<text class="cuIcon-warn text-red"></text>
				<text class="text-red">请确认关系人信息准备，出单将以此为准。</text>
			</view>
			<view class="cu-form-group solids-bottom">
				<view>
					<text class="cuIcon-title text-red "></text>
					<text class="text-xl">车主信息</text>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">姓名</view>
				<input class="m-input" type="text"  v-model="map.carInfo.licenseOwner"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">证件类型</view>
				<picker @change="PickerChange" :value="map.carInfo.licenseOwnerIdCardType-1" :range="array">
					<view class="uni-input">
						{{array[map.carInfo.licenseOwnerIdCardType-1]}}
						<text class="margin-left cuIcon-right "></text>
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">证件号码</view>
				<input class="m-input" type="text" v-model="map.carInfo.licenseOwnerIdCard"></input>
			</view>
			<view class="padding-bottom-xs bg-grey light"></view>
			<view class="padding solids-bottom flex justify-between align-center">
				<view>
					<text class="cuIcon-title text-red"></text>
					<text class="text-xl">被保险人信息</text>
				</view>

				<view class="flex align-center text-gray">
					被保人与车主一致
					<!-- <radio :class="switchB?'checked':''" :checked="switchB?true:false" @tap="SwitchB" value="A"></radio> -->
					<switch @change="SwitchB" class="margin-left-xs" :class="switchB?'checked':''" :checked="switchB?true:false"></switch>
				</view>
			</view>
			<view v-show="!switchB">
				<view class="cu-form-group solids-bottom">
					<view>
						<text class="cuIcon-title text-red "></text>
						<text class="text-xl">车主信息</text>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title">姓名</view>
					<input class="m-input" type="text"  v-model="map.carInfo.licenseOwner"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">证件类型</view>
					<picker @change="PickerChange" :value="map.carInfo.licenseOwnerIdCardType-1" :range="array">
						<view class="uni-input">
							{{array[map.carInfo.licenseOwnerIdCardType-1]}}
							<text class="margin-left cuIcon-right "></text>
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">证件号码</view>
					<input class="m-input" type="text" v-model="map.carInfo.licenseOwnerIdCard"></input>
				</view>
			</view>
			<view class="padding-bottom-xs bg-grey light"></view>
			<view class="flex padding solids-bottom justify-between">
				<view class="">
					<text class="cuIcon-title text-red"></text>
					<text class="text-xl">投保人信息</text>
				</view>
				<view class="flex align-center text-gray">
					投保人与车主一致
					<switch @change="SwitchA" class="margin-left-xs" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
				</view>
			</view>
			<view v-show="!switchA">
				<view class="cu-form-group solids-bottom">
					<view>
						<text class="cuIcon-title text-red "></text>
						<text class="text-xl">车主信息</text>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title">姓名</view>
					<input class="m-input" type="text"  v-model="map.carInfo.licenseOwner"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">证件类型</view>
					<picker @change="PickerChange" :value="map.carInfo.licenseOwnerIdCardType-1" :range="array">
						<view class="uni-input">
							{{array[map.carInfo.licenseOwnerIdCardType-1]}}
							<text class="margin-left cuIcon-right "></text>
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">证件号码</view>
					<input class="m-input" type="text" v-model="map.carInfo.licenseOwnerIdCard"></input>
				</view>
			</view>
			<view class="padding-bottom-xs bg-grey light"></view>
		</view>
		<view class="head padding text-center align-center justify-center solid-bottom solids-top margin-top">
			<button class="cu-btn bg-blue lg" @tap="next">下一步</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: 0,
				array: ['身份证', '营业执照'],
				switchA: true,
				switchB: true,
				map:[],
			}
		},
		methods: {
			PickerChange(e){
				this.map.carInfo.licenseOwnerIdCardType=e.detail.value+1
			},
			SwitchA(e) {
				this.switchA = e.detail.value
			},
			SwitchB(e) {
				this.switchB = e.detail.value
			},
			next() {
				uni.navigateTo({
					url: '../perfectOrder/perfectOrder?map='+JSON.stringify(this.map),
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
		},
		onLoad(e) {
			var pages = getCurrentPages();
			var prevPage = pages[pages.length - 2]; //上一个页面
			// #ifdef MP-WEIXIN
			this.map = prevPage.data.map
			// #endif
			// #ifdef H5
			this.map = prevPage.map
			// #endif
			console.log(this.map);
		},
		components: {}
	}
</script>

<style lang="scss">
	.cu-form-group .title {
		min-width: calc(5em + 15px);
	}

	.head button {
		width: 50%;
	}
</style>
