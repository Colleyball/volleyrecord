// pages/Rank/Rank.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  bindChangGender: function () {
    if (this.data.current_gender == 1) {
      this.setData({
        current_gender : 2
      })
    } else {
      this.setData({
        current_gender : 1
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({
      current_month: options.month
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow(e) {
    var that = this

    wx.request({
      url: 'https://niko.game-win.cn/api/GetRank',
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          Rank: res.data.data
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "卷王排行版",
      desc: "点击参与卷王挑战赛",
      path: "/pages/Rank/Rank"
    };
  }
})