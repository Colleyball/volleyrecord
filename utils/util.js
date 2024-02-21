function t(t) {
    return (t = t.toString())[1] ? t : "0" + t;
}

module.exports = {
    gettime: function() {
        return new Date().toLocaleString();
    },
    formatTime: function(e) {
        var n = e.getFullYear(), o = e.getMonth() + 1, i = e.getDate(), c = e.getHours(), r = e.getMinutes(), a = e.getSeconds();
        return [ n, o, i ].map(t).join("/") + " " + [ c, r, a ].map(t).join(":");
    },
    setpublicinfo: function(t, e) {
        wx.request({
          url: "https://niko.game-win.cn/api/SetPublicInfo",
            header: {
                "content-type": "application/json;charset=utf8"
            },
            method: "GET",
            data: {
                uid: t,
                nickname: e.nickName,
                province: e.province,
                city: e.city,
                gender: e.gender,
                pic: e.avatarUrl
            },
            success: function(t) {
                console.log(t.data);
            }
        });
    }
};