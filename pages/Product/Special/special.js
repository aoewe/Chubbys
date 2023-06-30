const api = require('../../../utils/reques').default
Page({
	data: {
		product_type: '',
		no: '',
		newp: '',
		products: [],
		total: 0,
		loading: true,
		size: 20,
		page: 1
	},
	async Getlist() {
		const e = this.data.product_type
		if (e == 1) {
			wx.setNavigationBarTitle({
				title: '推荐商品',
			})
		}
		if (e == 2) {
			wx.setNavigationBarTitle({
				title: '热销专区',
			})
		}
		if (e == 3) {
			wx.setNavigationBarTitle({
				title: '兑奖专区',
			})
		}
		if (e == 4) {
			wx.setNavigationBarTitle({
				title: '新人专区',
			})
		}
		const {
			product_type,
			page,
			size
		} = this.data
		const params = {
			product_type,
			page,
			size
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
				products: this.data.products,
				total: data.total,
				page: ++this.data.page,
				loading: false
			})
		}
	},
	onLoad(options) {
		this.setData({
				product_type: options.product_type,
				no: options.no,
				newp: options.newp
			}),
			this.Getlist()
	},
	onReachBottom() {
		if (this.data.products.length === this.data.total) return
		this.setData({
			loading: true
		})
		this.Getlist()
	}
})