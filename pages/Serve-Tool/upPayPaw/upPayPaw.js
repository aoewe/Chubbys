const fetch = require("../../../utils/reques").default
const app = getApp()
Page({
  data: {
    isblur: false,
    blurNum: 0,
    payPassword: '',
    payPasswordagain: '',
    code: '',
    showCode: false,
    codeList: [],
    time: 60,
    inputFocus0: false,
    inputFocus1: false,
    inputFocus2: false,
    inputFocus3: false,
    inputFocus4: false,
    inputFocus5: false,
    keyboardList: [{
      name: '1'
    }, {
      name: '2'
    }, {
      name: '3'
    }, {
      name: '4'
    }, {
      name: '5'
    }, {
      name: '6'
    }, {
      name: '7'
    }, {
      name: '8'
    }, {
      name: '9'
    }, {
      name: ''
    }, {
      name: '0'
    }, {
      name: 'del'
    }, ]
  },
  onLoad: function (options) {},
  setCode(e) {
    if (!e.detail.value) {
      return
    }
    let inputlist = e.detail.value.split('')
    if (inputlist.length == 1) {
      let arr = this.data.codeList
      arr[e.currentTarget.dataset.num] = e.detail.value
      this.setData({
        codeList: arr
      })
      if (e.currentTarget.dataset.num == 0) {
        this.setData({
          inputFocus0: false,
          inputFocus1: true,
          inputFocus2: false,
          inputFocus3: false,
          inputFocus4: false,
          inputFocus5: false
        })
      } else if (e.currentTarget.dataset.num == 1) {
        this.setData({
          inputFocus0: false,
          inputFocus1: false,
          inputFocus2: true,
          inputFocus3: false,
          inputFocus4: false,
          inputFocus5: false
        })
      } else if (e.currentTarget.dataset.num == 2) {
        this.setData({
          inputFocus0: false,
          inputFocus1: false,
          inputFocus2: false,
          inputFocus3: true,
          inputFocus4: false,
          inputFocus5: false
        })
      } else if (e.currentTarget.dataset.num == 3) {
        this.setData({
          inputFocus0: false,
          inputFocus1: false,
          inputFocus2: false,
          inputFocus3: false,
          inputFocus4: true,
          inputFocus5: false
        })
      } else if (e.currentTarget.dataset.num == 4) {
        this.setData({
          inputFocus0: false,
          inputFocus1: false,
          inputFocus2: false,
          inputFocus3: false,
          inputFocus4: false,
          inputFocus5: true
        })
      } else if (e.currentTarget.dataset.num == 5) {
        this.setData({
          inputFocus0: false,
          inputFocus1: false,
          inputFocus2: false,
          inputFocus3: false,
          inputFocus4: false,
          inputFocus5: false
        })
      }
    } else {

    }
    if (this.data.codeList.length == 6) {
      this.submit()
    }
  },
  delOne() {
    if (this.data.codeList.length > 0) {
      let arr = this.data.codeList.splice(0, this.data.codeList.length - 1)
      this.setData({
        codeList: arr
      })
    }
  },
  addOne(e) {
    if (e.currentTarget.dataset.num != '') {
      let arr = this.data.codeList
      arr.push(e.currentTarget.dataset.num)
      this.setData({
        codeList: arr
      })
    }
    if (this.data.codeList.length == 6) {
      this.submit()
    }
  },
  async submit() {
    let codeStr = this.data.codeList
    let str = codeStr.toString()
    str = str.replace(/,/g, '')
    let data = {
      code: str,
      mobile:wx.getStorageSync('USERINFO').mobile,
      type: 1,
      new: this.data.payPassword,
      confirm: this.data.payPasswordagain,
      username:wx.getStorageSync('USERINFO').username
    }
    const {code,msg} = await fetch.resetUserPassword(data)
      if (code === 0) {
        //发送成功
        wx.showToast({
          title: '修改成功',
        })
        setTimeout(() => {
          wx.navigateBack()
        }, 500)
      } else {
        wx.showToast({
          title: msg,
          icon: 'none'
        })
      }
  },
  changePasswordTwo(e) {
    if (e.detail.value.length > 5) {
      let str = e.detail.value.slice(0, 6)
      this.setData({
        payPasswordagain: str
      })
    }
  },
  changePassword(e) {
    if (e.detail.value.length > 5) {
      let str = e.detail.value.slice(0, 6)
      this.setData({
        payPassword: str
      })
    }
  },
  sendCode() {
    let {
      payPassword,
      payPasswordagain
    } = this.data
    if (!payPassword || !payPasswordagain) {
      wx.showToast({
        title: '请输入新支付密码',
        icon: 'none'
      })
      return
    } else if (payPassword !== payPasswordagain) {
      wx.showToast({
        title: '两次输入的密码不一致',
        icon: 'none'
      })
      return
    }
    this.sendgain()
  },
  async sendgain() {
    const info = wx.getStorageSync('USERINFO')
    const mobile = info.mobile
    let data = {
      mobile,
      type: 1
    }
    const {
      code,
      res
    } = await fetch.sendcode(data)
    if (code === 0) {
      //发送成功
      if (!this.data.showCode) {
        this.setData({
          showCode: true,
          time: 60
        })
      }
      this.startTime()
    } else {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
      this.setData({
        showCode: true,
        time: 60
      })
    }
  },
  startTime() {
    //倒计时
    var timer = setInterval(() => {
      let num = this.data.time
      if (num > 0) {
        num--
        this.setData({
          time: num
        })
      } else {
        clearInterval(timer)
      }
    }, 1000)
  }
})