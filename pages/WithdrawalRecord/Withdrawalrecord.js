const api = require('../../utils/reques').default
Page({
  data: {
    list:[],
    loading:true,
    page:1,
    size:10,
    total:0
  },
  async getWithdrawalList(){
    const {page,size} = this.data
    const {code,data} = await api.getWithdrawalList({page,size})
    if(code===0){
      this.data.list.push(...data.list)
      this.setData({
        list:this.data.list,
        page:++this.data.page,
        total:data.total,
        loading:false
      })
    }
  },
 
  onLoad(options) {
    this.getWithdrawalList()
  },
  onReachBottom() {
    if (this.data.list.length === this.data.total) return
    this.setData({
      loading: true
    })
    this.getStreamList()
  }
})