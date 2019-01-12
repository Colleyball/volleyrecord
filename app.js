App({
    onLaunch: function() {
        var t = wx.getStorageSync("logs") || [];
        t.unshift(Date.now()), wx.setStorageSync("logs", t);
        var a = this;
        wx.getSystemInfo({
            success: function(t) {
                var e = 68;
                -1 !== t.model.indexOf("iPhone X") ? e = 88 : -1 !== t.model.indexOf("iPhone") && (e = 64), 
                a.globalData.statusBarHeight = t.statusBarHeight, a.globalData.titleBarHeight = e - t.statusBarHeight;
            },
            failure: function() {
                a.globalData.statusBarHeight = 0, a.globalData.titleBarHeight = 0;
            }
        });
    },
    getUserInfo: function(t) {
        var a = this;
        this.globalData.userInfo ? "function" == typeof t && t(this.globalData.userInfo) : wx.login({
            success: function(e) {
                wx.getUserInfo({
                    success: function(e) {
                        a.globalData.userInfo = e.userInfo, "function" == typeof t && t(a.globalData.userInfo), 
                        wx.setStorageSync("userInfo", e.userInfo);
                    },
                    fail: function(t) {}
                }), e.code ? wx.request({
                    url: "https://volleywang.cn/index.php/toto/getuid",
                    header: {
                        "content-type": "application/json;charset=utf8"
                    },
                    method: "GET",
                    data: {
                        code: e.code
                    },
                    success: function(t) {
                        console.log(t.data), wx.setStorageSync("Uid", t.data.data);
                    }
                }) : console.log("获取用户信息失败");
            }
        });
    },
    globalData: {
        userInfo: null
    }
});