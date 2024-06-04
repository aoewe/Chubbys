const api = require('../../../utils/reques').default

// pages/TabBar/user/user.js
Page({
  data: {
    statusBar: wx.getMenuButtonBoundingClientRect(),
    UserInfo: '',
    orderIcon: [{
        img: '/static/icons/FK.png',
        lable: '待付款',
        url: '../../subPages/orderList/orderList?active=1'
      },
      {
        img: '/static/icons/FH.png',
        lable: '待发货',
        url: '../../subPages/orderList/orderList?active=2'
      },
      {
        img: '/static/icons/SH.png',
        lable: '待收货',
        url: '../../subPages/orderList/orderList?active=3'
			},
			{
        img: '/static/icons/TK.png',
        lable: '售后',
        url: '../../subPages/Refundlist/Refundlist'
      },
      {
        img: '/static/icons/QB.png',
        lable: '全部',
        url: '../../subPages/orderList/orderList'
      },
    ],
    contIcon: [
      // {
      //   img: '/static/icons/2.png',
      //   lable: '用户协议',
      //   url: '../../Bankcard/Banklist/banklist'
			// },
			{
        img: '/static/icons/9.png',
        lable: '邀请好友',
        url: '../../Serve-Tool/Invite/invite'
			},
			{
        img: '/static/icons/10.png',
        lable: '银行卡管理',
        url: '../../Bankcard/Banklist/banklist'
			},
			{
        img: '/static/icons/8.png',
        lable: '我的粉丝',
        url: '../../Serve-Tool/FansList/FansList'
			},
			{
        img: '/static/icons/3.png',
        lable: '客服中心',
        url: '../../Serve-Tool/Service/Service'
			},
      {
        img: '/static/icons/4.png',
        lable: '意见反馈',
        url: '/pages/Serve-Tool/Feedback/feedback'
			},
			{
        img: '/static/icons/11.png',
        lable: '付费课程',
        url: '../../Serve-Tool/CourseList/course'
			},
			{
        img: '/static/icons/5.png',
        lable: '设置中心',
        url: '../../Serve-Tool/Set/set'
			},
			{
        img: '/static/icons/5.png',
        lable: '商户入住',
        url: '../../Serve-Tool/Join/Join'
			},
    ],
  },


  onShow() {
    this.getUserInfo()
  },

  async getUserInfo() {
    const res = await api.getUserInfo()
    if (res.code === 0) {
      this.setData({
        UserInfo: res.data
      })
    }
  },

  exituserinfo() {
    wx.navigateTo({
      url: '/pages/Serve-Tool/Headimg/Headimg',
    })
  },
})