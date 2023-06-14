const http = require('../../../utils/reques').default
Page({
  data: {
    info: [],
    loading: true
  },
  async getExpressInfo(id) {
		const shipping_sn = id
    const { code, data } = await http.getExpressInfo({ shipping_sn })
    if (code === 0 ) {
      data.Traces.reverse()
      this.setData({
        info: data,
        loading: false
      })
    }
  },
  onLoad(options) {
		console.log(options);
    this.getExpressInfo(options.id)
  }
})