const api = require('../../utils/reques').default
var timer = null
var time = 60
Page({
	data: {
		statusBar: wx.getMenuButtonBoundingClientRect(),
		text: '发送验证码',
		type: false,
		Privacy: true,
		mobile: '',
		password: '',
		code: '',
		jsCode: '',
	},

	onLoad(options) {

	},
	onShow() {

	},



	switchlogin() {
		this.setData({
			type: !this.data.type,
			code: '',
			password: ''
		})
	},
	onUnload() {
		clearTimeout(timer)
		time = 60
		timer = null
	},
	// 发送验证码
	async sendCode() {
		if (timer) return
		const that = this
		if (!/^[1][3-8]\d{9}$|^([6|9])\d{7}$|^[0][9]\d{8}$|^[6]([8|6])\d{5}$/.test(this.data.mobile)) return wx.showToast({
			title: '手机号码格式错误',
			icon: 'none'
		})
		const params = {
			mobile: this.data.mobile,
			type: 3,
		}
		const res = await api.sendcode(params)
		const {
			code,
			msg
		} = res
		if (code === 0) {
			wx.showToast({
				title: '发送成功',
				icon: 'none'
			})
			fun()

			function fun() {
				clearTimeout(timer)
				timer = setTimeout(() => {
					time--
					that.setData({
						text: `${time}s后重新获取`
					})
					if (time <= 0) {
						clearTimeout(timer)
						timer = null
						time = 60
						that.setData({
							text: '发送验证码'
						})
						return
					}
					fun()
				}, 1000)
			}
		} else {
			wx.showToast({
				title: msg,
				icon: 'none'
			})
		}
	},

	async submit() {
		const {
			mobile,
			password,
			code,
		} = this.data
		if (!mobile) return wx.showToast({
			title: '请输入手机号',
			icon: 'none'
		})
		if (!/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(mobile)) return wx.showToast({
			title: '手机号码格式错误',
			icon: 'none'
		})
		if (this.data.type) {
			if (!password) return wx.showToast({
				title: '请输入密码',
				icon: 'none'
			})
		} else {
			if (!code) return wx.showToast({
				title: '请输入验证码',
				icon: 'none'
			})
		}

		const params = {
			mobile,
			password,
			code
		}
		console.log(params);
		const res = await api.login(params)
		if (res.code === 0) {
			const accounts = wx.getStorageSync('accounts') || [];
			const existingAccount = accounts.find(account => account.username === res.data.username);
			if (existingAccount) {
				const index = accounts.findIndex(account => account.username === res.data.username);
				if (index !== -1) {
					accounts[index] = res.data;
					wx.setStorageSync('accounts', accounts);
				}
			} else {
				if (accounts.length >= 6) {
					accounts[5] = res.data;
				} else {
					accounts.push(res.data);
				}
				wx.setStorageSync('accounts', accounts);
			}
			wx.setStorageSync('USERINFO', res.data)

			wx.showToast({
				title: '登录成功',
				icon: 'none'
			})

			let timer = setTimeout(() => {
				wx.switchTab({
					url: '/pages/TabBar/Mall/Mall',
				})
				clearTimeout(timer)
			}, 500)
		} else {
			wx.showToast({
				title: res.msg,
				icon: 'none'
			})
		}
	},

})