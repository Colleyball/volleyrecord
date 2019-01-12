// pages/video/video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoinfo: [],
    recommand_video: [],
    tip_content: '正在加载中……'
  },

  PlayVideo: function (e) {
    wx.navigateTo({
      url: 'player/player?title=' + e.currentTarget.dataset.title + '&link=' + e.currentTarget.dataset.link + '&qqvideo=' + e.currentTarget.dataset.qqvideo + '&group=' + e.currentTarget.dataset.group,
    })
  },
  VideoList: function (e) {
    wx.navigateTo({
      url: 'videolist/videolist?type=' + e.currentTarget.dataset.type + '&title=' + e.currentTarget.dataset.title,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://volleywang.cn/index.php/VolleyData/getvideolist',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          videoinfo: res.data.data
        })
      }
    })
    wx.request({
      url: 'https://volleywang.cn/index.php/VolleyData/getvideorecommand',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          recommand_video: res.data.data
        })
      }
    })
    wx.request({
      url: 'https://volleywang.cn/index.php/VolleyData/getvideostatus',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          tip_content: res.data.data.tip_content
        })
        if (res.data.data.status == 1) {
          that.setData({
            video_status: true
          })
        } else {
          that.setData({
            video_status: false
            //video_status: true
          })
        }
        wx.setNavigationBarTitle({
          title: res.data.data.navagation_bar,
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
        title: '[视频] @所有人，' + wx.getStorageSync('userInfo').nickName + '分享了[赛事窗·视频]',
        desc: '点击进入赛事窗',
        path: 'pages/video/video'
      }
    } else {
      return {
        title: '[视频] @所有人，我分享了[赛事窗·视频]',
        desc: '点击进入赛事窗',
        path: 'pages/video/video'
      }
    }
  }
})