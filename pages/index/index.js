var t = require("../../utils/util.js"),
  app = getApp();
function t(t) {
  var n;
  for (n in t) return !1;
  return !0;
}

var n = require("../../utils/util.js"), e = getApp();
Page({
  data: {
    currentTab: "1",
    swiperHeight: 2270,
    userInfo: {},
    userlogin: true,
    userlogin_box: false,
    Uid: 0,
    aanimation: "",
    animation2: "",
    animation3: "",
    toolflag: !0,
    SearchFlag: !1,
    InputFlag: !0,
    focus: !1,
    StatusFlag: 0,
    ScrollFlag: 0,
    border: 0,
    search_content: ['机械工程学院', '电子信息学院', '机械vs通信', '电子vs计算机'],
    current_search_content: '机械工程学院',
    statusBarHeight: app.globalData.statusBarHeight
  },
  bindChange: function (t) {
    var that = this;
    var currentTab = t.detail.current
    that.setData({
      currentTab: currentTab
    })
    switch (currentTab) {
      case 0:
        show_login_box(that)
        this.setData({
          swiperHeight: 1200
        })
        break
      case 1:
        if (1 == that.data.StatusFlag || 2 == that.data.StatusFlag) {
          that.setData({
            swiperHeight: 2400
          })
        } else {
          that.setData({
            swiperHeight: 2270
          })
        }
        break
      case 2:
        var e = 590 * that.data.videoCount + 920;
        that.setData({
          swiperHeight: e,
          focus: false
        })
        break
      case 3:
        that.setData({
          swiperHeight: 2350,
          focus: false
        })
        break
    }
  },
  swichNav: function (t) {
    this.setData({
      currentTab: t.currentTarget.dataset.current
    });
  },
  /*onPageScroll: function(t) {
    t.scrollTop >= 150 ? 1 == this.data.ScrollFlag || (
      this.animation3.opacity(1).step(),
      this.setData({
        ScrollFlag: 1,
        animation3: this.animation3.export()
      })
    ) : 0 == this.data.ScrollFlag || (
      this.animation3.opacity(0).step(),
      this.setData({
        ScrollFlag: 0,
        animation3: this.animation3.export()
      })
    );
  },*/
  bindContinue: function () {
    wx.redirectTo({
      url: "../MatchRecord/MatchProcess/MatchProcess"
    })
  },
  bindEnd: function () {
    wx.redirectTo({
      url: "../EndMatch/EndMatch"
    })
  },
  BindHelp: function () {
    var t = ["http://www.game-win.cn/resource/images/help/1.JPG", "http://www.game-win.cn/resource/images/help/2.JPG", "http://www.game-win.cn/resource/images/help/3.JPG", "http://www.game-win.cn/resource/images/help/4.JPG"];
    wx.previewImage({
      current: 0,
      urls: t
    });
  },
  BindDD: function () {
    var that = this
    if (!show_login_box(this)) {
      return
    }
    wx.navigateTo({
      url: '../DD/dd_start/dd_start',
    })
  },
  bindViewTapMatchRecord: function () {
    if (!show_login_box(this)) {
      return
    }
    this.setData({
      toolflag: !1
    })
    setTimeout(function () {
      this.animation2.opacity(1).step(), this.animation.translateY(-250).opacity(1).step(),
        this.setData({
          animation: this.animation.export(),
          animation2: this.animation2.export()
        });
    }.bind(this), 300);
  },
  closetool: function () {
    this.animation.translateY(300).opacity(0).step(), this.animation2.opacity(0).step(),
      this.setData({
        animation: this.animation.export(),
        animation2: this.animation2.export()
      }), setTimeout(function () {
        this.setData({
          toolflag: !0
        });
      }.bind(this), 500);
  },
  BindFVolley: function () {
    if (!show_login_box(this)) {
      return
    }
    wx.navigateTo({
      url: '../4Volley/4Volley',
    })
  },
  VolleyballOneWin: function () {
    wx.navigateTo({
      url: "../MatchRecord/MatchRecord?win=1"
    });
  },
  VolleyballTwoWin: function () {
    wx.navigateTo({
      url: "../MatchRecord/MatchRecord?win=2"
    });
  },
  VolleyballThreeWin: function () {
    wx.navigateTo({
      url: "../MatchRecord/MatchRecord?win=3"
    });
  },
  Tactical: function () {
    wx.navigateTo({
      url: "../MatchBox/Tactical/Tactical"
    });
  },
  ScoreBoard: function () {
    wx.navigateTo({
      url: "../MatchBox/ScoreBoard/ScoreBoard"
    });
  },
  Coin: function () {
    wx.navigateTo({
      url: "../MatchBox/Coin/coin"
    });
  },
  nearby: function () {
    wx.navigateTo({
      url: "../Data/Court/Court"
    });
  },
  PlayVideo: function (t) {
    wx.navigateTo({
      url: "../video/player/player?title=" + t.currentTarget.dataset.title + "&link=" + t.currentTarget.dataset.link + "&qqvideo=" + t.currentTarget.dataset.qqvideo + "&group=" + t.currentTarget.dataset.group
    });
  },
  VideoList: function (t) {
    wx.navigateTo({
      url: "../video/videolist/videolist?videotype=" + t.currentTarget.dataset.type + "&title=" + t.currentTarget.dataset.title
    });
  },
  BindMatchInfo: function (t) {
    2019 == t.currentTarget.dataset.type ? wx.navigateTo({
      url: "../Data/Statistic2019/Statistic2019?matchid=" + t.currentTarget.dataset.matchid
    }) : wx.navigateTo({
      url: "../Data/Statistic/Statistic?matchid=" + t.currentTarget.dataset.matchid
    });
  },
  BindRank: function (t) {
    wx.navigateTo({
      url: "../Data/Rank/Rank"
    });
  },
  BindAllMatchData: function () {
    wx.navigateTo({
      url: "../Data/Data"
    });
  },
  History: function () {
    wx.navigateTo({
      url: "../User/History/History"
    });
  },
  FavouriteVideo: function () {
    wx.navigateTo({
      url: "../User/FavouriteVideo/FavouriteVideo"
    });
  },
  Setting: function () {
    wx.navigateTo({
      url: "../User/Setting/Setting"
    });
  },
  ShowSearch: function () {
    this.setData({
      SearchFlag: !0,
      focus: !0
    }), wx.setNavigationBarColor({
      frontColor: "#000000",
      backgroundColor: "white"
    });
  },
  ShowSearchBtn: function () {
    console.log("聚焦输入框"), this.data.SearchContent ? this.setData({
      InputFlag: !0
    }) : this.setData({
      InputFlag: !1
    });
  },
  HideSearchBtn: function () {
    this.setData({
      InputFlag: !1
    });
  },
  GetSearchContent: function (t) {
    t.detail.value ? this.setData({
      InputFlag: !0
    }) : this.setData({
      InputFlag: !1
    }), this.setData({
      SearchContent: t.detail.value
    });
  },
  CancelSearch: function () {
    this.setData({
      SearchFlag: !1,
      focus: !1
    }), wx.setNavigationBarColor({
      frontColor: "#000000",
      backgroundColor: "white"
    });
  },
  Search: function (t) {
    var that = this;
    this.setData({
      SearchFlag: !1,
      focus: !1
    }), wx.navigateTo({
      url: "../Data/search/search?value=" + that.data.SearchContent
    });
  },
  bindGetUserInfo: function (t) {
    var that = this;
    console.log(t.detail.userInfo)
    if (t.detail.userInfo) {
      that.setData({
        userInfo: t.detail.userInfo
      })
      n.setpublicinfo(wx.getStorageSync("Uid"), t.detail.userInfo)
      wx.setStorageSync("userInfo", t.detail.userInfo)
      that.setData({
        userlogin: true,
        userlogin_box: false
      })
      wx.navigateBack()
    } else {
      wx.showModal({
        title: "提示",
        content: "如需使用用户中心的全部功能(比赛数据、关注的球队)，赛事窗需要获取您的昵称和头像，点击确认重新登录",
        showCancel: false
      })
    }
  },
  model_login_cancle: function () {
    this.setData({
      userlogin: false,
      userlogin_box: false
    });
  },
  onLoad: function (e) {
    console.log("onLoad");
    var o = this;
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
    wx.request({
      url: "https://api.volleywang.cn/VolleyRecord/GetVideoPartStatus",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {},
      success: function (t) {
        console.log(t.data), o.setData({
          video_status: t.data.data
        });
      }
    }), wx.request({
      url: "https://api.volleywang.cn/VolleyRecord/GetRecommandVideo",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {},
      success: function (t) {
        console.log(t.data), o.setData({
          recommand_video: t.data.data
        });
      }
    }),
      wx.request({
        url: "https://api.volleywang.cn/VolleyRecord/GetAllVideoList",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {},
        success: function (t) {
          console.log(t.data), o.setData({
            videoCount: t.data.data.length,
            videoinfo: t.data.data
          });
        }
      })
    wx.request({
      url: "https://api.volleywang.cn/VolleyRecord/GetAllMatchInfo",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (t) {
        console.log(t.data), o.setData({
          matchinfo: t.data.data,
          matchinfo_count: t.data.data.length
        }), wx.setStorageSync("all_match_data", t.data.data);
      }
    })
    this.animation = wx.createAnimation({
      duration: 500,
      timingFunction: "linear",
      delay: 0,
      transformOrigin: "left top 0"
    })
    this.animation2 = wx.createAnimation({
      duration: 500,
      timingFunction: "linear",
      delay: 0,
      transformOrigin: "left top 0"
    })
    this.animation3 = wx.createAnimation({
      duration: 500,
      timingFunction: "linear",
      delay: 0,
      transformOrigin: "left top 0"
    })
    app.getUserInfo(function (a) {
      o.setData({
        userInfo: a
      }), t.setpublicinfo(wx.getStorageSync("Uid"), a), console.log("插入用户公共信息");
    });
  },
  onShow: function () {
    var that = this
    var t = this;
    setTimeout(function () {
      wx.getStorageSync("userInfo") ? t.setData({
        userlogin: true,
        userInfo: wx.getStorageSync("userInfo")
      }) : t.setData({
        userlogin: false
      });
    }, 1e3)
    if (wx.getStorageSync("Status") == 1 || wx.getStorageSync("Status") == 2) {
      this.setData({
        StatusFlag: 1,
        swiperHeight: 2700
      })
    }
    if (5 == wx.getStorageSync("Status")) {
      this.setData({
        StatusFlag: 2,
        swiperHeight: 2700
      })
    }
    set_search_content(that)
    get_life_info(that)
  },
  onHide: function () {
    this.setData({
      userlogin: true,
      StatusFlag: null
    });
    this.animation.translateY(150).opacity(0).step(), this.animation2.opacity(0).step(),
      this.setData({
        animation: this.animation.export(),
        animation2: this.animation2.export()
      }), setTimeout(function () {
        this.setData({
          toolflag: !0
        });
      }.bind(this), 500);
  },
  onShareAppMessage: function () {
    return {
      title: "赛事窗·排球数据统计",
      desc: "点击进入赛事窗",
      path: "/pages/index/index"
    };
  }
});

function get_life_info(that) {
  wx.request({
    url: 'https://study-api.volleywang.cn/LifeInfo',
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

function set_search_content(that) {
  var num = Math.floor(Math.random() * 4 + 1)
  var search = that.data.search_content
  that.setData({
    current_search_content: search[num]
  })
}

function show_login_box(that) {
  if (!that.data.userlogin) {
    that.setData({
      userlogin_box: true
    })
    return 0
  } else {
    return 1
  }
}