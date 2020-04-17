// pages/order/order.js
const app = getApp()
const db = wx.cloud.database()
const cart = db.collection('cart')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    isShow:true
  },
  showitem:function(e){
    var id=e.currentTarget.id
    wx.navigateTo({
      url: '../product-item/product-item?id='+id,
    })
  },
  showuncomplete:function(){    //查找该用户已经购买但并未完成上车操作的订单，并渲染到前端的"未完成"页面
    cart.where({
      _openid:app.globalData.openId,
      isbuy:true,
      iscomplete:false
    }).get().then(res=>{
      this.setData({
        uncompleteList:res.data
      })
    })
  },
  showcompleted:function(){       //查找该用户已经购买并完成上车操作的订单，并渲染到前端的"已完成"界面
    cart.where({
      _openid:app.globalData.openId,
      isbuy:true,
      iscomplete:true
    }).get().then(res=>{
      this.setData({
        completedList:res.data
      })
    })
  },
  onChange:function(event){     //监听点击事件，并对相应数据再次更新
    if(event.detail.name==0){
      this.showuncomplete()
      this.setData({         //使下方的"点击确认提车"按钮显示
        isShow:true
      })
    }else{
      this.showcompleted()
      this.setData({        //使下方的"点击确认提车"按钮隐藏
        isShow:false
      })
    }
  },
  addcomplete:function(){    //弹出模态框，若点击确认，则调用云函数对相应订单进行更新，将iscomplete字段置为false，随后更新当前页的数据
    wx.showModal({
      title: '提示',
      content: '请确认提车成功',
      success:(res)=>{
        if (res.confirm) {
          wx.cloud.callFunction({
            name:'updatecomplete',
                  data:{
                    a:app.globalData.openId,
                  },success:res=>{
                    wx.showToast({
                      title: '确认成功！',
                      icon: 'success',
                      duration: 800
                    })
                    this.showuncomplete()
                  }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onClickButton:function(){      //监听点击事件，如果该"未完成"页面为空，则不执行任何操作，否则调用addcomplete处理未完成的订单
    cart.where({
      _openid:app.globalData.openId,
      isbuy:true,
      iscomplete:false
    }).count({
      success:res=>{
        if(res.total>0){
          this.addcomplete()
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.showuncomplete()
    this.showcompleted()
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