// pages/cart/cart.js
const app = getApp()
const db = wx.cloud.database()
const cart = db.collection('cart')
const user = db.collection('user')
const _=db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalprice:0,
    arr:[]
  },
  showitem:function(e){       //标识点击的是哪个商品，将商品id附加到URL上，传给product-item
    var id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../product-item/product-item?id='+id,
    })
  },
  compute:function(){     //对订单栏目渲染到界面，并对总价进行计算
    cart.where({
      _openid:app.globalData.openId,     //获取全局变量中存放的openid
      isbuy:false
    }).get().then(res=>{
      this.setData({
        arr:res.data,
        productList:res.data
      },res=>{
        var total=0;
        for(var i=0;i<this.data.arr.length;i++){
          total+=this.data.arr[i].price
        }
        this.setData({
          totalprice:total
        })
      })
    })
  },
  deleteproduct:function(e){      //监听长按事件，让用户执行商品删除操作
    wx.showModal({
      title: '提示',
      content: '是否删除商品',
      confirmText:'是',
      cancelText:'还是算了',
      success:(res)=> {
        if (res.confirm) {           //若用户确认删除，则对数据库对应数据进行删除，并调用compute()重新渲染数据
          cart.doc(e.currentTarget.id).remove({    //居然是e.currentTarget.id而不是e.currentTarget._id
            success:res=>{
              wx.showToast({
                title: '删除成功！',
                icon: 'none',
                duration: 800
              })
              this.compute()
            }
          })
        } else if (res.cancel) {
        }
      }
    })    
  },
  trueSubmit:function(){       //用户提交订单函数
    var gold=0
    user.where({
      _openid:app.globalData.openid
    }).field({
      gold:true
    }).get().then(res=>{
      gold=res.data[0].gold        //先获得用户所拥有的的金币数
    })
    wx.showModal({
      title: '提示',
      content: '是否提交订单',
      success:(res)=>{
        if (res.confirm) {           //当点击确认时
          if(gold<this.data.totalprice){     //当计算出余额不足时，提醒用户余额不足
            wx.showToast({
              title: '余额不足！',
              icon: 'none',
              duration: 800
            })
          }else{                  //当计算出余额充足时，将cart表中的isbuy置为true，并将user表的金币余额进行更新
            wx.cloud.callFunction({
              name:'updatebuy',
              data:{
                a:app.globalData.openId
              },success:res=>{
                gold-=this.data.totalprice
                wx.cloud.callFunction({
                  name:'updategold',
                  data:{
                    a:app.globalData.openId,
                    b:gold
                  },success:res=>{
                  }
                })
                wx.showToast({
                  title: '购买成功！',
                  icon: 'success',
                  duration: 800
                })
                this.compute()
              }
            })
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onSubmit:function(){
    if(this.data.totalprice==0) return;      //当购物车为空时，中止执行该方法
    cart.where({
      _openid:app.globalData.openId,
      isbuy:true,
      iscomplete:false
    }).count({
      success:res=>{
        if(res.total>0){       //当用户还有订单未完成时，提醒用户"不能太贪心"
          wx.showToast({
            title: '不能太贪心哦！',
            icon: 'none',
            duration: 800
          })
        }else{           //若用户符合下单条件，才调用trueSubmit()
          this.trueSubmit()
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.compute()
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
    this.compute()        //监听页面显示，对原有数据进行更新，增加用户体验
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