<template>
    <view class="home">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">找回密码</block>
		</cu-custom>
        <form>
        	<view class="cu-form-group">
        		<view class="title">手机号：</view>
        		<m-input type="text" v-model="tel" placeholder="请输入手机号"></m-input>
        	</view>
        	<view class="cu-form-group">
        		<view class="title">验证码</view>
        		<m-input type="text" v-model="email" placeholder="请输入验证码"></m-input>
        		<button class="bg-green cu-btn" :disabled="btnDis" @tap="sendCode">{{btnText}}</button>
        	</view>
        	<view class="cu-form-group ">
        		<view class="title">新密码</view>
        		<m-input type="password" displayable v-model="password" placeholder="请输入新密码"></m-input>
        	</view>
        </form>
        <view class="btn-row">
            <button type="primary" class="primary" @tap="findPassword">提交</button>
        </view>
    </view>
</template>

<script>
    import service from '../../service.js';
    import mInput from '../../components/m-input.vue';

    export default {
        components: {
            mInput
        },
        data() {
            return {
                tel: '',
				code:'',
				password:'',
				btnDis: false,
				submitBtnDis: false,
				btnText: "发送验证码",
            }
        },
        methods: {
            findPassword() {
                /**
                 * 仅做示例
                 */
                if (this.email.length < 3 || !~this.email.indexOf('@')) {
                    uni.showToast({
                        icon: 'none',
                        title: '邮箱地址不合法',
                    });
                    return;
                }
                uni.showToast({
                    icon: 'none',
                    title: '已发送重置邮件至注册邮箱，请注意查收。',
                    duration: 3000
                });
            },
			// 发送验证码
			async sendCode() {
			
				/* let checkRes = graceChecker.check(this.params, formRuleConfig.sendCodeRule);
				if (!checkRes) {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
					return;
				}
			
				await this.$apis.getMsgCode({
					type: 0,
					phoneNo: this.params.phoneNo
				}); */
				
				uni.showToast({
					title: '发送成功'
				});
				// 开启倒计时
				this.countDown();
			},
			
			// 验证码倒计时
			countDown() {
				let t = null;
				let timer = 60;
				this.btnDis = true;
				clearInterval(t);
				this.btnText = `${timer}s`;
				t = setInterval(() => {
					if (timer == 0) {
						clearInterval(t);
						this.btnText = "重新发送";
						this.btnDis = false;
						return;
					}
					timer--;
					this.btnText = `${timer}s`;
				}, 1000)
			}
        }
    }
</script>

<style>
	.home{
		padding-top: 100px;
	}
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	/* #ifdef MP-WEIXIN */
	.cu-form-group .cu-btn {
		width: 350upx
	}
	/* #endif */
	
	.input-row {
		justify-content: center;
		/*水平居中*/
		align-items: center;
		/*垂直居中*/
	}
	.input-row button {
		font-size: 16px;
	}
</style>
