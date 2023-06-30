const fetch = require("../../../utils/reques").default;
var timerone = null
var timertow = null
Page({
	data: {
		statusBar: wx.getMenuButtonBoundingClientRect(),
		commodity: {},
		cardInfo: [],
		page: 1,
		size: 10,
		total: 0,
		swiperIndex: 0,
		vertical: false,
		cardLoading: true,
		autoplay: false,
		interval: 2000,
		duration: 500,
		catlisto: [],
		catlistt: [],
		Seckill:'',
		Rushbuy:'',
	},

	onLoad(options) {

	},

	onHide() {
		clearInterval(timerone)
		clearInterval(timertow)
	},

	onUnload(){
		clearInterval(timerone)
		clearInterval(timertow)
	},


	onShow() {
		this.index()
		this.Category()
		this.Seckill()
		this.Rushbuy()
	},
	async index() {
		const {
			code,
			data
		} = await fetch.getProductPattern()
		if (code === 0) {
			const {
				banner,
				list,
				path
			} = data
			this.setData({
				bgColor: list,
				banner: banner,
				showProduct: path,
				commodity: list,
				loading: false
			})
		}
	},

	async Category() {
		const {
			code,
			data
		} = await fetch.getCategory()
		if (code === 0) {
			const middleIndex = Math.ceil(data.length / 2);
			const arr1 = data.slice(0, middleIndex);
			const arr2 = data.slice(middleIndex);
			this.setData({
				catlisto: arr1,
				catlistt: arr2
			})
		}
	},

	async Rushbuy() {
		const {
			code,
			data
		} = await fetch.getActivityProduct({type:2})
		if (code === 0) {
			timerone = setInterval(() => {
				data.forEach((i) => {
					const {
						day,
						hour,
						minute,
						second,

					} = this.countDownFun(i.end_time)
					i.day = day
					i.hour = hour
					i.minute = minute
					i.second = second
					this.setData({
						Rushbuy: data,
					})
				}, 1000)
			})
		}
	},

	async Seckill() {
		const {
			code,
			data
		} = await fetch.getActivityProduct({type:1})
		if (code === 0) {
			timertow = setInterval(() => {
				data.forEach((i) => {
					const {
						day,
						hour,
						minute,
						second,

					} = this.countDownFun(i.end_time)
					i.day = day
					i.hour = hour
					i.minute = minute
					i.second = second
					this.setData({
						Seckill: data,
					})
				}, 1000)
			})
		}
	},

	countDownFun(time,t) {
		time = time * 1000
		let timestamp = new Date().getTime()
		let times = time - timestamp
		let day = 0,
			hour = 0,
			minute = 0,
			second = 0;
		if (times > 0) {
			second = Math.floor(times / 1000); //未来时间距离现在的秒数
			day = Math.floor(second / 86400); //整数部分代表的是天；一天有24*60*60=86400秒 ；
			second = second % 86400; //余数代表剩下的秒数；
			hour = Math.floor(second / 3600); //整数部分代表小时；
			second %= 3600; //余数代表 剩下的秒数；
			minute = Math.floor(second / 60);
			second %= 60;
		}

		return {
			day,
			hour,
			minute,
			second,
		}
	},

	GoProductList(e) {
		var id = e.currentTarget.dataset.id
		wx.navigateTo({
			url: '/pages/Product/list/list?id=' + id,
		})
	},

	GoShoppingCart(){
		wx.navigateTo({
			url: '../../ShoppingCart/ShoppingCart',
		})
	},

	onChange(e) {
    this.setData({
      timeData: e.detail,
    });
  },

	bindchange(e) {
		this.setData({
			swiperIndex: e.detail.current,
			page: 1,
			total: 0,
			cardInfo: [],
			cardLoading: true
		})
	},
})