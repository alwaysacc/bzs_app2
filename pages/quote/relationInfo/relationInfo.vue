<template>
	<view class="home text-black bg-red">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText"></block>
			<block slot="content">关系人信息</block>
			<block slot="right">
				<text class="cuIcon-settings padding" @tap="toSetRelation"></text>
			</block>
		</cu-custom>
		<view class="center">
			<view class=" padding solid-top grid  col-2 solid-bottom">
				<view class="">车主信息</view>
				<view class="text-right">
					<picker @change="PickerChange" :value="Oindex" :range="Oarray">
						<view class="picker text-blue">
							{{Oindex==-1?'选择临时':Oarray[Oindex]}}
						</view>
					</picker>
				</view>
			</view>
			<view class=" padding solid-top grid  col-2 solid-bottom">
				<view class="">姓名</view>
				<view class="text-right">
					<input v-model="param.personName" type="text" placeholder="" />
				</view>
			</view>
			<view class=" padding solid-top grid  col-2 solid-bottom">
				<view class="">证件类型</view>
				<view class="text-right">
					<picker @change="PickerChange" :value="OCindex" :range="OCarray">
						<view class="picker text-blue">
							{{OCarray[OCindex]}}
						</view>
					</picker>
				</view>
			</view>
			<view class=" padding solid-top grid  col-2 solid-bottom">
				<view class="">证件号码</view>
				<view class="text-right">
					<input v-model="param.personCardID" type="text" placeholder="" />
				</view>
			</view>

			<view class="padding-top-sm"></view>
			<view class=" padding solid-top grid  col-2 solid-bottom">
				<view class=" ">被保人信息</view>
				<view class="text-right">
					<picker @change="PickerChange" :value="Bindex" :range="Barray">
						<view class="picker text-blue">
							{{Bindex==-1?'选择临时':Barray[Bindex]}}
						</view>
					</picker>
				</view>
			</view>
			<view class=" padding solid-top grid  col-2 solid-bottom">
				<view class="">姓名</view>
				<view class="text-right">
					<input :value="param.personName" type="text" placeholder="123" />
				</view>
			</view>
			<view class=" padding solid-top grid  col-2 solid-bottom">
				<view class="">证件类型</view>
				<view class="text-right">
					<picker @change="PickerChange" :value="OBindex" :range="OBarray">
						<view class="picker text-blue">
							{{OBarray[OBindex]}}
						</view>
					</picker>
				</view>
			</view>
			<view class=" padding solid-top grid  col-2 solid-bottom">
				<view class="">证件号码</view>
				<view class="text-right">
					<input v-model="param.personCardID" type="text" placeholder="" />
				</view>
			</view>
			<view class=" padding solid-top grid  col-2 solid-bottom">
				<view class="">手机号码</view>
				<view class="text-right">
					<input v-model="param.personMobile" type="text" placeholder="选填" />
				</view>
			</view>
			<view class=" padding solid-top grid  col-2 solid-bottom">
				<view class="">邮箱地址</view>
				<view class="text-right">
					<input type="text" placeholder="选填" />
				</view>
			</view>

			<view class="padding-top-sm"></view>
			<view class=" padding solid-top grid  col-2 solid-bottom">
				<view class="">投保人与车主一致</view>
				<view class="text-right">
					<switch @change="SetShadow" :class="shadow?'checked':''" :checked="shadow?true:false" color="#39B54A"></switch>
				</view>
			</view>
		</view>
		<view class="head padding text-center align-center justify-center solid-bottom solids-top margin-top">
			<button class="cu-btn bg-blue lg" @tap="next">下一步</button>
		</view>
	</view>
</template>

<script>
	import {
		uniNavBar
	} from '@dcloudio/uni-ui'
	export default {
		data() {
			return {
				Oindex: -1,
				Oarray: ['个人', '公户'],
				OCindex: 0,
				OCarray: ['身份证', '组织机构代码证', '护照'],
				OBindex: 0,
				OBarray: ['身份证', '组织机构代码证', '营业执照/同意社会信用代码'],
				Bindex: -1,
				Barray: ['个人', '公户'],
				shadow: true,
				param:'',
				insured:'',
			}
		},
		methods: {
			PickerChange(e) {
				this.Oindex = e.detail.value
			},
			SetShadow(){
				this.shadow=!this.shadow
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			next() {
				uni.navigateTo({
					url: '../choiceCompany/choiceCompany?param='+JSON.stringify(this.param),
				})
			},
			toSetRelation() {
				uni.navigateTo({
					url: '../setRelation/setRelation',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
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
			//this.param=JSON.parse(e.param)
			this.param=JSON.parse(e.param)
			this.OBindex=this.param.personCardIDType-1
			this.OCindex=this.param.personCardIDType-1
		},
		components: {
			uniNavBar
		}
	}
</script>

<style>
	.head button {
		width: 50%;
	}

	.padding-top-sm {
		background-color: #DDDDDD;
	}
</style>
