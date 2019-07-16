<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">选择险种</block>
		</cu-custom>
		<view class="center">
			<view v-if="map!=''">
				<view class="solid-bottom padding-left padding-bottom">
					<view>
						<text class="text-xxl text-bold">{{carInfo.carNumber}}</text>
					</view>
					<view class="text-view flex align-center">
						<text>
							车架号：
						</text>
						<text>
							{{carInfo.frameNumber}}
						</text>
					</view>
					<view class="text-view flex align-center">
						<text>
							品牌型号：
						</text>
						<view class="text-cut radius" style="width:220px">{{carInfo.brandModel}}</view>
						<text class="padding-left-xs">|</text>
						<text class="text-red padding-left-xs cuIcon-edit" @tap="setModel"></text>
						</text>
					</view>
					<view class="text-view flex align-center">
						<text>
							注册日期：
						</text>
						<text>
							{{carInfo.registerDate}}
						</text>
					</view>
				</view>
				<view class="flex padding solids-bottom justify-between">
					<text class="text-red">已换车，点击修改车型</text>
					<text class="cuIcon-right text-gray"></text>
				</view>
				
				<view class="flex padding solid-bottom justify-between" @tap="toChoice">
					<view>
						<text class="cuIcon-title text-red"></text>
						<text class="">报价车型</text>
					</view>
					<view>
						<text class="cuIcon-right text-gray"></text>
					</view>
				</view>
				<view class="flex padding solids-bottom justify-between">
					<view>
						<text class="text-xs">{{carModel!=''?carModel:carInfo.brandModel}}</text>
					</view>
				</view>
			</view>
			<view v-else>
				<view class="solid-bottom padding-left padding-bottom">
					<view>
						<text class="text-xxl text-bold">{{detail.UserInfo.LicenseNo==null?carInfo.carNumber:detail.UserInfo.LicenseNo}}</text>
					</view>
					<view class="text-view flex align-center">
						<text>
							车架号：
						</text>
						<text>
							{{detail.UserInfo.CarVin==null?carInfo.frameNumber:detail.UserInfo.CarVin}}
						</text>
					</view>
					<view class="text-view flex align-center">
						<text>
							品牌型号：
						</text>
						<view class="text-cut radius" style="width:220px">{{detail.UserInfo.ModleName==null?carInfo.brandModel:detail.UserInfo.ModleName}}</view>
						<text class="padding-left-xs">|</text>
						<text class="text-red padding-left-xs cuIcon-edit" @tap="setModel"></text>
						</text>
					</view>
					<view class="text-view flex align-center">
						<text>
							注册日期：
						</text>
						<text>
							{{detail.UserInfo.RegisterDate==null?carInfo.registerDate:detail.UserInfo.RegisterDate}}
						</text>
					</view>
				</view>
				<view class="flex padding solids-bottom justify-between">
					<text class="text-red">已换车，点击修改车型</text>
					<text class="cuIcon-right text-gray"></text>
				</view>

				<view class="flex padding solid-bottom justify-between" @tap="toChoice">
					<view>
						<text class="cuIcon-title text-red"></text>
						<text class="">报价车型</text>
					</view>
					<view>
						<text class="cuIcon-right text-gray"></text>
					</view>
				</view>
				<view class="flex padding solids-bottom justify-between">
					<view>
						<text class="text-xs" v-if="detail!=null">{{carModel!=''?carModel:detail.UserInfo.ModleName}}</text>
						<text class="text-xs" v-else>{{carModel!=''?carModel:carInfo.brandModel}}</text>
					</view>
				</view>
			</view>
			<view class="flex padding solid-bottom justify-between">
				<view>
					<text class="cuIcon-title text-red"></text>
					<text class="">一年内过户</text>
				</view>
				<view>
					<switch @change="SetShadow(1)" :class="isGL?'checked':''" color="#39B54A"></switch>
				</view>
			</view>
			<view class="flex padding solids-bottom justify-between" v-if="isGL">
				<view>
					<text class="cuIcon-formfill"></text>
					<text class="">过户时间</text>
				</view>
				<view class="uni-list-cell-db">
					<picker mode="date" :value="GLtime" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{GLtime==''?startDate:GLtime}}
							<text class="cuIcon-right text-gray"></text>
						</view>
					</picker>
				</view>
			</view>
			<view class="flex padding solid-bottom justify-between">
				<view>
					<text class="cuIcon-title text-red"></text>
					<text class="">交强险</text>
				</view>
				<view>
					<switch @change="SetShadow('JQ')" :checked="FORCEPREMIUM.insuredAmount=='Y'" :class="FORCEPREMIUM.insuredAmount=='Y'?'checked':''"
					 color="#39B54A"></switch>
				</view>
			</view>
			<view class="flex padding solids-bottom justify-between">
				<view>
					<text class="cuIcon-formfill"></text>
					<text class="">起保时间</text>
				</view>
				<view class="uni-list-cell-db">
					<picker mode="date" :value="cistartDate" :start="cistartDate!=null?cistartDate:date"
					 @change="ciDateChange">
						<view class="uni-input">{{cistartDate!=null?cistartDate:date}}
							<text class="cuIcon-right text-gray"></text>
						</view>
					</picker>
				</view>
			</view>
			
			<view class="flex padding solid-bottom justify-between">
				<view>
					<text class="cuIcon-title text-red"></text>
					<text class="">商业险</text>
				</view>
				<view>
					<switch @change="SetShadow('SY')" :checked="SY" :class="SY?'checked':''" color="#39B54A"></switch>
				</view>
			</view>
			<view class="flex padding solids-bottom justify-between">
				<view>
					<text class="cuIcon-formfill"></text>
					<text class="">起保时间</text>
				</view>
				<view class="uni-list-cell-db">
					<picker mode="date" :value="bistartDate" :start="bistartDate!=null?bistartDate:date"
					 @change="biDateChange">
						<view class="uni-input">{{bistartDate!=null?bistartDate:date}}
							<text class="cuIcon-right text-gray"></text>
						</view>
					</picker>
				</view>
			</view>
			<view class=" padding grid  col-3 solid-bottom">
				<view class=" ">车辆损失险</view>
				<view class="text-right ">
					<radio value="A" :checked="BuJiMianCheSun!=0" @tap="setA('MA')" />不计免赔
				</view>
				<view class="text-right">
					<switch @change="SetShadow('A')" :checked="CheSun!=0" :class="CheSun!=0?'checked':''" color="#39B54A"></switch>
				</view>
			</view>
			<view class=" padding grid solid-bottom col-3">
				<view class=" ">第三者责任险</view>
				<view class="text-right">
					<radio value="B" :checked="BuJiMianSanZhe!=0" @tap="setA('MB')" />不计免赔
				</view>
				<view class="text-right">
					<picker @change="Bchange" :value="Bindex" :range="Barray">
						<view class="picker">
							{{Barray[Bindex]}}
							<text class="cuIcon-right text-gray"></text>
						</view>
					</picker>
				</view>
			</view>
			<view class=" padding grid solid-bottom col-3">
				<view class=" ">全车盗抢险</view>
				<view class="text-right">
					<radio value="G1" :checked="BuJiMianDaoQiang==1" @tap="setA('MG1')" />不计免赔
				</view>
				<view class="text-right">
					<switch @change="SetShadow('G1')" :checked="DaoQiang!=0" :class="DaoQiang!=0?'checked':''" color="#39B54A"></switch>
				</view>
			</view>
			<view class=" padding grid solid-bottom col-3">
				<view class=" ">司机座位险</view>
				<view class="text-right">
					<radio value="D3" :checked="BuJiMianSiJi!=0" @tap="setA('MD3')" />不计免赔
				</view>
				<view class="text-right">
					<picker @change="D3change" :value="D3index" :range="D3array">
						<view class="picker">
							{{D3array[D3index]}}
							<text class="cuIcon-right text-gray"></text>
						</view>
					</picker>
				</view>
			</view>
			<view class=" padding grid solid-bottom col-3">
				<view class=" ">乘客座位险</view>
				<view class="text-right">
					<radio value="D4" :checked="BuJiMianChengKe!=0" @tap="setA('MD4')" />不计免赔
				</view>
				<view class="text-right">
					<picker @change="D4change" :value="D4index" :range="D4array">
						<view class="picker">
							{{D4array[D4index]}}
							<text class="cuIcon-right text-gray"></text>
						</view>
					</picker>
				</view>
			</view>
			<view class=" padding grid solid-bottom col-3">
				<view class=" ">划痕险</view>
				<view class="text-right">
					<radio value="L" :checked="BuJiMianHuaHen!=0" @tap="setA('ML')" />不计免赔
				</view>
				<view class="text-right">
					<picker @change="Lchange" :value="Lindex" :range="Larray">
						<view class="picker">
							{{Larray[Lindex]}}
							<text class="cuIcon-right text-gray"></text>
						</view>
					</picker>
				</view>
			</view>
			<view class=" padding grid solid-bottom col-2">
				<view class=" ">玻璃单独破碎险</view>
				<view class="text-right">
					<picker @change="Fchange" :value="Findex" :range="Farray">
						<view class="picker">
							{{Farray[Findex]}}
							<text class="cuIcon-right text-gray"></text>
						</view>
					</picker>
				</view>
			</view>
			<view class=" padding grid solid-bottom col-3">
				<view class=" ">自燃损失险</view>
				<view class="text-right">
					<radio value="r1" :checked="BuJiMianZiRan!=0" @tap="setA('MZ')" />不计免赔
				</view>
				<view class="text-right">
					<switch @change="SetShadow('Z')" :checked="ZiRan!=0" :class="ZiRan!=0?'checked':''" color="#39B54A"></switch>
				</view>
			</view>
			<view class=" padding grid solid-bottom col-3">
				<view class=" ">涉水行驶损失险</view>
				<view class="text-right">
					<radio value="X1" :checked="BuJiMianSheShui!=0" @tap="setA('MX1')" />不计免赔
				</view>
				<view class="text-right">
					<switch @change="SetShadow('X1')" :checked="SheShui!=0" :class="SheShui!=0?'checked':''" color="#39B54A"></switch>
				</view>
			</view>
			<view class=" padding grid solid-bottom col-2">
				<view class=" ">车损无法找到第三方险</view>

				<view class="text-right">
					<switch @change="SetShadow('Z3')" :checked="HcSanFangTeYue!=0" :class="HcSanFangTeYue!=0?'checked':''" color="#39B54A"></switch>
				</view>
			</view>
			<view class=" padding grid solid-bottom col-2">
				<view class=" ">指定修理厂险</view>

				<view class="text-right">
					<picker @change="Q3change" :value="Q3index" :range="Q3array">
						<view class="picker">
							{{Q3array[Q3index]}}
							<text class="cuIcon-right text-gray"></text>
						</view>

					</picker>
				</view>
			</view>
		</view>
		<view class="head padding text-center align-center justify-center solid-bottom solids-top margin-top">
			<button class="cu-btn bg-blue lg" @tap="next">下一步</button>
		</view>
	</view>
</template>

<script>
	function getDate(type) {
		const date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		if (type == 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
		return `${year}-${month}-${day}`;
	}
	import {
		mapState
	} from 'vuex'
	import data from '../../../comment/similar.js'
	export default {
		computed: mapState(['user']),
		data() {
			return {
				detail: {},
				isGL: false,
				GLtime: '',
				shadow: false,
				date: getDate({
					format: true
				}),
				bistartDate: '',
				cistartDate: '',
				startDate: getDate({
					format: true
				}),
				index: 0,
				array: ['喵喵喵', '200万'],
				A: {
					insuranceCode: 'A',
					insuranceName: '机动车损失险',
					insuredAmount: '',
					flag: ''
				},
				B: {
					insuranceCode: 'B',
					insuranceName: '第三者责任险',
					insuredAmount: '',
					flag: ''
				},
				G1: {
					insuranceCode: 'G1',
					insuranceName: '全车盗抢险',
					insuredAmount: '',
					flag: ''
				},
				D3: {
					insuranceCode: 'D3',
					insuranceName: '车上人员责任保险（驾驶员）',
					insuredAmount: '',
					flag: ''
				},
				D4: {
					insuranceCode: 'D4',
					insuranceName: '车上人员责任保险（乘客）',
					insuredAmount: '',
					flag: ''
				},
				Q3: {
					insuranceCode: 'Q3',
					insuranceName: '指定修理厂险',
					insuredAmount: '',
					flag: ''
				},
				Z: {
					insuranceCode: 'Z',
					insuranceName: '自燃损失险',
					insuredAmount: '',
					flag: ''
				},
				F: {
					insuranceCode: 'F',
					insuranceName: '玻璃单独破碎险',
					insuredAmount: '',
					flag: ''
				},
				L: {
					insuranceCode: 'L',
					insuranceName: '车身划痕损失险',
					insuredAmount: '',
					flag: ''
				},
				X1: {
					insuranceCode: 'X1',
					insuranceName: '发动机涉水损失险',
					insuredAmount: '',
					flag: ''
				},
				R: {
					insuranceCode: 'R',
					insuranceName: '精神损害抚慰金责任险',
					insuredAmount: '',
					flag: ''
				},
				Z2: {
					insuranceCode: 'Z2',
					insuranceName: '修理期间费用补偿险',
					insuredAmount: '',
					flag: ''
				},
				Z3: {
					insuranceCode: 'Z3',
					insuranceName: '机动车损失找不到第三方险',
					insuredAmount: '',
					flag: ''
				},
				FORCEPREMIUM: {
					insuranceCode: 'FORCEPREMIUM',
					insuranceName: '交强险',
					insuredAmount: 'Y',
					flag: ''
				},
				JQ: false,
				SY: true,
				MA: false,
				MB: false,
				MD3: false,
				MD4: false,
				MZ: false,
				MX1: false,
				MR: false,
				ML: false,
				MG1: false,
				MZ2: false,
				Barray: ['不投保', '5万', '10万', '15万', '20万', '30万', '50万',
					'100万', '150万', '200万', '250万', '300万',
				],
				Bindex: 0,
				Bvalue: '',
				D3array: ['不投保', '1万', '2万', '3万', '4万', '5万', '10万',
					'20万', '50万', '100万'
				],
				D3index: 0,
				D3value: '',
				D4array: ['不投保', '1万', '2万', '3万', '4万', '5万', '10万',
					'20万', '50万', '100万'
				],
				D4index: 0,
				D4value: '',
				Q3array: ['不投保', '国产', '进口'],
				Q3index: 0,
				Q3value: '',
				Farray: ['不投保', '国产', '进口'],
				Findex: 0,
				Fvalue: '',
				Larray: ['不投保', '2千', '5千', '1万', '2万'],
				Lindex: 0,
				Lvalue: '',
				insuredList: '',
				map: '',
				carInfo: {},
				BuJiMianCheSun: 0,
				CheSun: 0,
				BuJiMianChengKe: 0,
				ChengKe: 0,
				BuJiMianDaoQiang: 0,
				DaoQiang: 0,
				BuJiMianHuaHen: 0,
				HuaHen: 0,
				BuJiMianSanZhe: 0,
				SanZhe: 0,
				BuJiMianSheShui: 0,
				SheShui: 0,
				BuJiMianZiRan: 0,
				ZiRan: 0,
				BuJiMianSiJi: 0,
				SiJi: 0,
				BoLi: 0,
				HcSanFangTeYue: 0,
				HcXiuLiChang: 0,
				HcJingShenSunShi: 0,
				insured: '',
				carModel: ''
			}
		},
		methods: {
			listmap() {
				const arr = this.detail.insurance
				let num1 = 0
				let num111 = 0
				let num2 = 0
				let num22 = 0
				let num3 = 0
				let num33 = 0
				let num4 = 0
				let num44 = 0
				let num5 = 0
				let num55 = 0
				let num6 = 0
				let num7 = 0
				let num77 = 0
				let num8 = 0
				let num9 = 0
				let num99 = 0
				let num10 = 0
				let num1010 = 0
				let num11 = 0
				let num1111 = 0
				let num12 = 0
				let num13 = 0
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].insuranceName != '交强险') {
						num1 = data.similar(arr[i].insuranceName, this.A.insuranceName)
						num111 = data.similar(arr[i].insuranceName, this.A.insuranceName + '_不计免')
						num2 = data.similar(arr[i].insuranceName, this.B.insuranceName)
						num22 = data.similar(arr[i].insuranceName, this.B.insuranceName + '_不计免')
						num3 = data.similar(arr[i].insuranceName, this.G1.insuranceName)
						num33 = data.similar(arr[i].insuranceName, this.G1.insuranceName + '_不计免')
						num4 = data.similar(arr[i].insuranceName, this.D3.insuranceName)
						num44 = data.similar(arr[i].insuranceName, this.D3.insuranceName + '_不计免')
						num5 = data.similar(arr[i].insuranceName, this.D4.insuranceName)
						num55 = data.similar(arr[i].insuranceName, this.D4.insuranceName + '_不计免')
						num6 = data.similar(arr[i].insuranceName, this.Q3.insuranceName)
						num7 = data.similar(arr[i].insuranceName, this.Z.insuranceName)
						num77 = data.similar(arr[i].insuranceName, this.Z.insuranceName + '_不计免')
						num8 = data.similar(arr[i].insuranceName, this.F.insuranceName)
						num9 = data.similar(arr[i].insuranceName, this.L.insuranceName)
						num99 = data.similar(arr[i].insuranceName, this.L.insuranceName + '_不计免')
						num10 = data.similar(arr[i].insuranceName, this.X1.insuranceName)
						num1010 = data.similar(arr[i].insuranceName, this.X1.insuranceName + '_不计免')
						num11 = data.similar(arr[i].insuranceName, this.R.insuranceName)
						num1111 = data.similar(arr[i].insuranceName, this.R.insuranceName + '_不计免')
						num12 = data.similar(arr[i].insuranceName, this.Z2.insuranceName)
						num13 = data.similar(arr[i].insuranceName, this.Z3.insuranceName)
						const arr3 = [num1, num111, num2, num22, num3, num33, num4, num44, num5, num55, num6,
							num7, num77, num8, num9, num99, num10, num1010, num11, num1111, num12, num13
						]
						const num = Math.max.apply(null, arr3)
						if (num == num1) {
							this.CheSun = arr[i].insuranceAmount
						} else if (num == num111) {
							this.BuJiMianCheSun = 1
						} else if (num == num2) {
							this.SanZhe = arr[i].insuranceAmount
							for (var i1 = 0; i1 < this.Barray.length; i1++) {
								if (this.Barray[i1].replace('万', '0000') == arr[i].insuranceAmount) {
									this.Bindex = i1
								}
							}
						} else if (num == num22) {
							this.BuJiMianSanZhe = 1
						} else if (num == num3) {
							this.DaoQiang = 1
						} else if (num == num33) {
							this.BuJiMianDaoQiang = 1
						} else if (num == num4) {
							this.SiJi = arr[i].insuranceAmount
							for (var i1 = 0; i1 < this.D3array.length; i1++) {
								if (this.D3array[i1].replace('万', '0000') == arr[i].insuranceAmount) {
									this.D3index = i1
								}
							}
						} else if (num == num44) {
							this.BuJiMianSiJi = 1
						} else if (num == num5) {
							this.ChengKe = arr[i].insuranceAmount
							for (var i1 = 0; i1 < this.D4array.length; i1++) {
								if (this.D4array[i1].replace('万', '0000') == arr[i].insuranceAmount) {
									this.D4index = i1
								}
							}
						} else if (num == num55) {
							this.BuJiMianChengKe = 1
						} else if (num == num6) {
							this.HcXiuLiChang = arr[i].insuranceAmount
						} else if (num == num7) {
							this.ZiRan = arr[i].insuranceAmount
						} else if (num == num77) {
							this.BuJiMianZiRan = 1
						} else if (num == num8) {
							this.BoLi = arr[i].insuranceAmount
							if (arr[i].insuranceAmount == 0) {
								this.Findex = 1
							} else if (arr[i].insuranceAmount == 1) {
								this.Findex = 2
							}
						} else if (num == num9) {
							this.HuaHen = arr[i].insuranceAmount
							for (var i1 = 0; i1 < this.Larray.length; i1++) {
								if (this.Larray[i1].length < 5) {
									this.Larray[i1] = this.Larray[i1].replace('千', '000')
								} else {
									this.Larray[i1] = this.Larray[i1].replace('万', '0000')
								}
								if (this.Larray[i1] == arr[i].insuranceAmount) {
									this.Lindex = i1
								}
							}

						} else if (num == num99) {
							this.BuJiMianHuaHen = 1
						} else if (num == num10) {
							this.SheShui = arr[i].insuranceAmount
						} else if (num == num1010) {
							this.BuJiMianSheShui = 1
						} else if (num == num11) {
							this.HcJingShenSunShi = arr[i].insuranceAmount
						} else if (num == num12) {
							this.HcFeiYongBuChang = arr[i].insuranceAmount
						} else if (num == num13) {
							this.HcSanFangTeYue = arr[i].insuranceAmount
						}
					}
				}
			},
			setA(e) {
				switch (e) {
					case 'MA':
						if (this.BuJiMianCheSun == 1) {
							this.BuJiMianCheSun = 0
						} else {
							this.BuJiMianCheSun = 1
						}
						break;
					case 'MB':
						if (this.BuJiMianSanZhe == 1) {
							this.BuJiMianSanZhe = 0
						} else {
							this.BuJiMianSanZhe = 1
						}
						break
					case 'MD3':
						if (this.BuJiMianSiJi == 1) {
							this.BuJiMianSiJi = 0
						} else {
							this.BuJiMianSiJi = 1
						}
						break;
					case 'MD4':
						if (this.BuJiMianChengKe == 1) {
							this.BuJiMianChengKe = 0
						} else {
							this.BuJiMianChengKe = 1
						}
						break;
					case 'MZ':
						if (this.BuJiMianZiRan == 1) {
							this.BuJiMianZiRan = 0
						} else {
							this.BuJiMianZiRan = 1
						}
						break;
					case 'MX1':
						if (this.BuJiMianSheShui == 1) {
							this.BuJiMianSheShui = 0
						} else {
							this.BuJiMianSheShui = 1
						}
						break;
					case 'MG1':
						if (this.BuJiMianDaoQiang == 1) {
							this.BuJiMianDaoQiang = 0
						} else {
							this.BuJiMianDaoQiang = 1
						}
						break;
					case 'ML':
						if (this.BuJiMianHuaHen == 1) {
							this.BuJiMianHuaHen = 0
						} else {
							this.BuJiMianHuaHen = 1
						}
						break;
				}
			},
			Bchange(e) {
				this.Bindex = e.detail.value
				if (this.Bindex == 0) {
					this.SanZhe = 0
					this.BuJiMianSanZhe = 0
				} else {
					this.SY = true
					this.SanZhe = this.Barray[this.Bindex].replace('万', '0000')
					this.BuJiMianSanZhe = 1
				}
			},
			D3change(e) {
				this.D3index = e.detail.value
				if (this.D3index == 0) {
					this.SiJi = 0
					this.BuJiMianSiJi = 0
				} else {
					this.SY = true
					this.SiJi = this.D3array[this.D3index].replace('万', '0000')
					this.BuJiMianSiJi = 1
				}
			},
			D4change(e) {
				this.D4index = e.detail.value
				if (this.D4index == 0) {
					this.ChengKe = 0
					this.BuJiMianChengKe = 0
				} else {
					this.SY = true
					this.ChengKe = this.D4array[this.D3index].replace('万', '0000')
					this.BuJiMianChengKe = 1
				}
			},
			Fchange(e) {
				this.Findex = e.detail.value
				switch (this.Findex) {
					case 0:
						this.BoLi = 0
						break;
					case 1:
						this.SY = true
						this.BoLi = 1
						break;
					case 2:
						this.SY = true
						this.BoLi = 2
						break;
				}
			},
			Q3change(e) {
				this.Q3index = e.detail.value
				switch (this.Q3index) {
					case 0:
						this.HcXiuLiChang = 0
						break;
					case 1:
						this.SY = true
						this.HcXiuLiChang = 0.1
						break;
					case 2:
						this.SY = true
						this.HcXiuLiChang = 0.15
						break;
				}
			},
			Lchange(e) {
				this.Lindex = e.detail.value
				if (this.Lindex == 0) {
					this.BuJiMianHuaHen = 0
					this.HuaHen = 0
				} else {
					this.SY = true
					this.BuJiMianHuaHen = 1
					this.HuaHen = this.Larray[this.Lindex].replace('万', '0000')
					this.HuaHen = this.Larray[this.Lindex].replace('千', '000')
				}
			},
			bindDateChange: function(e) {
				this.GLtime = e.target.value
			},
			biDateChange: function(e) {
				this.detail.UserInfo.BusinessExpireDate = e.target.value
			},
			ciDateChange: function(e) {
				this.detail.UserInfo.ForceExpireDate = e.target.value
			},
			setModel() {

			},
			SetShadow(e) {
				//this.e = e.detail.value
				switch (e) {
					case 1:
						this.isGL = !this.isGL
						break;
					case 'JQ':
						if (this.FORCEPREMIUM.insuredAmount == 'Y') {
							this.FORCEPREMIUM.insuredAmount = ''
						} else {
							this.FORCEPREMIUM.insuredAmount = 'Y'
						}
						break;
					case 'A':
						if (this.CheSun != 0) {
							this.CheSun = 0
							this.BuJiMianCheSun = 0
						} else {
							this.CheSun = 1
							this.BuJiMianCheSun = 1
							this.SY = true
						}
						break;
					case 'Z3':
						if (this.HcSanFangTeYue != 0) {
							this.HcSanFangTeYue = 0
						} else {
							this.HcSanFangTeYue = 1
							this.SY = true
						}
						break;
					case 'G1':
						if (this.DaoQiang != 0) {
							this.DaoQiang = 0
							this.BuJiMianDaoQiang = 0
						} else {
							this.DaoQiang = 1
							this.BuJiMianDaoQiang = 1
							this.SY = true
						}
						break;
					case 'Z':
						if (this.ZiRan != 0) {
							this.ZiRan = 0
							this.BuJiMianZiRan = 0
						} else {
							this.ZiRan = 1
							this.BuJiMianZiRan = 1
							this.SY = true
						}
						break;
					case 'X1':
						if (this.SheShui != 0) {
							this.SheShui = 0
							this.BuJiMianSheShui = 0
						} else {
							this.SheShui = 1
							this.BuJiMianSheShui = 1
							this.SY = true
						}
						break;
					case 'A':
						if (this.CheSun != 0) {
							this.CheSun = 0
							this.BuJiMianCheSun = 0
						} else {
							this.CheSun = 1
							this.BuJiMianCheSun = 0
							this.SY = true
						}
						break;
					case 'SY':
						this.SY = !this.SY
						if (!this.SY) {
							this.BuJiMianCheSun = 0
							this.CheSun = 0
							this.BuJiMianChengKe = 0
							this.ChengKe = 0
							this.BuJiMianDaoQiang = 0
							this.DaoQiang = 0
							this.BuJiMianHuaHen = 0
							this.HuaHen = 0
							this.BuJiMianSanZhe = 0
							this.SanZhe = 0
							this.BuJiMianSheShui = 0
							this.SheShui = 0
							this.this.BuJiMianZiRan = 0
							this.ZiRan = 0
							this.BuJiMianSiJi = 0
							this.SiJi = 0
							this.BoLi = 0
							this.HcSanFangTeYue = 0
							this.HcXiuLiChang = 0
							this.HcJingShenSunShi = 0
						}
						break;
					default:
						break;
				}
			},
			next() {
				if (this.FORCEPREMIUM.insuredAmount != 'Y' && !this.SY) {

					uni.showModal({
						title: '',
						content: '请选择要报价的险种',
						showCancel: false,
						cancelText: '',
						confirmText: '确定',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
					return false
				}
				let ForceTax = 0
				if (this.FORCEPREMIUM.insuredAmount == 'Y' && this.SY) {
					ForceTax = 1
				} else if (this.FORCEPREMIUM.insuredAmount == 'Y') {
					ForceTax = 2
				}
				this.insured = '&CheSun=' + this.CheSun + '&BuJiMianCheSun=' + this.BuJiMianCheSun + '&SanZhe=' + this.SanZhe +
					'&BuJiMianSanZhe=' + this.BuJiMianSanZhe + '&DaoQiang=' + this.DaoQiang + '&BuJiMianDaoQiang=' + this.BuJiMianDaoQiang +
					'&SiJi=' + this.SiJi + '&BuJiMianSiJi=' + this.BuJiMianSiJi + '&ChengKe=' + this.ChengKe + '&BuJiMianChengKe=' +
					this.BuJiMianChengKe + '&HuaHen=' + this.HuaHen + '&BuJiMianHuaHen=' + this.BuJiMianHuaHen + '&BoLi=' + this.BoLi +
					'&ZiRan=' + this.ZiRan +
					'&BuJiMianZiRan=' + this.BuJiMianZiRan + '&SheShui=' + this.SheShui + '&BuJiMianSheShui=' + this.BuJiMianSheShui +
					'&HcSanFangTeYue=' + this.HcSanFangTeYue + '&HcXiuLiChang=' + this.HcXiuLiChang
				let param = {}
				let carVehicleFgwCode
				
				if (this.map!= '') {
					if (this.carModel == '') {
						carVehicleFgwCode = this.carInfo.brandModel
					} else {
						carVehicleFgwCode = this.carModel
					}
					param = {
						personName: this.carInfo.licenseOwner,
						carInfoId: this.carInfo.carInfoId,
						// personMobile: this.detail.UserInfo.mobile,
						personCardIDType: this.carInfo.licenseOwnerIdCardType,
						personCardID: this.carInfo.licenseOwnerIdCard,
						carNo: this.carInfo.carNumber,
						carFrameNo: this.carInfo.frameNumber,
						carEngineNo: this.carInfo.engineNumber,
						//salesPerson: 1,
						carFirstRegisterDate: this.carInfo.registerDate,
						//lists: insered,
						source: this.map.insuredInfo.lastYearSource,
						createdBy: this.user.accountId,
						bistartDate: this.bistartDate,
						cistartDate: this.cistartDate,
						forceTax: ForceTax,
						carVehicleFgwCode: carVehicleFgwCode,
						quoteGroup: 7,
						submitGroup: 7
					}
				} else {
					if (this.carModel == '') {
						carVehicleFgwCode = this.detail.UserInfo.ModleName
					} else {
						carVehicleFgwCode = this.carModel
					}
					param = {
						personName: this.detail.UserInfo.LicenseOwner,
						carInfoId: this.detail.carInfoId,
						// personMobile: this.detail.UserInfo.mobile,
						personCardIDType: this.detail.UserInfo.IdType,
						personCardID: this.detail.UserInfo.CredentislasNum,
						carNo: this.detail.UserInfo.LicenseNo,
						carFrameNo: this.detail.UserInfo.CarVin,
						carEngineNo: this.detail.UserInfo.EngineNo,
						//salesPerson: 1,
						carFirstRegisterDate: this.detail.UserInfo.RegisterDate,
						//lists: insered,
						source: this.detail.SaveQuote.Source,
						createdBy: this.user.accountId,
						bistartDate: this.bistartDate,
						cistartDate: this.cistartDate,
						forceTax: ForceTax,
						carVehicleFgwCode: carVehicleFgwCode,
						quoteGroup: 7,
						submitGroup: 7
					}
				}
				/* 	this.$http.post(this.$api.Ws_GetPostPrecisePrice, param, 1).then((e) => {
					}) */
				uni.navigateTo({
					url: '../relationInfo/relationInfo?param=' + JSON.stringify(param)
				})
			},
			toChoice() {
				//@RequestParam String LicenseNo,@RequestParam String EngineNo,
				//@RequestParam String CarVin,@RequestParam int IsNeedCarVin,
				//                      @RequestParam String MoldName
				let param 
				if(this.map!=''){
					 param = {
						LicenseNo: this.carInfo.carNumber,
						EngineNo: this.carInfo.engineNumber,
						CarVin: this.carInfo.frameNumber,
						MoldName: this.carInfo.brandModel,
					}
				}else{
					 param = {
						LicenseNo: this.detail.UserInfo.LicenseNo,
						EngineNo: this.detail.UserInfo.EngineNo,
						CarVin: this.detail.UserInfo.CarVin,
						MoldName: this.detail.UserInfo.ModleName,
					}
				}
				
				uni.navigateTo({
					url: '../choiceQuoteCarModel/choiceQuoteCarModel?param=' + JSON.stringify(param),
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			listInsur(e) {
				const arr = e
				let num1 = 0
				let num111 = 0
				let num2 = 0
				let num22 = 0
				let num3 = 0
				let num33 = 0
				let num4 = 0
				let num44 = 0
				let num5 = 0
				let num55 = 0
				let num6 = 0
				let num7 = 0
				let num77 = 0
				let num8 = 0
				let num9 = 0
				let num99 = 0
				let num10 = 0
				let num1010 = 0
				let num11 = 0
				let num1111 = 0
				let num12 = 0
				let num13 = 0
				for (let i = 0; i < e.length; i++) {
					if (arr[i].insurance_name != '交强险') {
						num1 = data.similar(arr[i].insurance_name, this.A.insuranceName)
						num111 = data.similar(arr[i].insurance_name, this.A.insuranceName + '_不计免')
						num2 = data.similar(arr[i].insurance_name, this.B.insuranceName)
						num22 = data.similar(arr[i].insurance_name, this.B.insuranceName + '_不计免')
						num3 = data.similar(arr[i].insurance_name, this.G1.insuranceName)
						num33 = data.similar(arr[i].insurance_name, this.G1.insuranceName + '_不计免')
						num4 = data.similar(arr[i].insurance_name, this.D3.insuranceName)
						num44 = data.similar(arr[i].insurance_name, this.D3.insuranceName + '_不计免')
						num5 = data.similar(arr[i].insurance_name, this.D4.insuranceName)
						num55 = data.similar(arr[i].insurance_name, this.D4.insuranceName + '_不计免')
						num6 = data.similar(arr[i].insurance_name, this.Q3.insuranceName)
						num7 = data.similar(arr[i].insurance_name, this.Z.insuranceName)
						num77 = data.similar(arr[i].insurance_name, this.Z.insuranceName + '_不计免')
						num8 = data.similar(arr[i].insurance_name, this.F.insuranceName)
						num9 = data.similar(arr[i].insurance_name, this.L.insuranceName)
						num99 = data.similar(arr[i].insurance_name, this.L.insuranceName + '_不计免')
						num10 = data.similar(arr[i].insurance_name, this.X1.insuranceName)
						num1010 = data.similar(arr[i].insurance_name, this.X1.insuranceName + '_不计免')
						num11 = data.similar(arr[i].insurance_name, this.R.insuranceName)
						num1111 = data.similar(arr[i].insurance_name, this.R.insuranceName + '_不计免')
						num12 = data.similar(arr[i].insurance_name, this.Z2.insuranceName)
						num13 = data.similar(arr[i].insurance_name, this.Z3.insuranceName)
						const arr3 = [num1, num111, num2, num22, num3, num33, num4, num44, num5, num55, num6,
							num7, num77, num8, num9, num99, num10, num1010, num11, num1111, num12, num13
						]
						const num = Math.max.apply(null, arr3)
						if (num == num1) {
							this.CheSun = 1
						} else if (num == num111) {
							this.BuJiMianCheSun = 1
						} else if (num == num2) {
							this.SanZhe = arr[i].insurance_amount
							for (var i1 = 0; i1 < this.Barray.length; i1++) {
								if (this.Barray[i1].replace('万', '0000') == arr[i].insurance_amount) {
									this.Bindex = i1
								}
							}
						} else if (num == num22) {
							this.BuJiMianSanZhe = 1
						} else if (num == num3) {
							this.DaoQiang = 1
						} else if (num == num33) {
							this.BuJiMianDaoQiang = 1
						} else if (num == num4) {
							this.SiJi = arr[i].insurance_amount
							for (var i1 = 0; i1 < this.D3array.length; i1++) {
								if (this.D3array[i1].replace('万', '0000') == arr[i].insurance_amount) {
									this.D3index = i1
								}
							}
						} else if (num == num44) {
							this.BuJiMianSiJi = 1
						} else if (num == num5) {
							this.ChengKe = arr[i].insurance_amount
							for (var i1 = 0; i1 < this.D4array.length; i1++) {
								if (this.D4array[i1].replace('万', '0000') == arr[i].insurance_amount) {
									this.D4index = i1
								}
							}
						} else if (num == num55) {
							this.BuJiMianChengKe = 1
						} else if (num == num6) {
							this.HcXiuLiChang = arr[i].insurance_amount
						} else if (num == num7) {
							this.ZiRan = arr[i].insurance_amount
						} else if (num == num77) {
							this.BuJiMianZiRan = 1
						} else if (num == num8) {
							this.BoLi = arr[i].insurance_amount
							if (arr[i].insurance_amount == 0) {
								this.Findex = 1
							} else if (arr[i].insurance_amount == 1) {
								this.Findex = 2
							}
						} else if (num == num9) {
							this.HuaHen = arr[i].insurance_amount
							for (var i1 = 0; i1 < this.Larray.length; i1++) {
								if (this.Larray[i1].length < 5) {
									this.Larray[i1] = this.Larray[i1].replace('千', '000')
								} else {
									this.Larray[i1] = this.Larray[i1].replace('万', '0000')
								}
								if (this.Larray[i1] == arr[i].insurance_amount) {
									this.Lindex = i1
								}
							}

						} else if (num == num99) {
							this.BuJiMianHuaHen = 1
						} else if (num == num10) {
							this.SheShui = arr[i].insurance_amount
						} else if (num == num1010) {
							this.BuJiMianSheShui = 1
						} else if (num == num11) {
							this.HcJingShenSunShi = arr[i].insurance_amount
						} else if (num == num12) {
							this.HcFeiYongBuChang = arr[i].insurance_amount
						} else if (num == num13) {
							this.HcSanFangTeYue = arr[i].insurance_amount
						}
					}
				}
			}
		},
		onShow: function(e) {
			let pages = getCurrentPages();
			let currPage = pages[pages.length - 1];
			// #ifdef MP-WEIXIN
			//this.info = currPage.data.info
			//this.tag = currPage.data.tag
			// #endif
		},
		onLoad(e) {
			if (e.map) {
				this.map = JSON.parse(e.map)
				this.carInfo = this.map.carInfo
				this.bistartDate = this.map.insuredInfo.nextBusinesStartDate
				this.cistartDate = this.map.insuredInfo.nextForceStartDate
				this.listInsur(this.map.insuredList)
			} else {
				this.detail = JSON.parse(e.detail)
				this.bistartDate = this.detail.UserInfo.BusinessExpireDate
				this.cistartDate = this.detail.UserInfo.ForceExpireDate
				this.listmap()
			}
		}
	}
</script>

<style lang="scss">
	.head button {
		width: 50%;
	}

	.text-view {
		display: flex;
		flex-shrink: 0;
		margin-top: 5px;
	}

	.text-view text:first-child {
		text-align: justify;
		text-align-last: justify;
		width: 160upx;
	}

	.solids-bottom {
		border-bottom: 10upx rgba(0, 0, 0, 0.1) solid;
	}
</style>
