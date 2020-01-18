<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">新增地址</block>
		</cu-custom>
		<view class="tui-addr-box">
			<form :report-submit="true">
				<tui-list-cell :hover="false" padding="0">
					<view class="tui-line-cell">
						<view class="tui-title">收货人</view>
						<input placeholder-class="tui-phcolor" class="tui-input" v-model="bean.userName" placeholder="请输入收货人姓名" maxlength="15" type="text" />
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" padding="0">
					<view class="tui-line-cell">
						<view class="tui-title">手机号码</view>
						<input placeholder-class="tui-phcolor" class="tui-input" v-model="bean.userPhone" placeholder="请输入收货人手机号码" maxlength="11" type="text" />
					</view>
				</tui-list-cell>
				<tui-list-cell :arrow="true" padding="0">
					<view class="tui-line-cell">
						<view class="tui-title"><text class="tui-title-city-text">所在城市</text></view>
						<input
							placeholder-class="tui-phcolor"
							v-model="bean.areaIdName"
							@tap="openAddres"
							class="tui-input"
							disabled
							placeholder="请选择城市"
							maxlength="50"
							type="text"
						/>
						<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor="#007AFF"></simple-address>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" padding="0">
					<view class="tui-line-cell">
						<view class="tui-title">收货地址</view>
						<input placeholder-class="tui-phcolor" v-model="bean.userAddress" class="tui-input" placeholder="请输入详细的收货地址" maxlength="50" type="text" />
					</view>
				</tui-list-cell>
				<!-- 				<tui-list-cell :hover="false" padding="0">
					<view class="tui-line-cell">
						<view class="tui-cell-title">地址类型</view>
						<view class="tui-addr-label">
							<text v-for="(item, index) in lists" :key="index" class="tui-label-item" :class="{ 'tui-label-active': index == 1 }">{{ item }}</text>
						</view>
					</view>
				</tui-list-cell> -->

				<!-- 默认地址 -->
				<tui-list-cell :hover="false" padding="0">
					<view class="tui-swipe-cell">
						<view>设为默认地址</view>
						<switch @change="SetShadow()" :checked="bean.isDefault == 1" :class="bean.isDefault == 1 ? 'checked' : ''" color="#39B54A"></switch>
					</view>
				</tui-list-cell>
				<!-- 保存地址 -->
				<view class="tui-addr-save text-center" @tap="addAddress">
					<button class="cu-btn bg-blue lg" style="width: 80%;">保存收货地址</button>
					<!-- <tui-button type="danger" height="88rpx">保存收货地址</tui-button> -->
				</view>
				<view class="tui-del text-center" v-if="bean.id" @tap="deleteAddress">
					<button class="cu-btn bg-red lg" style="width: 80%;">删除收货地址</button>
					<!-- <tui-button type="gray" height="88rpx">删除收货地址</tui-button> -->
				</view>
			</form>
		</view>
	</view>
</template>

<script>
import tuiButton from '@/components/extend/button/button';
import tuiListView from '@/components/list-view/list-view';
import tuiListCell from '@/components/list-cell/list-cell';
import simpleAddress from '@/components/simple-address/simple-address.nvue';
import { mapState } from 'vuex';
export default {
	computed: mapState(['user']),
	components: {
		tuiButton,
		tuiListView,
		tuiListCell,
		simpleAddress
	},
	data() {
		return {
			bean: {
				userName: '',
				userPhone: '',
				areaIdPath: '',
				areaIdName: '',
				userAddress: '',
				isDefault: 0
			},
			lists: ['公司', '家', '学校', '其他'],
			cityPickerValueDefault: [0, 0, 0],
			pickerText: '',
			city: ''
		};
	},
	methods: {
		SetShadow() {
			if (this.bean.isDefault == 1) {
				this.bean.isDefault = 0;
			} else {
				this.bean.isDefault = 1;
			}
		},
		getObjectValues(object) {
			var values = [];
			for (var property in object) {
				console.log(object[property]);
				if (object[property] + '' == '') {
					return false;
				}
			}
			return true;
		},
		addAddress() {
			if (!this.getObjectValues(this.bean)) {
				uni.showToast({
					title: '请填写完整再提交。',
					mask: true,
					icon: 'none'
				});
			}
			this.bean.areaIdName = this.bean.areaIdName.replace(/-/g, '');
			let param = this.bean;
			if (param.id) {
				delete param.createTime;
				this.$http.post(this.$api.updateAddress, param).then(e => {
					console.log(e);
					if (e.code == 200) {
						uni.showToast({
							title: '修改成功。',
							mask: true
						});
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							});
						}, 500);
					}
				});
			} else {
				param.userId = this.user.accountId;
				this.$http.post(this.$api.addAddress, param).then(e => {
					console.log(e);
					if (e.code == 200) {
						uni.showToast({
							title: '添加成功。',
							mask: true
						});
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							});
						}, 500);
					}
				});
			}
		},
		deleteAddress() {
			let param = { id: this.bean.id };
			this.$http.post(this.$api.deleteAddress, param).then(e => {
				console.log(e);
				if (e.code == 200) {
					uni.showToast({
						title: '删除成功。',
						mask: true
					});
					setTimeout(function() {
						uni.navigateBack({
							delta: 1
						});
					}, 500);
				}
			});
		},
		openAddres() {
			this.$refs.simpleAddress.open();
		},
		onConfirm(e) {
			console.log(e);
			this.pickerText = JSON.stringify(e);
			this.bean.areaIdName = e.label;
			this.bean.areaIdPath = e.value.join('-');
		}
	},
	onLoad(e) {
		if (JSON.parse(e.bean).id) {
			this.bean = JSON.parse(e.bean);
			this.cityPickerValueDefault = this.bean.areaIdPath.split('-');
		}
	}
};
</script>

<style>
.tui-addr-box {
	padding: 20rpx 0;
}

.tui-line-cell {
	width: 100%;
	padding: 24rpx 30rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
}

.tui-title {
	width: 180rpx;
	font-size: 28rpx;
}

.tui-title-city-text {
	width: 180rpx;
	height: 40rpx;
	display: block;
	line-height: 46rpx;
}

.tui-input {
	width: 500rpx;
}

.tui-input-city {
	flex: 1;
	height: 40rpx;
	font-size: 28rpx;
	padding-right: 30rpx;
}

.tui-phcolor {
	color: #ccc;
	font-size: 28rpx;
}
.tui-cell-title {
	font-size: 28rpx;
}
.tui-addr-label {
	margin-left: 70rpx;
}

.tui-label-item {
	width: 76rpx;
	height: 40rpx;
	border: 1rpx solid rgb(136, 136, 136);
	border-radius: 6rpx;
	font-size: 26rpx;
	text-align: center;
	line-height: 40rpx;
	margin-right: 20rpx;
	display: inline-block;
	transform: scale(0.9);
}
.tui-label-active {
	background: #e41f19;
	border-color: #e41f19;
	color: #fff;
}
.tui-swipe-cell {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: #fff;
	padding: 10rpx 24rpx;
	border-radius: 6rpx;
	overflow: hidden;
	font-size: 28rpx;
}

.tui-switch-small {
	transform: scale(0.8);
	transform-origin: 100% center;
}

/* #ifndef H5 */
.tui-switch-small .wx-switch-input {
	margin: 0 !important;
}

/* #endif */

/* #ifdef H5 */
>>> uni-switch .uni-switch-input {
	margin-right: 0 !important;
}

/* #endif */

.tui-addr-save {
	padding: 24rpx;
	margin-top: 100rpx;
}

.tui-del {
	padding: 24rpx;
}
</style>
