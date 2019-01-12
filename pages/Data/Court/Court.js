function t(t, a, e, n, o) {
    wx.request({
        url: "https://apis.map.qq.com/ws/place/v1/search?boundary=nearby(" + e + "," + n + ",5000)&keyword=" + a + "&page_size=20&page_index=" + o + "&orderby=distance&key=4IGBZ-KCKLU-HCOVG-4W4YT-XUKUQ-UGF5V",
        header: {
            "content-type": "application/json;charset=utf8"
        },
        method: "GET",
        data: {},
        success: function(a) {
            console.log(a.data.data), a.data.data[0] ? t.setData({
                court: a.data
            }) : wx.showToast({
                title: "已全部加载",
                icon: "success",
                image: "",
                duration: 1500,
                mask: !0,
                success: function(t) {},
                fail: function(t) {},
                complete: function(t) {}
            });
        }
    });
}

Page({
    data: {
        currentPage: 1,
        gps_x: 39.908491,
        gps_y: 116.374328,
        sport: "排球"
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        var a = this;
        wx.getLocation({
            type: "gcj02",
            success: function(e) {
                e.latitude, e.longitude;
                console.log(e), t(a, a.data.sport, e.latitude, e.longitude, a.data.currentPage), 
                a.setData({
                    gps_x: e.latitude,
                    gps_y: e.longitude
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        var a = this, e = a.data.currentPage + 1;
        t(a, a.data.sport, a.data.gps_x, a.data.gps_y, e), a.setData({
            currentPage: a.data.currentPage + 1
        }), wx.showToast({
            title: "加载中…",
            icon: "loading",
            mask: !0
        });
    },
    onShareAppMessage: function() {}
});