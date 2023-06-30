const fetch = require("../../utils/reques").default
const app = getApp()
Page({
  data: {
		newp:1,
    order_sn: '',
    order_id: 0,
		address: null, //头部地址
		id_card:'',
		id_card_name:'',
    remark: '', //备注
    commodityList: [], //商品内容
    amount: {}, //商品金额
    piece: 0, //共几件
    payPrice: 0,
    //支付方式
    payModeWX: true,
    payModeQB: false,
    walletBalance: {
      money: 0
    },
    //合计
    total: 0,
    showPassword: false,
    codeList: [],
    userInfo:{},
		payType:1,
		showShopping:'',
  },
  async getUserInfo(){
    const {code,data} = await fetch.getUserInfo()
    if(code===0){
      this.setData({
        userInfo:data
      })
    }
  },
  changePayType(e){
    this.setData({payType:e.target.dataset.type||e.currentTarget.dataset.type})
  },
  // 钱包支付输完回调
  async payOrderNext(e) {
		if(this.data.payType == 6){
    let data = {
			openid:e,
      ids: this.data.order_id,
      order_sn: this.data.order_sn,
			pay_type: this.data.payType,
			pay_system:'mini_program',
		}
		const res = await fetch.payOrder(data)
			const r = res.data.pay_param
			wx.requestPayment({
				appId: r.appId,
				nonceStr: r.nonceStr,
				package: r.package,
				paySign: r.paySign,
				timeStamp: r.timeStamp,
				signType:	r.signType,
				success (res) {
					wx.showToast({
						title: '支付成功',
					})
					let timer = setTimeout(()=>{
						wx.redirectTo({
							url: `../subPages/orderDetails/orderDetails?id=${this.data.order_id}&isRefresh=true`,
						})
						clearTimeout(timer)
					},500)
				},
			})
		} else {
			let data = {
				ids: this.data.order_id,
				order_sn: this.data.order_sn,
				pay_type: this.data.payType,
				password: e.detail,
			}
			console.log(data);
			const res = await fetch.payOrder(data)
			if (res.code === 0) {
				this.setData({
					showPassword:false
				})
				wx.showToast({
					title: '支付成功',
				})
				if(this.data.newp == 0){
					wx.redirectTo({
						url: `../Serve-Tool/Newborn/Newborn?id=${this.data.order_id}`,
					})
				} else {
					let timer = setTimeout(()=>{
						wx.redirectTo({
							url: `../subPages/orderDetails/orderDetails?id=${this.data.order_id}&isRefresh=true`,
						})
						clearTimeout(timer)
					},500)
				}
			} else {
				wx.showToast({
					title: res.msg,
					icon: 'none',
					duration: 2000
				})
				setTimeout(function(){
					wx.navigateTo({
					url: '../subPages/orderList/orderList',
					})
					}, 2000);
			}
		}
  },

  closePay() {
    this.setData({
      showPassword: false,
      codeList: []
    })
	},
	wxmlogin() {
		wx.login({
			success: async (res) => {
				const jsCode = res.code
				const params = {
					jsCode
				}
				const id = await fetch.wxm_login(params)

				this.payOrderNext(id.data.openid)
			},
		})
	},
  // 提交订单
  async submit(e) {
    if (!this.data.address) {
      wx.navigateTo({
        url: '../Address/GetAddress/getAddress',
      })
      return
    }
    let list = []
    this.data.commodityList.forEach(el => {
      let item = {
        goods_code: el.sku.goods_code,
        buy_cnt: el.selectNum,
        room_coupons: el.sku.room_coupons,
        price: el.sku.price
      }
      list.push(item)
    })
    let data = {
      user_address_id: this.data.address.id,
      product: list,
			id_card_name:this.data.id_card_name,
			id_card:this.data.id_card,
      remarks: this.data.remark
		}
    const res = await fetch.getAddOrder(data)
    if (res.code === 0) {
      this.setData({
        payPrice: res.data.list[0].order_money,
        order_id: res.data.list[0].id,
        order_sn: res.data.list[0].order_sn,
        paytype:e.target.dataset.type
			})
			if(this.data.payType == 6){
				this.wxmlogin()
			} else {
				this.setData({
					showPassword: true,
				})
			}
    }
	},
  //头部地址
  async getUserAddress() {
    const {
      code,
      data
    } = await fetch.getUserAddress()
    if (code === 0) {
      let arr = data
      arr && arr.map((item, index) => {
        if (item.sort == 1) {
          this.setData({
            address: arr[index]
          })
        }
      })
    }
  },
  //选择物流配送或是送货上门
  changeSendtype(e) {
    this.setData({
      sendType: e.currentTarget.dataset.idx
    })
  },
  //添加地址
  goAddNewAddress() {
    wx.navigateTo({
      url: '../Address/GetAddress/getAddress',
    })
  },

  // 跳转收货地址
  receivingAddress() {
    wx.navigateTo({
      url: '../Address/GetAddress/getAddress?good=1',
    })
  },
  //共几件
  piece() {
    const {
      commodityList
    } = this.data
    let piece = 0
    commodityList.map(item => {
      piece += item.selectNum
    })
    this.setData({
      piece: piece
    })
  },
  // 加
  increasement(e) {
    const idx = e.currentTarget.dataset.idx
    const {
      commodityList
    } = this.data
    commodityList.map((item, index) => {
      if (index === idx) {
        item.selectNum++
      }
    })
    this.setData({
      commodityList: commodityList,
    })
    this.piece()
    this.total()
  },
  // 减
  decrease(e) {
    const idx = e.currentTarget.dataset.idx
    const {
      commodityList
    } = this.data
    commodityList.map((item, index) => {
      if (index === idx && item.selectNum > 1) {
        item.selectNum = item.selectNum - 1
      }
    })
    this.setData({
      commodityList: commodityList
    })
    this.total()
    this.piece()
  },
  // 支付方式
  payModeWX() {
    this.setData({
      payModeWX: this.data.payModeWX = true,
      payModeQB: this.data.payModeQB = false,
    })
  },
  payModeQB() {
    this.setData({
      payModeWX: this.data.payModeWX = false,
      payModeQB: this.data.payModeQB = true,
    })
  },
  // 合计
  total() {
    const {
      commodityList
    } = this.data
    let money = 0
    let roommoney = 0
    if (commodityList.length == 0) {
      return
    }
    let amount = this.data.amount
    commodityList.map((item, index) => {
      if (item.is_fare == 1) {
        amount.postal = 0
      }
      money += item.selectNum * item.sku.price
      roommoney += item.selectNum * item.sku.room_coupons
    })
    amount.room = roommoney
    this.setData({
      total: money,
      amount: amount
    })
  },
  onLoad: function (options) {
    if (wx.getStorageSync('commodityList')) {
      this.setData({
        commodityList: wx.getStorageSync('commodityList')
			})
			this.total()
		}
		if (wx.getStorageSync('PRODUCT')) {
      this.setData({
        commodityList: wx.getStorageSync('PRODUCT')
			})
			console.log(this.data.commodityList);
		}
    if (options.address && options.address !== 'undefined') {
      let address = options.address
      address = JSON.parse(address)
      this.setData({
				newp:options.newp,
				showShopping: options.showShopping,
        address
      })
		}
    this.getUserInfo()
    
    this.piece()
  },
  onShow: function () {
    if (!this.data.address) {
      this.getUserAddress()
    }
  }
})