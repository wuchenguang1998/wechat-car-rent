//index.js
const app = getApp()
const db = wx.cloud.database()
const user = db.collection('user')
const product = db.collection('product')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  showitem:function(e){
    var id=e.currentTarget.id
    wx.navigateTo({
      url: '../product-item/product-item?id='+id,
    })
  },

  getOpenid:function() {  //通过云函数获取用户的openid，并保存到全局变量中。若数据库中没有该用户信息，则把其更新到数据库
    let that = this;
    wx.cloud.callFunction({
     name: 'getOpenid',
     complete: res => {
      console.log('云函数获取到的openid: ', res.result.openId)
      var openid = res.result.openId;
      app.globalData.openId=openid
      console.log('openid: ', app.globalData.openId)

      user.where({
        _openid: res.result.openId   // 当前用户 openid
      }).count({
        success: function(res) {
          console.log("总数为",res.total)
          if(res.total==0){
            user.add({
              data:{
                name:app.globalData.info.nickName,
                gold:0
              }
            })
          }
        }
      })
     }
    })
   },
   showanswer:function(){   //跳转到问答页面
     wx.navigateTo({
       url: '../answer/answer',
     })
   },
   postProduct:function(){     //将product表的前12条数据渲染到前端
     product.limit(12).get().then(res=>{
      this.setData({
        productList:res.data
      })
    })
   },
   showall:function(){        //跳转到全部车型页面
     wx.navigateTo({
       url: '../allproduct/allproduct',
     })
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOpenid();      //在页面加载时即获取用户的openid
    this.postProduct();
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
    product.limit(12).get().then(res=>{     //为防止product表的数据有变，下拉刷新会更新相应数据
      this.setData({
        productList:res.data
      },res=>{
        wx.stopPullDownRefresh()//更新完成即可立刻收回去，用户体验会更好
      })
    })
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
