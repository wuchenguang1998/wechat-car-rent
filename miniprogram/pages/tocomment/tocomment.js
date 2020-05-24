// pages/tocomment/tocomment.js
const app = getApp()
const db = wx.cloud.database()
const comment = db.collection('comment')
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pid:0
  },
  bindFormSubmit:function(e){
    if(!e.detail.value.textarea){       //若用户提交前没有填写评价，则终止操作
      return
    }else{       //若用户提交前已经填写好评价，则将其上传
      wx.showModal({
        title: '提示',
        content: '是否提交该评价',
        success:(res)=>{
          if (res.confirm) {
            wx.cloud.callFunction({    //用户确认提交后，将相关信息传递给云函数并调用，对comment表进行更新操作
              name:'updatecomment',
              data:{
                a:this.data.pid,
                b:app.globalData.info.nickName,
                c:app.globalData.info.avatarUrl,
                d:e.detail.value.textarea
              },success:res=>{
                db.collection('cart').where({    //更新comment表成功后，将对应的iscomment字段置为true
                  _openid:app.globalData.openId,
                  id:this.data.pid
                }).update({
                  data: {
                    iscomment:true
                  }
                })
                wx.showToast({      //随后显示提交成功，并且跳转到order页面
                  title: '提交成功',
                }).then(res=>{
                  wx.redirectTo({
                    url: '../order/order',
                  })
                })
              }
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pid=options.id;    //得到的options.id是字符类型的，因此下面要进行类型转换
    pid=parseInt(pid);
    this.setData({
      pid:pid
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