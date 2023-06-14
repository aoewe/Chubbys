const fetch = require("../../../utils/reques").default
import QRCode from '../../../utils/weapp.qrcode.js'

Page({
	data: {
		qrcodePath:'',
		orderInfo: {},
		id: '' //当前订单id
	},


	async getOrderInfo(id) {
		const {
			code,
			data
		} = await fetch.getWinOrderInfo({
			id
		})
		if (code === 0) {
			let orderInfo = data
			this.setData({
				orderInfo
			})
				this.qrCode()
		}
	},

	qrCode() {
    const {
      uuid
		} = wx.getStorageSync('USERINFO')

		const id = this.data.orderInfo.id
		console.log(id);

    const params = `http://cms.btzni.com/register?id=${uuid}&oid=${id}`;
    const imgData = QRCode.drawImg(params, {
      typeNumber: 4, // 密度
      errorCorrectLevel: 'L', // 纠错等级
      size: 800, // 白色边框
    })
    this.setData({
      qrcodePath: imgData
    })
  },


	onLoad: function (options) {
    this.setData({
      info: wx.getStorageSync('USERINFO')
    })
		this.getOrderInfo(options.id)
		

	},
})