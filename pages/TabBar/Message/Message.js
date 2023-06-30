const fetch = require("../../../utils/reques").default;

Page({

	data: {
		system_capital:'',
		system_new:'',
		system_order:''
	},

	onLoad(options) {},
	onShow() {
		this.getNewsTypeList()

	},
	async getNewsTypeList() {
		const {
			code,
			data
		} = await fetch.getNewsTypeList()
		if (code === 0) {
			const {
				system_capital,
				system_new,
				system_order
			} = data
			this.setData({
				system_capital: system_capital,
				system_new: system_new,
				system_order: system_order
			})
		}
	}
})