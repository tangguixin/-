const cloud = require('wx-server-sdk')
cloud.init({
})
const db = cloud.database()


exports.main = async (event, context) => {

  // return new Promise((resolve, reject) => {

  try {

    return await db.collection('users').doc(event.id).update({
      

      data: {
        name: event.name
  
      }

    })

  } catch (e) {

    console.log(e)

  }

}