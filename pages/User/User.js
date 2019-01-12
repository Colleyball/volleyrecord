// pages/User/User.js
var util = require('../../utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    Uid:'',
    login: true
  },
  History:function() {
    wx.navigateTo({
      url: 'History/History'
    })
  },
  Sign: function () {
    wx.navigateTo({
      url: 'Sign/Sign'
    })
  },
  Setting: function () {
    wx.navigateTo({
      url: 'Setting/Setting?id=' + this.data.Uid
    })
  },
  GetStatistic: function () {
    wx.showModal({
      title: '提示',
      content: '你已进入隐藏功能，点击确认开始尝试找回未上传的比赛数据',
      success:function(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../EndMatch/EndMatch',
          })
        }
        if (res.cancel) {

        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    var that = this
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      that.setData({
        userInfo: e.detail.userInfo,
      })
      util.setpublicinfo(wx.getStorageSync('Uid'), e.detail.userInfo)
      wx.setStorageSync('userInfo', e.detail.userInfo)
      //用户按了允许授权按钮
      that.setData({
        login: true
      })
      wx.switchTab({
        url: '../index/index',
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '提示',
        content: '如需使用用户中心的全部功能(比赛数据、关注的球队)，赛事窗需要获取您的昵称和头像，点击确认重新登录',
        showCancel: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSetting({
      success: function success(res) {
        var authSetting = res.authSetting;
        if (isEmptyObject(authSetting)) {
          that.setData({
            login: false
          })
          console.log('首次授权');
        } else {
          console.log('不是第一次授权', authSetting);
          // 没有授权的提醒
          app.getUserInfo()
          if (!wx.getStorageSync('userInfo')) {
            that.setData({
              login: false
            })
          }
        }
      }
    })
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          userInfo: res.data,
        })
      }
    })
    wx.getStorage({
      key: 'Uid',
      success: function (res) {
        that.setData({
          Uid: res.data
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
  onShareAppMessage: function () {
    var that = this
    if (wx.getStorageSync('userInfo').nickName) {
      var that = this
      return {
        title: '@所有人，' + wx.getStorageSync('userInfo').nickName + '向你推荐了“赛事窗·比赛数据记录”，快来瞅瞅吧',
        desc: '点击进入赛事窗',
        path: '/pages/index/index',
      }
    } else {
      var that = this
      return {
        title: '@所有人，向你推荐了“赛事窗·比赛数据记录”，快来瞅瞅吧',
        desc: '点击进入赛事窗',
        path: '/pages/index/index',
      }
    }
  }
})

function isEmptyObject(e) {
  var t;
  for (t in e)
    return !1;
  return !0
}
