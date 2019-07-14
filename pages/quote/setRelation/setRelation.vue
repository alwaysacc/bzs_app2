<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">设置临时关系人</block>
		</cu-custom>
		<view class="padding-xl text-center">
			<text class="text-xs">设置一个临时关系人，报价时可以一键录入，不会影响报价结果</text>
		</view>
		<view class="center">
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in array" :key="index" @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
			</view>
			<view v-show="TabCur == 0">
				<view class=" padding solid-top grid  col-2 solid-bottom">
					<view class="text-gray">关系人名称</view>
					<view class="text-right">
						<input placeholder="必填" type="text"></input>
					</view>
				</view>
				<view class=" padding solid-top grid  col-2 solid-bottom">
					<view class="text-gray">证件类型</view>
					<view class="text-right">
						<picker @change="PickerChange" :value="index" :range="cardType">
							<view class="picker text-blue">
								{{cardType[index]}}
							</view>
						</picker>
					</view>
				</view>
				<view class=" padding solid-top grid  col-2 solid-bottom">
					<view class="text-gray">证件号码</view>
					<view class="text-right">
						<input placeholder="必填" type="text"></input>
					</view>
				</view>
				<view class=" padding solid-top grid  col-2 solid-bottom">
					<view class="text-gray">手机号码</view>
					<view class="text-right">
						<input placeholder="选填" type="text"></input>
					</view>
				</view>
				<view class=" padding solid-top grid  col-2 solid-bottom">
					<view class="text-gray">邮箱地址</view>
					<view class="text-right">
						<input placeholder="选填" type="text"></input>
					</view>
				</view>
			</view>
				<view v-show="TabCur == 1">
				<view class=" padding solid-top grid  col-2 solid-bottom">
					<view class="text-gray">关系人名称</view>
					<view class="text-right">
						<input placeholder="必填" type="text"></input>
					</view>
				</view>
				<view class=" padding solid-top grid  col-2 solid-bottom">
					<view class="text-gray">证件类型</view>
					<view class="text-right">
						<picker @change="PickerChange" :value="index" :range="cardType">
							<view class="picker text-blue">
								{{cardType[index]}}
							</view>
						</picker>
					</view>
				</view>
				<view class=" padding solid-top grid  col-2 solid-bottom">
					<view class="text-gray">证件号码</view>
					<view class="text-right">
						<input placeholder="必填" type="text"></input>
					</view>
				</view>
				<view class=" padding solid-top grid  col-2 solid-bottom">
					<view class="text-gray">手机号码</view>
					<view class="text-right">
						<input placeholder="选填" type="text"></input>
					</view>
				</view>
				<view class=" padding solid-top grid  col-2 solid-bottom">
					<view class="text-gray">邮箱地址</view>
					<view class="text-right">
						<input placeholder="选填" type="text"></input>
					</view>
				</view>
			</view>
		</scroll-view>
		</view>
		<view class="head padding text-center align-center justify-center solid-bottom solids-top margin-top">
			<button type="primary" @tap="next">保存</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				scrollLeft: 0,
				TabCur: 0,
				array:[
					'临时个人','临时公户'
				],
				index:0,
				cardType: ['身份证', '港澳身份证万'],
				carInfoId:''
			}
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		},
		onLoad(e) {
			this.carInfoId=e.id
		}
	}
</script>

<style>
.home {
		display: flex;
		height: 100%;
		overflow-y: hidden;
		display: -webkit-flex;
		/* vh 相对于可视区域的高度 */
		min-height: 100vh;
		/* 设置主轴方向 */
		flex-direction: column;
	}

	.center {
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
		line-height: 180%;
	}

	.head {
		height: 120upx;
		display: flex;
		align-items: center;
	}

	.head button {
		width: 50%;
	}
</style>
