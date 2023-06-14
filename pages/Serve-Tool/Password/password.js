const api = require('../../../utils/reques').default
var timer = null
var time = 60
Page({
  data: {
    statusBar: wx.getMenuButtonBoundingClientRect(),
    type:'0',
    username:'',
    mobile: '',
    code: '',
    confirm: '',
    new:'',
    text: '发送验证码'
  },
  back() {
    wx.navigateBack()
  },
  showPaw() {
    this.setData({
      show: !this.data.show
    })
  },
  // 发送验证码
  async sendCode() {
    if (timer) return
    let that = this
    if (!/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(this.data.mobile)) return wx.showToast({
      title: '手机号码格式错误',
      icon: 'none'
    })
    const params = {
      mobile: this.data.mobile,
      type: 1
    }
    const {
      code
    } = await api.sendcode(params)
    if (code === 0) {
      wx.showToast({
        title: '发送成功',
        icon: 'none'
      })
      fun()

      function fun() {
        clearTimeout(timer)
        timer = setTimeout(() => {
          time--
          that.setData({
            text: `${time}s后重新获取`
          })
          if (time <= 0) {
            clearTimeout(timer)
            timer = null
            time = 10
            that.setData({
              text: '发送验证码'
            })
            return
          }
          fun()
        }, 1000)
      }
    }
  },
  async submit() {
    const {
      username,
      code,
      confirm,
      mobile
    } = this.data
    if (!username) return wx.showToast({
      title: '请输入用户名',
      icon: 'none'
    })
    if (!/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(mobile)) return wx.showToast({
      title: '手机号码格式错误',
      icon: 'none'
    })
    if (!code) return wx.showToast({
      title: '请输入验证码',
      icon: 'none'
    })
    if (!confirm) return wx.showToast({
      title: '请输入密码',
      icon: 'none'
    })
    const params = {
      type: 0,
      username,
      mobile,
      code,
      new: confirm,
      confirm
    }
    const res = await api.resetUserPassword(params)
    if (res.code === 0) {
      wx.showToast({
        title: '修改成功',
        icon: 'none'
      })
      let timer = setTimeout(() => {
        wx.redirectTo({
          url: '/pages/Login/login',
        })
        clearTimeout(timer)
      }, 500)
    }
  },
  onUnload() {
    clearTimeout(timer)
    time = 60
    timer = null
  }
})