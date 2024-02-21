// pages/ConfirmOrder/ConfirmOrder.js
var app = getApp();
const QR = require('../../../utils/weapp-qrcode.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
  },
  bindBack: function() {
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this
    this.setData({
      goods_id: options.goods_id,
      coupon_id: options.coupon_id
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
    var imgData = QR.drawImg('12734', {
      typeNumber: 4,
      errorCorrectLevel: 'M',
      size: 500
    })
    this.setData({
      QRcode: imgData
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
    return {
      title: "杭州尼克之星自行车队",
      desc: "点击参与卷王挑战赛",
      path: "/pages/index/index",
      imageUrl: "/images/share.jpg"
    };
  }
})