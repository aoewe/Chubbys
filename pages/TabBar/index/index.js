const fetch = require("../../../utils/reques").default;
const app = getApp()
let lastTapTime = 0;
let lastTapTimeout;

Page({
	data: {
		need_band_order: '',
		need: false,
		animationShow: false, //动画显示状态
		context_o: '',
		context_t: '',
		indeo: 0, //横向切换

		Videos: '',


		index: 0,
		uuid: '',

		video_id: '',

		percents: 1,
		percent: 1,

		status: 0,
		isLiked: false,
		likeImage: "",
		play: false,

		uid: [], //关注列表uid

		placeholder: '善语结善缘，恶言伤人心',
		comments: '', //评论
		activeName: '1',
		focus: false,
		loading: true,
		loadings: true,
		inputcomment: '', //输入的内容
		belong_id: '',
		to_uid: '',

		showShare: false, //分享
		options: [{
				name: '微信',
				icon: 'wechat',
				openType: 'share'
			},
			{
				name: '复制链接',
				icon: 'link'
			},
			{
				name: '分享海报',
				icon: 'poster'
			},
			{
				name: '二维码',
				icon: 'qrcode'
			},
		],
		aniLeft: 0,
		aniTop: 0,

	},

	onReady() {
		this.animation = wx.createAnimation({
			duration: 400,
			timingFunction: 'ease',
			delay: 0,
			transformOrigin: '50% 50% 0',
		})
		//评论组件动画
		this.animationTwo = wx.createAnimation({ //评论组件弹出动画
			duration: 400, // 整个动画过程花费的时间，单位为毫秒
			timingFunction: "ease", // 动画的类型
			delay: 0 // 动画延迟参数
		})
	},
	onLoad(params) {
		this.getVideos()
	},
	onShow() {


	},
	// 获取视频推荐列表
	async getVideos() {
		const that = this
		const {
			code,
			data
		} = await fetch.getRecommendVideosBat()
		if (code === 0) {
			this.setData({
				loadings: false,
				Videos: data,
				video_id: data[0].id,
				uuid: data[0].uid
			})
			this.getAttention()
			const id = data[0].id
			const str = id.toString();
			this.data.context_o = wx.createVideoContext(str, this)
			this.data.context_o.play()

			const param = {
				video_id: data[0].id,
			}
			

			const {
				code
			} = await fetch.addView(param)

			setTimeout(function () {
				const USERINFO = wx.getStorageSync('USERINFO')
				that.setData({
					need: true,
					need_band_order: USERINFO.need_band_order
				})
			}, 5000)
		}
	},


	//监控完播率
	async over() {
		const params = {
			video_id: this.data.video_id,
		}
		const {
			code
		} = await fetch.setViewRecord(params)
		if (code === 0) {

		}
	},
	// 切换视频记录观看
	async thisVideos(event) {
		const params = {
			video_id: event.detail.currentItemId,
		}
		this.setData({
			loading: true,
			percents: 1,
			video_id: event.detail.currentItemId,
			index: event.detail.current
		})
		const uid = this.data.uid
		const index = this.data.index
		const Videos = this.data.Videos
		const uuid = this.data.Videos[index].uid
		const id = Videos[index].id
		let str = id.toString();
		this.data.context_o = wx.createVideoContext(str, this)



		let prevIndex = index - 1 < 0 ? Videos.length - 1 : index - 1
		let prevId = Videos[prevIndex].id;
		let prevStr = prevId.toString();
		let prevContext = wx.createVideoContext(prevStr, this)
		prevContext.pause()



		let nextIndex = index + 1 >= Videos.length ? 0 : index + 1
		let nextId = Videos[nextIndex].id;
		let nextStr = nextId.toString()
		let nextContext = wx.createVideoContext(nextStr, this)
		nextContext.pause()

		this.data.context_o.play()


		for (let i = 0; i < uid.length; i++) {
			if (uid[i].uid === uuid) {
				Videos[index].aion = 1
				this.setData({
					Videos: Videos,
					uuid: uuid
				})
			}
		}

		const {
			code
		} = await fetch.addView(params)
	},



	//点击视频
	doubleTap(e) {
		const currentTime = e.timeStamp;
		// 判断时间间隔
		if (currentTime - lastTapTime < 300) {
			this.animations = wx.createAnimation({
				duration: 1000,
				timingFunction: 'ease',
			})

			// 添加动画效果
			this.animations.scale(1.5).opacity(0).step()
			this.setData({
				animationData: this.animations.export(),
				aniLeft: e.touches[0].clientX - 10,
				aniTop: e.touches[0].clientY - 10,
			})

			// 动画执行完成后重置位置和透明度
			setTimeout(() => {
				this.setData({
					aniLeft: 0,
					aniTop: 0,
					animationData: null,
				})
			}, 1000)

		} else {
			// 记录上一次时间戳
			lastTapTime = currentTime;

			// 设定定时器
			lastTapTimeout = setTimeout(() => {
				clearTimeout(lastTapTimeout);
			}, 300);
			this.data.play ? this.data.context_o.pause() : this.data.context_o.play();
		}
	},


	// 整屏点赞
	onplay() {
		this.setData({
			play: true
		})
	},
	onpause() {
		this.setData({
			play: false
		})
	},

	//关注列表
	async getAttention() {
		const {
			code,
			data
		} = await fetch.getAttention()
		if (code === 0) {
			this.setData({
				uid: data
			})
			const index = this.data.index
			const uid = data
			const Videos = this.data.Videos
			const indexuid = this.data.Videos[index].uid
			for (let i = 0; i < uid.length; i++) {
				if (uid[i].uid === indexuid) {
					Videos[index].aion = 1
					this.setData({
						Videos: Videos
					})
				}
			}
		}
	},
	//关注
	async aions() {
		const that = this
		const index = this.data.index
		let Videos = this.data.Videos
		const uid = Videos[index].uid
		if (Videos[index].aion === 2) {
			Videos[index].aion = 1
		} else {
			Videos[index].aion = 2
		}
		that.setData({
			Videos: Videos
		})
		let status = this.data.Videos[index].aion
		const params = {
			uid: uid,
			status: status
		}
		const {
			code,
			msg
		} = await fetch.setAttention(params)
		if (code === 0) {
			that.setData({
				Videos: Videos
			})
		} else {
			wx.showToast({
				title: msg,
				icon: 'none',
				duration: 2000
			})
		}
	},
	// 点赞
	async likeVideoOrNot() {
		const index = this.data.index
		let Videos = this.data.Videos
		if (Videos[index].liked) {
			Videos[index].likes -= 1
			Videos[index].liked = false
		} else {
			Videos[index].likes += 1
			Videos[index].liked = true
		}

		this.setData({
			status: this.data.status === 1 ? 2 : 1,
			Videos: Videos
		});
		const params = {
			video_id: this.data.video_id,
			status: this.data.status
		}
		const {
			code
		} = await fetch.addLikes(params)
	},
	//收藏 
	async shareMe() {
		const index = this.data.index
		let Videos = this.data.Videos
		if (Videos[index].collectd) {
			Videos[index].collects -= 1
			Videos[index].collectd = false
		} else {
			Videos[index].collects += 1
			Videos[index].collectd = true
		}
		this.setData({
			collect: this.data.collect === 1 ? 2 : 1,
			Videos: Videos
		});
		const params = {
			video_id: this.data.video_id,
			status: this.data.collect
		}
		const {
			code
		} = await fetch.addCollects(params)
	},
	//获取评论
	async leaveComment() {
		this.animation.scale(0.5).step()
		// 更新 video 组件的数据
		// 设置动画内容为：使用绝对定位显示区域，高度变为100%
		this.animationTwo.bottom("0rpx").height("100%").step()
		this.setData({
			videoAnimation: this.animation.export(),
			talksAnimationData: this.animationTwo.export(),
			animationShow: true,
			loading: true
		})
		const params = {
			video_id: this.data.video_id,
			uid: this.data.uuid
		}
		const {
			code,
			data
		} = await fetch.getComments(params)
		if (code === 0) {
			for (let i = 0; i < data.list.length; i++) {
				const time = new Date(data.list[i].addtime);
				const newtiem = new Date(time * 1000);
				const year = newtiem.getFullYear();
				const month = newtiem.getMonth() + 1;
				const day = newtiem.getDate();
				const hour = newtiem.getHours();
				const minute = newtiem.getMinutes();
				const second = newtiem.getSeconds();
				const times = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
				data.list[i].addtime = times
			}
			this.setData({
				loading: false,
				comments: data
			})
		}
	},
	// 回复
	onButtoninput() {
		this.setData({
			focus: true
		})
	},
	onButtonClick(e) {
		this.setData({
			focus: true
		})
		this.setData({
			belong_id: e.currentTarget.dataset.item.id,
			to_uid: e.currentTarget.dataset.item.uid
		})
	},

	async sending() {
		const params = {
			video_id: this.data.video_id,
			comments: this.data.inputcomment,
			belong_id: this.data.belong_id,
			to_uid: this.data.to_uid
		}
		console.log(params);
		const {
			code,
		} = await fetch.setComments(params)
		if (code === 0) {
			const parame = {
				video_id: this.data.video_id,
				uid: this.data.uuid
			}
			const {
				code,
				data
			} = await fetch.getComments(parame)
			if (code === 0) {
				for (let i = 0; i < data.list.length; i++) {
					const time = new Date(data.list[i].addtime);
					const newtime = time.toLocaleDateString();
					data.list[i].addtime = newtime
				}
				const index = this.data.index

				this.data.Videos[index].comments++
				this.setData({
					Videos: this.data.Videos,
					inputcomment: '',
					comments: data
				})
			}
		}
	},

	hideTalks() {
		this.animation.scale(1).step()

		this.animationTwo.bottom("-100%").height("0rpx").step()
		this.setData({
			videoAnimation: this.animation.export(),
			talksAnimationData: this.animationTwo.export(),
			animationShow: false,
		})
	},
	onChange(event) {
		this.setData({
			activeName: event.detail,
		});
	},
	//点击分享
	sharetap(event) {
		this.setData({
			showShare: true
		});
		console.log(this.data.showShare);
	},
	onClose() {
		this.setData({
			showShare: false
		});
	},


	timeUpdate(e) {
		let percents = (e.detail.currentTime / e.detail.duration) * 100
		this.setData({
			percents: percents.toFixed(2)
		})
	},
	opens() {
		wx.navigateTo({
			url: '../../video/video',
		})
	},
	Goaddress() {
		this.setData({
			need: false
		})
		wx.navigateTo({
			url: '/pages/Address/BindingAddress/Binding?id=' + this.data.need_band_order,
		})
	}
})