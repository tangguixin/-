// 云函数入口文件
// const cloud = require('wx-server-sdk')

// cloud.init()

// const db = cloud.database()  ///////////////////////////////
// const $ = db.command.aggregate
// exports.main = async (event, context) => {
//   try {
//     return await db.collection('dianzhahan').aggregate()
//       .group({
//         _id: {
//           workplace: '$workplace',
//           floor:'$floor'
//         },
//       result: $.sum('$total')
//       }).sort
//       .end()
//   } catch (e) {
//     console.error(e)
//   }
// }

// 

const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: cloud.getWXContext().OPENID,
      lang: 'zh_CN',
      data: {
        name7: {
          value: event.data.name
        },
        time3: {
          value: event.data.date
        },
        thing2: {
          value: event.data.workplace
        }
      },
      templateId:'PSdoCDI5-EiSHVHI7RXOZyNN_7RG24FMAoYxCbhlcWM',
      miniprogramState: 'developer'
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}