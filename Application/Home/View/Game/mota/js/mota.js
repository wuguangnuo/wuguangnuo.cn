/**
 * jquery插件，动态加载javascript
 * todo 找到更好的可以替代此方法
 */
jQuery.includePlugin = {
  include: function(file) {
    var files = typeof file == "string" ? [file] : file;
    for (var i = 0; i < files.length; i++) {
      var name = files[i].replace(/^\s|\s$/g, "");
      var att = name.split('.');
      var ext = att[att.length - 1].toLowerCase();
      var isCSS = ext == "css";
      var tag = isCSS ? "link" : "script";
      var attr = isCSS ? " type='text/css' rel='stylesheet' " : " language='javascript' type='text/javascript' ";
      var link = (isCSS ? "href" : "src") + "='" + name + "'";
      if ($(tag + "[" + link + "]").length == 0) {
        document.write("<" + tag + attr + link + "></" + tag + ">");
      }
    }
  }
};

//引用使用到的JS文件
$.includePlugin.include(['js/StringBuffer.js','js/commons.js','js/Constants.js',
  'js/Location.js','js/BaseGoods.js','js/GuaiWu.js','js/NPC.js','js/PlayerObj.js','js/Map.js','js/DaMen.js',
  'js/AddPropertyGoods.js','js/BaseViewGoods.js',
  'js/SpeakDialogWin.js','js/FightDialogWin.js','js/ViewGuaiWin.js','js/GouMaiWin.js','js/debug.js']);
//todo*********************************定义常量
//地图格子的宽度与高度
var GRID_WIDTH = 32,GRID_HEIGHT = 32;
var LU_ID = 509;
var IMAGE_PATH = "images/";
//游戏时间10秒钟=现实时间（单位：毫秒）
var YOUXI_SHIJIAN_10_MIAO_ZHENSHI_SHIJIAN = 200;

//todo*********************************全局变量
//定义物品
var goodsArray = new Array();
//定义地图
var maps = new Array();
//定义玩家、当前地图
var player,currentMap;
//定义对话框对象
var speakWin,fightWin,viewGuaiWin,goumaiWin;
//定义增加属性框对象
var addPropertyWin = $('<div/>');

//todo*********************************全局函数
function init() {
  //初始化HTML信息
  initHtmlContent();
  //定义玩家对象
  player = new PlayerObj();
  //初始化物品信息
  initFillGoods(goodsArray);
  //初始化地图
  initMap(maps, goodsArray);
  //初始化对话框
  speakWin = new SpeakDialogWin(player),fightWin = new FightDialogWin(player),
          viewGuaiWin = new ViewGuaiWin(player),goumaiWin = new GouMaiWin(player);
  //初始化当前显示的地图
  currentMap = maps[0];
  currentMap.mapView(player, 0);
  //添加玩家信息、对话框、战斗框、属性框等信息
  $("#gameFrame").append(player.pagePlayer).
          append(speakWin.pageContainer).append(fightWin.pageContainer).
          append(viewGuaiWin.pageContainer).append(goumaiWin.pageContainer).
          css('display', 'block');
  //注册玩家键盘事件
  $(document).bind("keydown", keyDownInDocument);
  //设置调试，默认为false  调试可以吧玩家信息和怪物信息放到内存中，可以调试增加、减少玩家属性和怪物属性来判断打怪难易
  debugMOTA_init();
  debugMOTA(false);
}

function keyDownInDocument() {
  var keyCode = event.keyCode;
  if (player.isMoveing) {  //玩家移动
    if (keyCode == 37) player.moveLeftRight(0, playerCanMove);
    else if (keyCode == 38) player.moveUpDown(0, playerCanMove);
    else if (keyCode == 39) player.moveLeftRight(1, playerCanMove);
    else if (keyCode == 40) player.moveUpDown(1, playerCanMove);
  }

  if (player.isSpeaking) {  //玩家对话
    if (keyCode == 32) {
      if (player.dialogObject.id == 601 || player.dialogObject.id == 602 || player.dialogObject.id == 606) {  //遇见精灵、捷克、公主
        if (player.dialogObject.isSpeakEnd()) {
          //第一段说话结束，需要把NPC的action更新成1
          if (player.dialogObject.action == 0) {
            //更新action前需要判断此段事件的奖励是否已经给予
            player.dialogObject.geiyuJiangLi(player);
            if (player.dialogObject.id == 601) {         //精灵
            } else if (player.dialogObject.id == 602) {  //捷克
              //捷克的奖励是把2层的通道打开
              maps[2].datas[6][1] = goodsArray[LU_ID].clone();
            } else if (player.dialogObject.id == 606) {         //公主
              //公主打开通向19楼的通道
              maps[18].changeMapContent(new Location(10, 10), goodsArray[507].clone());
            }
            player.dialogObject.action = 1;
          } else if (player.dialogObject.action == 1) {
            if (player.goods[player.dialogObject.speakArray[player.dialogObject.action].xuyaowupin] > 0) {
              player.dialogObject.geiyuJiangLi(player);
              player.goods[player.dialogObject.speakArray[player.dialogObject.action].xuyaowupin] --;
              if (player.dialogObject.id == 601) {

              } else if (player.dialogObject.id == 602) {
                //捷克的奖励是把18层公主的通道打开
                maps[18].datas[7][5] = goodsArray[306].clone();
              } else if (player.dialogObject.id == 606) {     //公主
                //游戏结束
                finishDongHua(null);
              }
            }
          }
          speakWin.close();
        } else {
          speakWin.show(player.dialogObject.getSpeakMsg());
        }
      } else if (player.dialogObject.id == 301 || player.dialogObject.id == 302 || player.dialogObject.id == 303 || //钥匙
              	 player.dialogObject.id == 304 || player.dialogObject.id == 305 || player.dialogObject.id == 306 || //大门
             	 player.dialogObject.id == 307 || player.dialogObject.id == 308 || player.dialogObject.id == 312 || //宝石
             	 player.dialogObject.id == 309 || player.dialogObject.id == 310 || player.dialogObject.id == 323 || player.dialogObject.id == 324 || //血瓶、圣水
             	 player.dialogObject.id == 313 || player.dialogObject.id == 315 || player.dialogObject.id == 320 || //武器
             	 player.dialogObject.id == 321 || player.dialogObject.id == 325 || player.dialogObject.id == 326 || //武器
             	 player.dialogObject.id == 314 || player.dialogObject.id == 316 || player.dialogObject.id == 318 || //黄金宝箱、古代金币、圣母十字架
             	 player.dialogObject.id == 319 || player.dialogObject.id == 322 || //幻影靴、锄头
             	 player.dialogObject.id == 311 || player.dialogObject.id == 317 || //怪物查看书、飞行器
             	 player.dialogObject.id == 603 || player.dialogObject.id == 604 ||
             	 player.dialogObject.id == 655 || player.dialogObject.id == 656  //加属性老人
              ) {
                player.updatePageInfo();
        speakWin.close();
      } else if (player.dialogObject.id <= 300) {   //遇见不能打的怪物
        speakWin.close();
      } else if (player.dialogObject.id == 605 || player.dialogObject.id == 650 || player.dialogObject.id == 651 ||
              player.dialogObject.id == 652 || player.dialogObject.id == 653 || player.dialogObject.id == 654) { //购买商店
        player.isGouMai = true;
        speakWin.close();
        player.isMoveing = false;
        return false;
      }
    }
  }

  if (player.isFighting) {  //玩家打仗
    if (keyCode == 32 && $("#fightOK").css('display') == 'block') {
      if (player.dialogObject.id == 32) {
        player.goods["damowang"]++;
      }
      player.updatePageInfo();
      fightWin.close();
    }
  }

  if (player.isGouMai) {
    if (keyCode == 49 || keyCode == 50 || keyCode == 51 || keyCode == 52) {
      var ret;
      if (keyCode == 49) {     //数字键1
        ret = goumaiWin.click1(player.dialogObject.id);
      } else if (keyCode == 50) {   //数字键2
        ret = goumaiWin.click2(player.dialogObject.id);
      } else if (keyCode == 51) {     //数字键3
        ret = goumaiWin.click3(player.dialogObject.id);
      } else if (keyCode == 52) {
        ret = goumaiWin.click4(player.dialogObject.id);
      }
      if (ret.addPropertyFlag) {
        addPlayerProperty(player, speakWin, ret.addPropertyObj, ret.conditionObj);
        player.updatePageInfo();
      } else {
        return false;
      }
    } else if (keyCode == 32) {
      goumaiWin.close();
    }
  }

  if (player.goods['viewGuaiBook'] > 0) {   //查看怪物
    if (!player.isSpeaking && !player.isFighting && !player.isGouMai) {      //l键 look意思
      if (keyCode == 76 && !player.isViewGuai) {
        viewGuaiWin.show(currentMap);
      } else {
        if (player.isViewGuai && (keyCode == 76 || keyCode == 32)) {
          viewGuaiWin.close();
        }
      }
    }
  }
  //玩家有翅膀并且没在说话，没在打仗，没在买东西，没在查看怪物，可以飞行
  if (!player.isSpeaking && !player.isFighting && !player.isGouMai && !player.isViewGuai && player.goods['feixingqi'] > 0) {
    if (keyCode == 87) {       //按W键，向上飞行
      if (player.visitMaxFloor > currentMap.floor) {
        player.isMoveing = false;
        currentMap = maps[currentMap.floor + 1];
        currentMap.mapView(player, 0);
      }
    } else if (keyCode == 83) {  //按S键向下飞行
      if (currentMap.floor > 0) {
        player.isMoveing = false;
        currentMap = maps[currentMap.floor - 1];
        currentMap.mapView(player, 0);
      }
    }
  }
  return true;
}

function playerCanMove(p_location) {
  if (p_location.x < 0 || p_location.x > currentMap.columns || p_location.y < 0 || p_location.y > currentMap.rows) return false;
  var tmpObj = currentMap.getLocationObj(p_location);
  //道路，可以通行
  if (tmpObj.id == LU_ID) {
    return true;
  } else if (tmpObj.id == 510) { //拦路门，遇见即消失
    currentMap.changeMapContent(p_location, goodsArray[LU_ID]);
    return true;
  } else if (tmpObj.id <= 300) {   //怪物
    player.dialogObject = tmpObj;
    //玩家的最大攻击都不能打败敌人的最小攻击，显示无法攻击
    var ret = computeFightLossLife(player.property['gongjiMax'], player.property['fangyu'], player.property['sudu'], tmpObj.property['gongjiMin'], tmpObj.property['fangyu'], tmpObj.property['sudu'], tmpObj.property['shengming']);
    if (ret.life > player.property['shengming']) {
      speakWin.show(getTipWordMsg("你现在还无法与{0}进行抗衡，请抓紧时间修炼！！", [tmpObj.name], "red", "11pt"));
      return false;
    } else {
      fightWin.show(tmpObj);
      currentMap.changeMapContent(p_location, goodsArray[LU_ID]);
      return true;
    }
  } else if (tmpObj.id == 304 || tmpObj.id == 305 || tmpObj.id == 306) {   //开启不同颜色钥匙的门
    player.dialogObject = tmpObj;
    if (addPlayerProperty(player, speakWin, {
      des:tmpObj.successDes,
      property_array:new Array()
    }, {
      property:tmpObj.conditionPropertyName,
      value:1,
      des:tmpObj.failedDes
    })) {
      currentMap.changeMapContent(p_location, goodsArray[LU_ID]);
      return true;
    }
  } else if (tmpObj.id == 301 || tmpObj.id == 302 || tmpObj.id == 303 || //钥匙
          tmpObj.id == 307 || tmpObj.id == 308 || tmpObj.id == 312 || //宝石
          tmpObj.id == 309 || tmpObj.id == 310 || tmpObj.id == 323 || //血瓶
          tmpObj.id == 313 || tmpObj.id == 315 || tmpObj.id == 320 || //武器 
          tmpObj.id == 321 || tmpObj.id == 325 || tmpObj.id == 326 || //武器
          tmpObj.id == 314 || tmpObj.id == 316 || tmpObj.id == 319 || //黄金宝箱、古代金币、幻影靴
          tmpObj.id == 603 || tmpObj.id == 604 || tmpObj.id == 655 || tmpObj.id == 656 //2层老人、15层老人
          ) {
    player.dialogObject = tmpObj;
    if (addPlayerProperty(player, speakWin, {
      des:tmpObj.gainGoodsDes,
      property_array:tmpObj.addPropertyArray
    }, tmpObj.conditionObj)) {
      currentMap.changeMapContent(p_location, goodsArray[LU_ID]);
      return true;
    }
    return false;
  } else if (tmpObj.id == 324) {  //圣水
    player.dialogObject = tmpObj;
    player.property['shengming'] *= 2;
    currentMap.changeMapContent(p_location, goodsArray[LU_ID]);
    speakWin.show(getTipWordMsg(tmpObj.gainGoodsDes, [tmpObj.name], "red", "11pt"));
    return true;
  } else if (tmpObj.id == 311 || tmpObj.id == 317 || tmpObj.id == 318 || tmpObj.id == 322) {//查看怪物之书、飞行器、圣母十字架、锄头
    player.goods[tmpObj.gainGoodsObj.property] ++;
    currentMap.changeMapContent(p_location, goodsArray[LU_ID]);
    player.dialogObject = tmpObj;
    speakWin.show(getTipWordMsg(tmpObj.gainGoodsObj.des, tmpObj.gainGoodsObj.tipDes, "red", "11pt"));
    return true;
  } else if (tmpObj.id == 605 || tmpObj.id == 650 || tmpObj.id == 651 || tmpObj.id == 652 ||
          tmpObj.id == 653 || tmpObj.id == 654) {     //购买对话
    player.dialogObject = tmpObj;
    goumaiWin.show(tmpObj.id);
    return false;
  } else if (tmpObj.id == 601 || tmpObj.id == 602 || tmpObj.id == 606) {  //精灵、捷克、公主
    player.dialogObject = tmpObj;
    if (tmpObj.action == 0) {
      speakWin.show(tmpObj.getSpeakMsg());
      return false;
    } else if (tmpObj.action == 1) {
      if (player.goods[tmpObj.speakArray[tmpObj.action].xuyaowupin] > 0) {
        currentMap.changeMapContent(p_location, goodsArray[LU_ID]);
        tmpObj.visitNum = 1;
        speakWin.show(tmpObj.getSpeakMsg());
        return true;
      } else {
        speakWin.show(tmpObj.getSpeakMsg());
        return false;
      }
    }
  } else if (tmpObj.id == 507 || tmpObj.id == 508) { //上楼、下楼
    player.isMoveing = false;
    var tmpFloor,tmpPlayerPosition;
    if (tmpObj.id == 507) {
      tmpFloor = currentMap.floor + 1;
      tmpPlayerPosition = 0;
      if (currentMap.floor + 1 >= player.visitMaxFloor) {
        player.visitMaxFloor = currentMap.floor + 1;
      }
    } else if (tmpObj.id == 508) {
      tmpFloor = currentMap.floor - 1;
      tmpPlayerPosition = 1;
    }
    currentMap = maps[tmpFloor];
    currentMap.mapView(player, tmpPlayerPosition);
    return false;
  }
  return false;
}

$(document).ready(function() {
  $("#beginGameBtn").click(function(){
    init();
  });
});