// pages/DD/dd_leave/dd_leave_detail/dd_leave_detail.js
// pages/DD/dd_leave/dd_leave.js
var util = require("../../../../utils/util.js"),
  app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    name: '正在加载中',
    no: '正在加载中',
    college: '正在加载中'
  },
  back: function () {
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    setInterval(function () {
      set_time(that) 
    }, 1000)
    set_date(that)
    var dd = wx.getStorageSync('dd')
    this.setData({
      name: dd[1],
      no: dd[2],
      college: dd[3]
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  }
})

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = formatNumber(date.getHours())
  var minute = formatNumber(date.getMinutes())
  var second = formatNumber(date.getSeconds())

  var n = 'AM'

  if (hour > 12) {
    n = 'PM'
  }

  return month + '月' + day + '日' + ' ' + hour + ':' + minute + ':' + second + ' ' + n
}

function formatTime2(date) {
  var year = date.getFullYear()
  var month = formatNumber(date.getMonth() + 1)
  var day = formatNumber(date.getDate())

  return year + '/' +month + '/' + day
}

function set_time (that) {
  var time = formatTime(new Date())
  that.setData({
    time: time
  })
}

function set_date(that) {
  var date = formatTime2(new Date())
  that.setData({
    date: date
  })
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}