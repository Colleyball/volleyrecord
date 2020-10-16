// pages/DD/dd_leave/dd_leave.js
var t = require("../../../utils/util.js"),
  app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    imgalist: ["http://www.aibotiyu.com/ImgFiles/ABSports/matchwin/video/player/pay.png"]
  },
  BindDD:function () {
    var dd_count = this.data.dd_count
    if (dd_count) {
      if (dd_count > 0) {
        wx.navigateTo({
          url: '../dd_index',
        })
      }
      if (dd_count == 0) {
        wx.showModal({
          title: '提示',
          content: '今天使用次数已用完',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.redirectTo({
                url: '/pages/index/index',
              })
            }
          }
        })
      }
      if (dd_count == '未生效') {
        wx.showModal({
          title: '提示',
          content: '请先编辑个人信息',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../dd_setting/dd_setting',
              })
            }
          }
        })
      }
    }
  },
  BindEdit: function() {
    wx.navigateTo({
      url: '../dd_setting/dd_setting',
    })
  },
  BindMoney: function() {
    var t = this;
    wx.previewImage({
      current: 0,
      urls: t.data.imgalist
    });
  },
  ADDcount: function () {
    if (this.data.dd_count != "未生效") {
      var dd_count = [2, formatTime(new Date())]
      wx.setStorageSync('dd_count', dd_count)
      this.setData({
        dd_count: dd_count[0]
      })
    }
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
    var dd_count = wx.getStorageSync('dd_count')
    if (dd_count) {
      dd_count =  dd_count[0]
    } else {
      dd_count =  '未生效'
    }
    this.setData({
      dd_count: dd_count
    })
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
    return {
      title: "HDU离校请假二维码",
      desc: "点击进入赛事窗",
      path: "pages/index/index"
    }
  }
})

function formatTime(date) {
  var day = date.getDate()
  return day
}