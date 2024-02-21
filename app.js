App({
  onLaunch: function() {
    var t = wx.getStorageSync("logs") || [];
    t.unshift(Date.now()), wx.setStorageSync("logs", t);
    var a = this;
    wx.getSystemInfo({
      success: function(t) {
        var e = 68; -
        1 !== t.model.indexOf("iPhone X") ? e = 88 : -1 !== t.model.indexOf("iPhone") && (e = 64),
          a.globalData.statusBarHeight = t.statusBarHeight, a.globalData.titleBarHeight = e - t.statusBarHeight;
      },
      failure: function() {
        a.globalData.statusBarHeight = 0, a.globalData.titleBarHeight = 0;
      }
    });
  },
  getOpenID(that) {
    wx.login({
      success (res) {
        if (res.code) {
          wx.request({
            url: "https://niko.game-win.cn/api/GetUid",
            header: {
              "content-type": "application/json;charset=utf8"
            },
            method: "GET",
            data: {
              code: res.code
            },
            success: function(t) {
              console.log(t.data)
              wx.setStorageSync("Uid", t.data.data)
              that.setData({
                Uid : t.data.data
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  getUserProfile(that,uid) {
    wx.getUserProfile({
      desc: '使用户得到更好的体验',
      success: (res) => {
        console.log("获取用户信息成功")
        wx.setStorageSync('userInfo',res.userInfo)
        that.setData({
          userInfo: res.userInfo,
          userlogin: true,
          userlogin_box: false
        })
        setpublicinfo(uid,res.userInfo)
      },
      fail: res => {
        wx.showModal({
          title: "提示",
          content: "如需使用用户中心的全部功能(比赛数据、关注的球队)，赛事窗需要获取您的昵称和头像，点击确认重新登录",
          showCancel: false
        })
        console.log("获取用户信息失败")
      }
    })
  },
  globalData: {
    userInfo: null,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight']
  }
});

function setpublicinfo(uid, userinfo) {
  wx.request({
    url: "https://niko.game-win.cn/api/SetPublicInfo",
      header: {
          "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
          uid: uid,
          nickname: userinfo.nickName,
          province: userinfo.province,
          city: userinfo.city,
          gender: userinfo.gender,
          pic: userinfo.avatarUrl
      },
      success: function(t) {
          console.log(t.data);
      }
  });
}