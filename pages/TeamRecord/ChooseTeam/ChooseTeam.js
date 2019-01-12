// pages/VolleyballRecord/ChooseTeam/ChooseTeam.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: '0',
    teaminfo:[],
    teamname: '',
    teamid: ''
  },
  bindViewTapTeam:function (e) {
    var teamname = this.data.teamname
    var name = e.currentTarget.dataset.name
    var teamid = e.currentTarget.dataset.teamid
    if (teamname == name) {
      teamname = '未选择'
      this.setData({
        teamname: '',
        teamid: ''
      })
    } else {
      teamname = name
      this.setData({
        teamname: name,
        teamid: teamid
      })
    }
  },
  BindConfirm: function () {
    var that = this
    wx.request({
      url: 'https://volleywang.cn/index.php/VolleyData/getteaminfo',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        teamid: that.data.teamid
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          teamdetail: res.data.data
        })
        wx.setStorage({
          key: 'teamdetail',
          data: res.data.data,
          success: function (res) {
            wx.navigateTo({
              url: '../TeamRecord?teamid=' + that.data.teamid + '&teamname=' + that.data.teamname,
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://volleywang.cn/index.php/VolleyData/getteamlist',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          teaminfo: res.data.data
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