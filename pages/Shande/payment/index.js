//index.js
//获取应用实例
import {
	APPID,
	USERCODE,
	USE_PRIVATEKEY
} from '../../../config_sand.js';
import util from '../../../utils/util';
var RSA = require('../../../utils/wxapp_rsa')
const api = require('../../../utils/reques').default

Page({
	data: {
		wechatdata: '',
		sandpay: '',
		msg: '',
		back: true,

		version: 10, //版本号
		mer_no: '6888806121524', //商户号 
		mer_order_no: 'BDD1686720731305897329', //商户订单号
		create_time: 20230613111839, //订单创建时间 
		expire_time: 20230613114839,
		order_amt: 0.01, //订单金额
		goods_name: '棒多多微信支付',
		notify_url: 'http://csbdd.taoqiy.com/sendPay.php',
		return_url: 'http://manage.taoqiy.com/open.html',
		create_ip: '192_168_2_101',
		jump_scheme:'sandcash://scpay',
		clear_cycle: '3',
		product_code: '02010006',
		resourceEnv: 'pay-9ge1043s65abc42c',
		pay_extra: {
			"resourceAppid": "wx6a6dd93e9a71fc7d",
			"resourceEnv": "pay-9ge1043s65abc42c"
		},
		meta_option: {
			"s": "Android",
			"n": "",
			"id": "",
			"sc": ""
		},
		store_id: '100001',
		accsplit_flag: 'NO',
		sign_type: 'RSA',
		url: ''
	},
	onLoad(opi) {

		// this.wxmlogin()
		this.goPay()

	},

	onShow(e) {},

	wxmlogin() {
		wx.login({
			success: async (res) => {
				const jsCode = res.code
				const params = {
					jsCode
				}
				const wxres = await api.wxm_login(params)
				console.log(wxres);
			},
		})
	},

	goPay() {
		const data = this.data

		// let esign = {
		// 	version: data.version,
		// 	mer_no: data.mer_no,
		// 	mer_order_no: data.mer_order_no,
		// 	create_time: data.create_time,
		// 	order_amt: data.order_amt,
		// 	notify_url: data.notify_url,
		// 	return_url: data.return_url,
		// 	create_ip: data.create_ip,
		// 	store_id: data.store_id,
		// 	pay_extra: data.pay_extra,
		// 	accsplit_flag: data.accsplit_flag,
		// 	sign_type: data.sign_type
		// }
		// let dataArray = []
		// for (let key in esign) {
		// 	dataArray.push(key)
		// }
		// dataArray.sort((a, b) => {
		// 	let len = Math.min(a.length, b.length)
		// 	for (let i = 0; i < len; i++) {
		// 		if (a.charCodeAt(i) !== b.charCodeAt(i)) {
		// 			return a.charCodeAt(i) - b.charCodeAt(i)
		// 		}
		// 	}
		// 	return a.length - b.length
		// })
		// let signParams = ""
		// for (let key of dataArray) {
		// 	let value = data[key]
		// 	if (typeof value === "object") {
		// 		value = JSON.stringify(value)
		// 	}
		// 	signParams += `&${key}=${value};`;
		// }
		// signParams = signParams.slice(1, -1)
		// console.log(signParams) // 输出构建的签名参数串


		// const peamer = {
		// 		version: data.version,
		// 		mer_no: data.mer_no,
		// 		mer_order_no: data.mer_order_no,
		// 		create_time: data.create_time,
		// 		order_amt: data.order_amt,
		// 		notify_url: data.notify_url,
		// 		return_url: data.return_url,
		// 		create_ip: data.create_ip,
		// 		store_id: data.store_id,
		// 		pay_extra: data.pay_extra,
		// 		accsplit_flag: data.accsplit_flag,
		// 		expire_time: data.expire_time,
		// 		goods_name: data.goods_name,
		// 		product_code: data.product_code,
		// 		clear_cycle:	data.clear_cycle,
		// 		jump_scheme: data.jump_scheme,
		// 		sign_type: data.sign_type,
		// 		meta_option: data.meta_option
		// }

		// let urlArray = []
		// for (let key in peamer) {
		// 	urlArray.push(key)
		// }
		// urlArray.sort((a, b) => {
		// 	let len = Math.min(a.length, b.length)
		// 	for (let i = 0; i < len; i++) {
		// 		if (a.charCodeAt(i) !== b.charCodeAt(i)) {
		// 			return a.charCodeAt(i) - b.charCodeAt(i)
		// 		}
		// 	}
		// 	return a.length - b.length
		// })
		// let urlParams = ""
		// for (let key of urlArray) {
		// 	let value = data[key]
		// 	if (typeof value === "object") {
		// 		value = JSON.stringify(value)
		// 	}
		// 	urlParams += `&${key}=${value};`;
		// }
		// urlParams = urlParams.slice(1, -1)
		// console.log('输出构建url参数串',urlParams)

		// const goods_name =encodeURIComponent("小程序支付")
		// const notify_url =encodeURIComponent("http://csbdd.taoqiy.com/sendPay.php")
		// const return_url =encodeURIComponent("https://www.taobao.com")
		const pay_extra =encodeURIComponent({"resourceAppid":"wx6a6dd93e9a71fc7d","resourceEnv":"pay-9ge1043s65abc42c"})
		console.log(pay_extra);
		// const meta_option =encodeURIComponent([{"s":"Android","n":"","id":"","sc":""},{"s":"IOS","n":"","id":"","sc":""}])
		// const sign =encodeURIComponent("n/W8/t0OkwBw/45wFj5BIEnUm/YixtJ+hX7p5q/06OXMalIMLxWYHB83B9zfx0mI0u/KDgV7HqxeAGugLIFACnV8mFqy4tMQ5sEE5Ino2PPYhSnq/b2VxhH9x0r2qqTyMG+Go/suE6arO+120j3mGChOg5G8BZchVmBfgzZ2Nnxm2HMi0Ai9mfiyI5LQewDCZVJVXw2BaVnR0VG+p8ja8q6+CCZBdlYXPEwzwuC35lmtrlsrRyaTiaEMHegOk+kCxeA80G8521MvQpMr6HN6zIOjmQd3jo/KehJK4R94n1LSEn7gAMb42Po/ulvyGRgNrDI5FZdbzRnT05pbplm1mQ==")

		


		const encoded_url = `version=10&mer_no=${data.mer_no}&mer_order_no=${data.mer_order_no}&create_time=${data.create_time}&order_amt=${data.order_amt}&notify_url=${data.notify_url}&return_url=${encodeURIComponent(data.return_url)}&create_ip=${data.create_ip}&store_id=100001&pay_extra={"resourceAppid":"${APPID}","resourceEnv":"${data.resourceEnv}"}&accsplit_flag=NO&sign_type=RSA`
		// console.log(encoded_url);
		var Sig;
		var sign_rsa = new RSA.RSAKey(); 
		sign_rsa = RSA.KEYUTIL.getKey(USE_PRIVATEKEY);
		var hashAlg = 'sha1';
		Sig = sign_rsa.signString(encoded_url, hashAlg);
		Sig = RSA.hex2b64(Sig); // hex 转 b64
		// console.log("加签结果：" + Sig)

		this.setData({
			url: `https://sandcash.mixienet.com.cn/pay/h5/applet?version=10&mer_no=${data.mer_no}&mer_order_no=${data.mer_order_no}&create_time=${data.create_time}&order_amt=${data.order_amt}&notify_url=${encodeURIComponent(data.notify_url)}&return_url=${encodeURIComponent(data.return_url)}&create_ip=${data.create_ip}&store_id=000001&pay_extra={"resourceAppid":"${APPID}","resourceEnv":"${data.resourceEnv}"}&accsplit_flag=NO&sign_type=RSA&product_code=${data.product_code}&goods_name=${encodeURIComponent(data.goods_name)}&meta_option=${data.meta_option}&sign=${Sig}`
			// url: `https://sandcash.mixienet.com.cn/pay/h5/applet?${urlParams}&sign=${Sig}`
			// url:``
		})
		// console.log(this.data.url);
	},

})