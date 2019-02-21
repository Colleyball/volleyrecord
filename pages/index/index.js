var t = require("../../utils/util.js"), a = getApp();

Page({
    data: {
        mainpic: {
            volleyball: "http://www.aibojiaoyu.cnImgFiles/ABSports/matchwin/MatchRecord.png",
            basketball: "http://www.aibojiaoyu.cnImgFiles/ABSports/matchwin/TeamRecord1.png",
            tool: "http://www.aibojiaoyu.cnImgFiles/ABSports/matchwin/matchbox.png"
        },
        currentTab: "1",
        swiperHeight: 2160,
        userInfo: {},
        userlogin: !0,
        Uid: 0,
        aanimation: "",
        animation2: "",
        toolflag: !0,
        SearchFlag: !1,
        InputFlag: !0,
        focus: !1,
        StatusFlag: 0,
        ScrollFlag: 0,
        opacity1: .1,
        red: 234,
        green: 240,
        blue: 72,
        opacity2: 1,
        border: 0
    },
    bindChange: function(t) {
        var a = this;
        if (a.setData({
            currentTab: t.detail.current
        }), 0 == t.detail.current && this.setData({
            swiperHeight: 1200
        }), 1 == t.detail.current && (1 == a.data.StatusFlag || 2 == a.data.StatusFlag ? a.setData({
            swiperHeight: 2270
        }) : a.setData({
            swiperHeight: 2160
        })), 2 == t.detail.current) {
            var e = 538 * a.data.videoCount + 650;
            a.setData({
                swiperHeight: e,
                focus: !1
            });
        }
        3 == t.detail.current && a.setData({
            swiperHeight: 2300,
            focus: !1
        });
    },
    swichNav: function(t) {
        this.setData({
            currentTab: t.target.dataset.current
        });
    },
    onPageScroll: function(t) {
        t.scrollTop >= 50 ? 1 == this.data.ScrollFlag || (this.setData({
            ScrollFlag: 1,
            opacity1: .95,
            red: 255,
            green: 255,
            blue: 255,
            opacity2: .95,
            border: 1
        }), wx.setNavigationBarColor({
            frontColor: "#000000",
            backgroundColor: "white"
        }), console.log("下滑超过阀值")) : 0 == this.data.ScrollFlag || (this.setData({
            ScrollFlag: 0,
            opacity1: .1,
            red: 234,
            green: 240,
            blue: 72,
            opacity2: 1,
            border: 0
        }), wx.setNavigationBarColor({
            frontColor: "#000000",
            backgroundColor: "#EAF048"
        }), console.log("上滑超过阀值"));
    },
    bindContinue: function() {
        wx.navigateTo({
            url: "../MatchRecord/MatchProcess/MatchProcess"
        });
    },
    BindHelp: function() {
      var t = ["http://www.game-win.cn/resource/images/help/1.JPG", "http://www.game-win.cn/resource/images/help/2.JPG", "http://www.game-win.cn/resource/images/help/3.JPG", "http://www.game-win.cn/resource/images/help/4.JPG" ];
        wx.previewImage({
            current: 0,
            urls: t
        });
    },
    bindViewTapMatchRecord: function() {
        this.setData({
            toolflag: !1
        }), setTimeout(function() {
            this.animation2.opacity(1).step(), this.animation.translateY(-300).opacity(1).step(), 
            this.setData({
                animation: this.animation.export(),
                animation2: this.animation2.export()
            });
        }.bind(this), 300);
    },
    closetool: function() {
        this.animation.translateY(300).opacity(0).step(), this.animation2.opacity(0).step(), 
        this.setData({
            animation: this.animation.export(),
            animation2: this.animation2.export()
        }), setTimeout(function() {
            this.setData({
                toolflag: !0
            });
        }.bind(this), 500);
    },
    VolleyballOneWin: function() {
        wx.navigateTo({
            url: "../MatchRecord/MatchRecord?win=1"
        });
    },
    VolleyballTwoWin: function() {
        wx.navigateTo({
            url: "../MatchRecord/MatchRecord?win=2"
        });
    },
    VolleyballThreeWin: function() {
        wx.navigateTo({
            url: "../MatchRecord/MatchRecord?win=2"
        });
    },
    Tactical: function() {
        wx.navigateTo({
            url: "../MatchBox/Tactical/Tactical"
        });
    },
    ScoreBoard: function() {
        wx.navigateTo({
            url: "../MatchBox/ScoreBoard/ScoreBoard"
        });
    },
    Coin: function() {
        wx.navigateTo({
            url: "../MatchBox/Coin/coin"
        });
    },
    nearby: function() {
        wx.navigateTo({
            url: "../Data/Court/Court"
        });
    },
    PlayVideo: function(t) {
        wx.navigateTo({
            url: "../video/player/player?title=" + t.currentTarget.dataset.title + "&link=" + t.currentTarget.dataset.link + "&qqvideo=" + t.currentTarget.dataset.qqvideo + "&group=" + t.currentTarget.dataset.group
        });
    },
    VideoList: function(t) {
        wx.navigateTo({
          url: "../video/videolist/videolist?videotype=" + t.currentTarget.dataset.type + "&title=" + t.currentTarget.dataset.title
        });
    },
    BindMatchInfo: function(t) {
        2019 == t.currentTarget.dataset.type ? wx.navigateTo({
            url: "../Data/Statistic2019/Statistic2019?matchid=" + t.currentTarget.dataset.matchid
        }) : wx.navigateTo({
            url: "../Data/Statistic/Statistic?matchid=" + t.currentTarget.dataset.matchid
        });
    },
    BindRank: function(t) {
        wx.navigateTo({
            url: "../Data/Rank/Rank"
        });
    },
    BindAllMatchData: function() {
        wx.navigateTo({
            url: "../Data/Data"
        });
    },
    History: function() {
        wx.navigateTo({
            url: "../User/History/History"
        });
    },
    FavouriteVideo: function() {
        wx.navigateTo({
            url: "../User/FavouriteVideo/FavouriteVideo"
        });
    },
    Setting: function() {
        wx.navigateTo({
            url: "../User/Setting/Setting"
        });
    },
    ShowSearch: function() {
        this.setData({
            SearchFlag: !0,
            focus: !0
        }), wx.setNavigationBarColor({
            frontColor: "#000000",
            backgroundColor: "white"
        });
    },
    ShowSearchBtn: function() {
        console.log("聚焦输入框"), this.data.SearchContent ? this.setData({
            InputFlag: !0
        }) : this.setData({
            InputFlag: !1
        });
    },
    HideSearchBtn: function() {
        this.setData({
            InputFlag: !1
        });
    },
    GetSearchContent: function(t) {
        t.detail.value ? this.setData({
            InputFlag: !0
        }) : this.setData({
            InputFlag: !1
        }), this.setData({
            SearchContent: t.detail.value
        });
    },
    CancelSearch: function() {
        this.setData({
            SearchFlag: !1,
            focus: !1
        }), wx.setNavigationBarColor({
            frontColor: "#000000",
            backgroundColor: "#EAF048"
        });
    },
    Search: function(t) {
        var a = this;
        this.setData({
            SearchFlag: !1,
            focus: !1
        }), wx.navigateTo({
            url: "../Data/search/search?value=" + a.data.SearchContent
        });
    },
    model_login: function() {
        wx.navigateTo({
            url: "../User/User"
        });
    },
    model_login_cancle: function() {
        this.setData({
            userlogin: !0
        });
    },
    onLoad: function(e) {
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
            success: function(t) {
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
            success: function(t) {
                console.log(t.data), o.setData({
                    recommand_video: t.data.data
                });
            }
        }), wx.request({
          url: "https://api.volleywang.cn/VolleyRecord/GetAllVideoList",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {},
            success: function(t) {
                console.log(t.data), o.setData({
                    videoCount: t.data.data.length,
                    videoinfo: t.data.data
                });
            }
        }), wx.request({
          url: "https://api.volleywang.cn/VolleyRecord/GetAllMatchInfo",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(t) {
                console.log(t.data), o.setData({
                    matchinfo: t.data.data,
                    matchinfo_count: t.data.data.length
                }), wx.setStorageSync("all_match_data", t.data.data);
            }
        }), 1 != wx.getStorageSync("Status") && 2 != wx.getStorageSync("Status") || this.setData({
            StatusFlag: 1,
            swiperHeight: 2270
        }), 5 == wx.getStorageSync("Status") && this.setData({
            StatusFlag: 2,
            swiperHeight: 2270
        }), this.animation = wx.createAnimation({
            duration: 500,
            timingFunction: "linear",
            delay: 0,
            transformOrigin: "left top 0"
        }), this.animation2 = wx.createAnimation({
            duration: 500,
            timingFunction: "linear",
            delay: 0,
            transformOrigin: "left top 0"
        }), a.getUserInfo(function(a) {
            o.setData({
                userInfo: a
            }), t.setpublicinfo(wx.getStorageSync("Uid"), a), console.log("插入用户公共信息");
        });
    },
    onShow: function() {
        console.log("onShow");
        var t = this;
        setTimeout(function() {
            wx.getStorageSync("userInfo") ? t.setData({
                userlogin: !0,
                userInfo: wx.getStorageSync("userInfo")
            }) : t.setData({
                userlogin: !1
            });
        }, 1e3)
        if (t.data.ScrollFlag == 1) {
          wx.setNavigationBarColor({
            frontColor: "#000000",
            backgroundColor: "#ffffff"
          })
        }
        if (t.data.ScrollFlag == 0) {
          wx.setNavigationBarColor({
            frontColor: "#000000",
            backgroundColor: "#EAF048"
          });
        }
    },
    onLaunch: function() {},
    onReady: function() {},
    onHide: function() {
        this.setData({
            userlogin: !0
        });
        this.animation.translateY(150).opacity(0).step(), this.animation2.opacity(0).step(), 
        this.setData({
            animation: this.animation.export(),
            animation2: this.animation2.export()
        }), setTimeout(function() {
            this.setData({
                toolflag: !0
            });
        }.bind(this), 500);
    },
    onShareAppMessage: function() {
        return {
          title: "赛事窗·排球数据统计",
            desc: "点击进入赛事窗",
            path: "/pages/index/index"
        };
    }
});