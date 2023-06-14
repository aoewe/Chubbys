const api = require('../../../utils/reques').default

Page({

  data: {
    userInfo: '',
    accounts: [],
    isHidden: Number
  },


  onLoad(options) {
    this.getaccounts()
  },

  onReady() {

  },

  onShow() {

  },

  getaccounts() {
    const Info = wx.getStorageSync('USERINFO')
    const account = wx.getStorageSync('accounts') || []
    const exis = account.find(account => account.username === Info.username);
    const index = account.indexOf(exis); 


    this.setData({
      isHidden:index,
      userInfo: Info,
      accounts: account
    })
  },

  changing(e) {
    const {
      id,
      index
    } = e.currentTarget.dataset

    const accounts = wx.getStorageSync('accounts') || [];
    const existingAccount = accounts.find(account => account.username === id.username);
    if (existingAccount) {
    } else {
      // accounts.push(res.data);
      // wx.setStorageSync('accounts', accounts);
    }
    wx.setStorageSync('USERINFO', id)

    wx.showLoading({
      title: '加载中',
    })
    
    
    setTimeout(function () {
      wx.hideLoading()
      wx.reLaunch({
        url: '/pages/TabBar/user/user',
      })
      wx.showToast({
        title: '账号切换成功',
        icon: 'none'
      })
    }, 1000)
    this.getaccounts()

    this.setData({
      isHidden: index
    })
  }
})