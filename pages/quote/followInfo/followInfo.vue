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
			<picker @change="PickerChange" :value="index" :range="picker">
				<view class="picker">
					{{index>-1?picker[index]:'请选择'}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group solid-bottom">
			<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="请填写补充内容"></textarea>
		</view>
		
		<view class="padding margin-top text-center">
			<button class="cu-btn bg-blue lg">保存</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: -1,
				picker: ['喵喵喵', '汪汪汪', '哼唧哼唧'],
			}
		},
		methods: {
	PickerChange(e) {
				this.index = e.detail.value
			},
		}
	}
</script>

<style>
.text-center button{
	width: 300upx;
}
</style>
