const app = getApp()

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    avatarUrl: defaultAvatarUrl,
    avatarUrl_modified: false,
    nikename: '',
    gender_choose: 0,
  },
  GetName: function (e) {
    this.setData({
      nikename: e.detail.value
    })
  },
  bindGender: function (e) {
    var gender_choose = e.currentTarget.dataset.gender
    var gender
    if (gender_choose == 1) {
      gender = '男'
    } else {
      gender = '女'
    }
    this.setData({
      gender_choose: gender_choose,
      gender: gender
    })
    console.log(gender_choose)
  },
  BindConfirm: function (e) {
    var that = this
    if (!this.data.nikename || !this.data.avatarUrl_modified || !this.data.gender_choose) {
      wx.showModal({
        title: '提示',
        content: '头像或昵称未设置',
        showCancel: false,
        confirmText: '返回修改'
      })
    } else {
      wx.setStorageSync('userName', that.data.nikename)
      let avatarUrl_sBase64 = 'data:image/jpeg;base64,' + wx.getFileSystemManager().readFileSync(that.data.avatarUrl, 'base64')
      wx.setStorageSync('userAvatar', avatarUrl_sBase64)
      console.log(that.data.nikename)
      console.log(avatarUrl_sBase64)
      wx.request({
        url: "https://niko.game-win.cn/api/SetPublicInfoPost",
          header: {
              "content-type": "application/json;charset=utf8"
          },
          method: "POST",
          data: {
              uid: wx.getStorageSync('Uid'),
              nickname: that.data.nikename,
              province: '',
              city: '',
              gender: that.data.gender_choose,
              pic: avatarUrl_sBase64
          },
          success: function(t) {
              console.log(t.data);
              wx.showModal({
                title: '提示',
                content: '设置成功',
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
          }
      });
    }
  },
  onLoad() {

  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
      avatarUrl_modified: true
    })
  },
  onShareAppMessage: function () {
    return {
      title: "杭州尼克之星自行车队",
      desc: "点击参与卷王挑战赛",
      path: "/pages/index/index",
      imageUrl: "/images/share.jpg"
    };
  }
})
