const api = require('../../utils/reques').default
Component({
  properties: {
    payPrice: String,
    info:{},
    type:1,
    popupType:0,
    top:0,
    show:{
      type:Boolean,
      value:false,
      observer(){
        this.setData({codeList:[]})
      }
    }
  },
  
  data: {
    buy_number:1,
    takeNotes:{},
    statusBar: wx.getMenuButtonBoundingClientRect(),
    codeList: [],
    bottom: wx.getStorageSync('bottom'),
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
    }, ],
    inputFocus0: false,
    inputFocus1: false,
    inputFocus2: false,
    inputFocus3: false,
    inputFocus4: false,
    inputFocus5: false,
  },
  methods: {
    async readyDealOrder(){
      const {code,data} = await api.readyDealOrder({deal_round_id:this.properties.info.deal_info.id})
      if(code===0){
        this.setData({takeNotes:data})
      }
    },
    closePay() {
      this.triggerEvent('closePay')
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
        if(arr.length===6) return
        arr.push(e.currentTarget.dataset.num)
        this.setData({
          codeList: arr
        })
      }
      if(this.properties.popupType===1) return
      if (this.data.codeList.length == 6) {
        this.triggerEvent('payOrderNext', this.data.codeList.join(''))
        let timer = setTimeout(()=>{
          this.setData({
            codeList:[]
          })
        },500)
        clearTimeout(timer)
      }
    },
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
      }
      if (this.data.codeList.length == 6) {
        this.triggerEvent('payOrderNext', this.data.codeList.join(''))
      }
    },
    onSubmit(){
      const {buy_number} = this.data
      if(buy_number<this.properties.info.deal_info.min_number) return wx.showToast({
        title: '购买数量不能小于最小购买值',
        icon:'none'
      })
      wx.showLoading({title:'购买中'})
      this.triggerEvent('payOrderNext', {paw:this.data.codeList.join('').slice(0,6),buy_number})
      let timer = setTimeout(()=>{
        this.setData({
          codeList:[]
        })
        wx.hideLoading()
      },500)
      clearTimeout(timer)
    },
    onChange(event) {
      const num = (this.properties.info.deal_info.max_number-this.data.takeNotes.buy_sum_number)
      
      this.setData({
        buy_number:event.detail>num?num:event.detail<this.properties.info.deal_info.min_number?this.properties.info.deal_info.min_number:event.detail
      })
    },
  },
  lifetimes: {
    attached: function() {
      if(this.properties.popupType===1){
        this.setData({
          buy_number:this.properties.info.deal_info.min_number
        })
        this.readyDealOrder()
      }
    }
  },
})