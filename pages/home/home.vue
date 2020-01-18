<template>
	<view class="home1">
		<cu-custom bgColor="bg-gradual-blue" :isBack="false" :isCustom="true">
			<block slot="content">保之顺兼业平台</block>
			<block slot="right">
				<view class="padding" @click="rDrawer">
					<text>{{ cityName }}</text>
					<text class="cuIcon-triangledownfill"></text>
				</view>
				<!-- <text class="padding">南京</text> -->
				<!-- <text class="cuIcon-search padding" @tap="toSetRelation"></text> -->
			</block>
		</cu-custom>
		<view class="center">
			<view class="text-sl message" @tap="toMsg"><text class="cuIcon-notice " :class="messageColor ? 'text-blue' : 'text-red'" v-if="showMessage"></text></view>
			<view class="top">
				<swiper
					class="screen-swiper"
					:class="dotStyle ? 'square-dot' : 'round-dot'"
					:indicator-dots="true"
					:circular="true"
					:autoplay="true"
					interval="5000"
					duration="500"
				>
					<swiper-item v-for="(item, index) in swiperList" :key="index">
						<image :src="item.imgUrl" mode="aspectFill"></image>
						<video :src="item.imgUrl" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover"></video>
					</swiper-item>
				</swiper>
			</view>
			<view class="grid flex-wrap text-center col-4 padding contentView solid-bottom">
				<view class="padding-bottom-xs round" v-for="(item, index) in navs" :key="index" @tap="change(index)">
					<!-- <view class="tui-badge-class d" v-if="item.badge != 0"><tui-badge :dot="true" type="red"></tui-badge></view> -->
					<image class="image " :src="item.icon" mode="aspectFit" />
					<view class="text ">{{ item.title }}</view>
				</view>
			</view>
			<view class="tui-rolling-news solid-bottom">
				<tui-icon name="news-fill" :size="28" color="#5677fc"></tui-icon>
				<swiper vertical autoplay circular interval="3000" class="tui-swiper">
					<swiper-item v-for="(item, index) in newsList" :key="index" class="tui-swiper-item">
						<view class="tui-news-item" @tap="detail">{{ item }}</view>
					</swiper-item>
				</swiper>
			</view>
			<!-- <view class="cu-bar solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-blue"></text>
					合作保险公司
				</view>
			</view>
			<view class="flex flex-wrap padding-left solid-bottom">
				<view class="cu-tag line-blue margin-bottom-sm" v-for="item in list1">{{ item.name }}</view>
			</view>
			<view class="cu-bar solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-blue"></text>
					技术支持伙伴
				</view>
			</view>
			<view class="padding-left flex flex-wrap">
				<view class="cu-tag line-blue margin-bottom-sm" v-for="item in list2">{{ item.name }}</view>
			</view> -->
			<tui-drawer mode="right" :visible="rightDrawer" @close="closeDrawer">
				<view style="width:750upx;height: 750upx;"><citySelect @back_city="back_city"></citySelect></view>
				<view class="d-container"><button class="btn-primary" hover-class="btn-hover" @tap="closeDrawer">关闭抽屉</button></view>
			</tui-drawer>
		</view>
	</view>
</template>

<script>
import tuiDrawer from '@/components/drawer/drawer';
import { uniSegmentedControl, uniIcon } from '@dcloudio/uni-ui';
import mInput from '../../components/m-input.vue';
import { mapState } from 'vuex';
import citySelect from '@/components/citySelect/citySelect.vue';
import popupLayer from '@/components/popup-layer/popup-layer.vue';
import tuiIcon from '@/components/icon/icon';
export default {
	computed: mapState(['hasLogin', 'user']),
	data() {
		return {
			newsList: ['致力发展负责任的人工智能 中国发布八大治理原则', '格兰仕暗示拜访拼多多后遭天猫打压，拼多多高层赞其有勇气', '阿里计划将每股普通股拆为8股，增加筹资灵活性'],
			navs: [
				{
					id: 10,
					icon: '../../static/home/car.png',
					title: '车险报价',
					page: '/pages/main/main',
					badge: 0
				},
				{
					id: 20,
					icon: '../../static/home/jilu.png',
					title: '报价记录',
					page: '/pages/user/quoteRecord/quoteRecord',
					badge: 0
				},
				/* {
					id: 30,
					icon: '../../static/home/fc.png',
					title: '非车',
					page: '/pages/regulation/regulation',
					badge: 0
				},
				{
					id: 40,
					icon: '../../static/home/cc.png',
					title: '财产',
					page: '/pages/developmentParty/developmentParty',
					badge: 0
				},
				{
					id: 50,
					icon: '../../static/home/yw.png',
					title: '意外险',
					page: '/pages/meeting/meeting',
					badge: 0
				},
				{
					id: 60,
					icon: '../../static/home/jk.png',
					title: '健康',
					code: 'partyDay',
					page: '/pages/partyDay/partyDay',
					badge: 0
				},
				{
					id: 90,
					icon: '../../static/home/cfw.png',
					title: '车服务',
					code: 'learn',
					page: '/pages/learnField/learnField',
					badge: 0
				},
				{
					id: 100,
					icon: '../../static/home/sc.png',
					title: '积分商城',
					page: '/pages/studyNotes/studyNotes',
					badge: 0
				}, */
				{
					id: 110,
					icon: '../../static/home/yqhy.png',
					title: '邀请好友',
					page: '/pages/user/invite/invite',
					badge: 0
				},
				{
					id: 120,
					icon: '../../static/home/gywm.png',
					title: '关于我们',
					page: '/pages/user/about/about',
					badge: 0
				}
			],
			current: 0,
			colorIndex: 0,
			activeColor: '#007aff',
			styleType: 'text',
			array: [
				{
					name: '南京'
				}
			],
			swiperList: [
				{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				},
				{
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg'
				},
				{
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				},
				{
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				},
				{
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				},
				{
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				},
				{
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}
			],
			showMessage: false,
			messageColor: true,
			interval: null,
			statusBarHeight: this.statusBarHeight, //状态栏高度，在main.js里
			rightDrawer: false,
			cityName: '定位中',
			list1: '',
			list2: ''
		};
	},
	components: {
		uniSegmentedControl,
		mInput,
		uniIcon,
		citySelect,
		popupLayer,
		tuiDrawer,
		tuiIcon
	},
	mounted() {
		this.$refs.popupRef.close();
	},
	methods: {
		change(e) {
			this.navs[e].badge = 0;
			uni.navigateTo({
				url: this.navs[e].page,
				success: res => {},
				fail: () => {
					uni.showToast({
						title: '开发中！！',
						icon: 'none'
					});
				},
				complete: () => {}
			});
		},
		closeDrawer(e) {
			this.leftDrawer = false;
			this.rightDrawer = false;
		},
		rDrawer() {
			this.rightDrawer = true;
		},
		oncity() {
			var that = this;
			this.$refs.popupRef.show();
		},
		back_city(e) {
			if (e !== 'no') {
				if( e.cityName){
					this.cityName = e.cityName;
				}else{
					this.cityName = e
				}
				this.closeDrawer();
			} else {
				this.cityName = '失败'
				this.closeDrawer();
			}
		},
		onSumit() {
			this.close();
			switch (this.current) {
				case 0:
					if (this.carNo.length < 6) {
						uni.showModal({
							title: '提示',
							content: '请输入正确的车牌号',
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
								}
							}
						});
						return false;
					}
					break;
				case 1:
					if (this.vinNO.length < 17) {
						uni.showModal({
							title: '提示',
							content: '请输入正确的车架号',
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
								}
							}
						});
						return false;
					}
					break;
			}
			uni.showLoading({
				title: '拼命续保中',
				mask: true
			});
			let param = {
				checkType: this.current,
				carNo: this.province + this.carNo,
				idCard: this.cardNO,
				vinNo: this.vinNO,
				engineNo: this.engineNo,
				createBy: this.user.accountId
			};
			this.$http.post(this.$api.WX_checkByCarNoOrVinNo, param, 1).then(e => {
				uni.hideLoading();
				if (e.code == 200) {
					uni.navigateTo({
						url: '../quote/renewalDeatil?detail=' + JSON.stringify(e.data)
					});
				} else {
					uni.showToast({
						icon: 'none',
						title: '未获取续保信息',
						mask: true
					});
				}
			});
		},
		onClickItem(index) {
			this.carNo = '';
			this.vinNO = '';
			this.close();
			if (this.current !== index) {
				this.current = index;
			}
		},
		bindPickerChange: function(e) {
			this.close();
			this.index = e.target.value;
		},
		getListByOrderNum() {
			let param = {};
			this.$http.post(this.$api.getListByOrderNum, param, 1).then(e => {
				this.swiperList = e.data;
			});
		},
		getMsgList(t) {
			let param = {
				userId: this.user.accountId
			};
			param.status = 0;
			this.$http.post(this.$api.getMessageList, param, 1).then(e => {
				if (e.code == 200) {
					if (e.data.list.length != 0) {
						this.messageColor = false;
						var t = this;
						this.interval = setInterval(function() {
							t.showMessage = !t.showMessage;
						}, 1000);
					} else {
						clearInterval(this.interval);
						this.messageColor = true;
						this.showMessage = true;
					}
				}
			});
		},
		getPartnerList(t) {
			let param = {};
			this.$http.post(this.$api.getPartnerList, param, 1).then(e => {
				if (e.code == 200) {
					this.list1 = e.data.list1;
					this.list2 = e.data.list2;
				}
			});
		},
		toMsg() {
			clearInterval(this.interval);
			uni.navigateTo({
				url: '../user/userMsg/userMsg'
			});
		}
	},
	onShow() {
		this.getMsgList();
	},
	onLoad(e) {
		this.getListByOrderNum();
		this.getPartnerList();
		if (!this.hasLogin) {
			// #ifdef H5
			let param = {
				// openId: "owsWp5TPvFcGQ39Oi7HP2PtaslmA"
				openId: 'owsWp5TPvFcGQ39Oi7HP2PtaslmA'
			};
			this.$http.post(this.$api.hasBound, param).then(e => {
				if (e.status == 0) {
					this.$store.commit('SET_USER', e.map);
					this.$store.commit('login');
				}
			});
			// #endif
			// #ifdef MP-WEIXIN
			uni.login({
				provider: 'weixin',
				success: res => {
					console.log(res);
					let param = {
						code: res.code
					};
					this.$http.post(this.$api.hasBound, param).then(e => {
						console.log(e);
						if(e.code==200){
							if (e.data.user != '') {
								this.$store.commit('SET_USER', e.data.user);
							} else {
								uni.setStorage({
									key: 'openId',
									data: e.data.openId,
									success: function() {
										console.log('success');
									}
								});
								uni.showToast({
									title: '请登录',
									icon: 'none'
								});
								setTimeout(function() {
									uni.navigateTo({
										url: '../login/login',
										success: res => {},
										fail: () => {},
										complete: () => {}
									});
								}, 1000);
							}
						}else{
							uni.navigateTo({
								url: '../login/login',
								success: res => {},
								fail: () => {},
								complete: () => {}
							});
						}
					});
				},
				fail: () => {},
				complete: () => {}
			});
			// #endif
		}
	}
};
</script>

<style>
.message {
	position: absolute;
	top: 10%;
	left: 20px;
	z-index: 2;
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

.contentView {
	font-size: 30upx;
}
.round {
	position: relative;
}

.d {
	position: absolute;
	z-index: 999;
	top: 0;
	left: 85%;
}

.image {
	width: 120upx;
	height: 120upx;
}

.menu-img {
	width: 84rpx;
	height: 84rpx;
	display: block;
	margin: 0 auto;
	margin-bottom: 10rpx;
}

image {
	will-change: transform;
}

.imitate-input {
	width: 260px;
	height: 20px;
	border-radius: 3px;
	size: 16px;
	line-height: 16px;
	outline: none;
	color: #000;
	white-space: nowrap;
	overflow-x: scroll;
	overflow-y: hidden;
	word-break: normal;
	display: flex;
	align-items: center;
}

.imitate-input1 {
	width: 300px;
	height: 20px;
	border-radius: 3px;
	size: 16px;
	line-height: 16px;
	outline: none;
	color: #000;
	white-space: nowrap;
	overflow-x: scroll;
	overflow-y: hidden;
	word-break: normal;
	display: flex;
	align-items: center;
}

/* 清除左右滚动条 */
.imitate-input::-webkit-scrollbar {
	display: none;
}

.imitate-input:empty:before {
	content: attr(placeholder);
	color: #999;
}

.imitate-input:focus:before {
	content: none;
}

uni-segmented-control {
	width: 100%;
}

.home1 {
	padding: 0;
}

.cu-form-group .title {
	min-width: calc(5em + 15px);
}

.home1 .top image {
	width: 100%;
}

.input-row {
	align-items: center;
	/*垂直居中*/
}

.input-row .title {
	width: 30%;
	height: 60px;
	min-height: 50upx;
	padding-left: 30upx;
	line-height: 60px;
}

.dialog-view {
	display: flex;
	flex-wrap: wrap;
	margin: 0;
}

.dialog-view view {
	height: 60upx;
	width: 60upx;
	background-color: #dddddd;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 30upx;
	margin-top: 20upx;
}

.btn-view {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 50upx;
}

.btn-view button {
	width: 50%;
}

.view2 .input-row .title {
	width: 25%;
	height: 60px;
	min-height: 50upx;
	padding-left: 30upx;
	line-height: 60px;
}

.view-width {
	width: 60upx;
	height: 120upx;
	border-radius: 6upx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.bg-white {
	height: 60upx;
}

.key {
	position: fixed;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 1110;
	outline: 0;
	text-align: center;
	-ms-transform: scale(1.185);
	transform: scale(1.185);
	backface-visibility: hidden;
	perspective: 2000upx;
	background: rgba(0, 0, 0, 0.6);
	transition: all 0.3s ease-in-out 0s;
	pointer-events: none;
	opacity: 1;
	transition-duration: 0.3s;
	-ms-transform: scale(1);
	transform: scale(1);
	overflow-x: hidden;
	overflow-y: auto;
	pointer-events: auto;
}

.cu-form-group picker::after {
	font-family: none;
	display: block;
	content: '\e6a3';
	position: absolute;
	font-size: 34upx;
	color: #ffffff;
	line-height: 100upx;
	width: 60upx;
	text-align: center;
	top: 0;
	bottom: 0;
	right: -20upx;
	margin: auto;
}
.height {
	height: var(--status-bar-height);
}
</style>
