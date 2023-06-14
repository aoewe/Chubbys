const api = require("../../../utils/reques").default

Page({

	data: {
		list:[],
	},

	onLoad(options) {
		this.getOrderList()
	},
	onShow() {

	},

	async getOrderList() {

    const params = {
			is_refund:'',
      size: this.data.size,
      page: this.data.page
		}
    const {
      code,
      data
    } = await api.getOrderList(params)
    if (code === 0) {
			for (let i = 0; i < data.list.length; i++) {
				const time = new Date(data.list[i].create_time);
				const newtiem = new Date(time * 1000);
				const year = newtiem.getFullYear();
				const month = newtiem.getMonth() + 1;
				const day = newtiem.getDate();
				const hour = newtiem.getHours();
				const minute = newtiem.getMinutes();
				const second = newtiem.getSeconds();
				const times = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
				data.list[i].create_time = times
			}
			this.data.list.push(...data.list)
      this.setData({
        list: this.data.list,
        page: ++this.data.page,
        total: data.total,
        loading: false
      })
    }
	},
})