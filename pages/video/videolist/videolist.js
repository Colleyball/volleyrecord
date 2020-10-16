Page({
    data: {
        title: "",
        videotype: ""
    },
    player: function(t) {
        if (t.currentTarget.dataset.link) {
            var e = t.currentTarget.dataset.teama + "-" + t.currentTarget.dataset.teamb;
            wx.navigateTo({
              url: "../player/player?title=" + e + "&link=" + t.currentTarget.dataset.link + "&qqvideo=" + t.currentTarget.dataset.qqvideo + "&group=" + t.currentTarget.dataset.group + "&picture=" + t.currentTarget.dataset.picture
            });
        } else wx.showModal({
            title: "提示",
            content: "视频正在制作，稍后再来吧~",
            showCancel: !1
        });
    },
    onLoad: function(t) {
        var e = this;
        wx.setNavigationBarTitle({
            title: "赛事窗 " + decodeURIComponent(t.title)
        }), e.setData({
            title: decodeURIComponent(t.title),
          videotype: t.videotype
        }), wx.request({
          url: "https://api.volleywang.cn/VolleyRecord/GetOneVideoListItem",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
              video_type: t.videotype
            },
            success: function(t) {
                console.log(t.data), e.setData({
                    videolist: t.data.data
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
      var route = "video/videolist/videolist&title=" + t.data.title + "&videotype=" + t.data.videotype
      return {
        title: "[视频]" + t.data.title,
        desc: "点击进入赛事窗",
        path: "pages/index/index?type=share&route=" + route
      };
    }
});