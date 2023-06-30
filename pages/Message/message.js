const fetch = require("../../utils/reques").default;
Page({
	data: {
		list:'',
	},

	onLoad(options) {

		this.getmsg(options.id)
	},

	async	getmsg(e){
		const peams = {
			type:e
		}
		const {
			code,
			data
		} = await fetch.getNewsList(peams)
		if (code === 0) {
			for (let i = 0; i < data.list.length; i++) {
				const time = new Date(data.list[i].create_time);
				const newtiem = new Date(time * 1000);
				const month = newtiem.getMonth() + 1;
				const day = newtiem.getDate();
				const hour = newtiem.getHours();
				const minute = newtiem.getMinutes();
				const times = `${month}月${day}日${hour}:${minute}`;
				data.list[i].create_time = times
			}
			this.setData({
				list: data.list
			})
		}
	}

})