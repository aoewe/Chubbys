const fetch = require("../../../utils/reques").default;
const des = require("../../../utils/code")
Page({
  data: {
    list:[],
    page:1,
    total:0,
    loading:true
  },
  async getFansList(){
    const {code,data} = await fetch.getFansList({page:this.data.page,size:10})
    if(code === 0){
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
    this.getFansList()
  },
  onReachBottom(){
    if(this.data.total===this.data.list.length) return
    this.setData({loading:true})
    this.getFansList()
  }
})