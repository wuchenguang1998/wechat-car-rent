// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'test-de231'
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('user').where({
      _openid:event.a
    })
    .update({
      data: {
        gold: event.b
      },
    })
  } catch(e) {
    console.error(e)
  }
}