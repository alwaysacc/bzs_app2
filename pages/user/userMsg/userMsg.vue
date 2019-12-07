<template>
	<view class="home1">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="false">
			<block slot="backText">返回</block>
			<block slot="content">系统通知</block>
		</cu-custom>
		<!-- <view class="padding flex flex-direction" style="position:fixed;top:45px;align-content:center;background-color:#ffffff;width:100%;">
			<button class="cu-btn bg-green lg" @tap="toAdd()"><text class="cuIcon-add"></text> 添加学习心得体会</button>
		</view>
		-->
		<view :style="[{ top: top + 'px' }]" style="position:fixed;z-index:1;#ffffff;width:100%;">
			<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index == TabCur ? 'text-blue cur' : ''" v-for="(item, index) in array" :key="index" @tap="tabSelect" :data-id="index">
						{{ item }}
					</view>
				</view>
			</scroll-view>
		</view>
		<view style="height: 90upx;" class="bg-gray"></view>
		<view class="">
			<view v-if="list != ''">
				<view class=" margin-sm bg-white" v-for="(i, index) in list" :key="index" @tap="toDetail(i)">
					<view class="padding-sm flex solid-bottom align-center justify-between">
						<view>
							<text class="cuIcon-notice text-blue margin-right-xs"></text>
							{{ i.title }}
						</view>
						<view>{{ i.createTime }}</view>
					</view>
					<view class="padding-sm text-size"></view>
				</view>
				<view class="bg-white margin-sm"><uLi-load-more :status="loading"></uLi-load-more></view>
			</view>
			<view class="bg-white" v-else><tui-tips :fixed="true" imgUrl="/static/img/img_nodata.png">暂无通知</tui-tips></view>
		</view>
	</view>
</template>

<script>
function formatDate(value) {
	let date = new Date(value);
	let y = date.getFullYear();
	let MM = date.getMonth() + 1;
	MM = MM < 10 ? '0' + MM : MM;
	let d = date.getDate();
	d = d < 10 ? '0' + d : d;
	let h = date.getHours();
	h = h < 10 ? '0' + h : h;
	let m = date.getMinutes();
	m = m < 10 ? '0' + m : m;
	let s = date.getSeconds();
	s = s < 10 ? '0' + s : s;
	return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
}

import { mapState } from 'vuex';
import tuiTips from '@/components/tips/tips';
import uLiLoadMore from '@/components/uLi-load-more/uLi-load-more.vue';
export default {
	components: {
		tuiTips,
		uLiLoadMore
	},
	computed: mapState(['user']),
	data() {
		return {
			TabCur: 0,
			scrollLeft: 0,
			array: ['未读', '全部'],
			list: '',
			page: 1,
			size: 10,
			loading: 'more',
			maxPage: 0,
			top: ''
		};
	},
	methods: {
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
			this.page = 1;
			this.size = 10;
			this.getMsgList();
		},
		toDetail(e) {
			uni.navigateTo({
				url: 'msgDetail/msgDetail?map=' + JSON.stringify(e),
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		getMsgList(t) {
			let param = {
				page: this.page,
				limit: this.size,
				userId: this.user.accountId
			};
			if (this.TabCur == 0) {
				param.status = 0;
			}
			this.$http.post(this.$api.getMessageList, param).then(e => {
				if (e.code == 200) {
					if (!e.data.hasNextPage) {
						this.loading = 'noMore';
					} else {
						this.maxPage = e.map.pageInfo.pages;
						this.loading = 'more';
					}
					if (t == 0) {
						this.list = this.list.concat(e.data.list);
					} else {
						this.list = '';
						this.list = e.data.list;
					}
					for (let i = 0; i < this.list.length; i++) {
						this.list[i].createTime = formatDate(this.list[i].createTime);
					}
				}
				console.log(this.list);
			});
		}
	},
	onReachBottom() {
		if (this.page < this.maxPage) {
			this.loading = 'loading';
			this.page += 1;
			let t = this;
			setTimeout(function() {
				t.getMsgList(0);
			}, 1000);
		} else {
			this.loading = 'noMore';
		}
	},
	onLoad() {},
	onShow() {
		this.top = this.CustomBar;
		this.page = 1;
		this.size = 10;
		this.getMsgList();
	}
};
</script>

<style>
.text-size {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	-webkit-line-clamp: 2;
	line-clamp: 2;
	-webkit-box-orient: vertical;
}
</style>
