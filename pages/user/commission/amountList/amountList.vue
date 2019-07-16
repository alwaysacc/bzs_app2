<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">账户列表</block>
		</cu-custom>
		<!-- <view class="flex justify-between padding align-center solids-bottom">
			<view>
				<view class="flex align-center">
					<view class='cu-tag radius lg bg-blue'>微信</view>
					<view class="margin-left-sm">{{wx.name}}</view>
				</view>
				<view class="padding-xs text-grey">{{wx.amount}}</view>
			</view>
			<view>{{wx==null?'添加':'修改'}}<text class="cuIcon-right"></text></view>
		</view> -->
		<view class="padding solids-bottom">
			<view class="flex justify-between  align-center">
				<view>
					<view class="flex align-center">
						<view class='cu-tag radius lg bg-blue with'>支付宝</view>
						<view class='margin-left-sm'>{{ali.id!=undefined?'已绑定':'请绑定'}}</view>
					</view>
				</view>
				<view @tap="show(0)"><text :class="aliStat?'cuIcon-fold':'cuIcon-unfold'"></text></view>
			</view>
			<form v-if="aliStat">
				<view class="cu-form-group margin-top">
					<view class="title1">支付宝账号</view>
					<input placeholder="请输入支付宝账号" v-model="ali.amount" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title1">支付宝姓名</view>
					<input placeholder="请输入支付宝姓名" v-model="ali.name" name="input"></input>
				</view>
				<view class="text-center">
					<button v-if="aliUpdate" class="cu-btn bg-blue lg" style="width: 50%;" @tap="update(0)">修改</button>
					<button v-else class="cu-btn bg-blue lg" style="width: 50%;" @tap="save(0)">保存</button>
				</view>
			</form>
		</view>
		<view class="padding solids-bottom">
			<view class="flex justify-between  align-center">
				<view>
					<view class="flex align-center">
						<view class='cu-tag radius lg bg-blue with'>银行卡</view>
						<view class='margin-left-sm'>{{yh.id!=undefined?'已绑定':'请绑定'}}</view>
					</view>
				</view>
				<view @tap="show(2)"><text :class="yhStat?'cuIcon-fold':'cuIcon-unfold'"></text></view>
			</view>
			<form v-if="yhStat">
				<view class="cu-form-group margin-top">
					<view class="title">卡号</view>
					<input placeholder="请输入银行卡卡号" v-model="yh.amount" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">姓名</view>
					<input placeholder="请输入姓名" v-model="yh.name" name="input"></input>
				</view>
				<view class="text-center">
					<button v-if="yhUpdate" class="cu-btn bg-blue lg" style="width: 50%;" @tap="update(2)">修改</button>
					<button v-else class="cu-btn bg-blue lg" style="width: 50%;" @tap="save(2)">保存</button>
				</view>
			</form>
		</view>
		<!-- <view class="padding solids-bottom">
			<view class="flex justify-between  align-center">
				<view>
					<view class="flex align-center">
						<view class='cu-tag radius lg bg-blue with'>微信</view>
						<view class='margin-left-sm'>{{wx.id!=undefined?'已绑定':'请绑定'}}</view>
					</view>
				</view>
				<view @tap="show(1)"><text :class="wxStat?'cuIcon-fold':'cuIcon-unfold'"></text></view>
			</view>
			<form v-if="wxStat">
				<view class="cu-form-group margin-top">
					<view class="title">微信账号</view>
					<input placeholder="请输入微信账号" v-model="wx.amount" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">微信昵称</view>
					<input placeholder="请输入微信昵称" v-model="wx.name" name="input"></input>
				</view>
				<view class="text-center">
					<button v-if="wxUpdate" class="cu-btn bg-blue lg" style="width: 50%;" @tap="update(1)">修改</button>
					<button v-else class="cu-btn bg-blue lg" style="width: 50%;" @tap="save(1)">保存</button>
				</view>
			</form>
		</view> -->
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
				ali: {
					amount: '',
					name: '',
					type: 0,
				},
				wx: {
					amount: '',
					name: '',
					type: 1,
				},
				yh: {
					amount: '',
					name: '',
					type: 2,
				},
				amount: '',
				name: '',
				aliStat: false,
				yhStat: false,
				wxStat: false,
				aliUpdate: false,
				yhUpdate: false,
				wxUpdate: false
			}
		},
		methods: {
			update(e) {
				let param
				switch (e) {
					case 0:
						param = this.ali
						break;
					case 1:
						param = this.wx
						break;
					case 2:
						param = this.yh
						break;
					default:
						break;
				}
				delete param.createTime
				this.$http.post(this.$api.updateAccount, param).then((e) => {
					if (e.code == 200) {
						uni.showToast({
							title: '修改成功',
							icon: 'success'
						});
						let t = this
						setTimeout(function() {
							t.getAmount()
						}, 1000);
					} else {
						uni.showToast({
							title: '修改失败',
						});
					}
				})
			},
			save(e) {
				let param
				switch (e) {
					case 0:
						param = this.ali
						break;
					case 1:
						param = this.wx
						break;
					case 2:
						param = this.yh
						break;
					default:
						break;
				}
				param.accountId = this.user.accountId
				this.$http.post(this.$api.saveAccount, param).then((e) => {
					console.log(e);
					if (e.code == 200) {
						uni.showToast({
							title: '保存成功',
							icon: 'success'
						});
						let t = this
						setTimeout(function() {
							t.getAmount()
						}, 1000);
					} else {
						uni.showToast({
							title: '保存失败',
						});
					}
				})
				console.log(param);
			},
			show(e) {
				if (e == 0) {
					this.aliStat = !this.aliStat
					if(this.aliStat){
						this.wxStat=false
						this.yhStat=false
					}
				} else if (e == 1) {
					this.wxStat = !this.wxStat
					if(this.wxStat){
						this.aliStat=false
						this.yhStat=false
					}
				} else {
					this.yhStat = !this.yhStat
					if(this.yhStat){
						this.aliStat=false
						this.wxStat=false
					}
				}
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
									this.aliUpdate = true
									break;
								case 1:
									this.wx = this.list[i]
									this.wxUpdate = true
									break;
								case 2:
									this.yh = this.list[i]
									this.yhUpdate = true
									break;
							}
						}
					}
				})

			}
		},
		onShow() {
			this.getAmount()
		}
	}
</script>

<style>
	.cu-form-group .title1 {
		text-align: justify;
		padding-right: 30upx;
		font-size: 30upx;
		position: relative;
		height: 60upx;
		line-height: 60upx;
		min-width: calc(5em + 15px);
	}
	.with{
		min-width: calc(5em + 15px);
	}
</style>
