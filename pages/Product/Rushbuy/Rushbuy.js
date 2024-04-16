const api = require('../../../utils/reques').default
Page({

	data: {
		timers: null,
    list:'',
    loading:true,
		timeData: {},
	},

	onLoad(options) {
		
  },
  
  onShow(){
    this.getQuota()
  },

	countDownFun(time) {
    time = time * 1000
    let timestamp = new Date().getTime()
    let times = time - timestamp
		let day = 0,
      hour = 0,
      minute = 0,
      second = 0; //时间默认值
    if (times > 0) {
      second = Math.floor(times / 1000); //未来时间距离现在的秒数
      day = Math.floor(second / 86400); //整数部分代表的是天；一天有24*60*60=86400秒 ；
      second = second % 86400; //余数代表剩下的秒数；
      hour = Math.floor(second / 3600); //整数部分代表小时；
      second %= 3600; //余数代表 剩下的秒数；
      minute = Math.floor(second / 60);
			second %= 60;
			hour = hour.toString().padStart(2, '0');
			minute = minute.toString().padStart(2, '0');
			second = second.toString().padStart(2, '0');
    }

    return {
      day,
      hour,
      minute,
      second
    }
  },

	async getQuota() {

		const {
			code,
			data
		} = await api.getQuota()
		if (code === 0) {
			this.timers =  setInterval(() => {
						const {day,hour,minute,second} = this.countDownFun(data.end_time)
						data.day = day
						data.hour = hour
						data.minute = minute
						data.second = second
					this.setData({
						list: data,
						loading:false
					})
				}, 1000)
			}
	},

	onChange(e) {
    this.setData({
      timeData: e.detail,
    });
	},
  
  onHide(){
		clearInterval(this.timers)
		this.setData({
			list: '',
			loading:true,
		})
  }
})