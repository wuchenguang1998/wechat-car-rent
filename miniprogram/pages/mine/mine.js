// pages/mine/mine.js
const app = getApp()
const db = wx.cloud.database()
const user = db.collection('user')
const _=db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  postgold:function(){         //查询数据库，将用户的金币余额进行渲染
    user.where({
      _openid:app.globalData.openid
    }).field({
      gold:true
    }).get().then(res=>{
      this.setData({
        gold:res.data[0].gold
      })
    })
  },
  toOrder:function(){       //跳转到订单页面
    wx.navigateTo({
      url: '../order/order',
    })
  },
  toRecharge:function(){     //跳转当充值页面
    wx.navigateTo({
      url: '../recharge/recharge',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.postgold()      //调用postgold函数，页面加载即更新金币数目
    this.setData({       //获取全局数据中的用户信息，并渲染到前端
      userimg:app.globalData.info.avatarUrl,
      username:app.globalData.info.nickName
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.postgold()      //调用postgold函数，页面显示即更新金币数目
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})