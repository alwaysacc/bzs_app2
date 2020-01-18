<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">精准报价</block>
		</cu-custom>
		<view class="center">
			<view class="flex padding justify-between">
				<view><text class="">车牌号</text></view>
				<view class="uni-list-cell-db">{{ param.carNo == null ? map.carInfo.carNumber : param.carNo }}</view>
			</view>
			<view class="flex padding-left padding-right justify-between">
				<view><text class="">交强险起保时间</text></view>
				<view class="uni-list-cell-db">{{ param.cistartDate == null ? map.insuredInfo.nextForceStartDate : param.cistartDate }}</view>
			</view>
			<view class="flex padding justify-between solids-bottom">
				<view><text class="">商业险起保时间</text></view>
				<view class="uni-list-cell-db">{{ param.bistartDate == null ? map.insuredInfo.nextBusinesStartDate : param.cistartDate }}</view>
			</view>
			<view v-if="!show">
				<view class="flex padding justify-between align-center" v-if="tQuote.quoteInsuranceName" @tap="toDeatil(1)">
					<view>
						<view class=" flex align-center">
							<view class="cu-avatar round lg" style="background-image:url(http://bao.91bihu.com/resources/images/quote/tpy.png)"></view>
							<view class="margin-left-sm">
								<view class="">{{ tQuote.quoteInsuranceName }}</view>
								<view>
									<view class="text-gray text-df flex text-left justify-between align-center">
										<text class="cu-load load-icon" :class="tQuote.quoteStatus == 0 ? 'text-red' : 'text-green'">
											{{ tQuote.quoteStatus == 0 ? '报价失败' : tQuote.total }}
										</text>
										<text class="margin-left text-green" v-if="tQuote.submitStatus == 1">核保成功</text>
										<text class="margin-left" v-else-if="tQuote.submitStatus == -1">未核保</text>
										<text class="margin-left text-red" v-else>核保失败</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="cu-load load-icon" :class="tisLoad ? 'loading' : ''">
						<text>申请投保</text>
						<text class="cuIcon-right"></text>
					</view>
				</view>
				<view class="flex padding justify-between align-center" v-if="rQuote.quoteInsuranceName" @tap="toDeatil(4)">
					<view>
						<view class=" flex align-center">
							<view class="cu-avatar round lg" style="background-image:url(http://bao.91bihu.com/resources/images/quote/rb.png)"></view>
							<view class="margin-left-sm">
								<view class="">{{ rQuote.quoteInsuranceName }}</view>
								<view>
									<view class="text-gray text-df flex align-center">
										<text class="cu-load load-icon" :class="rQuote.quoteStatus == 0 ? 'text-red' : 'text-green'">
											{{ rQuote.quoteStatus == 0 ? '报价失败' : rQuote.total }}
										</text>
										<text class="margin-left text-green" v-if="rQuote.submitStatus == 1">核保成功</text>
										<text class="margin-left" v-else-if="rQuote.submitStatus == -1">未核保</text>
										<text class="margin-left text-red" v-else>核保失败</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="cu-load load-icon" :class="tisLoad ? 'loading' : ''">
						<text>申请投保</text>
						<text class="cuIcon-right"></text>
					</view>
				</view>
				<view class="flex padding justify-between align-center" v-if="pQuote.quoteInsuranceName" @tap="toDeatil(2)">
					<view>
						<view class=" flex align-center">
							<view class="cu-avatar round lg" style="background-image:url(http://bao.91bihu.com/resources/images/quote/pa.png)"></view>
							<view class="margin-left-sm">
								<view class="">{{ pQuote.quoteInsuranceName }}</view>
								<view>
									<view class="text-gray text-df flex align-center">
										<text class="cu-load load-icon" :class="pQuote.quoteStatus == 0 ? 'text-red' : 'text-green'">
											{{ pQuote.quoteStatus == 0 ? '报价失败' : pQuote.total }}
										</text>
										<text class="margin-left text-green" v-if="pQuote.submitStatus == 1">核保成功</text>
										<text class="margin-left" v-else-if="pQuote.submitStatus == -1">未核保</text>
										<text class="margin-left text-red" v-else>核保失败</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="cu-load load-icon" :class="tisLoad ? 'loading' : ''">
						<text>申请投保</text>
						<text class="cuIcon-right"></text>
					</view>
				</view>
			</view>
			<view v-if="show">
				<view class="flex padding justify-between align-center" v-if="tshow" @tap="toDeatil(1)">
					<view>
						<view class=" flex align-center">
							<view class="cu-avatar round lg" style="background-image:url(http://bao.91bihu.com/resources/images/quote/tpy.png)"></view>
							<view class="margin-left-sm">
								<view class="">太平洋车险</view>
								<view>
									<view class="text-gray text-df flex align-center">
										<text class="cu-load load-icon" :class="tisLoad ? 'loading' : ''">
											<text v-if="TqouteMsg1 == '报价失败'" class="text-red">{{ TqouteMsg1 }}</text>
											<text v-else-if="TqouteMsg1 == '报价中'" class="">{{ TqouteMsg1 }}</text>
											<text v-else class="text-green">{{ TqouteMsg1 }}</text>
										</text>
										<text class="margin-left">
											<text v-if="TqouteMsg2 == '核保失败'" class="text-red">{{ TqouteMsg2 }}</text>
											<text v-else-if="TqouteMsg2 == '核保成功'" class="text-green">{{ TqouteMsg2 }}</text>
											<text v-else class="">{{ TqouteMsg2 }}</text>
										</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="cu-load load-icon" :class="tisLoad ? 'loading' : ''">
						<text>申请投保</text>
						<text class="cuIcon-right"></text>
					</view>
				</view>
				<view class="flex padding justify-between align-center" v-if="rshow" @tap="toDeatil(4)">
					<view>
						<view class="flex align-center">
							<view class="cu-avatar round lg" style="background-image:url(http://bao.91bihu.com/resources/images/quote/rb.png)"></view>
							<view class="margin-left-sm">
								<view class="flex">
									<text>人保车险</text>
								</view>
								<view>
									<view class="text-gray text-df flex align-center">
										<text class="cu-load load-icon" :class="risLoad ? 'loading' : ''">
											<text v-if="RqouteMsg1 == '报价失败'" class="text-red">{{ RqouteMsg1 }}</text>
											<text v-else-if="RqouteMsg1 == '报价中'" class="">{{ RqouteMsg1 }}</text>
											<text v-else class="text-green">{{ RqouteMsg1 }}</text>
										</text>
										<text class="margin-left">
											<text v-if="RqouteMsg2 == '核保失败'" class="text-red">{{ RqouteMsg2 }}</text>
											<text v-else-if="RqouteMsg2 == '核保成功'" class="text-green">{{ RqouteMsg2 }}</text>
											<text v-else class="">{{ RqouteMsg2 }}</text>
										</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="cu-load load-icon" :class="risLoad ? 'loading' : ''">
						<text>申请投保</text>
						<text class="cuIcon-right"></text>
					</view>
				</view>
				<view class="flex padding justify-between align-center" v-if="pshow" @tap="toDeatil(2)">
					<view>
						<view class=" flex align-center">
							<view class="cu-avatar round lg" style="background-image:url(http://bao.91bihu.com/resources/images/quote/pa.png)"></view>
							<view class="margin-left-sm">
								<view class="">平安车险</view>
								<view>
									<view class="text-gray text-df flex align-center">
										<text class="cu-load load-icon" :class="pisLoad ? 'loading' : ''">
											<text v-if="PqouteMsg1 == '报价失败'" class="text-red">{{ PqouteMsg1 }}</text>
											<text v-else-if="PqouteMsg1 == '报价中'" class="">{{ PqouteMsg1 }}</text>
											<text v-else class="text-green">{{ PqouteMsg1 }}</text>
										</text>
										<text class="margin-left">
											<text v-if="PqouteMsg2 == '核保失败'" class="text-red">{{ PqouteMsg2 }}</text>
											<text v-else-if="PqouteMsg2 == '核保成功'" class="text-green">{{ PqouteMsg2 }}</text>
											<text v-else class="">{{ PqouteMsg2 }}</text>
										</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="cu-load load-icon" :class="pisLoad ? 'loading' : ''">
						<text>申请投保</text>
						<text class="cuIcon-right"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="head padding text-center align-center justify-center solid-bottom solids-top margin-top">
			<button class="cu-btn bg-blue lg" @tap="toHome">返回首页</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			loading: true,
			param: {
				source: ''
			},
			TqouteMsg1: '报价中',
			TqouteMsg2: '未勾选核保',
			RqouteMsg1: '报价中',
			RqouteMsg2: '未勾选核保',
			PqouteMsg1: '报价中',
			PqouteMsg2: '未勾选核保',
			msg: {},
			tisLoad: false,
			risLoad: false,
			pisLoad: false,
			tshow: false,
			rshow: false,
			pshow: false,
			tQuote: {},
			pQuote: {},
			rQuote: {},
			show: false,
			carInfoId: '',
			map: [],
			data: {},
			rbSubmitInfo: false,
			tpySubmitInfo: false,
			paSubmitInfo: false
		};
	},
	methods: {
		toHome() {
			uni.switchTab({
				url: '../../home/home'
			});
		},
		toDeatil(e) {
			uni.navigateTo({
				url: '../quoteDetail/quoteDetail?carInfoId=' + this.carInfoId + '&source=' + e,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		quote(e) {
			let stat = e;
			switch (stat) {
				case '1':
					this.tisLoad = true;
					this.tshow = true;
					break;
				case '2':
					this.pisLoad = true;
					this.pshow = true;
					break;
				case '4':
					this.risLoad = true;
					this.rshow = true;
					break;
			}
			this.$http.post(this.$api.Ws_GetPrecisePrice, this.data).then(e => {
				switch (stat) {
					case '1':
						if (e.code == 200) {
							this.TqouteMsg1 = e.data.total;
							this.data.quoteId = e.quoteId;
							if (this.tpySubmitInfo) {
								this.data.submitGroup = 1;
								this.$http.post(this.$api.Ws_GetSubmitInfo, this.data).then(e1 => {
									this.tisLoad = false;
									if (e1.code == 200) {
										this.TqouteMsg2 = '核保成功';
									} else {
										this.TqouteMsg2 = '核保失败';
									}
								});
							} else {
								this.tisLoad = false;
							}
						} else {
							this.TqouteMsg1 = '报价失败';
							this.tisLoad = false;
							if (this.tpySubmitInfo) {
								this.TqouteMsg2 = '核保失败';
							}
						}
						break;
					case '2':
						if (e.code == 200) {
							this.PqouteMsg1 = e.data.total;
							this.data.quoteId = e.quoteId;
							if (this.paSubmitInfo) {
								this.data.submitGroup = 2;
								this.$http.post(this.$api.Ws_GetSubmitInfo, this.data).then(e1 => {
									this.pisLoad = false;
									if (e1.code == 200) {
										this.PqouteMsg2 = '核保成功';
									} else {
										this.PqouteMsg2 = '核保失败';
									}
								});
							} else {
								this.pisLoad = false;
							}
						} else {
							this.PqouteMsg1 = '报价失败';
							if (this.paSubmitInfo) {
								this.PqouteMsg2 = '核保失败';
							}
							this.pisLoad = false;
						}
						break;
					case '4':
						if (e.code == 200) {
							this.RqouteMsg1 = e.data.total;
							this.data.quoteId = e.quoteId;
							if (this.rbSubmitInfo) {
								this.data.submitGroup = 4;
								this.$http.post(this.$api.Ws_GetSubmitInfo, this.data).then(e1 => {
									this.risLoad = false;
									if (e1.code == 200) {
										this.RqouteMsg2 = '核保成功';
									} else {
										this.RqouteMsg2 = '核保失败';
									}
								});
							} else {
								this.risLoad = false;
							}
						} else {
							this.risLoad = false;
							this.RqouteMsg1 = '报价失败';
							if (this.rbSubmitInfo) {
								this.RqouteMsg2 = '核保失败';
							}
						}
						break;
				}
				uni.hideLoading();
				this.msg = e.data;
			});
			/* 	for (var i = 0; i < list.length; i++) {
						this.$http.post(this.$api.checkByCarNoOrVinNo, this.param).then((e) => {
						})
						console.log(list[i]);s
					} */
		},
		setQuote(e) {
			for (var i = 0; i < e.length; i++) {
				switch (e[i].quoteSource) {
					case '1':
						this.tQuote = e[i];
						break;
					case '2':
						this.pQuote = e[i];
						break;
					case '4':
						this.rQuote = e[i];
						break;
				}
			}
		}
	},
	onLoad(e) {
		if (e.carInfoId) {
			var pages = getCurrentPages();
			var prevPage = pages[pages.length - 2]; //上一个页面
			// #ifdef MP-WEIXIN
			this.map = prevPage.data.map;
			// #endif
			// #ifdef H5
			this.map = prevPage.map;
			// #endif
			//console.log(JSON.parse(e.quote));
			this.setQuote(this.map.quote);
			this.carInfoId = e.carInfoId;
		} else {
			this.show = true;
			this.param = JSON.parse(e.param);
			this.carInfoId = this.param.carInfoId;
			let list = e.companyList.split(',');
			let list2 = e.companyList2.split(',');
			for (var i = 0; i < list2.length; i++) {
				switch (list2[i]) {
					case '1':
						this.tpySubmitInfo = true;
						this.TqouteMsg2 = '核保中';
						break;
					case '2':
						this.paSubmitInfo = true;
						this.PqouteMsg2 = '核保中';
						break;
					case '4':
						this.rbSubmitInfo = true;
						this.RqouteMsg2 = '核保中';
						break;
				}
			}
			this.data = {
				licenseNo: this.param.carNo,
				carInfoId: this.param.carInfoId,
				createBy: this.param.createdBy
			};
			for (var i = 0; i < list.length; i++) {
				this.data.quoteGroup = list[i];
				this.quote(list[i]);
			}
		}
	}
};
</script>

<style>
.load-icon {
	padding: 0;
	margin: 0;
}

.cu-load {
	display: block;
	line-height: 1.5em;
	text-align: center;
}

.pa {
	padding-bottom: -5px;
}

.margin-left-sm .margin-left {
	margin-left: 100upx;
}
</style>
