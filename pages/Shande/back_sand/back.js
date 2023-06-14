// pages/back/back.js
import { APP_ID, SUB_APP_ID, APPID, SHNAME, VERSION, METHOD, PRODUCTID, ACCESSTYPE, CHANNELTYPE, NOTIFYURL, FRONTURL, CLIENTIP, CLEARCYCLE, PAYMODE, PRIVATEKEY, PUBLICKEY, USE_PRIVATEKEY } from '../../../config_sand';
Page({

  /**
   * 页面的初始数据
   */
  data: {
     id:"",
     msg:"",
     shname:SHNAME
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({  id: options.id });
    if (options.id == 1){
      that.setData({ msg: '0000' });
    }else{
      that.setData({ msg: '9999' });
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
    // wx.hideHomeButton()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  goIndex: function () {
    wx.redirectTo({
      url: '/pages/index/index'
    })
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