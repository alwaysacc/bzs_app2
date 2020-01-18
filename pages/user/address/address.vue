<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">配送地址</block>
		</cu-custom>
		<view class="center">
			<view class="tui-safe-area">
				<view class="tui-address">
					<block v-for="(item, index) in addressList" :key="index">
						<tui-list-cell padding="0">
							<view class="tui-address-flex" @tap="editAddr(item)">
								<view class="tui-address-left">
									<view class="tui-address-main">
										<view class="tui-address-name tui-ellipsis">{{ item.userName }}</view>
										<view class="tui-address-tel">{{ item.userPhone }}</view>
									</view>
									<view class="tui-address-detail">
										<view class="tui-address-label" v-if="item.isDefault === 1">默认</view>
										<!-- <view class="tui-address-label" v-if="index != 2">{{ ['公司', '住宅', '其它'][index] }}</view> -->
										<text>{{ item.areaIdName }}{{ item.userAddress }}</text>
									</view>
								</view>
								<view class="tui-address-imgbox"><text class="cuIcon-write"></text></view>
							</view>
						</tui-list-cell>
					</block>
				</view>
				<!-- 新增地址 -->
				<view class="tui-address-new text-center">
					<button class="cu-btn bg-blue lg" style="width: 80%;" @tap="editAddr">+新增配送地址</button>
					<!-- <tui-button type="danger" height="88rpx" @click="editAddr">+ </tui-button> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import tuiButton from '@/components/extend/button/button';
import tuiListCell from '@/components/list-cell/list-cell';
import { mapState } from 'vuex';
export default {
	computed: mapState(['user']),
	components: {
		tuiButton,
		tuiListCell
	},
	data() {
		return {
			addressList: []
		};
	},
	onLoad: function(options) {},
	onShow: function() {
		this.getAddressList();
	},
	methods: {
		addAddress() {
			uni.navigateTo({
				url: 'editAddress'
			});
		},
		editAddr(e) {
			uni.navigateTo({
				url: 'editAddress?bean=' + JSON.stringify(e)
			});
		},
		getAddressList() {
			let param = {
				userId: this.user.accountId
			};
			this.$http.post(this.$api.getAddressList, param).then(e => {
				if (e.code == 200) {
					this.addressList = e.data;
				} else {
					uni.showToast({
						title: '异常，请稍后重试',
						icon: 'none'
					});
				}
			});
		}
	}
};
</script>

<style>
.tui-address {
	width: 100%;
	padding-top: 20rpx;
	padding-bottom: 160rpx;
}
.tui-address-flex {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.tui-address-main {
	width: 600rpx;
	height: 70rpx;
	display: flex;
	font-size: 30rpx;
	line-height: 86rpx;
	padding-left: 30rpx;
}

.tui-address-name {
	width: 120rpx;
	height: 60rpx;
}

.tui-address-tel {
	margin-left: 10rpx;
}

.tui-address-detail {
	font-size: 24rpx;
	word-break: break-all;
	padding-bottom: 25rpx;
	padding-left: 25rpx;
	padding-right: 120rpx;
}

.tui-address-label {
	padding: 5rpx 8rpx;
	flex-shrink: 0;
	background: #e41f19;
	border-radius: 6rpx;
	color: #fff;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-size: 25rpx;
	line-height: 25rpx;
	transform: scale(0.8);
	transform-origin: center center;
	margin-right: 6rpx;
}

.tui-address-imgbox {
	width: 80rpx;
	height: 100rpx;
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	right: 10rpx;
}

.tui-address-img {
	width: 36rpx;
	height: 36rpx;
}

.tui-address-new {
	width: 100%;
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 999;
	padding: 20rpx 25rpx 30rpx;
	box-sizing: border-box;
	background: #fafafa;
}

.tui-safe-area {
	padding-bottom: env(safe-area-inset-bottom);
}
</style>
