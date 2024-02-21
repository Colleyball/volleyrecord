var t = require("../../utils/util.js");
var app = getApp();

Page({
  data: {
    currentTab: "1",
    userInfo: {},
    userlogin: true,
    Uid: 0,
    focus: !1,
    StatusFlag: 0,
    swiperHeight: 2560,
    statusBarHeight: app.globalData.statusBarHeight,
    Market: 1,
    AvailablePoint: 0
  },
  bindChange: function (t) {
    var that = this;
    var currentTab = t.detail.current
    that.setData({
      currentTab: currentTab
    })
    switch (currentTab) {
      case 0:
        show_login_box_1(that)
        get_act_statistic(that)
        get_all_act(that)
        break
      case 1:
        this.setData({
          swiperHeight: 2560
        })
        break
      case 2:
        get_rank(that)
        this.setData({
          swiperHeight: 1600
        })
        break
      case 3:
        get_goods(that)
        get_user_available_point(that)
        break
    }
  },
  swichNav: function (t) {
    this.setData({
      currentTab: t.currentTarget.dataset.current
    })
  },
  bindTapRecord: function () {
    if (!show_login_box(this)) {
      return
    }
    wx.navigateTo({
      url: '../CyclingRecord/CyclingRecord',
    })
  },
  bindUserinfo: function () {
    wx.navigateTo({
      url: '../user-info/user-info',
    })
  },
  bindMedal: function () {
    wx.showToast({
      title: '敬请期待',
    })
  },
  bindNikostar: function () {
    wx.navigateTo({
      url: 'nikostar/nikostar',
    })
  },
  bindActInfo: function () {
    wx.navigateTo({
      url: 'actinfo/actinfo',
    })
  },
  bindMore: function () {
    var month = this.data.current_month
    wx.navigateTo({
      url: '../Rank/Rank?month=' + month,
    })
  },
  bindChangMonth: function (e) {
    var month = e.currentTarget.dataset.month
    this.setData({
      current_month: month
    })
  },
  bindMerge: function() {
    wx.navigateTo({
      url: '../MergeFit/MergeFit',
    })
  },
  bindConfirmOrder: function (e) {
    var that = this
    var goos_id = e.currentTarget.dataset.id
    /*wx.showModal({
      title: '提示',
      content: '积分兑换即将上线，敬请期待',
      showCancel: false,
      complete: (res) => {
      }
    })*/
    wx.navigateTo({
      url: '../ConfirmOrder/ConfirmOrder?goods_id=' + goos_id + '&user_point=' + that.data.AvailablePoint,
    })
  },
  bindCantConfirm: function () {
    wx.showToast({
      title: '商品库存不足',
    })
  },
  bindOrder: function () {
    wx.navigateTo({
      url: '../Order/Order',
    })
  },
  bindAdmin: function () {
    wx.navigateTo({
      url: '../check/check',
    })
  },
  onLoad: function (e) {
    console.log("onLoad");
    var that = this;
    if (e.type == 'share') {
      var keys = Object.keys(e)
      var detail = '?'
      for (var key in e) {
        if (key != 'route' && key != 'type') {
          detail = detail + key + '=' + e[key] + '&'
        }
      }
      var route = e.route
      wx.navigateTo({
        url: '../' + route + detail,
      })
    }
    get_life_info(that)
    get_last_day_rank(that)
    app.getOpenID(that)
  },
  onPageScroll: function (t) {
    // 页面滚动时触发
    let topOpacity = t.scrollTop / 100
    //console.log('topOpacity',t.scrollTop,topOpacity);
    if (t.scrollTop < 10) {
        topOpacity = 0
    } else if (topOpacity >= 1) {
        topOpacity = 1
    }
    this.setData({
        topOpacityFloat: topOpacity
    })
  },
  onShow: function () {
    var that = this
    get_month_list(that)
    //get_market_status(that)
    var day = new Date()
    var hour = day.getHours()
    this.setData({
      hour: hour
    })
    setTimeout(function () {
      if (wx.getStorageSync("userName")) {
        that.setData({
          userlogin: true,
          userName: wx.getStorageSync("userName"),
          userAvatar: wx.getStorageSync("userAvatar")
        })
      } else {
        wx.request({
          url: 'https://niko.game-win.cn/api/GetUserInfo',
          header: {
            "content-type": "application/json;charset=utf8"
          },
          method: "GET",
          data: {
            uid: wx.getStorageSync('Uid')
          },
          success: function (res) {
            console.log(res.data)
            if (res.data.data.NickName) {
              console.log('数据库存在用户信息')
              that.setData({
                userlogin: true,
                userName: res.data.data.NickName,
                userAvatar: res.data.data.Pic
              })
              wx.setStorageSync('userName', res.data.data.NickName)
              wx.setStorageSync('userAvatar', res.data.data.Pic)
            } else {
              console.log('数据库不存在用户信息')
              that.setData({
                userlogin: false,
                userName: '骑士',
                userAvatar: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
              })
            }
          }
        })
        that.setData({
          userlogin: false
        })
      }
    }, 1000)

  },
  onHide: function () {
    this.setData({
      userlogin: true,
      StatusFlag: null
    })
  },
  onShareAppMessage: function () {
    return {
      title: "杭州尼克之星自行车队",
      desc: "点击参与卷王挑战赛",
      path: "/pages/index/index",
      imageUrl: "/images/share.jpg"
    };
  }
});

function get_life_info(that) {
  wx.request({
    url: 'https://api.game-win.cn/LifeInfo',
    header: {
      "content-type": "application/json;charset=utf8"
    },
    method: "GET",
    data: {},
    success: function (res) {
      console.log(res.data)
      that.setData({
        LifeInfo: res.data.data
      })
    }
  })
}

function get_last_day_rank(that) {
  var day1 = new Date();
  day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
  var month = (day1.getMonth() + 1)
  var day = day1.getDate()
  wx.request({
    url: 'https://niko.game-win.cn/api/GetLastDayRank',
    header: {
      "content-type": "application/json;charset=utf8"
    },
    method: "GET",
    data: {
      month: month,
      day: day
    },
    success: function (res) {
      console.log(res.data)
      that.setData({
        LastDayRank: res.data.data
      })
    }
  })

}

function get_act_statistic(that) {
  wx.request({
    url: 'https://niko.game-win.cn/api/GetCyclingStatistic',
    header: {
      "content-type": "application/json;charset=utf8"
    },
    method: "GET",
    data: {
      uid: wx.getStorageSync('Uid')
    },
    success: function (res) {
      console.log(res.data)
      that.setData({
        CyclingStatistic: res.data.data
      })
    }
  })
  wx.request({
    url: 'https://niko.game-win.cn/api/GetMonthCyclingStatistic',
    header: {
      "content-type": "application/json;charset=utf8"
    },
    method: "GET",
    data: {
      uid: wx.getStorageSync('Uid')
    },
    success: function (res) {
      console.log(res.data)
      that.setData({
        MonthCyclingStatistic: res.data.data
      })
    }
  })
}

function get_all_act(that) {
  wx.showLoading({
    title: '打卡数据加载中',
  })
  wx.request({
    url: 'https://niko.game-win.cn/api/GetAllCycling',
    header: {
      "content-type": "application/json;charset=utf8"
    },
    method: "GET",
    data: {
      uid: wx.getStorageSync('Uid')
    },
    success: function (res) {
      console.log(res.data)
      var count = res.data.data.count
      if (count > 9) {
        var swiperHeight = 2280 + (count - 9) * 82
      } else {
        var swiperHeight = 2180
      }

      that.setData({
        AllCycling: res.data.data,
        swiperHeight: swiperHeight
      })

      wx.hideLoading()
    }
  })
}

function get_rank(that) {
  wx.request({
    url: 'https://niko.game-win.cn/api/GetRank',
    header: {
      "content-type": "application/json;charset=utf8"
    },
    method: "GET",
    data: {},
    success: function (res) {
      console.log(res.data)
      that.setData({
        Rank: res.data.data
      })
    }
  })
}

function get_goods(that) {
  wx.request({
    url: 'https://niko.game-win.cn/api/GetGoods',
    header: {
      "content-type": "application/json;charset=utf8"
    },
    method: "GET",
    data: {},
    success: function (res) {
      console.log(res.data)
      var count = Object.keys(res.data.data).length
      var height = 400 + count * 650;

      that.setData({
        Goods: res.data.data,
        swiperHeight: height
      })
    }
  })
}

function get_user_available_point(that) {
  wx.request({
    url: 'https://niko.game-win.cn/api/GetUserAvailablePoint',
    header: {
      "content-type": "application/json;charset=utf8"
    },
    method: "GET",
    data: {
      uid: wx.getStorageSync('Uid')
    },
    success: function (res) {
      console.log(res.data)
      that.setData({
        AvailablePoint: res.data.data
      })
    }
  })
}

/*function get_market_status(that) {
  wx.request({
    url: 'https://niko.game-win.cn/api/SetMarket',
    header: {
      "content-type": "application/json;charset=utf8"
    },
    method: "GET",
    data: {
    },
    success: function (res) {
      console.log(res.data)
      that.setData({
        Market: res.data.data
      })
    }
  })
}*/

function show_login_box(that) {
  if (!that.data.userlogin) {
    wx.showModal({
      title: '提示',
      content: '参与骑行挑战，需获取您的头像与昵称，点击确认进行设置',
      confirmText: '前往设置',
      cancelText: '仅浏览',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.redirectTo({
            url: '/pages/user-info/user-info',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    return 0
  } else {
    return 1
  }
}

function show_login_box_1(that) {
  if (!that.data.userlogin) {
    wx.showModal({
      title: '提示',
      content: '进入个人中心，需获取您的头像与昵称，点击确认进行设置',
      confirmText: '前往设置',
      cancelText: '返回主页',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.redirectTo({
            url: '/pages/user-info/user-info',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
          that.setData({
            currentTab: 1
          })
        }
      }
    })
    return 0
  } else {
    return 1
  }
}

function get_month_list(that) {
  var day = new Date()
  day.setTime(day.getTime())
  var month = []
  var month_temp
  month.push(day.getMonth() + 1)
  var i = 1
  for (i; i <= 4; i++) {
    month_temp = day.getMonth() + 1 - i
    if (month_temp <= 0) {
      month_temp = 12 + month_temp
    }
    month.push(month_temp)
  }
  that.setData({
    month_list: month,
    current_month: day.getMonth() + 1
  })
}