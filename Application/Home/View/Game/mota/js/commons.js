/**
 * 获得提示文字
 * @param p_msg             需要提示的文字里面含有{0}，{1}
 * @param p_tipword_array   每个{0}，{1}实际替换的内容，是个数组
 * @param p_tipword_color   每个{0}，{1}的文字颜色
 * @param p_tip_word_size   每个{0}，{1}的文字大小
 */
function getTipWordMsg(p_msg, p_tipword_array, p_tipword_color, p_tip_word_size) {
  var beginPosition = p_msg.indexOf("{");
  var endPosition = p_msg.indexOf("}");
  var tmpStr = p_msg;
  var ret = "";
  if (beginPosition >= 0 && endPosition >= 0) {
    var i = 0;
    while (beginPosition >= 0 && endPosition >= 0) {
      ret += tmpStr.substring(0, beginPosition);
      ret += "<span style='color:" + (p_tipword_color ? p_tipword_color : "black") +
              ";font-size:" + (p_tip_word_size ? p_tip_word_size : "9pt") + ";'>" + p_tipword_array[i] + "</span>";
      tmpStr = tmpStr.substring(endPosition + 1, tmpStr.length);
      beginPosition = tmpStr.indexOf("{");
      endPosition = tmpStr.indexOf("}");
      i++;
    }
    ret += tmpStr;
  } else {
    ret = p_msg;
  }
  return ret;
}

/**
 * 获得一个随整数，随机整数数>=min   <=max
 * @param p_min 最小数
 * @param p_max 最大数
 */
function getRandomInt(p_min, p_max) {
  return parseInt(Math.random() * (p_max - p_min + 1) + p_min);
}

/**
 * 计算攻击怪物的掉血量
 * @param p_player_att      玩家攻击
 * @param p_player_def      玩家防御
 * @param p_player_speed    玩家速度
 * @param p_guai_att        怪物攻击
 * @param p_guai_def        怪物防御
 * @param p_guai_speed      怪物速度
 * @param p_guai_life       怪物生命
 * @return 对象{left:掉血量,time:所用时间,attNum:攻击次数}
 */
function computeFightLossLife(p_player_att, p_player_def, p_player_speed, p_guai_att, p_guai_def, p_guai_speed, p_guai_life) {
  var playerAttPer = p_player_att - p_guai_def;
  if (playerAttPer <= 0)playerAttPer = 1;
  var playerKillGuaiNum = Math.ceil(p_guai_life / playerAttPer);
  var playerKillGuaiTime = playerKillGuaiNum * p_player_speed;
  var guaiAttNum = Math.floor(playerKillGuaiTime / p_guai_speed);
  var guaiAttPer = p_guai_att - p_player_def;
  if (guaiAttPer <= 0) guaiAttPer = 1;
  var playerLossLife = guaiAttPer * guaiAttNum;
  return {life:playerLossLife,time:playerKillGuaiTime,attNum:playerKillGuaiNum};
}

/**
 * 增加玩家属性方法
 * @param p_player 玩家对象
 * @param p_speak_dialog 对话框
 * @param p_add_property_obj 添加玩家属性餐宿
 *          des:物品描述【用于弹出的对话框】需要使用数组【property_array】中替换的元素以{0}，{1}。。。等表示
 *          property_array: 属性数组
 *              property:属性名称
 *              min:属性值最小
 *              max:属性值最大
 *              am:add属性加 minus：属性减
 *              mmin:如果是减的话，减得最小值
 * @param p_condition_obj 需要的条件参数
 *          property：需要玩家属性名称
 *          value:需要玩家属性的值
 *          des:如果玩家不符合条件，显示的内容
 */
function addPlayerProperty(p_player, p_speak_dialog, p_add_property_obj, p_condition_obj) {
  if (p_condition_obj) {
    if (p_player.property[p_condition_obj.property] >= p_condition_obj.value) {
      p_player.property[p_condition_obj.property] -= p_condition_obj.value;
      __addPlayerProperty(p_player, p_speak_dialog, p_add_property_obj);
      return true;
    } else {
      if (p_speak_dialog && $.trim(p_condition_obj.des) != "") {
        p_speak_dialog.show(p_condition_obj.des);
      }
      return false;
    }
  } else {
    __addPlayerProperty(p_player, p_speak_dialog, p_add_property_obj);
    return true;
  }
}

/**
 * 私有方法，玩家属性增加中的私有方法
 * @param p_player              玩家对象
 * @param p_speak_dialog        对话框对象
 * @param p_add_property_obj    增加属性对象   = addPlayerProperty方法中的 p_add_property_obj对象
 */
function __addPlayerProperty(p_player, p_speak_dialog, p_add_property_obj) {
  if (p_add_property_obj) {
    var tmpDesArray = new Array();
    for (var i = 0; i < p_add_property_obj.property_array.length; i++) {
      var tmpPropertyObj = p_add_property_obj.property_array[i];
      var tmpValue = getRandomInt(tmpPropertyObj.min, tmpPropertyObj.max);
      if (tmpPropertyObj.am == "add") {
        p_player.property[tmpPropertyObj.property] += tmpValue;
      } else {
        p_player.property[tmpPropertyObj.property] -= tmpValue;
        if (p_player.property[tmpPropertyObj.property] < tmpPropertyObj.mmin)
          p_player.property[tmpPropertyObj.property] = tmpPropertyObj.mmin;
      }
      tmpDesArray.push(tmpValue);
    }
    if (p_speak_dialog && $.trim(p_add_property_obj.des) != "") {
      p_speak_dialog.show(getTipWordMsg(p_add_property_obj.des, tmpDesArray, "red", "11pt"));
    }
  }
}

/**
 * 游戏结束时的动画
 * @param p_guai 怪物信息，如果过了全关，没有怪物信息 p_guai=null
 */
function finishDongHua(p_guai) {
  $(document).unbind("keydown", keyDownInDocument);
  var finishDiv = $("<div/>").addClass("finishInnerDiv").css("display", "none");
  var authInfo = $("<div/>").addClass("finishInnerDiv").css("display", "none").
          attr("innerHTML", "作者：杜津浩<br>游戏素材来自网络！<br>游戏内容根据原魔塔修改！");
  var restartdiv = $("<div/>").addClass("finishReStartDiv").css("display", "none").text("重新开始").click(function() {
    window.location = "mota.html";
  }).hover(
          function () {
            $(this).addClass("finishReStartHover");
          },
          function () {
            $(this).removeClass("finishReStartHover");
          }
          );
  $("#gameFrame").css("background", "url('" + IMAGE_PATH + "506.jpg') repeat").attr("innerHTML", "").append(finishDiv).append(authInfo).append(restartdiv);
  if (p_guai) {
    finishDiv.attr("innerHTML", "你不幸被" + p_guai.name + "杀死，公主无法救出！<br>多年以后公主被迫嫁给了终极魔王，世界一片混乱！")
  } else {
    finishDiv.attr("innerHTML", "经过你的不懈努力，终于把公主从魔塔中救出！<br>多年以后公主嫁给了勇士，他们过着幸福的生活！")
  }
  finishDiv.fadeIn(1000, function() {
    authInfo.slideDown(1000, function() {
      restartdiv.show(1000);
    });
  });
}