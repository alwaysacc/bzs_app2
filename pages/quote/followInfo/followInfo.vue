<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">录入跟进</block>
		</cu-custom>
		<view class="cu-form-group">
			<view class="title">跟进状态</view>
			<picker @change="PickerChange" :value="index" :range="picker">
				<view class="picker">
					{{index>-1?picker[index]:'请选择'}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group ">
			<view class="title">下次跟进时间</view>
			<picker disabled>
				<view class="picker"  @click="onShowDatePicker('datetime')">
					{{datetime}}
				</view>
			</picker>
			<mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true"
			:show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
		</view>
		<view class="cu-form-group solid-bottom">
			<textarea maxlength="-1" v-model="data.followContent" placeholder="请填写补充内容"></textarea>
		</view>
		<view class="padding margin-top text-center">
			<button class="cu-btn bg-blue lg" @tap="saveFollowInfo">保存</button>
		</view>
	</view>
</template>

<script>
	function getDate(type) {
		const date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		let h=date.getHours()
		let f=date.getMinutes()
		let m=date.getSeconds()
		if (type == 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
		h = h > 9 ? h : '0' + h;
		m = m > 9 ? m : '0' + m;
		f = f > 9 ? f : '0' + f;
		return `${year}/${month}/${day} ${h}:${f}:${m}`;
	}
	import ruiDatePicker from '@/components/rattenking-dtpicker/rattenking-dtpicker.vue';
	import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
	export default {
		components: {
			ruiDatePicker,
			MxDatePicker
		},
		data() {
			return {
				index: -1,
				date: getDate({
					format: true
				}),
				picker: ['忙碌中待联系', '已报价考虑中(普通)', '已报价考虑中(重点)',
					'其他', '成功出单', '申请投保', '战败', '无效数据'
				],

				data: {
					followStat: '',
					nextFollowDate: '',
					followContent: '',
					carInfoId: '',
				},
				showPicker: false,
                datetime: getDate({
					format: true
				}),
                type: 'rangetime',
                value: ''
			}
		},
		methods: {
			 onShowDatePicker(type){//显示
                this.type = type;
                this.showPicker = true;
                this.value = this[type];
            },
			onSelected(e) {//选择
                this.showPicker = false;
                if(e) {
                    this[this.type] = e.value; 
                    //选择的值
					this.data.nextFollowDate=e.value
                    console.log('value => '+ e.value);
                    //原始的Date对象
                    console.log('date => ' + e.date);
                }
            },
			saveFollowInfo(e) {
				if(this.data.followContent==''){
					uni.showToast({
						icon:'none',
						title: '请填写补充内容'
					});
					return
				}
				if(this.data.followStat==''){
					uni.showToast({
						icon:'none',
						title: '请选择跟进状态'
					});
					return
				}
				if(this.data.nextFollowDate==''){
					uni.showToast({
						icon:'none',
						title: '请选择下次跟进时间'
					});
					return
				}
				let param = this.data
				this.$http.post(this.$api.saveFollowInfo, param).then(e => {
						uni.showToast({
							title: '添加成功'
						});
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							});
						}, 1000);
				})
			},
			PickerChange(e) {
				this.index = e.detail.value
				this.data.followStat = this.picker[e.detail.value]
			},
			DateChange(e) {
				this.data.nextFollowDate = e.detail.value
			},
		},
		onLoad(e) {
			this.data.carInfoId = e.carInfoId
			console.log(this.data.carInfoId);
		}
	}
</script>

<style>
	.text-center button {
		width: 300upx;
	}
</style>
