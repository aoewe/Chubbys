const fetch = require("../../../utils/reques").default;
const host = `https://app.taishih.com`
Page({
  data: {
    userInfo: {},
    loading: false
  },
  async editUser(avatar){
    await fetch.editUser({avatar})
    await this.getUserInfo()
  },
  upAvatar() {
    const that = this
    wx.chooseImage({
      count: 1,
      success(res) {
        const info = wx.getStorageSync('USERINFO')
        wx.uploadFile({
          filePath: res.tempFilePaths[0],
          name: 'file',
          header: {
            token: info.token,
            uid: info.id
          },
          url: host + '/app/upload/uploadImg',
          formData: {
            path_name: 'appImg/userAvatar'
          },
          success(res){
            that.editUser(JSON.parse(res.data).data)
          }
        })
      }
    })
  },
  changeName(e) {
    this.setData({
      ['userInfo.username']: e.detail.value
    })
  },
  async getUserInfo() {
    const {
      code,
      data
    } = await fetch.getUserInfo()
    if (code === 0) {
      this.setData({
        userInfo: data
      })
    }
  },
  async submit() {
    this.setData({
      loading: true
    })
    let data = {}
    let info = this.data.userInfo
    data.username = info.username
    data.avatar = info.avatar
    const {
      code
    } = await fetch.editUser(data)
    this.setData({
      loading: false
    })
    if (code === 0) {
      wx.showToast({
        title: '修改成功',
        icon: 'none'
      })
      // var pages = getCurrentPages()
      // var previousPage = pages[pages.length - 2]
      // previousPage.getUserInfo()
    }
  },

  onLoad: function (options) {
    this.getUserInfo()
  }
})