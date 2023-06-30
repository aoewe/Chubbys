import api from './api'

const des = require("./code");
const request = (url, method, data) => {
  return new Promise((resolve, reject) => {
    const info = wx.getStorageSync('USERINFO')
    const ios = 'ios'
    wx.request({
      url,
      method,
			data: des.encode(data),
      // data:data,
      header: {
        uid: info.id,
        token: info.token,
        equiment: ios
      },
      success: res => {
        if (res.data.code === 700) {
          wx.navigateTo({
            url: '/pages/Login/login',
          })
          wx.removeStorageSync('USERINFO')
          wx.removeStorageSync('type')
          reject()
        }
        if (res.data.code === 0) {
          resolve(res.data)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          resolve(res.data)
        }
      },
      fail: error => {
        // reject('系统错误')
      }
    })
  })
}
const login = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.login, 'post', data))
  })
}
const register = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.register, 'post', data))
  })
}
const sendcode = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.sendcode, 'post', data))
  })
}
const resetUserPassword = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.resetUserPassword, 'post', data))
  })
}
const getUserInfo = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getUserInfo, 'post', data))
  })
}
const getShoppingList = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getShoppingList, 'post', data))
  })
}
const getRecommendVideosBat = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getRecommendVideosBat, 'post', data))
  })
}
const editShoppingCar = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.editShoppingCar, 'post', data))
  })
}
const DeleteShoppingCar = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.DeleteShoppingCar, 'post', data))
  })
}
const getUserCapital = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getUserCapital, 'post', data))
  })
}

// 意见反馈
const setUserOpinion = (data) => {
  return new Promise((resolve, reject) => {
    resolve(request(api.setUserOpinion, 'post', data));
  });
};

//获取首页产品
const getHomeProduct = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.gethomeproduct, 'post', data));
  });
};


//获取产品列表
const getProductList = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getProductList, 'post', data));
  });
};

//获取产品详情
const getProductdetail = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getProductdetail, 'post', data));
  });
};
//获取产品规格
const getSKU = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getsku, 'post', data));
  });
};

//创建订单
const getAddOrder = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getaddorder, 'post', data))
  })
}
//支付订单
const payOrder = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.payOrder, 'post', data))
  })
}

//获取订单列表
const getOrderList = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getOrderList, 'post', data))
  })
}
//设置默认地址
const setDefaultAddress = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.setdefaultaddress, 'post', data));
  });
};
//获取地址
const getUserAddress = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getUserAddress, 'post', data));
  });
};
//编辑收货地址
const editUserAddress = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.editUserAddress, 'post', data));
  });
};
//删除地址
const delUserAddress = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.deluseraddress, 'post', data));
  });
};
// 图片上传

const uploadImg = (path) => {
  return new Promise((resolve) => {
    wx.uploadFile({
      filePath: path,
      name: 'file[]',
      header: {
        token: wx.getStorageSync('USERINFO').token,
        uid: wx.getStorageSync('USERINFO').id
      },
      url: api.uploadImg,
      formData: {
        path_name: 'appImg/refund'
      },
      success(data) {
        resolve(data)
      }
    })
  })
}
// 获取区域
const getRegion = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getRegion, 'post', data));
  });
};
// 产品评论
const getWineComments = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getWineComments, 'post', data));
  });
};
// 消息简述(附最新消息内容)
const getNewsBrief = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getNewsBrief, 'post', data));
  });
};
// 消息列表
const getNewsByTos = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getNewsByTos, 'post', data));
  });
};
// 已读所有消息
const readAll = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.readAll, 'post', data));
  });
};
// 银行卡列表
const getBankCardList = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getBankCardList, 'post', data));
  });
};
const getFansList = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getFansList, 'post', data));
  });
};
// 查看物流状态
const getExpressInfo = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getExpressInfo, 'post', data));
  });
};
// 延迟收货
const delayOrder = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.delayOrder, 'post', data));
  });
};
// 流水
const getStreamList = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getStreamList, 'post', data));
  });
};
// 修改用户头像
const editHeadImg = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.editHeadImg, 'post', data));
  });
};

// 修改用户信息
const editUser = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.editUser, 'post', data));
  });
};
// 编辑or新增银行卡
const editBackCard = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.editBackCard, 'post', data));
  });
};
// 用户提现
const withdrawal = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.withdrawal, 'post', data));
  });
};
// 提现信息预备
const readyWithdrawal = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.readyWithdrawal, 'post', data));
  });
};
const getDealInfo = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getDealInfo, 'post', data));
  });
};
const getAutoOrderOne = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getAutoOrderOne, 'post', data));
  });
};
const getAutoOrderTwo = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getAutoOrderTwo, 'post', data));
  });
};
const transferExhibits = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.transferExhibits, 'post', data));
  });
};
const getProductPattern = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getProductPattern, 'post', data));
  });
};
const getExhibitsStream = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getExhibitsStream, 'post', data));
  });
};
const checkRealName = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.checkRealName, 'post', data));
  });
};
const changeIntegral = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.changeIntegral, 'post', data));
  });
};
const getArticleInfo = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getArticleInfo, 'post', data));
  });
};
const getArticleList = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getArticleList, 'post', data));
  });
};
const getWinOrderInfo = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getWinOrderInfo, 'post', data));
  });
};
const confirmOrder = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.confirmOrder, 'post', data));
  });
};
const addLikes = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.addLikes, 'post', data));
  });
};
const getRewardIntegral = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getRewardIntegral, 'post', data));
  });
};
const getWithdrawalList = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getWithdrawalList, 'post', data));
  });
};
const addView = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.addView, 'post', data));
  });
};
const addAdView = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.addAdView, 'post', data));
  });
};
const addCollects = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.addCollects, 'post', data));
  });
};
const setAttention = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.setAttention, 'post', data));
  });
};
const getAttention = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getAttention, 'post', data));
  });
};
const getComments = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getComments, 'post', data));
  });
};
const setComments = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.setComments, 'post', data));
  });
};
const setViewRecord = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.setViewRecord, 'post', data));
  });
};
const getAdVideoList = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getAdVideoList, 'post', data));
  });
};
const setRightAnswer = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.setRightAnswer, 'post', data));
  });
};
const bandNewOrder = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.bandNewOrder, 'post', data));
  });
};
const applyRefund = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.applyRefund, 'post', data));
  });
};
const getRefundInfo = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getRefundInfo, 'post', data));
  });
};
const setRefundSn = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.setRefundSn, 'post', data));
  });
};
const getLessonList = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getLessonList, 'post', data));
  });
};
const getLessonInfo = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getLessonInfo, 'post', data));
  });
};
const transferBalance = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.transferBalance, 'post', data));
  });
};
const wxm_login = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.wxm_login, 'post', data));
  });
};
const getNewsList = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getNewsList, 'post', data));
  });
};
const getNewsTypeList = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getNewsTypeList, 'post', data));
  });
};
const getCategory = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getCategory, 'post', data));
  });
};
const getKillingPro = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getKillingPro, 'post', data));
  });
};
const getQuota = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getQuota, 'post', data));
  });
};
const getProductdetails = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getProductdetails, 'post', data));
  });
};
const getSKUs = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getSKUs, 'post', data));
  });
};
const getActivityProduct = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.getActivityProduct, 'post', data));
  });
};
const applyMerchant = data => {
  return new Promise((resolve, reject) => {
    resolve(request(api.applyMerchant, 'post', data));
  });
};
export default {
  getWithdrawalList,
  confirmOrder,
  getWinOrderInfo,
  getArticleInfo,
  changeIntegral,
  checkRealName,
  getExhibitsStream,
  getDealInfo,
  getAutoOrderOne,
  getAutoOrderTwo,
  transferExhibits,
  login,
  register,
  sendcode,
  getUserInfo,
  getOrderList,
  getUserCapital,
  uploadImg,
  readyWithdrawal,
  withdrawal,
  resetUserPassword,
  editBackCard,
  editUser,
  editHeadImg,
  getStreamList,
  delayOrder,
  getExpressInfo,
  getBankCardList,
  readAll,
  getFansList,
  getNewsByTos,
  getNewsBrief,
  getWineComments,
  getRegion,
  delUserAddress,
  getArticleList,
  editUserAddress,
  getUserAddress,
  setDefaultAddress,
  payOrder,
  getProductPattern,
	getAddOrder,
	getShoppingList,
	editShoppingCar,
  getSKU,
  getProductdetail,
  getProductList,
	addLikes,
	addCollects,
  getHomeProduct,
  setUserOpinion,
	getRewardIntegral,
	DeleteShoppingCar,
	getRecommendVideosBat,
	getAdVideoList,
	addView,
	setAttention,
	getAttention,
	getComments,
	setComments,
	setViewRecord,
	addAdView,
	setRightAnswer,
	bandNewOrder,
	applyRefund,
	getRefundInfo,
	setRefundSn,
	getLessonList,
	getLessonInfo,
	transferBalance,
	wxm_login,
	getNewsList,
	getNewsTypeList,
	getCategory,
	getKillingPro,
	getQuota,
	getSKUs,
	getProductdetails,
	getActivityProduct,
	applyMerchant
}