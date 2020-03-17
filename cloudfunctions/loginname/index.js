const cloud = require('wx-server-sdk')
cloud.init({
})

exports.main = async (event) => {
  const { ENV, OPENID, APPID } = cloud.getWXContext()

  // 如果云函数所在环境为 abc，则下面的调用就会请求到 abc 环境的数据库
  return await cloud.database().collection('users').where({ _openid: OPENID }).get()


}