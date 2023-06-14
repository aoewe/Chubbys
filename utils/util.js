const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const formatTime1 = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('')  + [hour, minute, second].map(formatNumber).join('')
}



const Tips = function (opt, to_url) {
  if (typeof opt == 'string') {
    to_url = opt;
    opt = {};
  }
  var title = opt.title || '', icon = opt.icon || 'none', endtime = opt.endtime || 2000;
  if (title) {
    wx.showToast({ title: title, icon: icon, duration: endtime })
    // setTimeout(function () {
    //   wx.reLaunch({
    //     url: '/pages/back_sand/back?id=2'
    //   });
    // }, 2500)
    }
  if (to_url != undefined) {
    if (typeof to_url == 'object') {
      var tab = to_url.tab || 1, url = to_url.url || '';
      switch (tab) {
        case 1:
          //一定时间后跳转至 table
          setTimeout(function () {
            wx.switchTab({
              url: url
            })
          }, endtime);
          break;
        case 2:
          //跳转至非table页面
          setTimeout(function () {
            wx.navigateTo({
              url: url,
            })
          }, endtime);
          break;
        case 3:
          //返回上页面
          setTimeout(function () {
            wx.navigateBack({
              delta: parseInt(url),
            })
          }, endtime);
          break;
        case 4:
          //关闭当前所有页面跳转至非table页面
          setTimeout(function () {
            wx.reLaunch({
              url: url,
            })
          }, endtime);
          break;
        case 5:
          //关闭当前页面跳转至非table页面
          setTimeout(function () {
            wx.redirectTo({
              url: url,
            })
          }, endtime);
          break;
      }

    } else if (typeof to_url == 'function') {
      setTimeout(function () {
        to_url && to_url();
      }, endtime);
    } else {
      //没有提示时跳转不延迟
      setTimeout(function () {
        wx.navigateTo({
          url: to_url,
        })
      }, title ? endtime : 0);
    }
  }
}

module.exports = {
	formatTime,
	formatTime: formatTime,
  formatTime1: formatTime1,
  Tips: Tips,
}
