// pages/Order/Order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var that = this
    wx.request({
      url: 'https://niko.game-win.cn/api/GetUserGoods',
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
        uid: wx.getStorageSync('Uid')
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          UserGoods: res.data.data
        })
      }
    })
    
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
  bindCoupon: function(e) {
    var goods_id = e.currentTarget.dataset.goods_id
    var coupon_id = e.currentTarget.dataset.coupon_id
    wx.navigateTo({
      url: 'Coupon/Coupon?goods_id='+goods_id+'&coupon_id='+coupon_id,
    })
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