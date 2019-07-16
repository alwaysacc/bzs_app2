export default {
	getBase64Image(img) {
		var canvas = document.createElement("canvas");
		canvas.width = img.width;
		canvas.height = img.height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0, img.width, img.height);
		var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
		var dataURL = canvas.toDataURL("image/" + ext);
		return dataURL;
	},
	checkEmail(email) {
		return RegExp(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/).test(
			email);
	},
	//校验手机格式
	checkMobile(mobile) {
		return RegExp(/^1[34578]\d{9}$/).test(mobile);
	},
	//校验姓名
	checkUserName(name) {
		return RegExp(/^[\u4E00-\u9FA5]+$/).test(name);
	},
	getBeforeDate(n) {
		var now = new Date();
		var aftertime = new Date(n);
		var year = now.getFullYear();
		var mon = now.getMonth() + 1;
		var day = now.getDate();
		var year_after = aftertime.getFullYear();
		var mon_after = aftertime.getMonth() + 1;
		var day_after = aftertime.getDate();
		var chs = 0;
		//获取当月的天数
		function DayNumOfMonth(Year, Month) {
			return 32 - new Date(Year, Month - 1, 32).getDate();
		}
		if (aftertime.getTime() - now.getTime() < 0) {
			var temp1 = day_after;
			var temp2 = mon_after;
			var temp3 = year_after;
			day_after = day;
			mon_after = mon;
			year_after = year;
			day = temp1;
			mon = temp2;
			year = temp3;
		}
		if (year == year_after) { //不跨年
			if (mon == mon_after) { //不跨年不跨月
				chs += day_after - day;
			} else { //不跨年跨月
				chs += DayNumOfMonth(year, mon) - day + 1; //加上第一个不满的
				for (var i = 1; i < mon_after - mon; i++) {
					chs += DayNumOfMonth(year, mon + i);
				}
				chs += day_after - 1; //加上
			}
		} else { //存在跨年
			chs += DayNumOfMonth(year, mon) - day + 1; //加上开始年份不满的一个月
			for (var m = 1; m < 12 - mon; m++) {
				chs += DayNumOfMonth(year, mon + m);
			}
			for (var j = 1; j < year_after - year; j++) {
				if ((year + j) % 400 == 0 || (year + j) % 4 == 0 && (year + j) % 100 != 0) {
					chs += 366;
				} else {
					chs += 365;
				}
			}
			for (var n = 1; n <= mon_after; n++) {
				chs += DayNumOfMonth(year_after, n);
			}
			chs += day_after - 1;
		}
		if (aftertime.getTime() - now.getTime() < 0) {
			return -chs;
		} else {
			return chs;
		}
	},
	formatDate(value) {
		const date = new Date(value)
		const y = date.getFullYear()
		let MM = date.getMonth() + 1
		MM = MM < 10 ? ('0' + MM) : MM
		let d = date.getDate()
		d = d < 10 ? ('0' + d) : d
		let h = date.getHours()
		h = h < 10 ? ('0' + h) : h
		let m = date.getMinutes()
		m = m < 10 ? ('0' + m) : m
		let s = date.getSeconds()
		s = s < 10 ? ('0' + s) : s
		return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
	},
	similar(str1, str2) {
		// 计算两个字符串的长度。
		var len1 = str1.length
		var len2 = str2.length
		var dif = [];
		var // 建立上面说的数组，比字符长度大一个空间
			temp;
		var i;
		var j;
		var a
		// 赋初值，步骤B
		for (a = 0; a <= len1; a++) {
			dif[a] = []
			dif[a][0] = a
		}
		for (a = 0; a <= len2; a++) {
			dif[0][a] = a
		}
		// 计算两个字符是否一样，计算左上的值
		// var temp;
		for (i = 1; i <= len1; i++) {
			for (j = 1; j <= len2; j++) {
				if (str1[i - 1] == str2[j - 1]) {
					temp = 0
				} else {
					temp = 1
				}
				dif[i][j] = Math.min(dif[i - 1][j - 1] + temp, dif[i][j - 1] + 1, dif[i - 1][j] + 1)
			}
		}
		// console.log("差异步骤：" + dif[len1][len2]);
		// 计算相似度
		// var similarity = 1 - dif[len1][len2] / Math.max(str1.length, str2.length);
		return 1 - dif[len1][len2] / Math.max(len1, len2)
	},
	getDateForEnd(value) {
		const date = new Date(value)
		const y = date.getFullYear()
		let MM = date.getMonth() + 1
		MM = MM < 10 ? ('0' + MM) : MM
		let d = date.getDate()
		d = d < 10 ? ('0' + d) : d
		let h = date.getHours()
		h = h < 10 ? ('0' + h) : h
		let m = date.getMinutes()
		m = m < 10 ? ('0' + m) : m
		let s = date.getSeconds()
		s = s < 10 ? ('0' + s) : s
		d = d
		if (MM == 2) {
			if (d + 3 > 28) {
				MM = parseInt(MM) + 1
				d = d + 3 - 28
			}
		} else if (MM == 4 || MM == 6 || MM == 9 || MM == 11) {
			if (d + 3 > 30) {
				MM = parseInt(MM) + 1
				d = d + 3 - 30
			}
		} else {
			if (d + 3 > 31) {
				MM = parseInt(MM) + 1
				d = d + 3 - 31
			}
		}
		return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
	},
	getQueryString(url, name) {
		var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i')
		var r = url.substr(1).match(reg)
		if (r != null) {
			return r[2]
		}
		return null;
	},
	isChinese(temp) {
		var re = /[a-zA-Z]+/; //验证大小写26个字母任意字母最少出现1次。
		if (re.test(temp)) return false;
		return true;
	},
	IdCodeValid(code) {
		//身份证号合法性验证  
		//支持15位和18位身份证号  
		//支持地址编码、出生日期、校验位验证  
		var city = {
			11: "北京",
			12: "天津",
			13: "河北",
			14: "山西",
			15: "内蒙古",
			21: "辽宁",
			22: "吉林",
			23: "黑龙江 ",
			31: "上海",
			32: "江苏",
			33: "浙江",
			34: "安徽",
			35: "福建",
			36: "江西",
			37: "山东",
			41: "河南",
			42: "湖北 ",
			43: "湖南",
			44: "广东",
			45: "广西",
			46: "海南",
			50: "重庆",
			51: "四川",
			52: "贵州",
			53: "云南",
			54: "西藏 ",
			61: "陕西",
			62: "甘肃",
			63: "青海",
			64: "宁夏",
			65: "新疆",
			71: "台湾",
			81: "香港",
			82: "澳门",
			91: "国外 "
		};
		var row = true;
		var msg = "验证成功";

		if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(code)) {
			row = false,
				msg = "被保人身份证号格式错误";
		} else if (!city[code.substr(0, 2)]) {
			row = false,
				msg = "被保人身份证号地址编码错误";
		} else {
			//18位身份证需要验证最后一位校验位  
			if (code.length == 18) {
				code = code.split('');
				//∑(ai×Wi)(mod 11)  
				//加权因子  
				var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
				//校验位  
				var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
				var sum = 0;
				var ai = 0;
				var wi = 0;
				for (var i = 0; i < 17; i++) {
					ai = code[i];
					wi = factor[i];
					sum += ai * wi;
				}
				if (parity[sum % 11] != code[17].toUpperCase()) {
					row = false,
						msg = "被保人身份证号校验位错误";
				}
			}
		}
		return row;
	},
	handle(param) {
		var strlen = param.length;
		if (strlen < 9) {
			return strlen;
		}
		return param.replace(/^(.{6})(?:\d+)(.{4})$/, "$1******$2");
	},
	followDate(e) {
		let d=e.substring(0,5)
		e=e.replace(d,'')
		return e.replace('/','-')
	},
	followTime(value) {
		const date = new Date(value)
		const y = date.getFullYear()
		let MM = date.getMonth() + 1
		MM = MM < 10 ? ('0' + MM) : MM
		let d = date.getDate()
		d = d < 10 ? ('0' + d) : d
		let h = date.getHours()
		h = h < 10 ? ('0' + h) : h
		let m = date.getMinutes()
		m = m < 10 ? ('0' + m) : m
		let s = date.getSeconds()
		s = s < 10 ? ('0' + s) : s
		return h + ':' + m + ':' + s
	}
}
