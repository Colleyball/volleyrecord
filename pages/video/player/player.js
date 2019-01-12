var t, e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../utils/qqVideo.js")), a = {}, i = new Array();

Page({
    data: {
        title: "",
        link: "",
        qcode: "",
        imgalist: [ "http://www.aibotiyu.com/ImgFiles/ABSports/matchwin/video/player/pay.png" ],
        qqvideo: 0,
        favorFlag: 0
    },
    back: function(t) {
        1 == getCurrentPages().length ? wx.navigateTo({
            url: "../../index/index"
        }) : wx.navigateBack();
    },
    BindFavor: function() {
        var t = wx.getStorageSync("my_favourite_video"), e = [ this.data.title, this.data.link, this.data.qqvideo, this.data.group ];
        t ? t.push(e) : (t = []).push(e), wx.setStorageSync("my_favourite_video", t), this.setData({
            favorFlag: 1
        }), wx.showModal({
            title: "收藏成功",
            content: "可在[主页-我-我的收藏]中查看",
            showCancel: !1
        });
    },
    BindFavor_cancle: function() {
        var t = this, e = wx.getStorageSync("my_favourite_video");
        e.splice(t.data.favorId, 1), wx.setStorageSync("my_favourite_video", e), t.setData({
            favorFlag: 0
        }), wx.showToast({
            title: "取消收藏",
            icon: "success",
            image: "",
            duration: 1e3,
            mask: !0
        });
    },
    BindGift: function() {
        var t = this;
        wx.previewImage({
            current: 0,
            urls: t.data.imgalist
        });
    },
    BindVideo: function() {
        var t = this.data.link + ".html";
        wx.setClipboardData({
            data: t,
            success: function(t) {
                wx.showModal({
                    title: "提示",
                    content: "视频地址已复制，请粘贴至浏览器中播放",
                    showCancel: !1
                });
            }
        });
    },
    BindCopyLink: function() {
        var t = "https://v.qq.com/x/page/" + this.data.link + ".html";
        wx.setClipboardData({
            data: t,
            success: function(t) {
                wx.showModal({
                    title: "提示",
                    content: "视频地址已复制，请粘贴至浏览器中播放",
                    showCancel: !1
                });
            }
        });
    },
    onLoad: function(o) {
        var n = this;
        if (wx.setNavigationBarTitle({
            title: "赛事窗 " + decodeURIComponent(o.title)
        }), this.setData({
            title: decodeURIComponent(o.title),
            link: o.link,
            qqvideo: o.qqvideo,
            group: decodeURIComponent(o.group)
        }), wx.getStorageSync("my_favourite_video")) for (var d = wx.getStorageSync("my_favourite_video"), s = 0; s < d.length; s++) d[s][1] == o.link && this.setData({
            favorFlag: 1,
            favorId: s
        });
        if (1 == o.qqvideo) {
            void 0 != o.link ? this.setData({
                file_id: o.link
            }) : wx.showToast({
                title: "未传入视频id"
            }), t = 1, i = new Array(), a = {};
            var r = o.link;
            console.log(r), e.default.getVideoes(r).then(function(t) {
                for (var e = 1; e < t.length + 1; e++) {
                    var o = "index" + e;
                    i.push(e), a[o] = t[e - 1];
                }
                n.setData({
                    videUrl: t[0]
                });
            });
        }
    },
    playEnd: function() {
        if (t > parseInt(i.length)) t = 1, this.videoContext.exitFullScreen; else {
            var e = "index" + ++t;
            this.setData({
                videUrl: ""
            }), this.setData({
                videUrl: a[e]
            });
        }
    },
    onReady: function() {
        this.videoContext = wx.createVideoContext("myVideo");
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var t = this;
        return {
            title: "[视频]" + t.data.title,
            desc: "点击进入赛事窗",
            path: "pages/video/player/player?title=" + t.data.title + "&link=" + t.data.link + "&qqvideo=" + t.data.qqvideo + "&group=" + t.data.group
        };
    }
});