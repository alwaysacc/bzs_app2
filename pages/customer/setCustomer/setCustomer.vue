<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">编辑客户资料</block>
		</cu-custom>
		<view class="input-group padding-right">
			<view class="input-row border padding-right">
				<text class="title">姓名</text>
				<m-input type="text"  clearable v-model="customer.customerName" placeholder="请输入客户姓名"></m-input>
			</view>
			<view class="input-row border padding-right">
				<text class="title">联系电话1</text>
				<m-input type="text"  clearable v-model="customer.customerTel1" placeholder="请输入客户电话"></m-input>
			</view>
			<!-- 微信小程序不可用 -->
			<!-- <view class="top">
				<view class="left-view solid-right">
					<view class="input-row border">
						<text class="title">姓名</text>
						<m-input type="text" focus clearable v-model="name" placeholder="请输入客户姓名"></m-input>
					</view>
					<view class="input-row border">
						<text class="title">联系电话1</text>
						<m-input type="text" focus clearable v-model="tel1" placeholder="请输入客户电话"></m-input>
					</view>
				</view>
				<view class="right-view">
					<view class="one">
						<uniIcon type='contact-filled' color="grey" size="50"></uniIcon>
					</view>
					<view class="two">
						<text class="text-xs">通讯录导入</text>
					</view>
				</view>
			</view> -->
			<view class="input-row border padding-right">
				<text class="title">联系电话2</text>
				<m-input type="text" clearable v-model="customer.customerTel2" placeholder="请输入客户电话"></m-input>
			</view>
			<view class="input-row border padding-right">
				<text class="title">客户类型</text>
				<picker @change="bindPickerChange" :value="customer.customerSort" :range="array" range-key="name">
					<view class="uni-input">{{array[customer.customerSort].name}}<text class="cuIcon-right"></text></view>
					
				</picker>
			</view>
			<view class="input-row border padding-right">
				<text class="title">备注</text>
				<m-input type="text" clearable v-model="customer.customerRemarks1" placeholder="请输入客户电话"></m-input>
			</view>
			<!-- <view class="input-row border">
				<text class="title">客户标签</text>
				<text class="text-gray">无标签<uniIcon type='arrowright' color="grey" size="25"></uniIcon></text>
			</view> -->
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="save">保存</button>
		</view>
	</view>
</template>

<script>
	import mInput from '../../../components/m-input.vue';
	import {
		uniIcon
	} from '@dcloudio/uni-ui'
	export default {
		data() {
			return {
				name: '',
				tel1: '',
				tel2: '',
				array: [{
						name: '新车'
					}, {
						name: '在修不在保'
					},
					{
						name: '不在修不在保'
					},
					{
						name: '往年战败'
					},
					{
						name: '续保客户'
					},
					{
						name: '新转续'
					},
					{
						name: '潜转续'
					},
					{
						name: '间转续'
					},
					{
						name: '续转续'
					},
					{
						name: '三年联保'
					},
				],
				carInfoId:'',
				customer:{
					customerId:'',
					customerName:'',
					customerTel1:'',
					customerTel2:'',
					customerSort:0,
					customerRemarks1:''
				}
			}
		},
		methods: {
			bindPickerChange: function(e) {
				this.index = e.target.value
				this.customer.customerSort= e.target.value
			},
			save(){
				let param={
					customer:JSON.stringify(this.customer),
					carInfoId:this.carInfoId
				}
				this.$http.post(this.$api.updateCustomer, param).then((e) => {
					if (e.code == 200) {
						uni.hideLoading()
						uni.showToast({
							title: '保存成功',
							mask: true,
							duration: 1500
						});
						setTimeout(function() {
							uni.navigateBack({
								delta:1
							})
						}, 1500)
						
					} else {
						uni.showToast({
							title: e.message,
							mask: true,
							duration: 1500
						});
					}
				})
			}
		},
		components: {
			mInput,
			uniIcon
		},
		onLoad(e) {
			this.carInfoId=e.id
		}
	}
</script>

<style>
	.input-row {
		align-items: center;
		/*垂直居中*/
	}
	.input-row .title {
		width: 180upx;
		height: 60px;
		min-height: 50upx;
		padding-left: 30upx;
		line-height: 60px;
	}
	.top{
		display: flex;
		align-items: stretch;
	}
	.top .left-view{
		width: 80%;
		height: 100%;
	}
	.top .right-view{
		flex:1;
		margin: auto 0;
	}
	.top .right-view view{
		display: flex;
		align-items:center;/*垂直居中*/
		justify-content: center;/*水平居中*/
	}
</style>
