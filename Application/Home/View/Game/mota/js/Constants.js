function initHtmlContent() {
  document.body.innerHTML = '<table align="center" height="416" style="background-color:#006400;">' +
          '<tr>' +
          '<td style="width:32px;"></td>' +
          '<td>' +
          '<div style="width:138px;height:352px;background: url(\''+IMAGE_PATH+'509.jpg\') repeat;">' +
          '<ul style="list-style:none;margin-left:16px;margin-top:16px;">' +
          '<li id="dengji" class="playerinfotext">等级：<span></span></li>' +
          '<li id="shengming" class="playerinfotext">生命：<span></span></li>' +
          '<li id="gongji" class="playerinfotext">攻击：<span></span></li>' +
          '<li id="fangyu" class="playerinfotext">防御：<span></span></li>' +
          '<li id="sudu" class="playerinfotext">速度：<span></span></li>' +
          '<li id="jinbi" class="playerinfotext">金币：<span></span></li>' +
          '<li id="jingyan" class="playerinfotext">经验：<span></span></li>' +
          '<li id="shiqi" class="playerinfotext" title="战斗中出现的最大攻击，士气越高，最大攻击次数越多">士气：<span></span></li>' +
          '<li id="xingyun" class="playerinfotext" title="战斗结束后获得的金币与经验，幸运越高，获得最高金币与经验的可能越大">幸运：<span></span></li>' +
          '<li id="fuyuan" class="playerinfotext" title="战斗中出现的特殊攻击，福缘越高，特殊攻击次数越多">福缘：<span></span></li>' +
          '<li id="huangKey" class="playerinfotext"><img src="'+IMAGE_PATH+'301.jpg" alt="黄钥匙" style="width:20px;height:20px;">：<span></span></li>' +
          '<li id="lanKey" class="playerinfotext"><img src="'+IMAGE_PATH+'302.jpg" alt="蓝钥匙" style="width:20px;height:20px;">：<span></span></li>' +
          '<li id="hongKey" class="playerinfotext"><img src="'+IMAGE_PATH+'303.jpg" alt="红钥匙" style="width:20px;height:20px;">：<span></span></li>' +
          '<li id="floor" class="playerinfotext">楼层：<span></span></li>' +
          '</ul>' +
          '</div>' +
          '</td>' +
          '<td style="width:32px;"></td>' +
          '<td>' +
          '<div id="gameFrame">' +
          '</div>' +
          '</td>' +
          '<td style="width:32px;"></td>' +
          '<td id="motaDebugTd" style="display:none">' +
          '</td>' +
          '</tr>' +
          '</table>';
}

function initFillGoods(p_goods_array) {
  //-------物品数组
  //物品 0-300怪物
  p_goods_array[0] = new GuaiWu(0, "小史莱姆",0,[{name:"shengming",value:110},{name:"gongjiMin",value:13},{name:"gongjiMax",value:18},{name:"fangyu",value:2},{name:"sudu",value:100},{name:"jinbiMin",value:2},{name:"jinbiMax",value:5},{name:"jingyanMin",value:2},{name:"jingyanMax",value:4}]);
p_goods_array[1] = new GuaiWu(1, "红史莱姆",1,[{name:"shengming",value:140},{name:"gongjiMin",value:17},{name:"gongjiMax",value:22},{name:"fangyu",value:4},{name:"sudu",value:99},{name:"jinbiMin",value:3},{name:"jinbiMax",value:8},{name:"jingyanMin",value:3},{name:"jingyanMax",value:5}]);
p_goods_array[2] = new GuaiWu(2, "黑史莱姆",2,[{name:"shengming",value:300},{name:"gongjiMin",value:48},{name:"gongjiMax",value:58},{name:"fangyu",value:33},{name:"sudu",value:96},{name:"jinbiMin",value:10},{name:"jinbiMax",value:25},{name:"jingyanMin",value:10},{name:"jingyanMax",value:18}]);
p_goods_array[3] = new GuaiWu(3, "小蝙蝠",3,[{name:"shengming",value:150},{name:"gongjiMin",value:21},{name:"gongjiMax",value:25},{name:"fangyu",value:5},{name:"sudu",value:98},{name:"jinbiMin",value:5},{name:"jinbiMax",value:13},{name:"jingyanMin",value:5},{name:"jingyanMax",value:9}]);
p_goods_array[4] = new GuaiWu(4, "骷髅兵",4,[{name:"shengming",value:183},{name:"gongjiMin",value:25},{name:"gongjiMax",value:30},{name:"fangyu",value:10},{name:"sudu",value:97},{name:"jinbiMin",value:7},{name:"jinbiMax",value:18},{name:"jingyanMin",value:7},{name:"jingyanMax",value:13}]);
p_goods_array[5] = new GuaiWu(5, "骷髅剑士",5,[{name:"shengming",value:330},{name:"gongjiMin",value:68},{name:"gongjiMax",value:80},{name:"fangyu",value:40},{name:"sudu",value:94},{name:"jinbiMin",value:14},{name:"jinbiMax",value:35},{name:"jingyanMin",value:14},{name:"jingyanMax",value:25}]);
p_goods_array[6] = new GuaiWu(6, "初级法师",6,[{name:"shengming",value:200},{name:"gongjiMin",value:80},{name:"gongjiMax",value:150},{name:"fangyu",value:20},{name:"sudu",value:95},{name:"jinbiMin",value:12},{name:"jinbiMax",value:30},{name:"jingyanMin",value:12},{name:"jingyanMax",value:22}]);
p_goods_array[7] = new GuaiWu(7, "兽人",7,[{name:"shengming",value:650},{name:"gongjiMin",value:200},{name:"gongjiMax",value:240},{name:"fangyu",value:140},{name:"sudu",value:91},{name:"jinbiMin",value:20},{name:"jinbiMax",value:50},{name:"jingyanMin",value:20},{name:"jingyanMax",value:36}]);
p_goods_array[8] = new GuaiWu(8, "初级僧侣",8,[{name:"shengming",value:350},{name:"gongjiMin",value:300},{name:"gongjiMax",value:700},{name:"fangyu",value:70},{name:"sudu",value:90},{name:"jinbiMin",value:22},{name:"jinbiMax",value:55},{name:"jingyanMin",value:22},{name:"jingyanMax",value:40}]);
p_goods_array[9] = new GuaiWu(9, "大蝙蝠",9,[{name:"shengming",value:340},{name:"gongjiMin",value:80},{name:"gongjiMax",value:100},{name:"fangyu",value:50},{name:"sudu",value:93},{name:"jinbiMin",value:15},{name:"jinbiMax",value:38},{name:"jingyanMin",value:15},{name:"jingyanMax",value:27}]);
p_goods_array[10] = new GuaiWu(10, "吸血蝙蝠",10,[{name:"shengming",value:900},{name:"gongjiMin",value:480},{name:"gongjiMax",value:630},{name:"fangyu",value:220},{name:"sudu",value:87},{name:"jinbiMin",value:28},{name:"jinbiMax",value:70},{name:"jingyanMin",value:28},{name:"jingyanMax",value:50}]);
p_goods_array[11] = new GuaiWu(11, "骷髅武士",11,[{name:"shengming",value:700},{name:"gongjiMin",value:160},{name:"gongjiMax",value:200},{name:"fangyu",value:120},{name:"sudu",value:92},{name:"jinbiMin",value:17},{name:"jinbiMax",value:43},{name:"jingyanMin",value:17},{name:"jingyanMax",value:31}]);
p_goods_array[12] = new GuaiWu(12, "高级僧侣",12,[{name:"shengming",value:1000},{name:"gongjiMin",value:700},{name:"gongjiMax",value:1100},{name:"fangyu",value:200},{name:"sudu",value:84},{name:"jinbiMin",value:33},{name:"jinbiMax",value:83},{name:"jingyanMin",value:33},{name:"jingyanMax",value:59}]);
p_goods_array[13] = new GuaiWu(13, "石头怪",13,[{name:"shengming",value:1550},{name:"gongjiMin",value:400},{name:"gongjiMax",value:450},{name:"fangyu",value:400},{name:"sudu",value:85},{name:"jinbiMin",value:31},{name:"jinbiMax",value:78},{name:"jingyanMin",value:31},{name:"jingyanMax",value:56}]);
p_goods_array[14] = new GuaiWu(14, "初级卫兵",14,[{name:"shengming",value:750},{name:"gongjiMin",value:300},{name:"gongjiMax",value:400},{name:"fangyu",value:120},{name:"sudu",value:89},{name:"jinbiMin",value:25},{name:"jinbiMax",value:63},{name:"jingyanMin",value:25},{name:"jingyanMax",value:45}]);
p_goods_array[15] = new GuaiWu(15, "骑士卫兵",15,[{name:"shengming",value:1450},{name:"gongjiMin",value:640},{name:"gongjiMax",value:800},{name:"fangyu",value:500},{name:"sudu",value:83},{name:"jinbiMin",value:35},{name:"jinbiMax",value:88},{name:"jingyanMin",value:35},{name:"jingyanMax",value:63}]);
p_goods_array[16] = new GuaiWu(16, "双手剑士",16,[{name:"shengming",value:2650},{name:"gongjiMin",value:1300},{name:"gongjiMax",value:1800},{name:"fangyu",value:1200},{name:"sudu",value:73},{name:"jinbiMin",value:65},{name:"jinbiMax",value:163},{name:"jingyanMin",value:65},{name:"jingyanMax",value:117}]);
p_goods_array[17] = new GuaiWu(17, "中级法师",17,[{name:"shengming",value:800},{name:"gongjiMin",value:500},{name:"gongjiMax",value:900},{name:"fangyu",value:150},{name:"sudu",value:86},{name:"jinbiMin",value:30},{name:"jinbiMax",value:75},{name:"jingyanMin",value:30},{name:"jingyanMax",value:54}]);
p_goods_array[18] = new GuaiWu(18, "大法卫兵",18,[{name:"shengming",value:1400},{name:"gongjiMin",value:600},{name:"gongjiMax",value:900},{name:"fangyu",value:470},{name:"sudu",value:82},{name:"jinbiMin",value:40},{name:"jinbiMax",value:100},{name:"jingyanMin",value:40},{name:"jingyanMax",value:72}]);
p_goods_array[19] = new GuaiWu(19, "狂暴骑士",19,[{name:"shengming",value:2200},{name:"gongjiMin",value:900},{name:"gongjiMax",value:1200},{name:"fangyu",value:700},{name:"sudu",value:79},{name:"jinbiMin",value:50},{name:"jinbiMax",value:125},{name:"jingyanMin",value:50},{name:"jingyanMax",value:90}]);
p_goods_array[20] = new GuaiWu(20, "兽武士",20,[{name:"shengming",value:2100},{name:"gongjiMin",value:800},{name:"gongjiMax",value:1000},{name:"fangyu",value:600},{name:"sudu",value:80},{name:"jinbiMin",value:45},{name:"jinbiMax",value:113},{name:"jingyanMin",value:45},{name:"jingyanMax",value:81}]);
p_goods_array[21] = new GuaiWu(21, "中级卫兵",21,[{name:"shengming",value:2400},{name:"gongjiMin",value:1000},{name:"gongjiMax",value:1300},{name:"fangyu",value:900},{name:"sudu",value:78},{name:"jinbiMin",value:55},{name:"jinbiMax",value:138},{name:"jingyanMin",value:55},{name:"jingyanMax",value:99}]);
p_goods_array[22] = new GuaiWu(22, "高级卫兵",22,[{name:"shengming",value:2600},{name:"gongjiMin",value:1200},{name:"gongjiMax",value:1600},{name:"fangyu",value:1100},{name:"sudu",value:75},{name:"jinbiMin",value:60},{name:"jinbiMax",value:150},{name:"jingyanMin",value:60},{name:"jingyanMax",value:108}]);
p_goods_array[23] = new GuaiWu(23, "骷髅王",23,[{name:"shengming",value:4500},{name:"gongjiMin",value:1800},{name:"gongjiMax",value:2400},{name:"fangyu",value:1600},{name:"sudu",value:69},{name:"jinbiMin",value:80},{name:"jinbiMax",value:200},{name:"jingyanMin",value:80},{name:"jingyanMax",value:144}]);
p_goods_array[24] = new GuaiWu(24, "冥卫兵",24,[{name:"shengming",value:2750},{name:"gongjiMin",value:1500},{name:"gongjiMax",value:2100},{name:"fangyu",value:1500},{name:"sudu",value:72},{name:"jinbiMin",value:70},{name:"jinbiMax",value:175},{name:"jingyanMin",value:70},{name:"jingyanMax",value:126}]);
p_goods_array[25] = new GuaiWu(25, "暗夜骑士",25,[{name:"shengming",value:5800},{name:"gongjiMin",value:2200},{name:"gongjiMax",value:3000},{name:"fangyu",value:1800},{name:"sudu",value:68},{name:"jinbiMin",value:85},{name:"jinbiMax",value:213},{name:"jingyanMin",value:85},{name:"jingyanMax",value:153}]);
p_goods_array[26] = new GuaiWu(26, "元素",26,[{name:"shengming",value:6800},{name:"gongjiMin",value:2400},{name:"gongjiMax",value:3600},{name:"fangyu",value:2100},{name:"sudu",value:65},{name:"jinbiMin",value:90},{name:"jinbiMax",value:225},{name:"jingyanMin",value:90},{name:"jingyanMax",value:162}]);
p_goods_array[27] = new GuaiWu(27, "魔道士",27,[{name:"shengming",value:8500},{name:"gongjiMin",value:2600},{name:"gongjiMax",value:4000},{name:"fangyu",value:2300},{name:"sudu",value:60},{name:"jinbiMin",value:100},{name:"jinbiMax",value:250},{name:"jingyanMin",value:100},{name:"jingyanMax",value:180}]);
p_goods_array[28] = new GuaiWu(28, "小魔王",28,[{name:"shengming",value:20000},{name:"gongjiMin",value:2000},{name:"gongjiMax",value:3000},{name:"fangyu",value:1800},{name:"sudu",value:60},{name:"jinbiMin",value:150},{name:"jinbiMax",value:375},{name:"jingyanMin",value:150},{name:"jingyanMax",value:270}]);
p_goods_array[29] = new GuaiWu(29, "大史莱姆",29,[{name:"shengming",value:850},{name:"gongjiMin",value:330},{name:"gongjiMax",value:400},{name:"fangyu",value:220},{name:"sudu",value:88},{name:"jinbiMin",value:26},{name:"jinbiMax",value:65},{name:"jingyanMin",value:26},{name:"jingyanMax",value:47}]);
p_goods_array[30] = new GuaiWu(30, "究极法师",30,[{name:"shengming",value:30000},{name:"gongjiMin",value:3000},{name:"gongjiMax",value:5000},{name:"fangyu",value:2700},{name:"sudu",value:55},{name:"jinbiMin",value:200},{name:"jinbiMax",value:500},{name:"jingyanMin",value:200},{name:"jingyanMax",value:360}]);
p_goods_array[31] = new GuaiWu(31, "大魔王",31,[{name:"shengming",value:50000},{name:"gongjiMin",value:4000},{name:"gongjiMax",value:6000},{name:"fangyu",value:3800},{name:"sudu",value:50},{name:"jinbiMin",value:300},{name:"jinbiMax",value:750},{name:"jingyanMin",value:300},{name:"jingyanMax",value:540}]);
p_goods_array[32] = new GuaiWu(32, "终极魔王",32,[{name:"shengming",value:120000},{name:"gongjiMin",value:5000},{name:"gongjiMax",value:8000},{name:"fangyu",value:4800},{name:"sudu",value:45},{name:"jinbiMin",value:500},{name:"jinbiMax",value:1250},{name:"jingyanMin",value:500},{name:"jingyanMax",value:900}]);


  //301-500物品
  p_goods_array[301] = new AddPropertyGoods(301, "黄钥匙", 301, [
    {property:'huangyaoshi',min:1,max:1,am:"add",mmin:0}
  ], "你捡起了一把黄钥匙！", null);
  p_goods_array[302] = new AddPropertyGoods(302, "蓝钥匙", 302, [
    {property:'lanyaoshi',min:1,max:1,am:"add",mmin:0}
  ], "你捡起了一把蓝钥匙！", null);
  p_goods_array[303] = new AddPropertyGoods(303, "红钥匙", 303, [
    {property:'hongyaoshi',min:1,max:1,am:"add",mmin:0}
  ], "你捡起了一把红钥匙！", null);
  p_goods_array[304] = new DaMen(304, "黄色大门", 304, "huangyaoshi", "你开启了一座黄色大门！", "你的黄钥匙数量不够了！");
  p_goods_array[305] = new DaMen(305, "蓝色大门", 305, 'lanyaoshi', "你开启了一座蓝色大门！", "你的蓝钥匙数量不够了！");
  p_goods_array[306] = new DaMen(306, "红色大门", 306, 'hongyaoshi', "你开启了一座红色大门！", "你的红钥匙数量不够了！");
  p_goods_array[307] = new AddPropertyGoods(307, "蓝宝石", 307, [
    {property:'gongjiMin',min:3,max:5,am:"add",mmin:0},
    {property:'gongjiMax',min:5,max:8,am:"add",mmin:0}
  ], "你捡到了一颗蓝宝石，增加{0}-{1}点攻击！", null);
  p_goods_array[308] = new AddPropertyGoods(308, "红宝石", 308, [
    {property:'fangyu',min:3,max:5,am:"add",mmin:0}
  ], "你捡到了一颗红宝石，增加{0}点防御！", null);
  p_goods_array[309] = new AddPropertyGoods(309, "蓝血瓶", 309, [
    {property:'shengming',min:500,max:750,am:"add",mmin:0}
  ], "你捡到了一个蓝血瓶，增加{0}点生命！", null);
  p_goods_array[310] = new AddPropertyGoods(310, "红血瓶", 310, [
    {property:'shengming',min:200,max:300,am:"add",mmin:0}
  ], "你捡到了一个红血瓶，增加{0}点生命！", null);
  p_goods_array[311] = new BaseViewGoods(311, "怪物说明书", 311, {
    property:"viewGuaiBook",
    des:"你捡到了一本{0}，按{1}可以查看怪物详细情况！",
    tipDes:["怪物说明书","L键"]
  });
  p_goods_array[312] = new AddPropertyGoods(312, "绿宝石", 312, [
    {property:'sudu',min:1,max:2,am:"minus",mmin:10}
  ], "你捡到了一颗绿宝石，增加{0}点速度！", null);
  p_goods_array[313] = new AddPropertyGoods(313, "碧波相露刀", 313, [
    {property:'gongjiMin',min:10,max:15,am:"add",mmin:0},
    {property:'gongjiMax',min:15,max:24,am:"add",mmin:0}
  ], "你捡到了一柄碧波相露刀，增加{0}-{1}点攻击！", null);
  p_goods_array[314] = new AddPropertyGoods(314, "黄金宝箱", 314, [
    {property:'huangyaoshi',min:1,max:1,am:"add",mmin:0},
    {property:'lanyaoshi',min:1,max:1,am:"add",mmin:0},
    {property:'hongyaoshi',min:1,max:1,am:"add",mmin:0}
  ], "你捡起了一个黄金宝箱，所有钥匙数量增加1！", null);
  p_goods_array[315] = new AddPropertyGoods(315, "铁盾", 315, [
    {property:'fangyu',min:10,max:15,am:"add",mmin:0}
  ], "你捡到了一柄铁盾，增加{0}点防御！", null);
  p_goods_array[316] = new AddPropertyGoods(316, "古代金币", 316, [
    {property:'jinbi',min:400,max:600,am:"add",mmin:0}
  ], "你捡到了一枚古代金币，增加了{0}金币！", null);
  p_goods_array[317] = new BaseViewGoods(317, "飞行器", 317, {
    property:"feixingqi",
    des:"恭喜！你获得了{0}，按{1}向上飞行一层，按{2}向下飞行一层！",
    tipDes:["飞行器","W键","S键"]
  });
  p_goods_array[318] = new BaseViewGoods(318, "圣母十字架", 318, {
    property:"shizijia",
    des:"恭喜！你获得了{0}，用它却解救{1}吧！",
    tipDes:["圣母十字架","精灵"]
  });
  p_goods_array[319] = new AddPropertyGoods(319, "幻影靴", 319, [
    {property:'sudu',min:6,max:9,am:"minus",mmin:10}
  ], "你捡到了一双幻影靴，速度增加{0}点！", null);
  p_goods_array[320] = new AddPropertyGoods(320, "真武剑", 320, [
    {property:'gongjiMin',min:50,max:75,am:"add",mmin:0},
    {property:'gongjiMax',min:75,max:113,am:"add",mmin:0}
  ], "你捡到了一柄真武剑，增加{0}-{1}点攻击！", null);
  p_goods_array[321] = new AddPropertyGoods(321, "骑士盾", 321, [
    {property:'fangyu',min:50,max:75,am:"add",mmin:0}
  ], "你捡到了一柄骑士盾，增加{0}点防御！", null);
  p_goods_array[322] = new BaseViewGoods(322, "锄头", 322, {
    property:"chutou",
    des:"恭喜！你获得了{0}，把它交给{1}吧！",
    tipDes:["锄头","捷克"]
  });
  p_goods_array[323] = new AddPropertyGoods(323, "大血瓶", 323, [
    {property:'shengming',min:3000,max:4500,am:"add",mmin:0}
  ], "你捡到了一个大血瓶，增加{0}点生命！", null);
  p_goods_array[324] = new AddPropertyGoods(324, "圣水", 324, [], "你捡到了一瓶{0}，生命增加一倍！", null);
  p_goods_array[325] = new AddPropertyGoods(325, "圣剑", 325, [
    {property:'gongjiMin',min:400,max:600,am:"add",mmin:0},
    {property:'gongjiMax',min:600,max:900,am:"add",mmin:0}
  ], "你捡到了一柄圣剑，增加{0}-{1}点攻击！", null);
  p_goods_array[326] = new AddPropertyGoods(326, "圣盾", 326, [
    {property:'fangyu',min:400,max:600,am:"add",mmin:0}
  ], "你捡到了一柄圣盾，增加{0}点防御！", null);

  //501-550墙，楼、路等建筑
  p_goods_array[501] = new BaseGoods(501, "普通墙", 501);
  p_goods_array[502] = new BaseGoods(502, "升级墙左", 502);
  p_goods_array[503] = new BaseGoods(503, "升级墙右", 503);
  p_goods_array[504] = new BaseGoods(504, "花色门", 504);
  p_goods_array[505] = new BaseGoods(505, "岩浆墙", 505);
  p_goods_array[506] = new BaseGoods(506, "星星墙", 506);
  p_goods_array[507] = new BaseGoods(507, "上楼楼梯", 507);
  p_goods_array[508] = new BaseGoods(508, "下楼楼梯", 508);
  p_goods_array[509] = new BaseGoods(509, "路", 509);
  p_goods_array[510] = new BaseGoods(510, "栅栏门", 510);
  //601以后NPC
  p_goods_array[601] = new NPC(601, 601, [
    {
      speaking:['精灵：你好！勇士！我是这里的精灵！','你好，精灵！','精灵：你就是被派遣到魔塔里搭救公主的勇士？',
        '精灵：我们的公主被困在魔塔的顶层，那里有个可怕的大魔王看守！',
        '精灵：我现在被大魔王禁锢在这里，如果可以找到”圣母十字架“，我就可离开这里并把我的传功给你？',
        "精灵：我现在有黄、蓝、红三把钥匙，我把钥匙送给你！",'精灵：加油勇士，一定要救出公主！'],
      jiangli:[
        {property:'huangyaoshi',min:1,max:1,am:"add",mmin:0},
        {property:'lanyaoshi',min:1,max:1,am:"add",mmin:0},
        {property:'hongyaoshi',min:1,max:1,am:"add",mmin:0},
        {property:'shiqi',min:1,max:5,am:"add",mmin:0},
        {property:'xingyun',min:1,max:5,am:"add",mmin:0},
        {property:'fuyuan',min:1,max:5,am:"add",mmin:0}
      ],
      geiyu:false,
      xuyaowupin:""
    },
    {
      speaking:["精灵：很好，你找到了”圣母十字架“，我从新重新获得自由！","精灵：为了答谢你，我把我毕生的功力传给你！",
        "只见精灵灵光闪动，把她的毕生的功力传给你，最后他对你说了一句话：”一定要救出公主，杀死大魔王！！“"],
      jiangli:[
        {property:"shengming",min:2000,max:3000,am:"add",mmin:0},
        {property:'gongjiMin',min:150,max:225,am:"add",mmin:0},
        {property:'gongjiMax',min:225,max:338,am:"add",mmin:0},
        {property:'fangyu',min:188,max:182,am:"add",mmin:0},
        {property:'sudu',min:5,max:10,am:"minus",mmin:10},
        {property:'shiqi',min:1,max:5,am:"add",mmin:0},
        {property:'xingyun',min:1,max:5,am:"add",mmin:0},
        {property:'fuyuan',min:1,max:5,am:"add",mmin:0}
      ],
      geiyu:false,
      xuyaowupin:"shizijia"
    }
  ]);
  p_goods_array[602] = new NPC(602, 602, [
    {
      speaking:["捷克：你好，我是捷克！","你好，捷克！","捷克：感谢你救了我！为了答谢你，我将为你打开第2层的机关门！",
        "捷克：对了，我知道他们把公主关在哪里！","捷克：我需要一柄锄头，帮你打开关公主的墙壁！",
        "捷克：如果你找到锄头，还可以来这里找我，我将为你打开墙壁！","捷克：祝你好运！"],
      jiangli:[
        {property:'shiqi',min:1,max:5,am:"add",mmin:0},
        {property:'xingyun',min:1,max:5,am:"add",mmin:0},
        {property:'fuyuan',min:1,max:5,am:"add",mmin:0}
      ],
      geiyu:false,
      xuyaowupin:""
    },
    {
      speaking:["捷克：很好，你找到了锄头！","捷克：我将帮你打开关公主的墙壁！",
        "捷克：再见！"],
      jiangli:[
        {property:'shiqi',min:1,max:5,am:"add",mmin:0},
        {property:'xingyun',min:1,max:5,am:"add",mmin:0},
        {property:'fuyuan',min:1,max:5,am:"add",mmin:0}
      ],
      geiyu:false,
      xuyaowupin:"chutou"
    }

  ]);
  p_goods_array[603] = new AddPropertyGoods(603, "老人蓝2层", 603, [
    {property:'gongjiMin',min:80,max:120,am:"add",mmin:0},
    {property:'gongjiMax',min:120,max:180,am:"add",mmin:0},
    {property:'shiqi',min:1,max:5,am:"add",mmin:0},
    {property:'xingyun',min:1,max:5,am:"add",mmin:0},
    {property:'fuyuan',min:1,max:5,am:"add",mmin:0}
  ], "老人：谢谢你救了我！作为答谢我送你一只大剑，可增加{0}-{1}点攻击力！", null);
  p_goods_array[604] = new AddPropertyGoods(604, "老人红2层", 604, [
    {property:'fangyu',min:80,max:120,am:"add",mmin:0},
    {property:'shiqi',min:1,max:5,am:"add",mmin:0},
    {property:'xingyun',min:1,max:5,am:"add",mmin:0},
    {property:'fuyuan',min:1,max:5,am:"add",mmin:0}
  ], "老人：谢谢你救了我！作为答谢我送你一只铁盾，可增加{0}点防御力！", null);
  p_goods_array[605] = new BaseGoods(605, "升级墙3层", 605);
  p_goods_array[606] = new NPC(606, 606, [
    {
      speaking:['公主：你好！勇士！你是来救我的吗！','你好，公主！，我就是来就您的，我是您的勇士！',
        '公主：大魔王就在上面，我被他施法禁锢在这里，无法移动！',
        '公主：勇士，你一定要杀死大魔王，我们才能离开这里！',
        '公主给了你一个深情的吻，你的所有属性全部增加！！','公主：一定要杀死大魔王！'],
      jiangli:[
        {property:"shengming",min:5000,max:7500,am:"add",mmin:0},
        {property:'gongjiMin',min:200,max:350,am:"add",mmin:0},
        {property:'gongjiMax',min:350,max:525,am:"add",mmin:0},
        {property:'fangyu',min:200,max:350,am:"add",mmin:0},
        {property:'sudu',min:8,max:16,am:"minus",mmin:10},
        {property:'huangyaoshi',min:1,max:10,am:"add",mmin:0},
        {property:'lanyaoshi',min:1,max:10,am:"add",mmin:0},
        {property:'hongyaoshi',min:1,max:10,am:"add",mmin:0},
        {property:'shiqi',min:10,max:25,am:"add",mmin:0},
        {property:'xingyun',min:10,max:25,am:"add",mmin:0},
        {property:'fuyuan',min:10,max:25,am:"add",mmin:0}
      ],
      geiyu:false,
      xuyaowupin:""
    },
    {
      speaking:["公主：太好了勇士，你终于杀死了大魔王！！“"],
      jiangli:[],
      geiyu:false,
      xuyaowupin:"damowang"
    }
  ]);
  p_goods_array[650] = new BaseGoods(650, "老人蓝5层经验商店", 603);
  p_goods_array[651] = new BaseGoods(651, "老人红5层买钥匙商店", 604);
  p_goods_array[652] = new BaseGoods(652, "升级墙11层", 605);
  p_goods_array[653] = new BaseGoods(653, "老人红12层收购钥匙商店", 604);
  p_goods_array[654] = new BaseGoods(654, "老人蓝13层高级经验商店", 603);
  p_goods_array[655] = new AddPropertyGoods(655, "老人红15层增加攻击老人", 604, [
    {property:'gongjiMin',min:200,max:300,am:"add",mmin:0},
    {property:'gongjiMax',min:300,max:450,am:"add",mmin:0},
    {property:'shiqi',min:1,max:5,am:"add",mmin:0},
    {property:'xingyun',min:1,max:5,am:"add",mmin:0},
    {property:'fuyuan',min:1,max:5,am:"add",mmin:0}
  ], "我将提升你{0}-{1}点攻击并扣除你1200金币！",
  {
    property:"jinbi",
    value:1200,
    des:"等你有了1200金币在来找我！"
  });

  p_goods_array[656] = new AddPropertyGoods(656, "老人蓝15层增加防御老人", 603, [
    {property:'fangyu',min:200,max:300,am:"add",mmin:0},
    {property:'shiqi',min:1,max:5,am:"add",mmin:0},
    {property:'xingyun',min:1,max:5,am:"add",mmin:0},
    {property:'fuyuan',min:1,max:5,am:"add",mmin:0}
  ], "我将提升你{0}点防御并扣除你800经验！",
  {
    property:"jingyan",
    value:800,
    des:"等你有了800经验在来找我！"
  });
}

function initMap(p_map_array, p_goods_array) {
  p_map_array[0] = new Map(0, [
    [501,506,506,506,506,507,506,506,506,506,501],
    [501,506,506,506,506,509,506,506,506,506,501],
    [501,506,506,506,506,509,506,506,506,506,501],
    [501,506,506,506,506,509,506,506,506,506,501],
    [501,506,506,506,506,509,506,506,506,506,501],
    [501,506,506,506,506,509,506,506,506,506,501],
    [501,501,506,506,506,509,506,506,506,501,501],
    [501,501,501,501,501,304,501,501,501,501,501],
    [505,501,505,501,601,509,312,501,505,501,505],
    [505,505,505,505,505,509,505,505,505,505,505],
    [505,505,505,505,505,509,505,505,505,505,505]
  ], new Location(5, 10), new Location(5, 1), p_goods_array);
  p_map_array[1] = new Map(1, [
    [507,509,301,0  ,1  ,0  ,509,509,509,509,509],
    [501,501,501,501,501,501,501,501,501,501,509],
    [310,509,4  ,304,509,501,310,301,310,501,509],
    [310,4  ,308,501,509,501,310,301,310,501,509],
    [501,304,501,501,509,501,501,501,2  ,501,509],
    [301,5  ,307,501,509,304,6  ,0  ,3  ,501,509],
    [309,312,302,501,509,501,501,501,501,501,509],
    [501,304,501,501,509,509,509,509,509,509,509],
    [311,5  ,307,501,501,306,501,501,501,304,501],
    [310,309,301,501,303,509,509,501,301,7  ,302],
    [310,308,301,501,509,508,509,501,301,301,301]
  ], new Location(5, 9), new Location(1, 0), p_goods_array);
  p_map_array[2] = new Map(2, [
    [508,501,509,19 ,509,501,308,307,301,303,501],
    [509,501,307,501,309,501,308,307,301,302,501],
    [509,501,301,501,301,501,308,307,301,15 ,501],
    [509,501,301,501,301,501,501,501,501,304,501],
    [509,501,509,501,509,509,509,304,509,509,501],
    [509,501,304,501,501,304,501,501,304,501,501],
    [509,504,509,509,509,509,501,509,15 ,509,501],
    [509,501,304,501,501,305,501,510,501,510,501],
    [509,501,301,501,309,310,501,312,501,312,501],
    [509,501,301,501,309,310,501,509,501,509,501],
    [507,501,308,501,309,310,501,603,501,604,501]
  ], new Location(0, 1), new Location(0, 9), p_goods_array);
  p_map_array[3] = new Map(3, [
    [313,1  ,301,501,502,605,503,501,501,501,501],
    [1  ,301,312,501,509,509,509,501,509,3  ,509],
    [301,4  ,509,501,501,304,501,501,509,501,509],
    [501,304,501,501,509,4  ,509,501,301,501,1  ],
    [509,509,509,501,501,501,509,501,301,501,3  ],
    [0  ,501,509,3  ,1  ,3  ,509,501,301,501,1  ],
    [0  ,501,501,501,501,501,509,509,509,501,509],
    [509,509,509,509,509,501,501,304,501,501,509],
    [501,501,501,501,3  ,501,1  ,509,0  ,501,509],
    [501,509,509,509,509,501,307,3  ,301,501,509],
    [508,509,501,501,501,501,308,309,301,501,507]
  ], new Location(1, 10), new Location(10, 9), p_goods_array);
  p_map_array[4] = new Map(4, [
    [509,2  ,509,501,509,602,509,501,509,2  ,509],
    [304,501,304,501,509,312,509,501,304,501,304],
    [509,501,509,501,501,510,501,501,509,501,509],
    [509,501,4  ,501,9  ,10 ,9  ,501,4  ,501,509],
    [3  ,501,310,501,307,9  ,308,501,310,501,3  ],
    [3  ,501,310,501,501,306,501,501,310,501,3  ],
    [1  ,501,509,501,7  ,14 ,7  ,501,509,501,1  ],
    [509,501,509,501,307,7  ,308,501,509,501,509],
    [509,501,509,501,501,305,501,501,509,501,509],
    [509,501,509,501,301,509,301,501,509,501,509],
    [507,501,509,2  ,509,509,509,2  ,509,501,508]
  ], new Location(10, 9), new Location(0, 9), p_goods_array);
  p_map_array[5] = new Map(5, [
    [314,501,310,501,309,6  ,509,509,6  ,301,302],
    [509,501,307,501,6  ,509,509,509,6  ,312,301],
    [9  ,501,509,501,5  ,509,501,501,304,501,501],
    [509,304,6  ,501,315,5  ,501,509,7  ,5  ,651],
    [9  ,501,509,501,501,501,501,509,509,509,5  ],
    [308,501,509,509,509,3  ,4  ,509,509,509,509],
    [307,501,501,2  ,501,501,501,501,509,509,509],
    [312,650,501,2  ,501,509,509,509,7  ,14 ,7  ],
    [501,501,501,3  ,501,304,501,305,501,304,501],
    [509,509,501,509,501,3  ,501,308,304,509,501],
    [508,509,3  ,509,509,509,501,301,501,507,501]
  ], new Location(0, 9), new Location(9, 9), p_goods_array);
  p_map_array[6] = new Map(6, [
    [317,11 ,501,307,501,301,29 ,316,501,309,309],
    [11 ,312,501,308,501,509,301,29 ,501,13 ,309],
    [301,10 ,305,509,305,10 ,509,301,501,312,13 ],
    [509,509,501,14 ,501,509,509,509,501,20 ,509],
    [501,501,501,306,501,501,501,501,501,304,501],
    [509,509,17 ,509,301,301,301,509,17 ,509,509],
    [509,501,501,501,501,501,501,501,501,501,501],
    [509,501,9  ,304,9  ,509,509,509,509,509,501],
    [509,501,304,501,304,501,501,501,501,305,501],
    [509,501,9  ,501,509,509,501,501,509,509,501],
    [509,509,509,501,507,509,304,304,509,508,501]
  ], new Location(8, 10), new Location(4, 9), p_goods_array);
  p_map_array[7] = new Map(7, [
    [507,509,509,509,509,509,509,509,501,501,501],
    [501,501,509,10 ,501,305,501,11 ,312,501,501],
    [501,509,10 ,307,501,18 ,501,308,11 ,11 ,501],
    [509,509,501,501,501,510,501,501,501,11 ,509],
    [509,509,305,18 ,510,318,510,18 ,305,11 ,509],
    [509,501,501,501,501,510,501,501,501,501,509],
    [509,501,307,307,501,18 ,501,308,308,501,509],
    [509,501,310,310,307,312,308,309,309,501,509],
    [509,501,501,301,301,303,302,302,501,501,509],
    [509,509,501,501,501,306,501,501,501,509,509],
    [501,509,509,304,508,509,509,304,509,509,501]
  ], new Location(5, 10), new Location(1, 0), p_goods_array);
  p_map_array[8] = new Map(8, [
    [508,501,11 ,509,509,509,501,11 ,301,11 ,11 ],
    [509,501,11 ,501,501,304,501,304,501,501,509],
    [509,501,509,501,29 ,29 ,305,509,29 ,501,308],
    [11 ,501,509,501,8  ,501,501,501,9  ,501,2  ],
    [9  ,501,11 ,501,310,501,507,509,509,501,2  ],
    [10 ,501,307,501,310,501,501,501,501,501,509],
    [9  ,501,2  ,501,509,509,509,501,509,10 ,509],
    [509,501,2  ,501,501,501,14 ,501,304,501,501],
    [509,501,312,11 ,509,501,11 ,501,509,509,509],
    [509,501,501,501,304,501,509,501,501,501,509],
    [509,509,8  ,509,509,501,509,29 ,18 ,29 ,312]
  ], new Location(0, 1), new Location(7, 4), p_goods_array);
  p_map_array[9] = new Map(9, [
    [319,22 ,301,501,501,501,509,509,509,501,312],
    [22 ,301,20 ,304,509,11 ,11 ,501,509,304,11 ],
    [501,304,501,501,11 ,501,501,501,509,501,301],
    [509,509,509,501,11 ,501,509,509,14 ,501,301],
    [509,509,509,306,29 ,501,508,501,509,501,310],
    [501,305,501,501,29 ,501,501,501,14 ,501,501],
    [307,12 ,308,501,8  ,501,507,501,509,501,310],
    [501,304,501,501,509,509,509,304,29 ,501,301],
    [11 ,310,11 ,501,501,305,501,501,509,501,301],
    [302,11 ,310,501,13 ,8  ,13 ,501,509,304,11 ],
    [320,302,11 ,304,309,13 ,309,501,509,501,312]
  ], new Location(6, 3), new Location(6, 7), p_goods_array);
  p_map_array[10] = new Map(10, [
    [509,501,501,307,20 ,501,20 ,308,501,501,312],
    [509,509,501,501,304,501,304,501,501,509,13 ],
    [509,509,509,509,509,501,509,509,509,13 ,309],
    [14 ,501,509,501,501,501,501,501,509,501,501],
    [14 ,501,509,509,301,301,29 ,29 ,509,501,301],
    [10 ,501,509,501,501,501,501,304,501,501,301],
    [9  ,501,509,509,509,508,501,509,304,10 ,509],
    [509,501,501,501,501,501,501,304,501,501,509],
    [509,501,310,307,308,501,312,10 ,312,501,301],
    [509,501,310,307,308,306,8  ,501,8  ,501,301],
    [507,501,310,307,308,501,302,501,302,501,310]
  ], new Location(4, 6), new Location(0, 9), p_goods_array);
  p_map_array[11] = new Map(11, [
    [310,501,301,501,302,501,303,501,309,321,309],
    [310,501,301,501,302,501,303,501,14 ,14 ,14 ],
    [310,501,301,501,302,501,303,501,312,14 ,312],
    [304,501,304,501,304,501,304,501,501,305,501],
    [21 ,312,21 ,312,21 ,501,21 ,509,509,21 ,509],
    [304,501,501,305,501,501,501,305,501,501,304],
    [307,501,312,21 ,309,16 ,309,21 ,509,501,308],
    [307,501,20 ,501,501,501,501,501,20 ,501,308],
    [307,501,20 ,501,502,652,503,501,20 ,501,308],
    [501,501,306,501,310,29 ,310,501,306,501,501],
    [508,509,509,509,509,509,509,509,509,509,507]
  ], new Location(1, 10), new Location(9, 10), p_goods_array);
  p_map_array[12] = new Map(12, [
    [653,307,501,509,15 ,19 ,15 ,509,501,309,322],
    [308,312,501,509,501,304,501,509,501,312,309],
    [509,509,501,509,501,19 ,501,509,501,509,509],
    [509,16 ,501,509,501,301,501,509,501,25 ,509],
    [16 ,24 ,501,509,501,301,501,509,501,27 ,25 ],
    [501,305,501,509,501,310,501,509,501,305,501],
    [509,509,509,509,501,312,501,509,509,509,509],
    [501,501,501,509,501,501,501,509,501,501,501],
    [307,16 ,304,21 ,21 ,22 ,21 ,21 ,304,16 ,308],
    [501,501,501,501,501,305,501,501,501,501,501],
    [507,509,509,509,509,509,509,509,509,509,508]
  ], new Location(9, 10), new Location(1, 10), p_goods_array);
  p_map_array[13] = new Map(13, [
    [509,16 ,509,509,509,509,509,501,509,24 ,509],
    [509,501,501,501,501,501,304,501,509,501,509],
    [509,501,509,509,21 ,509,509,501,509,501,509],
    [309,501,306,501,501,501,509,501,509,501,509],
    [15 ,501,509,509,24 ,501,21 ,501,308,501,509],
    [19 ,501,509,23 ,510,501,22 ,501,308,501,509],
    [15 ,501,24 ,510,654,501,21 ,501,308,501,307],
    [509,501,501,501,501,501,509,501,509,501,307],
    [509,15 ,509,501,509,509,509,24 ,509,501,307],
    [501,501,509,501,309,501,501,501,501,501,312],
    [508,509,509,305,509,507,501,323,23 ,304,312]
  ], new Location(1, 10), new Location(4, 10), p_goods_array);
  p_map_array[14] = new Map(14, [
    [501,509,25 ,314,507,312,509,509,509,509,501],
    [501,509,309,501,501,501,501,501,309,509,501],
    [501,509,501,501,501,501,501,501,501,509,501],
    [501,509,501,501,501,324,501,501,501,509,501],
    [501,509,501,501,501,510,501,501,501,509,501],
    [501,509,310,501,501,24 ,501,501,310,509,501],
    [501,509,506,506,501,23 ,501,506,506,509,501],
    [501,509,506,506,501,24 ,501,506,506,509,501],
    [501,509,506,506,501,305,501,506,506,509,501],
    [501,21 ,22 ,21 ,305,509,305,21 ,22 ,21 ,501],
    [501,501,501,501,501,508,501,501,501,501,501]
  ], new Location(5, 9), new Location(5, 0), p_goods_array);
  p_map_array[15] = new Map(15, [
    [509,509,509,509,508,506,507,509,509,509,509],
    [509,506,506,506,506,506,506,506,506,506,509],
    [509,506,506,501,501,501,501,501,506,506,509],
    [509,506,501,501,656,501,655,501,501,506,509],
    [509,506,501,501,307,501,307,501,501,506,509],
    [509,506,501,501,308,501,308,501,501,506,509],
    [509,506,506,501,312,501,312,501,506,506,509],
    [509,506,506,501,304,501,304,501,506,506,509],
    [509,506,506,506,509,509,509,506,506,506,509],
    [509,506,506,506,506,306,506,506,506,506,509],
    [509,509,509,509,509,509,509,509,509,509,509]
  ], new Location(3, 0), new Location(7, 0), p_goods_array);
  p_map_array[16] = new Map(16, [
    [506,506,506,506,506,509,508,506,506,506,506],
    [506,506,506,506,506,509,506,506,506,506,506],
    [506,506,506,506,506,509,506,506,506,506,506],
    [506,506,506,506,501,306,501,506,506,506,506],
    [506,506,506,501,501,28 ,501,501,506,506,506],
    [506,506,506,501,501,312,501,501,506,506,506],
    [506,506,506,501,501,312,501,501,506,506,506],
    [506,506,506,501,501,507,501,501,506,506,506],
    [506,506,506,506,501,501,501,506,506,506,506],
    [506,506,506,506,506,506,506,506,506,506,506],
    [506,506,506,506,506,506,506,506,506,506,506]
  ], new Location(5, 0), new Location(5, 6), p_goods_array);
  p_map_array[17] = new Map(17, [
    [506,25 ,23 ,509,509,509,509,312,509,509,25 ],
    [506,23 ,506,506,506,506,506,506,506,506,509],
    [506,509,506,25 ,509,509,312,509,509,509,25 ],
    [506,509,506,509,506,506,506,506,506,506,506],
    [506,312,506,509,506,25 ,509,509,509,25 ,506],
    [506,509,506,25 ,509,509,506,506,506,509,506],
    [506,509,506,506,506,506,506,25 ,509,25 ,506],
    [506,23 ,506,506,506,508,506,509,506,506,506],
    [506,25 ,23 ,509,26 ,509,506,25 ,509,509,25 ],
    [506,506,506,506,506,506,506,506,506,506,509],
    [507,312,26 ,509,509,509,509,509,509,509,25 ]
  ], new Location(5, 8), new Location(1, 10), p_goods_array);
  p_map_array[18] = new Map(18, [
    [506,506,506,506,506,506,506,506,506,506,506],
    [506,506,506,506,506,506,506,506,506,506,506],
    [506,506,506,506,506,506,506,506,506,506,506],
    [506,506,506,506,501,501,501,506,506,506,506],
    [506,506,506,501,501,606,501,501,506,506,506],
    [506,506,506,501,501,510,501,501,506,506,506],
    [506,506,506,501,501,306,501,501,506,506,506],
    [506,506,506,506,501,501,501,506,506,506,506],
    [506,506,506,506,506,509,506,506,506,506,506],
    [506,506,506,506,506,509,506,506,506,506,506],
    [508,509,509,509,509,509,509,509,509,509,509]
  ], new Location(1, 10), new Location(9, 10), p_goods_array);
  p_map_array[19] = new Map(19, [
    [509,509,509,509,509,509,509,509,509,509,509],
    [509,506,509,506,506,506,506,506,509,506,509],
    [509,506,509,506,506,506,506,506,509,506,509],
    [509,506,509,506,506,507,506,506,509,506,509],
    [509,506,30 ,506,506,312,506,506,30 ,506,509],
    [509,506,510,506,506,31 ,506,506,510,506,509],
    [509,506,312,506,506,509,506,506,312,506,509],
    [509,506,325,506,506,509,506,506,326,506,509],
    [509,506,506,506,506,509,506,506,506,506,509],
    [509,506,506,506,506,509,506,506,506,506,509],
    [509,509,509,509,509,509,509,509,509,509,508]
  ], new Location(9, 10), new Location(5, 4), p_goods_array);
  p_map_array[20] = new Map(20, [
    [26 ,308,18 ,310,23 ,303,23 ,310,18 ,308,26 ],
    [309,506,301,506,302,506,302,506,301,506,309],
    [506,307,18 ,509,25 ,509,25 ,509,18 ,307,506],
    [310,506,301,506,509,508,509,506,301,506,310],
    [23 ,302,25 ,509,509,509,509,509,25 ,302,23 ],
    [303,506,509,506,509,506,509,506,509,506,303],
    [23 ,302,25 ,509,509,509,509,509,25 ,302,23 ],
    [310,506,301,506,509,507,509,506,301,506,310],
    [506,307,18 ,509,25 ,509,25 ,509,18 ,307,506],
    [309,506,301,506,302,506,302,506,301,506,309],
    [26 ,308,18 ,310,23 ,303,23 ,310,18 ,308,26 ]
  ], new Location(5, 4), new Location(5, 6), p_goods_array);
  p_map_array[21] = new Map(21, [
    [506,506,506,506,506,506,506,506,506,506,506],
    [506,506,509,509,506,32 ,506,509,509,506,506],
    [506,509,509,506,506,27 ,506,506,509,509,506],
    [506,509,509,509,506,27 ,506,509,509,509,506],
    [506,506,509,509,509,324,509,509,509,506,506],
    [506,506,509,509,509,509,509,509,509,506,506],
    [506,506,506,509,509,506,509,509,506,506,506],
    [506,506,506,506,509,508,509,506,506,506,506],
    [506,506,506,506,506,506,506,506,506,506,506],
    [506,506,506,506,506,506,506,506,506,506,506],
    [506,506,506,506,506,506,506,506,506,506,506]
  ], new Location(5, 5), new Location(4, 7), p_goods_array);
  p_map_array[22] = new Map(22, [
    [509,509,0  ,1  ,2  ,3  ,4  ,5  ,6  ,7  ,509],
    [509,509,509,509,509,509,509,509,509,509,509],
    [509,509,8  ,9  ,10 ,11 ,12 ,13 ,14 ,15 ,509],
    [509,509,509,509,509,509,509,509,509,509,509],
    [509,509,16 ,17 ,18 ,19 ,20 ,21 ,22 ,23 ,509],
    [509,509,509,509,509,509,509,509,509,509,509],
    [509,509,24 ,25 ,26 ,27 ,28 ,29 ,30 ,31 ,509],
    [509,509,509,509,509,509,509,509,509,509,509],
    [509,509,32 ,509,509,509,509,509,509,509,509],
    [509,509,509,509,509,509,509,509,509,509,509],
    [509,509,509,509,509,509,509,509,509,509,509]
  ], new Location(0, 0), new Location(10, 10), p_goods_array);
}
