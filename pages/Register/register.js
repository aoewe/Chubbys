const api = require('../../utils/reques').default
// const des = require('../../utils/code')
var timer = null
var time = 60
const app = getApp()

Page({
  data: {
    array: ['中国大陆', '中国台湾'],
    index: 0,
    phonetype: 1,
    statusBar: wx.getMenuButtonBoundingClientRect(),
    articleInfo: '',
    showAgree: false,
    mobile: '',
    username: '',
    code: '',
    password: '',
    up_uuid: '',
    show: false,
    type: undefined,
    text: '发送验证码',
    Privacy: true
  },
  select() {
    this.setData({
      Privacy: !this.data.Privacy
    })
  },
  bindPickerChange: function (e) {
    let te = e.detail.value
    if (te == 0) {
      this.setData({
        index: e.detail.value,
        phonetype: 1
      })
    } else if (te == 1) {
      this.setData({
        index: e.detail.value,
        phonetype: 2
      })
    }

  },
  async getArticleInfo() {
    const {
      code,
      data
    } = await api.getArticleInfo({
      id: 1
    })
    if (code === 0) {
      return data.content
    }
  },
  scanCode() {
    let that = this
    wx.scanCode({
      success(e) {
        let str = e.result
        let index = str.indexOf('=')
        let code = str.slice(index + 1)
        that.setData({
          up_uuid: code
        })
      }
    })
  },
  // 发送验证码
  async sendCode() {
    if (timer) return
    const that = this
    if (!/^[1][3-8]\d{9}$|^([6|9])\d{7}$|^[0][9]\d{8}$|^[6]([8|6])\d{5}$/.test(this.data.mobile)) return wx.showToast({
      title: '手机号码格式错误',
      icon: 'none'
    })
    const params = {
      mobile: this.data.mobile,
      type: 1,
    }
    const res = await api.sendcode(params)
    const {
      code,
      msg
    } = res
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
            time = 60
            that.setData({
              text: '发送验证码'
            })
            return
          }
          fun()
        }, 1000)
      }
    } else {
      wx.showToast({
        title: msg,
        icon: 'none'
      })
    }
  },
  back() {
    wx.navigateBack()
  },
  async login(params) {
    const param = {
      mobile: params.mobile,
      password: params.password
    }
    const res = await api.login(param)
    if (res.code === 0) {
      // const type = this.data.type
      const accounts = wx.getStorageSync('accounts') || [];
      const existingAccount = accounts.find(account => account.username === res.data.username);
      if (existingAccount) {
        const index = accounts.findIndex(account => account.username === res.data.username);
        if (index !== -1) {
          accounts[index] = res.data;
          wx.setStorageSync('accounts', accounts);
        }
      } else {
        if (accounts.length >= 6) {
          accounts[5] = res.data;
        } else {
          accounts.push(res.data);
        }
        wx.setStorageSync('accounts', accounts);
      }
      wx.setStorageSync('USERINFO', res.data)
      wx.showToast({
        title: '登录成功',
        icon: 'none'
      })
      wx.setStorageSync('type', res.data.type)
      wx.switchTab({
        url: '/pages/TabBar/Mall/Mall',
      })
    }
  },

  //注册
  async register() {
    const {
      code,
      username,
      password,
      up_uuid,
      mobile,
      Privacy
		} = this.data
    if (!Privacy) return wx.showToast({
      title: '请勾选《棒多多隐私保护声明》',
      icon: "none"
    })
    if (!/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(mobile)) return wx.showToast({
      title: '手机号码格式错误',
      icon: 'none'
    })
    if (!code) return wx.showToast({
      title: '请输入验证码',
      icon: 'none'
    })
    if (!password) return wx.showToast({
      title: '请输入密码',
      icon: 'none'
    })
    if (!up_uuid) return wx.showToast({
      title: '请输入推荐人账号',
      icon: 'none'
    })
    if (!username) return wx.showToast({
      title: '请输入用户名',
      icon: 'none'
		})
		if (!username.match(/^[a-zA-Z0-9\u4e00-\u9fa5]+$/)) {
			wx.showToast({
				title: '请输入中文、字母或数字的昵称',
				icon: 'none'
			});
			return;
		}

    const params = {
      code,
      username,
      password,
      up_uuid,
      mobile
		}
    const res = await api.register(params)
    if (res.code === 0) {
      wx.showToast({
        title: '注册成功',
        icon: 'none'
      })
      let timer = setTimeout(() => {
        this.login(params)
        clearTimeout(timer)
      }, 500)
    } else {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
    }
  },
  showPaw() {
    this.setData({
      show: !this.data.show
    })
  },
  onUnload() {
    clearTimeout(timer)
    time = 60
    timer = null
  },
  onClose() {
    this.setData({
      showAgree: false
    })
  },
  openAgree() {
    this.setData({
      showAgree: true
    })
  },
  async onLoad(options) {
    this.setData({
      type: options.type,
      articleInfo: await this.getArticleInfo()
    })
  }
})