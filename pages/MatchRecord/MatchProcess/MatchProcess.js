var util = require("../../../utils/util.js");

//调整轮次
function TurnPosition(that, player, team) {
  var player_temp = player[1]
  player[1] = player[2]
  player[2] = player[3]
  player[3] = player[4]
  player[4] = player[5]
  player[5] = player[6]
  player[6] = player_temp

  if (team == 0) {
    that.setData({
      TeamACourtPlayer: player
    })
    wx.setStorageSync("TeamACourtPlayer", player)
  } else {
    that.setData({
      TeamBCourtPlayer: player
    })
    wx.setStorageSync("TeamBCourtPlayer", player)
  }
}

function EndMatch(that, AScore, BScore) {
  var TotalScore = that.data.TotalScore
  var AMatch = TotalScore[0]
  var BMatch = TotalScore[1]
  var TotalSet = AMatch + BMatch
  var win = wx.getStorageSync("win");
  switch (win = parseInt(win)) {
    case 1:
      if (AScore >= 25 && AScore - BScore >= 2) {
        var AMatch_New = AMatch + 1
        var BMatch_New = BMatch
        TotalScore[0] = AMatch_New
        TotalScore[1] = BMatch_New,
          TotalScore[2] = AScore
        TotalScore[3] = BScore
        wx.setStorageSync("TotalScore", TotalScore)
        wx.setStorageSync("Status", 5)
        GoToEndMatch(that)
        console.log("A win a match")
      }
      if (BScore >= 25 && BScore - AScore >= 2) {
        var AMatch_New = AMatch
        var BMatch_New = BMatch + 1
        TotalScore[0] = AMatch_New
        TotalScore[1] = BMatch_New
        TotalScore[2] = AScore
        TotalScore[3] = BScore
        wx.setStorageSync("TotalScore", TotalScore)
        wx.setStorageSync("Status", 5)
        GoToEndMatch(that)
        console.log("B win a match")
      }
      break;

    case 2:
      if (TotalSet == 0) {
        if (AScore >= 25 && AScore - BScore >= 2) {
          EndSet(that, TotalScore, AScore, BScore, AMatch_New = AMatch + 1, BMatch_New = BMatch)
          console.log("A win a set")
        }
        if (BScore >= 25 && BScore - AScore >= 2) {
          EndSet(that, TotalScore, AScore, BScore, AMatch_New = AMatch, BMatch_New = BMatch + 1)
          console.log("B win a set")
        }
      }
      if (TotalSet == 1) {
        if (1 == AMatch) {
          if (AScore >= 25 && AScore - BScore >= 2) {
            var AMatch_New = AMatch + 1
            var BMatch_New = BMatch
            TotalScore[0] = AMatch_New
            TotalScore[1] = BMatch_New
            TotalScore[2 * TotalSet + 2] = AScore
            TotalScore[2 * TotalSet + 3] = BScore
            wx.setStorageSync("TotalScore", TotalScore)
            wx.setStorageSync("Status", 5)
            GoToEndMatch(that)
          }
          if (BScore >= 25 && BScore - AScore >= 2) {
            EndSet(that, TotalScore, AScore, BScore, AMatch_New = AMatch, BMatch_New = BMatch + 1)
            console.log("B win a set")
          }
        }
        if (1 == BMatch) {
          if (AScore >= 25 && AScore - BScore >= 2) {
            EndSet(that, TotalScore, AScore, BScore, AMatch_New = AMatch + 1, BMatch_New = BMatch)
            console.log("A win a set")
          }
          if (BScore >= 25 && BScore - AScore >= 2) {
            var AMatch_New = AMatch
            var BMatch_New = BMatch + 1
            TotalScore[0] = AMatch_New
            TotalScore[1] = BMatch_New
            TotalScore[2 * TotalSet + 2] = AScore
            TotalScore[2 * TotalSet + 3] = BScore
            wx.setStorageSync("TotalScore", TotalScore)
            wx.setStorageSync("Status", 5)
            GoToEndMatch(that)
          }
        }
      }
      if (2 == TotalSet) {
        if (AScore >= 15 && AScore - BScore >= 2) {
          var AMatch_New = AMatch + 1
          var BMatch_New = BMatch;
          TotalScore[0] = AMatch_New
          TotalScore[1] = BMatch_New
          TotalScore[2 * TotalSet + 2] = AScore
          TotalScore[2 * TotalSet + 3] = BScore
          wx.setStorageSync("TotalScore", TotalScore)
          wx.setStorageSync("Status", 5)
          GoToEndMatch(that)
        }
        if (BScore >= 15 && BScore - AScore >= 2) {
          var AMatch_New = AMatch
          var BMatch_New = BMatch + 1
          TotalScore[0] = AMatch_New
          TotalScore[1] = BMatch_New
          TotalScore[2 * TotalSet + 2] = AScore
          TotalScore[2 * TotalSet + 3] = BScore
          wx.setStorageSync("TotalScore", TotalScore)
          wx.setStorageSync("Status", 5)
          GoToEndMatch(that)
        }
      }
      break;
    case 3:
      if (TotalSet == 0 || TotalSet == 1) {
        if (AScore >= 25 && AScore - BScore >= 2) {
          EndSet(that, TotalScore, AScore, BScore, AMatch_New = AMatch + 1, BMatch_New = BMatch)
          console.log("A win a set")
        }
        if (BScore >= 25 && BScore - AScore >= 2) {
          EndSet(that, TotalScore, AScore, BScore, AMatch_New = AMatch, BMatch_New = BMatch + 1)
          console.log("B win a set")
        }
      }
      if (TotalSet == 2 || TotalSet == 3) {
        if (2 == AMatch) {
          if (AScore >= 25 && AScore - BScore >= 2) {
            var AMatch_New = AMatch + 1
            var BMatch_New = BMatch
            TotalScore[0] = AMatch_New
            TotalScore[1] = BMatch_New
            TotalScore[2 * TotalSet + 2] = AScore
            TotalScore[2 * TotalSet + 3] = BScore
            wx.setStorageSync("TotalScore", TotalScore)
            wx.setStorageSync("Status", 5)
            GoToEndMatch(that)
          }
          if (BScore >= 25 && BScore - AScore >= 2) {
            EndSet(that, TotalScore, AScore, BScore, AMatch_New = AMatch, BMatch_New = BMatch + 1)
            console.log("B win a set")
          }
        }
        if (2 == BMatch) {
          if (AScore >= 25 && AScore - BScore >= 2) {
            EndSet(that, TotalScore, AScore, BScore, AMatch_New = AMatch + 1, BMatch_New = BMatch)
            console.log("A win a set")
          }
          if (BScore >= 25 && BScore - AScore >= 2) {
            var AMatch_New = AMatch
            var BMatch_New = BMatch + 1
            TotalScore[0] = AMatch_New
            TotalScore[1] = BMatch_New
            TotalScore[2 * TotalSet + 2] = AScore
            TotalScore[2 * TotalSet + 3] = BScore
            wx.setStorageSync("TotalScore", TotalScore)
            wx.setStorageSync("Status", 5)
            GoToEndMatch(that)
          }
        }
        if (AMatch == 1 && BMatch == 1) {
          if (AScore >= 25 && AScore - BScore >= 2) {
            EndSet(that, TotalScore, AScore, BScore, AMatch_New = AMatch + 1, BMatch_New = BMatch)
            console.log("A win a set")
          }
          if (BScore >= 25 && BScore - AScore >= 2) {
            EndSet(that, TotalScore, AScore, BScore, AMatch_New = AMatch, BMatch_New = BMatch + 1)
            console.log("B win a set")
          }
        }
      }
      if (4 == TotalSet) {
        if (AScore >= 15 && AScore - BScore >= 2) {
          var AMatch_New = AMatch + 1
          var BMatch_New = BMatch;
          TotalScore[0] = AMatch_New
          TotalScore[1] = BMatch_New
          TotalScore[2 * TotalSet + 2] = AScore
          TotalScore[2 * TotalSet + 3] = BScore
          wx.setStorageSync("TotalScore", TotalScore)
          wx.setStorageSync("Status", 5)
          GoToEndMatch(that)
        }
        if (BScore >= 15 && BScore - AScore >= 2) {
          var AMatch_New = AMatch
          var BMatch_New = BMatch + 1
          TotalScore[0] = AMatch_New
          TotalScore[1] = BMatch_New
          TotalScore[2 * TotalSet + 2] = AScore
          TotalScore[2 * TotalSet + 3] = BScore
          wx.setStorageSync("TotalScore", TotalScore)
          wx.setStorageSync("Status", 5)
          GoToEndMatch(that)
        }
      }
      break;
  }
}

function EndSet(that, TotalScore, AScore, BScore, AMatch_New, BMatch_New) {
  var n = that.data.TotalScore
  var FirstSide = that.data.FirstSide
  var FirstServe = that.data.FirstServe
  var TotalSet = n[0] + n[1],
    win = wx.getStorageSync("win")
  TotalScore[2 * TotalSet + 2] = AScore
  TotalScore[2 * TotalSet + 3] = BScore
  TotalScore[0] = AMatch_New
  TotalScore[1] = BMatch_New
  var TeamACourtPlayer = new Array("AScore", "!", "!", "!", "!", "!", "!")
  var TeamBCourtPlayer = new Array("b", "!", "!", "!", "!", "!", "!")
  var CurrentScore = [0, 0]
  wx.setStorageSync("CurrentScore", CurrentScore)
  wx.setStorageSync("TotalScore", TotalScore)
  wx.setStorageSync("TeamACurrentSetTimeOut", 2)
  wx.setStorageSync("TeamBCurrentSetTimeOut", 2)
  wx.setStorageSync("TeamACurrentSetSub", 6)
  wx.setStorageSync("TeamBCurrentSetSub", 6)
  wx.setStorageSync("TeamACourtPlayer", TeamACourtPlayer)
  wx.setStorageSync("TeamBCourtPlayer", TeamBCourtPlayer)
  wx.setStorageSync("Status", 2)
  that.setData({
    TeamACourtPlayer: TeamACourtPlayer,
    TeamBCourtPlayer: TeamBCourtPlayer,
    CurrentScore: CurrentScore,
    TotalScore: TotalScore,
    Status: 2,
    TeamACurrentSetTimeOut: 2,
    TeamBCurrentSetTimeOut: 2,
    TeamACurrentSetSub: 6,
    TeamBCurrentSetSub: 6
  })
  console.log(TotalSet)
  if (win == 3) {
    if (TotalSet == 0 || TotalSet == 2) {
      that.setData({
        Side: !FirstSide,
        LastScore: !FirstServe
      })
      wx.setStorageSync("LastScore", !FirstServe)
      wx.setStorageSync("Side", !FirstSide)
      that.setData({
        EndSetFlag: false
      })
      wx.setStorageSync('EndSetFlag', false)
    }
    if (TotalSet == 1) {
      that.setData({
        Side: FirstSide,
        LastScore: FirstServe
      })
      wx.setStorageSync("LastScore", FirstServe)
      wx.setStorageSync("Side", FirstSide)
      that.setData({
        EndSetFlag: false
      })
      wx.setStorageSync('EndSetFlag', false)
    }
    if (TotalSet == 3) {
      that.setData({
        EndSetFlag: false
      })
      wx.setStorageSync('EndSetFlag', false)
    }
  }
  if (win == 2) {
    if (TotalSet == 0) {
      that.setData({
        Side: !FirstSide,
        LastScore: !FirstServe
      })
      wx.setStorageSync("LastScore", !FirstServe)
      wx.setStorageSync("Side", !FirstSide)
      that.setData({
        EndSetFlag: false
      })
      wx.setStorageSync('EndSetFlag', false)
    }
    if (TotalSet == 1) {
      that.setData({
        EndSetFlag: false
      })
      wx.setStorageSync('EndSetFlag', false)
    }
  }
}

function r(that, e, a, r, o, S, n) {
  var i = that.data.TotalScore,
    s = i[0] + i[1],
    c = wx.getStorageSync("MatchDuration"),
    l = [s, e, a, r, o, S, n];
  if (c.push(l), wx.setStorageSync("MatchDuration", c), 1 == that.data.currentTab) {
    var h = 110 * c.length;
    that.setData({
      SwiperHeight: h
    });
  }
  that.setData({
    MatchDuration: c
  }), u(that, s, e, a, r);
}

function o(that, e, a, r, o, S) {
  var n = wx.getStorageSync("TimeOut"),
    i = [S, r, o, e, a];
  if (n.push(i), wx.setStorageSync("TimeOut", n), 0 == S) {
    var s = that.data.TeamACurrentSetTimeOut - 1;
    that.setData({
      TimeOut: n,
      TeamACurrentSetTimeOut: s
    }), wx.setStorageSync("TeamACurrentSetTimeOut", s);
  }
  if (1 == S) {
    var c = that.data.TeamBCurrentSetTimeOut - 1;
    that.setData({
      TimeOut: n,
      TeamBCurrentSetTimeOut: c
    }), wx.setStorageSync("TeamBCurrentSetTimeOut", c);
  }
}

function GetBenchPlayer(that, e, a, r) {
  for (var o = that.data.TotalScore, S = o[0] + o[1], n = [], s = 0; s < a.length; s++) n[s] = a[s][0];
  for (var c = wx.getStorageSync("SubInfo"), u = new Array(), l = new Array(), s = 0; s < c.length; s++) c[s][0] == S && c[s][1] == r && (l.push(c[s][6]),
    u.push(c[s][7]));
  var h = i(h = (h = u.concat(l)).concat(e), n);
  console.log(h);
  for (var g = 0, T = 0, s = 0; s < c.length; s++) that.data.PickedPlayer == c[s][7] && c[s][1] == r && c[s][0] == S && (g++,
    T = s), that.data.PickedPlayer == c[s][6] && c[s][1] == r && c[s][0] == S && g++;
  1 == g && (h = [c[T][6]]), 2 == g && (h = ["-"]), that.setData({
    LeftPlayer: h
  }), console.log(h);
}

function n(that, e, a, r, o, S, n, i) {
  var s = o + S,
    c = wx.getStorageSync("SubInfo"),
    u = [s, e, o, S, a, r, n, i];
  if (c.push(u), wx.setStorageSync("SubInfo", c), 0 == e) {
    var l = that.data.TeamACurrentSetSub - 1,
      h = that.data.TeamACourtPlayer;
    h[that.data.currentTeamAPosition] = i, that.setData({
      SubInfo: c,
      TeamACurrentSetSub: l,
      TeamACourtPlayer: h
    }), wx.setStorageSync("TeamACurrentSetSub", l), wx.setStorageSync("TeamACourtPlayer", h);
  }
  if (1 == e) {
    var g = that.data.TeamBCurrentSetSub - 1,
      T = that.data.TeamBCourtPlayer;
    T[that.data.currentTeamBPosition] = i, that.setData({
      SubInfo: c,
      TeamBCurrentSetSub: g,
      TeamBCourtPlayer: T
    }), wx.setStorageSync("TeamBCurrentSetSub", g), wx.setStorageSync("TeamBCourtPlayer", T);
  }
}

function i(that, e) {
  for (var a = new Array(), r = that.concat(e), o = new Array(), S = 0; S < r.length; S++) r[S] in a ? a[r[S]]++ : a[r[S]] = 1;
  for (S = 0; S < a.length; S++) 1 == a[S] && o.push(S);
  return o;
}

function GoToEndMatch(that) {
  var MatchInfo = that.data.MatchInfo
  MatchInfo[8] = util.formatTime(new Date())
  wx.setStorageSync('Matchinfo', MatchInfo)
  that.setData({
    MatchInfo: MatchInfo
  })
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
  var win = wx.getStorageSync("win");
  t.data.LastScore;
  if (2 == win && 2 == e && (console.log("12"), 8 == a && r < 8 && 0 == o || 8 == r && a < 8 && 1 == o)) {
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

  if (3 == win && 4 == e && (console.log("12"), 8 == a && r < 8 && 0 == o || 8 == r && a < 8 && 1 == o)) {
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


}

Page({
  data: {
    currentTab: 0,
    SwiperHeight: 600,
    TeamAPlayer: [],
    TeamBPlayer: [],
    TeamACourtPlayer: ["a", "!", "!", "!", "!", "!", "!"],
    TeamBCourtPlayer: ["b", "!", "!", "!", "!", "!", "!"],
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
    Side: 0,
    EndSetFlag: true
  },
  BindHelp: function() {
    var t = ["http://www.game-win.cn/resource/images/help/1.JPG", "http://www.game-win.cn/resource/images/help/2.JPG", "http://www.game-win.cn/resource/images/help/3.JPG", "http://www.game-win.cn/resource/images/help/4.JPG"];
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
    var e = this,
      a = parseInt(e.data.ANewScore);
    if (a > 24) wx.showModal({
      title: "提示",
      content: "输入的比分不能大于24，请重新输入",
      showCancel: !1
    });
    else {
      var r = this.data.CurrentScore;
      r = [a, r[1]], this.setData({
        CurrentScore: r,
        ShowEditAScore: !0
      }), wx.setStorageSync("CurrentScore", r);
    }
  },
  ChangeTeamAPosition: function(e) {
    TurnPosition(this, this.data.TeamACourtPlayer, 0);
  },
  ChangeTeamBPosition: function(e) {
    TurnPosition(this, this.data.TeamBCourtPlayer, 1);
  },
  ConfirmTeamBNewScore: function(t) {
    var e = this,
      a = parseInt(e.data.BNewScore);
    if (a > 24) wx.showModal({
      title: "提示",
      content: "输入的比分不能大于24，请重新输入",
      showCancel: !1
    });
    else {
      var r = this.data.CurrentScore;
      r = [r[0], a], this.setData({
        CurrentScore: r,
        ShowEditBScore: !0
      }), wx.setStorageSync("CurrentScore", r);
    }
  },
  ChooseTeamAPlayer: function(t) {
    console.log("ChooseTeamAPlayer");
    var TeamACourtPlayer = this.data.TeamACourtPlayer
    var a = t.currentTarget.dataset.position
    var TeamAPlayer = this.data.TeamAPlayer
    if (2 == wx.getStorageSync("Status") && this.setData({
        ShowTeamAALLPlayer: !1,
        currentTeamAPosition: a
      }), 1 == this.data.Status) {
      var o = TeamACourtPlayer[a];
      this.setData({
        PickedPlayer: o,
        currentTeamAPosition: a,
        ShowTeamABenchPlayer: !1
      })
      GetBenchPlayer(this, TeamACourtPlayer, TeamAPlayer, 0);
    }
  },
  ChooseTeamBPlayer: function(t) {
    console.log("ChooseTeamBPlayer")
    var TeamBCourtPlayer = this.data.TeamBCourtPlayer
    var a = t.currentTarget.dataset.position
    var TeamBPlayer = this.data.TeamBPlayer
    if (2 == wx.getStorageSync("Status") && this.setData({
        ShowTeamBALLPlayer: !1,
        currentTeamBPosition: a
      }), 1 == this.data.Status) {
      var o = TeamBCourtPlayer[a];
      this.setData({
        PickedPlayer: o,
        currentTeamBPosition: a,
        ShowTeamBBenchPlayer: !1
      })
      GetBenchPlayer(this, TeamBCourtPlayer, TeamBPlayer, 1);
    }
  },
  SetTeamAPlayer: function(t) {
    var that = this
    var a = this.data.currentTeamAPosition
    var TeamACourtPlayer = this.data.TeamACourtPlayer
    var TeamBCourtPlayer = this.data.TeamBCourtPlayer
    var AllTeamACourtPlayer = wx.getStorageSync("AllTeamACourtPlayer")
    var AllTeamBCourtPlayer = wx.getStorageSync("AllTeamBCourtPlayer")
    that.data.AMatch
    that.data.BMatch
    TeamACourtPlayer[a] = t.currentTarget.dataset.num
    that.setData({
      TeamACourtPlayer: TeamACourtPlayer,
      ShowTeamAALLPlayer: !0
    })
    if ("!" != TeamACourtPlayer[1] && "!" != TeamACourtPlayer[2] && "!" != TeamACourtPlayer[3] && "!" != TeamACourtPlayer[4] && "!" != TeamACourtPlayer[5] && "!" != TeamACourtPlayer[6] && "!" != TeamBCourtPlayer[1] && "!" != TeamBCourtPlayer[2] && "!" != TeamBCourtPlayer[3] && "!" != TeamBCourtPlayer[4] && "!" != TeamBCourtPlayer[5] && "!" != TeamBCourtPlayer[6]) {
      wx.showModal({
        title: "提示",
        content: "是否确认本局比赛双方的首发队员",
        cancelText: "返回修改",
        confirmText: "开始比赛",
        success: function(res) {
          if (res.confirm) {
            AllTeamACourtPlayer.push(TeamACourtPlayer)
            AllTeamBCourtPlayer.push(TeamBCourtPlayer)
            wx.setStorageSync("AllTeamACourtPlayer", AllTeamACourtPlayer)
            wx.setStorageSync("AllTeamBCourtPlayer", AllTeamBCourtPlayer)
            wx.setStorageSync("TeamALineUp", TeamACourtPlayer)
            wx.setStorageSync("TeamBLineUp", TeamBCourtPlayer)
            wx.setStorageSync("TeamACourtPlayer", TeamACourtPlayer)
            wx.setStorageSync("TeamBCourtPlayer", TeamBCourtPlayer)
            wx.setStorageSync("Status", 1)
            that.setData({
              Status: 1
            })
          }
        }
      })
    }
  },
  SetTeamBPlayer: function(t) {
    var that = this
    var a = this.data.currentTeamBPosition
    var TeamACourtPlayer = this.data.TeamACourtPlayer
    var TeamBCourtPlayer = this.data.TeamBCourtPlayer
    var AllTeamACourtPlayer = wx.getStorageSync("AllTeamACourtPlayer")
    var AllTeamBCourtPlayer = wx.getStorageSync("AllTeamBCourtPlayer")
    that.data.AMatch
    that.data.BMatch
    TeamBCourtPlayer[a] = t.currentTarget.dataset.num
    that.setData({
      TeamBCourtPlayer: TeamBCourtPlayer,
      ShowTeamBALLPlayer: !0
    })
    if ("!" != TeamACourtPlayer[1] && "!" != TeamACourtPlayer[2] && "!" != TeamACourtPlayer[3] && "!" != TeamACourtPlayer[4] && "!" != TeamACourtPlayer[5] && "!" != TeamACourtPlayer[6] && "!" != TeamBCourtPlayer[1] && "!" != TeamBCourtPlayer[2] && "!" != TeamBCourtPlayer[3] && "!" != TeamBCourtPlayer[4] && "!" != TeamBCourtPlayer[5] && "!" != TeamBCourtPlayer[6]) {
      wx.showModal({
        title: "提示",
        content: "是否确认本局比赛双方的首发队员",
        cancelText: "返回修改",
        confirmText: "开始比赛",
        success: function(res) {
          if (res.confirm) {
            AllTeamACourtPlayer.push(TeamACourtPlayer)
            AllTeamBCourtPlayer.push(TeamBCourtPlayer)
            wx.setStorageSync("AllTeamACourtPlayer", AllTeamACourtPlayer)
            wx.setStorageSync("AllTeamBCourtPlayer", AllTeamBCourtPlayer)
            wx.setStorageSync("TeamALineUp", TeamACourtPlayer)
            wx.setStorageSync("TeamBLineUp", TeamBCourtPlayer)
            wx.setStorageSync("TeamACourtPlayer", TeamACourtPlayer)
            wx.setStorageSync("TeamBCourtPlayer", TeamBCourtPlayer),
              wx.setStorageSync("Status", 1)
            that.setData({
              Status: 1
            })
          }
        }
      })
    }
  },
  actionSheetbindchange: function() {
    this.setData({
      ShowTeamAALLPlayer: !0,
      ShowTeamBALLPlayer: !0
    });
  },
  AddTeamAScore: function() {
    if (2 != wx.getStorageSync("Status")) {
      var t = this.data.CurrentScore,
        e = t[0],
        a = (t[1], e + 1);
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
      var t = this.data.CurrentScore,
        e = (t[0], t[1] + 1);
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
    var e = this.data.LastScore_tmp,
      a = this.data.LastScore,
      r = this.data.CurrentScore,
      o = r[0],
      S = r[1];
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
    var o = a.currentTarget.dataset.point_flag,
      S = a.currentTarget.dataset.point_type,
      n = this.data.CurrentScore,
      i = n[0],
      s = n[1],
      c = this.data.LastScore_tmp;
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
      var u = this.data.TeamACourtPlayer,
        l = this.data.TeamBCourtPlayer;
      0 == c && (1 == this.data.LastScore && TurnPosition(this, u, 0), this.setData({
        LastScore: 0
      })), 1 == c && (0 == this.data.LastScore && TurnPosition(this, l, 1), this.setData({
        LastScore: 1
      })), r(this, i, s, c, S, 0), EndMatch(this, i, s);
    }
  },
  SetStatistic: function(a) {
    var o = a.currentTarget.dataset.position,
      S = this.data.point_type,
      n = this.data.point_flag,
      i = this.data.TeamACourtPlayer,
      s = this.data.TeamBCourtPlayer,
      u = this.data.CurrentScore,
      l = u[0],
      h = u[1],
      g = this.data.LastScore_tmp;
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
      1 == this.data.LastScore && TurnPosition(this, i, 0), this.setData({
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
      0 == this.data.LastScore && TurnPosition(this, s, 1), this.setData({
        LastScore: 1
      });
    }
    r(this, l, h, g, S = c(S), o, n), EndMatch(this, l, h);
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
    var e = this,
      a = this.data.CurrentScore,
      r = this.data.TotalScore,
      S = a[0],
      n = a[1],
      i = r[0],
      s = r[1];
    if (0 != t.currentTarget.dataset.team || 0 != this.data.TeamACurrentSetTimeOut)
      if (1 != t.currentTarget.dataset.team || 0 != this.data.TeamBCurrentSetTimeOut) {
        this.setData({
          ShowTimeOut: !1
        }), o(this, S, n, i, s, t.currentTarget.dataset.team);
        var c = 30,
          u = setInterval(function() {
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
      });
    else wx.showModal({
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
    var e = this.data.CurrentScore,
      a = this.data.TotalScore,
      r = e[0],
      o = e[1],
      S = a[0],
      i = a[1];
    n(this, t.currentTarget.dataset.team, r, o, S, i, this.data.PickedPlayer, t.currentTarget.dataset.position),
      this.setData({
        ShowTeamABenchPlayer: !0,
        ShowTeamBBenchPlayer: !0
      });
  },
  LoadPosition: function(e) {
    var that = this
    var type = e.currentTarget.dataset.type
    if (type == 3) {
      var lastset_A = wx.getStorageSync('TeamALineUp')
      var lastset_B = wx.getStorageSync('TeamBLineUp')
      wx.setStorageSync('TeamACourtPlayer', lastset_A)
      wx.setStorageSync('TeamBCourtPlayer', lastset_B)
      this.setData({
        TeamACourtPlayer: lastset_A,
        TeamBCourtPlayer: lastset_B
      })

      var AllTeamACourtPlayer = wx.getStorageSync("AllTeamACourtPlayer")
      var AllTeamBCourtPlayer = wx.getStorageSync("AllTeamBCourtPlayer")

      wx.showModal({
        title: "提示",
        content: "双方站位已自动填充，如需进行修改，请点击返回按钮",
        cancelText: "返回修改",
        confirmText: "开始比赛",
        success: function(res) {
          if (res.confirm) {
            AllTeamACourtPlayer.push(lastset_A)
            AllTeamBCourtPlayer.push(lastset_B)
            wx.setStorageSync("AllTeamACourtPlayer", AllTeamACourtPlayer)
            wx.setStorageSync("AllTeamBCourtPlayer", AllTeamBCourtPlayer)
            wx.setStorageSync("TeamALineUp", lastset_A)
            wx.setStorageSync("TeamBLineUp", lastset_B)
            wx.setStorageSync("TeamACourtPlayer", lastset_A)
            wx.setStorageSync("TeamBCourtPlayer", lastset_B)
            wx.setStorageSync("Status", 1)
            that.setData({
              Status: 1
            })
          }
        }
      })
    }
    if (type == 1) {
      var lastset = wx.getStorageSync('TeamALineUp')
      wx.setStorageSync('TeamACourtPlayer', lastset)
      this.setData({
        TeamACourtPlayer: lastset
      })
    }
    if (type == 2) {
      var lastset = wx.getStorageSync('TeamBLineUp')
      wx.setStorageSync('TeamBCourtPlayer', lastset)
      this.setData({
        TeamBCourtPlayer: lastset
      })
    }
    if (type == 0) {

    }
    if (type == 4) {
      wx.showModal({
        title: "提示",
        content: "此操作将不可逆，确认要提前结束比赛吗？",
        cancelText: "继续比赛",
        confirmText: "结束比赛",
        success: function(res) {
          if (res.confirm) {
            var TotalScore = t.data.TotalScore
            wx.setStorageSync("TotalScore", TotalScore)
            wx.setStorageSync("Status", 5)
            wx.redirectTo({
              url: "../../EndMatch/EndMatch"
            })
          }
          if (res.cancel) {
            return
          }
        }
      })
    }
    wx.setStorageSync('EndSetFlag', true)
    this.setData({
      EndSetFlag: true
    })
  },
  onLoad: function(t) {
    var e = this
    var that = this,
    a = wx.getStorageSync("TeamAPlayer"),
      r = wx.getStorageSync("TeamBPlayer");
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
        Status: wx.getStorageSync("Status"),
        EndSetFlag: wx.getStorageSync("EndSetFlag"),
      }), 0 == wx.getStorageSync("Status")) {
      for (var o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], S = [0, 0], n = wx.getStorageSync("FirstSide"), i = wx.getStorageSync("FirstServe"), c = [], u = [], l = 0; l < a.length; l++) c[a[l][0]] = [{
        ServePoint: 0,
        BlockPoint: 0,
        SpikePoint: 0,
        ServeFault: 0,
        SpikeFault: 0,
        OtherFault: 0
      }];
      for (l = 0; l < r.length; l++) u[r[l][0]] = [{
        ServePoint: 0,
        BlockPoint: 0,
        SpikePoint: 0,
        ServeFault: 0,
        SpikeFault: 0,
        OtherFault: 0
      }];
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
      var h = ["a", "!", "!", "!", "!", "!", "!"];
      wx.setStorageSync("CurrentScore", S), wx.setStorageSync("TotalScore", o), wx.setStorageSync("SubInfo", []),
        wx.setStorageSync("MatchDuration", []), wx.setStorageSync("TimeOut", []), wx.setStorageSync("TeamACurrentSetTimeOut", 2),
        wx.setStorageSync("TeamBCurrentSetTimeOut", 2), wx.setStorageSync("TeamACurrentSetSub", 6),
        wx.setStorageSync("TeamBCurrentSetSub", 6), wx.setStorageSync("LastScore", i), wx.setStorageSync("Side", n),
        wx.setStorageSync("Status", 2), wx.setStorageSync("TeamAStatistic", c), wx.setStorageSync("TeamBStatistic", u),
        wx.setStorageSync("TeamACourtPlayer", h), wx.setStorageSync("TeamBCourtPlayer", h),
        wx.setStorageSync("AllTeamACourtPlayer", []), wx.setStorageSync("EndSetFlag", true), wx.setStorageSync("AllTeamBCourtPlayer", []);
    }
    5 == wx.getStorageSync("Status") && GoToEndMatch(that), e.setData({
      TeamAPlayer: a,
      TeamBPlayer: r,
      MatchInfo: wx.getStorageSync("Matchinfo")
    });
  },
  onReady: function() {},
  onShow: function() {}
});