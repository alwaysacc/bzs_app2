<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">我的代理人</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav text-center solid-bottom">
			<view class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in array" :key="index" @tap="tabSelect"
			 :data-id="index">
				{{item}}
			</view>
		</scroll-view>
		<view v-if="none" class="text-center padding">
			<text class="text-gray text-center text-xl">暂无相关信息</text>
		</view>
		<view class="" v-for="(item,index) in list" :key="index" @tap="toDetail(item)">
			<view class="flex justify-between padding-sm solid-bottom">
				<view>
					<view class="padding-bottom-sm ">
						<text class="text-bold text-xl">{{item.userName}}</text>
						<text class="text-gray margin-left" v-if="item.accountState==0">(已启用)</text>
						<text class="text-gray margin-left" v-else-if="item.accountState==1">(已禁用)</text>
						<text class="text-gray margin-left" v-else>(待审核)</text>
					</view>
					<view>{{item.mobile}}</view>
				</view>
				<view>
					<view class="text-right"><text class="cuIcon-right"></text></view>
					<view class="text-gray">{{item.createdTime}}</view>
				</view>
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
				array: ['全部', '已启用', '已禁用', '待审核'],
				list:[],
				none:false
			}
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				switch (parseInt(this.TabCur)) {
					case 0:
						this.getProxyList(9)
						break;
					case 1:
						this.getProxyList(0)
						break;
					case 2:
						this.getProxyList(1)
						break;
					case 3:
						this.getProxyList(2)
						break;
				}
			
			},
			getProxyList(e) {
				let param = {
					id: this.user.accountId,
					accountState: e,
					deep: 2
				}
				this.$http.post(this.$api.getParentList, param).then((e) => {
					if(e.code==200){
						this.none=false
						this.list=e.data
						for (var i = 0; i < this.list.length; i++) {
							this.list[i].createdTime=util.formatDate(this.list[i].createdTime)
						}
					}else{
						this.list={}
						this.none=true
					}
				})
			},
			toDetail(e){
				uni.navigateTo({
					url: '../proxyDetail/proxyDetail?map='+JSON.stringify(e),
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		onLoad(e) {
			
		},
		onShow() {
			this.getProxyList(9)
		}
	}
</script>

<style>

</style>
