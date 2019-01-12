// pages/DurationMatch/DurationMatch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    TeamAPlayer: [],
    TeamBPlayer: [],
    TeamACourtPlayer: ['a', '!', '!', '!', '!', '!', '!'],
    TeamBCourtPlayer: ['b', '!', '!', '!', '!', '!', '!'],
    ShowTeamAALLPlayer: true,
    ShowTeamBALLPlayer: true,
    Status: 0,
    AScore: 0,
    BScore: 0,
    ASet1: 0,
    BSet1: 0,
    ASet2: 0,
    BSet2: 0,
    ASet3: 0,
    BSet3: 0,
    AMatch: 0,
    BMatch: 0,
    TimeOut: [],
    SubTeamASet1: [],
    SubTeamASet2: [],
    SubTeamASet3: [],
    SubTeamBSet1: [],
    SubTeamBSet2: [],
    SubTeamBSet3: [],
    MatchDuratoinSet3: [],
    TeamACurrentSetTimeOut: 2,
    TeamBCurrentSetTimeOut: 2,
    TeamACurrentSetSub: 6,
    TeamBCurrentSetSub: 6,
    MatchDuratoinSet1: [],
    MatchDuratoinSet2: [],
    MatchDuratoinSet3: [],
    LastScore: 0,
    FirstServe: 0,
    FirstSide: 0,
    time: 30,
    Statisticflag: true,
    ShowTeamAPlayer: true,
    ShowTeamBPlayer: true,
    ShowTimeOut: true,
    ShowTeamABenchPlayer: true,
    ShowTeamBBenchPlayer: true,
    ShowEditAScore: true,
    ShowEditBScore: true,
    Side: 0
  },

  BindHelp: function () {
    var imgalist = ['https://volleywang.cn/liansaiquan/images/help/1.jpg',
      'https://volleywang.cn/liansaiquan/images/help/2.jpg',
      'https://volleywang.cn/liansaiquan/images/help/3.jpg',
      'https://volleywang.cn/liansaiquan/images/help/4.jpg']
    wx.previewImage({
      current: 0,
      urls: imgalist // 需要预览的图片http链接列表  
    })
  },

  /*** 滑动切换tab***/
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  /*** 点击tab切换　***/
  swichNav: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current
    });
  },
  EditAScore: function () {
    this.setData({
      ShowEditAScore: false
    })
  },
  EditBScore: function () {
    this.setData({
      ShowEditBScore: false
    })
  },
  GetTeamANewScore: function (e) {
    this.setData({
      ANewScore: e.detail.value
    })
  },
  GetTeamBNewScore: function (e) {
    this.setData({
      BNewScore: e.detail.value
    })
  },
  ConfirmTeamANewScore: function (e) {
    var ANewScore = this.data.ANewScore
    this.setData({
      AScore: ANewScore,
      ShowEditAScore: true
    })
    wx.setStorageSync('AScore', ANewScore)
  },
  ChangeTeamAPosition: function (e) {
    var TeamACourtPlayer = this.data.TeamACourtPlayer
    var TeamACourtPlayer_temp = TeamACourtPlayer[1]
    TeamACourtPlayer[1] = TeamACourtPlayer[2]
    TeamACourtPlayer[2] = TeamACourtPlayer[3]
    TeamACourtPlayer[3] = TeamACourtPlayer[4]
    TeamACourtPlayer[4] = TeamACourtPlayer[5]
    TeamACourtPlayer[5] = TeamACourtPlayer[6]
    TeamACourtPlayer[6] = TeamACourtPlayer_temp
    this.setData({
      TeamACourtPlayer: TeamACourtPlayer,
    })
    wx.setStorageSync('TeamACourtPlayer', TeamACourtPlayer)
  },
  ChangeTeamBPosition: function (e) {
    var TeamBCourtPlayer = this.data.TeamBCourtPlayer
    var TeamBCourtPlayer_temp = TeamBCourtPlayer[1]
    TeamBCourtPlayer[1] = TeamBCourtPlayer[2]
    TeamBCourtPlayer[2] = TeamBCourtPlayer[3]
    TeamBCourtPlayer[3] = TeamBCourtPlayer[4]
    TeamBCourtPlayer[4] = TeamBCourtPlayer[5]
    TeamBCourtPlayer[5] = TeamBCourtPlayer[6]
    TeamBCourtPlayer[6] = TeamBCourtPlayer_temp
    this.setData({
      TeamBCourtPlayer: TeamBCourtPlayer,
    })
    wx.setStorageSync('TeamBCourtPlayer', TeamBCourtPlayer)
  },
  ConfirmTeamBNewScore: function (e) {
    var BNewScore = this.data.BNewScore
    this.setData({
      BScore: BNewScore,
      ShowEditBScore: true
    })
    wx.setStorageSync('BScore', BNewScore)
  },
  /*** 选择场上位置　***/
  ChooseTeamAPlayer: function (e) {
    console.log('ChooseTeamAPlayer')
    var CourtPlayer = this.data.TeamACourtPlayer
    var Position = e.currentTarget.dataset.position
    var AllPlayer = this.data.TeamAPlayer
    if (this.data.Status == 0 || 　this.data.Status == 2) {
      this.setData({
        ShowTeamAALLPlayer: false,
        currentTeamAPosition: Position
      })
    }

    if (this.data.Status == 1) {
      var PickedPlayer = CourtPlayer[Position]
      this.setData({
        PickedPlayer: PickedPlayer,
        currentTeamAPosition: Position,
        ShowTeamABenchPlayer: false
      })
      GetBenchPlayerTeamA(this, CourtPlayer, AllPlayer)
    }
  },
  ChooseTeamBPlayer: function (e) {
    var CourtPlayer = this.data.TeamBCourtPlayer
    var Position = e.currentTarget.dataset.position
    var AllPlayer = this.data.TeamBPlayer
    if (this.data.Status == 0 || this.data.Status == 2) {
      this.setData({
        ShowTeamBALLPlayer: false,
        currentTeamBPosition: Position
      })
    }

    if (this.data.Status == 1) {
      var PickedPlayer = CourtPlayer[Position]
      this.setData({
        PickedPlayer: PickedPlayer,
        currentTeamBPosition: Position,
        ShowTeamBBenchPlayer: false
      })
      GetBenchPlayerTeamB(this, CourtPlayer, AllPlayer)
    }
  },
  /*** 设置某个位置上的队员　***/
  SetTeamAPlayer: function (e) {
    var that = this
    var position = this.data.currentTeamAPosition
    var TeamACourtPlayer = this.data.TeamACourtPlayer
    var TeamBCourtPlayer = this.data.TeamBCourtPlayer
    var match = that.data.AMatch + that.data.BMatch
    if (match == 0) {
      var TeamALineUp = 'TeamALineUpFirstSet'
      var TeamBLineUp = 'TeamBLineUpFirstSet'
    }
    if (match == 1) {
      var TeamALineUp = 'TeamALineUpSecondSet'
      var TeamBLineUp = 'TeamBLineUpSecondSet'
    }
    if (match == 2) {
      var TeamALineUp = 'TeamALineUpThirdSet'
      var TeamBLineUp = 'TeamBLineUpThirdSet'
    }
    TeamACourtPlayer[position] = e.currentTarget.dataset.num
    this.setData({
      TeamACourtPlayer: TeamACourtPlayer,
      ShowTeamAALLPlayer: true
    })
    if (TeamACourtPlayer[1] != '!' && TeamACourtPlayer[2] != '!' && TeamACourtPlayer[3] != '!' && TeamACourtPlayer[4] != '!' && TeamACourtPlayer[5] != '!' && TeamACourtPlayer[6] != '!' && TeamBCourtPlayer[1] != '!' && TeamBCourtPlayer[2] != '!' && TeamBCourtPlayer[3] != '!' && TeamBCourtPlayer[4] != '!' && TeamBCourtPlayer[5] != '!' && TeamBCourtPlayer[6] != '!') {
      wx.showModal({
        title: '提示',
        content: '是否确认本局比赛双方的首发队员',
        cancelText: '返回修改',
        confirmText: '开始比赛',
        success: function (res) {
          if (res.confirm) {
            wx.setStorageSync(TeamALineUp, TeamACourtPlayer)
            wx.setStorageSync(TeamBLineUp, TeamBCourtPlayer)
            wx.setStorageSync('TeamACourtPlayer', TeamACourtPlayer)
            wx.setStorageSync('TeamBCourtPlayer', TeamBCourtPlayer)
            wx.setStorageSync('Status', '1')
            that.setData({
              Status: 1
            })
          }
        }
      })
    }
  },
  SetTeamBPlayer: function (e) {
    var that = this
    var position = this.data.currentTeamBPosition
    var TeamACourtPlayer = this.data.TeamACourtPlayer
    var TeamBCourtPlayer = this.data.TeamBCourtPlayer
    var match = that.data.AMatch + that.data.BMatch
    if (match == 0) {
      var TeamALineUp = 'TeamALineUpFirstSet'
      var TeamBLineUp = 'TeamBLineUpFirstSet'
    }
    if (match == 1) {
      var TeamALineUp = 'TeamALineUpSecondSet'
      var TeamBLineUp = 'TeamBLineUpSecondSet'
    }
    if (match == 2) {
      var TeamALineUp = 'TeamALineUpThirdSet'
      var TeamBLineUp = 'TeamBLineUpThirdSet'
    }
    TeamBCourtPlayer[position] = e.currentTarget.dataset.num
    this.setData({
      TeamBCourtPlayer: TeamBCourtPlayer,
      ShowTeamBALLPlayer: true
    })
    if (TeamACourtPlayer[1] != '!' && TeamACourtPlayer[2] != '!' && TeamACourtPlayer[3] != '!' && TeamACourtPlayer[4] != '!' && TeamACourtPlayer[5] != '!' && TeamACourtPlayer[6] != '!' && TeamBCourtPlayer[1] != '!' && TeamBCourtPlayer[2] != '!' && TeamBCourtPlayer[3] != '!' && TeamBCourtPlayer[4] != '!' && TeamBCourtPlayer[5] != '!' && TeamBCourtPlayer[6] != '!') {
      wx.showModal({
        title: '提示',
        content: '是否确认本局比赛双方的首发队员',
        cancelText: '返回修改',
        confirmText: '开始比赛',
        success: function (res) {
          if (res.confirm) {
            wx.setStorageSync(TeamALineUp, TeamACourtPlayer)
            wx.setStorageSync(TeamBLineUp, TeamBCourtPlayer)
            wx.setStorageSync('TeamACourtPlayer', TeamACourtPlayer)
            wx.setStorageSync('TeamBCourtPlayer', TeamBCourtPlayer)
            wx.setStorageSync('Status', '1')
            that.setData({
              Status: 1
            })
          }
        }
      })
    }
  },

  actionSheetbindchange: function () {
    this.setData({
      ShowTeamAALLPlayer: true,
      ShowTeamBALLPlayer: true
    })
  },

  AddTeamAScore: function () {
    if (this.data.Status == 0 || this.data.Status == 2) {
      wx.showModal({
        title: '提示',
        content: '请填写队员站位',
        showCancel: false
      })
      return
    }
    var AScore = parseInt(this.data.AScore)
    var BScore = parseInt(this.data.BScore)
    var AScore_new = AScore + 1;
    var LastScore = this.data.LastScore
    UpdateScore(this, AScore_new, BScore)
    this.setData({
      AScore: AScore_new,
      LastScore_tmp: 0,
      Statisticflag: false,
    })
    wx.setStorageSync('LastScore', 0)
    wx.setStorageSync('AScore', AScore_new)
  },

  AddTeamBScore: function () {
    if (this.data.Status == 0 || this.data.Status == 2) {
      wx.showModal({
        title: '提示',
        content: '请填写队员站位',
        showCancel: false
      })
      return
    }
    var AScore = parseInt(this.data.AScore)
    var BScore = parseInt(this.data.BScore)
    var BScore_new = BScore + 1;
    UpdateScore(this, AScore, BScore_new)
    this.setData({
      BScore: BScore_new,
      Statisticflag: false,
      LastScore_tmp: 1,
    })
    wx.setStorageSync('LastScore', 1)
    wx.setStorageSync('BScore', BScore_new)
  },

  StatisticPoint: function (e) {
    var PointType = e.currentTarget.dataset.score
    this.setData({
      Statisticflag: true,
    })
    if (this.data.LastScore_tmp == 0) {
      if (PointType == 0) {
        this.setData({
          ShowTeamAPlayer: false,
          Point: e.currentTarget.dataset.point,
          PointType: PointType
        })
      }
      if (PointType == 1) {
        this.setData({
          ShowTeamBPlayer: false,
          Point: e.currentTarget.dataset.point,
          PointType: PointType
        })
      }
    }
    if (this.data.LastScore_tmp == 1) {
      if (PointType == 0) {
        this.setData({
          ShowTeamBPlayer: false,
          Point: e.currentTarget.dataset.point,
          PointType: PointType
        })
      }
      if (PointType == 1) {
        this.setData({
          ShowTeamAPlayer: false,
          Point: e.currentTarget.dataset.point,
          PointType: PointType
        })
      }
    }

    if (PointType == 2) {
      var TeamACourtPlayer = this.data.TeamACourtPlayer
      var TeamBCourtPlayer = this.data.TeamBCourtPlayer
      if (this.data.LastScore_tmp == 0) {
        if (this.data.LastScore == 1) {
          var TeamACourtPlayer_temp = TeamACourtPlayer[1]
          TeamACourtPlayer[1] = TeamACourtPlayer[2]
          TeamACourtPlayer[2] = TeamACourtPlayer[3]
          TeamACourtPlayer[3] = TeamACourtPlayer[4]
          TeamACourtPlayer[4] = TeamACourtPlayer[5]
          TeamACourtPlayer[5] = TeamACourtPlayer[6]
          TeamACourtPlayer[6] = TeamACourtPlayer_temp
          this.setData({
            LastScore: 0,
            TeamACourtPlayer: TeamACourtPlayer,
          })
        } else {
          this.setData({
            LastScore: 0
          })
        }
      }
      if (this.data.LastScore_tmp == 1) {
        if (this.data.LastScore == 0) {
          var TeamBCourtPlayer_temp = TeamBCourtPlayer[1]
          TeamBCourtPlayer[1] = TeamBCourtPlayer[2]
          TeamBCourtPlayer[2] = TeamBCourtPlayer[3]
          TeamBCourtPlayer[3] = TeamBCourtPlayer[4]
          TeamBCourtPlayer[4] = TeamBCourtPlayer[5]
          TeamBCourtPlayer[5] = TeamBCourtPlayer[6]
          TeamBCourtPlayer[6] = TeamBCourtPlayer_temp
          this.setData({
            LastScore: 1,
            TeamBCourtPlayer: TeamBCourtPlayer,
          })
        } else {
          this.setData({
            LastScore: 1
          })
        }
      }
      wx.setStorageSync('TeamACourtPlayer', TeamACourtPlayer)
      wx.setStorageSync('TeamBCourtPlayer', TeamBCourtPlayer)
      EndOneSet(this, this.data.AScore, this.data.BScore)
    }
  },

  SetStatistic: function (e) {
    var position = e.currentTarget.dataset.position
    var pointtype = this.data.PointType
    var Point = this.data.Point
    var TeamACourtPlayer = this.data.TeamACourtPlayer
    var TeamBCourtPlayer = this.data.TeamBCourtPlayer
    this.setData({
      ShowTeamBPlayer: true,
      ShowTeamAPlayer: true,
    })
    if (this.data.LastScore_tmp == 0) {
      if (this.data.PointType == 0) {
        var TeamAStatistic = wx.getStorageSync('TeamAStatistic')
        console.log(position)
        if (Point == 'SpikePoint') {
          TeamAStatistic[position][0].SpikePoint = TeamAStatistic[position][0].SpikePoint + 1
        }
        if (Point == 'BlockPoint') {
          TeamAStatistic[position][0].BlockPoint = TeamAStatistic[position][0].BlockPoint + 1
        }
        if (Point == 'ServePoint') {
          TeamAStatistic[position][0].ServePoint = TeamAStatistic[position][0].ServePoint + 1
        }
        wx.setStorageSync('TeamAStatistic', TeamAStatistic)
      }
      if (this.data.PointType == 1) {
        var TeamBStatistic = wx.getStorageSync('TeamBStatistic')
        if (Point == 'SpikeFault') {
          TeamBStatistic[position][0].SpikeFault = TeamBStatistic[position][0].SpikeFault + 1
        }
        if (Point == 'ServeFault') {
          TeamBStatistic[position][0].ServeFault = TeamBStatistic[position][0].ServeFault + 1
        }
        if (Point == 'OtherFault') {
          TeamBStatistic[position][0].OtherFault = TeamBStatistic[position][0].OtherFault + 1
        }
        wx.setStorageSync('TeamBStatistic', TeamBStatistic)
      }
      if (this.data.LastScore == 1) {
        var TeamACourtPlayer_temp = TeamACourtPlayer[1]
        TeamACourtPlayer[1] = TeamACourtPlayer[2]
        TeamACourtPlayer[2] = TeamACourtPlayer[3]
        TeamACourtPlayer[3] = TeamACourtPlayer[4]
        TeamACourtPlayer[4] = TeamACourtPlayer[5]
        TeamACourtPlayer[5] = TeamACourtPlayer[6]
        TeamACourtPlayer[6] = TeamACourtPlayer_temp
        this.setData({
          LastScore: 0,
          TeamACourtPlayer: TeamACourtPlayer,
        })
      } else {
        this.setData({
          LastScore: 0
        })
      }
    }
    if (this.data.LastScore_tmp == 1) {
      if (this.data.PointType == 0) {
        var TeamBStatistic = wx.getStorageSync('TeamBStatistic')
        if (Point == 'SpikePoint') {
          TeamBStatistic[position][0].SpikePoint = TeamBStatistic[position][0].SpikePoint + 1
        }
        if (Point == 'BlockPoint') {
          TeamBStatistic[position][0].BlockPoint = TeamBStatistic[position][0].BlockPoint + 1
        }
        if (Point == 'ServePoint') {
          TeamBStatistic[position][0].ServePoint = TeamBStatistic[position][0].ServePoint + 1
        }
        wx.setStorageSync('TeamBStatistic', TeamBStatistic)
      }
      if (this.data.PointType == 1) {
        var TeamAStatistic = wx.getStorageSync('TeamAStatistic')
        if (Point == 'SpikeFault') {
          TeamAStatistic[position][0].SpikeFault = TeamAStatistic[position][0].SpikeFault + 1
        }
        if (Point == 'ServeFault') {
          TeamAStatistic[position][0].ServeFault = TeamAStatistic[position][0].ServeFault + 1
        }
        if (Point == 'OtherFault') {
          TeamAStatistic[position][0].OtherFault = TeamAStatistic[position][0].OtherFault + 1
        }
        wx.setStorageSync('TeamAStatistic', TeamAStatistic)
      }
      if (this.data.LastScore == 0) {
        var TeamBCourtPlayer_temp = TeamBCourtPlayer[1]
        TeamBCourtPlayer[1] = TeamBCourtPlayer[2]
        TeamBCourtPlayer[2] = TeamBCourtPlayer[3]
        TeamBCourtPlayer[3] = TeamBCourtPlayer[4]
        TeamBCourtPlayer[4] = TeamBCourtPlayer[5]
        TeamBCourtPlayer[5] = TeamBCourtPlayer[6]
        TeamBCourtPlayer[6] = TeamBCourtPlayer_temp
        this.setData({
          LastScore: 1,
          TeamBCourtPlayer: TeamBCourtPlayer,
        })
      } else {
        this.setData({
          LastScore: 1
        })
      }
    }
    wx.setStorageSync('TeamACourtPlayer', TeamACourtPlayer)
    wx.setStorageSync('TeamBCourtPlayer', TeamBCourtPlayer)
    EndOneSet(this, this.data.AScore, this.data.BScore)
  },

  ChangeServe: function () {
    var LastScore = this.data.LastScore
    if (LastScore == 1) {
      var NewScore = 0
    } else {
      var NewScore = 1
    }
    this.setData({
      LastScore: NewScore
    })
    wx.setStorageSync('LastScore', NewScore)
  },

  ChangeSide: function () {
    if (this.data.Side == 0) {
      this.setData({
        Side: 1
      })
    } else {
      this.setData({
        Side: 0
      })
    }

  },

  TimeOut: function (e) {
    var that = this
    if (e.currentTarget.dataset.team == 0) {
      if (this.data.TeamACurrentSetTimeOut == 0) {
        wx.showModal({
          title: '提示',
          content: that.data.MatchInfo[1] + '本局比赛的换人次数已用完',
          showCancel: false
        })
        return
      }
    }
    if (e.currentTarget.dataset.team == 1) {
      if (this.data.TeamBCurrentSetTimeOut == 0) {
        wx.showModal({
          title: '提示',
          content: that.data.MatchInfo[2] + '本局比赛的换人次数已用完',
          showCancel: false
        })
        return
      }
    }
    this.setData({
      ShowTimeOut: false
    })
    SetTimeOutInfo(this, this.data.AScore, this.data.BScore, this.data.AMatch, this.data.BMatch, e.currentTarget.dataset.team)
    var i = 30
    var id = setInterval(function () {
      that.setData({
        time: i--
      })
    }, 1000)
    setTimeout(function () {
      that.setData({
        ShowTimeOut: true,
        time: 30
      })
      clearInterval(id)
    }, 32000)

  },

  BindClose: function () {
    this.setData({
      ShowTeamAPlayer: true,
      ShowTeamBPlayer: true,
      ShowTeamBBenchPlayer: true,
      ShowTeamABenchPlayer: true,
      ShowEditAScore: true,
      ShowEditBScore: true
    })
  },

  ConfirmSub: function (e) {
    SetSubInfo(this, this.data.AScore, this.data.BScore, this.data.AMatch, this.data.BMatch, e.currentTarget.dataset.team, this.data.PickedPlayer, e.currentTarget.dataset.position)
    this.setData({
      ShowTeamABenchPlayer: true,
      ShowTeamBBenchPlayer: true,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var TeamAPlayer = wx.getStorageSync('TeamANumber')
    var TeamBPlayer = wx.getStorageSync('TeamBNumber')
    if (wx.getStorageSync('Status') == 1 || wx.getStorageSync('Status') == 2) {
      that.setData({
        TeamACourtPlayer: wx.getStorageSync('TeamACourtPlayer'),
        TeamBCourtPlayer: wx.getStorageSync('TeamBCourtPlayer'),
        LastScore: wx.getStorageSync('LastScore'),
        Side: wx.getStorageSync('Side'),
        AScore: wx.getStorageSync('AScore'),
        BScore: wx.getStorageSync('BScore'),
        ASet1: wx.getStorageSync('ASet1'),
        BSet1: wx.getStorageSync('BSet1'),
        ASet2: wx.getStorageSync('ASet2'),
        BSet2: wx.getStorageSync('BSet2'),
        ASet3: wx.getStorageSync('ASet3'),
        BSet3: wx.getStorageSync('BSet3'),
        AMatch: wx.getStorageSync('AMatch'),
        BMatch: wx.getStorageSync('BMatch'),
        SubTeamASet1: wx.getStorageSync('SubTeamASet1'),
        SubTeamASet2: wx.getStorageSync('SubTeamASet2'),
        SubTeamASet3: wx.getStorageSync('SubTeamASet3'),
        SubTeamBSet1: wx.getStorageSync('SubTeamBSet1'),
        SubTeamBSet2: wx.getStorageSync('SubTeamBSet2'),
        SubTeamBSet3: wx.getStorageSync('SubTeamBSet3'),
        MatchDuratoinSet1: wx.getStorageSync('MatchDuratoinSet1'),
        MatchDuratoinSet2: wx.getStorageSync('MatchDuratoinSet2'),
        MatchDuratoinSet3: wx.getStorageSync('MatchDuratoinSet3'),
        TimeOut: wx.getStorageSync('TimeOut'),
        TeamACurrentSetTimeOut: wx.getStorageSync('TeamACurrentSetTimeOut'),
        TeamBCurrentSetTimeOut: wx.getStorageSync('TeamBCurrentSetTimeOut'),
        TeamACurrentSetSub: wx.getStorageSync('TeamACurrentSetSub'),
        TeamBCurrentSetSub: wx.getStorageSync('TeamBCurrentSetSub'),
      })

      if (wx.getStorageSync('Status') == 2) {
        that.setData({
          Status: 2
        })
      } else {
        that.setData({
          Status: 1
        })
      }
    }
    if (wx.getStorageSync('Status') == 0) {
      wx.setStorageSync('AScore', 0)
      wx.setStorageSync('BScore', 0)
      wx.setStorageSync('ASet1', 0)
      wx.setStorageSync('BSet1', 0)
      wx.setStorageSync('ASet2', 0)
      wx.setStorageSync('BSet2', 0)
      wx.setStorageSync('ASet3', 0)
      wx.setStorageSync('BSet3', 0)
      wx.setStorageSync('AMatch', 0)
      wx.setStorageSync('BMatch', 0)
      wx.setStorageSync('SubTeamASet1', []),
        wx.setStorageSync('SubTeamASet2', []),
        wx.setStorageSync('SubTeamASet3', []),
        wx.setStorageSync('SubTeamBSet1', []),
        wx.setStorageSync('SubTeamBSet2', []),
        wx.setStorageSync('SubTeamBSet3', []),
        wx.setStorageSync('MatchDuratoinSet1', [])
      wx.setStorageSync('MatchDuratoinSet2', [])
      wx.setStorageSync('MatchDuratoinSet3', [])
      wx.setStorageSync('TimeOut', [])
      wx.setStorageSync('TeamACurrentSetTimeOut', 2)
      wx.setStorageSync('TeamBCurrentSetTimeOut', 2)
      wx.setStorageSync('TeamACurrentSetSub', 6)
      wx.setStorageSync('TeamBCurrentSetSub', 6)

      var TeamAStatistic = []
      for (var i = 0; i < TeamAPlayer.length; i++) {
        TeamAStatistic[TeamAPlayer[i]] = [{
          ServePoint: 0,
          BlockPoint: 0,
          SpikePoint: 0,
          ServeFault: 0,
          SpikeFault: 0,
          OtherFault: 0
        }]
      }
      var TeamBStatistic = []
      for (var i = 0; i < TeamBPlayer.length; i++) {
        TeamBStatistic[TeamBPlayer[i]] = [{
          ServePoint: 0,
          BlockPoint: 0,
          SpikePoint: 0,
          ServeFault: 0,
          SpikeFault: 0,
          OtherFault: 0
        }]
      }
      this.setData({
        TeamAStatistic: TeamAStatistic,
        TeamBStatistic: TeamBStatistic,
        FirstServe: wx.getStorageSync('FirstServe'),
        FirstSide: wx.getStorageSync('FirstSide')
      })
      if (wx.getStorageSync('FirstServe') == 0) {
        this.setData({
          LastScore: 0
        })
        wx.setStorageSync('LastScore', 0)
      }
      if (wx.getStorageSync('FirstServe') == 1) {
        this.setData({
          LastScore: 1
        })
        wx.setStorageSync('LastScore', 1)
      }
      if (wx.getStorageSync('FirstSide') == 0) {
        this.setData({
          Side: 0
        })
        wx.setStorageSync('Side', 0)
      }
      if (wx.getStorageSync('FirstSide') == 1) {
        this.setData({
          Side: 1
        })
        wx.setStorageSync('Side', 1)
      }
      wx.setStorageSync('TeamAStatistic', TeamAStatistic)
      wx.setStorageSync('TeamBStatistic', TeamBStatistic)
    }
    if (wx.getStorageSync('Status') == 5) {
      EndMatch()
    }
    that.setData({
      TeamAPlayer: TeamAPlayer,
      TeamBPlayer: TeamBPlayer,
      MatchInfo: wx.getStorageSync('Matchinfo')
    })

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

  }
})

function EndOneSet(that, AScore, BScore) {
  var match = that.data.AMatch + that.data.BMatch

  var ASet = 'ASet1'
  var BSet = 'BSet1'
  
    if (AScore >= 25 && AScore - BScore >= 2) {
      var TeamACourtPlayer = new Array('a', '!', '!', '!', '!', '!', '!');
      var TeamBCourtPlayer = new Array('b', '!', '!', '!', '!', '!', '!');
      var AMatch_new = that.data.AMatch + 1
      var BMatch_new = that.data.BMatch
      that.setData({
        TeamACourtPlayer: TeamACourtPlayer,
        TeamBCourtPlayer: TeamBCourtPlayer,
        [ASet]: AScore,
        [BSet]: BScore,
        AMatch: AMatch_new,
        AScore: 0,
        BScore: 0,
        Status: 2,
        TeamACurrentSetTimeOut: 2,
        TeamBCurrentSetTimeOut: 2,
        TeamACurrentSetSub: 6,
        TeamBCurrentSetSub: 6
      })
      wx.setStorageSync(ASet, AScore)
      wx.setStorageSync(BSet, BScore)
      wx.setStorageSync('AMatch', AMatch_new)
      wx.setStorageSync('BMatch', BMatch_new)
      wx.setStorageSync('AScore', 0)
      wx.setStorageSync('BScore', 0)

      wx.setStorageSync('TeamACurrentSetTimeOut', 2)
      wx.setStorageSync('TeamBCurrentSetTimeOut', 2)
      wx.setStorageSync('TeamACurrentSetSub', 6)
      wx.setStorageSync('TeamBCurrentSetSub', 6)
      wx.setStorageSync('TeamACourtPlayer', TeamACourtPlayer)
      wx.setStorageSync('TeamBCourtPlayer', TeamBCourtPlayer)

      wx.setStorageSync('Status', 5) 
      EndMatch()


      console.log('A win a set')
    }
    if (BScore >= 25 && BScore - AScore >= 2) {
      var TeamACourtPlayer = new Array('a', '!', '!', '!', '!', '!', '!');
      var TeamBCourtPlayer = new Array('b', '!', '!', '!', '!', '!', '!');
      var AMatch_new = that.data.AMatch
      var BMatch_new = that.data.BMatch + 1
      that.setData({
        TeamACourtPlayer: TeamACourtPlayer,
        TeamBCourtPlayer: TeamBCourtPlayer,
        [ASet]: AScore,
        [BSet]: BScore,
        BMatch: BMatch_new,
        AScore: 0,
        BScore: 0,
        Status: 2,
        TeamACurrentSetTimeOut: 2,
        TeamBCurrentSetTimeOut: 2,
        TeamACurrentSetSub: 6,
        TeamBCurrentSetSub: 6
      })
      wx.setStorageSync(ASet, AScore)
      wx.setStorageSync(BSet, BScore)
      wx.setStorageSync('AMatch', AMatch_new)
      wx.setStorageSync('BMatch', BMatch_new)
      wx.setStorageSync('AScore', 0)
      wx.setStorageSync('BScore', 0)

      wx.setStorageSync('TeamACurrentSetTimeOut', 2)
      wx.setStorageSync('TeamBCurrentSetTimeOut', 2)
      wx.setStorageSync('TeamACurrentSetSub', 6)
      wx.setStorageSync('TeamBCurrentSetSub', 6)
      wx.setStorageSync('TeamACourtPlayer', TeamACourtPlayer)
      wx.setStorageSync('TeamBCourtPlayer', TeamBCourtPlayer)

      wx.setStorageSync('Status', 5) 
      EndMatch()

      console.log('B win a set')
    }
}


function UpdateScore(that, Ascore, Bscore) {
  var match = that.data.AMatch + that.data.BMatch
  if (match == 0) {
    var MatchDurationSet = 'MatchDuratoinSet1'
  }
  if (match == 1) {
    var MatchDurationSet = 'MatchDuratoinSet2'
  }
  if (match == 2) {
    var MatchDurationSet = 'MatchDuratoinSet3'
  }
  var MatchDetail = wx.getStorageSync(MatchDurationSet)
  var Score = [Ascore, Bscore]
  MatchDetail.push(Score)
  wx.setStorageSync(MatchDurationSet, MatchDetail)
  that.setData({
    [MatchDurationSet]: MatchDetail
  })
}

function SetTimeOutInfo(that, AScore, BScore, AMatch, BMatch, team) {
  var TimeOut = wx.getStorageSync('TimeOut')
  var Score = [team, AMatch, BMatch, AScore, BScore]
  TimeOut.push(Score)
  wx.setStorageSync('TimeOut', TimeOut)
  if (team == 0) {
    var TeamACurrentSetTimeOut = that.data.TeamACurrentSetTimeOut - 1
    that.setData({
      TimeOut: TimeOut,
      TeamACurrentSetTimeOut: TeamACurrentSetTimeOut
    })
    wx.setStorageSync('TeamACurrentSetTimeOut', TeamACurrentSetTimeOut)
  }
  if (team == 1) {
    var TeamBCurrentSetTimeOut = that.data.TeamBCurrentSetTimeOut - 1
    that.setData({
      TimeOut: TimeOut,
      TeamBCurrentSetTimeOut: TeamBCurrentSetTimeOut
    })
    wx.setStorageSync('TeamBCurrentSetTimeOut', TeamBCurrentSetTimeOut)
  }

}


function GetBenchPlayerTeamA(that, CourtPlayer, AllPlayer) {
  var match = that.data.AMatch + that.data.BMatch
  if (match == 0) {
    var SubSet = 'SubTeamASet1'
  }
  if (match == 1) {
    var SubSet = 'SubTeamASet2'
  }
  if (match == 2) {
    var SubSet = 'SubTeamASet3'
  }
  var SubSetInfo = wx.getStorageSync(SubSet)
  var UpPlayer = new Array()
  var OutPlayer = new Array()
  for (var i = 0; i < SubSetInfo.length; i++) {
    OutPlayer.push(SubSetInfo[i][5])
  }
  for (var i = 0; i < SubSetInfo.length; i++) {
    UpPlayer.push(SubSetInfo[i][6])
  }
  var LeftPlayer = UpPlayer.concat(OutPlayer)
  console.log(LeftPlayer)
  var LeftPlayer = LeftPlayer.concat(CourtPlayer)
  console.log(LeftPlayer)
  var LeftPlayer = MergeArrays(LeftPlayer, AllPlayer)
  console.log(LeftPlayer)

  var count = 0
  var num = 0
  for (var i = 0; i < SubSetInfo.length; i++) {
    if (that.data.PickedPlayer == SubSetInfo[i][6]) {
      count++
      num = i
    }
    if (that.data.PickedPlayer == SubSetInfo[i][5]) {
      count++
    }
  }
  console.log(that.data.PickedPlayer)
  //换下过一次
  if (count == 1) {
    LeftPlayer = [SubSetInfo[num][5]]
  }
  //换上换下一次
  if (count == 2) {
    LeftPlayer = ['-']
  }

  that.setData({
    LeftPlayer: LeftPlayer
  })
}

function GetBenchPlayerTeamB(that, CourtPlayer, AllPlayer) {
  var match = that.data.AMatch + that.data.BMatch
  if (match == 0) {
    var SubSet = 'SubTeamBSet1'
  }
  if (match == 1) {
    var SubSet = 'SubTeamBSet2'
  }
  if (match == 2) {
    var SubSet = 'SubTeamBSet3'
  }
  var SubSetInfo = wx.getStorageSync(SubSet)
  var UpPlayer = new Array()
  var OutPlayer = new Array()
  for (var i = 0; i < SubSetInfo.length; i++) {
    OutPlayer.push(SubSetInfo[i][5])
  }
  for (var i = 0; i < SubSetInfo.length; i++) {
    UpPlayer.push(SubSetInfo[i][6])
  }
  var LeftPlayer = UpPlayer.concat(OutPlayer)
  console.log(LeftPlayer)
  var LeftPlayer = LeftPlayer.concat(CourtPlayer)
  console.log(LeftPlayer)
  var LeftPlayer = MergeArrays(LeftPlayer, AllPlayer)
  console.log(LeftPlayer)

  var count = 0
  var num = 0
  for (var i = 0; i < SubSetInfo.length; i++) {
    if (that.data.PickedPlayer == SubSetInfo[i][6]) {
      count++
      num = i
    }
    if (that.data.PickedPlayer == SubSetInfo[i][5]) {
      count++
    }
  }
  console.log(that.data.PickedPlayer)
  //换下过一次
  if (count == 1) {
    LeftPlayer = [SubSetInfo[num][5]]
  }
  //换上换下一次
  if (count == 2) {
    LeftPlayer = ['-']
  }

  that.setData({
    LeftPlayer: LeftPlayer
  })
}

function SetSubInfo(that, AScore, BScore, AMatch, BMatch, team, OutPlayer, InPlayer) {
  var match = AMatch + BMatch
  if (team == 0) {
    if (match == 0) {
      var SubSet = 'SubTeamASet1'
    }
    if (match == 1) {
      var SubSet = 'SubTeamASet2'
    }
    if (match == 2) {
      var SubSet = 'SubTeamASet3'
    }
  }
  if (team == 1) {
    if (match == 0) {
      var SubSet = 'SubTeamBSet1'
    }
    if (match == 1) {
      var SubSet = 'SubTeamBSet2'
    }
    if (match == 2) {
      var SubSet = 'SubTeamBSet3'
    }
  }
  var SubSetInfo = wx.getStorageSync(SubSet)
  OutPlayer = parseInt(OutPlayer)
  var Score = [team, AMatch, BMatch, AScore, BScore, OutPlayer, InPlayer]
  SubSetInfo.push(Score)
  wx.setStorageSync(SubSet, SubSetInfo)
  if (team == 0) {
    var TeamACurrentSetSub = that.data.TeamACurrentSetSub - 1
    var TeamACourtPlayer = that.data.TeamACourtPlayer
    TeamACourtPlayer[that.data.currentTeamAPosition] = InPlayer
    that.setData({
      [SubSet]: SubSetInfo,
      TeamACurrentSetSub: TeamACurrentSetSub,
      TeamACourtPlayer: TeamACourtPlayer
    })
    wx.setStorageSync('TeamACurrentSetSub', TeamACurrentSetSub)
    wx.setStorageSync('TeamACourtPlayer', TeamACourtPlayer)
  }
  if (team == 1) {
    var TeamBCurrentSetSub = that.data.TeamBCurrentSetSub - 1
    var TeamBCourtPlayer = that.data.TeamBCourtPlayer
    TeamBCourtPlayer[that.data.currentTeamBPosition] = InPlayer
    that.setData({
      [SubSet]: SubSetInfo,
      TeamBCurrentSetSub: TeamBCurrentSetSub,
      TeamBCourtPlayer: TeamBCourtPlayer
    })
    wx.setStorageSync('TeamBCurrentSetSub', TeamBCurrentSetSub)
    wx.setStorageSync('TeamBCourtPlayer', TeamBCourtPlayer)
  }
}

function MergeArrays(Arr1, Arr2) {

  var LeftPlayer_temp = new Array()
  var temp = Arr1.concat(Arr2)
  var LeftPlayer = new Array()
  for (var i = 0; i < temp.length; i++) {
    (temp[i] in LeftPlayer_temp) ? LeftPlayer_temp[temp[i]]++ : LeftPlayer_temp[temp[i]] = 1;
  }
  for (var i = 0; i < LeftPlayer_temp.length; i++) {
    if (LeftPlayer_temp[i] == 1) {
      LeftPlayer.push(i)
    }
  }
  return LeftPlayer
}

function EndMatch() {
  wx.showModal({
    title: '提示',
    content: '比赛结束，点击确认比赛结果',
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        wx.redirectTo({
          url: '../../../EndMatch/EndMatch',
        })
      }
    }
  })
}
