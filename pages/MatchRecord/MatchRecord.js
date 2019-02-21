var a = require("../../utils/util.js");

Page({
    data: {
        currentTab: "0",
        TeamANum: [],
        TeamBNum: [],
        TeamACount: 0,
        TeamBCount: 0,
        Ref1: "HDU",
        Ref2: "HDU",
        Ref3: "HDU",
        Ref4: "HDU",
        MatchName: "",
        TeamAName: "……",
        TeamBName: "……",
        FirstServe: 2,
        FirstSide: 2,
        swiperHeight: 1200,
        ShowAddPlayer: !0,
        AddPlayerTeamFlag: 0
    },
    bindChange: function(a) {
        if (this.setData({
            currentTab: a.detail.current
        }), 0 == a.detail.current && this.setData({
            swiperHeight: 1200
        }), 1 == a.detail.current) {
            var t = 1300, e = this.data.TeamACount;
            0 == e && (t = 1300), e > 0 && e <= 6 && (t = 1530), e > 6 && (t = 1630), this.setData({
                swiperHeight: t
            });
        }
        if (2 == a.detail.current) {
            var t = 1300, s = this.data.TeamBCount;
            0 == s && (t = 1300), s > 0 && s <= 6 && (t = 1530), s > 6 && (t = 1630), this.setData({
                swiperHeight: t
            });
        }
        3 == a.detail.current && this.setData({
            swiperHeight: 1200
        });
    },
    swichNav: function(a) {
        this.setData({
            currentTab: a.target.dataset.current
        });
    },
    Coin: function() {
        var a = 3, t = this, e = setInterval(function() {
            wx.showLoading({
                title: "正在抛硬币~" + a,
                mask: !0
            }), a--;
        }, 1e3);
        Math.random() < .5 ? t.setData({
            coin: "正面"
        }) : t.setData({
            coin: "反面"
        }), setTimeout(function() {
            wx.hideLoading(), clearInterval(e), wx.showModal({
                title: "挑边结果",
                content: t.data.coin,
                showCancel: !1
            });
        }, 3400);
    },
    ChoosePlayerTeamA: function(a) {
        var t, e = 0, s = this.data.TeamACount, i = this.data.TeamANum, n = a.currentTarget.dataset.num, r = this.data.TeamANumFlag, m = 0, o = -1, u = i.length;
        for (e = 0; e < u; e++) i[e][0] == n && (m = 1, o = e);
        if (0 == m) {
            if (s >= 12) return void wx.showToast({
                title: "已达到队员上限"
            });
            var h = [ n, "赛事窗" ];
            i.push(h), s++, r[n] = 1;
        } else i.splice(o, 1), s--, r[n] = 0;
        0 == s && (t = 1300), s > 0 && s <= 6 && (t = 1530), s > 6 && (t = 1630), this.setData({
            TeamACount: s,
            TeamANum: i,
            TeamANumFlag: r,
            swiperHeight: t
        });
    },
    ChoosePlayerTeamB: function(a) {
        var t, e = 0, s = this.data.TeamBCount, i = this.data.TeamBNum, n = a.currentTarget.dataset.num, r = this.data.TeamBNumFlag, m = 0, o = -1, u = i.length;
        for (e = 0; e < u; e++) i[e][0] == n && (m = 1, o = e);
        if (0 == m) {
            if (s >= 12) return void wx.showToast({
                title: "已达到队员上限"
            });
            var h = [ n, "赛事窗" ];
            i.push(h), s++, r[n] = 1;
        } else i.splice(o, 1), s--, r[n] = 0;
        0 == s && (t = 1300), s > 0 && s <= 6 && (t = 1530), s > 6 && (t = 1630), this.setData({
            TeamBCount: s,
            TeamBNum: i,
            TeamBNumFlag: r,
            swiperHeight: t
        });
    },
    AddPlayer: function(a) {
        this.setData({
            ShowAddPlayer: !1,
            AddPlayerTeamFlag: a.currentTarget.dataset.team
        });
    },
    AddPlayerBack: function() {
        this.setData({
            ShowAddPlayer: !0
        });
    },
    GetPlayerNewNum: function(a) {
        0 == this.data.AddPlayerTeamFlag ? this.setData({
            TemaAPlayerTemp: a.detail.value
        }) : this.setData({
            TemaBPlayerTemp: a.detail.value
        });
    },
    ConfirmNewPlayer: function() {
        var a = 0;
        if (0 == this.data.AddPlayerTeamFlag) var t = this.data.TeamACount, e = this.data.TeamANum, s = this.data.TemaAPlayerTemp, i = this.data.TeamANumFlag; else var t = this.data.TeamBCount, e = this.data.TeamBNum, s = this.data.TemaBPlayerTemp, i = this.data.TeamBNumFlag;
        var n, r = 0, m = e.length;
        if (t >= 12) wx.showToast({
            title: "已达到队员上限"
        }); else {
            for (a = 0; a < m; a++) e[a][0] == s && (r = 1, a);
            if (0 == r) {
                var o = [ s, "赛事窗" ];
                e.push(o), t++, i[s] = 1, wx.showToast({
                    title: "添加成功"
                }), 0 == t && (n = 1300), t > 0 && t <= 6 && (n = 1530), t > 6 && (n = 1630), 0 == this.data.AddPlayerTeamFlag ? this.setData({
                    TeamACount: t,
                    TeamANum: e,
                    TeamANumFlag: i,
                    ShowAddPlayer: !0,
                    swiperHeight: n
                }) : this.setData({
                    TeamBCount: t,
                    TeamBNum: e,
                    TeamBNumFlag: i,
                    ShowAddPlayer: !0,
                    swiperHeight: n
                });
            } else wx.showToast({
                title: "该队员已添加"
            });
        }
    },
    DeleteTeamAPlayer: function(a) {
        for (var t, e = this.data.TeamACount, s = this.data.TeamANum, i = a.currentTarget.dataset.num, n = this.data.TeamANumFlag, r = -1, m = s.length, o = 0; o < m; o++) s[o][0] == i && (r = o);
        -1 != r && (e--, n[i] = 0, s.splice(r, 1), 0 == e && (t = 1300), e > 0 && e <= 6 && (t = 1530), 
        e > 6 && (t = 1630), this.setData({
            TeamACount: e,
            TeamANum: s,
            TeamANumFlag: n,
            swiperHeight: t
        }));
    },
    DeleteTeamBPlayer: function(a) {
        for (var t, e = this.data.TeamBCount, s = this.data.TeamBNum, i = a.currentTarget.dataset.num, n = this.data.TeamBNumFlag, r = -1, m = s.length, o = 0; o < m; o++) s[o][0] == i && (r = o);
        -1 != r && (e--, n[i] = 0, s.splice(r, 1), 0 == e && (t = 1300), e > 0 && e <= 6 && (t = 1530), 
        e > 6 && (t = 1630), this.setData({
            TeamBCount: e,
            TeamBNum: s,
            TeamBNumFlag: n,
            swiperHeight: t
        }));
    },
    GetMatchName: function(a) {
        this.setData({
            MatchName: a.detail.value
        });
    },
    GetRef1: function(a) {
        this.setData({
            Ref1: a.detail.value
        });
    },
    GetRef2: function(a) {
        this.setData({
            Ref2: a.detail.value
        });
    },
    GetRef3: function(a) {
        this.setData({
            Ref3: a.detail.value
        });
    },
    GetRef4: function(a) {
        this.setData({
            Ref4: a.detail.value
        });
    },
    GetTeamAName: function(a) {
        this.setData({
            TeamAName: a.detail.value
        });
    },
    GetTeamBName: function(a) {
        this.setData({
            TeamBName: a.detail.value
        });
    },
    ChooseServer: function(a) {
        this.setData({
            FirstServe: a.currentTarget.dataset.team
        });
    },
    ChooseSide: function(a) {
        this.setData({
            FirstSide: a.currentTarget.dataset.team
        });
    },
    BindConfirm: function() {
        var t = this;
        !this.data.MatchName || !this.data.TeamAName || !this.data.TeamBName || this.data.TeamACount < 6 || this.data.TeamBCount < 6 ? wx.showModal({
            title: "提示",
            content: "比赛信息填写不完整",
            showCancel: !1
        }) : wx.showModal({
            title: "提示",
            content: "请确认信息填写正确",
            confirmText: "开始比赛",
            cancelText: "返回修改",
            success: function(e) {
                if (e.confirm) {
                    var s = t.data.TeamANum, i = t.data.TeamBNum, n = parseInt(t.data.FirstServe), r = parseInt(t.data.FirstSide), m = new Array();
                    m.push(t.data.MatchName), m.push(t.data.TeamAName), m.push(t.data.TeamBName), m.push(t.data.Ref1), 
                    m.push(t.data.Ref2), m.push(t.data.Ref3), m.push(t.data.Ref4), m.push(a.formatTime(new Date())), 
                    wx.setStorageSync("TeamAPlayer", s), wx.setStorageSync("TeamBPlayer", i), wx.setStorageSync("Status", 0), 
                    wx.setStorageSync("Matchinfo", m), wx.setStorageSync("FirstServe", n), wx.setStorageSync("FirstSide", r), 
                    wx.navigateTo({
                        url: "MatchProcess/MatchProcess"
                    });
                }
            }
        });
    },
    onLoad: function(a) {
        if (wx.getStorageSync("userInfo") || wx.showModal({
            title: "提示",
            content: "使用数据记录功能需要获取您的公开信息（昵称、头像等），请返回重试",
            showCancel: !1,
            success: function(a) {
                a.confirm && wx.navigateBack();
            }
        }), 1 === wx.getStorageSync("Status") || 2 == wx.getStorageSync("Status") || 5 == wx.getStorageSync("Status")) wx.showModal({
            title: "提示",
            content: "是否载入未结束的比赛",
            success: function(a) {
                if (a.confirm && wx.navigateTo({
                    url: "MatchProcess/MatchProcess"
                }), a.cancel) {
                    var t = wx.getStorageSync("Uid"), e = wx.getStorageSync("userInfo");
                    wx.clearStorage(), setTimeout(function() {
                        wx.setStorageSync("Uid", t), wx.setStorageSync("userInfo", e);
                    }, 1e3), wx.navigateBack();
                }
            }
        }); else {
            var t = parseInt(a.win);
            wx.setStorageSync("win", t);
        }
        var e = new Array("0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0");
        this.setData({
            TeamANumFlag: e,
            TeamBNumFlag: e
        });
    }
});