// pages/4Volley/SignUp/SignUp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  JoinTeam: function (e) {
    if (!this.data.school_no) {
      wx.showModal({
        title: '提示',
        content: '你还未完善参赛信息，点击确认填写参赛信息',
        cancelText: '仅浏览',
        success: function (e) {
          if (e.confirm) {
            wx.navigateTo({
              url: '../PersonalInfo/PersonalInfo',
            })
          }
        }
      })
      return
    }
    var team_id = e.currentTarget.dataset.team
    var that = this
    wx.request({
      url: "https://api.volleywang.cn/4volley/JoinTeam",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        uid: that.data.uid,
        team_id: team_id,
        name: that.data.name,
        school_no: that.data.school_no
      },
      success: function (res) {
        console.log(res.data)
        wx.showModal({
          title: '提示',
          content: '加入队伍成功，请留意比赛时间',
          showCancel: false,
          success: function (e) {
            if (e.confirm) {
              wx.navigateBack()
            }
          }
        })
      }
    })
  },
  CreateTeam: function (e) {
    var that = this
    wx.navigateTo({
      url: 'CreateTeam/CreateTeam?name=' + that.data.name + '&uid=' + that.data.uid + '&school=' + that.data.school_no,
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
    this.setData({
      uid: wx.getStorageSync('Uid'),
      school_no: options.school,
      name: options.name
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