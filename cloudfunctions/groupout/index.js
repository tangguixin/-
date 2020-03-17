
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
  try {
    return await db.collection('dianzhahan').aggregate()
      .match({
      })
      .group({
        _id: {
          name: '$name'
        },
        result: $.sum('$outcome')
      }).sort({ totalSales: -1, })
      .end()
  } catch (e) {
    console.error(e)
  }
}

