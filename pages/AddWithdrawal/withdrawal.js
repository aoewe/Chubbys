const api = require('../../utils/reques').default
Page({

  data: {
    bankInfo: '',
    red_bag: '',
    info: {}
  },
  async readyWithdrawal() {
    const {
      code,
      data
    } = await api.readyWithdrawal()
    if (code === 0) {
      this.setData({
        info: data,
      })
    }
  },
  async withdrawals(surplus_password) {
    const {
      bankInfo,
      red_bag,
      type
    } = this.data
    const params = {
      user_bank_id: bankInfo.id,
      red_bag,
      surplus_password
		}
		console.log('===');
    const {
      code
    } = await api.withdrawal(params)
    if (code === 0) {
      this.setData({
        showPassword: false,
        red_bag: ''
      })
      this.readyWithdrawal()
      wx.showToast({
        title: '提现已提交，请等待审核！',
        icon: 'none'
      })
    }
  },
  payOrderNext(e) {
    this.withdrawals(e.detail)
  },
  changeIntegral(e) {
    const num = parseInt(e.detail.value)
    if (num > this.data.info.red_bag){
      this.setData({
        red_bag: this.data.info.red_bag
      }) 
    } else {
      if (num % 100 === 0) {
        this.setData({
          red_bag: num
        })
      }
    }
  },
  closePay() {
    this.setData({
      showPassword: false
    })
  },
  withdrawal() {
    const {
      bankInfo,
      red_bag
    } = this.data
    if (!red_bag) return wx.showToast({
      title: '请输入提现金额',
      icon: 'none'
    })
    if (red_bag % 100 !== 0) return wx.showToast({
      title: '提现金额需整百',
      icon: 'none'
    })
    if (!bankInfo) return wx.showToast({
      title: '请选择提现卡号',
      icon: 'none'
    })
    this.setData({
      showPassword: true
    })
  },
  onShow() {
    if (this.data.bankInfo) this.setData({
      bankInfo: JSON.parse(this.data.bankInfo)
    })
  },
  onLoad(options) {
    this.readyWithdrawal()
  }
})