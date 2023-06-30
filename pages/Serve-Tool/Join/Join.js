const fetch = require("../../../utils/reques").default;
Page({


	data: {
		radio: '1',
		checked: true,
		name: '',
		phone: '',

		straight: [],
		Reverse: [],
		img: [],
	},

	onLoad(options) {

	},
	onRadio(event) {
		this.setData({
			radio: event.detail,
			name:'',
			phone:'',
			img:[],
			straight:[],
		});
	},

	onChange(event) {
		this.setData({
			checked: event.detail,
		});
	},

	async afterstraight(event) {
		const that = this
		const {
			file
		} = event.detail;
		const {
			data
		} = await fetch.uploadImg(file.url)
		let datas = JSON.parse(data)
		that.data.straight.push(file);
		that.data.img.push(datas.data.url[0])
		if (datas.code === 0) {
			that.setData({
				straight: that.data.straight,
				img: that.data.img
			})
		}
	},
	deletestraight(e) {
		let index = e.detail.index
		this.data.straight.splice(index, 1);
		this.data.img.splice(index, 1);
		this.setData({
			straight: this.data.straight,
			img: this.data.img
		})
	},

	async afterRead(event) {
		const that = this
		const {
			file
		} = event.detail;
		const {
			data
		} = await fetch.uploadImg(file.url)
		let datas = JSON.parse(data)
		that.data.Reverse.push(file);
		that.data.img.push(datas.data.url[0])
		if (datas.code === 0) {
			that.setData({
				Reverse: that.data.Reverse,
				img: that.data.img
			})
		}
	},
	deletefile(e) {
		let index = e.detail.index
		this.data.Reverse.splice(index, 1);
		this.data.img.splice(index, 1);
		this.setData({
			Reverse: this.data.Reverse,
			img: this.data.img
		})
	},

	async submit() {
		const {
			name,
			phone,
			radio,
			img,
			checked
		} = this.data
		if(!checked) {
			wx.showToast({
				icon: 'none',
				title: '请同意并遵守商家入驻协议',
			})
		}
		else if (!name) {
			wx.showToast({
				icon: 'none',
				title: '请输入经营者姓名',
			})
		}
		else if (!phone) {
			wx.showToast({
				icon: 'none',
				title: '请输入店铺电话',
			})
		} else {
			const parems = {
				real_name: name,
				mobile: phone,
				type: radio,
				img: img
			}
			console.log(parems);
			const {
				code,
			} = await fetch.applyMerchant(parems)
			if (code === 0) {
				wx.showToast({
					icon: 'none',
					title: '入驻信息提交成功',
				})
				setTimeout(function () {
					wx.navigateBack({
						delta: 1
					})
					}, 2000)
			}
		}
	}
})