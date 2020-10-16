// pages/4Volley/4Volley.js
var util = require("../../utils/util.js"),
app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight
  },
  bindViewTapMatch: function () {
    var that = this
    if (that.data.Fvolley_status == 1) {
      wx: wx.navigateTo({
        url: 'SignUp/SignUp?name=' + that.data.Fvolley_user.name + '&school=' + that.data.Fvolley_user.school_no + '&uid=' + that.data.Fvolley_user.uid,
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '你还未完善参赛信息，点击确认填写参赛信息',
        cancelText: '仅浏览',
        success: function (e) {
          if (e.confirm) {
            wx.navigateTo({
              url: 'PersonalInfo/PersonalInfo',
            })
          }
        }
      })
    }
  },
  Admin: function () {
    wx.navigateTo({
      url: 'administrator/login/login',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var TIME = util.formatTime(new Date())
    var time = parseInt(TIME.substr(11,2))
    if (time > 17) {
      var match_date = '明天'
    } else {
      var match_date = '今天'
    }
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
      time: time,
      match_date: match_date
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
    get_user_status(this)
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

function get_user_status (that) {
  wx.request({
    url: "https://api.volleywang.cn/4volley/UserStatus",
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    method: "POST",
    data: {
      uid: wx.getStorageSync("Uid")
    },
    success: function (res) {
      console.log(res.data)
      if (res.data.data.length == 0) {
        that.setData({
          Fvolley_status: 0,
          Fvolley_user: ''
        })
        wx.showModal({
          title: '提示',
          content: '你还未完善参赛信息，点击确认填写参赛信息',
          cancelText: '仅浏览',
          success: function (e) {
            if (e.confirm) {
              wx.navigateTo({
                url: 'PersonalInfo/PersonalInfo',
              })
            }
          }
        })
      } else {
        that.setData({
          Fvolley_status: 1,
          Fvolley_user: res.data.data
        })
      }
      
    }
  })
}