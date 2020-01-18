<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">完善订单</block>
		</cu-custom>
		<view class="center">
			<view class="cu-form-group solid-bottom" v-if="info == ''" @tap="toSetDelivery">
				<view class="title">配送地址</view>
				<view class="flex align-center">
					选择
					<view class="cuIcon-right"></view>
				</view>
			</view>
			<view class="padding solid-bottom" v-else @tap="toSetDelivery">
				<view class="flex ">
					<view class="flex-twice radius align-center">
						<text class="margin-right">{{ info.userName }}</text>
						<text class="margin-right">{{ info.userPhone }}</text>
					</view>
					<view class="flex-sub radius"><view class="cu-tag line-orange radius" v-if="info.isDefault == 1">默认地址</view></view>
					<view class="cuIcon-right"></view>
				</view>
				<view>
					<text>{{ info.areaIdName }}{{ info.userAddress }}</text>
				</view>
			</view>
			<view class="flex-twice padding-top padding-bottom radius text-left">
				<view class="cu-list menu-avatar">
					<view class="cu-item" @tap="toDetail">
						<view class="cu-avatar round lg" :style="imgUrl"></view>
						<view class="content flex-sub">
							<view class="text-cut line-clamp1" style="width: 80%;">{{ map.carInfo.carNumber }}({{ map.carInfo.brandModel }})</view>
							<view class="text-gray text-df flex align-end">
								<text class="basis-xl margin-right line-clamp1">
									<text v-for="(q, i) in quoteList" :key="i">{{ q.insurance_name }}({{ q.insurance_amount == 1 ? '投保' : q.insurance_amount }})</text>
								</text>
								<text class="text-price text-red">{{ map.quote.total }}</text>
							</view>
						</view>
						<text class="cuIcon-right"></text>
					</view>
				</view>
			</view>
			<view class="padding-bottom-xs bg-grey light"></view>
			<view class="cu-form-group margin-top">
				<view class="title">收款方</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">{{ index > -1 ? picker[index] : '保险公司' }}</view>
				</picker>
			</view>
			<view v-if="isShow">
				<view class="cu-form-group solid-bottom">
					<view class="title">商业险优惠</view>
					<view class="flex align-center text-right">{{ commission.bizPercentage }}%</view>
				</view>
				<view class="cu-form-group solid-bottom">
					<view class="title">交强险优惠</view>
					<view class="flex align-center text-right">{{ commission.forcePercentage }}%</view>
				</view>
				<view class="cu-form-group solid-bottom">
					<view class="title">应返金额</view>
					<view class="flex align-center text-right">
						<text class="text-price">{{ commission.resultNumber }}</text>
					</view>
				</view>
			</view>
			<view class="cu-form-group solid-bottom">
				<view class="title"></view>
				<view class="flex align-center text-right">
					应付金额:
					<text class=" text-red">￥{{ map.quote.total }}</text>
				</view>
			</view>
			<view class="padding-bottom-xs bg-grey light"></view>
			<view class="cu-form-group solid-bottom">
				<view class="title">备注</view>
				<view class="flex align-center text-right"><input type="text" value="" placeholder="选填" /></view>
			</view>
		</view>
		<view class="head padding text-center align-center justify-center solid-bottom solids-top margin-top"><button class="cu-btn bg-blue lg" @tap="next">提交订单</button></view>
	</view>
</template>

<script>
import { mapState } from 'vuex';

export default {
	computed: mapState(['user']),
	data() {
		return {
			addressStat: false,
			tag: 1,
			tagMsg: '',
			index: -1,
			picker: ['保险公司'],
			modalName: '',
			info: '',
			map: [],
			imgUrl: '',
			quoteList: {},
			price: '',
			dataInfo: [],
			commission: {},
			isShow: false
		};
	},
	methods: {
		PickerChange(e) {
			this.index = e.detail.value;
		},
		toSetDelivery() {
			uni.navigateTo({
				url: './address',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		getDefaultByUserId() {
			let param = {
				id: this.user.accountId
			};
			this.$http.post(this.$api.getDefaultByUserId, param).then(e => {
				console.log(e);
				this.info = e.data;
			});
		},
		next() {
			if (this.info.address == '') {
				uni.showModal({
					title: '提示',
					content: '请设置配送地址',
					showCancel: false,
					cancelText: '',
					confirmText: '确定',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
				return;
			}
			if (this.info.name == '') {
				uni.showModal({
					title: '提示',
					content: '请设置配送地址',
					showCancel: false,
					cancelText: '',
					confirmText: '确定',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
				return;
			}
			if (this.info.tel == '') {
				uni.showModal({
					title: '提示',
					content: '请设置配送地址',
					showCancel: false,
					cancelText: '',
					confirmText: '确定',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
				return;
			}
			let param = {
				carInfoId: this.map.carInfo.carInfoId,
				carVin: this.map.carInfo.frameNumber,
				licenseNo: this.map.carInfo.carNumber,
				//payMent: this.map.quote.quoteSource,
				source: this.map.quote.quoteSource,
				createBy: this.user.accountId,
				bizNo: this.map.quote.bizNo,
				forceNo: this.map.quote.forceNo,
				buid: this.map.quote.buid,
				channelId: this.map.quote.channelId,
				quoteId: this.map.quote.quoteId,
				payMent: 1,
				isGetPayWay: 1,
				deliveryAddress: this.info.areaIdName + this.info.userAddress,
				contactName: this.info.userName,
				contactTel: this.info.userPhone
			};
			this.$http.post(this.$api.Ws_GetPayAddress, param).then(e => {
				if (e.code == 200) {
					this.dataInfo = e.data;
					uni.reLaunch({
						url: '../../order/orderStatus/orderStatus?orderId=' + e.data.orderId,
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				} else {
					uni.showToast({
						title: '创建失败，请重新报价',
						icon: 'none'
					});
				}
			});
			/* uni.showLoading({
				title: '加载中',
				mask: true
			});
			setTimeout(function(){
				 uni.hideLoading()
				 uni.navigateTo({
				 	url: '../../order/orderStatus/orderStatus',
				 	success: res => {},
				 	fail: () => {},
				 	complete: () => {}
				 });
			            },500); */
		},
		toDetail() {
			this.map.quote.payUrl = '';
			uni.navigateTo({
				url: '../../order/insuredDetail/insuredDetail?map=' + JSON.stringify(this.map),
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		getCommission() {
			let param = {
				source: this.map.quote.quoteSource
			};
			this.$http.post(this.$api.getCommission, param, 1).then(e => {
				this.commission = e.data;
				var resultNumber1 = (this.map.quote.bizTotal * this.commission.bizPercentage) / 100;
				var resultNumber2 = (this.map.quote.forceTotal * this.commission.forcePercentage) / 100;
				this.commission.resultNumber = Number(resultNumber1.toFixed(2)) + Number(resultNumber2.toFixed(2));
			});
		}
	},
	onShow: function(e) {
		let param = { paramKey: 'showResult' };
		this.$http.post(this.$api.getParamValue, param, 1).then(e => {
			if (e.data == 1) {
				this.isShow = true;
				this.getCommission();
			}
		});
		let pages = getCurrentPages();
		let currPage = pages[pages.length - 1];
		// #ifdef MP-WEIXIN
		this.info = currPage.data.info;
		this.tag = currPage.data.tag;
		// #endif
		if (this.info.address != '') {
			this.addressStat = true;
		}
		/* 			switch (this.tag) {
						case 1:
							this.tagMsg = '快递保单'
							break;
						case 2:
							this.tagMsg = '网点配送'
							break;
						case 3:
							this.tagMsg = '网点自取'
							break;
					} */
	},
	onLoad(e) {
		this.getDefaultByUserId();
		var pages = getCurrentPages();
		var prevPage = pages[pages.length - 2]; //上一个页面
		// #ifdef MP-WEIXIN
		this.map = prevPage.data.map;
		// #endif
		// #ifdef H5
		this.map = prevPage.map;
		// #endif
		this.imgUrl = this.map.imgUrl;
		switch (this.map.quote.quoteSource) {
			case '1':
				this.quoteList = this.map.TquoteList;
				break;
			case '2':
				this.quoteList = this.map.PquoteList;
				break;
			case '4':
				this.quoteList = this.map.RquoteList;
				break;
		}
	}
};
</script>

<style>
.cu-load {
	display: block;
	line-height: 1.5em;
	text-align: center;
}

.text-price {
	margin-left: 50upx;
}

.head button {
	width: 50%;
}

.text {
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}

.line-clamp1 {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
</style>
