const api = require('../../../utils/reques').default

Page({
	data: {
		showPassword: false,
		mobile: '',
		balance: '',
		userInfo: {},
	},

	async getUserInfo() {
		const {
			code,
			data
		} = await api.getUserInfo()
		if (code === 0) {
			this.setData({
				userInfo: data,
			})
		}
	},
	async transferBalance(surplus_password) {
		const {
			mobile,
			balance,

		} = this.data
		const params = {
			mobile,
			balance,
			surplus_password
		}
		let res = null

		res = await api.transferBalance(params)

		if (res.code === 0) {
			this.setData({
				showPassword: false,
				mobile: '',
				balance: ''
			})
			this.getUserInfo()
			wx.showToast({
				title: '转账成功',
				icon: 'none'
			})
		}
	},
	payOrderNext(e) {
		this.transferBalance(e.detail)
	},
	changeIntegral(e) {
		const num = parseInt(e.detail.value)
		console.log(num);
		const total =  this.data.userInfo.balance
		if (num > total) this.setData({
			balance: total
		})
	},
	closePay() {
		this.setData({
			showPassword: false
		})
	},
	async register() {
		const {
			mobile,
			balance
		} = this.data
		if (!balance) return wx.showToast({
			title: '请输入转账金额',
			icon: 'none'
		})
		if (!mobile) return wx.showToast({
			title: '请输入收款人手机号',
			icon: 'none'
		})
		this.setData({
			showPassword: true
		})
	},
	onLoad(options) {
		this.getUserInfo()
	}

})