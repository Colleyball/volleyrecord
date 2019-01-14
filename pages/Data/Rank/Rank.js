Page({
    data: {
        resultlist: []
    },
    BindTeam: function(t) {
        wx.navigateTo({
            url: "../search/searchresult/searchresult?teamA=" + t.currentTarget.dataset.team + "&teamB=undefined&status=1"
        });
    },
    onLoad: function(t) {
        var n = this;
        wx.request({
          url: "https://api.volleywang.cn/VolleyRecord/WinRank",
            header: {
                "content-type": "application/json;charset=utf8"
            },
            method: "GET",
            data: {},
            success: function(t) {
                console.log(t.data), n.setData({
                    resultlist: t.data.data
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
    onShareAppMessage: function() {}
});