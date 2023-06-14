const api = require('../../../utils/reques').default

Page({
  data: {
    list: [],
    isGood:false,
    loading:true
  },
  async getUserAddress() {
    const {
      code,
      data
    } = await api.getUserAddress()
    if (code === 0) {
      this.setData({
        list: data,
        loading:false
      })
    }
  },
  //删除地址
  delUserAddress(e) {
    let id = e.currentTarget.dataset.id
    let that = this
    wx.showModal({
      title: '提示',
      content: '是否删除该地址',
      success: async res => {
        if (res.confirm) {
          const {
            code,msg
          } = await api.delUserAddress({id})
          if (code === 0) {
            that.getUserAddress()
          }else{
            wx.showToast({
              title: msg,
              icon: 'none'
            })
          }
        }
      }
    })
  },
  //默认地址
  async defaultAddress(e) {
    let id = e.currentTarget.dataset.id
    const {code,msg} = await api.setDefaultAddress({id})
    if (code === 0) {
      this.getUserAddress()
    } else {
      wx.showToast({
        title: msg,
        icon: 'none'
      })
    }
  },
  //编辑地址
  editAddress(e) {
    let params = e.target.dataset.item || e.currentTarget.dataset.item
    params = JSON.stringify(params)
    wx.navigateTo({
      url: '../Edit/edit?params=' + params,
    })
  },
  selAddress(e) {
    let pages = getCurrentPages()
    let prevPage = pages[pages.length - 2]
    prevPage.setData({
      address: e.currentTarget.dataset.item,
    })
    wx.navigateBack()
  },
  onLoad(options) {
    this.setData({
      isGood:options.good?true:false
    })
    this.getUserAddress()
  }
})