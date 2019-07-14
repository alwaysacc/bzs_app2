<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">报价详情</block>
		</cu-custom>
		<view class="center">
			<view class="padding-sm grid solid-bottom col-2 align-center">
				<view class="">
					<view class="cu-avatar round lg" :style="imgUrl"></view>
					<text class="margin-left-xs">{{quote.quoteInsuranceName}}</text>
				</view>
				<view class="text-right">
					<text class="text-red">￥{{quote.total+0}}</text>
				</view>
			</view>
			<view class="padding solid-bottom">
				<view>
					<text>车牌号：{{map.carInfo.carNumber}}</text>
				</view>
				<view>
					<text>品牌型号：{{map.carInfo.brandModel}}</text>
				</view>
				<view>
					<text>交强险起保时间：{{map.insuredInfo.nextForceStartDate}}</text>
				</view>
				<view>
					<text>商业险起保时间：{{map.insuredInfo.nextBusinesStartDate}}</text>
				</view>
			</view>
			<view class="padding-sm grid solid-bottom col-2 align-center">
				<view class="">
					<text class="margin-left-xs">交强险</text>
				</view>
				<view class="text-right">
					<text class="">{{quote.forceTotal==null?'--':'￥'+quote.forceTotal}}</text>
				</view>
			</view>
			<view class="padding-sm grid solid-bottom col-2 align-center">
				<view class="">
					<text class="margin-left-xs">车船税</text>
				</view>
				<view class="text-right">
					<text class="">{{quote.taxTotal==null?'--':'￥'+quote.taxTotal}}</text>
				</view>
			</view>
			<view class="padding-sm grid solid-bottom col-2 align-center">
				<view class="">
					<text class="margin-left-xs">商业险</text>
				</view>
				<view class="text-right">
					<text class="">{{quote.bizPremiumByDis+0==0?'--':'￥'+quote.bizPremiumByDis}}</text>
				</view>
			</view>
			<view class="padding-sm grid solid-bottom col-2 align-center">
				<view class="">
					<text class="margin-left-xs">保费总额</text>
				</view>
				<view class="text-right">
					<text class="">{{quote.total+0==0?'--':'￥'+quote.total}}</text>
				</view>
			</view>
			<view v-if="amount==0">
				<view class="padding-sm grid solid-bottom col-2 align-center">
					<view class="">
						<text class="margin-left-xs">报价状态</text>
					</view>
					<view class="text-right">
						<text class="">{{quote.quoteStatus==0?'报价失败':'报价成功'}}</text>
					</view>
				</view>
				<view class="padding-sm grid solid-bottom flex align-center">
					<p class="margin-left-xs" :class="qSee?'p-cut':''" @tap="see('q')">
						报价内容:<span class="font">{{quote.quoteResult}}</span>
					</p>
				</view>
				<view class="padding-sm grid solid-bottom col-2 align-center">
					<view class="">
						<text class="margin-left-xs">核保状态</text>
					</view>
					<view class="text-right">
						<text class="text-blue" @tap="toHeBao" v-if="quote.submitStatus==-1 &&quote.quoteStatus==1">去核保
							<text class="text-blue cuIcon-right"></text>
						</text>
						<text class="text-blue" @tap="toHeBao" v-else-if="quote.submitStatus==3">重新核保</text>
						<text class="" v-else-if="quote.quoteStatus!=1">报价失败无法核保</text>
						<text class="" v-else>{{quote.submitStatus==1?'核保成功':'核保失败'}}</text>
					</view>
				</view>
				<view class="padding-sm grid solid-bottom flex align-center">
					<p class="margin-left-xs" :class="sSee?'p-cut':''" @tap="see('e')">
						核保内容:
						<span class="font">{{quote.submitresult}}</span>
					</p>
				</view>
			</view>
			<!-- 	<view class="padding-sm grid solid-bottom col-2 align-center">
				<view class="">
					<text class="margin-left-xs">商业险预期赔付率</text>
				</view>
				<view class="text-right">
					<text class="">0.5</text>
				</view>
			</view> -->
			<view class="margin-sm solid">
				<view class="text-center padding-xs bg-grey light">
					<text class="text-black">客户车险计算器</text>
				</view>
				<view class="padding-xs flex align-center">
					商业险优惠费率
					<input type="number" @focus="buCancal" 
					@input="sChange(0)" v-model="bu" @blur="calculate"
					class="solids margin-left-xs" style="width: 100upx;" />
					%×{{quote.bizPremiumByDis==null?'0':quote.bizPremiumByDis}}
				</view>
				<view class="padding-xs flex align-center">
					交强险优惠费率<input type="number" @focus="fuCancal" @blur="calculate"
					@input="sChange(1)" v-model="fu" class="solids margin-left-xs" style="width: 100upx;" />
					%×{{quote.forceTotal==null?'0':quote.forceTotal}}
				</view>
				<view class="padding-xs flex align-center">
					<radio value="A" :checked="tax" :class="tax?'checked':''" color="#39B54A"></radio>去增值税税点
				</view>
				<!-- <view class="text-center padding-xs">
					<button class="cu-btn line-blue lg" style="width: 30%;" @tap="calculate">计算</button>
				</view> -->
				<view class="flex padding-xs justify-between" v-if="amount!=0">
					<view>
						优惠金额: ￥{{amount}}
					</view>
					<view>
						优惠价格: ￥{{price}}
					</view>
				</view>
			</view>
		</view>


		<view class="head cu-bar tabbar shop padding-top" v-show="!quoteState">
			<view class="action text-center solid-right" @tap="toFollow">
				<view class="cuIcon-cu-image">
					<text class="cuIcon-edit"></text>
				</view>
				<view class="but">跟进</view>
			</view>
			<!-- <view class="action text-center solid-right" @tap="toSendMsg">
				<view class="cuIcon-cu-image">
					<text class="cuIcon-mark"></text>
				</view>
				<view class="but">短信</view>
			</view>
			<view class="action text-center">
				<button class='btn2' open-type='share'>
					<text class="cuIcon-weixin btnImg"></text>
					<view>微信</view>
				</button>
			</view>
			<view class="bg-blue submit lg" @tap="toQuote">申请投保</view> -->
			<view class="bg-red submit lg" @tap="toQuote2">重新报价</view>
		</view>

		<view class="head cu-bar tabbar shop padding-top" v-show="quoteState">
			<view class="action text-center solid-right" @tap="toFollow">
				<view class="cuIcon-cu-image">
					<text class="cuIcon-edit"></text>
				</view>
				<view class="but">跟进</view>
			</view>
			<view class="action text-center solid-right" @tap="toSendMsg">
				<view class="cuIcon-cu-image">
					<text class="cuIcon-mark"></text>
				</view>
				<view class="but">短信</view>
			</view>
			<view class="action text-center">
				<button class='btn2' open-type='share'>
					<text class="cuIcon-weixin btnImg"></text>
					<view>微信</view>
				</button>
			</view>
			<view class="bg-blue submit lg" @tap="toQuote">申请投保</view>
			<view class="bg-red submit lg" @tap="toQuote2">重新报价</view>
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
				loading: false,
				quoteState: true,
				carInfoId: '',
				map: [],
				source: '',
				quote: {},
				imgUrl: '',
				qSee: true,
				sSee: true,
				calculateStat: false,
				bu: '',
				fu: '',
				amount: '',
				price: '',
				tax: true
			}
		},
		methods: {
			fuCancal() {
				this.fu = ''
			},
			buCancal() {
				this.bu = ''
			},
			setRadio() {
				this.tax = !this.tax
			},
			sChange(e) {
				if (e == 0) {
					if (this.bu.length == 2) {
						uni.hideKeyboard()
					}
				} else {
					if (this.fu.length == 1) {
						uni.hideKeyboard()
					}
				}
			},
			toSendMsg() {
				this.map.quote = ''
				this.map.quote = this.quote
				uni.navigateTo({
					url: '../sendMsg/sendMsg?map=' + JSON.stringify(this.map),
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			calculate() {
				let a = 0
				let b = 0
				if (this.tax) {
					if (this.bu) {
						a = (this.bu / 100 * this.quote.bizPremiumByDis / 1.06).toFixed(2)
						console.log(a);
					}
					if (this.fu) {
						b = (this.fu / 100 * this.quote.forceTotal / 1.06).toFixed(2)
						console.log(b);
					}
				} else {
					if (this.bu) {
						a = (this.bu / 100 * this.quote.bizPremiumByDis).toFixed(2)
						console.log(a);
					}
					if (this.fu) {
						b = (this.fu / 100 * this.quote.forceTotal).toFixed(2)
						console.log(b);
					}
				}

				this.amount = (Number(a) + Number(b)).toFixed(2)
				this.price = (this.quote.total - this.amount).toFixed(2)
				this.calculateStat = true
				console.log(this.amount);
				console.log(this.price);
			},
			toQuote2() {
				uni.navigateTo({
					url: '../../quote/choiceInsurance/choiceInsurance?map=' + JSON.stringify(this.map),
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			toHeBao() {
				uni.showLoading({
					title: '正在核保',
					mask: true
				});
				let param = {
					licenseNo: this.map.carInfo.carNumber,
					carInfoId: this.map.carInfo.carInfoId,
					createBy: this.user.accountId,
					submitGroup: this.quote.quoteSource,
					quoteId: this.quote.quoteId
				}
				console.log(param);
				this.$http.post(this.$api.Ws_GetSubmitInfo, param).then((e1) => {
					console.log(e1);
					if (e1.code == 200) {}
					this.getQuoteDetail(this.carInfoId)
					uni.hideLoading()
				})
			},
			toFollow() {
				uni.navigateTo({
					url: '../followInfo/followInfo',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			toQuote() {
				if (this.quote.quoteStatus != 1) {
					uni.showModal({
						title: '',
						content: '报价失败，无法投保',
						showCancel: false,
						cancelText: '',
						confirmText: '确定',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
					return false
				}
				if (this.quote.submitStatus != 1) {
					uni.showModal({
						title: '',
						content: '核保失败，无法投保',
						showCancel: false,
						cancelText: '',
						confirmText: '确定',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
					return false
				}
				if (this.quote.payUrl != null) {
					uni.showModal({
						title: '',
						content: '该车已创建订单',
						showCancel: true,
						cancelText: '取消',
						confirmText: '订单详情',
						success: res => {
							if (res.confirm) {
								uni.navigateTo({
									url: '../../order/orderDetail/orderDetail?quoteId=' + this.quote.quoteId,
									success: res => {},
									fail: () => {},
									complete: () => {}
								});
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						},
						fail: () => {},
						complete: () => {}
					});
					return false
				}
				this.map.imgUrl = this.imgUrl
				this.map.quote = this.quote
				console.log(this.map);
				uni.navigateTo({
					url: '../confirmRelation/confirmRelation',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},

			getQuoteDetail(e) {
				switch (this.source) {
					case '1':
						this.imgUrl = 'background-image:url(http://bao.91bihu.com/resources/images/quote/tpy.png)'
						break;
					case '2':
						this.imgUrl = 'background-image:url(http://bao.91bihu.com/resources/images/quote/pa.png)'
						break;
					case '4':
						this.imgUrl = 'background-image:url(http://bao.91bihu.com/resources/images/quote/rb.png)'
						break;
				}
				let param = {
					carInfoId: e
				}
				this.$http.post(this.$api.quoteDetails, param).then((e) => {
					uni.hideLoading()
					if (e.code == 200) {
						for (var i = 0; i < e.data.quote.length; i++) {
							console.log(e.data.quote[i])
							if (e.data.quote[i].quoteSource == this.source) {
								this.quote = e.data.quote[i]
							}
						}
						if (this.quote.quoteStatus == 0) {
							this.quoteState = false
						}
						this.map = e.data
						console.log(this.map);
						console.log(this.quote);
					} else {
						uni.showToast({
							title: '获取失败',
							icon: "none",
							mask: false,
							duration: 1500
						});
					}
					let t = this
					setTimeout(function() {
						uni.hideLoading()
						t.loading = true
					}, 1000)
					console.log(e);
				})
			},
			see(e) {
				if (e == 'q') {
					this.qSee = !this.qSee
				} else {
					this.sSee = !this.sSee
				}
			}
		},
		onLoad(e) {
			uni.showLoading({
				title: '拼命加载中',
				mask: true
			});
			this.carInfoId = e.carInfoId
			this.source = e.source
			this.getQuoteDetail(e.carInfoId)
		},
		onShareAppMessage: function(ops) {
			let t = this
			if (ops.from === 'button') {
				// 来自页面内转发按钮
				console.log(ops.target)
			}
			return {
				title: '【' + t.map.carInfo.carNumber + '】' + '车险报价单',
				path: 'pages/main/main?sss=' + 'adsasd',
				success: function(res) {
					// 转发成功
					console.log("转发成功:" + JSON.stringify(res));
				},
				fail: function(res) {
					// 转发失败
					console.log("转发失败:" + JSON.stringify(res));
				}
			}
		}
	}
</script>

<style>
	.btnImg {}

	.btn2 {
		padding: 0;
		border: none 0;
		font: inherit;
		color: inherit;
		background-color: transparent;
		cursor: pointer;
		background-color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 24upx !important;
	}

	.btn2::after {
		border: 0;
	}

	.but {
		font-size: 24upx;
	}

	.font {
		color: #666666;
	}

	.p-cut {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3; //需要控制的文本行数
		overflow: hidden;
	}
</style>
