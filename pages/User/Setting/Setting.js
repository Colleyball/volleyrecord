Page({
    data: {},
    BindCopyWechat: function () {
      wx.setClipboardData({
        data: 'q648419561',
        success: function () {
          wx.showToast({
            title: '已复制微信号',
          })
        }
      })
    },
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
        title: "赛事窗·排球数据统计",
        desc: "点击进入赛事窗",
        path: "pages/index/index?type=share&route=" + route
      };
    }
});