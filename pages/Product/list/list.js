const api = require('../../../utils/reques').default
Page({
	data: {
		merchant_avatar: '',
		merchant_name: '',
		merchant_id: null,
		products: [],
		total: 0,
		loading: true,
		colse:null,
		tabs: [{
      name: null,
      title: '全部'
    }, {
      name: 1,
      title: '普通'
    }, {
      name: 2,
      title: '热销'
    }, {
      name: 3,
      title: '兑奖'
    }, {
      name: 4,
      title: '新人'
    }],
	},
	async Getlist() {
		const merchant_id = this.data.merchant_id
		const product_type = this.data.product_type
		console.log(product_type);
		const params = {
			merchant_id,
			product_type
		}
		const {
			code,
			data
		} = await api.getProductList(params)
		if (code === 0) {
			// this.data.products.push(...data.list)
			this.setData({
				products: data.list,
				total: data.total,
				page: ++this.data.page,
				loading: false
			})
		}
	},
	onChange(e) {
    this.setData({
      product_type:e.detail.name,
    })
    this.Getlist()
  },
	onLoad(options) {
		const type = options.id
		console.log(type);
		
		this.setData({
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