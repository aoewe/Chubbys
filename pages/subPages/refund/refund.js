const api = require("../../../utils/reques").default
const apiurl = wx.getStorageSync('apiurl')
Page({
	data: {
		show: false,
		refund: '',
		OrderInfo: '',
		reason: '',
		type: '',
		fileList: [],
		fList: [],
		actions: [{
				name: '仅退款',
				type: 0
			},
			{
				name: '退货退款',
				type: 1,
				subname: '请选择售后类型',
			},
		],
	},
	onLoad() {
		const OrderInfo = wx.getStorageSync('refundOrderInfo')
		this.setData({
			OrderInfo
		})
		if (OrderInfo.order_status === 1) {
			this.setData({
				type: 0
			})
		} else {
			this.setData({
				type: 1
			})
		}
	},

	openaction() {
		this.setData({
			show: true
		})
	},

	onClose() {
		this.setData({
			show: false
		});
	},

	onSelect(event) {
		this.setData({
			refund: event.detail.name,
			type: event.detail.type,
		})
		console.log(event.detail);
	},

	async afterRead(event) {
		const that = this
		const {
			file
		} = event.detail;
		const {
			data
		} = await api.uploadImg(file.url)
		let datas = JSON.parse(data)
		that.data.fileList.push(file);
		that.data.fList.push(datas.data.url)
		if (datas.code === 0) {
			that.setData({
				fileList: that.data.fileList,
				fList: that.data.fList
			})
		}
	},
	deletefile(e) {
		let index = e.detail.index
		this.data.fileList.splice(index, 1);
		this.data.fList.splice(index, 1);
		this.setData({
			fileList: this.data.fileList,
			fList: this.data.fList
		})
	},


	async submit() {
		const params = {
			id: this.data.OrderInfo.id,
			type: this.data.type,
			reason: this.data.reason,
			img: this.data.fList
		}
		const {
			code,
			data,
		} = await api.applyRefund(params)
		if (code === 0) {
			wx.showToast({
				title: '申请成功!',
				icon: 'none',
				duration: 2000
			})
			setTimeout(function () {
				wx.navigateBack({
					delta: 2
				})
			}, 2000)
		}
	}
});