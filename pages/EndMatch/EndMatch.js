var t = require("../../utils/util.js");

Page({
  data: {
    Matchinfo: [],
    TotalScore: []
  },
  del: function() {
    var t = wx.getStorageSync("Uid"),
      e = wx.getStorageSync("userInfo");
    wx.showModal({
      title: "提示",
      content: "确认放弃本场比赛数据吗？",
      success: function (a) {
        a.confirm && (wx.clearStorage(), setTimeout(function () {
          wx.setStorageSync("Uid", t), wx.setStorageSync("userInfo", e), wx.navigateTo({
            url: "../index/index"
          });
        }, 1e3)), a.cancel;
      }
    });
  },
  back: function() {
    wx.navigateTo({
      url: "../index/index"
    });
  },
  upload: function() {
    var e = this;
    wx.showLoading({
      title: "正在上传",
      mask: !0
    });
    for (var a = e.data.Matchinfo, o = e.data.TotalScore, n = [], i = 0; i < a.length; i++) n.push(a[i]);
    n.push(t.formatTime(new Date()));
    for (i = 0; i < o.length; i++) n.push(o[i]);
    for (var r = wx.getStorageSync("TeamAStatistic"), c = wx.getStorageSync("TeamBStatistic"), u = [], S = [], i = 0; i < 100; i++) r[i] && (u.push(i),
      u.push(r[i][0].ServePoint), u.push(r[i][0].BlockPoint), u.push(r[i][0].SpikePoint),
      u.push(r[i][0].ServeFault), u.push(r[i][0].SpikeFault), u.push(r[i][0].OtherFault));
    for (i = 0; i < 100; i++) c[i] && (S.push(i), S.push(c[i][0].ServePoint), S.push(c[i][0].BlockPoint),
      S.push(c[i][0].SpikePoint), S.push(c[i][0].ServeFault), S.push(c[i][0].SpikeFault),
      S.push(c[i][0].OtherFault));
    wx.request({
      url: "https://api.game-win.cn/VolleyRecord/SetMatchRecord",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        uid: wx.getStorageSync("Uid"),
        matchdetail: n,
        TeamAPlayer: wx.getStorageSync("TeamAPlayer"),
        TeamBPlayer: wx.getStorageSync("TeamBPlayer"),
        TeamALineUp: wx.getStorageSync("AllTeamACourtPlayer"),
        TeamBLineUp: wx.getStorageSync("AllTeamBCourtPlayer"),
        MatchDuration: wx.getStorageSync("MatchDuration"),
        SubInfo: wx.getStorageSync("SubInfo"),
        TimeOut: wx.getStorageSync("TimeOut"),
        TeamAStatistic: u,
        TeamBStatistic: S
      },
      success: function(t) {
        console.log(t.data), wx.hideLoading();
        var e = wx.getStorageSync("Uid"),
          a = wx.getStorageSync("userInfo");
        wx.clearStorage(), setTimeout(function() {
          wx.setStorageSync("Uid", e), wx.setStorageSync("userInfo", a), wx.redirectTo({
            url: "../index/index"
          });
        }, 1e3);
      }
    });
  },
  onLoad: function() {
    this.setData({
      win: wx.getStorageSync("win"),
      Matchinfo: wx.getStorageSync("Matchinfo"),
      TotalScore: wx.getStorageSync("TotalScore")
    });
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {}
});