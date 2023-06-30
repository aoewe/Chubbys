const fetch = require("../../../utils/reques").default;
const app = getApp()
Page({
	data: {
		time: 30 * 60 * 60 * 1000,
		timeData: {},
		statusBar: wx.getMenuButtonBoundingClientRect(),
		showSpecifications: false,
		re:false,
		id: '', //当前产品id
		activity_id:'',//活动场次ID
		isParameter: false,
		comments: [], //评论
		detailData: {}, //产品数据
		skuList: [], //规格列表
		skuData: null, //选中规格后的数据
		keys: [], //去重后的规格
		selValue: [], //选中规格的标亮项
		swiperNum: null, //轮播数字
		selectNum: 1, //选中数量
		address: '', //配送默认地址
		showtype: true, //加入购物车 或购买
		product_id: '',
		goods_code: '',
		showShopping: 1,
		newp: 1,
	},
	goDetails() {
		wx.pageScrollTo({
			scrollTop: 640
		})
	},
	goTop() {
		wx.pageScrollTo({
			scrollTop: 0
		})
	},
	// 图片放大
	preview(e) {
		wx.previewImage({
			urls: e.currentTarget.dataset.imgarr,
			current: e.currentTarget.dataset.img
		})
	},

	onChange(e) {
		this.setData({
			timeData: e.detail,
		});
	},

	handelBack() {
		wx.navigateBack()
	},
	swiperChange(e) {
		if (e.detail.current !== 0) {
			let videoCtx = wx.createVideoContext('video')
			videoCtx.pause()
		}
		this.setData({
			swiperNum: e.detail.current + 1
		})
	},
	//修改选中数量
	changeNum(value) {
		this.setData({
			selectNum: value.detail
		})
	},
	//提交订单
	toOrder() {
		wx.removeStorageSync('commodityList')
		let obj = this.data.detailData
		obj.sku = this.data.skuData
		obj.selectNum = this.data.selectNum
		let commodityList = []
		commodityList.push(obj)
		wx.setStorageSync('PRODUCT', '')
		wx.setStorageSync('commodityList', commodityList)
		this.setData({
			showSpecifications: false
		})
		let address = this.data.address
		address = JSON.stringify(address)
		wx.navigateTo({
			url: '../../placeOrder/placeOrder?address=' + address + '&newp=' + this.data.newp + '&showShopping=' + this.data.showShopping,
		})
	},
	handelClose() {
		this.setData({
			showSpecifications: false
		});
	},
	//显示隐藏参数
	opench() {
		if (this.data.detailData.parameter.length > 0) {
			this.setData({
				isParameter: true
			})
		}
	},
	onClose() {
		this.setData({
			isParameter: false
		})
	},
	onClickIcon() {
		wx.navigateTo({
			url: '/pages/Serve-Tool/Service/Service',
		})
	},

	showParameter() {
		this.setData({
			isParameter: true
		})
	},
	//展开选择规格
	goPlaceOrder() {
		this.setData({
			showtype: true,
			showSpecifications: true
		})
	},
	SetCart() {
		this.setData({
			showtype: false,
			showSpecifications: true
		})
	},
	//获取产品详情
	async loadDetail() {
		const {
			code,
			data
		} = await fetch.getProductdetail({
			id: this.data.id
		})
		if (code === 0) {
			this.setData({
				detailData: data
			})
		}
	},
	async getProductdetail() {
		const {
			code,
			data
		} = await fetch.getProductdetails({
			id: this.data.id,
			activity_id: this.data.activity_id
		})
		if (code === 0) {
			this.setData({
				detailData: data
			})
		}
	},
	//获取产品规格
	async getSpecs() {
		const {
			code,
			data
		} = await fetch.getSKU({
			id: this.data.id
		})
		if (code === 0) {
			let selValue = this.data.selValue
			data[0].attr.forEach(i => {
				selValue.push(i.value)
			})
			this.setData({
				skuList: data,
				// 默认选中第一个
				skuData: data[0],
				selValue
			})
			this.getSkuList(data)
		}
	},
	async getSKUs(){
		const {
			code,
			data
		} = await fetch.getSKUs({
			id: this.data.id
		})
		if (code === 0) {
			let selValue = this.data.selValue
			data[0].attr.forEach(i => {
				selValue.push(i.value)
			})
			this.setData({
				skuList: data,
				// 默认选中第一个
				skuData: data[0],
				selValue
			})
			console.log(data);
			this.getSkuList(data)
		}
	},
	// 规格数据
	getSkuList(data) {
		let currentSkuList = data.map(item => item.attr);
		this.transMatrix(currentSkuList)
	},
	// 规格去重用于页面展示
	transMatrix(currentSkuList) {
		let obj = {};
		currentSkuList.forEach(i => {
			i.forEach(item => {
				if (!obj[item['name']]) {
					obj[item['name']] = {
						title: item['name'],
						value_list: {
							[item['value']]: {
								value: item['value']
							}
						}
					}
				} else if (!obj[item['name']].value_list[item['value']]) {
					obj[item['name']].value_list[item['value']] = {
						value: item['value']
					}
				}
			})
		})
		let arr = []
		for (let k in obj) {
			let i = {
				name: obj[k].title,
				list: obj[k].value_list
			}
			arr.push(i)
		}
		this.setData({
			keys: arr
		})
	},
	// 获取点击类型和值拼接成字符串
	changeItem(e) {
		let selValue = this.data.selValue
		let value = e.currentTarget.dataset.value
		let trindex = e.currentTarget.dataset.trindex
		selValue.splice(trindex, 1, value)
		this.setData({
			selValue
		})
		selValue = selValue.toString() + ','
		this.selectAttr(selValue)
	},
	// 通过字符串和每一项attr对比
	selectAttr(str1) {
		this.data.skuList.map(i => {
			let str2 = ''
			i.attr.map(j => {
				str2 += j.value + ','
			})
			if (str1 == str2) {
				this.setData({
					skuData: i
				})
				return
			}
		})
	},
	// 默认配送地址
	async getUserAddress() {
		const {
			code,
			data
		} = await fetch.getUserAddress({
			size: 1
		})
		if (code === 0) {
			this.setData({
				address: data[0]
			})
		}
	},
	toSelAddress() {
		wx.navigateTo({
			url: '/pages/Address/GetAddress/getAddress?good=1',
		})
	},
	onCloseAction() {
		this.setData({
			showSpecifications: false
		})
	},

	goCart() {
		wx.navigateTo({
			url: '/pages/ShoppingCart/ShoppingCart',
		})
	},

	//添加购物车
	async editShoppingCar() {
		let obj = this.data.detailData
		obj.sku = this.data.skuData
		const product = obj.sku.product_id
		const goods = obj.sku.goods_code
		const number = this.data.selectNum
		const params = {
			product_id: product,
			goods_code: goods,
			number
		}
		const {
			code
		} = await fetch.editShoppingCar(params)
		if (code === 0) {
			wx.showToast({
				title: '加入成功',
				icon: 'none'
			})
			this.setData({
				showSpecifications: false
			})
		}
	},
	onshop() {
		const detailData = this.data.detailData
		wx.navigateTo({
			url: '../list/list?id=' + detailData.id + '&avatar=' + detailData.merchant_avatar + '&mername=' + detailData.merchant_name,
		})
	},
	onLoad: function (options) {
		console.log(options);
		this.setData({
			id: options.id,
			activity_id: options.activity_id,
			showShopping: options.no,
			newp: options.newp,
			re: options.re
		})
		if (!options.re) {
			this.getSpecs()
			this.loadDetail()
		} else {
			this.getSKUs()
			this.getProductdetail()
		}
		if (wx.getStorageSync('USERINFO').token) {
			this.getUserAddress()
		}
	},
	onShow() {
		if (this.data.type != wx.getStorageSync('type')) {
			this.setData({
				type: wx.getStorageSync('type')
			})
		}
	},
	onReady: function () {
		wx.getSystemInfo({
			success: (result) => {
				this.setData({
					windowHeight: result.windowHeight
				})
			},
		})
	},

})