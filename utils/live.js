module.exports = {
  set_match_info: function (that, TeamANum, TeamBNum, FirstServe, FirstSide, Matchinfo, Uid) {
    wx.request({
      url: "https://api.game-win.cn/live/detail",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        uid: Uid,
        matchdetail: Matchinfo,
        court: FirstSide,
        serve: FirstServe
      },
      success: function (t) {
        console.log(t.data)
        return 1
      }
    })
  }
}