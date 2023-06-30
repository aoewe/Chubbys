const api = require('../../../utils/reques').default
var timers = null
Page({
	data: {
		indexs: 0,
		list: '',
	},


	onLoad(options) {},

	onShow() {
		this.getKillingPro()
	},

	onHide() {
		clearInterval(timers)
	},

	onUnload(){
		clearInterval(timers)
	},

	async getKillingPro() {
		const {
			code,
			data
		} = await api.getKillingPro()
		if (code === 0) {
			data.forEach((i) => {
				const time = new Date(i.begin_time);
				const newtiem = new Date(time * 1000);
				const hours = newtiem.getHours();
				const minutes = newtiem.getMinutes().toString().padStart(2, '0');
				const times = `${hours}:${minutes}`;
				i.statustime = times

				i.product_info.forEach((e) => {
					const a = (e.sales_volume / e.current_cnt) * 100
					e.content = a
				})
			})
			this.setData({
				list: data,
				loading: false
			})
			timers = setInterval(() => {
				data.forEach((i) => {
					const {
						day,
						hour,
						minute,
						second,
						d,
						h,
						m,
						s,
					} = this.countDownFun(i.begin_time, i.end_time)
					i.day = day
					i.hour = hour
					i.minute = minute
					i.second = second
					i.d = d
					i.h = h
					i.m = m
					i.s = s
					this.setData({
						list: data,
					})
				}, 1000)
			})
		}
	},

	countDownFun(time,t) {
		time = time * 1000
		let timestamp = new Date().getTime()
		let times = time - timestamp
		t = t * 1000
		let ts = t - timestamp
		let day = 0,
			hour = 0,
			minute = 0,
			second = 0;
		let	d = 0,
			h = 0,
			m = 0,
			s = 0;
		if (times > 0) {
			second = Math.floor(times / 1000); //未来时间距离现在的秒数
			day = Math.floor(second / 86400); //整数部分代表的是天；一天有24*60*60=86400秒 ；
			second = second % 86400; //余数代表剩下的秒数；
			hour = Math.floor(second / 3600); //整数部分代表小时；
			second %= 3600; //余数代表 剩下的秒数；
			minute = Math.floor(second / 60);
			second %= 60;
		}
		if (ts > 0) {
			s = Math.floor(ts / 1000); 
			d = Math.floor(s / 86400); 
			s = s % 86400; 
			h = Math.floor(s / 3600); 
			s %= 3600;
			m = Math.floor(s / 60);
			s %= 60;
		}
		return {
			day,
			hour,
			minute,
			second,
			d,
			h,
			m,
			s,
		}
	},


	bindswiper(e) {
		this.setData({
			indexs: e.currentTarget.dataset.index
		})
	},

	switchswiper(e) {
		this.setData({
			indexs: e.detail.current
		})
	},

	Godetails(e) {
		const status = e.currentTarget.dataset.status
		const id = e.currentTarget.dataset.id
		const activity_id = e.currentTarget.dataset.activity_id

		if (status === 1) {
			wx.navigateTo({
				url: `../../Product/details/details?id=${id}&no=1&newp=1&re=true&activity_id=${activity_id}`,
			})
		} else {
			wx.showToast({
				icon: "none",
				title: '秒杀未开始，或已结束',
			})
		}
	},

	close() {
		wx.navigateBack({
			delta: 1,
		})
	}
})