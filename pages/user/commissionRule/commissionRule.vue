<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">提成规则</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in array" :key="index"
				 @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
			</view>
		</scroll-view>
		<view v-if="TabCur==0">
			<view class="padding grid col-3 solids-bottom ">
				<view class="text-left">保险公司</view>
				<view class="text-center">代理人佣金</view>
				<view class="text-right">平台补贴</view>
			</view>
			<view class="padding grid col-3 solid-bottom" v-for="item in list">
				<view class="text-left">
					<text v-if="item.source==1">太平洋</text>
					<text v-if="item.source==2">平安</text>
					<text v-if="item.source==4">人保</text>
				</view>
				<view class="text-center">{{item.bizPercentage}}%</view>
				<view class="text-right">{{item.subsidy}}%</view>
			</view>
			<view class="padding text-center solid-bottom bg-blue light">
				交强险佣金：{{list[1].forcePercentage}}%
			</view>
		</view>
		<view v-else>
			<view class="padding">
				提成费用：一级提成{{list[1].levelOne}}%，二级提成{{list[1].levelTwo}}%
			</view>
			<view class="padding">
				邀请好友加入代理员，你将有一级和二级代理人做单提成，（你邀请的代理人是一级，你的一级邀请加入代理人就是你的二级）。<br/><br/>
				如果你是其他人员邀请加入代理人的，你是邀请你的人员就是你的一级，你的邀请的代理人就是你邀请人的二级。<br/><br/>
				不了解也可以咨询客户人员，客户电话15051820077
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: {},
				array: [
					'今日佣金', '分佣规则'
				],
				TabCur: 0,
				scrollLeft: 0
			}
		},
		methods: {
			getCommList() {
				let param = {}
				this.$http.post(this.$api.todayCommList, param).then((e) => {
					console.log(e);
					if (e.code == 200) {
						this.list = e.data.list
					}
				})
			},
			tabSelect(e) {
				console.log(this.TabCur);
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		},
		onShow() {
			this.getCommList()
		}
	}
</script>

<style>

</style>
