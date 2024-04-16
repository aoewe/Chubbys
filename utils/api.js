// const apiurl = `https://api.xf-market.com/`
// const apiurl = `http://csbdd.taoqiy.com`
const apiurl = `http://custom.taoqiy.com`


const api = {
	login: `${apiurl}/app/user/login`, // 登录
	wxm_login: `${apiurl}/app/user/wxm_login`, // 登录
	register: `${apiurl}/app/User/register`, // 注册
	sendcode: `${apiurl}/app/user/sendcode`, // 发送验证码
	resetUserPassword: `${apiurl}/app/user/resetUserPassword`, // 重置密码
	getUserInfo: `${apiurl}/app/user/getUserInfo`, //获取用户信息
	getShoppingList: `${apiurl}/app/ShoppingCar/getShoppingList`, //获取用户购物车
	getProductPattern: `${apiurl}/app/product/getProductPattern`, //首页
	getUserCapital: `${apiurl}/app/user/getUserCapital`, //用户信息钱包
	getOrderList: `${apiurl}/app/order/getOrderList`, //获取订单列表
	gethomeproduct: `${apiurl}/app/homePage/product`, //首页产品
	getProductList: `${apiurl}/app/product/getproductlist`, //产品列表
	getProductdetail: `${apiurl}/app/product/getProductdetail`, //产品详情
	editShoppingCar: `${apiurl}/app/ShoppingCar/editShoppingCar`, //添加or修改购物车
	DeleteShoppingCar: `${apiurl}/app/ShoppingCar/DeleteShoppingCar`, //删除购物车
	getsku: `${apiurl}/app/product/getSKU`, //产品规格
	getSKUs: `${apiurl}/app/Activity/getSKU`, //产品规格
	getWineComments: `${apiurl}/app/product/getComments`, //获取相关评论
	getaddorder: `${apiurl}/app/order/addOrder`, //创建订单
	editUserAddress: `${apiurl}/app/user/editUserAddress`, //编辑收货地址
	setdefaultaddress: `${apiurl}/app/user/setDefaultAddress`, //设置默认地址
	getUserAddress: `${apiurl}/app/user/getUserAddress`, //获取地址
	deluseraddress: `${apiurl}/app/user/delUserAddress`, //删除地址
	getUserCapital: `${apiurl}/app/user/getUserCapital`, //用户资产
	payOrder: `${apiurl}/app/order/payOrder`, //商品订单支付
	editUser: `${apiurl}/app/user/editUser`, //编辑个人信息
	uploadImg: `${apiurl}/app/upload/uploadImg`, //图片上传
	getRegion: `${apiurl}/app/common/getRegion`, //获取区域
	setUserOpinion: `${apiurl}/app/user/setUserOpinion`, //意见反馈
	getWinOrderInfo: `${apiurl}/app/order/getOrderInfo`, //获取订单详情
	getNewsBrief: `${apiurl}/app/news/getNewsBrief`, //消息简述
	editHeadImg: `${apiurl}/app/User/editHeadImg`, //修改用户头像
	getNewsByTos: `${apiurl}/app/news/getNewsByTos`, //消息列表
	readAll: `${apiurl}/app/news/readAll`, //已读所有消息
	getBankCardList: `${apiurl}/app/user/getBankCardList`, //银行卡列表
	editBackCard: `${apiurl}/app/user/editBackCard`, //编辑or新增银行卡
	getExpressInfo: `${apiurl}/app/order/getExpressInfo`, //查看物流状态
	delayOrder: `${apiurl}/app/order/delayOrder`, //延迟收货
	getStreamList: `${apiurl}/app/capital/getStreamList`, //钱包流水
	withdrawal: `${apiurl}/app/user/withdrawal`, //用户提现
	readyWithdrawal: `${apiurl}/app/user/readyWithdrawal`, //提现信息预备
	getRewardIntegral: `${apiurl}/app/Capital/getRewardIntegral`, //获取奖励明细
	getDealInfo: `${apiurl}/app/Deal/getDealInfo`, //预展
	getAutoOrderOne: `${apiurl}/app/Deal/getAutoOrderOne`, //预展中心（运营中心/旗下挂单）
	getAutoOrderTwo: `${apiurl}/app/Deal/getAutoOrderTwo`, //预展中心（收购大厅）
	transferExhibits: `${apiurl}/app/Deal/transferExhibits`, //预转展品
	getWithdrawalList: `${apiurl}/app/Capital/getWithdrawalList`, //提现记录
	getExhibitsStream: `${apiurl}/app/Capital/getExhibitsStream`, //展品流水
	checkRealName: `${apiurl}/app/User/checkRealName`, //实名认证
	getRecommendVideosBat: `${apiurl}/app/video/getRecommendVideosBat`, //获取推荐视频
	getAdVideoList: `${apiurl}/app/video/getAdVideoList`, //获取推荐视频
	addView: `${apiurl}/app/video/addView`, //记录观看
	addAdView: `${apiurl}/app/video/addAdView`, //记录已观看答题视频
	getArticleList: `${apiurl}/app/user/getArticleList`, //文章列表
	confirmOrder: `${apiurl}/app/order/confirmOrder`, //收货
	getArticleInfo: `${apiurl}/app/user/getArticleInfo`, //文章详情
	getFansList: `${apiurl}/app/User/getFansList`, //粉丝列表
	addLikes: `${apiurl}/app/video/addLikes`, //视频点赞
	addCollects: `${apiurl}/app/video/addCollects`, //视频点赞
	setAttention:	`${apiurl}/app/video/setAttention`, //关注
	getAttention:	`${apiurl}/app/video/getAttention`, //关注列表
	getComments:	`${apiurl}/app/video/getComments`, //评论列表
	setComments:	`${apiurl}/app/video/setComments`, //发评论
	setViewRecord:	`${apiurl}/app/video/setViewRecord`, //记录完播（观看完成70%以上）
	setRightAnswer:	`${apiurl}/app/video/setRightAnswer`, //正确答题记录接口
	bandNewOrder:	`${apiurl}/app/order/bandNewOrder`, //拉新订单绑定
	applyRefund:	`${apiurl}/app/order/applyRefund`, //申请退货/退款
	getRefundInfo:	`${apiurl}/app/order/getRefundInfo`, //查询售后订单详细信息
	setRefundSn: 	`${apiurl}/app/order/setRefundSn`, //填写退货快递单号
	getLessonList: 	`${apiurl}/app/Lesson/getLessonList`, //获取购买课程列表
	getLessonInfo: 	`${apiurl}/app/Lesson/getLessonInfo`, //获取课程详情
	transferBalance: 	`${apiurl}/app/Capital/transferBalance`, //获取课程详情
	getNewsList: 	`${apiurl}/app/News/getNewsList`, //消息列表
	getNewsTypeList: 	`${apiurl}/app/news/getNewsTypeList`, //消息分类列表
	getCategory:	`${apiurl}/app/product/getCategory`, //
	getKillingPro: 	`${apiurl}/app/Activity/getKillingPro`, //获取秒杀专区
	getQuota: 	`${apiurl}/app/Activity/getQuota`, //限购活动列表
	getProductdetails: 	`${apiurl}/app/Activity/getProductdetail`, //活动商品详情
	getActivityProduct: 	`${apiurl}/app/Activity/getActivityProduct`, //秒杀抢购
	applyMerchant: 	`${apiurl}/app/user/applyMerchant`, //商户入住申请
}

module.exports = api