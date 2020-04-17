// pages/class/class.js
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
const db = wx.cloud.database()
const product = db.collection('product')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0
  },
  onChange(event) {      //监听点击事件，标识所点击的是哪个分类
    var e=event.detail+1;
    product.where({
      classid:e
    }).get().then(res=>{
      this.setData({
        productList:res.data
      })
    })
  },
  showitem:function(e){   //已经提及，不再赘述
    var id=e.currentTarget.id
    wx.navigateTo({
      url: '../product-item/product-item?id='+id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    product.where({
      classid:1
    }).get().then(res=>{
      this.setData({
        productList:res.data
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