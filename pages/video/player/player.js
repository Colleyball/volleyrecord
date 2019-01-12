
// pages/video/player.js
var part_urls = {};
var videoPage;
var pageArr = new Array()
import qqVideo from "../../../utils/qqVideo.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    link: '',
    qcode: '',
    imgalist: ['https://volleywang.cn/liansaiquan/images/pay.jpg'],
    player_tip: true,
    input: true,
    qqvideo: 0
  },

  BindInput: function (res) {
    this.setData ({
      input: false
    })
  },
  
  BindCancel: function (res) {
    this.setData ({
      input: true
    })
  },

  back: function (res) {
    wx.switchTab({
      url: '../../video/video',
    })
  },
  BindFav: function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '感谢你的支持，赏赞将用于服务器租用、小程序日常维护成本。',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          wx.previewImage({
            current: 0,
            urls: that.data.imgalist // 需要预览的图片http链接列表  
          })
        }
      }
    })
  },
  BindVideo: function () {
    var that = this
    var link = that.data.link + '.html'
    wx.setClipboardData({
      data: link,
      success: function (res) {
        that.setData({
          player_tip: false
        })
      }
    })
  },

  BindCopyLink: function () {
    var that = this
    var link = 'https://v.qq.com/x/page/' + that.data.link +'.html'
    wx.setClipboardData({
      data: link,
      success: function (res) {
        that.setData({
          player_tip: false
        })
      }
    })
  },

  close: function () {
    this.setData({
      player_tip: true
    })
  },
  


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //var qcode = 'http://b.bshare.cn/barCode?site=weixin&url=' + options.link
    wx.setNavigationBarTitle({
      title: '赛事窗·视频 ' + decodeURIComponent(options.title)
    })
    this.setData({
      title: decodeURIComponent(options.title),
      link: options.link,
      //qcode: qcode
      qqvideo: options.qqvideo,
      group: decodeURIComponent(options.group)
    })

    if (options.qqvideo == 1) {
      if (options.link != undefined) {
        this.setData({
          file_id: options.link
        });
      } else {
        wx.showToast({
          title: '未传入视频id',
        })
      }
      videoPage = 1;
      pageArr = new Array();
      part_urls = {};
      const vid = options.link;
      console.log(vid);
      qqVideo.getVideoes(vid).then(function (response) {

        for (var i = 1; i < response.length + 1; i++) {
          var indexStr = 'index' + (i)
          pageArr.push(i);
          part_urls[indexStr] = response[i - 1];
        }
        that.setData({
          videUrl: response[0],
        });
      });
    }
    
  },
  // 因为视频超过10分钟之后，会分段，所以当视频为多段的时候，
  // 自动播放下一段视频
  playEnd: function () {

    if (videoPage > parseInt(pageArr.length)) {
      // part_urls = {};
      videoPage = 1;
      this.videoContext.exitFullScreen
    } else {
      videoPage++;
      var index = 'index' + videoPage;
      this.setData({
        videUrl: ''
      });
      this.setData({
        videUrl: part_urls[index]
      });

    }
  },
  onReady: function () {
    // 页面渲染完成
    this.videoContext = wx.createVideoContext('myVideo')
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
    var that = this
    if (wx.getStorageSync('userInfo').nickName) {
      return {
        title: '[视频] @所有人，' + wx.getStorageSync('userInfo').nickName + '分享了' + that.data.title,
        desc: '点击进入赛事窗',
        path: 'pages/video/player/player?title=' + that.data.title + '&link=' + that.data.link & 'qqvideo=' + that.data.qqvideo + '&group=' + that.data.group,
      }
    } else {
      return {
        title: '[视频] @所有人，我分享了' + that.data.title,
        desc: '点击进入赛事窗',
        path: 'pages/video/player/player?title=' + that.data.title + '&link=' + that.data.link + '&qqvideo=' + that.data.qqvideo + '&group=' + that.data.group,
      }
    }
  }
})

