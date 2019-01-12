// pages/Statistic/Statistic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    matchinfo:[],
    SearchContent:'',
    SearchFlag: false,
    InputFlag: true,
    focus: false
  },
  ShowSearch: function () {
    this.setData({
      SearchFlag: true,
      focus: true
    })
  },
  ShowSearchBtn: function () {
    console.log ('聚焦输入框')
    if (!this.data.SearchContent) {
      this.setData({
        InputFlag: false
      })
    } else {
      this.setData({
        InputFlag: true
      })
    }
  },
  HideSearchBtn: function () {
    console.log('输入框失去聚焦')
    this.setData({
      InputFlag: false
    })
  },
  GetSearchContent: function (e) {
    if (!e.detail.value) {
      this.setData({
        InputFlag: false
      })
    } else {
      this.setData({
        InputFlag: true
      })
    }
    this.setData({
      SearchContent: e.detail.value
    })
  },
  Search: function () {
    var that = this
    wx.navigateTo({
      url: 'search/search?value=' + that.data.SearchContent,
    })
  },
  CancelSearch: function () {
    this.setData({
      SearchFlag: false,
      focus: false
    })
  },
  BindMatchInfo: function (e) {
    wx.navigateTo({
      url: 'Statistic/Statistic?matchid='+e.currentTarget.dataset.matchid,
    })
  },
  BindCourt: function (e) {
    wx.navigateTo({
      url: 'Court/Court',
    })
  },
  BindRank: function (e) {
    wx.navigateTo({
      url: 'Rank/Rank',
    })
  },
  sign: function (e) {
   wx.showToast({
     title: '已签到',
     icon: 'success',
     duration: 1500
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://volleywang.cn/index.php/volleyball',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          matchinfo: res.data.data
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
    this.setData({
      SearchFlag: false,
      focus: false
    })
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