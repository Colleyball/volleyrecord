const util = require('../../utils/util.js')

Page({
  data: {
    currentTab: '',
    TeamANum: [],
    TeamBNum: [],
    TeamACount: 0,
    TeamBCount: 0,
    Ref1: 'HDU',
    Ref2: 'HDU',
    Ref3: 'HDU',
    Ref4: 'HDU',
    TeamAName:'……',
    TeamBName:'……',
    FirstServe:2,
    FirstSide:2,
    ChooseTeamFlag: false,
    swiperHeight:1000,
    ShowAddNum: true,
    AddPlayerTeamFlag: 0
  },
  /*** 滑动切换tab***/
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current});
    if (e.detail.current == 0) this.setData({ swiperHeight: 800})
    if (e.detail.current == 1) this.setData({ swiperHeight: 1500 })
    if (e.detail.current == 2) this.setData({ swiperHeight: 1500 })
    if (e.detail.current == 3) this.setData({ swiperHeight: 1000 })
  },
  /*** 点击tab切换***/
  swichNav: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current
    });
  },
  Coin:function() {
    var i = 5
    var that = this
    var id = setInterval(function () {
      wx.showLoading({
        title: '正在抛硬币~'+i,
        mask: true
      })
      i--
    }, 1000)
    var result = Math.random()
    if (result < 0.5) {
      that.setData({
        coin: '正面'
      })
    } else {
      that.setData({
        coin: '反面'
      })
    }
    setTimeout(function () {
      wx.hideLoading()
      clearInterval(id)
      wx.showModal({
        title: '挑边结果',
        content: that.data.coin,
        showCancel:false
      })
    }, 5500)
  },
  //点击数字添加队员
  ChoosePlayerTeamA: function(e) {
    var i = 0
    var count = this.data.TeamACount
    var TeamA = this.data.TeamANum
    var PlayerNum = e.currentTarget.dataset.num
    var TeamANumFlag = this.data.TeamANumFlag
    var PlayerFlag = 0
    var PlayerIndex = -1
    /*if (TeamA[PlayerNum] == e.currentTarget.dataset.num) {
      TeamA[PlayerNum] = 0
      count--
      this.setData({
        TeamANum: TeamA,
        TeamACount: count
      })
    } else {
      if (count >= 12) {
        wx.showModal({
          title: '提示',
          content: '最多只能选择12名队员',
          showCancel: false
        })
      } else {
        TeamA[PlayerNum] = e.currentTarget.dataset.num
        count++
        this.setData({
          TeamACount: count,
          TeamANum: TeamA
        })
      }
    }*/
    var len = TeamA.length
    //队员是否已经添加
    for (i=0;i<len;i++) {
      if (TeamA[i] == PlayerNum) {
        PlayerFlag = 1
        PlayerIndex = i
      }
    }
    if (PlayerFlag == 0) {
      TeamA.push(PlayerNum)
      count++
      TeamANumFlag[PlayerNum] = 1
    } else {
      TeamA.splice(PlayerIndex,1)
      count--
      TeamANumFlag[PlayerNum] = 0
    }
    this.setData({
      TeamACount: count,
      TeamANum: TeamA,
      TeamANumFlag: TeamANumFlag
    })
  },
  ChoosePlayerTeamB: function (e) {
    var i = 0
    var count = this.data.TeamBCount
    var TeamB = this.data.TeamBNum
    var PlayerNum = e.currentTarget.dataset.num
    if (TeamB[PlayerNum] == e.currentTarget.dataset.num) {
      TeamB[PlayerNum] = 0
      count--
      this.setData({
        TeamBCount: count,
        TeamBNum: TeamB
      })
    } else {
      if (count >= 12) {
        wx.showModal({
          title: '提示',
          content: '最多只能选择12名队员',
          showCancel: false
        })
      } else {
        TeamB[PlayerNum] = e.currentTarget.dataset.num
        count++
        this.setData({
          TeamBCount: count,
          TeamBNum: TeamB
        })
      }
    }
  },
  AddTeamAPlayer: function () {
    this.setData({
      ShowAddNum: false,
      AddPlayerTeamFlag: 0
    })
  },
  AddPlayerBack: function() {
    this.setData({
      ShowAddNum: true
    })
  },
  GetTeamANewNum: function (e) {
    this.setData({
      TemaAPlayerTemp: e.detail.value
    })
  },
  GetTeamBNewNum: function (e) {
    this.setData({
      TemaBPlayerTemp: e.detail.value
    })
  },
  GetMatchName: function (e) {
    this.setData({
      MatchName: e.detail.value   
    })
  },
  GetRef1: function (e) {
    this.setData({
      Ref1: e.detail.value
    })
  },
  GetRef2: function (e) {
    this.setData({
      Ref2: e.detail.value
    })
  },
  GetRef3: function (e) {
    this.setData({
      Ref3: e.detail.value
    })
  },
  GetRef4: function (e) {
    this.setData({
      Ref4  : e.detail.value
    })
  },
  GetTeamAName: function (e) {
    this.setData({
      TeamAName: e.detail.value
    })
  },
  GetTeamBName: function (e) {
    this.setData({
      TeamBName: e.detail.value
    })
  },
  ChooseServer:function (e) {
    this.setData({
      FirstServe:e.currentTarget.dataset.team
    })
    wx.setStorageSync('FirstServe', e.currentTarget.dataset.team)
  },
  ChooseSide: function (e) {
    this.setData({
      FirstSide: e.currentTarget.dataset.team
    })
    wx.setStorageSync('FirstSide', e.currentTarget.dataset.team)
  },
  BindConfirm :function () {
    var that = this
    if (!this.data.MatchName || !this.data.TeamAName || !this.data.TeamBName || this.data.TeamACount < 6 || this.data.TeamBCount < 6) {
      wx.showModal({
        title: '提示',
        content: '比赛信息填写不完整',
        showCancel: false
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请确认信息填写正确',
        confirmText: '开始比赛',
        cancelText: '返回修改',
        success: function (res) {
          if (res.confirm) {
            var i = 0
            var TeamA = that.data.TeamANum
            var TeamANumber = new Array()
            for (i = 1; i < TeamA.length; i++) {
              if (TeamA[i] != 0) {
                TeamANumber.push(TeamA[i])
              }
            }
            var TeamB = that.data.TeamBNum
            var TeamBNumber = new Array()
            for (i = 1; i < TeamB.length; i++) {
              if (TeamB[i] != 0) {
                TeamBNumber.push(TeamB[i])
              }
            }
            var matchinfo = new Array()
            matchinfo.push(that.data.MatchName)
            matchinfo.push(that.data.TeamAName)
            matchinfo.push(that.data.TeamBName)
            matchinfo.push(that.data.Ref1)
            matchinfo.push(that.data.Ref2)
            matchinfo.push(that.data.Ref3)
            matchinfo.push(that.data.Ref4)
            matchinfo.push(util.formatTime(new Date))
            wx.setStorageSync('TeamANumber', TeamANumber)
            wx.setStorageSync('TeamBNumber', TeamBNumber)
            wx.setStorageSync('Matchinfo', matchinfo)
            if (wx.getStorageSync('win') == 1) {
              wx.navigateTo({
                url: 'MatchProcess/OneSet/MatchProcessOneSet',
              })
            }
            if (wx.getStorageSync('win') == 2) {
              wx.navigateTo({
                url: 'MatchProcess/ThreeSet/MatchProcessThreeSet',
              })
            }
            if (wx.getStorageSync('win') == 3) {
              wx.navigateTo({
                url: 'MatchProcess/FiveSet/MatchProcessFiveSet',
              })
            }
          }
        } 
      })
    }
  },
  onLoad: function (option) {
    if (!wx.getStorageSync('userInfo')) {
      wx.showModal({
        title: '提示',
        content: '使用数据记录功能需要获取您的公开信息（昵称、头像等），请返回重试',
        showCancel:false,
        success:function (res) {
          if (res.confirm) {
            wx.navigateBack()
          }
        }
      })
    }
    if (wx.getStorageSync('Status') == 1 || wx.getStorageSync('Status') == 2 || wx.getStorageSync('Status') == 5)  {
      wx.showModal({
        title: '提示',
        content: '是否载入未结束的比赛',
        success: function (res) {
          if (res.confirm) {
            if (wx.getStorageSync('win') == 1) {
              wx.navigateTo({
                url: 'MatchProcess/OneSet/MatchProcessOneSet',
              })
            }
            if (wx.getStorageSync('win') == 2) {
              wx.navigateTo({
                url: 'MatchProcess/ThreeSet/MatchProcessThreeSet',
              })
            }
            if (wx.getStorageSync('win') == 3) {
              wx.navigateTo({
                url: 'MatchProcess/FiveSet/MatchProcessFiveSet',
              })
            }
          }
          if (res.cancel) {
            var Uid = wx.getStorageSync('Uid')
            var userInfo = wx.getStorageSync('userInfo')
            wx.clearStorage()
            setTimeout(function () {
              wx.setStorageSync('Uid', Uid)
              wx.setStorageSync('userInfo', userInfo)
            }, 1000)
            wx.navigateBack()
          }
        }
      })
    } else {
      wx.setStorageSync('win', option.win)
    }
    var TeamNumFlag = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0');
    this.setData({
      TeamANumFlag: TeamNumFlag,
      TeamBNumFlag: TeamNumFlag
    })
  }
})