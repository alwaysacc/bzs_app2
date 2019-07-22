<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">订单详情</block>
		</cu-custom>
		<view class="center" v-if="loading">
			<view>
				<view v-if="map.orderInfo.payStatus==0" class="padding-left padding-top-xs flex justify-between">
					<view>
						<text class="cuIcon-time">待支付</text>
					</view>
				</view>
				<view v-else class="padding-left padding-top-xs padding-right flex justify-between align-center">
						<text class="cuIcon-info">订单已取消</text>
						<text class="">{{map.orderInfo.updateTime}}</text>
				</view>
				<view class="padding-left padding-bottom-sm padding-top-xs solids-bottom" v-if="map.orderInfo.payStatus==0">
					请在<text class="text-red text-bold">{{map.quoteInfo.payEndDate}}</text>前完成支付
				</view>
				<view class="padding-left padding-bottom-sm padding-top-xs solids-bottom" v-else>
					取消原因:{{map.orderInfo.cancelMsg}}
				</view>
			</view>
			<!-- <view class="padding" @tap="toSetDelivery">
				<view class="flex">
					<view class="flex-twice radius align-center">
						<text class="margin-right cuIcon-location">hhh</text>
						<text class="margin-right">15518727891</text>
					</view>
					<view class="flex-sub radius text-right">
						<view class='cu-tag line-orange radius'>网点自取</view>
					</view>
				</view>
			</view> -->
			<view class="padding-bottom-sm bg-grey light"></view>
			<view class="flex-twice padding-top padding-bottom radius text-left" @tap="toDetail">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" :style="imgUrl"></view>
						<view class="content flex-sub">
							<view class="">
								<text class="text-xl">{{map.carInfo.carNumber}}</text>
							</view>
							<view class="text-df text-gray">车型:{{map.carInfo.carModel==null?map.carInfo.brandModel:map.carInfo.carModel}}</view>
							<view class="text-gray text-df">
								<text class="basis-xl margin-right">
									投保人:{{map.carInfo.licenseOwner}}
								</text>
								<text class="margin-left-xl">原价:￥{{map.quoteInfo.total}}</text>
							</view>
						</view>
						<text class="cuIcon-right"></text>
					</view>
				</view>
			</view>
			<view class="padding-bottom-sm bg-grey light"></view>
			<view class="padding-left padding-right padding-top grid  col-2">
				<view class="">收款方</view>
				<view class="text-right">
					保险公司
				</view>
			</view>
			<view class="padding-left padding-right text-df padding-top grid  col-2">
				<view class="">商业险优惠</view>
				<view class="text-right">
					{{map.quoteInfo.bizRate}}%
				</view>
			</view>
			<view class="padding-left padding-right text-df padding-top grid  col-2">
				<view class="">交强险优惠</view>
				<view class="text-right">
					{{map.quoteInfo.forceRate}}%
				</view>
			</view>
			<view class="padding  solids-bottom padding-right padding-top grid  col-2">
				<view class="">应返金额</view>
				<view class="text-right">
					<text class="text-price">0.00</text>
				</view>
			</view>
			<view class="padding  solids-bottom padding-right padding-top grid  col-2">
				<view class=""></view>
				<view class="text-right">
					应付金额:<text class="text-price text-red text-xl">{{price}}</text>
				</view>
			</view>
			<view class="padding-bottom-sm bg-grey light"></view>
			<view class="padding-left padding-right text-gray text-df padding-top grid  col-2">
				<view class="">下单时间</view>
				<view class="text-right">
					{{map.orderInfo.createTime}}
				</view>
			</view>
			<view class="padding-left padding-right text-gray text-df padding-top grid  col-2">
				<view class="">出单员</view>
				<view class="text-right">
					保之顺
				</view>
			</view>
		</view>
		<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-grey light flex justify-center">
					<view>选择取消原因</view>
				</view>
				<view class="bg-white ">
					<view @tap="payCancel(1)" class="text-xl padding-top padding-bottom solids-bottom">报价信息异常，不能出单</view>
					<view @tap="payCancel(2)" class="text-xl padding-top padding-bottom solids-bottom">客户无意愿出单</view>
					<view @tap="payCancel(3)" class="text-xl padding-top padding-bottom solids-bottom">想更换投保公司</view>
					<view @tap="payCancel(4)" class="text-xl padding-top padding-bottom solids-bottom">其它</view>
					<view class="padding-bottom-sm  bg-grey light"></view>
					<view class="text-xl padding-top padding-bottom solids-bottom" @tap="hideModal">取消</view>
				</view>
			</view>
		</view>
		<view class="head padding  align-center justify-end  solids-top margin-top" v-if="loading">
			<!-- <button class="cu-btn  bg-white shadow" @tap="next">确认支付</button> -->
			<button v-if="map.orderInfo.payStatus==0"  class="cu-btn  bg-red shadow lg" @tap="showModal" data-target="bottomModal">取消订单</button>
			<button v-if="map.orderInfo.payStatus==0"  class="cu-btn bg-blue lg" @tap="toPay">去支付</button>
			<button v-if="map.orderInfo.payStatus!=0"  class="cu-btn bg-blue lg" @tap="toQuote">重新报价</button>
		</view>
	</view>
</template>

<script>
	import uniCountdown from "@dcloudio/uni-ui/lib/uni-countdown/uni-countdown.vue"
	import util from '../../../comment/similar.js'
	import {
		mapState
	} from 'vuex'
	export default {
		computed: mapState(['user']),
		data() {
			return {
				loading: false,
				map: [],
				date: '',
				orderId: '',
				price: '',
				imgUrl: '',
				modalName: ''
			}
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			payCancel(e) {
				this.modalName = null
				uni.showLoading({
					title: '拼命加载中',
					mask: false
				});
				let msg = ''
				switch (e) {
					case 1:
						msg = '报价信息异常，不能出单'
						break;
					case 2:
						msg = '客户无意愿出单'
						break;
					case 3:
						msg = '想更换投保公司'
						break;
					case 4:
						msg = '其它'
						break;
				}
				let param = {
					carVin: this.map.carInfo.frameNumber,
					licenseNo: this.map.carInfo.carNumber,
					source: this.map.quoteInfo.quoteSource,
					buid: this.map.quoteInfo.buid,
					orderId: this.map.orderInfo.orderId,
					bizNo: this.map.quoteInfo.bizNo,
					transactionNum: this.map.quoteInfo.paymentNotice,
					forceNo: this.map.quoteInfo.forceNo,
					channelId: this.map.quoteInfo.channelId,
					//payWay: this.map.orderInfo.orderId,
					quoteId: this.map.quoteInfo.quoteId,
					cancelMsg: msg
				}
				this.$http.post(this.$api.WX_DoVoidPay, param).then((e) => {
					uni.hideLoading()
					if(e.code==200){
						uni.showModal({
							title: '提示',
							content: '订单已取消',
							showCancel: false,
							cancelText: '',
							confirmText: '确定',
							success: res => {
								uni.navigateBack({
									delta: 1
								});
							},
							fail: () => {},
							complete: () => {}
						});
					}
				})
			},
			toDetail() {
				this.map.quoteInfo.payUrl = ''
				this.map.imgUrl = this.imgUrl
				uni.navigateTo({
					url: '../insuredDetail/insuredDetail?map=' + JSON.stringify(this.map),
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			toQuote(){
				uni.navigateTo({
					url: '../../quote/choiceInsurance/choiceInsurance?map='+JSON.stringify(this.map),
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			toPay() {
				uni.navigateTo({
					url: '../waitPay/waitPay?orderId=' + this.orderId,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			orderDetail() {
				uni.showLoading({
					title: '拼命加载中',
					mask: false
				});
				let param = {
					orderId: this.orderId,
					quoteId: this.quoteId
				}
				this.$http.post(this.$api.getOrderDetail, param, 1).then((e) => {
					if (e.code == 200) {
						this.map = e.data
						if (this.map.quoteInfo.bizPremiumByDis != null) {
							this.map.quoteInfo.bizPremiumByDis = this.map.quoteInfo.bizPremiumByDis.replace(",", "")
							this.map.quoteInfo.bizPremiumByDis = parseFloat(this.map.quoteInfo.bizPremiumByDis)
						}
						this.price = (this.map.quoteInfo.bizPremiumByDis + this.map.quoteInfo.taxTotal + this.map.quoteInfo.forceTotal)
							.toFixed(2)
						this.date = util.getDateForEnd(this.map.orderInfo.createTime)
						this.map.orderInfo.createTime = util.formatDate(e.data.orderInfo.createTime)
						this.map.orderInfo.updateTime=util.formatDate(this.map.orderInfo.updateTime)
						switch (this.map.quoteInfo.quoteSource) {
							case '1':
								this.imgUrl = "background-image:url(http://bao.91bihu.com/resources/images/quote/tpy.png)"
								break;
							case '2':
								this.imgUrl = "background-image:url(http://bao.91bihu.com/resources/images/quote/pa.png)"
								break;
							case '4':
								this.imgUrl = "background-image:url(http://bao.91bihu.com/resources/images/quote/rb.png)"
								break;
						}
					}
					uni.hideLoading()
					this.loading = true
				})
			},
		},
		onLoad(e) {
			if(e.quoteId){
				this.quoteId = e.quoteId
				this.orderId = ''
			}else{
				this.orderId = e.orderId
			}
			this.orderDetail()

		},
		components: {
			uniCountdown
		}
	}
</script>

<style>
	.head button {
		margin-left: 10upx;
	}
</style>
