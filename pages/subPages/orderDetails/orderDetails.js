const fetch = require("../../../utils/reques").default
Page({
	data: {
		bottom: wx.getStorageSync('bottom'),
		statusbar: 0,
		orderInfo: {},
		isRefresh: false,
		time: '',
		id: '', //当前订单id
		order_sn: '',
		RefundInfo: '',
		shipping_sn:'',
		show:false
	},
	//导航
	navigation() {
		let {
			server_name,
			lat,
			lng
		} = this.data.orderInfo
		wx.openLocation({
			type: 'gcj02',
			latitude: parseFloat(lat),
			longitude: parseFloat(lng),
			name: server_name
		})
	},
	// 查看物流
	toLogistic(e) {

		if (e.currentTarget.dataset.id === null || e.currentTarget.dataset.id === undefined) {
			wx.showToast({
				title: '请填写物流单号',
				icon: 'none',
				duration: 2000
			})
		} else {
			wx.navigateTo({
				url: '../logistics/logistics?id=' + e.currentTarget.dataset.id,
			})
		}
	},
	toLogistics(e) {
			wx.navigateTo({
				url: '../logistics/logistics?id=' + e.currentTarget.dataset.id,
			})
	},
	back() {
		wx.navigateBack()
	},
	// 订单剩余时间
	startTime() {
		let nowtime = Date.parse(new Date())
		let time = this.data.orderInfo.order_invalid_time * 1000
		if (nowtime > time) {
			this.setData({
				time: '00:00'
			})
		} else {
			let num = (time - nowtime) / 1000
			var timer = setInterval(() => {
				num--
				let mm = parseInt(num / 60)
				let ss = num % 60
				if (mm < 10) {
					mm = '0' + mm
				}
				if (ss < 10) {
					ss = '0' + ss
				}
				let str = mm + ':' + ss
				this.setData({
					time: str
				})
				if (num < 0) {
					this.setData({
						time: '00:00'
					})
					clearInterval(timer)
				}
			}, 1000)
		}
	},
	// 订单二次支付
	toTowPay(e) {
		let {
			order_invalid_time,
			payment_money,
			district_money,
			order_sn,
			create_time,
			product_info
		} = e.currentTarget.dataset.item
		let good_name = product_info[0].good_name
		let data = {
			order_invalid_time,
			payment_money,
			district_money,
			order_sn,
			id: this.data.id,
			create_time,
			good_name
		}
		data = JSON.stringify(data)
		wx.redirectTo({
			url: '/winePages/pages/twoPayment/twoPayment?info=' + data,
		})
	},
	getDate: function (time) {
		var date = new Date(parseInt(time) * 1000)
		var y = date.getFullYear()
		var m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
		var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
		var h = date.getHours();
		var mm = date.getMinutes();
		var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
		return y + '-' + m + '-' + d + '  ' + h + ':' + mm + ':' + s
	},
	async getOrderInfo(id) {
		const {
			code,
			data
		} = await fetch.getWinOrderInfo({
			id
		})
		if (code === 0) {
			let orderInfo = data
			orderInfo.create_time = this.getDate(orderInfo.create_time)
			orderInfo.shipping_time = this.getDate(orderInfo.shipping_time)
			orderInfo.pay_time = this.getDate(orderInfo.pay_time)
			orderInfo.refund_time = this.getDate(orderInfo.refund_time)
			orderInfo.update_time = this.getDate(orderInfo.update_time)
			this.setData({
				orderInfo
			})
			if (orderInfo.pay_status === 0 && orderInfo.order_status !== 5) {
				this.startTime()
			}
		}
	},
	//填写退货快递单号
	async setRefundSn(){
		const order_sn = this.data.order_sn
		const shipping_sn = this.data.shipping_sn
		const {
			code,
			data
		} = await fetch.setRefundSn({
			order_sn,
			shipping_sn
		})
		this.getRefundInfo()
		this.setData({
			show:false
		})
	},
	// 退款
	applyRefund() {
		let refundOrderInfo = this.data.orderInfo
		wx.getStorageSync('refundOrderInfo') && wx.removeStorageSync('refundOrderInfo')
		wx.setStorageSync('refundOrderInfo', refundOrderInfo)
		wx.navigateTo({
			url: '../refund/refund'
		})
	},

	onClose() {
		this.setData({
			show: false
		});
	},

	showPopup() {
		this.setData({
			show: true
		});
	},

	async getRefundInfo(e) {
		if(!this.data.isRefresh){
			const order_sn = this.data.order_sn
			console.log(order_sn);
			const {
				code,
				data
			} = await fetch.getRefundInfo({
				order_sn
			})
			if (code === 0) {
				this.setData({
					RefundInfo: data
				})
			}
		}
	},

	onLoad: function (options) {
		this.setData({
			id: options.id,
			order_sn: options.order_sn,
			isRefresh: options.isRefresh || false,
			statusbar: wx.getMenuButtonBoundingClientRect()
		})
	},

	onReady: function () {

	},

	onShow: function () {
		this.getOrderInfo(this.data.id)
		this.getRefundInfo()
	},

	onUnload: function () {
		wx.removeStorage({
			key: 'orderInfo',
		})
		var pages = getCurrentPages()
		var prevPage = pages[pages.length - 2]
		prevPage.setData({
			isRefresh: this.data.isRefresh
		})
	},


})