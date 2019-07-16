<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">发送短息</block>
		</cu-custom>
		<!-- <view class="padding">
			剩余可用短信数量:<span class="text-red">0</span>,短信扣费账户:hhh
		</view> -->
		<view class="margin solids padding-sm padding-bottom" @tap="click">
			尊敬的{{map.carInfo.carNumber}}车主，{{map.quote.quoteInsuranceName}}报价：交强险{{map.quote.forceTotal}}元，
			车船税{{map.quote.taxTotal}}元，商业险{{map.quote.bizPremiumByDis}}元，总计{{map.quote.total}}元。
			<br />
			其中<text v-for="item in quoteList">{{item.insurance_name}}保额{{item.insurance_amount}}，保费{{item.insurance_premium}}元、</text>
			不计免赔总额{{bujimian}}元，
			联系人：{{user.userName}}，联系电话：{{user.mobile}}
			<view class="text-right">
				<button class="cu-btn bg-blue sm" @tap="setClipboardData">复制</button>
			</view>
		</view>
		<view class="padding-top padding-left ">
			客户手机号
		</view>
		<view class="margin padding-xs flex solids align-center">
			<input type="number" value="map.carInfo.mobile" placeholder="请输入客户手机号" class="solid-right" style="width: 70%;" />
			<!-- 	<text class="text-blue">通讯录导入</text> -->
		</view>
		<view class="padding text-center bom">
			<button class="cu-btn bg-blue lg">发送</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		computed: mapState(['user']),
		data() {
			return {
				map: [],
				quoteList: [],
				bujimian: '',
				textValue: ''
			}
		},
		methods: {
			itemTap(e) {
				console.log(e)
			},
			click(e) {
				console.log(e);
			},
			setClipboardData() {
				uni.setClipboardData({
					data: 'hello',
					success: function() {
						console.log('success');
					}
				});
			}
		},
		onLoad(e) {
			Array.prototype.remove = function(val) {
				var index = this.indexOf(val);
				if (index > -1) {
					this.splice(index, 1);
				}
			};
			console.log(e);
			this.map = JSON.parse(e.map)
			switch (this.map.quote.quoteSource) {
				case '1':
					this.quoteList = this.map.TquoteList
					break;
				case '2':
					this.quoteList = this.map.PquoteList
					break;
				case '4':
					this.quoteList = this.map.RquoteList
					break;
			}
			let arr = this.quoteList
			let amount = 0
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].insurance_name.indexOf('不计免') != -1) {
					amount = Number(arr[i].insurance_premium) + Number(amount)
					arr.splice(i, 1)
					i = i - 1
				}
				if (arr[i].insurance_name.indexOf('交强险') != -1) {
					arr.splice(i, 1)
					i = i - 1
				}
			}
			this.quoteList = arr
			console.log(arr);
			this.bujimian = amount.toFixed(2)
			console.log(this.map);
		},
		onShow() {
			if (this.textValue == '') {

			}
		}
	}
</script>

<style>
	.bom button {
		width: 300upx;
	}
</style>
