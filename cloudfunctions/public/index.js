// 云函数入口文件
const cloud = require('wx-server-sdk')

// cloud.init({env:'szjl-9g9sqgqwb4b6495e'});
cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  switch (event.action) {
    case 'getUrlScheme': {
      return getUrlScheme(event.token_id)
    }
  }

  return 'action not found'
}

async function getUrlScheme(token_id) {
  return cloud.openapi.urlscheme.generate({
    jumpWxa: {
      path: '/pages/zf/index', // <!-- replace -->
      query: 'token_id=' + token_id+ '&back=1' ,
    },
    // 如果想不过期则置为 false，并可以存到数据库
    isExpire: true,
    // 一分钟有效期
    expireTime: parseInt(Date.now() / 1000 + 1000),
  })
}