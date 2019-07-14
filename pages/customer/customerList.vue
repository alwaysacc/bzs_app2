<template>
	<view class="home1">
		<cu-custom bgColor="bg-gradual-blue" :isBack="false" :isCustom="true">
			<block slot="left">客户列表</block>
			<block slot="content">客户列表</block>
			<block slot="right">
				<text class="cuIcon-search padding" @tap="toSetRelation"></text>
			</block>
		</cu-custom>
		<view class="box" v-if="showSearch">
			<view class="cu-bar search bg-white">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input v-model="carNoOrName" type="text" placeholder="输入车牌号或车主姓名" confirm-type="search"></input>
				</view>
				<view class="action">
					<button class="cu-btn bg-blue shadow-blur round" @tap="search">搜索</button>
				</view>
			</view>
		</view>
		<view class="head flex justify-between align-center padding">
			<view @tap="showModal" data-target="RadioModal">
				{{item}}<text class="cuIcon-triangledownfill"></text>
			</view>
			<view @tap="showModal" data-target="timeModal">{{item1}}<text class="cuIcon-triangledownfill"></text></view>
			<view @click="showModal" data-target="DrawerModalR">筛选<text class="cuIcon-filter"></text></view>
		</view>
		<view class="center">
			<view class="cu-modal" :class="modalName=='RadioModal'?'show':''" @tap="hideModal">
				<view class="cu-dialog">
					<radio-group class="block" @change="RadioChange">
						<view class="cu-list menu text-left">
							<view class="cu-item" v-for="(item,index) in array" :key="index">
								<label class="flex justify-between align-center flex-sub">
									<view class="flex-sub"> {{item}}</view>
									<radio class="round" :class="radio==index?'checked':''" :checked="radio==index?true:false"
									 :value="index"></radio>
								</label>
							</view>
						</view>
					</radio-group>
				</view>
			</view>
			<view class="cu-modal" :class="modalName=='timeModal'?'show':''" @tap="hideModal">
				<view class="cu-dialog">
					<radio-group class="block" @change="RadioChange1">
						<view class="cu-list menu text-left">
							<view class="cu-item" v-for="(item,index) in array1" :key="index">
								<label class="flex justify-between align-center flex-sub">
									<view class="flex-sub"> {{item}}</view>
									<radio class="round" :class="radio==index?'checked':''" :checked="radio==index?true:false"
									 :value="index"></radio>
								</label>
							</view>
						</view>
					</radio-group>
				</view>
			</view>
			<view class="cu-modal drawer-modal justify-end" :class="modalName=='DrawerModalR'?'show':''" @tap="hideModal">
				<view class="cu-dialog basis-lg" @tap.stop="" :style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
					<view class="text-left  padding-left padding-top padding-right">
						<text class="text-bold text-xl">续保状态</text>
						<view class="margin-top-sm flex justify-between">
							<button class="cu-btn margin-right-xs" :class="Istat==1?'line-red':'line-black'" @tap="choice('I',1)">快递保单</button>
							<button class="cu-btn margin-right-xs" :class="Istat==2?'line-red':'line-black'" @tap="choice('I',2)">网点配送</button>
							<button class="cu-btn " :class="Istat==3?'line-red':'line-black'" @tap="choice('I',3)">网点自取</button>
						</view>
					</view>
					<view class="text-left padding-left padding-top padding-right">
						<text class="text-bold text-xl">上年投保公司</text>
						<view class="margin-top-sm  flex justify-between">
							<button class="cu-btn  margin-right-xs" :class="Cstat==1?'line-red':'line-black'" @tap="choice('C',1)">中国人保</button>
							<button class="cu-btn  margin-right-xs" :class="Cstat==2?'line-red':'line-black'" @tap="choice('C',2)">中国平安</button>
							<button class="cu-btn  " :class="Cstat==3?'line-red':'line-black'" @tap="choice('C',3)">太平洋</button>
						</view>
					</view>
					<view class="text-left  padding-left padding-top padding-right">
						<text class="text-bold text-xl">跟进状态</text>
						<view class="margin-top-sm  flex justify-between ">
							<button class="cu-btn  margin-right-xs" :class="Fstat==1?'line-red':'line-black'" @tap="choice('F',1)">待联系</button>
							<button class="cu-btn  margin-right-xs" :class="Fstat==2?'line-red':'line-black'" @tap="choice('F',2)">已报价</button>
							<button class="cu-btn  " :class="Fstat==3?'line-red':'line-black'" @tap="choice('F',3)">已预约</button>
						</view>
						<view class="margin-top-sm  flex justify-between ">
							<button class="cu-btn  " :class="Fstat==4?'line-red':'line-black'" @tap="choice('F',4)">成功出单</button>
							<button class="cu-btn  " :class="Fstat==5?'line-red':'line-black'" @tap="choice('F',5)">申请投保</button>
							<button class="cu-btn  " :class="Fstat==6?'line-red':'line-black'" @tap="choice('F',6)">战败</button>
						</view>
					</view>
					<view class="text-left  padding-left padding-top padding-right">
						<text class="text-bold text-xl">下次跟进时间</text>
						<view class="margin-top-sm  flex justify-start ">
							<button class="cu-btn  margin-right-xs" :class="Tstat==1?'line-red':'line-black'" @tap="choice('T',1)">今天</button>
							<button class="cu-btn  margin-right-xs" :class="Tstat==2?'line-red':'line-black'" @tap="choice('T',2)">明天</button>
							<button class="cu-btn  margin-right-xs" :class="Tstat==3?'line-red':'line-black'" @tap="choice('T',3)">3天后</button>
							<button class="cu-btn  " :class="Tstat==4?'line-red':'line-black'" @tap="choice('T',4)">7天后</button>
						</view>
					</view>
					<view class="text-left  padding-left padding-top padding-right">
						<text class="text-bold text-xl">报价状态</text>
						<view class="margin-top-sm  flex justify-start ">
							<button class="cu-btn  margin-right-xs" :class="Qstat==1?'line-red':'line-black'" @tap="choice('Q',1)">已报价</button>
							<button class="cu-btn  margin-right-xs" :class="Qstat==2?'line-red':'line-black'" @tap="choice('Q',2)">未报价</button>
						</view>
					</view>
					<view class="flex bottom">
						<button class="cu-btn lg bg-white shadow margin-right btn" @tap="clear">重置</button>
						<button class="cu-btn lg bg-blue shadow margin-right btn" @tap="close">确定</button>
					</view>
				</view>
			</view>
			<view v-for="(item) in list" @tap="toDetail(item)">
				<view class="bg-grey light padding-bottom-xs"></view>
				<view class="padding">
					<view class="flex justify-between align-center">
						<text class="text-xxl text-bold">
							{{item.car_number}}
						</text>
						<text v-if="item.overTime<0">已脱保</text>
						<text v-else-if="item.overTime!=''">据到期<text class="text-red">{{item.overTime}}</text>天</text>
						<text v-else>未到期</text>
					</view>
					<view class="text-xm text-gray">
						<view class="padding-top-xs">
							品牌型号:{{item.brand_model}}
						</view>
						<view class="padding-top-xs padding-bottom">
							车主姓名:{{item.license_owner}}
						</view>
					</view>
					<view class="flex justify-between align-center padding-top">
						<text class="">
							未跟进
						</text>
						<text class="text-gray">{{item.CREATED_TIME}}</text>
					</view>
				</view>
			</view>
			<view class="cu-load bg-grey light" :class="!isLoad?'loading':'over'"></view>
		</view>
	</view>
</template>

<script>
	import date from '../../comment/similar.js'
	import popupLayer from '../../components/popup-layer/popup-layer.vue';
	import {
		mapState
	} from 'vuex'
	export default {
		computed: mapState(['user']),
		data() {
			return {
				CustomBar: this.CustomBar,
				modalName: null,
				item: '全部客户',
				item1:'录入时间最近',
				array: ['全部客户', '续保期客户'],
				array1: ['录入时间最近', '到期时间最近', '下次跟进时间最近'],
				Qstat: '',
				Istat: '',
				Tstat: '',
				Fstat: '',
				Cstat: '',
				size: 5,
				page: 1,
				isLoad: true,
				list: [],
				maxPage: 0,
				showSearch:false,
				radio:'',
				carNoOrName:''
			}
		},
		methods: {
			search(){
				let param={
					accountId: this.user.accountId,
					roleId: this.user.roleId,
				}
				if(date.isChinese(this.carNoOrName)){
					param.lincenseOwner=this.carNoOrName
				}else{
					param.carNumber=this.carNoOrName
				}
				this.$http.post(this.$api.searchUserList, param).then((e) => {
					console.log(e);
					if(e.code==200){
						this.list={}
						this.list = e.data
						for (var i = 0; i < this.list.length; i++) {
							this.list[i].CREATED_TIME=date.formatDate(this.list[i].CREATED_TIME)
							if (this.list[i].next_busines_start_date != null) {
								this.$set(this.list[i], 'overTime', date.getBeforeDate(this.list[i].next_busines_start_date))
							} else if (this.list[i].next_force_start_date != null) {
								this.$set(this.list[i], 'overTime', date.getBeforeDate(this.list[i].next_force_start_date))
							} else {
								this.$set(this.list[i], 'overTime', '')
							}
						}
						console.log(this.list);
					}
				})
				console.log(param);
			},
			toSetRelation(){
				this.showSearch=!this.showSearch
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			RadioChange(e) {
				this.item=this.array[e.detail.value]
				this.radio = e.detail.value
				console.log(e);
			},
			RadioChange1(e) {
				this.item1=this.array1[e.detail.value]
				this.radio = e.detail.value
				console.log(this.radio);
			},
			choice(e1, e2) {
				//this.stat = e
				switch (e1) {
					case 'Q':
						this.Qstat = e2
						break;
					case 'C':
						this.Cstat = e2
						break;
					case 'I':
						this.Istat = e2
						break;
					case 'T':
						this.Tstat = e2
						break;
					case 'F':
						this.Fstat = e2
						break;
				}
				console.log(e1);
				console.log(e2);
			},
			close() {
				this.modalName = ''
			},
			clear() {
				this.Fstat = ''
				this.Cstat = ''
				this.Istat = ''
				this.Qstat = ''
				this.Tstat = ''
			},
			toDetail(e){
				console.log(e.car_info_id);
				uni.navigateTo({
					url: '../quote/renewalDeatil?carInfoId='+e.car_info_id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			getUserList(e1) {
				let param = {
					accountId: this.user.accountId,
					roleId: this.user.roleId,
					page: this.page,
					size: this.size
				}
				this.$http.post(this.$api.getUserList, param).then((e) => {
					if (e.code == 200) {
						//this.list=e.data.list
						if (e1 == 1) {
							this.list={}
							this.list = e.data.list
						} else {
							this.list = this.list.concat(e.data.list)
						}
						console.log(this.list);
						for (var i = 0; i < this.list.length; i++) {
							this.list[i].CREATED_TIME=date.formatDate(this.list[i].CREATED_TIME)
							if (this.list[i].next_busines_start_date != null) {
								this.$set(this.list[i], 'overTime', date.getBeforeDate(this.list[i].next_busines_start_date))
							} else if (this.list[i].next_force_start_date != null) {
								this.$set(this.list[i], 'overTime', date.getBeforeDate(this.list[i].next_force_start_date))
							} else {
								this.$set(this.list[i], 'overTime', '')
							}

						}
						console.log(this.list);
						this.maxPage = e.data.pages
					} else {
						uni.showToast({
							title: '获取失败，请稍后再试',
							icon: 'none',
							mask: false,
							duration: 1500
						});
					}
				})
			}

		},
		onShow() {
			this.getUserList(1)
		},
		onReachBottom() {
			this.isLoad=false
			console.log(this.page);
			console.log(this.maxPage);
			if (this.page < this.maxPage) {
				this.page += 1
				console.log(this.page);
				this.getUserList()
			} else {
				this.isLoad = true
			}
			console.log(222);
		},
		components: {
			popupLayer
		}
	}
</script>

<style lang="scss">
	.home {
		display: flex;
		overflow-y: hidden;
		display: -webkit-flex;
		/* vh 相对于可视区域的高度 */
		/* 设置主轴方向 */
		flex-direction: column;
		background-color: #FFFFFF;
		height: 100%;
	}

	.cu-modal.drawer-modal .cu-dialog {
		height: 100%;
		min-width: 80%;
		border-radius: 0;
		margin: initial;
		transition-duration: 0.3s;
	}

	.bottom {
		position: absolute;
		bottom: 0;
		left: 20%;
	}

	.btn {
		width: 200upx;
	}
</style>
