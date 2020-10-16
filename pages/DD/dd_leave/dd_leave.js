// pages/DD/dd_leave/dd_leave.js
var t = require("../../../utils/util.js"),
app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    leave_status: 0
  },
  back: function() {
    wx.navigateBack()
  },
  detail: function() {
    var dd_count = wx.getStorageSync('dd_count')
    if (dd_count[0] <= 0) {
      wx.showToast({
        title: '今日使用次数已用完',
      })
      return;
    }
    var count = dd_count[0] - 1;
    var dd_count = [count, formatTime3(new Date())]
    wx.setStorageSync('dd_count', dd_count)
    wx.navigateTo({
      url: 'dd_leave_detail/dd_leave_detail',
    })
  },
  change_status: function() {
    var that = this
    this.setData({
      leave_status: !that.data.leave_status
    })
  },

  sign: function () {
    wx.navigateTo({
      url: 'dd_leave_sign/dd_leave_sign',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    set_time(that)
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

  }
})

function formatTime(date) {

  var hour = formatNumber(date.getHours() - 1)
  var minute = formatNumber(date.getMinutes())
  var second = formatNumber(date.getSeconds())

  var n = 'AM'

  if (hour > 12) {
    n = 'PM'
  }

  return hour + ':' + minute + ':' + second + ' ' + n
}

function set_time(that) {
  var time = formatTime(new Date())
  that.setData({
    time: time
  })
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatTime3(date) {
  var day = date.getDate()
  return day
}