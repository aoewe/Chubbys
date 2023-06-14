const api = require('../../../utils/reques').default
Page({

  data: {
    userInfo:{}
  },
  imgError(){
    this.setData({
      'userInfo.avatar':'http://backend.taishih.com/register/static/default.png'
    })
  },
  async getUserInfo() {
    const {
      code,
      data
    } = await api.getUserInfo()
    if (code === 0) {
      this.setData({
        userInfo: data
      })
    }
	},
	exit() {
    wx.removeStorageSync('USERINFO')
    wx.redirectTo({
      url: '/pages/Login/login',
    })
  },
  onShow(options) {
    this.getUserInfo()
  }
})