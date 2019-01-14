function t(t) {
    var e = void 0 === t ? "undefined" : a(t);
    if ("string" == e) return t.length;
    if ("object" == e) {
        var n = 0;
        for (var s in t) n++;
        return n;
    }
    return !1;
}

var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

Page({
    data: {
        resultlist: [],
        resultnum: "",
        status: 0,
        SearchContent: "",
        SearchFlag: !1,
        InputFlag: !0,
        focus: !1
    },
    ShowSearch: function() {
        this.setData({
            SearchFlag: !0,
            focus: !0
        });
    },
    ShowSearchBtn: function() {
        console.log("聚焦输入框"), this.data.SearchContent ? this.setData({
            InputFlag: !0
        }) : this.setData({
            InputFlag: !1
        });
    },
    HideSearchBtn: function() {
        this.setData({
            InputFlag: !1
        });
    },
    GetSearchContent: function(t) {
        t.detail.value ? this.setData({
            InputFlag: !0
        }) : this.setData({
            InputFlag: !1
        }), this.setData({
            SearchContent: t.detail.value
        });
    },
    CancelSearch: function() {
        this.setData({
            SearchFlag: !1,
            focus: !1
        });
    },
    Search: function(a) {
        var e = this;
        wx.setNavigationBarTitle({
            title: e.data.SearchContent + " - 搜索结果"
        }), this.setData({
            SearchFlag: !1,
            focus: !1
        }), wx.request({
          url: "https://api.volleywang.cn/VolleyRecord/Search",
            header: {
                "content-type": "application/json;charset=utf8"
            },
            method: "GET",
            data: {
                name: e.data.SearchContent
            },
            success: function(a) {
                console.log(a.data);
                var n = t(a.data.data);
                e.setData({
                    resultlist: a.data.data,
                    resultnum: n
                }), "功获成取搜索结果-2" == a.data.message && e.setData({
                    status: 2
                }), "功获成取搜索结果-1" == a.data.message && e.setData({
                    status: 1
                }), "功获成取搜索结果-0" == a.data.message && e.setData({
                    status: 0
                });
            }
        });
    },
    searchresult: function(t) {
        wx.navigateTo({
            url: "searchresult/searchresult?teamA=" + t.currentTarget.dataset.teama + "&teamB=" + t.currentTarget.dataset.teamb + "&status=" + t.currentTarget.dataset.status
        });
    },
    onLoad: function(a) {
        var e = this;
        wx.setNavigationBarTitle({
            title: a.value + " - 搜索结果"
        }), wx.request({
          url: "https://api.volleywang.cn/VolleyRecord/Search",
            header: {
                "content-type": "application/json;charset=utf8"
            },
            method: "GET",
            data: {
                name: a.value
            },
            success: function(a) {
                console.log(a.data);
                var n = t(a.data.data);
                e.setData({
                    resultlist: a.data.data,
                    resultnum: n
                }), "功获成取搜索结果-2" == a.data.message && e.setData({
                    status: 2
                }), "功获成取搜索结果-1" == a.data.message && e.setData({
                    status: 1
                }), "功获成取搜索结果-0" == a.data.message && e.setData({
                    status: 0
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
    onShareAppMessage: function() {}
});