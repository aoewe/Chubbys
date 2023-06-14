const fetch = require("../../../utils/reques").default
const {cityJosn} = require('../../../utils/citys')
Page({
  data: {
    cityJosn:[],
    linkedFlag:false,
    params: {
      id: '',
      city: '',
      province: '', //省code
      district: '', //区code
      address: '', //详细地址
      sort: '', //是否为默认地址，默认0不是
      title: '', //地址名称
      name: '', //收件人姓名
      mobile: '', //收件人电话
      door_num: '', //门牌号
    },
    poi: {
      lat: '',
      lng: ''
    },
    markers: {
      id: 0,
      latitude: '',
      longitude: '',
      iconPath: '/static/imgs/amdw.png',
      width: 20,
      height: 30,
    },
  },
  //点击打开联动
  clickOpenLinked() {
    this.setData({
      linkedFlag: true
    });
  },
  close(){
    this.setData({
      linkedFlag: false
    });
  },
  onLinkedConfirm(e) {
    const {linkedInfo} = e.detail
    this.setData({
      "params.province":linkedInfo[0].node.value,
      "params.city":linkedInfo[1].node.value,
      "params.district":linkedInfo[2].node.value,
      "params.address":linkedInfo[0].label+' '+linkedInfo[1].label+' '+linkedInfo[2].label,
    })
  },
  async submit() {
    let data = this.data.params
    if (!data.city) {
      wx.showToast({
        title: '请选择收货地址',
        icon: 'none'
      })
      return
    }
    if (!data.name) {
      wx.showToast({
        title: '收货人不能为空',
        icon: 'none'
      })
      return
    }
    if (!data.mobile) {
      wx.showToast({
        title: '收货人手机号不能为空',
        icon: 'none'
      })
      return
    }
    if (!/^((\(\d{2,3}\))|(\d{3}\-))?1(3|5|8|9)\d{9}$/.test(data.mobile)) {
      wx.showToast({
        title: '手机格式错误',
        icon: 'none'
      })
      return
    }
    const {
      code
    } = await fetch.editUserAddress(data)
    if (code === 0) {
      var pages = getCurrentPages()
      var previousPage = pages[pages.length - 2]
      previousPage.getUserAddress()
      wx.navigateBack()
    } else {
      wx.showToast({
        title: data.msg,
        icon: 'none'
      })
    }
  },
  changeName(e) {
    this.setData({
      ['params.name']: e.detail.value
    })
  },
  changeMobile(e) {
    this.setData({
      ['params.mobile']: e.detail.value
    })
  },
  changeDoornum(e) {
    this.setData({
      ['params.door_num']: e.detail.value
    })
  },
  // 是否默认地址
  checked(e) {
    this.setData({
      ['params.sort']: 1 ? 0 : 1
    })
    if (e.detail == true) {
      this.setData({
        ['params.sort']: 1
      })
    } else {
      this.setData({
        sort: 0
      })
    }
  },
  onLoad: function (options) {
    let that = this
    let params = {}
    options.params && (params = JSON.parse(options.params))
    that.setData({
      params,cityJosn:cityJosn
    })
  }
})