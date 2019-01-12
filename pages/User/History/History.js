// pages/User/History/History.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  BindMatchInfo: function (e) {
    wx.navigateTo({
      url: '../../Data/Statistic/Statistic?matchid=' + e.currentTarget.dataset.matchid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://volleywang.cn/index.php/VolleyData/getmatchinfo',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        uid:wx.getStorageSync('Uid')
      },
      success: function (res) {
        console.log (res.data)
        that.setData({
          matchinfo: res.data.data
        })
      }
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