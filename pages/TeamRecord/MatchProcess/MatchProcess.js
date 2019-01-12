// pages/TeamRecord/MatchProcess/MatchProcess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    MatchInfo: [],
    TeamInfo: [],
    CourtPlayer: ['…', '…', '…', '…', '…','…'],
    Statistic: [],
    ShowTeamBALLPlayer: true
  },
  ChoosePlayer: function(e) {
    this.setData({
      ShowTeamBALLPlayer: false,
      position: e.currentTarget.dataset.position
    })
  },
  SetTeamPlayer: function (e) {
    var that = this
    var position = that.data.position
    var CourtPlayer = this.data.CourtPlayer
    CourtPlayer[position] = e.currentTarget.dataset.name
    this.setData({
      CourtPlayer: CourtPlayer,
      ShowTeamBALLPlayer: true
    })
   
  },
  ConfirmCourtPlayer: function (res) {
    var that = this
    var CourtPlayer = that.data.CourtPlayer 
    if (CourtPlayer[1] != '…' && CourtPlayer[2] != '…' && CourtPlayer[3] != '…' && CourtPlayer[4] != '…' && CourtPlayer[5] != '…' && CourtPlayer[6] != '…') {
      wx.showModal({
        title: '提示',
        content: '是否确认本局比赛双方的首发队员',
        cancelText: '返回修改',
        confirmText: '开始比赛',
        success: function (res) {
          if (res.confirm) {
            wx.setStorageSync('LineUp', CourtPlayer)
            wx.setStorageSync('CourtPlayer', CourtPlayer)
            wx.setStorageSync('Status', '1')
            that.setData({
              Status: 1,
              LineUp: CourtPlayer,
              CourtPlayer: CourtPlayer,
              ShowTeamBALLPlayer: true
            })
          }
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '首发阵容不完整',
        confirmText: '返回修改',
        showCancel: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      MatchInfo: wx.getStorageSync('Matchinfo'),
      TeamInfo: wx.getStorageSync('teamdetail'),
    })
    if (1) {
      that.setData({
        showcourt : false
      })
      var TeamInfo = wx.getStorageSync('teamdetail')
      var Statistic = []
      for (var i = 0; i < TeamInfo.length; i++) {
        Statistic[TeamInfo[i].num] = [{
          ServePoint: 0,
          BlockPoint: 0,
          SpikePoint: 0,
          ServeFault: 0,
          SpikeFault: 0,
          OtherFault: 0
        }]
      }
      this.setData({
        Statistic: Statistic,
      })
    }
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