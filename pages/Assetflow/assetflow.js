const fetch = require("../../utils/reques").default;

Page({

	data: {
		type:'',
	},

	onLoad(options) {
		const type = options.type
		this.setData({
			type:options.type
		})
		this.GetList(type)
	},
	onShow() {

	},

	async GetList(e) {
		if (e == 1) {
			wx.setNavigationBarTitle({
				title: '钱包明细',
			})
		}
		if (e == 3) {
			wx.setNavigationBarTitle({
				title: '红包明细',
			})
		}
		if (e == 4) {
			wx.setNavigationBarTitle({
				title: '兑奖券明细',
			})
		}
		if (e == 5) {
			wx.setNavigationBarTitle({
				title: '新人券明细',
			})
		}
		if (e == 6) {
			wx.setNavigationBarTitle({
				title: '活跃度明细',
			})
		}
		const param = {
			type: e
		}
		const {
			code,
			data
		} = await fetch.getStreamList(param)
		if(code === 0){
			// for (let i = 0; i < data.list.length; i++) {
			// 	const time = new Date(data.list[i].create_time);
			// 	const newtiem = new Date(time * 1000);
			// 	const year = newtiem.getFullYear();
			// 	const month = newtiem.getMonth() + 1; 
			// 	const day = newtiem.getDate(); 
			// 	const hour = newtiem.getHours(); 
			// 	const minute = newtiem.getMinutes();
			// 	const second = newtiem.getSeconds(); 
			// 	const times = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
			// 	data.list[i].create_time = times;
			// }
			this.setData({
				list: data.list
			})
		}
	},
})