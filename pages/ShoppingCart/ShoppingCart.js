const fetch = require("../../utils/reques").default;
Page({

	data: {
		statusBar: wx.getMenuButtonBoundingClientRect(),
		loading: true,
		cartData: {},
		integralTotal: 0,
		priceTotal: 0,
		checkNum: 0,
		shoppingnumber: 0,
		openSku: false,
		id: '',
		cartid: '',
		isDel: false,
		triggered: false,
		height: 0,
		isAll: false
	},

	onLoad() {

		this.setData({
			height: wx.getSystemInfoSync().windowHeight - (wx.getMenuButtonBoundingClientRect().top + wx.getMenuButtonBoundingClientRect().height + 66)
		})
	},
	onShow() {
		this.init()
	},

	onRefresh() {
		this.getShoppingList()
	},
	async getShoppingList() {
		const {
			code,
			data
		} = await fetch.getShoppingList()
		if (code === 0) {
			const num = []
			data.normal.forEach((i) => {
				i.list.forEach((e) => {
					num.push(e)
				})
			})
			const snum = num.length
			wx.setNavigationBarTitle({
				title: '购物车(' + snum + ')',
			})
			data.normal.forEach((i) => {
				i.checked = false
			})
			console.log(data);
			this.setData({
				cartData: data,
				loading: false,
				triggered: false,
				shoppingnumber: snum
			})

		}
	},
	toDetail(e) {
		wx.navigateTo({
			url: '../mallPage/producrDetails/producrDetails?id=' + e.currentTarget.dataset.id
		})
	},
	// 数量 + or -
	changeNum(e, currentTarget) {
		const index = e.currentTarget.dataset.index
		const index2 = e.currentTarget.dataset.innerIndex
		console.log(index);
		const value = e.detail
		let item = "cartData.normal[" + index + "].list[" + index2 + "].number"
		this.setData({
			[item]: value
		})
		this.handelCount()
	},
	//选中一个
	onlychangeCheck(e) {
		const {
			normal
		} = this.data.cartData
		const index = e.currentTarget.dataset.index
		const index2 = e.currentTarget.dataset.innerIndex
		normal[index].list[index2].checked = e.detail
		console.log(this.data.cartData);
		this.setData({
			cartData: this.data.cartData,
			checkNum: normal.length
		})
		this.handelCount()
	},
	// 选中
	changeCheck(e, currentTarget) {
		const {
			normal
		} = this.data.cartData
		const index = e.currentTarget.dataset.index
		
		normal[index].checked = e.detail
		this.setData({
			cartData: this.data.cartData
		})
		this.handelCount()
	},
	// 全选
	checkAll(e) {
		console.log(e.detail);
		this.data.cartData.normal.forEach((i) => {
			i.checked = e.detail
		})
		this.setData({
			cartData: this.data.cartData
		})
		this.handelCount()
	},
	// 合计
	handelCount() {
		const {
			normal
		} = this.data.cartData
		let integralTotal = 0
		let priceTotal = 0
		let checkNum = 1
		normal.forEach((i) => {
			i.list.forEach((e) => {
				if (e.checked) {
					priceTotal += (e.price * 1) * (e.number || 1)
				}
			})
			if (i.checked) {
				console.log(i);
				checkNum = i.list.length
				i.list.forEach((e) => {
					priceTotal += (e.price * 1) * (e.number || 1)
				})
			} else {
				checkNum--
			}
		})
		this.setData({
			integralTotal: parseFloat(integralTotal.toFixed(2)),
			priceTotal: parseFloat(priceTotal.toFixed(2)),
			checkNum,
			isAll: checkNum
		})
	},
	// 刷新
	onPullDownRefresh() {
		setTimeout(() => {
			this.setData({
				'baseRefresh.value': false
			});
		}, 500);
	},
	// 更换sku
	chechAttr(e) {
		const {
			id,
			cartid
		} = e.currentTarget.dataset
		this.setData({
			id,
			cartid,
			openSku: true
		})
	},
	async checkSku(e) {
		const {
			product_id,
			goods_code,
			number
		} = e.detail
		const params = {
			id: this.data.cartid,
			product_id,
			goods_code,
			number
		}
		const {
			code
		} = await fetch.editShoppingSku(params)
		if (code === 0) this.getShoppingList()
	},
	// 结算
	submit() {
		const {
			normal
		} = this.data.cartData
		let PRODUCT = normal.filter((i) => i.checked)
		console.log(PRODUCT);
		if (PRODUCT.length) {
			wx.setStorageSync('commodityList', '')
			wx.setStorageSync('PRODUCT', PRODUCT)
			wx.navigateTo({
				url: '../placeOrder/placeOrder'
			})
		}
		if (!PRODUCT.length) {
			normal.forEach((e) => {
				console.log('1111', e.list);
				let PRODUCT = e.list.filter((i) => i.checked)
				if (PRODUCT.length) {
					wx.setStorageSync('PRODUCT', PRODUCT)
					wx.navigateTo({
						url: '../placeOrder/placeOrder'
					})
				}
			})
		}
		// else {
		// 	wx.showToast({
		// 		title: '请选择商品',
		// 		icon: 'none'
		// 	})
		// }
	},
	// 单删除
	onDelete(e) {
		let that = this
		const {
			instance
		} = e.detail;
		const ids = e.target.dataset.id
		const index = e.target.dataset.index
		console.log(e);
		const type = e.target.dataset.type
		const {
			invalid,
			normal
		} = that.data.cartData
		wx.showModal({
			title: '提示',
			content: '是否删除该商品',
			success: async res => {
				if (res.confirm) {
					wx.showLoading({
						title: '加载中...'
					})
					const {
						code
					} = await fetch.DeleteShoppingCar({
						ids
					})
					if (code === 0) {
						if (type === '1') {
							normal.splice(index, 1)
							instance.close()
						} else {
							invalid.splice(index, 1)
						}
						that.setData({
							cartData: this.data.cartData
						})
						wx.showToast({
							title: '删除成功',
							icon: 'none'
						})
						that.getShoppingList()
						that.handelCount()
						return
					}
				}
			}
		})

	},
	// 选择删除
	async delAll() {
		let that = this
		const {
			normal
		} = this.data.cartData
		let ids = []
		normal.forEach((i) => {
			if (i.checked) ids.push(i.id)
		})
		ids = ids.join(',')
		wx.showModal({
			title: '提示',
			content: '是否删除所选商品',
			success: async res => {
				if (res.confirm) {
					const {
						code
					} = await fetch.DeleteShoppingCar({
						ids
					})
					if (code === 0) {
						wx.showLoading({
							title: '加载中...'
						})
						that.getShoppingList().then(() => {
							wx.showToast({
								title: '删除成功',
								icon: 'none'
							})
						})
					}
				}
			}
		})
	},
	selDel() {
		this.setData({
			isDel: !this.data.isDel
		})
	},
	init() {
		this.setData({
			loading: true,
			integralTotal: 0,
			priceTotal: 0,
			checkNum: 0,
			openSku: false,
			id: '',
			cartid: '',
			isDel: false,
			isAll: false
		})
		this.getShoppingList()
	},
})