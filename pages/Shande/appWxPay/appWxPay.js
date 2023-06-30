const fetch = require("../../../utils/reques").default;
const des = require("../../../utils/code");
const app = getApp()
Page({
  data: {
    isLoading: false,
    isSuccess: false,
    isFail: false,
    isCancel: false,
    timeStamp: '',
    nonceStr: '',
    package: '',
    paySign: '',
    signType: '',
    code: '',
    successDate: '',
    order_sn: '',
    pay_money: '',
    text: '感谢您的购买',
    status: 0, // 0: 已取消(未付)，1：已支付，2：支付失败
  },
  getDateTime() {
    var date = new Date();
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    return Y + '-' + M + '-' + D + '  ' + h + ': ' + m + ': ' + s
  },
  payOrder(id, token, uid, type) {
    wx.setStorageSync('token', token)
    wx.setStorageSync('userId', uid)
    let data = {
      id
    }
    data.pay_type = 2
    fetch.getXcxOpenId(des.encode({
      jsCode: this.data.code
    })).then(res => {
      data.openid = app.globalData.openId
      if (type == 1) {
        fetch.payOrder(des.encode(data)).then(res => {
          if (res.data.code === 0) {
            this.setData({
              timeStamp: res.data.data.pay_param.timeStamp,
              nonceStr: res.data.data.pay_param.nonceStr,
              package: res.data.data.pay_param.package,
              paySign: res.data.data.pay_param.paySign,
              signType: res.data.data.pay_param.signType,
              order_sn: res.data.data.order_info.order_sn,
              pay_money: res.data.data.order_info.payment_money,
              text: '感谢您的预定'
            })
            this.toPayApp()
          }
        })
      } else {
        fetch.getPayOrder(des.encode(data)).then(res => {
          if (res.data.code === 0) {
            this.setData({
              timeStamp: res.data.data.pay_param.timeStamp,
              nonceStr: res.data.data.pay_param.nonceStr,
              package: res.data.data.pay_param.package,
              paySign: res.data.data.pay_param.paySign,
              signType: res.data.data.pay_param.signType,
              order_sn: res.data.data.order_info.order_sn,
              pay_money: res.data.data.order_info.payment_money,
              text: '感谢您的购买'
            })
            this.toPayApp()
          }
        })
      }
    })
  },
  toPayApp() {
    var that = this
    if (!that.data.timeStamp || !that.data.nonceStr || !that.data.package || !that.data.paySign) {
      wx.showToast({
        title: '无效的支付请求，请返回App重试',
        icon: 'none'
      })
      return false
    }
    if (that.data.isLoading) {
      return false
    }
    wx.requestPayment({
      timeStamp: that.data.timeStamp,
      nonceStr: that.data.nonceStr,
      package: that.data.package,
      signType: that.data.signType,
      paySign: that.data.paySign,
      success: function (res) {
        that.setData({
          isLoading: true,
          isSuccess: true,
          status: 1,
          successDate: that.getDateTime()
        })
      },
      fail: function (res) {
        if (res.errMsg === "requestPayment:fail cancel") {
          that.setData({
            isLoading: false,
            isCancel: true,
            status: 0
          })
        } else {
          that.setData({
            isLoading: false,
            isFail: true,
            status: 2
          })
        }
      }
    })
  },
  launchAppError() {
    wx.switchTab({
      url: '../home/home',
    })
  },
  bindlAunchapp() {
    wx.switchTab({
      url: '../home/home',
    })
  },
  onLoad(options) {
    let that = this
    if (options.id && options.token && options.uid && options.type) {
      wx.login({
        success(res) {
          that.setData({
            code: res.code
          })
          that.payOrder(options.id, options.token, options.uid, options.type)
        },
        fail(res) {
          console.log(res)
        }
      })
    } else {
      wx.showToast({
        title: '无效的支付请求，请返回App重试',
        icon: 'none'
      })
		}
		
		
  },
});