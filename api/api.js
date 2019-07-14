export const api = {
	list: 'quoteinfo/list',
	login: 'login/login',
	checkByCarNoOrVinNo: 'insuredinfo/checkByCarNoOrVinNo',
	//获取客户列表
	getUserList: 'carinfo/getUserList',
	//搜索客户列表
	searchUserList: 'carinfo/searchUserList',
	//报价记录
	getCarInfoQuote: 'carinfo/getCarInfoQuote',
	userDetails: 'quoteinfo/quoteDetails',
	getOrderList: 'orderinfo/getOrderList',
	updateCustomer: 'customer/updateCustomer',
	getQuoteInfoAllParams: 'quoteinfo/getQuoteInfoAllParams',
	quoteDetails: 'quoteinfo/quoteDetails',
	// 提交订单
	createOrder: 'quoteinfo/pay',
	payCancel: 'quoteinfo/payCancel',
	getOrderDetail: 'orderinfo/getOrderDetail',
	//获取佣金提成列表
	getDrawCashList: 'draw/cash/getDrawCashList',
	//判断用户名是否存在
	checkUserLoginName: 'account/info/checkUserLoginName',
	//获取验证码
	getCode: 'account/info/getCode',
	//注册
	registerForWX: 'account/info/registerForWX',
	//实名认证
	updateUserIdCard: 'account/info/updateUserIdCard',
	accountVerified: 'account/info/accountVerified',
	//获取实名认证状态
	getVerifiedStatById:'idCardImg/getVerifiedStatById',
	//获取代理人
	getParentList: 'account/info/getParentList',
	//修改代理人状态
	update: 'account/info/update',
	//体现账户设置
	saveAccount: 'pay/account/add',
	updateAccount: 'pay/account/update',
	//获取收益信息
	getWithdraw: 'account/info//getWithdraw',
	//申请提现
	updateMoney: 'account/info//updateMoney',
	//提现记录
	getVerificationList: 'verification/getVerificationList',
	//获取提现账户列表
	getListById: 'pay/account/getListById',

	WX_checkByCarNoOrVinNo: 'insuredinfo/WX_checkByCarNoOrVinNo',
	//报价前置
	Ws_GetPostPrecisePrice: 'quoteinfo/WX_GetPostPrecisePrice',
	//获取报价信息
	Ws_GetPrecisePrice: 'quoteinfo/WX_GetPrecisePrice',
	//核保
	Ws_GetSubmitInfo: 'quoteinfo/WX_GetSubmitInfo', 
	//支付
	Ws_GetPayAddress: 'quoteinfo/WX_GetPayAddress',
	//确认支付
	WX_GetPayResult: 'quoteinfo/WX_GetPayResult',
	//车型校验
	WX_GetNewVehicleInfo: 'carinfo/WX_GetNewVehicleInfo',
	updateCarInfo: 'carinfo/updateCarInfo',
	// 取消订单
	WX_DoVoidPay: 'quoteinfo/WX_DoVoidPay',
	
	//今日佣金
	todayCommList: 'commission/percentage/list',
	
	
}
export default {
	api
}
