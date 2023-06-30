const fetch = require("../../../utils/reques").default;

Page({

	data: {
		content: '',
		fileList: [],
		fList: [],
		show: false,
	},


	onLoad(options) {

	},


	onShow() {

	},


	onClose() {
		this.setData({
			show: false
		});
		wx.switchTab({
			url: '/pages/TabBar/user/user'
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
		that.data.fileList.push(file);
		that.data.fList.push(datas.data.url[0])
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
		if (this.data.textarea == '') {
			wx.showToast({
				title: '反馈内容不能为空',
				icon: 'none',
				duration: 2000
			})
		} else {

			let content = this.data.content;
			let img = this.data.fList
			const {
				code,
				data
			} = await fetch.setUserOpinion({
				content,
				img
			})
			if (code === 0) {
				this.setData({
					show: true
				});
			}
		}

	}

})