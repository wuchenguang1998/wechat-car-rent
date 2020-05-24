// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'test-de231'
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('comment').where({
      id:event.a,
    })
    .update({
      data: {
        commentlist: _.unshift({
          username:event.b,
          userimg:event.c,
          commentdetail:event.d
        }
      )
      },
    })
  } catch(e) {
    console.error(e)
  }
}