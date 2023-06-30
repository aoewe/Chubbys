const api = require("../../../utils/reques").default
const app = getApp()
var timer = null
var time = 60
Page({
	data: {
		code: '',
		time: 60,
		Password: '',
		Passwords: '',
		option: [{
				text: '登录密码',
				value: 0
			},
			{
				text: '支付密码',
				value: 2
			},
		],
		value: 0,
		type: 0,
		text: '发送验证码',
	},
	onLoad: function (options) {

	},
	// 发送验证码
	async sendCode() {
		if (timer) return
		const that = this
		const params = {
			mobile: wx.getStorageSync('USERINFO').mobile,
			type: this.data.value,
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
							text: '发送'
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


	onSwitch1Change({
		detail
	}) {
		if (detail === 0) {
			this.setData({
				value: detail,
				type: 0
			})
		}
		if (detail === 2) {
			this.setData({
				value: detail,
				type: 1
			})
		}
	},

	async submit() {
		let {
			Password,
			Passwords,
			code
		} = this.data
		console.log(code, Passwords);
		if (!Password || !Passwords) {
			wx.showToast({
				title: '请输入新密码',
				icon: 'none'
			})
		} else if (Password !== Passwords) {
			wx.showToast({
				title: '两次输入的密码不一致',
				icon: 'none'
			})
		} else if (!code) {
			wx.showToast({
				title: '验证码不能为空',
				icon: 'none'
			})
		} else {
			let data = {
				code: this.data.code,
				mobile: wx.getStorageSync('USERINFO').mobile,
				type: this.data.type,
				new: Password,
				confirm: Passwords,
				username: wx.getStorageSync('USERINFO').username
			}
			console.log(data);
			const {
				code,
				msg
			} = await api.resetUserPassword(data)
			if (code === 0) {
				wx.showToast({
					title: '修改成功',
				})
				setTimeout(() => {
					wx.navigateBack()
				}, 500)
			} else {
				wx.showToast({
					title: msg || '验证码错误',
					icon: 'none'
				})
			}
		}
	},

})