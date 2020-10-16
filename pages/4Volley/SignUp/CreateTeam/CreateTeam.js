// pages/4Volley/SignUp/CreateTeam/CreateTeam.js
var util = require("../../../../utils/util.js"),
app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchFlag: true
  },
  GetName: function (e) {
    this.setData({
      Name: e.detail.value
    })
  },
  AddPlayer: function () {
    this.setData({
      searchFlag: false
    })
  },
  GetContent: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  searchSubmit: function () {
    var that = this
    wx.request({
      url: "https://api.volleywang.cn/4volley/SearchPlayer",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        content: that.data.content
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.data.length == 0) {
          wx.showModal({
            title: '找不到结果',
            content: '请确认输入信息无误，或邀请你的朋友完善个人信息。',
            showCancel: false,
            success: function (res) {
              that.setData({
                searchFlag: true,
                content: ''
              })
            }
          })
        } else {
          that.setData({
            search_result: res.data.data,
            content: ''
          })
        }
      }
    })
  },
  searchCancel: function () {
    this.setData({
      searchFlag: true,
      content: ''
    })
  },
  ConfirmPlayer: function (e) {
    var name = e.currentTarget.dataset.name
    var uid = e.currentTarget.dataset.uid
    var school_no = e.currentTarget.dataset.school
    var player = this.data.player
    var player_count = this.data.player_count

    var new_player = [uid, school_no, name]
    player.push(new_player)
    this.setData({
      player: player,
      player_count: player_count + 1,
      searchFlag: true,
      search_result: '',
      content: ''
    })
  },
  DelPlayer: function (e) {
    var no = e.currentTarget.dataset.no
    var player = this.data.player
    var player_count = this.data.player_count
    player.splice(no,1)
    this.setData({
      player: player,
      player_count: player_count - 1
    })
  },
  BindConfirm: function (res) {
    var that = this
    var TIME = util.formatTime(new Date())
    wx.request({
      url: "https://api.volleywang.cn/4volley/CreateTeam",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        player: that.data.player,
        name: that.data.Name,
        uid: 20180208,
        time: TIME
      },
      success: function (res) {
        console.log(res.data)
        wx.navigateBack()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var name = options.name
    var school_no = options.school
    var uid = options.uid
    var player = [[uid, school_no, name]]
    var player_count = 1;
    this.setData({
      player: player,
      player_count: player_count
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