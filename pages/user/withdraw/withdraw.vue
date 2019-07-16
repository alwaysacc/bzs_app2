<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">立即提现</block>
		</cu-custom>
		<view class="padding bg-gradual-blue text-center">
			<view class="flex padding justify-center align-center">
				<view>
					<view class="text-xl">可提现金额(元)</view>
					<view class="text-xxl text-red margin-top-sm">{{info.balanceTotal}}</view>
				</view>
			</view>
		</view>
		<view class="padding flex justify-between align-center solid-bottom">
			<view>选择提现账户</view>
			<view>

			</view>
		</view>
		<view class="padding flex justify-around align-center solid-bottom">
			<!-- <button class="cu-btn" :class="stat==1?'line-red':'line-black'" @tap="setAmout(1)">微信余额</button> -->
			<button class="cu-btn" :class="stat==0?'line-red':'line-black'" @tap="setAmout(0)">支付宝</button>
			<button class="cu-btn" :class="stat==2?'line-red':'line-black'" @tap="setAmout(2)">银行卡</button>
		</view>
		<view class="padding flex justify-between align-center solid-bottom" v-if="amount!=''">
			<view>账户</view>
			<view class="text-right">
				{{amount}}
			</view>
		</view>
		<view class="padding flex justify-between align-center solid-bottom" v-if="name!=''">
			<view>姓名</view>
			<view class="text-right">
				{{name}}
			</view>
		</view>
		<view class="cu-form-group solid-bottom">
			<view class="title">提现金额</view>
			<input class="text-right" placeholder="请输入提现金额" @input="priceSize" v-model="price" name="input"></input>
			<button class='cu-btn bg-blue sm shadow' @tap="all">全部提现</button>
		</view>
		<view class="padding text-center margin-top-xl">
			<button class="cu-btn lg bg-blue" :disabled="info.balanceTotal==0" style="width: 50%;" @tap="toSuccess">申请提现</button>
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
				index: -1,
				array: ['支付宝', '微信', '银行卡'],
				list: '',
				amount: '',
				name: '',
				stat: 4,
				ali: {},
				yh: {},
				price: '',
				info: ''
			}
		},
		methods: {
			priceSize(e){
				if(this.price>this.info.balanceTotal){
					this.price=this.info.balanceTotal
					uni.showToast({
						title: '超过可提现金额'
					});
				}
			},
			all() {
				this.price = this.info.balanceTotal
			},
			setAmout(e) {
				this.stat = e
				this.amount = ''
				this.name = ''
				switch (e) {
					case 0:
						if (this.ali.amount == undefined) {
							uni.showModal({
								title: '提示',
								content: '未绑定支付宝',
								showCancel: true,
								cancelText: '取消',
								confirmText: '去绑定',
								success: res => {
									if (res.confirm) {
										uni.navigateTo({
											url: '../commission/amountList/amountList',
											success: res => {},
											fail: () => {},
											complete: () => {}
										});
									} else if (res.cancel) {
										this.stat = 4
									}
								},
								fail: () => {},
								complete: () => {}
							});
						} else {
							this.amount = this.ali.amount
							this.name = this.ali.name
						}
						break;
					case 1:
						if (this.wx.amount == undefined) {
							uni.showModal({
								title: '提示',
								content: '未绑定微信',
								showCancel: true,
								cancelText: '取消',
								confirmText: '去绑定',
								success: res => {
									if (res.confirm) {
										uni.navigateTo({
											url: '../commission/amountList/amountList',
											success: res => {},
											fail: () => {},
											complete: () => {}
										});
									} else if (res.cancel) {
										this.stat = 4
									}
								},
								fail: () => {},
								complete: () => {}
							});
						} else {
							this.amount = this.wx.amount
							this.name = this.wx.name
						}
						break;
					case 2:
						if (this.yh.amount == undefined) {
							uni.showModal({
								title: '提示',
								content: '未绑定银行卡',
								showCancel: true,
								cancelText: '取消',
								confirmText: '去绑定',
								success: res => {
									if (res.confirm) {
										uni.navigateTo({
											url: '../commission/amountList/amountList',
											success: res => {},
											fail: () => {},
											complete: () => {}
										});
									} else if (res.cancel) {
										this.stat = 4
									}
								},
								fail: () => {
									console.log(111);
								},
								complete: () => {}
							});
						} else {
							this.amount = this.yh.amount
							this.name = this.yh.name
						}
						break;
				}
			},
			toSuccess() {
				if (this.price == '') {
					uni.showModal({
						title: '提示',
						content: '请输入提现金额',
						showCancel: false,
						cancelText: '',
						confirmText: '确定',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
					return false
				} else if (this.stat == 4) {
					uni.showModal({
						title: '提示',
						content: '请选择收款账户',
						showCancel: false,
						cancelText: '',
						confirmText: '确定',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
					return false
				}
				let payAccount
				switch (this.stat) {
					case 0:
						payAccount = this.ali
						break;
					case 1:
						payAccount= this.wx
						break;
					case 2:
						payAccount = this.yh
						break;
					default:
						break;
				}
				let balanceTotal = this.info.balanceTotal - this.price
				let param = {
					balanceTotal: balanceTotal,
					accountId: this.user.accountId,
					money: this.price,
					payAccountId:payAccount.id,
					createBy: this.user.accountId,
				}
				this.$http.post(this.$api.updateMoney, param).then((e) => {
					console.log(e);
					if(e.code==200){
						param.payAccount=payAccount
						console.log(param);
						uni.navigateTo({
							url: '../withdrawSuccess/withdrawSuccess?param='+JSON.stringify(param),
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
					}
				})
			},
			getAmount() {
				let param = {
					accountId: this.user.accountId
				}
				this.$http.post(this.$api.getListById, param).then((e) => {
					console.log(e);
					if (e.code == 200) {
						this.list = e.data
						for (var i = 0; i < this.list.length; i++) {
							switch (this.list[i].type) {
								case 0:
									this.ali = this.list[i]
									break;
								case 1:
									this.wx = this.list[i]
									break;
								case 2:
									this.yh = this.list[i]
									break;
							}
						}
					}
				})
			},
			getWithdrowInfo() {
				let param = {
					accountId: this.user.accountId
				}
				this.$http.post(this.$api.getWithdraw, param).then((e) => {
					console.log(e);
					if (e.code == 200) {
						this.info = e.data
			
					}
				})
			
			}
		},
		onLoad(e) {
		},
		onShow() {
			this.getWithdrowInfo()
			this.getAmount()
			this.stat = 4
			this.amount=''
			this.name=''
			this.price=''
		}
	}
</script>

<style>

</style>
