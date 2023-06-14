const api = require('../../../utils/reques').default

Page({
  data: {
    id: '',
    name: '',
    id_card: '',
    bank_card: '',
    bank_name: ''
  },

  onLoad(options) {
    let info = {}
    options.info && (info = JSON.parse(options.info))
    if (info.id) {
      this.setData({
        id: info.id,
        name: info.name,
        id_card: info.id_card,
        bank_card: info.bank_card,
        bank_name: info.bank_name
      })
    }
  },

  async submit() {
    const {
      id,
      name,
      id_card,
      bank_card,
      bank_name
    } = this.data

    if (!name) return wx.showToast({
      title: '请输入用户名',
      icon: 'none'
    })
    if (bank_card.length < 16) return wx.showToast({
      title: '请输入正确的卡号',
      icon: 'none'
    })
    if (!bank_name) return wx.showToast({
      title: '请输入用银行卡名称',
      icon: 'none'
    })
    if (id_card.length !== 18) return wx.showToast({
      title: '请输入18数身份证',
      icon: 'none'
    })
    const params = {
      name: name,
      id_card: id_card,
      bank_card: bank_card,
      bank_name: bank_name
    }
    if (id) params.id = id
    const {
      code
    } = await api.editBackCard(params)
    if (code === 0) {
      wx.showToast({
        title: params.id ? '修改成功' : '添加成功',
        icon: 'none',
      })
      let timer = setTimeout(() => {
        wx.navigateBack()
        clearTimeout(timer)
      }, 500)
    }
  }
})