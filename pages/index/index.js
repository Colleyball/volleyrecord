//index.js
var util = require('../../utils/util.js')
//获取应用实例
var app = getApp()
Page({
  data: {
    mainpic:{
      volleyball: "http://www.aibotiyu.com/ImgFiles/ABSports/matchwin/MatchRecord.png",
      basketball: "http://www.aibotiyu.com/ImgFiles/ABSports/matchwin/TeamRecord1.png",
      tool: "http://www.aibotiyu.com/ImgFiles/ABSports/matchwin/matchbox.png",
    },
    currentTab: '1',
    swiperHeight: 1700,
    userInfo: {},
    userlogin: true,
    Uid:0,
    weatherflag: true,
    aanimation: '',
    animation2: '',
    toolflag: true
  },

  /*** 滑动切换tab***/
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
    if (e.detail.current == 0) this.setData({ swiperHeight: 1700 })
    if (e.detail.current == 1) this.setData({ swiperHeight: 8800 })
    if (e.detail.current == 2) this.setData({ swiperHeight: 1500 })
    if (e.detail.current == 3) this.setData({ swiperHeight: 1000 })
  },
  /*** 点击tab切换***/
  swichNav: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current
    });
  },

  BindHelp: function () {
    var imgalist = ['https://volleywang.cn/liansaiquan/images/helpPic/1.jpg',
      'https://volleywang.cn/liansaiquan/images/helpPic/2.jpg',
      'https://volleywang.cn/liansaiquan/images/helpPic/3.jpg',
      'https://volleywang.cn/liansaiquan/images/helpPic/4.jpg']
    wx.previewImage({
      current: 0,
      urls: imgalist // 需要预览的图片http链接列表  
    })
  },

  //事件处理函数
  VolleyballOneWin: function () {
    wx.navigateTo({
      url: '../MatchRecord/MatchRecord?win=1'
    })
  },
  VolleyballTwoWin: function () {
    wx.navigateTo({
      url: '../MatchRecord/MatchRecord?win=2'
    })
  },
  VolleyballThreeWin: function () {
    wx.navigateTo({
      url: '../MatchRecord/MatchRecord?win=3'
    })
  },
  bindViewTapMatchBox: function () {
    wx.navigateTo({
      url: '../MatchBox/MatchBox'
    })
  },
  bindViewTapMatchRecord: function () {
    this.setData({ toolflag: false })
    setTimeout(function () {
      this.animation2.opacity(1).step()
      this.animation.translateY(-150).opacity(1).step()
      this.setData({
        animation: this.animation.export(),
        animation2: this.animation2.export()
      })
    }.bind(this), 300)
  },
  bindViewTapTeamRecord: function () {
    wx.navigateTo({
      url: '../TeamRecord/TeamRecord',
    })
  },
  closetool: function () {
    var that = this
    this.animation.translateY(150).opacity(0).step()
    this.animation2.opacity(0).step()
    this.setData({
      animation: this.animation.export(),
      animation2: this.animation2.export()
    })
    setTimeout(function () {
      this.setData({
        toolflag: true
      })
    }.bind(this), 500)
  },
  checkSettingStatu: function (cb) {
    var that = this;
    // 判断是否是第一次授权，非第一次授权且授权失败则进行提醒
    wx.getSetting({
      success: function success(res) {
        var authSetting = res.authSetting;
        if (isEmptyObject(authSetting)) {
          console.log('首次授权');
        } else {
          console.log('不是第一次授权', authSetting);
          // 没有授权的提醒
          if (authSetting['scope.userInfo'] === false) {
            wx.showModal({
              title: '用户未授权',
              content: '如需使用数据记录功能，请按确定并在授权管理中选中“用户信息”，然后点按确定。最后再重新进入小程序即可正常使用。',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.openSetting({
                    success: function success(res) {
                      console.log('openSetting success', res.authSetting);
                    }
                  })
                }
              }
            })
          }
        }
      }
    })
  },
  model_login: function () {
    wx.switchTab({
      url: '../User/User',
    })
  },
  Tactical: function () {
    wx.navigateTo({
      url: '../MatchBox/Tactical/Tactical',
    })
  },
  ScoreBoard: function () {
    wx.navigateTo({
      url: '../MatchBox/ScoreBoard/ScoreBoard',
    })
  },
  Coin: function () {
    wx.navigateTo({
      url: '../MatchBox/Coin/coin',
    })
  },
  
  onLoad: function () {
    console.log('onLoad')
    var that = this
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
        if (res.data.data.status == 1) {
          that.setData({
            video_status: true
          })
        } else {
          that.setData({
            video_status: false
          })
        }
      }
    })
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
    this.animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
      delay: 0,
      transformOrigin: 'left top 0'
    })
    this.animation2 = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
      delay: 0,
      transformOrigin: 'left top 0'
    })
    app.getUserInfo(
      function (userInfo) {
        //更新数据
        that.setData({
          userInfo: userInfo,
        })
        util.setpublicinfo(wx.getStorageSync('Uid'), userInfo)//插入用户公共信息
      }
    ) 
  },
  onShow: function () {
    console.log ('onShow')
    var that = this
    setTimeout(function () {
      that.setData({
        userInfo: wx.getStorageSync('userInfo')
      })
      if (!wx.getStorageSync('userInfo')) {
        that.setData({
          userlogin: false
        })
      } else {
        that.setData({
          userlogin: true
        })
      }
    }, 1000)
  },
  onLaunch:function() {
  },
  onReady:function(){
    const that = this
    that.setData({
      statusBarHeight: getApp().globalData.statusBarHeight,
      titleBarHeight: getApp().globalData.titleBarHeight
    })
  },
  onHide:function(){
    this.setData({
      userlogin: true
    })
    var that = this
    this.animation.translateY(150).opacity(0).step()
    this.animation2.opacity(0).step()
    this.setData({
      animation: this.animation.export(),
      animation2: this.animation2.export()
    })
    setTimeout(function () {
      this.setData({
        toolflag: true
      })
    }.bind(this), 500)
  },
  onShareAppMessage: function () {
    if (wx.getStorageSync('userInfo').nickName) {
      var that = this
      return {
        title: '@所有人，' + wx.getStorageSync('userInfo').nickName + '推荐了“赛事窗·杭电排球”，快来瞅瞅吧',
        desc: '点击进入赛事窗',
        path: '/pages/index/index',
      }
    } else {
      var that = this
      return {
        title: '@所以人，我推荐了“赛事窗·杭电排球”，快来瞅瞅吧',
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