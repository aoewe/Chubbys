const fetch = require("../../../utils/reques").default;
const host = `https://app.taishih.com`
Page({
  data: {
    userInfo: {},
    loading: false
  },

	async afterRead(event) {
		const that = this
		const {
			file
		} = event.detail;
		const {
			data
		} = await fetch.uploadImg(file.url)
		let datas = JSON.parse(data)
		console.log(datas);
		if (datas.code === 0) {
			that.editUser(datas.data.url[0])
		}
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