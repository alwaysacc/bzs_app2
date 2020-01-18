<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">客户信息</block>
		</cu-custom>
		<!-- <view class="head1  flex justify-center ">
			<view class="flex ">
				<view class="padding-sm" :class="but?'bg-blue':'solid'" @tap="follow">查询详情</view>
				<view class="padding-sm" :class="but?'solid':'bg-blue'" @tap="follow">跟进记录</view>
			</view>
		</view> -->
		<scroll-view scroll-x class="bg-white nav" v-if="isSelect">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index == TabCur ? 'text-blue cur' : ''" v-for="(item, index) in array" :key="index" @tap="tabSelect" :data-id="index">
					{{ item }}
				</view>
			</view>
		</scroll-view>
		<view class="head justify-between solid-bottom" @tap="toSetCustomer" v-if="but">
			<view class="cu-bar margin-xs radius top-padding">
				<text class="cuIcon-people"></text>
				<text class="text-xl">未知客户</text>
			</view>
			<view class="cu-bar margin-xs radius">
				<text class="cuIcon-title text-red"></text>
				<text class="text-grey">编辑</text>
				<text class="cuIcon-right text-gray"></text>
			</view>
		</view>
		<view class="center" v-if="but">
			<view v-if="!show">
				<view class="line-view solid-bottom solid-top"><text class="border-title ">车辆信息</text></view>
				<view class="center-top solid-bottom">
					<view class="text-center padding-top-xs">
						<text class="text-xxl text-center">{{ detail.UserInfo.LicenseNo }}</text>
					</view>
					<view class="item flex">
						<text>品牌型号：</text>
						<view class="text-cut radius" style="width:220px">{{ detail.UserInfo.ModleName }}</view>
					</view>
					<view class="item">
						<text>车架号：</text>
						<text>{{ detail.UserInfo.CarVin }}</text>
					</view>
					<view class="item">
						<text>发动机号：</text>
						<text>{{ detail.UserInfo.EngineNo }}</text>
					</view>
					<view class="item">
						<text>注册日期：</text>
						<text>{{ detail.UserInfo.RegisterDate }}</text>
					</view>
					<view class="item">
						<text>车主姓名：</text>
						<text>{{ detail.UserInfo.LicenseOwner }}</text>
					</view>
				</view>
				<view>
					<view class="flex text-gray text-xs justify-between height-view solid-bottom">
						<view class="justify-between">
							<text>录入时间：{{ detail.createTime }}</text>
						</view>
						<view class="justify-between"><text>业务员:hhh</text></view>
					</view>
					<view class="line-view solid-bottom solid-top"><text class="border-title ">去年投保信息</text></view>
					<view class="bottom-view">
						<view class="left">
							<view>
								<text>上年投保公司:{{ source }}</text>
							</view>
							<view class="padding-top-xs">
								<text>交强险到期时间:{{ detail.UserInfo.NextForceStartDate }}</text>
							</view>
							<view class="padding-top-xs">
								<text>商业险到期时间:{{ detail.UserInfo.NextBusinessStartDate }}</text>
							</view>
							<!-- 	<view class="padding-top-xs">
								<text>交强险保单号:123</text>
							</view>
							<view class="padding-top-xs">
								<text>商业险保单号:123</text>
							</view> -->
						</view>
						<view class="right" v-if="over < 1"><view>脱保</view></view>
						<view class="right text-center " v-if="over > 0">
							<view class="">距到期{{ over }}天</view>
						</view>
					</view>
					<view class="view-table">
						<view class="div-table">
							<view class="tr">
								<view class="td">险种</view>
								<view class="td">保额/责任限额</view>
							</view>
							<view class="tr" v-for="item in detail.insuredList">
								<view class="td">{{ item.insuranceName }}</view>
								<view class="td">{{ item.insuranceAmount == 1 ? '投保' : item.insuranceAmount }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view v-if="show && map != ''">
				<view class="line-view solid-bottom solid-top"><text class="border-title ">车辆信息</text></view>
				<view class="center-top solid-bottom">
					<view class="text-center padding-top-xs">
						<text class="text-xxl text-center">{{ map.carInfo.carNumber }}</text>
					</view>
					<view class="item">
						<text>品牌型号：</text>
						<text>{{ map.carInfo.brandModel }}</text>
					</view>
					<view class="item">
						<text>车架号：</text>
						<text>{{ map.carInfo.frameNumber }}</text>
					</view>
					<view class="item">
						<text>发动机号：</text>
						<text>{{ map.carInfo.engineNumber }}</text>
					</view>
					<view class="item">
						<text>注册日期：</text>
						<text>{{ map.carInfo.registerDate }}</text>
					</view>
					<view class="item">
						<text>车主姓名：</text>
						<text>{{ map.carInfo.licenseOwner }}</text>
					</view>
				</view>
				<view>
					<view class="flex text-gray text-xs justify-between height-view solid-bottom">
						<view class="justify-between">
							<text>录入时间：{{ map.carInfo.createdTime }}</text>
						</view>
						<view class="justify-between"><text>业务员:hhh</text></view>
					</view>
					<view class="line-view solid-bottom solid-top"><text class="border-title ">去年投保信息</text></view>
					<view v-if="map.insuredInfo != null">
						<view class="bottom-view">
							<view class="left">
								<view>
									<text>上年投保公司:{{ map.insuredInfo.lastYearInsuranceCompany }}</text>
								</view>
								<view class="padding-top-xs">
									<text>交强险到期时间:{{ map.insuredInfo.nextForceStartDate }}</text>
								</view>
								<view class="padding-top-xs">
									<text>商业险到期时间:{{ map.insuredInfo.nextBusinesStartDate }}</text>
								</view>
								<!-- 	<view class="padding-top-xs">
									<text>交强险保单号:123</text>
								</view>
								<view class="padding-top-xs">
									<text>商业险保单号:123</text>
								</view> -->
							</view>
							<view class="right" v-if="over <= 0"><view>脱保</view></view>
							<view class="right text-center " v-if="over > 0">
								<view class="">距到期{{ over }}天</view>
							</view>
						</view>
						<view class="view-table">
							<view class="div-table">
								<view class="tr">
									<view class="td">险种</view>
									<view class="td">保额/责任限额</view>
								</view>
								<view class="tr" v-for="item in map.insuredList">
									<view class="td">{{ item.insurance_name }}</view>
									<view class="td">{{ item.insurance_amount == 1 ? '投保' : item.insurance_amount }}</view>
								</view>
							</view>
						</view>
					</view>
					<view v-if="map.insuredInfo == null" class="padding flex justify-center">未获取到投保信息</view>
				</view>
			</view>
		</view>
		<view class="head padding text-center align-center justify-center solid-bottom solids-top" v-if="but">
			<button class="cu-btn bg-blue lg" @tap="toQuote" v-if="stat">去报价</button>
			<button class="cu-btn bg-blue lg" @tap="toQuoteDetail" v-if="!stat">查看报价详情</button>
		</view>

		<view class="center" v-if="!but">
			<view class="cu-timeline" v-if="followInfoList != ''" v-for="item in followInfoList">
				<view class="cu-time">{{ item.date }}</view>
				<view class="cu-item">
					<view class="content" v-for="f in item.children">
						<view class="cu-capsule radius">
							<view class="cu-tag bg-cyan">{{ f.createTime }}</view>
						</view>
						<view class="margin-top">
							<view class="">跟跟状态：{{ f.followStat }}</view>
							<view class="">下次跟进时间：{{ f.nextFollowDate }}</view>
							<view class="">本次跟进内容：{{ f.followContent }}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="padding text-center" v-if="followInfoList == ''"><text>暂无跟进记录</text></view>
		</view>
		<view v-if="!but" class="whirte text-sl radius" @tap="toFollow"><text class="cuIcon-add bg-blue"></text></view>
	</view>
</template>

<script>
import date from '../../comment/similar.js';
import { uniIcon } from '@dcloudio/uni-ui';
export default {
	data() {
		return {
			detail: {},
			over: 0,
			stat: true,
			but: true,
			map: [],
			show: false,
			source: '',
			TabCur: 0,
			scrollLeft: 0,
			array: ['查询详情', '跟进记录'],
			isSelect: false,
			carInfoId: '',
			followInfoList: {},
			scrollTop: 0
		};
	},
	methods: {
		getFollowInfoByCarInfoId() {
			let param = {
				carInfoId: this.carInfoId
			};
			this.$http.post(this.$api.getFollowInfoByCarInfoId, param).then(e => {
				if (e.code == 200) {
					this.followInfoList = e.data.list;
					for (var i = 0; i < this.followInfoList.length; i++) {
						this.followInfoList[i].date = date.followDate(this.followInfoList[i].date);
						for (var j = 0; j < this.followInfoList[i].children.length; j++) {
							this.followInfoList[i].children[j].createTime = date.followTime(this.followInfoList[i].children[j].createTime);
							this.followInfoList[i].children[j].nextFollowDate = date.formatDate(this.followInfoList[i].children[j].nextFollowDate);
						}
					}
				}
			});
		},
		toFollow(e) {
			uni.navigateTo({
				url: 'followInfo/followInfo?carInfoId=' + this.carInfoId,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			if (this.TabCur == 0) {
				this.but = true;
			} else {
				this.but = false;
				this.getFollowInfoByCarInfoId();
			}
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
		},
		toQuoteDetail() {
			uni.navigateTo({
				url: 'precisionQuote/precisionQuote?carInfoId=' + this.map.carInfo.carInfoId,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		follow() {
			this.but = !this.but;
		},
		toSetCustomer() {
			uni.navigateTo({
				url: '../customer/setCustomer/setCustomer?carInfoId=' + this.detail.carInfoId
			});
		},
		toQuote() {
			if (this.show) {
				uni.navigateTo({
					url: 'choiceInsurance/choiceInsurance?map=' + JSON.stringify(this.map)
				});
			} else {
				uni.navigateTo({
					url: 'choiceInsurance/choiceInsurance?detail=' + JSON.stringify(this.detail)
				});
			}
		},
		userDetails(e) {
			let param = {
				carInfoId: e
			};
			this.$http.post(this.$api.userDetails, param).then(e => {
				if (e.code == 200) {
					var arr = new Array();
					let insuredList = e.data.insuredList;
					for (var i = 0; i < insuredList.length; i++) {
						if (insuredList[i].insurance_name.indexOf('不计免') != -1) {
							arr.push(insuredList[i].insurance_name);
							insuredList.splice(i, 1);
							i = i - 1;
						}
					}
					for (var j = 0; j < insuredList.length; j++) {
						for (var i = 0; i < arr.length; i++) {
							if(arr[i].indexOf(insuredList[j].insurance_name.substr(0,3))!=-1){
								insuredList[j].insurance_amount=insuredList[j].insurance_amount+'(不计免)'
							}
						}
					}
					this.map = e.data;
					this.map.insuredList=insuredList
					this.map.carInfo.createdTime = date.formatDate(this.map.carInfo.createdTime);
					if (this.map.insuredInfo.nextBusinesStartDate) {
						this.over = date.getBeforeDate(this.map.insuredInfo.nextBusinesStartDate);
					} else {
						this.over = date.getBeforeDate(this.map.insuredInfo.nextForceStartDate);
					}
					if (this.map.quote.length != 0) {
						this.stat = false;
					}
				}
			});
		},
		getData() {
			Array.prototype.remove = function(val) {
				var index = this.indexOf(val);
				if (index > -1) {
					this.splice(index, 1);
				}
			};

			if (this.detail.UserInfo.BusinessExpireDate) {
				this.over = date.getBeforeDate(this.detail.UserInfo.BusinessExpireDate);
			} else {
				this.over = date.getBeforeDate(this.detail.UserInfo.ForceExpireDate);
			}

			this.detail.createTime = date.formatDate(this.detail.createTime);
			switch (this.detail.SaveQuote.Source) {
				case 1:
					this.source = '太平洋保险';
					break;
				case 2:
					this.source = '平安保险';
					break;
				case 4:
					this.source = '人民保险';
					break;
				case 8:
					this.source = '人寿财险';
					break;
			}
			var arr = new Array();
			let listStr =JSON.stringify(this.detail.insurance);
			let insuredList=JSON.parse(listStr)
			for (var i = 0; i < insuredList.length; i++) {
				if (insuredList[i].insuranceName.indexOf('不计免') != -1) {
					arr.push(insuredList[i].insuranceName);
					insuredList.splice(i, 1);
					i = i - 1;
				}
			}
			for (var j = 0; j < insuredList.length; j++) {
				for (var i = 0; i < arr.length; i++) {
					if(arr[i].indexOf(insuredList[j].insuranceName.substr(0,3))!=-1){
						insuredList[j].insuranceAmount=insuredList[j].insuranceAmount+'(不计免)'
					}
				}
			}
			console.log(this.detail);
			this.detail.insuredList=insuredList
			console.log(this.detail);
			let list = this.detail.listMap;
			for (var i = 0; i < list.length; i++) {
				if (list[i].insuranceName == null) {
					list.splice(i, 1);
					i = i - 1;
				}
			}
		}
	},
	components: {
		uniIcon
	},
	onLoad(e) {
		if (e.carInfoId) {
			this.carInfoId = e.carInfoId;
			this.userDetails(e.carInfoId);
			this.show = true;
			this.isSelect = true;
		} else {
			this.detail = JSON.parse(e.detail);
			this.getData();
		}
	},
	onShow() {
		if (!this.but) {
			this.getFollowInfoByCarInfoId();
		}
	},
	//页面滚动执行方式
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	}
};
</script>

<style lang="scss">
.whirte {
	position: absolute;
	bottom: 20%;
	right: 10%;
}

.home {
	display: flex;
	height: 100vh;
	overflow-y: hidden;
	display: -webkit-flex;
	/* vh 相对于可视区域的高度 */
	min-height: 100vh;
	/* 设置主轴方向 */
	flex-direction: column;
}

.head {
	height: 120upx;
	display: flex;
	align-items: center;
}

.head1 {
	display: flex;
	align-items: center;
}

.head button {
	width: 50%;
}

.center {
	-webkit-box-flex: 1;
	-webkit-flex: 1;
	-ms-flex: 1;
	flex: 1;
	overflow: auto;
	-webkit-overflow-scrolling: touch;
}

.center-top {
	padding: 0 20upx;
}

.item {
	display: flex;
	flex-shrink: 0;
	margin-top: 10px;
}

.item text:first-child {
	text-align: justify;
	text-align-last: justify;
	width: 160upx;
}

.height-view {
	padding: 20upx 20upx;
}

.top-padding {
	text-align: left;
	padding: 0;
	margin: 0;
}

.line-view {
	padding: 20upx 20upx;
	background-color: #e7ebed;
}

.bottom-view {
	padding: 20upx;
	display: flex;
}

.bottom-view .left {
	width: 90%;
}

.bottom-view .right {
	width: 10%;
}

.bottom-view .right view {
	width: 80upx;
	height: 100upx;
	background: red;
	font-size: 12px;
	display: flex;
	color: white;
	align-items: center;
	justify-content: center;
}

$div-table-border-color: #666;
$div-table-border-width: 1upx;

.view-table {
	margin: 20upx;
}

.div-table {
	display: table;
	width: 100%;
	height: 100%;
	border: $div-table-border-width solid $div-table-border-color;
	box-sizing: border-box;
	table-layout: fixed;
	position: relative;

	.celspan {
		display: table;
		width: 100%;
		height: 100%;

		.td {
			display: table-cell;
			border: none !important;
		}

		.td + .td {
			border-left: $div-table-border-width solid $div-table-border-color !important;
		}
	}

	.rowspan {
		display: table;
		width: 100%;
		height: 100%;

		.tr {
			display: table-row;
			border: none !important;
		}
	}

	&.fixed-thead {
		.tbody,
		.thead,
		.tr,
		.th,
		.td {
			display: block;
		}

		.tr,
		.th {
			&:after {
				content: '';
				display: block;
				visibility: hidden;
				clear: both;
				height: 0;
			}
		}

		.td {
			float: left;
			width: 33.33%;
		}

		.tbody {
			height: 400upx;
			overflow-y: auto;
			overflow-x: hidden;
		}
	}

	.tr,
	.th {
		display: table-row;

		& + .tr,
		& + .th {
			.td,
			.th {
				border-top: $div-table-border-width solid $div-table-border-color;
				word-break: break-word;
			}
		}
	}

	.rowspan {
		.tr,
		.th {
			display: table-row;

			.td,
			.th {
				border: none;
			}

			& + .tr,
			& + .th {
				.td,
				.th {
					border-top: $div-table-border-width solid $div-table-border-color;
				}
			}
		}
	}

	.td {
		display: table-cell;
		vertical-align: middle;
		text-align: center;
		box-sizing: border-box;
		padding: 10upx;

		&.noPadding {
			padding: 0;
		}

		& + .td {
			border-left: $div-table-border-width solid $div-table-border-color;
		}
	}

	.th .td {
		font-weight: bold;
	}

	.tbody {
		display: table-row-group;
	}

	.thead {
		display: table-header-group;

		.tr,
		.th {
			.td,
			.th {
				border-bottom: $div-table-border-width solid $div-table-border-color;
			}
		}
	}

	.tfoot {
		display: table-footer-group;

		.tr,
		.th {
			.td,
			.th {
				border-top: $div-table-border-width solid $div-table-border-color;
			}
		}
	}

	.colgroup {
		display: table-column-group;
	}

	.col {
		display: table-column;
	}

	.caption {
		display: table-caption;
	}
}
</style>
