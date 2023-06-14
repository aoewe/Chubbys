const api = require("../../../utils/reques").default
const app = getApp()
Page({
  data: {
    active: 0,
    type: wx.getStorageSync('type'),
    tabs: [{
      name: 0,
      title: '全部'
    }, {
      name: 1,
      title: '待付款'
    }, {
      name: 2,
      title: '待发货'
    }, {
      name: 3,
      title: '待收货'
    }, {
      name: 4,
      title: '已完成'
    }],
		pay_status:'',
    list: [],
    page: 1,
    size: 10,
    total: 0,
    loading: true
  },
  confirmOrder(e) {
    const that= this
    const id = e.target.dataset.id
    wx.showModal({
      title: '提示',
      content: '确定该商品已收到？',
      success:async res=> {
        if (res.confirm) {
          const {code} = await api.confirmOrder({ id })
          if(code===0){
            that.setData({
              order_status:this.data.active===3?2:'',
              loading:true,
              list:[],
              page:1
            })
            that.getOrderList()
          }
        }
      }
    })
    
  },
  // 查看物流
  toLogistics(e) {
    wx.navigateTo({
      url: '../logistics/logistics?id=' + e.currentTarget.dataset.id,
    })
  },
  // 发表评论
  toComment(e) {
    let info = e.currentTarget.dataset.item
    info = JSON.stringify(info)
    wx.navigateTo({
      url: '../comment/comment?info=' + info + '&product_type=0',
    })
  },
  onChange(e) {
    this.setData({
      page: 1,
      loading: true,
			order_status: '',
			pay_status:'',
      active:e.detail.index,
      list: [],
    })
    switch (e.detail.index) {
      case 1:
        wx.setNavigationBarTitle({
          title: '待付款',
        })
        this.setData({
					order_status: 0,
					pay_status:''
        })
        break;
      case 2:
        wx.setNavigationBarTitle({
          title: '待发货',
        })
        this.setData({
					order_status: 1,
					pay_status:1
        })
        break;
      case 3:
        wx.setNavigationBarTitle({
          title: '待收货',
        })
        this.setData({
					order_status: 2,
					pay_status:1
        })
        break;
      case 4:
        wx.setNavigationBarTitle({
          title: '已完成',
        })
        this.setData({
					order_status: 3,
					pay_status:''
        })
        break;
      default:
        wx.setNavigationBarTitle({
          title: '全部订单',
        })
        break;
    }
    this.getOrderList()
  },
  // 订单二次支付
  toTowPay(e) {
		console.log(e);
    let {
      order_invalid_time,
      order_money,
      district_money,
      order_sn,
      id,
      create_time,
      detail,
      order_type
    } = e.currentTarget.dataset.item
    let good_name = detail[0].good_name
    let data = {
      order_invalid_time,
      order_money,
      district_money,
      order_sn,
      id,
      create_time,
      good_name,order_type
    }
    data = JSON.stringify(data)
    wx.navigateTo({
      url: '../twoPayment/twoPayment?info=' + data,
    })
  },
  async getOrderList() {
    const {
			order_status,
			pay_status
		} = this.data
    const params = {
			order_status,
			pay_status,
      size: this.data.size,
      page: this.data.page
		}
		console.log(params);
    const {
      code,
      data
    } = await api.getOrderList(params)
    if (code === 0) {
			for (let i = 0; i < data.list.length; i++) {
				const time = new Date(data.list[i].create_time);
				const newtiem = new Date(time * 1000);
				const year = newtiem.getFullYear();
				const month = newtiem.getMonth() + 1;
				const day = newtiem.getDate();
				const hour = newtiem.getHours();
				const minute = newtiem.getMinutes();
				const second = newtiem.getSeconds();
				const times = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
				data.list[i].create_time = times
			}
			this.data.list.push(...data.list)
      this.setData({
        list: this.data.list,
        page: ++this.data.page,
        total: data.total,
        loading: false
      })
    }
	},
  onLoad(options) {
		let active = parseInt(options.active)
		let status = options.status
    this.setData({
			active,
			status
    })
    if (!active) {
      this.getOrderList()
    }
  },
  onShow() {
    if (this.data.type != wx.getStorageSync('type')) {
      this.setData({
        type: wx.getStorageSync('type')
      })
    }
  },
  onReachBottom() {
    if (this.data.total === this.data.list.length) return
    this.setData({
      loading: true
    })
    this.getOrderList()
	},
	deleteOrder() {
			
	}
})