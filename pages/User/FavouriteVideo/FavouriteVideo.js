Page({
    data: {
        currentTab: "0",
        swiperHeight: 2510
    },
    bindChange: function(t) {
        var e = this;
        if (e.setData({
            currentTab: t.detail.current
        }), 0 == t.detail.current) {
            if (0 == e.data.my_favourite_video.length) a = 1e3; else a = 250 * e.data.my_favourite_video.length + 150;
            e.setData({
                swiperHeight: a
            });
        }
        if (1 == t.detail.current) {
            if (0 == e.data.matchdetail.length) a = 1e3; else var a = 700 * e.data.matchdetail.length + 150;
            e.setData({
                swiperHeight: a
            });
        }
    },
    swichNav: function(t) {
        this.setData({
            currentTab: t.target.dataset.current
        });
    },
    player: function(t) {
        wx.navigateTo({
            url: "../../video/player/player?title=" + t.currentTarget.dataset.team + "&link=" + t.currentTarget.dataset.link + "&qqvideo=" + t.currentTarget.dataset.qqvideo + "&group=" + t.currentTarget.dataset.group
        });
    },
    BindMatchInfo: function(t) {
        wx.navigateTo({
            url: "../../Data/Statistic2019/Statistic2019?matchid=" + t.currentTarget.dataset.matchid
        });
    },
    BindStatistic: function() {
        wx.navigateTo({
            url: "../../Data/Data"
        });
    },
    BindVideo: function() {
        wx.navigateTo({
            url: "../../index/index?tab=2"
        });
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        var t = wx.getStorageSync("my_favourite_statistic"), e = wx.getStorageSync("my_favourite_video");
        if (0 == e.length) a = 1e3; else var a = 250 * e.length + 150;
        this.setData({
            swiperHeight: a,
            my_favourite_video: e,
            matchdetail: t
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});