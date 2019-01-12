var n = require("../../../../utils/util.js");

Page({
    data: {
        info: []
    },
    onLoad: function(o) {
        wx.showLoading({
            title: "正在加载",
            mask: !0,
            success: function(n) {},
            fail: function(n) {},
            complete: function(n) {}
        });
        var t = this, e = n.formatTime(new Date());
        e[8], e[9];
        wx.request({
            url: "https://volleywang.cn/index.php/VolleyData/get_sign_info",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
                date: 26
            },
            success: function(n) {
                console.log(n.data), t.setData({
                    info: n.data.data
                }), wx.hideLoading();
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