// pages/video/videolist/videolist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    videotype:''
  },
  player:function(e) {
    if (e.currentTarget.dataset.link) {
      var title = e.currentTarget.dataset.teama + '-' + e.currentTarget.dataset.teamb
      wx.navigateTo({
        url: '../player/player?title=' + title + '&link=' + e.currentTarget.dataset.link + '&qqvideo=' + e.currentTarget.dataset.qqvideo + '&group=' + e.currentTarget.dataset.group,
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '视频正在制作，稍后再来吧~',
        showCancel: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.setNavigationBarTitle({
      title: '赛事窗·视频 ' + decodeURIComponent(options.title),
    })
    that.setData({
      title: decodeURIComponent(options.title),
      videotype: options.type
    })
    wx.request({
      url: 'https://volleywang.cn/index.php/VolleyData/getvideoinfo',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        video_type: options.type
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          videolist: res.data.data
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
    var that = this
    if (wx.getStorageSync('userInfo').nickName) {
      return {
        title: '[视频列表] @所有人，' + wx.getStorageSync('userInfo').nickName + '分享了' + that.data.title,
        desc: '点击进入赛事窗',
        path: 'pages/video/videolist/videolist?title=' + that.data.title + '&type=' + that.data.videotype,
      }
    } else {
      return {
        title: '[视频列表] @所有人，我分享了' + that.data.title,
        desc: '点击进入赛事窗',
        path: 'pages/video/videolist/videolist?title=' + that.data.title + '&type=' + that.data.videotype,
      }
    }
  }
})