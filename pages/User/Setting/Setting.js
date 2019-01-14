Page({
    data: {},
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
      var route = 'User/Setting/Setting'
      return {
        title: "赛事窗·杭电排球|排球数据记录软件",
        desc: "点击进入赛事窗",
        path: "pages/index/index?type=share&route=" + route
      };
    }
});