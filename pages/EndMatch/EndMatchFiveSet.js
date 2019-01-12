// pages/EndMatch/EndMatch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Matchinfo: [],
    Scoreinfo: []

  },
  back: function () {
    var Uid = wx.getStorageSync('Uid')
    var userInfo = wx.getStorageSync('userInfo')
    wx.showModal({
      title: '提示',
      content: '确认放弃本场比赛数据吗？',
      success: function (res) {
        if (res.confirm) {
          wx.clearStorage()
          setTimeout(function () {
            wx.setStorageSync('Uid', Uid)
            wx.setStorageSync('userInfo', userInfo)
            wx.switchTab({
              url: '../index/index',
            })
          }, 1000)
        }
        if (res.cancel) {

        }
      }
    })
  },
  upload: function () {
    var that = this
    wx.showLoading({
      title: '正在上传',
      mask: true
    })
    var matchdetail = []
    for (var i = 0; i < 8; i++) {
      matchdetail.push(that.data.Matchinfo[i])
    }
    for (var i = 0; i < 8; i++) {
      matchdetail.push(that.data.Scoreinfo[i])
    }
    var TeamAStatistic = wx.getStorageSync('TeamAStatistic')
    var TeamBStatistic = wx.getStorageSync('TeamBStatistic')
    var TeamAStatistic_new = []
    var TeamBStatistic_new = []
    for (var i = 0; i < 37; i++) {
      if (TeamAStatistic[i]) {
        TeamAStatistic_new.push(i)
        TeamAStatistic_new.push(TeamAStatistic[i][0].ServePoint)
        TeamAStatistic_new.push(TeamAStatistic[i][0].BlockPoint)
        TeamAStatistic_new.push(TeamAStatistic[i][0].SpikePoint)
        TeamAStatistic_new.push(TeamAStatistic[i][0].ServeFault)
        TeamAStatistic_new.push(TeamAStatistic[i][0].SpikeFault)
        TeamAStatistic_new.push(TeamAStatistic[i][0].OtherFault)
      }
    }
    for (var i = 0; i < 37; i++) {
      if (TeamBStatistic[i]) {
        TeamBStatistic_new.push(i)
        TeamBStatistic_new.push(TeamBStatistic[i][0].ServePoint)
        TeamBStatistic_new.push(TeamBStatistic[i][0].BlockPoint)
        TeamBStatistic_new.push(TeamBStatistic[i][0].SpikePoint)
        TeamBStatistic_new.push(TeamBStatistic[i][0].ServeFault)
        TeamBStatistic_new.push(TeamBStatistic[i][0].SpikeFault)
        TeamBStatistic_new.push(TeamBStatistic[i][0].OtherFault)
      }
    }

    wx.request({
      url: 'https://volleywang.cn/index.php/VolleyDataFive',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        uid: wx.getStorageSync('Uid'),
        matchdetail: matchdetail,
        TeamANumber: wx.getStorageSync('TeamANumber'),
        TeamBNumber: wx.getStorageSync('TeamBNumber'),
        TeamALineUpFirstSet: wx.getStorageSync('TeamALineUpFirstSet'),
        TeamBLineUpFirstSet: wx.getStorageSync('TeamBLineUpFirstSet'),
        TeamALineUpSecondSet: wx.getStorageSync('TeamALineUpSecondSet'),
        TeamBLineUpSecondSet: wx.getStorageSync('TeamBLineUpSecondSet'),
        TeamALineUpThirdSet: wx.getStorageSync('TeamALineUpThirdSet'),
        TeamBLineUpThirdSet: wx.getStorageSync('TeamBLineUpThirdSet'),
        TeamALineUpFourthSet: wx.getStorageSync('TeamALineUpFourthSet'),
        TeamBLineUpFourthSet: wx.getStorageSync('TeamBLineUpFourthSet'),
        TeamALineUpFifthSet: wx.getStorageSync('TeamALineUpFifthSet'),
        TeamBLineUpFifthSet: wx.getStorageSync('TeamBLineUpFifthSet'),
        MatchDuratoinSet1: wx.getStorageSync('MatchDuratoinSet1'),
        MatchDuratoinSet2: wx.getStorageSync('MatchDuratoinSet2'),
        MatchDuratoinSet3: wx.getStorageSync('MatchDuratoinSet3'),
        MatchDuratoinSet4: wx.getStorageSync('MatchDuratoinSet4'),
        MatchDuratoinSet5: wx.getStorageSync('MatchDuratoinSet5'),
        SubTeamASet1: wx.getStorageSync('SubTeamASet1'),
        SubTeamASet2: wx.getStorageSync('SubTeamASet2'),
        SubTeamASet3: wx.getStorageSync('SubTeamASet3'),
        SubTeamASet4: wx.getStorageSync('SubTeamASet4'),
        SubTeamASet5: wx.getStorageSync('SubTeamASet5'),
        SubTeamBSet1: wx.getStorageSync('SubTeamBSet1'),
        SubTeamBSet2: wx.getStorageSync('SubTeamBSet2'),
        SubTeamBSet3: wx.getStorageSync('SubTeamBSet3'),
        SubTeamBSet4: wx.getStorageSync('SubTeamBSet4'),
        SubTeamBSet5: wx.getStorageSync('SubTeamBSet5'),
        TimeOut: wx.getStorageSync('TimeOut'),

        TeamAStatistic: TeamAStatistic_new,
        TeamBStatistic: TeamBStatistic_new,
      },
      success: function (res) {
        console.log(res.data)
        wx.hideLoading()

        var Uid = wx.getStorageSync('Uid')
        var userInfo = wx.getStorageSync('userInfo')

        wx.clearStorage()
        setTimeout(function () {
          wx.setStorageSync('Uid', Uid)
          wx.setStorageSync('userInfo', userInfo)
          wx.switchTab({
            url: '../index/index',
          })
        }, 1000)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var Scoreinfo = []
    Scoreinfo.push(wx.getStorageSync('AMatch'))
    Scoreinfo.push(wx.getStorageSync('BMatch'))
    Scoreinfo.push(wx.getStorageSync('ASet1'))
    Scoreinfo.push(wx.getStorageSync('BSet1'))
    Scoreinfo.push(wx.getStorageSync('ASet2'))
    Scoreinfo.push(wx.getStorageSync('BSet2'))
    Scoreinfo.push(wx.getStorageSync('ASet3'))
    Scoreinfo.push(wx.getStorageSync('BSet3'))
    Scoreinfo.push(wx.getStorageSync('ASet4'))
    Scoreinfo.push(wx.getStorageSync('BSet4'))
    Scoreinfo.push(wx.getStorageSync('ASet5'))
    Scoreinfo.push(wx.getStorageSync('BSet5'))
    this.setData({
      Matchinfo: wx.getStorageSync('Matchinfo'),
      Scoreinfo: Scoreinfo
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