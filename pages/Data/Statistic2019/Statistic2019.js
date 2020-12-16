Page({
    data: {
        currentTab: "0",
        swiperHeight: 2700,
      imgalist: [ "http://www.aibotiyu.com/ImgFiles/ABSports/matchwin/video/player/pay.png" ],
        favorFlag: 0
    },
    bindChange: function(t) {
        var a = this;
        if (a.setData({
            currentTab: t.detail.current
        }), 0 == t.detail.current && this.setData({
            swiperHeight: 2700
        }), 1 == t.detail.current) {
            var e = 110 * a.data.length + 600;
            a.setData({
                swiperHeight: e
            });
        }
        2 == t.detail.current && a.setData({
            swiperHeight: 2800
        });
    },
    swichNav: function(t) {
        this.setData({
            currentTab: t.target.dataset.current
        });
    },
    BindBack: function() {
        1 == getCurrentPages().length ? wx.navigateTo({
            url: "../../index/index"
        }) : wx.navigateBack();
    },
    BindFavor: function() {
        var t = wx.getStorageSync("my_favourite_statistic"), a = this.data.matchinfo;
        t ? t.push(a) : (t = []).push(a), wx.setStorageSync("my_favourite_statistic", t), 
        this.setData({
            favorFlag: 1
        }), wx.showModal({
            title: "收藏成功",
            content: "可在[主页-我-我的收藏]中查看",
            showCancel: !1
        });
    },
    BindFavor_cancle: function() {
        var t = this, a = wx.getStorageSync("my_favourite_statistic");
        a.splice(t.data.favorId, 1), wx.setStorageSync("my_favourite_statistic", a), t.setData({
            favorFlag: 0
        }), wx.showToast({
            title: "取消收藏",
            icon: "success",
            image: "",
            duration: 1e3,
            mask: !0
        });
    },
    BindGift: function() {
        var t = this;
        wx.previewImage({
            current: 0,
            urls: t.data.imgalist
        });
    },
    onLoad: function(t) {
        var a = this, e = t.matchid;
        a.setData({
            matchid: t.matchid
        }), wx.request({
          url: "https://api.game-win.cn/VolleyRecord/GetOneMatchInfo",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
                matchid: e
            },
            success: function(t) {
                console.log(t.data);
                for (var e = t.data.data, n = parseInt(e[0].Amatch) + parseInt(e[0].Bmatch), i = wx.getStorageSync("my_favourite_statistic"), o = 0; o < i.length; o++) i[o][0].matchid == e[0].matchid && a.setData({
                    favorFlag: 1,
                    favorId: o
                });
                a.setData({
                    matchinfo: e,
                    match: n
                });
            }
        }), wx.request({
          url: "https://api.game-win.cn/VolleyRecord/GetPlayerStatisticNew",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
                matchid: e
            },
            success: function(t) {
                var e = 0, n = t.data.data, i = 0, o = 0, c = 0, s = 0, r = 0, d = [];
                for (e; e < n.length; e++) (s = parseInt(n[e].BlockPoint) + parseInt(n[e].ServePoint) + parseInt(n[e].SpikePoint)) > r && (r = s, 
                i = n[e].name, o = n[e].num, c = n[e].team, d = [ s, n[e].SpikePoint, n[e].ServePoint, n[e].BlockPoint ]);
                console.log(t.data), a.setData({
                    statistic: n,
                    PlayerName: i,
                    PlayerNum: o,
                    TeamFlag: c,
                    BestScore: d
                });
            }
        }), wx.request({
          url: "https://api.game-win.cn/VolleyRecord/GetOneMatchStatistic",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
                matchid: e
            },
            success: function(t) {
                console.log(t.data), a.setData({
                    teamstatistic: t.data.data
                });
            }
        }), wx.request({
          url: "https://api.game-win.cn/VolleyRecord/GetMatchDuration",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
                matchid: e
            },
            success: function(t) {
                console.log(t.data), a.setData({
                    MatchDuration: t.data.data,
                    length: t.data.data.length
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
      var t = this;
      var route = 'Data/Statistic2019/Statistic2019&matchid=' + t.data.matchid
      return {
          title: "[数据]" + t.data.matchinfo[0].teamAname + "vs" + t.data.matchinfo[0].teamBname,
          desc: "点击进入赛事窗",
          path: "pages/index/index?type=share&route=" + route
      };
    }
});