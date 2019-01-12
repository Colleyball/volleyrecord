Page({
    data: {
        matchid: 0,
        imgalist: [ "https://volleywang.cn/liansaiquan/images/pay.jpg" ]
    },
    back: function(t) {
        wx.switchTab({
            url: "../../index/index"
        });
    },
    BindFav: function() {
        var t = this;
        wx.showModal({
            title: "提示",
            content: "感谢你的支持，赏赞将用于服务器租用、小程序日常维护成本。",
            showCancel: !1,
            success: function(a) {
                a.confirm && wx.previewImage({
                    current: 0,
                    urls: t.data.imgalist
                });
            }
        });
    },
    onLoad: function(t) {
        var a = this, e = t.matchid;
        a.setData({
            matchid: t.matchid
        }), wx.request({
            url: "https://volleywang.cn/index.php/VolleyData/getonematchinfo",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
                matchid: e
            },
            success: function(t) {
                console.log(t.data), a.setData({
                    matchinfo: t.data.data
                });
            }
        }), wx.request({
            url: "https://volleywang.cn/index.php/VolleyData/getstatistic",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
                matchid: e
            },
            success: function(t) {
                console.log(t.data), a.setData({
                    statistic: t.data.data
                });
            }
        }), wx.request({
            url: "https://volleywang.cn/index.php/VolleyData/getteamstatistic",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
                matchid: e
            },
            success: function(t) {
                console.log(t.data), a.setData({
                    teamstatistic: t.data.data
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
    onShareAppMessage: function() {
        var t = this;
        return {
            title: "[数据]" + t.data.matchinfo[0].teamAname + "vs" + t.data.matchinfo[0].teamBname,
            desc: "点击进入赛事窗",
            path: "pages/Data/Statistic/Statistic?matchid=" + t.data.matchid
        };
    }
});