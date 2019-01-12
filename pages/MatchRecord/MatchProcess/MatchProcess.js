function t(t, e, a) {
    var r = e[1];
    e[1] = e[2], e[2] = e[3], e[3] = e[4], e[4] = e[5], e[5] = e[6], e[6] = r, 0 == a ? (t.setData({
        TeamACourtPlayer: e
    }), wx.setStorageSync("TeamACourtPlayer", e)) : (t.setData({
        TeamBCourtPlayer: e
    }), wx.setStorageSync("TeamBCourtPlayer", e));
}

function e(t, e, r) {
    var o = t.data.TotalScore, S = o[0], n = o[1], i = S + n, c = wx.getStorageSync("win");
    switch (c = parseInt(c)) {
      case 1:
        if (e >= 25 && e - r >= 2) {
            var u = S + 1, l = n;
            o[0] = u, o[1] = l, o[2] = e, o[3] = r, wx.setStorageSync("TotalScore", o), wx.setStorageSync("Status", 5), 
            s(), console.log("A win a match");
        }
        if (r >= 25 && r - e >= 2) {
            var u = S, l = n + 1;
            o[0] = u, o[1] = l, o[2] = e, o[3] = r, wx.setStorageSync("TotalScore", o), wx.setStorageSync("Status", 5), 
            s(), console.log("B win a match");
        }
        break;

      case 2:
        if (0 == i && (e >= 25 && e - r >= 2 && (a(t, o, e, r, u = S + 1, l = n), console.log("A win a set")), 
        r >= 25 && r - e >= 2 && (a(t, o, e, r, u = S, l = n + 1), console.log("B win a set"))), 
        1 == i) {
            if (1 == S) {
                if (e >= 25 && e - r >= 2) {
                    var u = S + 1, l = n;
                    o[0] = u, o[1] = l, o[2 * i + 2] = e, o[2 * i + 3] = r, wx.setStorageSync("TotalScore", o), 
                    wx.setStorageSync("Status", 5), s();
                }
                r >= 25 && r - e >= 2 && (a(t, o, e, r, u = S, l = n + 1), console.log("B win a set"));
            }
            if (1 == n && (e >= 25 && e - r >= 2 && (a(t, o, e, r, u = S + 1, l = n), console.log("A win a set")), 
            r >= 25 && r - e >= 2)) {
                var u = S, l = n + 1;
                o[0] = u, o[1] = l, o[2 * i + 2] = e, o[2 * i + 3] = r, wx.setStorageSync("TotalScore", o), 
                wx.setStorageSync("Status", 5), s();
            }
        }
        if (2 == i) {
            if (e >= 15 && e - r >= 2) {
                var u = S + 1, l = n;
                o[0] = u, o[1] = l, o[2 * i + 2] = e, o[2 * i + 3] = r, wx.setStorageSync("TotalScore", o), 
                wx.setStorageSync("Status", 5), s();
            }
            if (r >= 15 && r - e >= 2) {
                var u = S, l = n + 1;
                o[0] = u, o[1] = l, o[2 * i + 2] = e, o[2 * i + 3] = r, wx.setStorageSync("TotalScore", o), 
                wx.setStorageSync("Status", 5), s();
            }
        }
    }
}

function a(t, e, a, r, o, S) {
    var n = t.data.TotalScore, i = t.data.FirstSide, s = t.data.FirstServe, c = n[0] + n[1], u = wx.getStorageSync("win");
    e[2 * c + 2] = a, e[2 * c + 3] = r, e[0] = o, e[1] = S;
    var l = new Array("a", "!", "!", "!", "!", "!", "!"), h = new Array("b", "!", "!", "!", "!", "!", "!"), g = [ 0, 0 ];
    wx.setStorageSync("CurrentScore", g), wx.setStorageSync("TotalScore", e), wx.setStorageSync("TeamACurrentSetTimeOut", 2), 
    wx.setStorageSync("TeamBCurrentSetTimeOut", 2), wx.setStorageSync("TeamACurrentSetSub", 6), 
    wx.setStorageSync("TeamBCurrentSetSub", 6), wx.setStorageSync("TeamACourtPlayer", l), 
    wx.setStorageSync("TeamBCourtPlayer", h), wx.setStorageSync("Status", 2), t.setData({
        TeamACourtPlayer: l,
        TeamBCourtPlayer: h,
        CurrentScore: g,
        TotalScore: e,
        Status: 2,
        TeamACurrentSetTimeOut: 2,
        TeamBCurrentSetTimeOut: 2,
        TeamACurrentSetSub: 6,
        TeamBCurrentSetSub: 6
    }), console.log(c), (0 == c || 2 == c && 3 == u) && (console.log("双方交换场地"), t.setData({
        Side: !i,
        LastScore: !s
    }), wx.setStorageSync("LastScore", !s), wx.setStorageSync("Side", !i), wx.showModal({
        title: "本局比赛结束",
        content: "请填写双方下一局比赛站位，点击载入站位将载入双方上一局比赛的站位",
        confirmText: "填写站位",
        cancelText: "载入站位",
        success: function(t) {
            t.confirm;
        }
    })), 1 == c && 3 == u && (t.setData({
        Side: i,
        LastScore: s
    }), wx.setStorageSync("LastScore", s), wx.setStorageSync("Side", i), wx.showModal({
        title: "本局比赛结束",
        content: "请填写双方下一局比赛站位，点击载入站位将载入双方上一局比赛的站位",
        confirmText: "填写站位",
        cancelText: "载入站位",
        success: function(t) {
            t.confirm;
        }
    })), (3 == c || 1 == c && 2 == u) && wx.showModal({
        title: "本局比赛结束",
        content: "决胜局请重新进行挑边，请填写双方下一局比赛站位，点击载入站位将载入双方上一局比赛的站位",
        confirmText: "填写站位",
        cancelText: "载入站位",
        success: function(t) {
            t.confirm;
        }
    });
}

function r(t, e, a, r, o, S, n) {
    var i = t.data.TotalScore, s = i[0] + i[1], c = wx.getStorageSync("MatchDuration"), l = [ s, e, a, r, o, S, n ];
    if (c.push(l), wx.setStorageSync("MatchDuration", c), 1 == t.data.currentTab) {
        var h = 110 * c.length;
        t.setData({
            SwiperHeight: h
        });
    }
    t.setData({
        MatchDuration: c
    }), u(t, s, e, a, r);
}

function o(t, e, a, r, o, S) {
    var n = wx.getStorageSync("TimeOut"), i = [ S, r, o, e, a ];
    if (n.push(i), wx.setStorageSync("TimeOut", n), 0 == S) {
        var s = t.data.TeamACurrentSetTimeOut - 1;
        t.setData({
            TimeOut: n,
            TeamACurrentSetTimeOut: s
        }), wx.setStorageSync("TeamACurrentSetTimeOut", s);
    }
    if (1 == S) {
        var c = t.data.TeamBCurrentSetTimeOut - 1;
        t.setData({
            TimeOut: n,
            TeamBCurrentSetTimeOut: c
        }), wx.setStorageSync("TeamBCurrentSetTimeOut", c);
    }
}

function S(t, e, a, r) {
    for (var o = t.data.TotalScore, S = o[0] + o[1], n = [], s = 0; s < a.length; s++) n[s] = a[s][0];
    for (var c = wx.getStorageSync("SubInfo"), u = new Array(), l = new Array(), s = 0; s < c.length; s++) c[s][0] == S && c[s][1] == r && (l.push(c[s][6]), 
    u.push(c[s][7]));
    var h = i(h = (h = u.concat(l)).concat(e), n);
    console.log(h);
    for (var g = 0, T = 0, s = 0; s < c.length; s++) t.data.PickedPlayer == c[s][7] && c[s][1] == r && c[s][0] == S && (g++, 
    T = s), t.data.PickedPlayer == c[s][6] && c[s][1] == r && c[s][0] == S && g++;
    1 == g && (h = [ c[T][6] ]), 2 == g && (h = [ "-" ]), t.setData({
        LeftPlayer: h
    }), console.log(h);
}

function n(t, e, a, r, o, S, n, i) {
    var s = o + S, c = wx.getStorageSync("SubInfo"), u = [ s, e, o, S, a, r, n, i ];
    if (c.push(u), wx.setStorageSync("SubInfo", c), 0 == e) {
        var l = t.data.TeamACurrentSetSub - 1, h = t.data.TeamACourtPlayer;
        h[t.data.currentTeamAPosition] = i, t.setData({
            SubInfo: c,
            TeamACurrentSetSub: l,
            TeamACourtPlayer: h
        }), wx.setStorageSync("TeamACurrentSetSub", l), wx.setStorageSync("TeamACourtPlayer", h);
    }
    if (1 == e) {
        var g = t.data.TeamBCurrentSetSub - 1, T = t.data.TeamBCourtPlayer;
        T[t.data.currentTeamBPosition] = i, t.setData({
            SubInfo: c,
            TeamBCurrentSetSub: g,
            TeamBCourtPlayer: T
        }), wx.setStorageSync("TeamBCurrentSetSub", g), wx.setStorageSync("TeamBCourtPlayer", T);
    }
}

function i(t, e) {
    for (var a = new Array(), r = t.concat(e), o = new Array(), S = 0; S < r.length; S++) r[S] in a ? a[r[S]]++ : a[r[S]] = 1;
    for (S = 0; S < a.length; S++) 1 == a[S] && o.push(S);
    return o;
}

function s() {
    wx.showModal({
        title: "提示",
        content: "比赛结束，点击确认比赛结果",
        showCancel: !1,
        success: function(t) {
            t.confirm && wx.redirectTo({
                url: "../../EndMatch/EndMatch"
            });
        }
    });
}

function c(t) {
    return "SpikePoint" == t && (t = "进攻得分"), "ServePoint" == t && (t = "发球得分"), "BlockPoint" == t && (t = "拦网得分"), 
    "ServeFault" == t && (t = "发球失误"), "SpikeFault" == t && (t = "进攻失误"), "OtherFault" == t && (t = "拦网失误"), 
    t;
}

function u(t, e, a, r, o) {
    var S = wx.getStorageSync("win");
    t.data.LastScore;
    if (2 == S && 2 == e && (console.log("12"), 8 == a && r < 8 && 0 == o || 8 == r && a < 8 && 1 == o)) {
        console.log(a);
        var n = !t.data.Side;
        t.setData({
            Side: n
        }), wx.setStorageSync("Side", n), wx.showModal({
            title: "提示",
            content: "双方交换场地",
            showCancel: !1
        });
    }
    3 == S && 4 == e && (8 == a && r < 8 || 8 == r && a < 8) && (t.setData({
        Side: !t.data.side
    }), wx.showModal({
        title: "提示",
        content: "双方交换场地",
        showCancel: !1
    }));
}

Page({
    data: {
        currentTab: 0,
        SwiperHeight: 600,
        TeamAPlayer: [],
        TeamBPlayer: [],
        TeamACourtPlayer: [ "a", "!", "!", "!", "!", "!", "!" ],
        TeamBCourtPlayer: [ "b", "!", "!", "!", "!", "!", "!" ],
        ShowTeamAALLPlayer: !0,
        ShowTeamBALLPlayer: !0,
        Status: 0,
        CurrentScore: [],
        TotalScore: [],
        TimeOut: [],
        SubInfo: [],
        TeamACurrentSetTimeOut: 2,
        TeamBCurrentSetTimeOut: 2,
        TeamACurrentSetSub: 6,
        TeamBCurrentSetSub: 6,
        LastScore: 0,
        FirstServe: 0,
        FirstSide: 0,
        time: 30,
        Statisticflag: !0,
        ShowTeamAPlayer: !0,
        ShowTeamBPlayer: !0,
        ShowTimeOut: !0,
        ShowTeamABenchPlayer: !0,
        ShowTeamBBenchPlayer: !0,
        ShowEditAScore: !0,
        ShowEditBScore: !0,
        Side: 0
    },
    BindHelp: function() {
        var t = [ "https://volleywang.cn/liansaiquan/images/help/1.jpg", "https://volleywang.cn/liansaiquan/images/help/2.jpg", "https://volleywang.cn/liansaiquan/images/help/3.jpg", "https://volleywang.cn/liansaiquan/images/help/4.jpg" ];
        wx.previewImage({
            current: 0,
            urls: t
        });
    },
    bindChange: function(t) {
        var e = this;
        if (e.setData({
            currentTab: t.detail.current
        }), 0 == t.detail.current && e.setData({
            SwiperHeight: 600
        }), 1 == t.detail.current) {
            a = 110 * this.data.MatchDuration.length;
            e.setData({
                SwiperHeight: a
            });
        }
        if (2 == t.detail.current) {
            a = 80 * this.data.SubInfo.length + 170;
            e.setData({
                SwiperHeight: a
            });
        }
        if (3 == t.detail.current) {
            var a = 80 * this.data.TimeOut.length + 170;
            e.setData({
                SwiperHeight: a
            });
        }
    },
    swichNav: function(t) {
        this.setData({
            currentTab: t.target.dataset.current
        });
    },
    EditAScore: function() {
        this.setData({
            ShowEditAScore: !1
        });
    },
    EditBScore: function() {
        this.setData({
            ShowEditBScore: !1
        });
    },
    GetTeamANewScore: function(t) {
        this.setData({
            ANewScore: t.detail.value
        });
    },
    GetTeamBNewScore: function(t) {
        this.setData({
            BNewScore: t.detail.value
        });
    },
    ConfirmTeamANewScore: function(t) {
        var e = this, a = parseInt(e.data.ANewScore);
        if (a > 24) wx.showModal({
            title: "提示",
            content: "输入的比分不能大于24，请重新输入",
            showCancel: !1
        }); else {
            var r = this.data.CurrentScore;
            r = [ a, r[1] ], this.setData({
                CurrentScore: r,
                ShowEditAScore: !0
            }), wx.setStorageSync("CurrentScore", r);
        }
    },
    ChangeTeamAPosition: function(e) {
        t(this, this.data.TeamACourtPlayer, 0);
    },
    ChangeTeamBPosition: function(e) {
        t(this, this.data.TeamBCourtPlayer, 1);
    },
    ConfirmTeamBNewScore: function(t) {
        var e = this, a = parseInt(e.data.BNewScore);
        if (a > 24) wx.showModal({
            title: "提示",
            content: "输入的比分不能大于24，请重新输入",
            showCancel: !1
        }); else {
            var r = this.data.CurrentScore;
            r = [ r[0], a ], this.setData({
                CurrentScore: r,
                ShowEditBScore: !0
            }), wx.setStorageSync("CurrentScore", r);
        }
    },
    ChooseTeamAPlayer: function(t) {
        console.log("ChooseTeamAPlayer");
        var e = this.data.TeamACourtPlayer, a = t.currentTarget.dataset.position, r = this.data.TeamAPlayer;
        if (2 == wx.getStorageSync("Status") && this.setData({
            ShowTeamAALLPlayer: !1,
            currentTeamAPosition: a
        }), 1 == this.data.Status) {
            var o = e[a];
            this.setData({
                PickedPlayer: o,
                currentTeamAPosition: a,
                ShowTeamABenchPlayer: !1
            }), S(this, e, r, 0);
        }
    },
    ChooseTeamBPlayer: function(t) {
        var e = this.data.TeamBCourtPlayer, a = t.currentTarget.dataset.position, r = this.data.TeamBPlayer;
        if (2 == wx.getStorageSync("Status") && this.setData({
            ShowTeamBALLPlayer: !1,
            currentTeamBPosition: a
        }), 1 == this.data.Status) {
            var o = e[a];
            this.setData({
                PickedPlayer: o,
                currentTeamBPosition: a,
                ShowTeamBBenchPlayer: !1
            }), S(this, e, r, 1);
        }
    },
    SetTeamAPlayer: function(t) {
        var e = this, a = this.data.currentTeamAPosition, r = this.data.TeamACourtPlayer, o = this.data.TeamBCourtPlayer, S = wx.getStorageSync("AllTeamACourtPlayer"), n = wx.getStorageSync("AllTeamBCourtPlayer");
        e.data.AMatch, e.data.BMatch;
        r[a] = t.currentTarget.dataset.num, this.setData({
            TeamACourtPlayer: r,
            ShowTeamAALLPlayer: !0
        }), "!" != r[1] && "!" != r[2] && "!" != r[3] && "!" != r[4] && "!" != r[5] && "!" != r[6] && "!" != o[1] && "!" != o[2] && "!" != o[3] && "!" != o[4] && "!" != o[5] && "!" != o[6] && wx.showModal({
            title: "提示",
            content: "是否确认本局比赛双方的首发队员",
            cancelText: "返回修改",
            confirmText: "开始比赛",
            success: function(t) {
                t.confirm && (S.push(r), n.push(o), wx.setStorageSync("AllTeamACourtPlayer", S), 
                wx.setStorageSync("AllTeamBCourtPlayer", n), wx.setStorageSync("TeamALineUp", r), 
                wx.setStorageSync("TeamBLineUp", o), wx.setStorageSync("TeamACourtPlayer", r), wx.setStorageSync("TeamBCourtPlayer", o), 
                wx.setStorageSync("Status", 1), e.setData({
                    Status: 1
                }));
            }
        });
    },
    SetTeamBPlayer: function(t) {
        var e = this, a = this.data.currentTeamBPosition, r = this.data.TeamACourtPlayer, o = this.data.TeamBCourtPlayer, S = wx.getStorageSync("AllTeamACourtPlayer"), n = wx.getStorageSync("AllTeamBCourtPlayer");
        e.data.AMatch, e.data.BMatch;
        o[a] = t.currentTarget.dataset.num, this.setData({
            TeamBCourtPlayer: o,
            ShowTeamBALLPlayer: !0
        }), "!" != r[1] && "!" != r[2] && "!" != r[3] && "!" != r[4] && "!" != r[5] && "!" != r[6] && "!" != o[1] && "!" != o[2] && "!" != o[3] && "!" != o[4] && "!" != o[5] && "!" != o[6] && wx.showModal({
            title: "提示",
            content: "是否确认本局比赛双方的首发队员",
            cancelText: "返回修改",
            confirmText: "开始比赛",
            success: function(t) {
                t.confirm && (S.push(r), n.push(o), wx.setStorageSync("AllTeamACourtPlayer", S), 
                wx.setStorageSync("AllTeamBCourtPlayer", n), wx.setStorageSync("TeamALineUp", r), 
                wx.setStorageSync("TeamBLineUp", o), wx.setStorageSync("TeamACourtPlayer", r), wx.setStorageSync("TeamBCourtPlayer", o), 
                wx.setStorageSync("Status", 1), e.setData({
                    Status: 1
                }));
            }
        });
    },
    actionSheetbindchange: function() {
        this.setData({
            ShowTeamAALLPlayer: !0,
            ShowTeamBALLPlayer: !0
        });
    },
    AddTeamAScore: function() {
        if (2 != wx.getStorageSync("Status")) {
            var t = this.data.CurrentScore, e = t[0], a = (t[1], e + 1);
            this.data.LastScore;
            t[0] = a, this.setData({
                CurrentScore: t,
                LastScore_tmp: 0,
                Statisticflag: !1
            }), wx.setStorageSync("LastScore", 0), wx.setStorageSync("CurrentScore", t);
        } else wx.showModal({
            title: "提示",
            content: "请填写队员站位",
            showCancel: !1
        });
    },
    AddTeamBScore: function() {
        if (2 != wx.getStorageSync("Status")) {
            var t = this.data.CurrentScore, e = (t[0], t[1] + 1);
            this.data.LastScore;
            t[1] = e, this.setData({
                CurrentScore: t,
                LastScore_tmp: 1,
                Statisticflag: !1
            }), wx.setStorageSync("LastScore", 1), wx.setStorageSync("CurrentScore", t);
        } else wx.showModal({
            title: "提示",
            content: "请填写队员站位",
            showCancel: !1
        });
    },
    StatisticBack: function(t) {
        var e = this.data.LastScore_tmp, a = this.data.LastScore, r = this.data.CurrentScore, o = r[0], S = r[1];
        switch (e) {
          case 0:
            r[0] = o - 1;
            break;

          case 1:
            r[1] = S - 1;
        }
        wx.setStorageSync("LastScore", a), wx.setStorageSync("CurrentScore", r), this.setData({
            CurrentScore: r,
            Statisticflag: !0
        });
    },
    StatisticPoint: function(a) {
        var o = a.currentTarget.dataset.point_flag, S = a.currentTarget.dataset.point_type, n = this.data.CurrentScore, i = n[0], s = n[1], c = this.data.LastScore_tmp;
        if (this.setData({
            Statisticflag: !0,
            point_type: S,
            point_flag: o
        }), 0 == o && (0 == this.data.LastScore_tmp ? this.setData({
            ShowTeamAPlayer: !1
        }) : this.setData({
            ShowTeamBPlayer: !1
        })), 1 == o && (0 == this.data.LastScore_tmp ? this.setData({
            ShowTeamBPlayer: !1
        }) : this.setData({
            ShowTeamAPlayer: !1
        })), 2 == o) {
            var u = this.data.TeamACourtPlayer, l = this.data.TeamBCourtPlayer;
            0 == c && (1 == this.data.LastScore && t(this, u, 0), this.setData({
                LastScore: 0
            })), 1 == c && (0 == this.data.LastScore && t(this, l, 1), this.setData({
                LastScore: 1
            })), r(this, i, s, c, S, 0), e(this, i, s);
        }
    },
    SetStatistic: function(a) {
        var o = a.currentTarget.dataset.position, S = this.data.point_type, n = this.data.point_flag, i = this.data.TeamACourtPlayer, s = this.data.TeamBCourtPlayer, u = this.data.CurrentScore, l = u[0], h = u[1], g = this.data.LastScore_tmp;
        if (this.setData({
            ShowTeamBPlayer: !0,
            ShowTeamAPlayer: !0
        }), 0 == g) {
            if (0 == this.data.point_flag) {
                w = wx.getStorageSync("TeamAStatistic");
                console.log(o), "SpikePoint" == S && (w[o][0].SpikePoint = w[o][0].SpikePoint + 1), 
                "BlockPoint" == S && (w[o][0].BlockPoint = w[o][0].BlockPoint + 1), "ServePoint" == S && (w[o][0].ServePoint = w[o][0].ServePoint + 1), 
                wx.setStorageSync("TeamAStatistic", w);
            }
            if (1 == this.data.point_flag) {
                T = wx.getStorageSync("TeamBStatistic");
                "SpikeFault" == S && (T[o][0].SpikeFault = T[o][0].SpikeFault + 1), "ServeFault" == S && (T[o][0].ServeFault = T[o][0].ServeFault + 1), 
                "OtherFault" == S && (T[o][0].OtherFault = T[o][0].OtherFault + 1), wx.setStorageSync("TeamBStatistic", T);
            }
            1 == this.data.LastScore && t(this, i, 0), this.setData({
                LastScore: 0
            });
        }
        if (1 == g) {
            if (0 == this.data.point_flag) {
                var T = wx.getStorageSync("TeamBStatistic");
                "SpikePoint" == S && (T[o][0].SpikePoint = T[o][0].SpikePoint + 1), "BlockPoint" == S && (T[o][0].BlockPoint = T[o][0].BlockPoint + 1), 
                "ServePoint" == S && (T[o][0].ServePoint = T[o][0].ServePoint + 1), wx.setStorageSync("TeamBStatistic", T);
            }
            if (1 == this.data.point_flag) {
                var w = wx.getStorageSync("TeamAStatistic");
                "SpikeFault" == S && (w[o][0].SpikeFault = w[o][0].SpikeFault + 1), "ServeFault" == S && (w[o][0].ServeFault = w[o][0].ServeFault + 1), 
                "OtherFault" == S && (w[o][0].OtherFault = w[o][0].OtherFault + 1), wx.setStorageSync("TeamAStatistic", w);
            }
            0 == this.data.LastScore && t(this, s, 1), this.setData({
                LastScore: 1
            });
        }
        r(this, l, h, g, S = c(S), o, n), e(this, l, h);
    },
    ChangeServe: function() {
        var t = !this.data.LastScore;
        this.setData({
            LastScore: t
        }), wx.setStorageSync("LastScore", t);
    },
    ChangeSide: function() {
        var t = !this.data.Side;
        this.setData({
            Side: t
        }), wx.setStorageSync("Side", t);
    },
    TimeOut: function(t) {
        var e = this, a = this.data.CurrentScore, r = this.data.TotalScore, S = a[0], n = a[1], i = r[0], s = r[1];
        if (0 != t.currentTarget.dataset.team || 0 != this.data.TeamACurrentSetTimeOut) if (1 != t.currentTarget.dataset.team || 0 != this.data.TeamBCurrentSetTimeOut) {
            this.setData({
                ShowTimeOut: !1
            }), o(this, S, n, i, s, t.currentTarget.dataset.team);
            var c = 30, u = setInterval(function() {
                e.setData({
                    time: c--
                });
            }, 1e3);
            setTimeout(function() {
                e.setData({
                    ShowTimeOut: !0,
                    time: 30
                }), clearInterval(u);
            }, 32e3);
        } else wx.showModal({
            title: "提示",
            content: e.data.MatchInfo[2] + "本局比赛的换人次数已用完",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: e.data.MatchInfo[1] + "本局比赛的换人次数已用完",
            showCancel: !1
        });
    },
    BindClose: function() {
        this.setData({
            ShowTeamAPlayer: !0,
            ShowTeamBPlayer: !0,
            ShowTeamBBenchPlayer: !0,
            ShowTeamABenchPlayer: !0,
            ShowEditAScore: !0,
            ShowEditBScore: !0
        });
    },
    ConfirmSub: function(t) {
        var e = this.data.CurrentScore, a = this.data.TotalScore, r = e[0], o = e[1], S = a[0], i = a[1];
        n(this, t.currentTarget.dataset.team, r, o, S, i, this.data.PickedPlayer, t.currentTarget.dataset.position), 
        this.setData({
            ShowTeamABenchPlayer: !0,
            ShowTeamBBenchPlayer: !0
        });
    },
    onLoad: function(t) {
        var e = this, a = wx.getStorageSync("TeamAPlayer"), r = wx.getStorageSync("TeamBPlayer");
        if (1 != wx.getStorageSync("Status") && 2 != wx.getStorageSync("Status") || e.setData({
            TeamACourtPlayer: wx.getStorageSync("TeamACourtPlayer"),
            TeamBCourtPlayer: wx.getStorageSync("TeamBCourtPlayer"),
            LastScore: wx.getStorageSync("LastScore"),
            Side: wx.getStorageSync("Side"),
            CurrentScore: wx.getStorageSync("CurrentScore"),
            TotalScore: wx.getStorageSync("TotalScore"),
            SubInfo: wx.getStorageSync("SubInfo"),
            MatchDuration: wx.getStorageSync("MatchDuration"),
            TimeOut: wx.getStorageSync("TimeOut"),
            TeamACurrentSetTimeOut: wx.getStorageSync("TeamACurrentSetTimeOut"),
            TeamBCurrentSetTimeOut: wx.getStorageSync("TeamBCurrentSetTimeOut"),
            TeamACurrentSetSub: wx.getStorageSync("TeamACurrentSetSub"),
            TeamBCurrentSetSub: wx.getStorageSync("TeamBCurrentSetSub"),
            Status: wx.getStorageSync("Status")
        }), 0 == wx.getStorageSync("Status")) {
            for (var o = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], S = [ 0, 0 ], n = wx.getStorageSync("FirstSide"), i = wx.getStorageSync("FirstServe"), c = [], u = [], l = 0; l < a.length; l++) c[a[l][0]] = [ {
                ServePoint: 0,
                BlockPoint: 0,
                SpikePoint: 0,
                ServeFault: 0,
                SpikeFault: 0,
                OtherFault: 0
            } ];
            for (l = 0; l < r.length; l++) u[r[l][0]] = [ {
                ServePoint: 0,
                BlockPoint: 0,
                SpikePoint: 0,
                ServeFault: 0,
                SpikeFault: 0,
                OtherFault: 0
            } ];
            this.setData({
                TeamAStatistic: c,
                TeamBStatistic: u,
                TotalScore: o,
                CurrentScore: S,
                FirstServe: i,
                FirstSide: n,
                LastScore: i,
                Side: n,
                MatchDuration: [],
                SubInfo: [],
                TimeOut: [],
                Status: 2
            });
            var h = [ "a", "!", "!", "!", "!", "!", "!" ];
            wx.setStorageSync("CurrentScore", S), wx.setStorageSync("TotalScore", o), wx.setStorageSync("SubInfo", []), 
            wx.setStorageSync("MatchDuration", []), wx.setStorageSync("TimeOut", []), wx.setStorageSync("TeamACurrentSetTimeOut", 2), 
            wx.setStorageSync("TeamBCurrentSetTimeOut", 2), wx.setStorageSync("TeamACurrentSetSub", 6), 
            wx.setStorageSync("TeamBCurrentSetSub", 6), wx.setStorageSync("LastScore", i), wx.setStorageSync("Side", n), 
            wx.setStorageSync("Status", 2), wx.setStorageSync("TeamAStatistic", c), wx.setStorageSync("TeamBStatistic", u), 
            wx.setStorageSync("TeamACourtPlayer", h), wx.setStorageSync("TeamBCourtPlayer", h), 
            wx.setStorageSync("AllTeamACourtPlayer", []), wx.setStorageSync("AllTeamBCourtPlayer", []);
        }
        5 == wx.getStorageSync("Status") && s(), e.setData({
            TeamAPlayer: a,
            TeamBPlayer: r,
            MatchInfo: wx.getStorageSync("Matchinfo")
        });
    },
    onReady: function() {},
    onShow: function() {}
});