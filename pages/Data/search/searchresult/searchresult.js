Page({
    data: {
        resultlist: [],
        h2h: "",
        teamA: "",
        teamB: "其他学院",
        coverflag: !0,
        toastflag: !0,
        videotitle: "",
        videolink: "",
        percent: "%",
        status: 1
    },
    video: function(t) {
        this.setData({
            coverflag: !1,
            videotitle: t.currentTarget.dataset.videotitle,
            videolink: t.currentTarget.dataset.videolink
        });
    },
    closevideo: function(t) {
        this.setData({
            coverflag: !0,
            videotitle: "",
            videolink: ""
        });
    },
    copy: function(t) {
        var a = this;
        wx.setClipboardData({
            data: t.currentTarget.dataset.videolink,
            success: function() {
                a.setData({
                    toastflag: !1,
                    coverflag: !0
                });
            }
        });
    },
    toastHidden: function() {
        this.setData({
            toastflag: !0
        });
    },
    Statistic: function(t) {
        wx.navigateTo({
            url: "../../Statistic/Statistic?matchid=" + t.currentTarget.dataset.matchid
        });
    },
    onLoad: function(t) {
        var a = this;
        wx.showLoading({
            title: "正在搜索"
        }), 2 == t.status && (wx.setNavigationBarTitle({
            title: t.teamA + " vs " + t.teamB + " - 搜索结果"
        }), this.setData({
            status: t.status
        }), wx.request({
          url: "https://api.game-win.cn/VolleyRecord/Search/OneTeamMatchRecordWithOtherTeam",
            header: {
                "content-type": "application/json;charset=utf8"
            },
            method: "GET",
            data: {
                teamA: t.teamA,
                teamB: t.teamB
            },
            success: function(e) {
                console.log(e.data), a.setData({
                    resultlist: e.data.data,
                    teamA: t.teamA,
                    teamB: t.teamB
                }), wx.hideLoading();
            }
        }), wx.request({
          url: "https://api.game-win.cn/VolleyRecord/Search/OneTeamWinAndLostMatchNumberWithOtherTeam",
            header: {
                "content-type": "application/json;charset=utf8"
            },
            method: "GET",
            data: {
                teamA: t.teamA,
                teamB: t.teamB
            },
            success: function(t) {
                console.log(t.data);
                var e = (t.data.data[1] / t.data.data[0] * 100).toFixed(1);
                a.setData({
                    h2h: t.data.data,
                    percent: e
                }), wx.hideLoading();
            }
        })), 1 == t.status && (wx.setNavigationBarTitle({
            title: t.teamA + " - 搜索结果"
        }), this.setData({
            status: t.status
        }), wx.request({
          url: "https://api.game-win.cn/VolleyRecord/Search/OneTeamMatchRecordWithAllOther",
            header: {
                "content-type": "application/json;charset=utf8"
            },
            method: "GET",
            data: {
                teamA: t.teamA
            },
            success: function(e) {
                console.log(e.data), a.setData({
                    resultlist: e.data.data,
                    teamA: t.teamA
                }), wx.hideLoading();
            }
        }), wx.request({
          url: "https://api.game-win.cn/VolleyRecord/Search/OneTeamWinAndLostMatchNumberWithAllOther",
            header: {
                "content-type": "application/json;charset=utf8"
            },
            method: "GET",
            data: {
                teamA: t.teamA
            },
            success: function(t) {
                console.log(t.data);
                var e = (t.data.data[1] / t.data.data[0] * 100).toFixed(1);
                a.setData({
                    h2h: t.data.data,
                    percent: e
                }), wx.hideLoading();
            }
        }));
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var t = this;
      var route = 'Data/search/searchresult/searchresult&teamA=' + t.data.teamA + '&teamB=' + t.data.teamB + '&status=' + t.data.status
      if (t.data.status == 1) {
        return {
          title: "[数据]" + t.data.teamA,
          desc: "点击进入赛事窗",
          path: "pages/index/index?type=share&route=" + route
        };
      }
      if (t.data.status == 2) {
        return {
          title: "[数据]" + t.data.teamA + 'vs' +t.data.teamB,
          desc: "点击进入赛事窗",
          path: "pages/index/index?type=share&route=" + route
        };
      }
    }
});