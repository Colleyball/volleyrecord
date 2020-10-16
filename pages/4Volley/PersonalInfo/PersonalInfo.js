// pages/4Volley/PersonalInfo/PersonalInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    college: ['机械工程学院', '电子信息学院', '计算机学院', '自动化学院', '材料与环境工程学院', '理学院', '经济学院', '管理学院', '会计学院', '外国语学院', '卓越学院', '网络空间安全学院', '圣光基联合学院', '人文艺术与数字媒体学院、法学院'],
    CollegeFlag: true,
    MyCollege: '请选择学院',
    MyCollege_color: 'gray',
    UserStatus: [[1, '参与约课'], [0, '不参与约课']],
    UserStatusFlag: true,
    MyUserStatus: '请选择是否参与约课',
    MyUserStatus_color: 'gray'
  },

  SelectCollege: function () {
    this.setData({
      CollegeFlag: false
    })
  },
  BindHideSelectCollege: function () {
    this.setData({
      CollegeFlag: true
    })
  },
  ConfirmCollege: function (e) {
    let college = e.currentTarget.dataset.name
    this.setData({
      MyCollege: college,
      MyCollege_color: '#333333',
      CollegeFlag: true
    })
  },
  SelectUserStatus: function () {
    this.setData({
      UserStatusFlag: false
    })
  },
  BindHideSelectUserStatus: function () {
    this.setData({
      UserStatusFlag: true
    })
  },
  ConfirmUserStatus: function (e) {
    let UserStatus = e.currentTarget.dataset.name
    let UserStatus_id = e.currentTarget.dataset.value
    this.setData({
      MyUserStatus: UserStatus,
      UserStatus_id: UserStatus_id,
      MyUserStatus_color: '#333333',
      UserStatusFlag: true
    })
  },
  GetNo: function (e) {
    this.setData({
      No: e.detail.value
    })
  },
  GetName: function (e) {
    this.setData({
      Name: e.detail.value
    })
  },
  GetTel: function (e) {
    this.setData({
      Tel: e.detail.value
    })
  },
  BindConfirm: function (e) {
    var that = this
    wx.request({
      url: "https://api.volleywang.cn/4volley/NewPlayer",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        uid: wx.getStorageSync("Uid"),
        school_no: that.data.No,
        name: that.data.Name,
        tel: that.data.Tel,
        college: that.data.MyCollege,
        class: that.data.MyUserStatus
      },
      success: function (t) {
        console.log(t.data)
        wx.showModal({
          title: '提示',
          content: '完善个人信息成功',
          showCancel: false,
          success: function (res) {
            wx.navigateBack()
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  }
})