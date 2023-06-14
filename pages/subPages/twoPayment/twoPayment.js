const fetch = require("../../../utils/reques").default
const app = getApp()
Page({

  data: {
    bottom: wx.getStorageSync('bottom'),
    paymentMethod: 1,
    showPassword: false,
    info: {},
    type: 0,
    time: ''
  },
  toUpPassword() {
    wx.navigateTo({
      url: '../../Serve-Tool/upPayPaw/upPayPaw',
    })
  },
  // 订单剩余时间
  startTime() {
    let nowtime = Date.parse(new Date())
    let time = this.data.info.order_invalid_time * 1000
    if (nowtime > time) {
      this.setData({
        time: '00:00'
      })
    } else {
      let num = (time - nowtime) / 1000
      var timer = setInterval(() => {
        num--
        let mm = parseInt(num / 60)
        let ss = num % 60
        if (mm < 10) {
          mm = '0' + mm
        }
        if (ss < 10) {
          ss = '0' + ss
        }
        let str = mm + ':' + ss
        this.setData({
          time: str
        })
        if (num < 0) {
          this.setData({
            time: '00:00'
          })
          clearInterval(timer)
        }
      }, 1000)
    }
  },
  selectPay(e) {
    let paymentMethod = e.target.dataset.index
    this.setData({
      paymentMethod
    })
  },
  pay() {
    this.setData({
      showPassword: true
    })
  },
  closePay() {
    this.setData({
      showPassword: false
    })
  },
  // 钱包支付输完回调
  async payOrderNext(e) {
    let data = {
      ids: this.data.info.id,
      order_sn: this.data.info.order_sn,
      pay_type: this.data.paymentMethod,
      password: e.detail
		}
		console.log(data);
    const res = await fetch.payOrder(data)
    if (res.code == 0) {
      wx.showToast({
        title: '支付成功',
      })
      let timer = setTimeout(() => {
        var pages = getCurrentPages()
        var previousPage = pages[pages.length - 2]
        previousPage.setData({
          order_status:'',
          loading:true,
          list:[],
          page:1
        })
        previousPage.getOrderList()
        wx.navigateBack()
        clearTimeout(timer)
      }, 500)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.info) {
			let info = options.info
			console.log(info);
			
      info = JSON.parse(info)
      this.setData({
        info,
        type: options.type
      })
      this.startTime()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})