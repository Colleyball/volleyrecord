// pages/Statistic/Result/Result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    matchid:0,
    imgalist: ['https://volleywang.cn/liansaiquan/images/pay.jpg']
  },
  back: function(res) {
    wx.switchTab({
      url: '../../index/index',
    })
  },
  BindFav: function() {
    var that = this
    wx.showModal({
      title: '提示',
      content: '感谢你的支持，赏赞将用于服务器租用、小程序日常维护成本。',
      showCancel:false,
      success: function (res) {
        if (res.confirm) {
          wx.previewImage({
            current: 0,
            urls: that.data.imgalist // 需要预览的图片http链接列表  
          })  
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var matchid = options.matchid
    that.setData({
      matchid: options.matchid
    })
    wx.request({
      url: 'https://volleywang.cn/index.php/VolleyData/getonematchinfo',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        matchid: matchid
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          matchinfo: res.data.data
        })
      }
    })
    wx.request({
      url: 'https://volleywang.cn/index.php/VolleyData/getstatistic',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        matchid: matchid
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          statistic: res.data.data
        })
      }
    })
    wx.request({
      url: 'https://volleywang.cn/index.php/VolleyData/getteamstatistic',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        matchid: matchid
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          teamstatistic: res.data.data
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    if (wx.getStorageSync('userInfo').nickName) {
      var that = this
      return {
        title: '@所有人，' + wx.getStorageSync('userInfo').nickName + '分享了一场比赛数据',
        desc: '点击进入赛事窗',
        path: 'pages/Data/Statistic/Statistic?matchid=' + that.data.matchid,
      }
    } else {
      var that = this
      return {
        title: '@所以人，我分享了一场比赛数据',
        desc: '点击进入赛事窗',
        path: 'pages/Data/Statistic/Statistic?matchid=' + that.data.matchid,
      }
    }
  }
})