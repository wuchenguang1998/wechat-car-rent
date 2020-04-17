// pages/allproduct/allproduct.js
const db = wx.cloud.database()
const product = db.collection('product')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:0
  },
  showitem:function(e){      //标识点击的是哪个商品，将商品id附加到URL上，传给product-item
    var id=e.currentTarget.id
    wx.navigateTo({
      url: '../product-item/product-item?id='+id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    product.get().then(res=>{    //页面加载时就渲染数据
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
    let page=0    //把page再次重置
    product.get().then(res=>{
      this.setData({
        productList:res.data,
        page:page
      },res=>{
        console.log("yes!")
        wx.stopPullDownRefresh()        //更新完成即可立刻收回去，用户体验会更好
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {     //触底后继续跳过原有的20条数据，将后续的数据渲染到前端
    let page=this.data.page+20
    product.skip(page).get().then(res=>{
      let new_data=res.data
      let old_data=this.data.productList
      this.setData({
        productList:old_data.concat(new_data),
        page:page
      },res=>{
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})