<template>
	<view class="home1">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">回复反馈</block>
		</cu-custom>
		<view class="center">
			<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index == TabCur ? 'text-red cur' : ''" v-for="(item, index) in array" :key="index" @tap="tabSelect" :data-id="index">
						{{ item }}
					</view>
				</view>
			</scroll-view>
			<view v-if="dataList != ''">
				<view class="padding flex justify-between align-center solid-bottom" v-for="(item, index) in dataList" :key="index" @tap="toDetail(item)">
					<view>
						<view class="text-xl">{{ item.title }}</view>
						<view class="text-gray text-sm">{{ item.createTime }}</view>
					</view>
					<view>
						<text class="cu-tag line-blue" v-if="item.status == 1">已回复</text>
						<text class="cu-tag line-yellow" v-else>未回复</text>
					</view>
				</view>
				<uLi-load-more :status="loading"></uLi-load-more>
			</view>
			<view v-else>
				<view><tui-nomore :visible="true" text="暂无数据"></tui-nomore></view>
			</view>
			<!-- <view class="cu-load bg-grey light" :class="!isLoad?'loading':'over'"></view> -->
		</view>
	</view>
</template>

<script>
import tuiNomore from '@/components/nomore/nomore';
import util from '@/comment/similar.js';
import uLiLoadMore from "@/components/uLi-load-more/uLi-load-more.vue"
export default {
	data() {
		return {
			TabCur: 0,
			scrollLeft: 0,
			array: ['未回复', '已回复'],
			dataList: '',
			page: 1,
			size: 10,
			loading: 'more',
			maxPage: 2
		};
	},
	components: {
		uLiLoadMore,
		tuiNomore
	},
	methods: {
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
			this.getFeedbackListByAdmin(1);
		},
		toDetail(e) {
			uni.navigateTo({
				url: 'feedBackDetail/feedBackDetail?map=' + JSON.stringify(e),
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		getFeedbackListByAdmin(e1) {
			let param = {
				page: this.page,
				limit: this.size,
				status: this.TabCur
			};
			let n;
			if (e1 == 1) {
				n = null;
			} else {
				n = 1;
			}
			this.$http.post(this.$api.getFeedbackListByAdmin, param, n).then(e => {
				console.log(e);
				if (e.code == 200) {
					if (e1 == 1) {
						this.dataList = {};
						this.dataList = e.data.list;
					} else {
						this.dataList = this.dataList.concat(e.data.list);
					}
					if (e.data.list.pages <= this.maxPage) {
						this.loading = 'noMore';
					} else {
						this.maxPage = e.data.pages;
						this.loading = 'more';
					}
				} else {
					uni.showToast({
						title: '未知错误，请稍后重试',
						icon: 'none'
					});
				}
				for (var i = 0; i < this.dataList.length; i++) {
					this.dataList[i].createTime = util.formatDate(this.dataList[i].createTime);
				}
			});
		}
	},
	onReachBottom() {
		if (this.page < this.maxPage) {
			this.loading = 'loading';
			this.page += 1;
			let t = this;
			setTimeout(function() {
				t.getFeedbackListByAdmin();
			}, 1000);
		} else {
			this.loading = 'noMore';
		}
	},
	onShow() {
		this.getFeedbackListByAdmin(1);
	}
};
</script>

<style></style>
