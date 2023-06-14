const http = require('../../../utils/reques').default
var time = 0
var seeTime = 0
var timer = null
Page({

  data: {
		id:'',
		title:'',
    statusBar: wx.getMenuButtonBoundingClientRect(),
    play: false,
    loading: true,
    seeIndex: 0,
    info: {},
    duration: 0
  },
  // 获取视频时长
  getLength(e) {
    e.detail.duration = parseInt(e.detail.duration)
    this.setData({
      duration: e.detail.duration
    })
  },
  // 切换章节
  async handelLesson(e) {
    const { index } = e.currentTarget.dataset
    // await this.setLearnHistory()
    if (this.data.seeIndex === index) return
    this.setData({ seeIndex: index })
  },
  // 视频播放时间（定位）
  changeTime(e) {
    time = e.detail.currentTime
  },
  formatDuring(value) {
    var secondTime = Math.ceil(value)// 秒
    var minuteTime = 0// 分
    var hourTime = 0// 时
    if (secondTime > 59) {
      minuteTime = secondTime / 60
      hourTime = minuteTime / 60
    }
    // @ts-ignore
    return hourTime.toFixed(1)
  },
  seeCourse() {
  },
  // 记录播放时间及学习时长
  async setLearnHistory() {
    const { info, seeIndex } = this.data
    const videoTime = Math.ceil(time)
    if (seeTime < 1) return
    const hour = this.formatDuring(seeTime)
    const parmas = {
      lesson_id: info.id,
      lesson_info_id: info.lesson_info[seeIndex].id,
      hour,
      last_tag: videoTime
    }
    console.log(parmas)
    time = 0
    seeTime = 0
    clearInterval(timer)
    await http.setLearnHistory(parmas)
  },
  // 看完
  // async ended() {
  //   const { info, seeIndex } = this.data
  //   const params = {
  //     lesson_id: info.id,
  //     lesson_info_id: info.lesson_info[seeIndex].id
  //   }
  //   await http.setOverVideo(params)
  // },
  // 播放
  bindplay() {
    timer = setInterval(() => {
      seeTime++
    }, 1000)
  },
  // 暂停
  bindpause() {
    clearInterval(timer)
  },
  handelVideo() {
    let videoCtx = wx.createVideoContext('video')
    videoCtx.play()
    this.setData({ play: true })
  },
  // 课程信息
  async getLessonInfo() {
    const { code, data } = await http.getLessonInfo({ id:this.data.id })
    if (code === 0) {
			const seeIndex = data.knowledge_info.findIndex((i) => i.is_look === 1)
      this.setData({ info: data, seeIndex: seeIndex === -1 ? 0 : seeIndex, loading: false })
    }
  },
  onUnload() {
    // this.setLearnHistory()
  },
  onLoad(options) {
    this.setData({id:options.id,title:options.title})
  },
  onShow(){
    this.getLessonInfo()
  }
})
export { }