// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
// 云函数入口函数

exports.main=async(event,context) =>{
  try{
    return await db.collection('dianzhahan').where({_id:event.id}).update({
      data:{
        name:event.data.name,
        workplace: event.data.workplace,
        date:event.data.date,
        floor:Number(event.data.floor),
        price:parseFloat(event.data.price),
        total:Number(event.data.total),
        income:parseFloat(event.data.income),
         isall: event.data.isall
      },
    })

  }
  catch(e){
    console.error(e)
  }
}
