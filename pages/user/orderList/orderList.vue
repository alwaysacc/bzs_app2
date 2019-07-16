<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">我的订单</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav head">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in array" :key="index"
				 @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
			</view>
			<!-- <view>
				<view class="padding-bottom-xs bg-grey light"></view>
				<view class="flex padding-sm align-center solid-bottom">
					<view class="basis-xs radius">
						<view class="cu-avatar xl round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg);"></view>
					</view>
					<view class="basis-xl radius">
						<view class="flex justify-between align-center">
							<view class="text-xl">苏A152</view>
							<view class="text-red ">已取消</view>
						</view>
						<view class="text-gray margin-top-sm">车型:</view>
						<view class="flex justify-between align-center margin-top-sm">
							<view class="text-gray">投保人:</view>
							<view>
								<text class="text-price text-xl text-progress">2356</text>
							</view>
						</view>
					</view>
				</view>
				<view class="flex padding-sm justify-between align-center solid-bottom">
					<view class="text-lg text-grey">取消原因:其它</view>
					<view class="text-red"><button class="cu-btn lg line-blue">重新报价</button></view>
				</view>
			</view>
		 -->
		</scroll-view>
		<view class="center">
			<view v-if="list!=''">
				<view v-for="(item) in list">
					<view class="padding-bottom-xs bg-grey light"></view>
					<view class="flex padding-sm align-center solid-bottom">
						<view class="basis-xs radius">
							<view class="cu-avatar xl round" :style="item.imgUrl"></view>
							<!-- 						<view class="cu-avatar xl round" style="background-image:url(http://bao.91bihu.com/resources/images/quote/tpy.png);"></view> -->
						</view>
						<view class="basis-xl radius">
							<view class="flex justify-between align-center">
								<view class="text-xl">{{item.car_number}}</view>
								<view class="text-red">{{item.pay_status}}</view>
							</view>
							<view class="text-gray margin-top-sm flex">车型:
								<view class="text-cut radius" style="width:220px">{{item.brand_model}}</view>
							</view>
							<view class="flex justify-between align-center margin-top-sm">
								<view class="text-gray">投保人:{{item.license_owner}}</view>
								<view>
									<text class="text-price text-xl text-progress">{{item.pay_money}}</text>
								</view>
							</view>
						</view>
					</view>
					<view class="flex padding-sm justify-between align-center solid-bottom" v-if="item.pay_status=='待支付'">
						<view class="text-lg text-grey">过期时间:{{item.pay_end_date}}</view>
						<view class="text-red"><button class="cu-btn lg line-blue" @tap="toPay(item)">去支付</button></view>
					</view>
					<view class="flex padding-sm justify-between align-center solid-bottom" v-else>
						<view class="text-lg text-grey">取消原因:{{item.cancel_msg}}</view>
						<view class="text-red"><button class="cu-btn lg line-red" @tap="toPay(item)">重新报价</button></view>
					</view>
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
	import util from '../../../comment/similar.js'
	import {
		mapState
	} from 'vuex'
	export default {
		computed: mapState(['user']),
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				array: [
					'全部', '待支付', '已承保', '已取消', '已过期'
				],
				num: 9,
				size: 5,
				page: 1,
				isLoad: true,
				list: [],
				maxPage: 0,
			}
		},
		methods: {
			tabSelect(e) {
				console.log(e.currentTarget.dataset.id);
				this.TabCur = e.currentTarget.dataset.id;
				switch (parseInt(this.TabCur)) {
					case 0:
						this.num = 9
						break;
					case 1:
						this.num = 0
						break;
					case 2:
						this.num = 1
						break;
					case 3:
						this.num = 2
						break;
					case 4:
						this.num = 3
						break;
				}
				this.getOrderList()
				//this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			toPay(e) {
				console.log(e);
				uni.navigateTo({
					url: '../../order/orderDetail/orderDetail?orderId=' + e.order_id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			getOrderList(e) {
				let param = {
					accountId: this.user.accountId,
					payStatus: this.num,
					page: this.page,
					size: this.size
				}
				this.$http.post(this.$api.getOrderList, param).then((e) => {
					if (e.code == 200) {
						if (e == 1) {
							//this.list=e.data.list
							this.list = this.list.concat(e.data.list)
							this.maxPage = e.data.pages
						} else {
							this.list = ''
							this.list = e.data.list
						}
						for (var i = 0; i < this.list.length; i++) {
							switch (this.list[i].quote_source) {
								case '1':
									this.list[i].imgUrl = 'background-image:url(http://bao.91bihu.com/resources/images/quote/tpy.png)'
									break;
								case '2':
									this.list[i].imgUrl = 'background-image:url(http://bao.91bihu.com/resources/images/quote/pa.png)'
									break;
								case '4':
									console.log(this.list[i].imgUrl);
									this.list[i].imgUrl = 'background-image:url(http://bao.91bihu.com/resources/images/quote/rb.png)'
									//this.list[i].imgUrl = 'background-image:url(../../../static/img/pa.png)'
									break;
							}
							switch (this.list[i].pay_status) {
								case 0:
									this.list[i].pay_status = '待支付'
									break;
								case 1:
									this.list[i].pay_status = '已完成'
									break;
								case 2:
									this.list[i].pay_status = '已取消'
									break;
								case 3:
									this.list[i].pay_status = '已过期'
									break;
							}
						}
						console.log(this.list);
					} else {
						uni.showToast({
							title: '获取失败，请稍后再试',
							icon: 'none',
							mask: false,
							duration: 1500
						});
					}
				})
			}

		},
		onReachBottom() {
			console.log(this.page);
			console.log(this.maxPage);
			this.isLoad = false
			if (this.page < this.maxPage) {
				this.page += 1
				console.log(this.page);
				this.getOrderList(1)
			} else {
				this.isLoad = true
			}
			console.log(222);
		},
		onShow(option) {
			switch (parseInt(this.TabCur)) {
				case 0:
					this.num = 9
					break;
				case 1:
					this.num = 0
					break;
				case 2:
					this.num = 1
					break;
				case 3:
					this.num = 2
					break;
				case 4:
					this.num = 3
					break;
			}
			this.getOrderList()
		},
		onLoad(option) {
			this.TabCur = option.TabCur
		}
	}
</script>

<style>

</style>
