export default {
	base:'http://localhost:8082/',
	// base:'https://www.baozhishun.com/api/',
	baseOptions(params, methods, e) {
		if (e == null) {
			uni.showLoading({
				title: '拼命加载中',
				mask: true
			});
		}
		const {
			url,
			data
		} = params
		let contentType = 'application/x-www-form-urlencoded'
		contentType = params.contentType || contentType
		return new Promise((resolve, reject) => {
			uni.request({
				url: this.base+`${url}`,
				method: methods,
				data: data,
				header: {
					'content-type': contentType
				},
				success: (res) => {
					uni.hideLoading()
					resolve(res.data)
				},
				fail(e) {
					uni.hideLoading();
					uni.showToast({
						title: "网络异常，请稍后再试!",
						icon: "none",
					})
					reject("网络异常，请稍后再试!");
				}
			});
		})
	},
	get(url, data = '') {
		const option = {
			url,
			data
		}
		return this.baseOptions(option, 'GET')
	},
	post(url, data, e) {
		const params = {
			url,
			data,
		}
		return this.baseOptions(params, 'POST', e)
	},
	setHost(host) {
		base = host
	},
	getHost() {
		return 111
	}
}


/* let base = 'http://localhost:8082/'
function HTTP(obj, config) {

	let defaultConfig = {
		isRes: false,
		loading: false
	}

	config = { ...defaultConfig,
		...config
	}


	// 如果需要显示loading,mask防止点击穿透
	config.loading && uni.showLoading({
		title: '加载中',
		mask: true
	});

	return new Promise((resolve, reject) => {
		console.log(111);

		let options = {
			url: 'http://localhost:8082/'+ "",
			method: "GET",
			data: {},
			dataType: "json",
			header: {
				"content-type": "application/x-www-form-urlencoded",
				"X-requested-With": "XMLHttpRequest"
			},
			success: (res) => {
				console.log("HTTP请求结果：",res)
				uni.hideLoading();
				// 状态码为200
				if (res.statusCode == 200) {
					let data = res.data;

					// //自动校验用户是否登录过期
					// if (data.code == "01") {
					// 	store.dispatch("reLogin");
					// 	return;
					// }

					//返回 { code:10000,msg:"消息",data:[] }
					if (config.isRes) {
						resolve(data)
					}
					// 返回 data:[]
					else {
						if (data.code == "00") {
							resolve(data.data || true)
						} else {
							wx.showToast({
								title: data.msg,
								icon: "none",
								duration: 2000
							})
							reject(data.msg);
						}
					}
				} else {
					reject("HTTP:状态码异常！");
				}
			},
			fail: (err) => {
				uni.hideLoading();
				uni.showToast({
					title: "网络异常，请稍后再试!",
					icon: "none",
				})
				reject("网络异常，请稍后再试!");
			},
			complete: () => {}
		}

		options = { ...options,
			...obj
		};
		
		const OPENID = uni.getStorageSync("openId");
		if (OPENID) options["header"]["openId"] = OPENID;

		if (options.url && options.method) {
			wx.request(options);
		} else {
			wx.showToast({
				title: 'HTTP：缺失参数',
				icon: "none",
				duration: 2000
			})
		}
	})

}



export default {
	GET(url, data = {}, config) {
		return HTTP({
			url,
			data,
			method: "GET"
		}, config);
	},
	POST(url, data = {}, config) {
		return HTTP({
			url,
			data,
			method: "POST"
		}, config);
	},

	POSTformdata(url, data = {}, config) {
		return HTTP({
			url,
			data,
			method: "POST"
		}, config);
	}
}

 */