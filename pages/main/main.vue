<template>
	<view class="home1">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="content">车险报价</block>
		</cu-custom>
		<view class="top">
			<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<image :src="item.imgUrl" mode="aspectFill"></image>
					<video :src="item.imgUrl" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover"></video>
				</swiper-item>
			</swiper>
		</view>
		<view class="uni-padding-wrap uni-common-mt">
			<uni-segmented-control :current="current" :values="items" :style-type="styleType" :active-color="activeColor"
			 @clickItem="onClickItem" />
		</view>
		<view>
			<view v-show="current == 0">
				<form>
					<view class="cu-form-group margin-top solids-top">
						<view class="title">车牌号码</view>
						<text @tap="showModal" class="align-center" data-target="bottomModal">{{province}}</text>
						<uniIcon type='arrowdown'></uniIcon>
						<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
							<view class="cu-dialog">
								<view class="cu-bar bg-white">
									<view class="action text-black">选择省份</view>
									<view class="action text-blue" @tap="hideModal">取消</view>
								</view>
								<view class="padding-xl">
									<view class="dialog-view">
										<view v-for="c in country" :key="c" @tap="setCountry(c)">
											<text>{{c}}</text>
										</view>
									</view>
								</view>
							</view>
						</view>
						<!-- <input class="m-input" type="text" clearable :value="carNo" @focus="showKey" @blur="close" @input="setCarNo" placeholder="车牌号"></input>
 -->
						<div class="imitate-input imitate-placeholder js-imitate-input" contenteditable="true" @tap="showKey">
							{{carNo}}
							<text class="text-gray" v-if="!show && carNo==''">请输入车牌号</text>
						</div>

						<!-- <div class="imitate-input" contenteditable="true"  @tap="showKey" placeholder="在此输入内容">{{carNo}}</div> -->
					</view>
					<view class="cu-form-group">
						<view class="title">车主证件号</view>
						<input type="text" v-model="cardNO" @focus="close" placeholder="仅平安续保需输入证件号后6位"></input>
					</view>
					<view class="cu-form-group solids-bottom ">
						<view class="title">投保地区</view>
						<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
							<view class="uni-input">{{array[index].name}}</view>
						</picker>
					</view>
				</form>
				<view class="btn-view">
					<button class="cu-btn bg-blue lg" @tap="onSumit">下一步</button>
				</view>

			</view>
			<view v-show="current == 1" class="view2">
				<form>
					<view class="cu-form-group margin-top solids-top">
						<view class="title">车架号</view>
						<div class="imitate-input1 imitate-placeholder js-imitate-input" contenteditable="true" @tap="showKey1">
							{{vinNO}}
							<text class="text-gray" v-if="!show1 && vinNO==''">请输入车架号</text>
						</div>

					</view>
					<view class="cu-form-group">
						<view class="title">发动机号</view>
						<m-input type="text" v-model="engineNo" placeholder="请输入发动机号"></m-input>
					</view>
					<view class="cu-form-group solids-bottom">
						<view class="title">投保地区</view>
						<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
							<view class="uni-input">{{array[index].name}}</view>
						</picker>
					</view>
				</form>

				<view class="btn-view">
					<button class="cu-btn bg-blue lg" @tap="onSumit">下一步</button>
				</view>

			</view>
		</view>
		<view class="key" v-if="show">
			<view class="bg-grey light padding-top padding-bottom-sm">
				<view class="flex justify-between padding-left padding-right height-view">
					<!-- <view class="bg-white text-sm flex padding-sm align-center " v-for="(i) in number">{{i}}</view> -->
					<view class="bg-white view-width" :key="i" v-for="(i) in number" @tap="keyDown(i)">{{i}}</view>
				</view>
				<view class="flex justify-between padding-top-xs padding-left padding-right">
					<view class="bg-white view-width" :key="i" v-for="(i) in letter" @tap="keyDown(i)">{{i}}</view>
				</view>
				<view class="flex justify-center padding-top-xs">
					<view class="bg-white view-width margin-left-xs margin-right-xs" @tap="keyDown(i)" :key="i" v-for="(i) in letter1">{{i}}</view>
				</view>
				<view class="padding-top-xs flex justify-center ">
					<button class="cu-btn bg-white" @tap="close"><text class="lg cuIcon-unfold"></text></button>
					<view class="bg-white view-width margin-left-xs margin-right-xs" @tap="keyDown(i)" :key="i" v-for="(i) in letter2">{{i}}</view>
					<button class="cu-btn bg-white" @tap="deleteKey"><text class="lg cuIcon-back_android text-bold text-red"></text></button>
				</view>
			</view>
		</view>
		<view class="key" v-if="show1">
			<view class="bg-grey light padding-top padding-bottom-sm">
				<view class="flex justify-between padding-left padding-right height-view">
					<view class="bg-white view-width" :key="i" v-for="(i) in number" @tap="keyDown1(i)">{{i}}</view>
				</view>
				<view class="flex justify-between padding-top-xs padding-left padding-right">
					<view class="bg-white view-width" :key="i" v-for="(i) in letter" @tap="keyDown1(i)">{{i}}</view>
				</view>
				<view class="flex justify-center padding-top-xs">
					<view class="bg-white view-width margin-left-xs margin-right-xs" @tap="keyDown1(i)" :key="i" v-for="(i) in letter1">{{i}}</view>
				</view>
				<view class="padding-top-xs flex justify-center ">
					<button class="cu-btn bg-white" @tap="close1"><text class="lg cuIcon-unfold"></text></button>
					<view class="bg-white view-width margin-left-xs margin-right-xs" @tap="keyDown1(i)" :key="i" v-for="(i) in letter2">{{i}}</view>
					<button class="cu-btn bg-white" @tap="deleteKey1"><text class="lg cuIcon-back_android text-bold text-red"></text></button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		uniSegmentedControl,
		uniIcon
	} from '@dcloudio/uni-ui'
	import mInput from '../../components/m-input.vue'
	import {
		mapState
	} from 'vuex'

	export default {
		computed: mapState(['hasLogin', 'user']),
		data() {
			return {
				show: false,
				show1: false,
				number: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
				letter: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
				letter1: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
				letter2: ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
				country: [
					'京', '苏', '豫', '津', '冀', '晋', '辽', '吉', '黑', '沪', '浙', '皖', '闽', '赣',
					'鲁', '鄂', '湘', '粤', '桂', '琼', '川', '贵', '云', '渝', '藏', '陕', '甘', '青',
					'宁', '新', '港', '澳', '台'
				],
				province: '苏',
				loadModal: false,
				modalName: null,
				carNo: '',
				cardNO: '',
				city: '',
				vinNO: '',
				engineNo: '',
				index: 0,
				items: [
					'车牌号',
					'发动机号、车架号'
				],
				current: 0,
				colorIndex: 0,
				activeColor: '#007aff',
				styleType: 'text',
				array: [{
					name: '南京'
				}],
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}],
				showMessage:false,
				messageColor:true,
				interval:''
			}
		},
		components: {
			uniSegmentedControl,
			mInput,
			uniIcon
		},
		methods: {
			deleteKey() {
				this.carNo = this.carNo.replace(this.carNo.charAt(this.carNo.length - 1), '')
			},
			close() {
				this.show = false
			},
			deleteKey1() {
				this.vinNO = this.vinNO.replace(this.vinNO.charAt(this.vinNO.length - 1), '')
			},
			close1() {
				this.show1 = false
			},
			showKey() {
				this.carNo = ''
				this.show = true
			},
			showKey1() {
				this.vinNO = ''
				this.show1 = true
			},
			keyDown(e) {
				this.carNo = this.carNo + e
				if (this.carNo.length == 6) {
					this.show = false
				}
			},
			keyDown1(e) {
				this.vinNO = this.vinNO + e
				if (this.vinNO.length == 18) {
					this.show1 = false
				}
			},
			setCarNo(e) {
				var reg = /[\u4e00-\u9fa5]/g
				this.carNo = e.toUpperCase().replace(reg, '')
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			setCountry(e) {
				this.province = e
				this.modalName = null
			},
			onSumit() {
				this.close()
				switch (this.current) {
					case 0:
						if (this.carNo.length < 6) {
							uni.showModal({
								title: '提示',
								content: '请输入正确的车牌号',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {}
								}
							});
							return false
						}
						break
					case 1:
						if (this.vinNO.length < 17) {
							uni.showModal({
								title: '提示',
								content: '请输入正确的车架号',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {}
								}
							});
							return false
						}
						break
				}
				uni.showLoading({
					title: '拼命续保中',
					mask: true
				});
				let param = {
					checkType: this.current,
					carNo: this.province + this.carNo,
					idCard: this.cardNO,
					vinNo: this.vinNO,
					engineNo: this.engineNo,
					createBy: this.user.accountId
				}
				this.$http.post(this.$api.WX_checkByCarNoOrVinNo, param, 1).then((e) => {
					uni.hideLoading()
					if (e.code == 200) {
						uni.navigateTo({
							url: "../quote/renewalDeatil?detail=" + JSON.stringify(e.data)
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: '未获取续保信息',
							mask: true
						})
					}
				})
			},
			onClickItem(index) {
				this.carNo = ''
				this.vinNO = ''
				this.close()
				if (this.current !== index) {
					this.current = index
				}
			},
			bindPickerChange: function(e) {
				this.close()
				this.index = e.target.value
			},
			getListByOrderNum() {
				let param = {
					type:1
				}
				this.$http.post(this.$api.getListByOrderNum, param, 1).then((e) => {
					this.swiperList = e.data
				})
			},
			getMsgList(t) {
				let param = {
					userId: this.user.accountId
				};
				param.status = 0;
				this.$http.post(this.$api.getMessageList, param,1).then(e => {
					if (e.code == 200) {
						if(e.data.list.length!=0){
							this.messageColor=false
							var t=this
							this.interval=setInterval(function() {
								t.showMessage=!t.showMessage
							}, 1000);
						}else{
							this.messageColor=true
							this.showMessage=true
						}
					}
				});
			},
			toMsg(){
				clearInterval(this.interval) 
				uni.navigateTo({
					url: '../user/userMsg/userMsg'
				})
			}
		},
		onShow() {
			this.getListByOrderNum();
			this.getMsgList()
		},
		onLoad(e) {
			if (!this.hasLogin) {
				uni.showModal({
					title: '未登录',
					content: '您未登录，需要登录后才能继续',
					/**
					 * 如果需要强制登录，不显示取消按钮
					 */
					showCancel: !this.forcedLogin,
					success: (res) => {
						if (res.confirm) {
							/**
							 * 如果需要强制登录，使用reLaunch方式
							 */
							if (this.forcedLogin) {
								uni.reLaunch({
									url: '../login/login'
								});
							} else {
								uni.navigateTo({
									url: '../login/login'
								});
							}
						}
					}
				});
			}
		}
	}
</script>

<style>
	.message {
		position: absolute;
		top: 50px;
		left: 20px;
	}

	.imitate-input {
		width: 260px;
		height: 20px;
		border-radius: 3px;
		size: 16px;
		line-height: 16px;
		outline: none;
		color: #000;
		white-space: nowrap;
		overflow-x: scroll;
		overflow-y: hidden;
		word-break: normal;
		display: flex;
		align-items: center;
	}

	.imitate-input1 {
		width: 300px;
		height: 20px;
		border-radius: 3px;
		size: 16px;
		line-height: 16px;
		outline: none;
		color: #000;
		white-space: nowrap;
		overflow-x: scroll;
		overflow-y: hidden;
		word-break: normal;
		display: flex;
		align-items: center;
	}

	/* 清除左右滚动条 */
	.imitate-input::-webkit-scrollbar {
		display: none;
	}

	.imitate-input:empty:before {
		content: attr(placeholder);
		color: #999;
	}

	.imitate-input:focus:before {
		content: none;
	}

	uni-segmented-control {
		width: 100%;
	}

	.home1 {
		padding: 0;
	}

	.cu-form-group .title {
		min-width: calc(5em + 15px);
	}

	.home1 .top image {
		width: 100%;
	}

	.input-row {
		align-items: center;
		/*垂直居中*/
	}

	.input-row .title {
		width: 30%;
		height: 60px;
		min-height: 50upx;
		padding-left: 30upx;
		line-height: 60px;
	}

	.dialog-view {
		display: flex;
		flex-wrap: wrap;
		margin: 0;
	}

	.dialog-view view {
		height: 60upx;
		width: 60upx;
		background-color: #DDDDDD;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 30upx;
		margin-top: 20upx;
	}

	.btn-view {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 50upx;
	}

	.btn-view button {
		width: 50%;
	}

	.view2 .input-row .title {
		width: 25%;
		height: 60px;
		min-height: 50upx;
		padding-left: 30upx;
		line-height: 60px;
	}

	.view-width {
		width: 60upx;
		height: 120upx;
		border-radius: 6upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.bg-white {
		height: 60upx;
	}

	.key {
		position: fixed;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1110;
		outline: 0;
		text-align: center;
		-ms-transform: scale(1.185);
		transform: scale(1.185);
		backface-visibility: hidden;
		perspective: 2000upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all 0.3s ease-in-out 0s;
		pointer-events: none;
		opacity: 1;
		transition-duration: 0.3s;
		-ms-transform: scale(1);
		transform: scale(1);
		overflow-x: hidden;
		overflow-y: auto;
		pointer-events: auto;
	}

	.cu-form-group picker::after {
		font-family: none;
		display: block;
		content: "\e6a3";
		position: absolute;
		font-size: 34upx;
		color: #FFFFFF;
		line-height: 100upx;
		width: 60upx;
		text-align: center;
		top: 0;
		bottom: 0;
		right: -20upx;
		margin: auto;
	}
</style>
