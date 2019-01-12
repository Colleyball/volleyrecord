var n = require("../../../utils/util.js");

Page({
    data: {},
    Sign: function(e) {
        var t = n.formatTime(new Date()), o = t[8] + t[9];
        wx.scanCode({
            success: function(t) {
                console.log(t.result), t.result && wx.request({
                    url: "https://volleywang.cn/index.php/VolleyData/set_student_sign",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    method: "POST",
                    data: {
                        id: t.result,
                        sign_type: e.currentTarget.dataset.type,
                        time: n.formatTime(new Date()),
                        date: o
                    },
                    success: function(n) {
                        console.log(n.data), n.data.success ? wx.showToast({
                            title: "签到成功",
                            icon: "success",
                            image: "",
                            duration: 1500,
                            mask: !0,
                            success: function(n) {},
                            fail: function(n) {},
                            complete: function(n) {
                                wx.redirectTo({
                                    url: "../Sign/Sign"
                                });
                            }
                        }) : wx.showModal({
                            title: "提示",
                            content: "今日已签到",
                            showCancel: !1,
                            success: function(n) {
                                n.confirm && wx.redirectTo({
                                    url: "../Sign/Sign"
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    Check: function() {
        wx.navigateTo({
            url: "check/check"
        });
    },
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});