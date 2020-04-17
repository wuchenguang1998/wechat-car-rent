// pages/answer/answer.js
const db = wx.cloud.database()
const answer = db.collection('answer')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: ['1']
  },
  onChange(event) {    //监听点击事件，对栏目进行打开和收回
    this.setData({
      activeNames: event.detail
    });
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    answer.get().then(res=>{    //将answer集合的问答数据渲染到前端
      this.setData({
        answerList:res.data
      })
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