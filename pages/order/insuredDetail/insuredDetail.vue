<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">投保详情</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav text-center solid-bottom">
			<view class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in array" :key="index" @tap="tabSelect"
			 :data-id="index">
				{{item}}
			</view>
		</scroll-view>
		<view class="center">
			<view v-if="TabCur==0">
				<view class="flex padding justify-between align-center solid-bottom">
					<view class="action">
						<view class="cu-avatar round margin-right-xs" :style="map.imgUrl"></view>
						{{map.quoteInfo.quoteInsuranceName}}
					</view>
					<view class="action">
						<text class="text-price text-red">{{map.quoteInfo.total}}</text>
					</view>
				</view>
				<view class="padding-left padding-bottom solid-bottom">
					<view class="margin-top-sm">车牌号码:{{map.carInfo.carNumber}}</view>
					<view class="margin-top-xs">品牌型号:{{map.carInfo.brandModel}}</view>
					<view class="margin-top-xs">折扣系数:{{0}}</view>
					<view class="margin-top-xs">交强险起保时间:{{map.insuredInfo.nextForceStartDate}}</view>
					<view class="margin-top-xs">商业险起保时间:{{map.insuredInfo.nextBusinesStartDate}}</view>
				</view>
				<view class="text-gray padding solid-bottom">
					交强险投保单号:{{map.quoteInfo.forceNo}}
				</view>
				<view class="text-gray padding solid-bottom">
					商业险投保单号:{{map.quoteInfo.bizNo}}
				</view>
				<view class="flex padding justify-between align-center solid-bottom">
					<view class="action">
						交强险
					</view>
					<view class="action">
						{{map.quoteInfo.forceTotal}}元
					</view>
				</view>
				<view class="flex padding justify-between align-center solid-bottom">
					<view class="action">
						车船税
					</view>
					<view class="action">
						{{map.quoteInfo.taxTotal}}元
					</view>
				</view>
				<view class="flex padding-left padding-right justify-between align-center solid-bottom">
					<view class="action">
						商业险
					</view>
					<view class="action" @tap="show">
						{{map.quoteInfo.bizPremiumByDis}}元<text :class="!topStat? 'cuIcon-unfold':'cuIcon-fold'"></text>
					</view>
				</view>
				<view class="padding-right padding-left text-gray margin-top-xs text-sm padding-bottom solid-bottom text-cut">
					<text class="" v-for="(q,i) in quoteList" :key="i">{{q.insurance_name}}({{q.insurance_amount==1?'投保':q.insurance_amount}})</text>
				</view>
				<view class="bg" v-if="topStat">
					<view class="flex padding-left padding-right padding-top-xs padding-bottom-xs justify-between align-center solid-bottom"
					 v-for="(q,i) in quoteList" :key="i">
						<view class="action">
							<text>
								{{q.insurance_name}}
							</text>
							<text v-if="q.insurance_name!='不计免赔'">
								{{q.insurance_amount==1?'(投保)':'('+q.insurance_amount+')'}}
							</text>
						</view>
						<view class="action">
							{{q.insurance_premium}}
						</view>	
					</view>
					<view class="padding-right padding-left text-gray margin-top-xs text-sm padding-bottom-xs solid-bottom">
						<text class="" v-for="(q,i) in map.bjmList" :key="i">{{q.insurance_name}}({{q.insurance_premium}})</text>
					</view>
				</view>
				<view class="flex padding justify-between align-center solid-bottom">
					<view class="action">
						保险总额
					</view>
					<view class="action">
						<text class="text-price text-red">{{map.quoteInfo.total}}</text>
					</view>
				</view>
			</view>
			<view v-if="TabCur==1">
				<view class="padding solid-bottom">
					<text class="text-xl cuIcon-title">车主信息</text>
				</view>
				<view class="flex justify-between align-center padding-left padding-right padding-bottom-xs padding-top-xs ">
					<view>姓名</view>
					<view>{{map.carInfo.licenseOwner}}</view>
				</view>
				<view class="flex justify-between align-center padding-left padding-right padding-bottom-xs padding-top-xs ">
					<view>证件类型</view>
					<view>身份证</view>
				</view>
				<view class="flex justify-between align-center padding-left padding-right padding-bottom padding-top-xs ">
					<view>证件号码</view>
					<view>{{map.carInfo.licenseOwnerIdCard}}</view>
				</view>
				<view class="padding-bottom-xs bg-grey light"></view>
				<view class="padding solid-bottom">
					<text class="text-xl cuIcon-title">被保险人信息</text>
				</view>
				<view class="flex justify-between align-center padding-left padding-right padding-bottom-xs padding-top-xs ">
					<view>姓名</view>
					<view>{{map.carInfo.licenseOwner}}</view>
				</view>
				<view class="flex justify-between align-center padding-left padding-right padding-bottom-xs padding-top-xs ">
					<view>证件类型</view>
					<view>身份证</view>
				</view>
				<view class="flex justify-between align-center padding-left padding-right padding-bottom padding-top-xs ">
					<view>证件号码</view>
					<view>{{map.carInfo.licenseOwnerIdCard}}</view>
				</view>
				<view class="padding-bottom-xs bg-grey light"></view>
				<view class="padding solid-bottom">
					<text class="text-xl cuIcon-title">投保人信息</text>
				</view>
				<view class="flex justify-between align-center padding-left padding-right padding-bottom-xs padding-top-xs ">
					<view>姓名</view>
					<view>{{map.carInfo.licenseOwner}}</view>
				</view>
				<view class="flex justify-between align-center padding-left padding-right padding-bottom-xs padding-top-xs ">
					<view>证件类型</view>
					<view>身份证</view>
				</view>
				<view class="flex justify-between align-center padding-left padding-right padding-bottom padding-top-xs ">
					<view>证件号码</view>
					<view>{{map.carInfo.licenseOwnerIdCard}}</view>
				</view>
				<view class="padding-bottom-xs bg-grey light"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: 0,
				array: [
					'车险信息', '关系人信息'
				],
				topStat: false,
				map: [],
				quoteList: {},
				price: '',
			}
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			show() {
				this.topStat = !this.topStat
			}
		},
		onLoad(e) {
			this.map = JSON.parse(e.map)
			/* var pages = getCurrentPages();
			var prevPage = pages[pages.length - 2]; //上一个页面
			// #ifdef MP-WEIXIN
			this.map = prevPage.data.map
			// #endif
			// #ifdef H5
			this.map = prevPage.map
			// #endif
			console.log(this.map); */
			// switch (this.map.quoteInfo.quoteSource) {
			// 	case '1':
			// 		this.quoteList = this.map.TquoteList
			// 		break;
			// 	case '2':
			// 		this.quoteList = this.map.PquoteList
			// 		break;
			// 	case '4':
			// 		this.quoteList = this.map.RquoteList
			// 		break;
			// }
			if (this.map.quoteInfo == null) {
				this.map.quoteInfo = this.map.quote
				switch (parseInt(this.map.quote.quoteSource)) {
					case 1:
						this.quoteList = this.map.TquoteList
						break;
					case 2:
						this.quoteList = this.map.RquoteList
						break;
					case 4:
						this.quoteList = this.map.PquoteList
						break;
				}
			} else {
				this.quoteList = this.map.insuredList
			}
		}
	}
</script>

<style>
	.bg {
		background-color: #F5F5F5;
	}
</style>
