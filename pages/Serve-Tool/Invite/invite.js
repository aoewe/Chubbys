import QRCode from '../../../utils/weapp.qrcode.js'
const fetch = require("../../../utils/reques").default;
Page({
  data: {
    info: {},
    id:'',
    show: false,
    isHidden: true,
    qrcodePath: ''
  },
  onShareAppMessage: function () {
    return {
      title: '邀请好友',
      path: '/pages/Serve-Tool/Invite/invite'
    }
  },
  //分享


  qrCode() {
    const {
      uuid
    } = wx.getStorageSync('USERINFO')
    const params = `http://manage.xf-market.com/register?id=${uuid}`;
    const imgData = QRCode.drawImg(params, {
      typeNumber: 4, // 密度
      errorCorrectLevel: 'L', // 纠错等级
      size: 800, // 白色边框
    })
    this.setData({
      qrcodePath: imgData
    })
  },

  switch() {
    this.setData({
      isHidden: !this.data.isHidden
    })
  },

  onLoad(options) {
    this.qrCode()
    this.setData({
      info: wx.getStorageSync('USERINFO')
    })
  },
  onShow(){
    const id = new Date().getTime().toString().slice(7)
    this.setData({id})
  }
})