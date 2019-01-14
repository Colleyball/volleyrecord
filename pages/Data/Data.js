Page({
    data: {
        matchinfo: [],
        SearchContent: "",
        SearchFlag: !1,
        InputFlag: !0,
        focus: !1
    },
    BindMatchInfo: function(t) {
        2019 == t.currentTarget.dataset.type ? wx.navigateTo({
            url: "Statistic2019/Statistic2019?matchid=" + t.currentTarget.dataset.matchid
        }) : wx.navigateTo({
            url: "Statistic/Statistic?matchid=" + t.currentTarget.dataset.matchid
        });
    },
    onLoad: function(t) {
        var a = this;
        if (wx.getStorageSync("all_match_data")) {
            var n = wx.getStorageSync("all_match_data");
            a.setData({
                matchinfo: n
            });
        } else wx.request({
          url: "https://api.volleywang.cn/VolleyRecord/GetAllMatchInfo",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {},
            success: function(t) {
                console.log(t.data), a.setData({
                    matchinfo: t.data.data
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {
        this.setData({
            SearchFlag: !1,
            focus: !1
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});