Page({
  data: {
    type: 0,
    dotAnData: "",
    dotAnData2: "",
    dotAnData3: "",
    result: "",
    deg: 0,
    drinkdeg: "",
    eatdeg: "",
    start: 0,
    teamB: "正面还是反面",
    drinkwhat: "什么",
    eatwhat: "什么",
    drinklist: ["", "茉莉绿茶", "芒果冰麦", "阿萨姆红茶", "四季春茶", "冻顶乌龙差", "翡翠柠檬", "梅果绿", "蜂蜜绿", "8冰绿", "养乐多绿", "冰淇淋红茶", "波霸红茶", "波霸绿茶", "波霸红", "波霸绿", "珍珠红茶", "珍珠绿茶", "椰果奶茶", "仙草奶茶", "统一补丁奶茶", "红茶玛奇朵", "绿茶玛奇朵", "阿华田", "可可芭蕾", "红茶拿铁", "柠檬汁", "柠檬梅子", "柠檬养乐多", "蜜茶", "8冰茶", "茉莉蜜茶", "炭焙乌龙茶", "玛丽莲冰露", "森林玫果", "冰鲜柠檬水", "蜂蜜柚子茶", "蜜柚红茶", "蓝莓果粒茶", "鲜芦荟晶钻果茶", "蓝莓圣代", "芦荟圣代", "红森林圣代", "巧克力圣代", "草莓圣代", "太妃奥利奥圣代", "铁观音雪顶", "乌龙雪顶", "咖啡雪顶", "茉莉雪顶", "泰国珍西米奶茶", "康师傅矿泉水", "康师傅冰红茶", "水动乐", "脉动", "红牛", "可口可乐", "百事可乐", "雪碧", "甜筒", "啤酒"],
    eatlist: ["", "饺子", "汉堡", "脆皮鸡饭", "烤肉拌饭", "牛蛙煲", "鸡翅煲", "明虾煲", "肉蟹煲", "鸡爪煲", "仔排煲", "水煮肉片", "酸菜鱼", "蜜汁叉烧肉", "黑椒牛柳肉", "可乐鸡翅", "梅菜扣肉", "鱼香肉丝", "咖喱牛肉", "鸡肉卷", "米线", "麻辣烫", "冒菜", "麻辣拌", "披萨", "酸辣土豆丝", "青椒肉片", "辣子鸡丁", "香菇青菜", "蒸蛋", "黄闷鸡米饭", "花甲粉丝", "玉米排骨饭", "海带排骨饭", "沙县蒸饺", "拌面", "炒粉干", "蛋炒饭", "关东煮", "汤圆", "酒酿圆子羹", "黄焖排骨饭", "土豆炖牛腩", "牛肉炒饭", "酸辣鸡杂木桶饭", "麻辣牛肚木桶饭", "香煎鸡胸低卡轻食餐", "嫩烤鸡胸低卡轻食餐", "水煮鸡胸餐", "纸包鸡", "纸包牛肉", "纸包跳跳蛙", "面条", "方便面", "馒头", "生煎", "烤鸭", "无骨鸡柳", "螺蛳粉", "臭豆腐", "棒棒鸡", "糖醋里脊", "手抓饼", "炸鸡", "混沌", "温州瘦肉丸", "缙云烧饼", "薯条", "可乐鸡翅", "烧卖", "包子", "咖喱牛丼", "芝士牛丼", "一条秋刀鱼", "炒拉面", "炒刀削", "麻辣香锅", "麻辣干锅", "啤酒鸭", "台湾卤肉饭", "石锅拌饭", "油条", "炒冷面", "水蒸蛋", "肥牛捞饭", "鸡柳滑蛋铁板饭", "鸡锁骨", "蛋包饭"]
  },
  back: function() {
    wx.navigateBack()
  },
  submit2: function() {
    var t = this;
    if (0 == t.data.start) {
      t.setData({
        teamB: "正面还是反面",
        start: 1
      });
      var a = 0,
        n = setInterval(function() {
          a += 10, t.setData({
            deg: a
          });
        }.bind(t), 15),
        e = Math.random();
      setTimeout(function() {
        clearInterval(n), t.setData({
          deg: 0
        }), e < .5 ? t.setData({
          teamB: "正",
          start: 0
        }) : t.setData({
          teamB: "反",
          start: 0
        });
      }, 3240);
    }
  },
  drink: function() {
    var t = this;
    if (0 == t.data.start) {
      t.setData({
        drinkwhat: "什么",
        start: 1
      });
      var a = 0,
        n = setInterval(function() {
          a += 10, t.setData({
            drinkdeg: a
          });
        }.bind(t), 15),
        e = t.data.drinklist.length,
        i = Math.random() * (e - 0);
      i = 0 + Math.round(i), setTimeout(function() {
        clearInterval(n), t.setData({
          drinkdeg: 0,
          drinkwhat: t.data.drinklist[i] + "吧~",
          start: 0
        });
      }, 3240);
    }
  },
  eat: function() {
    var t = this;
    if (0 == t.data.start) {
      t.setData({
        eatwhat: "什么",
        start: 1
      });
      var a = 0,
        n = setInterval(function() {
          a += 10, t.setData({
            eatdeg: a
          });
        }.bind(t), 15),
        e = t.data.eatlist.length,
        i = Math.random() * (e - 0);
      i = 0 + Math.round(i), setTimeout(function() {
        clearInterval(n), t.setData({
          eatdeg: 0,
          eatwhat: t.data.eatlist[i] + "吧~",
          start: 0
        });
      }, 3240);
    }
  },
  onLoad: function(t) {
    this.setData({
      type: t.type
    })
  },
  onReady: function() {
    this.animation = wx.createAnimation({
      duration: 500,
      timingFunction: "ease-in-out",
      delay: 0,
      transformOrigin: "50% 50% 0"
    });
  },
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {}
});