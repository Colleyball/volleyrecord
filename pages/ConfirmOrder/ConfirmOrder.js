// pages/ConfirmOrder/ConfirmOrder.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_result_1:0,
    show_result_2:0,
    show_address_table: 0,
    statusBarHeight: app.globalData.statusBarHeight,
  },
  bindBack: function() {
    wx.navigateBack()
  },
  bindCoupon: function() {
    var that = this
    wx.redirectTo({
      url: '/pages/Order/Coupon/Coupon?coupon_id=' + that.data.return_id + '&goods_id=' + that.data.goods_id,
    })
  },
  BindConfirm: function() {
    var that = this
    wx.showModal({
      title: '提示',
      content: '点击确认进行兑换',
      complete: (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '兑换中...',
          })
          wx.request({
            url: 'https://niko.game-win.cn/api/PayGoods',
            header: {
              "content-type": "application/json;charset=utf8"
            },
            method: "GET",
            data: {
              uid: wx.getStorageSync('Uid'),
              id: that.data.goods_id,
              point: that.data.GoodsInfo.price,
              type: that.data.GoodsInfo.type
            },
            success: function (res) {
              wx.hideLoading()
              console.log(res.data)
              if (res.data.data) {
                that.setData({
                  show_result_1: 1,
                  return_id: res.data.data
                })
              } else {
                that.setData({
                  show_result_2: 1,
                })
              }
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this
    this.setData({
      goods_id: options.goods_id,
      user_point: options.user_point
    })
    wx.request({
      url: 'https://niko.game-win.cn/api/GetGoodsDetails',
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
        id: options.goods_id
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          GoodsInfo: res.data.data
        })
      }
    })
  },
  onShow() {
    console.log ('onShow')
    var that = this
    wx.request({
      url: 'https://niko.game-win.cn/api/SetMarket',
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          show_address_table: res.data.data
        })
      }
    })
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})