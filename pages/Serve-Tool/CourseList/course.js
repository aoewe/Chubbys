const api = require('../../../utils/reques').default

Page({

	data: {

	},

	onLoad(options) {
		this.getcourseList()
	},

	async getcourseList() {

		const {
			code,
			data
		} = await api.getLessonList()
		if (code === 0) {
			// this.data.products.push(...data.list)
			this.setData({
				products: data.list,
				page: ++this.data.page,
				loading: false
			})
		}
	}

})