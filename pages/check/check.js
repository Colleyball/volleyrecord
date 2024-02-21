// pages/check/check.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '待审核数据',
    class: 0,
  },
  BindSwitch: function () {
    if (this.data.class == 0) {
      this.setData({
        class: 1,
        title: '已审核数据'
      })
    } else {
      this.setData({
        class: -0,
        title: '待审核数据'
      })
    }
  },
  GetLength: function (e) {
    this.setData({
      length: e.detail.value
    })
    console.log(e.detail.value)
  },
  GetDate: function (e) {
    this.setData({
      date: e.detail.value
    })
    console.log(e.detail.value)
  },
  bindCopy: function(e) {
    var url =  e.currentTarget.dataset.url
    wx.setClipboardData({
      data: url,
    })
  },
  BindAutoConfirm: function(e) {
    var that = this
    wx.showLoading({
      title: '正在识别数据',
    })
    var act_id = e.currentTarget.dataset.id
    wx.request({
      url: 'https://niko.game-win.cn/web/update_act',
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
        no: act_id
      },
      success: function (res) {
        console.log(res.data)
        if(res.data.data) {
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: '自动识别成功，里程：'+res.data.data[0] + 'km',
            showCancel: false,
            complete: (res) => {
              if (res.confirm) {
                get_un_check_list(that)
              }
            }
          })
        } else {
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: '自动识别失败',
            showCancel: false,
            complete: (res) => {
              if (res.confirm) {
                
              }
            }
          })
        }
      }
    })
  },
  BindConfirm: function(e) {
    var that = this
    if (this.data.length && this.data.date) {
      wx.showLoading({
        title: '正在上传数据',
      })
      var act_id = e.currentTarget.dataset.id
      wx.request({
        url: 'https://niko.game-win.cn/admin/update_act_by_input',
        header: {
          "content-type": "application/json;charset=utf8"
        },
        method: "GET",
        data: {
          no: act_id,
          length: that.data.length,
          date: that.data.date
        },
        success: function (res) {
          console.log(res.data)
          if(res.data.data) {
            that.data.length = ''
            wx.hideLoading()
            wx.showModal({
              title: '提示',
              content: '上传数据成功',
              showCancel: false,
              complete: (res) => {
                if (res.confirm) {
                  get_un_check_list(that)
                }
              }
            })
          }
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '数据输入不完整',
        showCancel: false,
        complete: (res) => {
          if (res.confirm) {
            
          }
        }
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var that = this
    get_un_check_list(that)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})

function get_un_check_list(that) {
  wx.request({
    url: 'https://niko.game-win.cn/admin/get_check_list',
    header: {
      "content-type": "application/json;charset=utf8"
    },
    method: "GET",
    data: {
    },
    success: function (res) {
      console.log(res.data)
      that.setData({
        act_list: res.data.data
      })
    }
  })
}