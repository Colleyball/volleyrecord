// pages/4Volley/administrator/administrator.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    all_score: ['','','','','',''],
    team_choose: ['',''],
    score_border: true,
    TeamListFlag: true
  },
  SetScore: function (e) {
    this.setData({
      current_set: e.currentTarget.dataset.set,
      score_border: false
    })
  },
  ConfirmScore: function (e) {
    var score = e.currentTarget.dataset.score
    var all_score = this.data.all_score
    var current_set = this.data.current_set
    all_score[current_set] = score
    this.setData({
      all_score: all_score,
      score_border: true
    })
  },
  ChooseTeam: function (e) {
    var team_flag = e.currentTarget.dataset.flag
    this.setData({
      team_flag: team_flag,
      TeamListFlag: false
    })
  },
  ConfirmTeam: function (e) {
    var team_id = e.currentTarget.dataset.team
    var team_choose = this.data.team_choose
    var team_flag = this.data.team_flag
    team_choose[team_flag] = team_id
    this.setData({
      team_choose: team_choose,
      TeamListFlag: true
    })
  },
  CancelTeam: function (e) {
    var team_choose = this.data.team_choose
    var team_flag = this.data.team_flag
    team_choose[team_flag] = ''
    this.setData({
      team_choose: team_choose,
    })
  },
  BindClose: function () {
    this.setData({
      TeamListFlag: true
    })
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: "https://api.volleywang.cn/4volley/TeamList",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {},
      success: function (res) {
        console.log(res.data)
        that.setData({
          team: res.data.data
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

  }
})