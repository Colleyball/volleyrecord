function e(e, n, o, a, v) {
    var i = "https://vv.video.qq.com/getkey?otype=json&platform=11&format=" + e + "&vid=" + n + "&filename=" + o + "&appver=3.2.19.333";
    return new Promise(function(e) {
        wx.request({
            url: i,
            success: function(n) {
                var i = (n.data.replace(/QZOutputJson=/, "") + "qwe").replace(/;qwe/, ""), s = JSON.parse(i);
                if (void 0 != s.key) {
                    var u = s.key, l = a + o + "?vkey=" + u, p = String(l);
                    t.push(p);
                }
                ++r == v && (e(t), console.log(t));
            }
        });
    });
}

var r = 0, t = new Array(), n = {
    getVideoes: function(n) {
        r = 0, t = new Array();
        var o, a = "https://vv.video.qq.com/getinfo?otype=json&appver=3.2.19.333&platform=11&defnpayver=1&vid=" + n;
        return new Promise(function(r) {
            wx.request({
                url: a,
                success: function(t) {
                    var a = (t.data.replace(/QZOutputJson=/, "") + "qwe").replace(/;qwe/, ""), v = JSON.parse(a), i = v.vl.vi[0].lnk;
                    o = v.vl.vi[0].ul.ui[0].url;
                    var s = v.fl.fi, u = v.vl.vi[0].cl.fc;
                    0 == parseInt(u) && (u = 1);
                    s[s.length - 1].name;
                    var l = s[s.length - 1].id;
                    console.log(u);
                    for (var p = 1; p < u + 1; p++) e(l, n, i + ".p" + l % 1e4 + "." + p + ".mp4", o, u).then(function(e) {
                        r(e);
                    });
                }
            });
        });
    }
};

module.exports = n;