const api = require('../../../utils/reques').default
var timers = null
Page({

	data: {
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
    let playTime,
      day = 0,
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
    }
    if (hour <= 9) hour = '0' + hour;
    if (minute <= 9) minute = '0' + minute;
    if (second <= 9) second = '0' + second;
    if (day > 0) {
      playTime = `${day}天 ${hour}:${minute}:${second}`;
    }
    if (day <= 0 && hour > 0) {
      playTime = `${hour}:${minute}:${second}`;
    }
    if (day <= 0 && hour <= 0) {
      playTime = `${minute}:${second}`;
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
		// if (code === 0) {
		// 		const timee = new Date(data.end_time);
		// 		const newtiems = new Date(timee * 1000);
		// 		const hours = newtiems.getHours();
		// 		const minutes = newtiems.getMinutes().toString().padStart(2, '0');
		// 		const second = newtiems.getSeconds().toString().padStart(2, '0');
		// 		const timess = Number(`${hours}${minutes}${second}1000`);
		// 		data.end_time = timess
		// 	this.setData({
		// 		list: data
		// 	})
		// }
		if (code === 0) {
			timers =  setInterval(() => {
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
    clearInterval(timers)
  }
})