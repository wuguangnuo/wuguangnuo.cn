/**
 * 查看怪物对话框
 * @param p_player 玩家对象
 */
function ViewGuaiWin(p_player) {
  this.player = p_player;
  this.pageContainer = $('<div id="viewGuaiWinDivContainer"/>').addClass('viewGuaiDialogCss').css('display', 'none');
}

ViewGuaiWin.prototype.show = function(p_map, p_action) {
  this.player.isMoveing = false;
  this.player.isViewGuai = true;
  this.pageContainer.attr("innerHTML", "");
  var innerHtml = new StringBuffer();
  var i,j,k,haveFlag;
  var guaiwuArray = new Array();
  for (i = 0; i < p_map.datas.length; i++) {
    for (j = 0; j < p_map.datas[i].length; j++) {
      var tmpGuai = p_map.datas[i][j];
      if (tmpGuai.id <= 300) {
        haveFlag = false;
        for (k = 0; k < guaiwuArray.length; k++) {
          var tmpGuaiArrayGuai = guaiwuArray[k];
          if (tmpGuaiArrayGuai.id == tmpGuai.id) {
            haveFlag = true;
            break;
          }
        }
        if (!haveFlag) {
          var ret=computeFightLossLife((this.player.property['gongjiMin']+this.player.property['gongjiMax'])/2, this.player.property['fangyu'], this.player.property['sudu'], (tmpGuai.property['gongjiMin']+tmpGuai.property['gongjiMax'])/2, tmpGuai.property['fangyu'], tmpGuai.property['sudu'], tmpGuai.property['shengming']);
          tmpGuai.__tmp_fight_compute={life:Math.ceil(ret.life),time:Math.ceil(ret.time),attNum:Math.ceil(ret.attNum)};
          guaiwuArray.push(tmpGuai);
        }
      }
    }
  }
  guaiwuArray.sort(function(p_guai_1, p_guai_2) {
    return parseInt(p_guai_1.__tmp_fight_compute.life)-parseInt(p_guai_2.__tmp_fight_compute.life);
  });
  innerHtml.append("<table cellpadding='1' cellspacing='1'><tr>").
          append("<th rowspan='2'><nobr>图像</nobr></th>").
          append("<th rowspan='2'><nobr>生命</nobr></th>").
          append("<th rowspan='2'><nobr>攻击</nobr></th>").
          append("<th rowspan='2'><nobr>防御</nobr></th>").
          append("<th rowspan='2'><nobr>速度</nobr></th>").
          append("<th rowspan='2'><nobr>金币</nobr></th>").
          append("<th rowspan='2'><nobr>经验</nobr></th>").
          append("<th colspan='2'>战斗计算</th>");
  innerHtml.append("</tr>");
  innerHtml.append("<tr><th><nobr>损失</nobr></th><th><nobr>次数</nobr></th></th></tr>");
  for (i = 0; i < guaiwuArray.length; i++) {
    var tmpGuaiArrayGuai = guaiwuArray[i];
    innerHtml.append("<tr>");
    innerHtml.append("<td><img src='").append(tmpGuaiArrayGuai.image).append("' alt='").append(tmpGuaiArrayGuai.name).append("' /></td>");
    innerHtml.append("<td><nobr>").append(tmpGuaiArrayGuai.property['shengming']).append("</nobr></td>");
    innerHtml.append("<td><nobr>").append(tmpGuaiArrayGuai.property['gongjiMin']).append("-").append(tmpGuaiArrayGuai.property['gongjiMax']).append("</nobr></td>");
    innerHtml.append("<td><nobr>").append(tmpGuaiArrayGuai.property['fangyu']).append("</nobr></td>");
    innerHtml.append("<td><nobr>").append(tmpGuaiArrayGuai.property['sudu']).append("</nobr></td>");
    innerHtml.append("<td><nobr>").append(tmpGuaiArrayGuai.property['jinbiMin']).append("-").append(tmpGuaiArrayGuai.property['jinbiMax']).append("</nobr></td>");
    innerHtml.append("<td><nobr>").append(tmpGuaiArrayGuai.property['jingyanMin']).append("-").append(tmpGuaiArrayGuai.property['jingyanMax']).append("</nobr></td>");
    innerHtml.append("<td><nobr>").append(tmpGuaiArrayGuai.__tmp_fight_compute.life).append("</nobr></td>");
    innerHtml.append("<td><nobr>").append(tmpGuaiArrayGuai.__tmp_fight_compute.attNum).append("</nobr></td>");
    innerHtml.append("</tr>");
  }
  innerHtml.append("</table>");
  this.pageContainer.attr("innerHTML", innerHtml.toString());
  this.pageContainer.css('display', 'block');
  if (p_action) {
    p_action();
  }
};

ViewGuaiWin.prototype.close = function(p_action) {
  this.player.isMoveing = true;
  this.player.isViewGuai = false;
  this.pageContainer.css('display', 'none');
  if (p_action) {
    p_action();
  }
};