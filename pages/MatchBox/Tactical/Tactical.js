Page({
    data: {
        pen: 3,
        color: "#cc0033",
      courtimage: "http://images.volleywang.cn/VolleyRecord/macthbox/volleyballcourt.jpg"
    },
    volleycourt: function() {
        this.setData({
            courtimage: "http://images.volleywang.cn/VolleyRecord/macthbox/volleyballcourt.jpg"
        });
    },
    basketballcourt: function() {
        this.setData({
            courtimage: "http://images.volleywang.cn/VolleyRecord/macthbox/basketballcourt.jpg"
        });
    },
    footballcourt: function() {
        this.setData({
            courtimage: "http://images.volleywang.cn/VolleyRecord/macthbox/footballcourt.jpg"
        });
    },
    blank: function() {
        this.setData({
            courtimage: " "
        });
    },
    refresh: function() {
        wx.navigateTo({
            url: "../Tactical/Tactical"
        });
    },
    startX: 0,
    startY: 0,
    isClear: !1,
    touchStart: function(t) {
        this.startX = t.changedTouches[0].x, this.startY = t.changedTouches[0].y, this.context = wx.createContext(), 
        this.isClear ? (this.context.setStrokeStyle("#FFFFFF"), this.context.setLineCap("round"), 
        this.context.setLineJoin("round"), this.context.setLineWidth(20), this.context.save(), 
        this.context.beginPath(), this.context.arc(this.startX, this.startY, 5, 0, 2 * Math.PI, !0), 
        this.context.fill(), this.context.restore()) : (this.context.setStrokeStyle(this.data.color), 
        this.context.setLineWidth(this.data.pen), this.context.setLineCap("round"), this.context.beginPath());
    },
    touchMove: function(t) {
        var a = t.changedTouches[0].x, e = t.changedTouches[0].y;
        this.isClear ? (this.context.save(), this.context.moveTo(this.startX, this.startY), 
        this.context.lineTo(a, e), this.context.stroke(), this.context.restore(), this.startX = a, 
        this.startY = e) : (this.context.moveTo(this.startX, this.startY), this.context.lineTo(a, e), 
        this.context.stroke(), this.startX = a, this.startY = e), wx.drawCanvas({
            canvasId: "myCanvas",
            reserve: !0,
            actions: this.context.getActions()
        });
    },
    touchEnd: function() {},
    clearCanvas: function() {
        this.isClear ? this.isClear = !1 : this.isClear = !0;
    },
    penSelect: function(t) {
        console.log(t.currentTarget), this.setData({
            pen: parseInt(t.currentTarget.dataset.param)
        }), this.isClear = !1;
    },
    colorSelect: function(t) {
        console.log(t.currentTarget), this.setData({
            color: t.currentTarget.dataset.param
        }), this.isClear = !1;
    }
});