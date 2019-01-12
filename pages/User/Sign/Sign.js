// pages/User/Sign/Sign.js
const util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  Sign: function (e) {
    var time = util.formatTime(new Date)
    var day = time[8] + time[9]
    var that = this
    wx.scanCode({
      success: (res) => {
        console.log(res.result)
        if (res.result) {
          wx.request({
            url: 'https://volleywang.cn/index.php/VolleyData/set_student_sign',
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
              id: res.result,
              sign_type: e.currentTarget.dataset.type,
              time: util.formatTime(new Date),
              date: day
            },
            success: function (res) {
              console.log(res.data)
              if (res.data.success) {
                wx.showToast({
                  title: '签到成功',
                  icon: 'success',
                  image: '',
                  duration: 1500,
                  mask: true,
                  success: function(res) {},
                  fail: function(res) {},
                  complete: function(res) {
                    wx.redirectTo({
                      url: '../Sign/Sign',
                    })
                  },
                })
              } else {
                wx.showModal({
                  title: '提示',
                  content: '今日已签到',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      wx.redirectTo({
                        url: '../Sign/Sign',
                      })
                    }
                  }
                })
              }
            }
          })
        }
      }
    })
  },
  Check: function () {
    wx.navigateTo({
      url: 'check/check',
    })
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