// pages/DD/dd_leave/dd_setting/dd_setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: "0",
    swiperHeight: 1200
  },
  bindChange: function(a) {
    this.setData({
      currentTab: a.detail.current
    })
    if (a.detail.current == 0) {
      this.setData({
        swiperHeight: 1200
      })
    }
    if (a.detail.current == 1) {
      this.setData({
        swiperHeight: 1200
      })
    }
  },
  swichNav: function(a) {
    this.setData({
      currentTab: a.target.dataset.current
    });
  },
  GetName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  GetNo: function (e) {
    this.setData({
      no: e.detail.value
    })
  },
  GetCollege: function (e) {
    this.setData({
      college: e.detail.value
    })
  },
  BindConfirm: function () {
    var dd = [1, this.data.name, this.data.no, this.data.college]
    wx.setStorageSync('dd', dd)
    var dd_count = [2, formatTime(new Date())]
    wx.setStorageSync('dd_count', dd_count)
    wx.showToast({
      title: '保存成功',
      success: function(res){
        wx.navigateBack()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var dd_count = wx.getStorageSync('dd_count')
    if (dd_count) {
      dd_count = dd_count[0]
    } else {
      dd_count = '未生效'
    }
    this.setData({
      dd_count: dd_count
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
  var day = date.getDate()
  return day
}