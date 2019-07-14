<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">选择保险公司</block>
		</cu-custom>
		<view class="center">
			<view class="flex flex-wrap justify-between align-center solid-top solid-bottom">
				<view class="basis-df padding">保险公司</view>
				<view class="basis-sm  margin-xs padding radius flex justify-between">
					<text>报价</text>
					<text>核保</text>
				</view>
				<!-- 	<view class="basis-xs  margin-xs padding radius">核保</view> -->
			</view>
			<view class="flex flex-wrap justify-between align-center solid-bottom">
				<view class="basis-df padding">
					<view class="cu-avatar lg round margin-right-xs" style="background-image:url(http://bao.91bihu.com/resources/images/quote/pa.png)"></view>
					平安车险
				</view>
				<view class="basis-sm  margin-xs padding radius flex justify-between">
					<radio :class="paQuote?'checked':''" :checked="paQuote?true:false" @tap="setA('pa')" value="A"></radio>
					<radio :class="pa?'checked':''" :checked="pa?true:false" @tap="setB('pa')" value="A"></radio>
				</view>
				<!-- 	<view class="basis-xs  margin-xs padding radius">
					<radio :class="pa?'checked':''" :checked="pa?true:false" value="A"></radio>
				</view> -->
			</view>
			<view class="flex flex-wrap justify-between align-center solid-bottom">
				<view class="basis-df padding">
					<view class="cu-avatar lg round margin-right-xs" style="background-image:url(http://bao.91bihu.com/resources/images/quote/tpy.png)"></view>
					太平洋车险
				</view>
				<view class="basis-sm  margin-xs padding radius flex justify-between">
					<radio :class="tpyQuote?'checked':''" :checked="tpyQuote?true:false" @tap="setA('tpy')" value="A"></radio>
					<radio :class="tpy?'checked':''" :checked="tpy?true:false" @tap="setB('tpy')" value="A"></radio>
				</view>
				<!-- 	<view class="basis-xs  margin-xs padding radius">
					<radio :class="tpy?'checked':''" :checked="tpy?true:false" value="A"></radio>
				</view> -->
			</view>
			<view class="flex flex-wrap justify-between align-center solid-bottom">
				<view class="basis-df padding">
					<view class="cu-avatar lg round margin-right-xs" style="background-image:url(http://bao.91bihu.com/resources/images/quote/rb.png)"></view>
					人保车险
				</view>
				<view class="basis-sm  margin-xs padding radius flex justify-between">
					<radio :class="rbQuote?'checked':''" :checked="rbQuote?true:false" @tap="setA('rb')" value="A"></radio>
					<radio :class="rb?'checked':''" :checked="rb?true:false" @tap="setB('rb')" value="A"></radio>
				</view>
				<!-- <view class="basis-xs  margin-xs padding radius">
					<radio :class="rb?'checked':''" :checked="rb?true:false" value="A" @tap="setA('rb')" ></radio>
				</view> -->
			</view>
		</view>
		<view class="head padding text-center align-center justify-center solid-bottom solids-top margin-top">
			<button class="cu-btn bg-blue lg" @tap="next">下一步</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				paQuote: false,
				pa: false,
				tpyQuote: false,
				tpy: false,
				rbQuote: false,
				rb: false,
				param: {},
				insured: ''
			}
		},
		methods: {
			next() {
				let companyList = {}
				companyList = new Array()
				if (this.paQuote) {
					companyList.push('2')
				}
				if (this.tpyQuote) {
					companyList.push('1')
				}
				if (this.rbQuote) {
					companyList.push('4')
				}
				let companyList2 = {}
				companyList2 = new Array()
				if (this.pa) {
					companyList2.push('2')
				}
				if (this.tpy) {
					companyList2.push('1')
				}
				if (this.rb) {
					companyList2.push('4')
				}
				this.$http.post(this.$api.Ws_GetPostPrecisePrice, this.param, 1).then((e) => {
					console.log(e);
					if (e.code == 200) {
						uni.navigateTo({
							url: '../precisionQuote/precisionQuote?param=' + JSON.stringify(this.param) + '&companyList=' + companyList + '&companyList2=' + companyList2,
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
					} else if(e.code==429){
						uni.showModal({
							title: '提示',
							content: '您对同一辆车的请求过于频繁，请稍后重试',
							showCancel: false,
							cancelText: '',
							confirmText: '确定',
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
					}
				})
			},
			setA(e) {
				switch (e) {
					case 'pa':
						this.paQuote = !this.paQuote
						break;
					case 'rb':
						this.rbQuote = !this.rbQuote
						break;
					case 'tpy':
						this.tpyQuote = !this.tpyQuote
						break;
				}
			},
			setB(e) {
				switch (e) {
					case 'pa':
						this.pa = !this.pa
						if (this.pa) {
							this.paQuote = true
						} else {
							this.paQuote = false
						}
						break;
					case 'rb':
						this.rb = !this.rb
						if (this.rb) {
							this.rbQuote = true
						} else {
							this.rbQuote = false
						}

						break;
					case 'tpy':
						this.tpy = !this.tpy
						if (this.tpy) {
							this.tpyQuote = true
						} else {
							this.tpyQuote = false
						}
						break;
				}
			},
			swichCompany(e) {
				switch (e) {
					case 1:
						this.tpyQuote = true
						break;
					case 2:
						this.paQuote = true
						break;
					case 4:
						this.rbQuote = true
						break;
				}
			}
		},
		onLoad(e) {
			var pages = getCurrentPages();
			var prevPage = pages[pages.length - 2]; //上一个页面
			// #ifdef MP-WEIXIN
			this.insured = prevPage.data.insured
			// #endif
			// #ifdef H5
			this.insured = prevPage.insured
			// #endif
			this.param = JSON.parse(e.param)
			this.swichCompany(this.param.source)
			console.log(this.param);
			console.log(this.insured);
		}

	}
</script>

<style>
	.home image {
		height: 50upx;
	}

	.head button {
		width: 50%;
	}
</style>
