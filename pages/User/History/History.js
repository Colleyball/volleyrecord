Page({
    data: {},
    BindMatchInfo: function(t) {
        2019 == t.currentTarget.dataset.type ? wx.navigateTo({
            url: "../../Data/Statistic2019/Statistic2019?matchid=" + t.currentTarget.dataset.matchid
        }) : wx.navigateTo({
            url: "../../Data/Statistic/Statistic?matchid=" + t.currentTarget.dataset.matchid
        });
    },
    onLoad: function(t) {
        var a = this;
        wx.request({
            url: "https://volleywang.cn/index.php/VolleyData/getmatchinfo",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
                uid: wx.getStorageSync("Uid")
            },
            success: function(t) {
                console.log(t.data);
                var n = t.data.data;
                n = n.reverse(), a.setData({
                    matchinfo: n
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});