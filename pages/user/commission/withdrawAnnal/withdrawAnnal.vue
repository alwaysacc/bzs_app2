<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText" @tap="BackPage">返回</block>
			<block slot="content">提现记录</block>
		</cu-custom>
		<view v-if="list!=''">
			<view class="flex justify-between solid-bottom padding" v-for="item in list">
				<view>
					<view>提现时间：{{item.create_time}}</view>
					<view>
						提现金额：
						<text class="text-price text-red">{{item.money}}</text>
					</view>
				</view>
				<view>
					<view>{{item.status}}</view>
				</view>
			</view>
			<view class="cu-load bg-grey light" :class="!isLoad?'loading':'over'"></view>
		</view>
		<view class="padding text-center" v-if="list==''">
			<text>暂无记录</text>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import util from '../../../../comment/similar.js'
	export default {
		computed: mapState(['user']),
		data() {
			return {
				list: {},
				isLoad: true,
				size: 5,
				page: 1,
				maxPage: 0,
			}
		},
		methods: {
			getList() {
				let param = {
					accountId: this.user.accountId,
					page: this.page,
					size: this.size
				}
				this.$http.post(this.$api.getVerificationList, param).then((e) => {
					if (e.code == 200) {
						this.list = e.data.list
						for (var i = 0; i < this.list.length; i++) {
							this.list[i].create_time = util.formatDate(this.list[i].create_time)
							switch (this.list[i].status) {
								case '0':
									this.list[i].status = '待审核'
									break;
								case '1':
									this.list[i].status = '已打款'
									break;
								case '2':
									this.list[i].status = '驳回'
									break;
							}
						}
						this.maxPage = e.data.pages
					} else {

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
