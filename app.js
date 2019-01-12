//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //获取设备状态栏高度
    const that = this
    wx.getSystemInfo({
      success: function (res) {
        let totalTopHeight = 68
        if (res.model.indexOf('iPhone X') !== -1) {
          totalTopHeight = 88
        } else if (res.model.indexOf('iPhone') !== -1) {
          totalTopHeight = 64
        }
        that.globalData.statusBarHeight = res.statusBarHeight
        that.globalData.titleBarHeight = totalTopHeight - res.statusBarHeight
      },
      failure() {
        that.globalData.statusBarHeight = 0
        that.globalData.titleBarHeight = 0
      }
    })
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
              wx.setStorageSync('userInfo', res.userInfo);
            },
            fail: function (res) {
            }
          })
          if (res.code) {
            wx.request({
              url: 'https://volleywang.cn/index.php/toto/getuid',
              header: {
                "content-type": "application/json;charset=utf8"
              },
              method: "GET",
              data: {
                code: res.code
              },
              success: function (res) {
                console.log(res.data);
                wx.setStorageSync('Uid', res.data.data)
              }
            })
          } else {
            console.log('获取用户信息失败')
          }
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})

