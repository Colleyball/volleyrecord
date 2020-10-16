// pages/DD/dd_index.js
var t = require("../../utils/util.js"),
app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight
  },
  leave: function () {
    wx.navigateTo({
      url: 'dd_leave/dd_leave',
    })
  },
  back: function () {
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    var dd = wx.getStorageSync('dd')
    var dd_count = wx.getStorageSync('dd_count')
    if (!dd[0]) {
      wx.showModal({
        title: '提示',
        content: '首次使用，请阅读使用说明，并填写用户信息',
        cancelText: '返回主页',
        success: function (res) {
          if (res.cancel) {
            wx.redirectTo({
              url: '/pages/index/index',
            })
          } else {
            wx.navigateTo({
              url: 'dd_setting/dd_setting',
            })
          }
        }
      })
    }
    if (dd_count) {
      if (dd_count[1] != formatTime(new Date())) {
        var dd_count = [2, formatTime(new Date())]
        wx.setStorageSync('dd_count', dd_count)
      }
    }

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

  }
})

function formatTime(date) {
  var day = date.getDate()
  return day
}