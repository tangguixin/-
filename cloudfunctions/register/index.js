const cloud = require('wx-server-sdk')
cloud.init({
})
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  var name = event.name

  const { ENV, OPENID, APPID } = cloud.getWXContext()
  try {
    return await db.collection('users').add({
      data: { 
        _openid:OPENID, 
        name:name
      }
    })
  } catch (e) {
    console.error(e)
  }
}