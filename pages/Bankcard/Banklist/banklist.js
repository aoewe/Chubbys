const api = require('../../../utils/reques').default

Page({
  data: {
    list: [],
    isSel: false
  },

  onLoad(options) {
    this.setData({
      isSel: options.isSel || false
    })
  },
  toEdit(e) {
    wx.navigateTo({
      url: `../Addbank/Addbank?info=${JSON.stringify(e.currentTarget.dataset.item)}`,
    })
  },
  onBack(e) {
    const bankInfo = JSON.stringify(e.currentTarget.dataset.item)
    var pages = getCurrentPages();
    var previousPage = pages[pages.length - 2]
    previousPage.setData({
      bankInfo
    })
    let timer = setTimeout(() => {
      wx.navigateBack()
      clearTimeout(timer)
    }, 500);
  },
  onShow() {
    this.getBankCardList()
  },

  async getBankCardList() {
    const params = {
      page: 1,
      size: 20,
    }
    const res = await api.getBankCardList(params)
    if (res.code === 0) {
      const {
        list
      } = res.data
      const datas = list
      this.setData({
        list: datas
      })
    }
  }
})