// pages/commentdetail/commentdetail.js
const db = wx.cloud.database()
const comment = db.collection('comment')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentList:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pid=options.id;    //得到的options.id是字符类型的，因此下面要进行类型转换
    pid=parseInt(pid);
    comment.where({         //获取comment表的数据，渲染到前端
      id:pid
    }).get().then(res=>{
      this.setData({
        commentList:res.data[0].commentlist   //得到的结果是[{....}],注意该结果的类型
      },res=>{
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