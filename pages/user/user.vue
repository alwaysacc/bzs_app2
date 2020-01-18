<template>
	<view class="home1">
		<cu-custom bgColor="bg-gradual-blue" :isBack="false" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">我的</block>
		</cu-custom>
		<view class="tui-notice-board" v-if="isShow">
			<view class="tui-icon-bg"><tui-icon name="news-fill" :size="24" color="#f54f46"></tui-icon></view>
			<view class="tui-scorll-view" @tap="detail">
				<view class="tui-notice" :class="[animation ? 'tui-animation' : '']">{{text}}</view>
			</view>
		</view>
		<view class="flex align-center padding-xs bg-gradual-blue">
			<!-- #ifdef H5 -->
			<view class="cu-avatar xl round margin-left" style="background-image:url(http://alwaysacc.club/41F006CD.jpg);"></view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<view class="avatar-text"><open-data type="userAvatarUrl"></open-data></view>
			<!-- #endif -->
			<view class="margin-left">
				<view class="text-xxl margin-bottom-sm">{{ user.userName }}</view>
				<view>邀请码：{{ user.invitecode }}</view>
			</view>
			<!-- <view class="right-view">
				<view class="text-xl">
					今日佣金比率
					<view class="text-center">15%</view>
					</view>
			</view> -->
		</view>

		<view class="cu-list menu">
			<!-- <view class="cu-item arrow" @tap="toOrderList(0)">
				<view class="content"><text class="">我的订单</text></view>
				<view class="action"><text class="text-grey text-sm">全部订单</text></view>
			</view>
			<view class="cu-list grid col-4 no-border cu-item">
				<view class="cu-item" v-for="(item, index) in iconList" :key="index" v-if="index < gridCol * 2" @tap="toOrderList(index + 1)">
					<view :class="['cuIcon-' + item.icon, 'text-' + item.color]">
						<view class="cu-tag badge" v-if="item.badge != 0">
							<block v-if="item.badge != 1">{{ item.badge > 99 ? '99+' : item.badge }}</block>
						</view>
					</view>
					<text>{{ item.name }}</text>
				</view>
			</view> -->
			<view class="cu-item arrow" @tap="toQuoteRecord">
				<view class="content">
					<text class="cuIcon-text"></text>
					<text class="">报价记录</text>
				</view>
			</view>
			<!-- <view class="cu-item arrow">
				<view class="content">
					<text class="cuIcon-rank"></text>
					<text class="">统计报表</text>
				</view>
			</view> -->
			<view class="cu-item arrow" @tap="toCommission">
				<view class="content">
					<text class="cuIcon-punch"></text>
					<text class="">佣金提现</text>
				</view>
			</view>
			<view class="cu-item arrow" @tap="toProxy">
				<view class="content">
					<text class="cuIcon-group"></text>
					<text class="">我的代理</text>
				</view>
			</view>
			<view class="cu-item arrow" @tap="toIn">
				<!-- <button class="content btn" open-type="share"> -->
				<button class="content btn">
					<text class="cuIcon-friendadd"></text>
					<text class="">邀请好友</text>
				</button>
			</view>
			<view class="cu-item arrow">
				<button class="content btn" @tap="toCommissionRole">
					<text class="cuIcon-form"></text>
					<text class="">提成规则</text>
				</button>
			</view>
			<view class="cu-item arrow">
				<button class="content btn" @tap="toAddress">
					<text class="cuIcon-form"></text>
					<text class="">配送地址</text>
				</button>
			</view>
			<view class="cu-item arrow" v-if="user.accountId==1">
				<button class="content btn" @tap="toFeedback">
					<text class="cuIcon-form"></text>
					<text class="">回复反馈</text>
				</button>
			</view>
			<view class="cu-item arrow" @tap="toSetting">
				<view class="content">
					<text class="cuIcon-settings"></text>
					<text class="">设置</text>
				</view>
			</view>
		</view>

		<!-- <view class="btn-row">
			<button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button>
			<button v-if="hasLogin" type="default" @tap="bindLogout">退出登录</button>
		</view> -->
	</view>
</template>

<script>
import { mapState } from 'vuex';
import tuiIcon from '@/components/icon/icon';
export default {
	computed: mapState(['user']),
	components: {
		tuiIcon
	},
	data() {
		return {
			animation: false,
			iconList: [
				{
					icon: 'recharge',
					color: 'blue',
					badge: 0,
					name: '待支付'
				},
				{
					icon: 'roundcheck',
					color: 'blue',
					badge: 0,
					name: '已承保'
				},
				{
					icon: 'roundclosefill',
					color: 'blue',
					badge: 0,
					name: '已取消'
				},
				{
					icon: 'time',
					color: 'blue',
					badge: 0,
					name: '已过期'
				}
			],
			gridCol: 4,
			gridBorder: false,
			userInfo: '',
			isShow:false,
			text:'',
		};
	},
	methods: {
		toFeedback(){
			uni.navigateTo({
				url: 'doFeedback/doFeedback',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		getVerifiedStatById() {
			let param = {
				accountId: this.user.accountId
			}
			this.$http.post(this.$api.getVerifiedStatById, param).then(e => {
				if (e.code == 200) {
					if (e.data.verified_stat == 0) {
						this.isShow = true;
						this.text='未实名认证，请点击前往实名认证！'
						setTimeout(() => {
							this.animation = true
						}, 600)
					} else if (e.data.verified_stat == 2) {
						this.isShow = true;
						this.text='审核未通过，请点击前往重新实名认证！'
						setTimeout(() => {
							this.animation = true
						}, 600)
					} 
				}
			})
		},
		detail(e) {
			uni.navigateTo({
				url: './commission/verified/verified',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		toAddress() {
			uni.navigateTo({
				url: 'address/address',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		toIn() {
			uni.navigateTo({
				url: 'invite/invite',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		bindLogin() {
			uni.navigateTo({
				url: '../login/login'
			});
		},
		bindLogout() {
			this.logout();
			/**
			 * 如果需要强制登录跳转回登录页面
			 */
			if (this.forcedLogin) {
				uni.reLaunch({
					url: '../login/login'
				});
			}
		},
		toCommissionRole() {
			uni.navigateTo({
				url: 'commissionRule/commissionRule',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		toOrderList(e) {
			uni.navigateTo({
				url: 'orderList/orderList?TabCur=' + e,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		toQuoteRecord() {
			uni.navigateTo({
				url: 'quoteRecord/quoteRecord',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		toMessagge() {
			uni.navigateTo({
				url: 'userMsg/userMsg',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		toSetting() {
			uni.navigateTo({
				url: 'setting/setting',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		toProxy() {
			uni.navigateTo({
				url: 'myProxy/myProxy',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		toCommission() {
			uni.navigateTo({
				url: 'commission/commission',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		}
	},
	onShareAppMessage: function(ops) {
		let t = this;
		if (ops.from === 'button') {
			// 来自页面内转发按钮
		}
		return {
			title: t.user.userName + '邀请您使用保之顺车险报价平台',
			path: 'pages/reg/reg?invitecode=' + t.user.invitecode + '&accountId=' + t.user.accountId,
			success: function(res) {
				// 转发成功
			},
			fail: function(res) {
				// 转发失败
			}
		};
	},
	onLoad(options) {
		
	},
	onShow() {
		this.getVerifiedStatById()
	},
	created() {}
};
</script>

<style>
.bg-gradual-blue {
	height: 300upx;
}

.avatar-text {
	overflow: hidden;
	width: 120upx;
	height: 120upx;
	border-radius: 50%;
}

.btn {
	padding: 0;
	border: none 0;
	font: inherit;
	color: inherit;
	background-color: transparent;
	cursor: pointer;
	background-color: white;
	display: flex;
	align-items: center;
	justify-content: center;
}

.cu-btn::after {
	border: none !important;
}
.right-view {
	position: absolute;
	right: 10%;
	top: 6%;
}

.tui-notice-board {
	width: 100%;
	padding-right: 30upx;
	box-sizing: border-box;
	font-size: 28upx;
	height: 60upx;
	background: #fff8d5;
	display: flex;
	align-items: center;
	position: fixed;
	top: 0;
	/* #ifdef H5 */
	top: 44px;
	/* #endif */
	z-index: 999;
}
.tui-icon-bg {
	background: #fff8d5;
	padding-left: 30upx;
	position: relative;
	z-index: 10;
}

.tui-icon-class {
	margin-right: 12upx;
}

.tui-scorll-view {
	flex: 1;
	line-height: 1;
	white-space: nowrap;
	overflow: hidden;
	color: #f54f46;
}

.tui-notice {
	transform: translateX(100%);
}

.tui-animation {
	-webkit-animation: tui-rolling 12s linear infinite;
	animation: tui-rolling 12s linear infinite;
}
@-webkit-keyframes tui-rolling {
	0% {
		transform: translateX(100%);
	}

	100% {
		transform: translateX(-170%);
	}
}

@keyframes tui-rolling {
	0% {
		transform: translateX(100%);
	}

	100% {
		transform: translateX(-170%);
	}
}

.tui-subject {
	padding: 100upx 30upx 30upx 30upx;
	box-sizing: border-box;
	font-size: 32upx;
	font-weight: bold;
}

.tui-rolling-news {
	width: 100%;
	padding: 12upx 30upx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: nowrap;
}

.tui-subject {
	padding: 100upx 30upx 30upx 30upx;
	box-sizing: border-box;
	font-size: 32upx;
	font-weight: bold;
}

.tui-rolling-news {
	width: 100%;
	padding: 12upx 30upx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: nowrap;
}

.tui-swiper {
	font-size: 28upx;
	height: 50upx;
	flex: 1;
}

.tui-swiper-item {
	display: flex;
	align-items: center;
}

.tui-news-item {
	line-height: 28upx;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.tui-searchbox {
	padding: 60upx 80upx;
	box-sizing: border-box;
}

.tui-rolling-search {
	width: 100%;
	height: 70upx;
	border-radius: 35upx;
	padding: 0 40upx 0 30upx;
	box-sizing: border-box;
	background: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: nowrap;
	color: #999;
}
</style>
