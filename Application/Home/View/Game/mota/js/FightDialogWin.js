/**
 * 战斗框
 * @param p_player 玩家对象
 */
function FightDialogWin(p_player) {
  this.player = p_player;
  this.pageContainer = $('<div/>');
  var fightLeftDiv = $('<div class="duizhanInfoWin"></div>');
  fightLeftDiv.append($('<img id="fightImage" src="' + IMAGE_PATH + 'player_2.jpg" style="margin-top:10px;"/>')).
          append('<div id="fightTimer" class="fightTimer"/>');
  $('<ul style="list-style:none;margin-left:4px;text-align:left;"/>').
          append($('<li>生命：<span id="fightShengming"></span></li>')).
          append($('<li>攻击：<span id="fightGongji"></span></li>')).
          append($('<li>防御：<span id="fightFangyu"></span></li>')).
          append($('<li>速度：<span id="fightSudu"></span></li>')).
          appendTo(fightLeftDiv);
  var fightMiddleDiv = $('<div id="fightingWindow" class="duizhanContentWin" ></div>');
  var fightRightDiv = $('<div class="duizhanInfoWin"></div>');
  fightRightDiv.append($('<img id="fightGImage" style="margin-top:10px;"/>')).
          append('<div class="closeFightInfo" id="fightOK">【按空格继续】</div>');
  $('<ul style="list-style:none;margin-left:4px;text-align:left;"/>').
          append($('<li>生命：<span id="fightGShengming"></span></li>')).
          append($('<li>攻击：<span id="fightGGongji"></span></li>')).
          append($('<li>防御：<span id="fightGFangyu"></span></li>')).
          append($('<li>速度：<span id="fightGSudu"></span></li>')).
          appendTo(fightRightDiv);
  this.pageContainer.append(fightLeftDiv).append(fightMiddleDiv).append(fightRightDiv).
          addClass('fightWinCss').css('display', 'none');
}

/**
 * 显示战斗窗口
 * @param p_guaiwu 怪物对象
 */
FightDialogWin.prototype.show = function(p_guaiwu) {
  this.player.isFighting = true;
  this.player.isMoveing = false;
  //设置战斗结束不显示
  $("#fightOK").css("display", "none");
  //设置玩家信息
  $('#fightShengming', this.pageContainer).text(this.player.property['shengming']);
  $('#fightGongji', this.pageContainer).text(this.player.property['gongjiMin'] + " - " + this.player.property['gongjiMax']);
  $('#fightFangyu', this.pageContainer).text(this.player.property['fangyu']);
  $('#fightSudu', this.pageContainer).text(this.player.property['sudu']);
  //设置怪物信息
  $('#fightGImage', this.pageContainer).attr('src', p_guaiwu.image);
  $('#fightGShengming', this.pageContainer).text(p_guaiwu.property['shengming']);
  $('#fightGGongji', this.pageContainer).text(p_guaiwu.property['gongjiMin'] + " - " + p_guaiwu.property['gongjiMax']);
  $('#fightGFangyu', this.pageContainer).text(p_guaiwu.property['fangyu']);
  $('#fightGSudu', this.pageContainer).text(p_guaiwu.property['sudu']);
  //计算打仗过程
  var pSM = this.player.property['shengming'],gSM = p_guaiwu.property['shengming'];
  var shijianmiao = 1;
  var gongjizhi,tmpSuiji,dspFlag,str = new StringBuffer();
  str.append("<br><div class='fightLineStyle' id='fightBeginDiv' miaotype='0'>你对着<span class='fightGuaiDsp'>" + p_guaiwu.name + "</span>说去死吧！</div><br><br>");
  var huiheshuNum = 0;
  while (true) {
    if (shijianmiao % this.player.property['sudu'] == 0) {
      tmpSuiji = getRandomInt(0, 150);
      if (tmpSuiji <= 10 + this.player.property['shiqi']) {
        dspFlag = true;
        gongjizhi = this.player.property['gongjiMax'] - p_guaiwu.property['fangyu'];
      } else {
        dspFlag = false;
        gongjizhi = getRandomInt(this.player.property['gongjiMin'], this.player.property['gongjiMax']) - p_guaiwu.property['fangyu'];
      }
      if (gongjizhi <= 1)gongjizhi = 1;
      str.append("<div class='fightLineStyle' id='playPKguai" + shijianmiao + "' miaotype='" + shijianmiao + "'>第" + shijianmiao + "秒&nbsp;你打了<span class='fightGuaiDsp'>" + p_guaiwu.name + "</span>一下，");
      if (dspFlag) {
        str.append("<span class='fightShiQiDsp'>你的士气高涨，</span>")
      }
      //增加难度，获得0-150之间的随机数
      tmpSuiji = getRandomInt(0, 150);
      if (tmpSuiji <= 10 + this.player.property['fuyuan'] && tmpSuiji > 5 + this.player.property['fuyuan']) {
        str.append("<span class='fightFenNuDsp'>你突然愤怒了</span>，");
        gongjizhi *= 2;
      } else if (tmpSuiji <= 5 + this.player.property['fuyuan'] && tmpSuiji > 1 + this.player.property['fuyuan']) {
        str.append("<span class='fightFenNuJiDianDsp'>你非常愤怒</span>，");
        gongjizhi *= 3;
      } else if (tmpSuiji <= 1 + this.player.property['fuyuan']) {
        str.append("<span class='fightRanShaoDsp'>你愤怒之极了</span>，");
        gongjizhi *= 5;
      }
      gSM -= gongjizhi;
      str.append("打了它<span class='fightTiXingDsp'>" + gongjizhi + "</span>血<br><br></div>");
      huiheshuNum++;
      if (gSM <= 0) break;
    }
    if (shijianmiao % p_guaiwu.property['sudu'] == 0) {
      gongjizhi = getRandomInt(p_guaiwu.property['gongjiMin'], p_guaiwu.property['gongjiMax']) - this.player.property['fangyu'];
      if (gongjizhi <= 1)gongjizhi = 1;
      str.append("<div  class='fightLineStyle' id='guaiPKplayer" + shijianmiao + "' miaotype='" + shijianmiao + "'>第" + shijianmiao + "秒&nbsp;<span class='fightGuaiDsp'>" + p_guaiwu.name + "</span>打了你一下，");
      tmpSuiji = getRandomInt(0, 100);
      //怪物是0-100随机
      if (tmpSuiji <= 10 && tmpSuiji > 5) {
        str.append("<span class='fightFenNuDsp'>它突然愤怒了</span>，");
        gongjizhi *= 2;
      } else if (tmpSuiji <= 5 && tmpSuiji > 1) {
        str.append("<span class='fightFenNuJiDianDsp'>它非常愤怒</span>，");
        gongjizhi *= 3;
      } else if (tmpSuiji <= 1) {
        str.append("<span class='fightRanShaoDsp'>它愤怒之极了</span>，");
        gongjizhi *= 5;
      }
      pSM -= gongjizhi;
      str.append("打了你<span class='fightTiXingDsp'>" + gongjizhi + "</span>血<br><br></div>");
      if (pSM <= 0) break;
    }
    shijianmiao++;
  }
  if (pSM <= 0) {
//    str.append("<div class='fightLineStyle'>你已经没有生命了！怪物还剩</div><span class='fightTiXingDsp'>" + (p_guaiwu.property['shengming'] - gSM) + "</span>血。");
//    $("#fightingWindow", this.pageContainer).attr('innerHTML', str);
//    this.pageContainer.css('display', 'block');
//    this.player.isFighting = false;
    //玩家被怪物打死，显示结束动画
    this.close(finishDongHua(p_guaiwu));
  } else {
    //战斗胜利
    var jingyan,jinbi;
    tmpSuiji = getRandomInt(0, 150);
    if (tmpSuiji <= 10 + this.player.property['xingyun']) {
      dspFlag = true;
      jingyan = p_guaiwu.property['jingyanMax'];
      jinbi = p_guaiwu.property['jinbiMax'];
    } else {
      dspFlag = false;
      jingyan = getRandomInt(p_guaiwu.property['jingyanMin'], p_guaiwu.property['jingyanMax']);
      jinbi = getRandomInt(p_guaiwu.property['jinbiMin'], p_guaiwu.property['jinbiMax']);
    }

    str.append("<div class='fightLineStyle' id='fightFinishDiv' miaotype='").append(shijianmiao).
            append("'>战斗胜利！你损失了<span class='fightTiXingDsp'>").append(this.player.property['shengming'] - pSM).
            append("</span>血，共经历了<span class='fightTiXingDsp'>").append(huiheshuNum).append("</span>回合，");
    if (dspFlag) {
      str.append("<span class='fightTiXingDsp'>你的运气不错，</span>，");
    }
    str.append("增加了<span class='fightTiXingDsp'>" + jingyan +
            "</span>经验和<span class='fightTiXingDsp'>" + jinbi +
            "</span>金币。</div>");
    $("#fightingWindow", this.pageContainer).attr('innerHTML', str);
    this.pageContainer.css('display', 'block');
    $("#fightingWindow", this.pageContainer).attr("scrollTop", 0);
    this.player.property['shengming'] = pSM;
    this.player.property['jingyan'] += jingyan;
    this.player.property['jinbi'] += jinbi;
    __fightGuaiDongHua();
  }
};

//私有变量  战斗时间计时器
var __fight_timer_timer = 0;
//私有函数，战斗动画，每10秒钟刷新一次战斗过程
function __fightGuaiDongHua() {
  if ($("#fightFinishDiv", "#fightingWindow").css("display") == "block") {
    $("#fightOK").css("display", "block");
    __fight_timer_timer = 0;
  } else {
    $(".fightLineStyle", "#fightingWindow").each(function() {
      if (parseInt($(this).attr("miaotype")) <= __fight_timer_timer) {
        $(this).show().removeClass("fightLineStyle").css("display", "block");
        if (parseInt($("#fightingWindow", this.pageContainer).attr("scrollHeight")) >= parseInt($("#fightingWindow", this.pageContainer).css("height"))) {
          $("#fightingWindow", this.pageContainer).attr("scrollTop", parseInt($("#fightingWindow", this.pageContainer).attr("scrollHeight")));
        }
      }
    });
    __fight_timer_timer = __fight_timer_timer + 10;
    window.setTimeout("__fightGuaiDongHua()", YOUXI_SHIJIAN_10_MIAO_ZHENSHI_SHIJIAN);
  }
}
/**
 * 关闭战斗框
 * @param p_action 战斗框关闭后，需要执行的方法，没有可个null
 */
FightDialogWin.prototype.close = function(p_action) {
  this.player.isFighting = false;
  this.player.isMoveing = true;
  this.pageContainer.css('display', 'none');
  if (p_action) {
    p_action();
  }
};