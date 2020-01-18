<template>
	<view class="home1">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="false">
			<block slot="backText">返回</block>
			<block slot="content">问题反馈</block>
		</cu-custom>
		<view class="center">
			<view v-if="dataList!=''">
			<view class="padding flex justify-between align-center solid-bottom" v-for="(item,index) in dataList" :key="index"
			 @tap="toDetail(item)">
				<view>
					<view class="text-xl">{{item.title}}</view>
					<view class="text-gray text-sm">{{item.createTime}}</view>
				</view>
				<view>
					<text class="cu-tag line-blue" v-if="item.status==1">已回复</text>
					<text class="cu-tag line-yellow" v-else>未回复</text>
				</view>
			</view>
			<uLi-load-more :status="loading"></uLi-load-more>
			<!-- <view class="cu-load bg-grey light" :class="!isLoad?'loading':'over'"></view> -->
			</view>
			<view v-else>
				<view>
					<tui-nomore :visible="true" text="暂无数据"></tui-nomore>
				</view>
			</view>
		</view>
		<view style="height: 140upx;" class="bg-gray"> </view>
		<view class="padding flex flex-direction solids-top" style="position:fixed;bottom:0rpx;align-content:center;background-color:#ffffff;width:100%;z-index: 10;">
			<button class="cu-btn bg-blue lg" @tap="toAdd()"></text>新增反馈</button>
		</view>
	</view>
</template>

<script>
	import tuiNomore from "@/components/nomore/nomore"
	import uLiLoadMore from "@/components/uLi-load-more/uLi-load-more.vue"
	import util from "@/comment/similar.js"
	import {
		mapState
	} from 'vuex'
	export default {
		computed: mapState(['user']),
		components: {
			uLiLoadMore,
			tuiNomore
		},
		data() {
			return {
				dataList: '',
				page: 1,
				size: 10,
				loading: 'more',
				maxPage: 2,
			}
		},
		methods: {
			toAdd(){
				uni.navigateTo({
					url: '../feedback',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			toDetail(e) {
				uni.navigateTo({
					url: '../resultDetail/resultDetail?map=' + JSON.stringify(e),
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			getFeedbackListByUniqueCode(e1) {
				console.log(this.user);
				let param = {
					page: this.page,
					limit: this.size,
					userId: this.user.accountId
				}
				let n
				if (e1 == 1) {
					n = null
				} else {
					n = 1
				}
				this.$http.post(this.$api.getFeedbackList, param, n).then(e => {
					console.log(e);
					if (e.code == 200) {
						if (e1 == 1) {
							this.dataList = {}
							this.dataList = e.data.list
						} else {
							this.dataList = this.dataList.concat(e.data.list)
						}
						if (e.data.list.pages <= this.maxPage) {
							this.loading = 'noMore'
						} else {
							this.maxPage = e.data.pages
							this.loading = 'more'
						}
					} else {
						uni.showToast({
							title: '未知错误，请稍后重试',
							icon: 'none'
						});
					}
					for (var i = 0; i < this.dataList.length; i++) {
						this.dataList[i].createTime=util.formatDate(this.dataList[i].createTime)
					}
				})
			}
		},
		onReachBottom() {
			if (this.page < this.maxPage) {
				this.loading = 'loading'
				this.page += 1
				let t = this
				setTimeout(function() {
					t.getFeedbackListByUniqueCode()
				}, 1000);
			} else {
				this.loading = 'noMore'
			}
		},
		onLoad() {
			this.getFeedbackListByUniqueCode(1)
		}
	}
</script>

<style>

</style>
