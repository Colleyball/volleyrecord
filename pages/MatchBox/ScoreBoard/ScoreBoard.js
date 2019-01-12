var t = require("../../../utils/util.js");

Page({
    data: {
        animationA: "",
        animationB: "",
        tip_score: "",
        Ascore: 0,
        Bscore: 0,
        Aname: "",
        Bname: ""
    },
    addscoreA: function(t) {
        var a = parseInt(t.target.dataset.score);
        this.animationA.translateY(-300).scale(2).opacity(.8).step(), this.setData({
            tip_score: "+" + t.target.dataset.score,
            animationA: this.animationA.export()
        }), setTimeout(function() {
            this.animationA.translateY(0).scale(0).opacity(0).step(), this.setData({
                animationA: this.animationA.export(),
                Ascore: this.data.Ascore + a
            });
        }.bind(this), 1e3);
    },
    addscoreB: function(t) {
        var a = parseInt(t.target.dataset.score);
        this.animationB.translateY(-300).scale(2).opacity(.8).step(), this.setData({
            tip_score: "+" + t.target.dataset.score,
            animationB: this.animationB.export()
        }), setTimeout(function() {
            this.animationB.translateY(0).scale(0).opacity(0).step(), this.setData({
                animationB: this.animationB.export(),
                Bscore: this.data.Bscore + a
            });
        }.bind(this), 1e3);
    },
    reducescoreA: function(t) {
        this.animationA.translateY(-300).scale(2).opacity(.8).step(), this.setData({
            tip_score: "-1",
            animationA: this.animationA.export()
        }), setTimeout(function() {
            this.animationA.translateY(0).scale(0).opacity(0).step(), this.setData({
                animationA: this.animationA.export(),
                Ascore: this.data.Ascore - 1
            });
        }.bind(this), 1e3);
    },
    reducescoreB: function(t) {
        this.animationB.translateY(-300).scale(2).opacity(.8).step(), this.setData({
            tip_score: "-1",
            animationB: this.animationB.export()
        }), setTimeout(function() {
            this.animationB.translateY(0).scale(0).opacity(0).step(), this.setData({
                animationB: this.animationB.export(),
                Bscore: this.data.Bscore - 1
            });
        }.bind(this), 1e3);
    },
    getA: function(t) {
        this.setData({
            Aname: t.detail.value
        });
    },
    getB: function(t) {
        this.setData({
            Bname: t.detail.value
        });
    },
    onLoad: function(t) {
        var a = this;
        wx.getStorageSync("ScoreBoard") && wx.showModal({
            title: "提示",
            content: "是否载入上次的记录",
            success: function(t) {
                t.confirm && wx.getStorage({
                    key: "ScoreBoard",
                    success: function(t) {
                        a.setData({
                            Ascore: t.data.Ascore,
                            Bscore: t.data.Bscore,
                            Aname: t.data.teamA,
                            Bname: t.data.teamB
                        });
                    }
                }), t.confirm || wx.removeStorageSync("ScoreBoard");
            }
        });
    },
    onReady: function() {
        this.animationA = wx.createAnimation({
            duration: 500,
            timingFunction: "linear",
            delay: 0
        }), this.animationB = wx.createAnimation({
            duration: 500,
            timingFunction: "linear",
            delay: 0
        });
    },
    onShow: function() {},
    onHide: function() {
        console.log(1);
    },
    onUnload: function() {
        "" == this.data.Aname && "" == this.data.Bname && 0 == this.data.Ascore && 0 == this.data.Bscore || wx.setStorage({
            key: "ScoreBoard",
            data: {
                time: t.gettime(),
                teamA: this.data.Aname,
                teamB: this.data.Bname,
                Ascore: this.data.Ascore,
                Bscore: this.data.Bscore
            },
            success: function(t) {
                console.log(t);
            },
            fail: function(t) {
                console.log(t);
            },
            complete: function(t) {
                console.log(t);
            }
        });
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});