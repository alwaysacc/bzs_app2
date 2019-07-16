<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">收益记录</block>
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
			<view v-if="list!=''">
				<view class="padding flex justify-between solids-bottom">
					<text>车牌号</text>
					<text>保费</text>
					<text class="padding-right">佣金</text>
				</view>
				<view class="padding flex justify-between solids-bottom" v-for="item in list" @tap="toDetail(item)">
					<text>{{item.car_number}}</text>
					<text>￥{{item.total}}</text>
					<text> ￥{{item.biz_cash+item.force_cash}} <text class="cuIcon-right"></text></text>
				</view>
				<view class="cu-load bg-grey light" :class="!isLoad?'loading':'over'"></view>
			</view>
			<view class="padding text-center" v-if="list==''">
				<text>暂无记录</text>
			</view>
		</view>
		<view v-else>
			<view v-if="list!=''">
				<view class="padding flex justify-between solids-bottom">
					<text>代理人</text>
					<text class="">保费</text>
					<text class="padding-right">提成</text>
				</view>
				<view class="padding flex justify-between solids-bottom" v-for="item in list">
					<text>{{item.user_name}}</text>
					<text>￥{{item.biz_total}}</text>
					<text> ￥{{item.cash}}</text>
				</view>
				<view class="cu-load bg-grey light" :class="!isLoad?'loading':'over'"></view>
			</view>
			<view class="padding text-center" v-if="list==''">
				<text>暂无记录</text>
			</view>
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
				TabCur: 0,
				scrollLeft: 0,
				array: ['佣金', '提成'],
				list: [],
				isLoad: true,
				size: 5,
				page: 1,
				maxPage: 0,
			}
		},
		methods: {
			tabSelect(e) {
				if (this.TabCur != e.currentTarget.dataset.id) {
					this.TabCur = e.currentTarget.dataset.id;
					this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
					this.list = ''
					this.getList()
				}
			},
			toDetail(e) {
				uni.navigateTo({
					url: '../commissionDetail/commissionDetail?detail=' + JSON.stringify(e),
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			getList() {
				let param = {
					incomePerson: this.user.accountId,
					type: this.TabCur,
					page: this.page,
					size: this.size
				}
				this.$http.post(this.$api.getDrawCashList, param).then((e) => {
					if (e.code == 200) {
						this.list = e.data.list
						for (var i = 0; i < this.list.length; i++) {
							this.list[i].biz_cash = Number(Number(this.list[i].biz_cash).toFixed(0))
							this.list[i].force_cash = Number(Number(this.list[i].force_cash).toFixed(0))
						}
						this.maxPage = e.data.pages
					}
				})

			}
		},
		onReachBottom() {
			this.isLoad = false
			if (this.page < this.maxPage) {
				this.page += 1
				this.getList()
			} else {
				this.isLoad = true
			}
		},
		onShow() {
			this.getList()
		}
	}
</script>

<style>

</style>
