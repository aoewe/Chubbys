const fetch = require("../../../utils/reques").default;
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
		duration: 500
	},

	onLoad(options) {

	},

  onShow() {
		this.index()
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
				bgColor:list,
				banner:banner,
        showProduct: path,
        commodity: list,
        loading:false
      })
    }
  },

  GoProductList(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/Product/list/list?id=' + id,
    })
  },

	bindchange(e) {
    this.setData({
      swiperIndex: e.detail.current,
      page:1,
      total:0,
      cardInfo:[],
      cardLoading: true
    })
  },
})