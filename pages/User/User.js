function t(t) {
    var n;
    for (n in t) return !1;
    return !0;
}

var n = require("../../utils/util.js"), e = getApp();

Page({
    data: {
        userInfo: {},
        Uid: "",
        login: !0
    },
    GetStatistic: function() {
        wx.showModal({
            title: "提示",
            content: "你已进入隐藏功能，点击确认开始尝试找回未上传的比赛数据",
            success: function(t) {
                t.confirm && wx.navigateTo({
                    url: "../EndMatch/EndMatch"
                });
            }
        });
    },
    bindGetUserInfo: function(t) {
        var e = this;
        console.log(t.detail.userInfo), t.detail.userInfo ? (e.setData({
            userInfo: t.detail.userInfo
        }), n.setpublicinfo(wx.getStorageSync("Uid"), t.detail.userInfo), wx.setStorageSync("userInfo", t.detail.userInfo), 
        e.setData({
            login: !0
        }), wx.navigateBack()) : wx.showModal({
            title: "提示",
            content: "如需使用用户中心的全部功能(比赛数据、关注的球队)，赛事窗需要获取您的昵称和头像，点击确认重新登录",
            showCancel: !1
        });
    },
    onLoad: function(n) {
        var o = this;
        wx.getSetting({
            success: function(n) {
                var a = n.authSetting;
                t(a) ? (o.setData({
                    login: !1
                }), console.log("首次授权")) : (console.log("不是第一次授权", a), e.getUserInfo(), wx.getStorageSync("userInfo") || o.setData({
                    login: !1
                }));
            }
        }), wx.getStorage({
            key: "userInfo",
            success: function(t) {
                o.setData({
                    userInfo: t.data
                });
            }
        }), wx.getStorage({
            key: "Uid",
            success: function(t) {
                o.setData({
                    Uid: t.data
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onShareAppMessage: function() {
        return {
            title: "赛事窗·杭电排球|比赛数据记录软件",
            desc: "点击进入赛事窗",
            path: "/pages/index/index"
        };
    }
});