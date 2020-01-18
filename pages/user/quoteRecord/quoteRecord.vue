<template>
	<view class="home">
		<!-- <view class="cu-bar search bg-gradual-blue">
			<text class="cuIcon-back" @tap="back">返回</text>
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="请输入车牌号或车主名"
				 confirm-type="search"></input>
			</view>
			<view class="action">
				<text>搜索</text>
				<text class="cuIcon-search"></text>
			</view>
		</view> -->
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">报价记录</block>
		</cu-custom>
		<view class="center">
			<view v-if="list != ''">
				<view class="" v-for="(item, index) in list" @tap="toQuoteInfo(item)">
					<view class="flex justify-between align-center padding solid-bottom solid-top">
						<view>{{ item.carNumber }}</view>
						<view>
							<text v-if="item.overTime<0">已脱保</text>
							<text v-else-if="item.overTime!=''">据到期<text class="text-red">{{item.overTime}}</text>天</text>
							<text v-else-if="item.overTime==-0">今日到期</text>
							<text v-else>未到期</text>
						</view>
					</view>
					<view class="padding">
						<view v-if="item.quoteInfoList == ''" class="padding text-center">无报价信息</view>
						<view class="grid col-3 text-df" v-for="i in item.quoteInfoList" v-else>
							<view class="text-gray">{{ i.quoteInsuranceName }}</view>
							<view class="text-center" v-if="i.total != null">
								<text class="text-price text-green">{{ i.total }}</text>
							</view>
							<view class="text-center" v-else><text class="text-red">报价失败</text></view>
							<view class="text-right " :class="i.submitStatus == 1 ? 'text-green' : 'text-red'">{{ i.submitStatus == 1 ? '核保成功' : '核保失败' }}</view>
						</view>
					</view>
					<view class="padding-bottom-sm bg-grey light"></view>
				</view>
				<view class="cu-load bg-grey light" :class="!isLoad ? 'loading' : 'over'"></view>
			</view>
			<view class="padding text-center" v-if="list == ''"><text>暂无记录</text></view>
		</view>
	</view>
</template>

<script>
import date from '@/comment/similar.js';
import { mapState } from 'vuex';
export default {
	computed: mapState(['user']),
	data() {
		return {
			list: [],
			isLoad: true,
			size: 5,
			page: 1,
			maxPage: 0,
			map: {}
		};
	},
	methods: {
		back() {
			uni.navigateBack({
				delta: 1
			});
		},
		toQuoteInfo(e) {
			let carInfoId = e.carInfoId;
			uni.navigateTo({
				url: '../../quote/renewalDeatil?carInfoId=' + carInfoId,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
			/* let param = {
					carInfoId: carInfoId
				}
				this.$http.post(this.$api.userDetails, param).then((e) => {
					if(e.code==200){
						this.map=e.data,
						uni.navigateTo({
							url: '../../quote/precisionQuote/precisionQuote?carInfoId='+carInfoId,
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
					}
				}) */
		},
		getList() {
			let param = {
				page: this.page,
				size: this.size * 2000,
				createBy: this.user.accountId
			};
			this.$http.post(this.$api.getCarInfoQuote, param).then(e => {
				console.log(e);
				if (e.code == 200) {
					this.list = e.data;
					var list = e.data;
					for (var i = 0; i < list.length; i++) {
						if (list[i].insuredInfo.nextBusinesStartDate != null) {
							this.$set(list[i], 'overTime', date.getBeforeDate(list[i].insuredInfo.nextBusinesStartDate));
						} else if (list[i].insuredInfo.nextForceStartDate != null) {
							this.$set(list[i], 'overTime', date.getBeforeDate(list[i].insuredInfo.nextForceStartDate));
						} else {
							this.$set(list[i], 'overTime', '');
						}
					}
				} else {
					uni.showToast({
						title: '获取失败，请稍后重试',
						icon: 'none'
					});
				}
			});
		}
	},
	onLoad() {
		this.getList();
	}
};
</script>

<style></style>
