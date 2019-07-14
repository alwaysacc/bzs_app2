<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">选择报价车型</block>
		</cu-custom>

		<view class="center">
			<!-- <scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index==TabCur?'text-blue':''" v-for="(item,index) in list" :key="index"
					 @tap="tabSelect" :data-id="index">
						{{item}}
					</view>
				</view>
			</scroll-view> -->
			<view>
				<!-- <radio-group class="block" @change="RadioChange">
					<view class="cu-form-group"  v-for="(item,index) in carList" >
						<view class="title">{{item.VehicleNo}}/{{item.VehicleName}}</view>
						<radio :class="radio==index?'checked':''" :checked="radio==index?true:false" value="A"></radio>
					</view>
				</radio-group> -->
				<radio-group class="block">
					<view class="flex align-center justify-between padding-sm solids-bottom" v-for="(item,index) in carList"  @tap="set(index)">
						<view class="basis-xl text-df">
							<p>
								{{item.VehicleNo}}/{{item.VehicleName}}/
								{{item.VehicleAlias}}/{{item.VehicleExhaust}}/{{item.VehicleSeat}}/{{item.PurchasePrice}}/
								{{item.VehicleYear}}/{{item.SourceName}}
							</p>
						</view>
						<radio :class="radio==index?'checked':''" :checked="radio==index?true:false" :value="index+''"></radio>
					</view>
				</radio-group>
			</view>
		</view>
		<view class="head padding text-center align-center justify-center solid-bottom solids-top">
			<button class="cu-btn bg-blue lg" @tap="confirmCar">确认车型</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				list: ['按品牌型号校验', '按车架号校验'],
				radio: 0,
				checkbox: [{
					value: 'A',
					checked: true
				}, {
					value: 'B',
					checked: true
				}, {
					value: 'C',
					checked: false
				}],
				carList: {}
			}
		},
		methods: {
			confirmCar(){
				var pages = getCurrentPages();
				let carInfoId
				let d=this.carList[this.radio]
				let carModel=d.VehicleNo+'/'+d.VehicleName+'/'+d.VehicleAlias+'/'+d.VehicleExhaust+'/'+d.VehicleSeat+'/'+d.PurchasePrice+'/'+d.VehicleYear+'/'+d.SourceName
				var prevPage = pages[pages.length - 2]; //上一个页面
				// #ifdef MP-WEIXIN
				carInfoId= prevPage.data.detail.carInfoId
				 prevPage.data.carModel=carModel
				// #endif
				// #ifdef H5
				carInfoId = prevPage.detail.carInfoId
				 prevPage.carModel=carModel
				// #endif		
				let param={
					carInfoId:carInfoId,
					carModel:d.VehicleNo+'/'+d.VehicleName+'/'+d.VehicleAlias+'/'+d.VehicleExhaust+'/'+d.VehicleSeat+'/'+d.PurchasePrice+'/'+d.VehicleYear+'/'+d.SourceName
				}
				this.$http.post(this.$api.updateCarInfo, param).then((e) => {
					if(e.code==200){
						uni.navigateBack({
							delta: 1
						});
					}
					console.log(e);
				})
			},
			set(e) {
				console.log(e);
				this.radio = e
				console.log(this.radio);
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			GetNewVehicleInfo(e) {
				e.IsNeedCarVin = 0
				this.$http.post(this.$api.WX_GetNewVehicleInfo, e, 1).then((e) => {
					console.log(e);
					this.carList = e.data.Items
					uni.hideLoading()
				})
			}
		},
		onLoad(e) {
			uni.showLoading({
				title: '数据加载中',
				mask: true
			});
			let param = JSON.parse(e.param)
			this.GetNewVehicleInfo(param)
		}
	}
</script>

<style>

</style>
