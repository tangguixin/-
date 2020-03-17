// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({})

const db = cloud.database();

const ncovCollection = db.collection('dianzhahan');

const TcbRouter = require('tcb-router');

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({ event });
  const wxContext = cloud.getWXContext()

  app.router('total', async (ctx, next) => {
    ctx.body = await ncovCollection
      .count()
      .then(res => {
        return res;
      })
  })

  app.router('total1', async (ctx, next) => {
    let _where = {};
    if (wxContext.OPENID) {
      _where._openid = wxContext.OPENID;
    }
    ctx.body = await ncovCollection
      .where(_where)
      .count()
      .then(res => {
        return res;
      })
  })

  app.router('find', async (ctx, next) => {
    let _where = {};

    if (event.condition.date) {
      _where.date = db.RegExp({
        regexp:event.condition.date,
        options: 'i',
      })
    }
    if (wxContext.OPENID) {
      _where._openid = wxContext.OPENID;
    }

    if (event.condition.no) {
      _where.workplace = db.RegExp({
        regexp: event.condition.no,
        options: 'i',
      })
    }


    ctx.body = await ncovCollection
      .where(_where)
      .skip(event.start)
      .limit(event.count)
      .orderBy('tijiaodate', 'desc')
      .get()
      .then((res) => {
        return res;
      })
  })
  app.router('search', async (ctx, next) => {
    let _where = {};

    if (event.condition.date) {
      _where.date = event.condition.date;
    }
    if (event.condition.name) {
      _where.name = db.RegExp({
        regexp: event.condition.name,
        options: 'i',
      })
    }

    if (event.condition.no) {
      _where.workplace = db.RegExp({
        regexp: event.condition.no,
        options: 'i',
      })
    }


    ctx.body = await ncovCollection
      .where(_where)
      .skip(event.start)
      .limit(event.count)
      .orderBy('date', 'desc')
      .orderBy('tijiaodate', 'desc')
      .get()
      .then((res) => {
        return res;
      })
  })

  app.router('detail', async (ctx, next) => {
    ctx.body = await ncovCollection
      .doc(event.id)
      .get()
      .then((res) => {
        return res;
      })
  })



  return app.serve();
}