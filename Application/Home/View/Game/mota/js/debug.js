function debugMOTA_init(){
  var debugDiv=$('<div style="width:440px;height:352px;background-color:#faebd7;"/>');
  var str='<div>'+
          '<span style="color:blue;">玩家：</span>'+
          '<select id="playerAddMinus">'+
            '<option value="add">增加</option>'+
            '<option value="minus">减少</option>'+
          '</select>'+
          '<select id="playerPropertyName">'+
            '<option value="gongjiMin">最小攻击</option>'+
            '<option value="gongjiMax">最大攻击</option>'+
            '<option value="fangyu">防御</option>'+
            '<option value="shengming">生命</option>'+
            '<option value="sudu">速度</option>'+
          '</select>'+
          '<input type="text" id="playerPorpertyValue" value="0">'+
          '<input type="button" id="playerPropertyOK" value="确定">'+
        '</div>'+
        '<div>'+
          '<span style="color:#8b0000;">怪物：</span>'+
          '<select id="guaiid" style="width:80px;"></select>'+
          '<select id="guaiAddMinus">'+
            '<option value="add">增加</option>'+
            '<option value="minus">减少</option>'+
          '</select>'+
          '<select id="guaiPropertyName">'+
            '<option value="gongjiMin">最小攻击</option>'+
            '<option value="gongjiMax">最大攻击</option>'+
            '<option value="fangyu">防御</option>'+
            '<option value="shengming">生命</option>'+
            '<option value="sudu">速度</option>'+
          '</select>'+
          '<input type="text" id="guaiPorpertyValue">'+
          '<input type="button" id="guaiPropertyOK" value="确定">'+
        '</div>'+
        '<div>'+
          '<span style="color:blue;">楼层：</span>'+
          '<input type="text" id="playerFloorValue" value="0" size="10">'+
          '<input type="button" id="playerFloorOK" value="确定">'+
        '</div>'+
        '<div id="viewGuaiInfoDiv" style="width:420px;height:400px;overflow-y:scroll;">'+
        '</div>';
  debugDiv.attr("innerHTML",str);
  $("#motaDebugTd").append(debugDiv);
}

/**
 * 对魔塔的调试
 * @param p_true_false true 可以调试 false 不能调试
 */
function debugMOTA(p_true_false) {
  if (p_true_false) {

    $("#playerFloorOK").click(function() {
      player.isMoveing = false;
      currentMap = maps[$("#playerFloorValue").val()];
      currentMap.mapView(player, 0);
    });

    $("#playerPropertyOK").click(function() {
      if ($("#playerAddMinus option:selected").val() == "add") {
        if (!isNaN(parseInt($("#playerPorpertyValue").val()))) {
          player.property[$("#playerPropertyName option:selected").val()] += parseInt($("#playerPorpertyValue").val());
        }
      } else {
        if (!isNaN(parseInt($("#playerPorpertyValue").val()))) {
          player.property[$("#playerPropertyName option:selected").val()] -= parseInt($("#playerPorpertyValue").val());
          if (player.property[$("#playerPropertyName option:selected").val()] <= 1) {
            player.property[$("#playerPropertyName option:selected").val()] = 1;
          }
        }
      }
      player.updatePageInfo();
      debug_show_all_guai();
    });

    $("#guaiPropertyOK").click(function() {
      var guaiId = $("#guaiid option:selected").val();
      var i,j,tmpGuai;
      out:
              for (i = 0; i < maps[22].datas.length; i++) {
                for (j = 0; j < maps[22].datas[i].length; j++) {
                  tmpGuai = maps[22].datas[i][j];
                  if (tmpGuai.id <= 300) {
                    if (tmpGuai.id == guaiId) {
                      break out;
                    }
                  }
                }
              }
      var guaiPorpertyName = $("#guaiPropertyName option:selected").val();
      if ($("#guaiAddMinus option:selected").val() == "add") {
        if (!isNaN(parseInt($("#guaiPorpertyValue").val()))) {
          if (guaiPorpertyName == "gongjiMin") {
            tmpGuai.property['gongjiMin'] += parseInt($("#guaiPorpertyValue").val());
          } else if (guaiPorpertyName == "gongjiMax") {
            tmpGuai.property['gongjiMax'] += parseInt($("#guaiPorpertyValue").val());
          } else if (guaiPorpertyName == "fangyu") {
            tmpGuai.property['fangyu'] += parseInt($("#guaiPorpertyValue").val());
          } else if (guaiPorpertyName == "sudu") {
            tmpGuai.property['sudu'] += parseInt($("#guaiPorpertyValue").val());
          } else if (guaiPorpertyName == "shengming") {
            tmpGuai.property['shengming'] += parseInt($("#guaiPorpertyValue").val());
          }
        }
      } else {
        if (!isNaN(parseInt($("#guaiPorpertyValue").val()))) {
          if (guaiPorpertyName == "gongjiMin") {
            tmpGuai.property['gongjiMin'] -= parseInt($("#guaiPorpertyValue").val());
            if (tmpGuai.property['gongjiMin'] <= 1) tmpGuai.property['gongjiMin'] = 1;
          } else if (guaiPorpertyName == "gongjiMax") {
            tmpGuai.property['gongjiMax'] -= parseInt($("#guaiPorpertyValue").val());
            if (tmpGuai.property['gongjiMax'] <= 1) tmpGuai.property['gongjiMax'] = 1;
          } else if (guaiPorpertyName == "fangyu") {
            tmpGuai.property['fangyu'] -= parseInt($("#guaiPorpertyValue").val());
            if (tmpGuai.property['fangyu'] <= 1) tmpGuai.property['fangyu'] = 1;
          } else if (guaiPorpertyName == "sudu") {
            tmpGuai.property['sudu'] -= parseInt($("#guaiPorpertyValue").val());
            if (tmpGuai.property['sudu'] <= 1) tmpGuai.property['sudu'] = 1;
          } else if (guaiPorpertyName == "shengming") {
            tmpGuai.property['shengming'] -= parseInt($("#guaiPorpertyValue").val());
            if (tmpGuai.property['shengming'] <= 1) tmpGuai.property['shengming'] = 1;
          }
        }
      }
      player.updatePageInfo();
      debug_show_all_guai();
    });

    debug_show_all_guai();
    for (var i = 0; i < 33; i++) {
      $("#guaiid").append("<option value='" + i + "'>" + goodsArray[i].name + "</option>")
    }
    $("#motaDebugTd").css("display","block");
  }
}

function debug_show_all_guai() {
  $("#viewGuaiInfoDiv").attr("innerHTML", "");
  var innerHtml = new StringBuffer();
  var i,j,k,haveFlag;
  var guaiwuArray = new Array();
  for (i = 0; i < maps[22].datas.length; i++) {
    for (j = 0; j < maps[22].datas[i].length; j++) {
      var tmpGuai = maps[22].datas[i][j];
      if (tmpGuai.id <= 300 && tmpGuai.id >= 0) {
        haveFlag = false;
        for (k = 0; k < guaiwuArray.length; k++) {
          var tmpGuaiArrayGuai = guaiwuArray[k];
          if (tmpGuaiArrayGuai.id == tmpGuai.id) {
            haveFlag = true;
            break;
          }
        }
        if (!haveFlag) {
          var ret = computeFightLossLife((player.property['gongjiMin'] + player.property['gongjiMax']) / 2,
                  player.property['fangyu'], player.property['sudu'],
                  (tmpGuai.property['gongjiMin'] + tmpGuai.property['gongjiMax']) / 2,
                  tmpGuai.property['fangyu'], tmpGuai.property['sudu'], tmpGuai.property['shengming']);
          tmpGuai.__tmp_fight_compute = {life:Math.ceil(ret.life),time:Math.ceil(ret.time),attNum:Math.ceil(ret.attNum)};

          guaiwuArray.push(tmpGuai);
        }
      }
    }
  }
  guaiwuArray.sort(function(p_guai_1, p_guai_2) {
    return parseInt(p_guai_1.__tmp_fight_compute.life) - parseInt(p_guai_2.__tmp_fight_compute.life);
  });
  innerHtml.append("<table cellpadding='0' cellspacing='0' style='background-color:#a9a9a9;width:100%;' border='1'><tr>").
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
    innerHtml.append("<td align='right'><nobr>").append(tmpGuaiArrayGuai.property['shengming']).append("</nobr></td>");
    innerHtml.append("<td align='right'><nobr>").append(tmpGuaiArrayGuai.property['gongjiMin']).append("-").append(tmpGuaiArrayGuai.property['gongjiMax']).append("</nobr></td>");
    innerHtml.append("<td align='right'><nobr>").append(tmpGuaiArrayGuai.property['fangyu']).append("</nobr></td>");
    innerHtml.append("<td align='right'><nobr>").append(tmpGuaiArrayGuai.property['sudu']).append("</nobr></td>");
    innerHtml.append("<td align='right'><nobr>").append(tmpGuaiArrayGuai.property['jinbiMin']).append("-").append(tmpGuaiArrayGuai.property['jinbiMax']).append("</nobr></td>");
    innerHtml.append("<td align='right'><nobr>").append(tmpGuaiArrayGuai.property['jingyanMin']).append("-").append(tmpGuaiArrayGuai.property['jingyanMax']).append("</nobr></td>");
    innerHtml.append("<td align='right'><nobr>").append(tmpGuaiArrayGuai.__tmp_fight_compute.life).append("</nobr></td>");
    innerHtml.append("<td align='right'><nobr>").append(tmpGuaiArrayGuai.__tmp_fight_compute.attNum).append("</nobr></td>");
    innerHtml.append("</tr>");
  }
  innerHtml.append("</table>");
  $("#viewGuaiInfoDiv").attr("innerHTML", innerHtml.toString()).css('display', 'block');
}