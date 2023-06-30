const api = require('../../../utils/reques').default
Page({
	data: {
		merchant_avatar: '',
		merchant_name: '',
		merchant_id: null,
		products: [],
		total: 0,
		loading: true,
		colse: null,
		tabs: [{
			name: 1,
			title: '全部',
		}, {
			name: 1,
			title: '普通',
		}, {
			name: 2,
			title: '热销',
		}, {
			name: 3,
			title: '兑奖',
		}, {
			name: 4,
			title: '新人',
		}],
		no: '',
		newp: '',
	},
	async Getlist() {
		const merchant_id = this.data.merchant_id
		const product_type = this.data.product_type
		const params = {
			merchant_id,
			product_type
		}
		const {
			code,
			data
		} = await api.getProductList(params)
		if (code === 0) {
			// const userInfo = wx.getStorageSync('USERINFO');
			// if (userInfo.mobile === '13143357862') {
			// 	let comm = data.list
			// 	comm.splice(0, 1)
			// 	data.list = comm
			// }
			this.data.products.push(...data.list)
			this.setData({
				products: data.list,
				total: data.total,
				page: ++this.data.page,
				loading: false
			})
		}
	},
	onChange(e) {
		console.log(e);
		let no = 0
		let newp = 1
		if (e.detail.name === 1) {
			no = 0;
			newp = 1;
		}
		if (e.detail.name === 2) {
			no = 1;
			newp = 1;
		}
		if (e.detail.name === 3) {
			no = 2;
			newp = 1;
		}
		if (e.detail.name === 4) {
			no = 1;
			newp = 0;
		}
		this.setData({
			product_type: e.detail.name,
			no: no,
			newp: newp,
		})
		this.Getlist()
	},
	onLoad(options) {
		const type = options.id
		this.setData({
			product_type: 1,
			no: 0,
			newp: 1,
			merchant_avatar: options.avatar,
			merchant_name: options.mername,
			merchant_id: type || null,
			colse: options.colse
		})
		this.Getlist()
	},
	// onReachBottom() {
	// 	if (this.data.products.length === this.data.total) return
	// 	this.setData({
	// 		loading: true
	// 	})
	// 	this.Getlist()
	// }
})