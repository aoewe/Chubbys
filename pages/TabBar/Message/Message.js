const fetch = require("../../../utils/reques").default;

Page({

	data: {

	},

	onLoad(options) {},
	onShow() {
		this.getNewsList()

	},
	async getNewsList() {
		const {
			code,
			data
		} = await fetch.getNewsList()
	}
})