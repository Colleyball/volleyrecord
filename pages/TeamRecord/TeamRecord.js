const util = require('../../utils/util.js')

Page({
  data: {
    MatchName:'',
    TeamAName: '……',
    TeamBName: '……'
  },
  ChooseTeam:function () {
    wx.navigateTo({
      url: 'ChooseTeam/ChooseTeam',
    })
  },
  GetMatchName: function (e) {
    this.setData({
      MatchName: e.detail.value
    })
  },
  GetMatchLocation: function (e) {
    this.setData({
      MatchLocation: e.detail.value
    })
  },
  GetTeamBName: function (e) {
    this.setData({
      TeamBName: e.detail.value
    })
  },
  BindConfirm: function () {
    var that = this
    if (this.data.Start == 0) {
      wx.showModal({
        title: '提示',
        content: '比赛信息填写不完整',
        showCancel: false
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '正在开发的功能…',
        showCancel: false
      })
      /*
      wx.showModal({
        title: '提示',
        content: '请确认信息填写正确',
        confirmText: '开始比赛',
        cancelText: '返回修改',
        success: function (res) {
          if (res.confirm) {
            var matchinfo = new Array()
            matchinfo.push(that.data.MatchName)
            matchinfo.push(that.data.TeamAName)
            matchinfo.push(that.data.TeamBName)
            matchinfo.push(that.data.MatchLocaction)
            matchinfo.push(util.formatTime(new Date))
            wx.setStorageSync('Matchinfo', matchinfo)
            wx.navigateTo({
              url: 'MatchProcess/MatchProcess',
            })
          }
        }
      })*/
    }
  },

  onLoad: function (option) {
    if (option.teamname) {
      this.setData({
        TeamAName: option.teamname
      })
    }

    if (!wx.getStorageSync('userInfo')) {
      wx.showModal({
        title: '提示',
        content: '使用数据记录功能需要获取您的公开信息（昵称、头像等），请返回重试',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.navigateBack()
          }
        }
      })
    }
    if (wx.getStorageSync('Status') == 1 || wx.getStorageSync('Status') == 2 || wx.getStorageSync('Status') == 5) {
      wx.showModal({
        title: '提示',
        content: '是否载入未结束的比赛',
        success: function (res) {
          if (res.confirm) {
            if (wx.getStorageSync('win') == 1) {
              wx.navigateTo({
                url: '../DurationMatchOne/DurationMatchOne',
              })
            }
            if (wx.getStorageSync('win') == 2) {
              wx.navigateTo({
                url: '../DurationMatch/DurationMatch',
              })
            }
            if (wx.getStorageSync('win') == 3) {
              wx.navigateTo({
                url: '../DurationMatchThree/DurationMatchwinThree',
              })
            }
          }
          if (res.cancel) {
            var Uid = wx.getStorageSync('Uid')
            var userInfo = wx.getStorageSync('userInfo')
            wx.clearStorage()
            setTimeout(function () {
              wx.setStorageSync('Uid', Uid)
              wx.setStorageSync('userInfo', userInfo)
            }, 1000)
            wx.navigateBack()
          }
        }
      })
    }
  }

})
