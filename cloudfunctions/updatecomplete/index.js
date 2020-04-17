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
    return await db.collection('cart').where({
      _openid:event.a,
      isbuy:true,
      iscomplete:false
    })
    .update({
      data: {
        iscomplete: true
      },
    })
  } catch(e) {
    console.error(e)
  }
}