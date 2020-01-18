<template>
	<view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">问题反馈</block>
		</cu-custom>

		<form>
			<view class="cu-form-group solid-bottom"><textarea maxlength="-1" :disabled="modalName != null" @input="textareaAInput" placeholder="请输入反馈内容"></textarea></view>
			<view class="cu-bar bg-white">
				<view class="action">图片上传</view>
				<view class="action">{{ imgList.length }}/4</view>
			</view>
			<view class="cu-form-group solid-bottom">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item, index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
						<image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index"><text class="cuIcon-close"></text></view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length < 4"><text class="cuIcon-cameraadd"></text></view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">联系方式</view>
				<input placeholder="选填" v-model="map.tel" type="text"></input>
			</view>
		</form>
		<view class="tui-address-new text-center margin-top">
			<button class="cu-btn bg-blue lg" style="width: 80%;" @tap="addFeedback">提交</button>
			<!-- <tui-button type="danger" height="88rpx" @click="editAddr">+ </tui-button> -->
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	computed: mapState(['user']),
	data() {
		return {
			imgList: [],
			modalName: null,
			textareaAValue: '',
			textareaBValue: '',
			imageUrl: [],
			map: {
				content: '',
				tel: ''
			}
		};
	},
	methods: {
		ChooseImage() {
			uni.chooseImage({
				count: 4, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: res => {
					if (this.imgList.length != 0) {
						this.imgList = this.imgList.concat(res.tempFilePaths);
					} else {
						this.imgList = res.tempFilePaths;
					}
				}
			});
		},
		ViewImage(e) {
			uni.previewImage({
				urls: this.imgList,
				current: e.currentTarget.dataset.url
			});
		},
		DelImg(e) {
			uni.showModal({
				title: '提示',
				content: '确定要删除这张图片吗？',
				cancelText: '取消',
				confirmText: '确定',
				success: res => {
					if (res.confirm) {
						this.imgList.splice(e.currentTarget.dataset.index, 1);
					}
				}
			});
		},
		textareaAInput(e) {
			this.map.content = e.detail.value;
		},
		uploadImage(e) {},
		addFeedback() {
			let param = this.map;
			param.createUser = this.user.accountId;
			let t = 0;
			this.$http.post(this.$api.addFeedback, param).then(e => {
				if (e.code == 200) {
					if(this.imgList.length==0){
						uni.showToast({
							title: '反馈成功'
						});
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							});
						}, 500);
					}else{
						for (var i = 0; i < this.imgList.length; i++) {
							uni.uploadFile({
								url: this.$http.base + this.$api.uploadImage,
								filePath: this.imgList[i],
								name: 'file',
								formData: {
									id: e.data
								},
								success: uploadFileRes => {
									t=t+1
									if(t==this.imgList.length){
										uni.showToast({
											title: '反馈成功'
										});
										setTimeout(function() {
											uni.navigateBack({
												delta: 1
											});
										}, 500);
									}
								}
							});
						}
					}
				}
			});
		}
	}
};
</script>

<style>
.cu-form-group .title {
	min-width: calc(4em + 15px);
}
</style>
