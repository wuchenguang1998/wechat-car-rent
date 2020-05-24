// pages/product-item/product-item.js
const db = wx.cloud.database()
const product = db.collection('product')
const cart = db.collection('cart')
const comment = db.collection('comment')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productmessage:{},
    commentList:{},
    pid:0
  },
  onClickCart:function(){
    wx.switchTab({
      url: '../cart/cart',
    })
  },
  onClickAddCart:function(){
    wx.showModal({
      title: '提示',
      content: '是否加入购物车？',
      success:(res)=>{      //此处要用箭头函数！
        if (res.confirm) {      //若用户点击确定，则对购物车中的该商品进行计数。
          cart.where({
            id:this.data.productmessage.id,
            _openid:app.globalData.openId,
            isbuy:false
          }).count({
            success:(res)=>{
              if(res.total==0){     //计数结果如果为零，则向cart表插入这条数据，并显示加入购物车成功
                cart.add({
                  data:{
                    id:this.data.productmessage.id,
                    title:this.data.productmessage.title,
                    titimg:this.data.productmessage.titimg,
                    price:this.data.productmessage.price,
                    isbuy:false,
                    iscomplete:false,
                    iscomment:false
                  }
                }).then(res=>{
                  app.globalData.totalprice+=this.data.productmessage.price
                  wx.showToast({      //加入购物车成功后，将结果反馈给用户
                    title: '加入购物车成功',
                    icon: 'success',
                    duration: 800
                  })                  
                }) 
              }else{        //计数结果如果不为零，说明该条记录已经在cart表中，并提醒用户添加失败
                wx.showToast({
                  title: '请勿重复添加！',
                  icon: 'none',
                  duration: 800
                })
              }
            }
          })
        } else if (res.cancel) {
        }
      }
    })
  },
  todetail:function(){
    wx.navigateTo({
      url: '../commentdetail/commentdetail?id='+this.data.pid,    //跳转时，将当前商品的id附加到URL上传递出去
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pid=options.id;    //得到的options.id是字符类型的，因此下面要进行类型转换
    pid=parseInt(pid)
    this.setData({
      pid:pid
    })
    product.where({        //获取product表中的数据，渲染到前端
      id:pid
    }).get().then(res=>{
      this.setData({
        productmessage:res.data[0]   //得到的结果是[{....}],注意该结果的类型
      },res=>{
      })
    })
    comment.where({      //获取comment表的数据，渲染到前端
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