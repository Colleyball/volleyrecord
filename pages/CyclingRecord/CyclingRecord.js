// pages/CyclingRecord/CyclingRecord.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yesterday: '',
    today: '',
    url: '',
    date_choose: 6,
    date: '',
    show_result_1: 0,
    show_result_2: 0,
    show_result_3: 0,
    buqianka: 0
  },

  bindDate: function (e) {
    var date_choose = e.currentTarget.dataset.date
    if (date_choose <= 4 && this.data.buqianka == 0) {
      wx.showToast({
        title: '补签卡不足',
      })
    } else {
      var date = this.data.all_date[date_choose]
      this.setData({
        date_choose: date_choose,
        date: date[0]
      })
    }
    console.log(date_choose)
  },
  GetUrl: function (e) {
    this.setData({
      url: e.detail.value
    })
    console.log(e.detail.value)
  },
  bindHelp: function () {
    wx.navigateTo({
      url: 'help/help',
    })
  },
  BindBack: function () {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  BindConfirm: function () {
    if (!this.data.url) {
      wx.showModal({
        title: '提示',
        content: '请填写数据链接',
        showCancel: false,
        confirmText: '返回修改'
      })
      return
    }
    wx.showLoading({
      title: '正在上传数据',
    })
    var that = this
    /*this.setData({
      show_result_1: 1
    })*/

    wx.request({
      url: "https://niko.game-win.cn/api/SetCyclingAct",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        uid: wx.getStorageSync("Uid"),
        url: that.data.url,
        date: that.data.date
      },
      success: function (t) {
        console.log(t.data)
        /*wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '骑行数据上传成功，请等待审核',
          showCancel: false,
          confirmText: '返回主页',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.redirectTo({
                url: '/pages/index/index',
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        that.setData({
          show_result_1: 0
        })*/
        wx.hideLoading()
        if (t.data.data) {
          that.setData({
            show_result_2: 1,
            kilometer: t.data.data[0],
            point: t.data.data[1]
          })
        } else {
          that.setData({
            show_result_3: 1
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow: function () {
    console.log('onShow')
    //昨天的时间
    var day1 = new Date();
    day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
    var yesterday = day1.getFullYear() + "-" + (day1.getMonth() + 1) + "-" + day1.getDate();

    //今天的时间
    var day2 = new Date();
    day2.setTime(day2.getTime());
    var today = day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();
    console.log(today)

    var all_date = []
    var day = new Date();
    day.setTime(day.getTime() - 6 * 24 * 60 * 60 * 1000);
    for (var i = 0; i < 7; i++) {
      var date_temp = day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
      var day_temp = day.getDate();
      var week = day.getDay()
      var week_cn = get_week(week);
      if (i == 6) {
        week_cn = '今天'
      }
      if (i == 5) {
        week_cn = '昨天'
      }
      var date_arr = [date_temp, day_temp, week_cn]
      all_date.push(date_arr)
      day.setTime(day.getTime() + 24 * 60 * 60 * 1000);
    }

    this.setData({
      yesterday: yesterday,
      today: today,
      date: today,
      all_date: all_date
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "杭州尼克之星自行车队",
      desc: "点击参与卷王挑战赛",
      path: "/pages/index/index",
      imageUrl: "/images/share.jpg"
    };
  }
})

function get_week(weekDay) {
  var weekDayChinese = "";
  switch (weekDay) {
    case 0:
      weekDayChinese = "周日";
      break;
    case 1:
      weekDayChinese = "周一";
      break;
    case 2:
      weekDayChinese = "周二";
      break;
    case 3:
      weekDayChinese = "周三";
      break;
    case 4:
      weekDayChinese = "周四";
      break;
    case 5:
      weekDayChinese = "周五";
      break;
    case 6:
      weekDayChinese = "周六";
      break;
  }
  return weekDayChinese;
}