//设置购买框内价格与属性信息，为了显示和实际一致
var JINBI_CHUJI_JINBI = 50,JINBI_CHUJI_SHENGMING_MIN = 800,JINBI_CHUJI_SHENGMING_MAX = 1200,
        JINBI_CHUJI_GONGJI_MIN_MIN = 4,JINBI_CHUJI_GONGJI_MIN_MAX = 6,JINBI_CHUJI_GONGJI_MAX_MIN = 6,JINBI_CHUJI_GONGJI_MAX_MAX = 9,
        JINBI_CHUJI_FANGYU_MIN = 4,JINBI_CHUJI_FANGYU_MAX = 6;
var JINBI_GAOJI_JINBI = 225,JINBI_GAOJI_SHENGMING_MIN = 4000,JINBI_GAOJI_SHENGMING_MAX = 6000,
        JINBI_GAOJI_GONGJI_MIN_MIN = 20,JINBI_GAOJI_GONGJI_MIN_MAX = 30,JINBI_GAOJI_GONGJI_MAX_MIN = 30,JINBI_GAOJI_GONGJI_MAX_MAX = 45,
        JINBI_GAOJI_FANGYU_MIN = 20,JINBI_GAOJI_FANGYU_MAX = 30;
var JINGYAN_CHUJI_JINGYAN = 50,JINGYAN_CHUJI_SHENGJI_SHENGMING_MIN = 300,JINGYAN_CHUJI_SHENGJI_SHENGMING_MAX = 450,
        JINGYAN_CHUJI_SHENGJI_GONGJI_MIN_MIN = 2,JINGYAN_CHUJI_SHENGJI_GONGJI_MIN_MAX = 3,
        JINGYAN_CHUJI_SHENGJI_GONGJI_MAX_MIN = 3,JINGYAN_CHUJI_SHENGJI_GONGJI_MAX_MAX = 5,
        JINGYAN_CHUJI_SHENGJI_FANGYU_MIN = 2,JINGYAN_CHUJI_SHENGJI_FANGYU_MAX = 3,
        JINGYAN_CHUJI_GONGJI_MIN_MIN = 5,JINGYAN_CHUJI_GONGJI_MIN_MAX = 8,JINGYAN_CHUJI_GONGJI_MAX_MIN = 8,JINGYAN_CHUJI_GONGJI_MAX_MAX = 12,
        JINGYAN_CHUJI_FANGYU_MIN = 5,JINGYAN_CHUJI_FANGYU_MAX = 8;
var JINGYAN_GAOJI_JINGYAN = 225,JINGYAN_GAOJI_SHENGJI_SHENGMING_MIN = 1500,JINGYAN_GAOJI_SHENGJI_SHENGMING_MAX = 2250,
        JINGYAN_GAOJI_SHENGJI_GONGJI_MIN_MIN = 20,JINGYAN_GAOJI_SHENGJI_GONGJI_MIN_MAX = 15,
        JINGYAN_GAOJI_SHENGJI_GONGJI_MAX_MIN = 15,JINGYAN_GAOJI_SHENGJI_GONGJI_MAX_MAX = 23,
        JINGYAN_GAOJI_SHENGJI_FANGYU_MIN = 10,JINGYAN_GAOJI_SHENGJI_FANGYU_MAX = 15,
        JINGYAN_GAOJI_GONGJI_MIN_MIN = 25,JINGYAN_GAOJI_GONGJI_MIN_MAX = 38,JINGYAN_GAOJI_GONGJI_MAX_MIN = 38,JINGYAN_GAOJI_GONGJI_MAX_MAX = 55,
        JINGYAN_GAOJI_FANGYU_MIN = 25,JINGYAN_GAOJI_FANGYU_MAX = 38;
var GOUMAI_HUANG_YAOSHI = 30,GOUMAI_LAN_YAOSHI = 50,GOUMAI_HONG_YAOSHI = 100;
var SHOUCHU_HUANG_YAOSHI = 15,SHOUCHU_LAN_YAOSHI = 25,SHOUCHU_HONG_YAOSHI = 50;

/**
 * 购买经验、金币对话框
 * @param p_player 玩家对象
 */
function GouMaiWin(p_player) {
  this.player = p_player;
  this.pageContainer = $('<div id="goumaiWinDivContainer"/>').addClass('goumaiDialogCss').css('display', 'none');
}

/**
 * 显示购买框
 * @param p_shop_id 商店id，也就是对象的id
 * @param p_action 在显示完对话框后需要添加的行为
 */
GouMaiWin.prototype.show = function(p_shop_id, p_action) {
  this.player.isMoveing = false;
  this.player.isGouMai = true;
  this.pageContainer.attr("innerHTML", "");
  var innerHtml = new StringBuffer();
  if (p_shop_id == 605) {
    innerHtml.append("<div class='goumaishangdianDSP'>欢迎来到初级商店！</div>");
    innerHtml.append("<div class='goumaishangdianDSP'>您只需消费" + JINBI_CHUJI_JINBI + "个金币就可以选择以下内容：</div>");
    innerHtml.append("<div class='goumaishangdianDSP'>增加" + JINBI_CHUJI_SHENGMING_MIN + "-" +
            JINBI_CHUJI_SHENGMING_MAX + "点生命<br>【按数字键1】</div>");
    innerHtml.append("<div class='goumaishangdianDSP'>增加最小" + JINBI_CHUJI_GONGJI_MIN_MIN + "-" + JINBI_CHUJI_GONGJI_MIN_MAX +
            " 最大" + JINBI_CHUJI_GONGJI_MAX_MIN + "-" + JINBI_CHUJI_GONGJI_MAX_MAX + "点攻击<br>【按数字键2】</div>");
    innerHtml.append("<div class='goumaishangdianDSP'>增加" + JINBI_CHUJI_FANGYU_MIN + "-" + JINBI_CHUJI_FANGYU_MAX + "点防御<br>【按数字键3】</div>");
  } else if (p_shop_id == 652) {
    innerHtml.append("<div class='goumaishangdianDSP'>欢迎来到高级商店！</div>");
    innerHtml.append("<div class='goumaishangdianDSP'>您只需消费" + JINBI_GAOJI_JINBI + "个金币就可以选择以下内容：</div>");
    innerHtml.append("<div class='goumaishangdianDSP'>增加" + JINBI_GAOJI_SHENGMING_MIN + "-" +
            JINBI_GAOJI_SHENGMING_MAX + "点生命<br>【按数字键1】</div>");
    innerHtml.append("<div class='goumaishangdianDSP'>增加最小" + JINBI_GAOJI_GONGJI_MIN_MIN + "-" + JINBI_GAOJI_GONGJI_MIN_MAX +
            " 最大" + JINBI_GAOJI_GONGJI_MAX_MIN + "-" + JINBI_GAOJI_GONGJI_MAX_MAX + "点攻击<br>【按数字键2】</div>");
    innerHtml.append("<div class='goumaishangdianDSP'>增加" + JINBI_GAOJI_FANGYU_MIN + "-" + JINBI_GAOJI_FANGYU_MAX + "点防御<br>【按数字键3】</div>");
  } else if (p_shop_id == 650) {
    innerHtml.append("<div class='goumaishangdianDSP'>欢迎来到初级经验商店！</div>");
    innerHtml.append("<div class='goumaishangdianDSP'>您只需消费" + JINGYAN_CHUJI_JINGYAN + "点经验就可以选择以下内容：</div>");
    innerHtml.append("<div class='goumaishangdianDSP'>提升一级<br>【按数字键1】</div>");
    innerHtml.append("<div class='goumaishangdianDSP'>增加最小" + JINGYAN_CHUJI_GONGJI_MIN_MIN + "-" + JINGYAN_CHUJI_GONGJI_MIN_MAX +
            " 最大" + JINGYAN_CHUJI_GONGJI_MAX_MIN + "-" + JINGYAN_CHUJI_GONGJI_MAX_MAX + "点攻击<br>【按数字键2】</div>");
    innerHtml.append("<div class='goumaishangdianDSP'>增加" + JINGYAN_CHUJI_FANGYU_MIN + "-" + JINGYAN_CHUJI_FANGYU_MAX + "点防御<br>【按数字键3】</div>");
  } else if (p_shop_id == 654) {
    innerHtml.append("<div class='goumaishangdianDSP'>欢迎来到高级经验商店！</div>");
    innerHtml.append("<div class='goumaishangdianDSP'>您只需消费" + JINGYAN_GAOJI_JINGYAN + "点经验就可以选择以下内容：</div>");
    innerHtml.append("<div class='goumaishangdianDSP'>提升五级<br>【按数字键1】</div>");
    innerHtml.append("<div class='goumaishangdianDSP'>增加最小" + JINGYAN_GAOJI_GONGJI_MIN_MIN + "-" + JINGYAN_GAOJI_GONGJI_MIN_MAX +
            " 最大" + JINGYAN_GAOJI_GONGJI_MAX_MIN + "-" + JINGYAN_GAOJI_GONGJI_MAX_MAX + "点攻击<br>【按数字键2】</div>");
    innerHtml.append("<div class='goumaishangdianDSP'>增加" + JINGYAN_GAOJI_FANGYU_MIN + "-" + JINGYAN_GAOJI_FANGYU_MAX + "点防御<br>【按数字键3】</div>");
  } else if (p_shop_id == 651) {
    innerHtml.append("<div class='goumaishangdianDSP'>欢迎来到钥匙商店！</div>");
    innerHtml.append("<div class='goumaishangdianDSP'>您只需有足够的金币就可以选择以下内容：</div>");
    innerHtml.append("<div class='goumaishangdianDSP'>购买一把黄钥匙" + GOUMAI_HUANG_YAOSHI + "元<br>【按数字键1】</div>");
    innerHtml.append("<div class='goumaishangdianDSP'>购买一把蓝钥匙" + GOUMAI_LAN_YAOSHI + "元<br>【按数字键2】</div>");
    innerHtml.append("<div class='goumaishangdianDSP'>购买一把红钥匙" + GOUMAI_HONG_YAOSHI + "元<br>【按数字键3】</div>");
  } else if (p_shop_id == 653) {
    innerHtml.append("<div class='goumaishangdianDSP'>欢迎来到钥匙收购商店！</div>");
    innerHtml.append("<div class='goumaishangdianDSP'>如你有多余的钥匙，就可以作如下选择：</div>");
    innerHtml.append("<div class='goumaishangdianDSP'>售出一把黄钥匙" + SHOUCHU_HUANG_YAOSHI + "元<br>【按数字键1】</div>");
    innerHtml.append("<div class='goumaishangdianDSP'>售出一把蓝钥匙" + SHOUCHU_LAN_YAOSHI + "元<br>【按数字键2】</div>");
    innerHtml.append("<div class='goumaishangdianDSP'>售出一把红钥匙" + SHOUCHU_HONG_YAOSHI + "元<br>【按数字键3】</div>");
  }
  innerHtml.append("<div class='goumaishangdianDSP'>离开商店<br>【按空格键】</div>");
  this.pageContainer.attr("innerHTML", innerHtml.toString());
  this.pageContainer.css('display', 'block');
  if (p_action) {
    p_action();
  }
};

/**
 * 购买时选择的行为
 * @param p_shop_id    商店id，也就是对象的id
 */
GouMaiWin.prototype.click1 = function(p_shop_id) {
  var tmpAddSuccessDes,tmpAddPropertyArray = new Array();
  var tmpConditionPropertyName,tmpConditionValue,tmpConditionDes;
  if (p_shop_id == 605) {
    tmpAddSuccessDes = "你增加{0}点生命！";
    tmpAddPropertyArray.push({property:"shengming",min:JINBI_CHUJI_SHENGMING_MIN,max:JINBI_CHUJI_SHENGMING_MAX,am:"add",mmin:0});
    tmpConditionPropertyName = 'jinbi',tmpConditionValue = JINBI_CHUJI_JINBI,tmpConditionDes = '你金币不够了！';
  } else if (p_shop_id == 652) {
    tmpAddSuccessDes = "你增加{0}点生命！";
    tmpAddPropertyArray.push({property:"shengming",min:JINBI_GAOJI_SHENGMING_MIN,max:JINBI_GAOJI_SHENGMING_MAX,am:"add",mmin:0});
    tmpConditionPropertyName = 'jinbi',tmpConditionValue = JINBI_GAOJI_JINBI,tmpConditionDes = '你金币不够了！';
  } else if (p_shop_id == 650) {
    tmpAddSuccessDes = "你提升了一级！等级增加{0}，生命增加{1}点，攻击增加{2}-{3}点，防御增加{4}点！";
    tmpAddPropertyArray.push({property:"dengji",min:1,max:1,am:"add",mmin:0});
    tmpAddPropertyArray.push({property:"shengming",min:JINGYAN_CHUJI_SHENGJI_SHENGMING_MIN,max:JINGYAN_CHUJI_SHENGJI_SHENGMING_MAX,am:"add",mmin:0});
    tmpAddPropertyArray.push({property:'gongjiMin',min:JINGYAN_CHUJI_SHENGJI_GONGJI_MIN_MIN,max:JINGYAN_CHUJI_SHENGJI_GONGJI_MIN_MAX,am:"add",mmin:0});
    tmpAddPropertyArray.push({property:'gongjiMax',min:JINGYAN_CHUJI_SHENGJI_GONGJI_MAX_MIN,max:JINGYAN_CHUJI_SHENGJI_GONGJI_MAX_MAX,am:"add",mmin:0});
    tmpAddPropertyArray.push({property:'fangyu',min:JINGYAN_CHUJI_SHENGJI_FANGYU_MIN,max:JINGYAN_CHUJI_SHENGJI_FANGYU_MAX,am:"add",mmin:0});
    tmpConditionPropertyName = 'jingyan',tmpConditionValue = JINGYAN_CHUJI_JINGYAN,tmpConditionDes = '你经验不够了！';
  } else if (p_shop_id == 654) {
    tmpAddSuccessDes = "你提升了五级！等级增加{0}，生命增加{1}点，攻击增加{2}-{3}点，防御增加{4}点！";
    tmpAddPropertyArray.push({property:"dengji",min:5,max:5,am:"add",mmin:0});
    tmpAddPropertyArray.push({property:"shengming",min:JINGYAN_GAOJI_SHENGJI_SHENGMING_MIN,max:JINGYAN_GAOJI_SHENGJI_SHENGMING_MAX,am:"add",mmin:0});
    tmpAddPropertyArray.push({property:'gongjiMin',min:JINGYAN_GAOJI_SHENGJI_GONGJI_MIN_MIN,max:JINGYAN_GAOJI_SHENGJI_GONGJI_MIN_MAX,am:"add",mmin:0});
    tmpAddPropertyArray.push({property:'gongjiMax',min:JINGYAN_GAOJI_SHENGJI_GONGJI_MAX_MIN,max:JINGYAN_GAOJI_SHENGJI_GONGJI_MAX_MAX,am:"add",mmin:0});
    tmpAddPropertyArray.push({property:'fangyu',min:JINGYAN_GAOJI_SHENGJI_FANGYU_MIN,max:JINGYAN_GAOJI_SHENGJI_FANGYU_MAX,am:"add",mmin:0});
    tmpConditionPropertyName = 'jingyan',tmpConditionValue = JINGYAN_GAOJI_JINGYAN,tmpConditionDes = '你经验不够了！';
  } else if (p_shop_id == 651) {
    tmpAddSuccessDes = "你购买了一把黄钥匙！";
    tmpAddPropertyArray.push({property:"huangyaoshi",min:1,max:1,am:"add",mmin:0});
    tmpConditionPropertyName = 'jinbi',tmpConditionValue = GOUMAI_HUANG_YAOSHI,tmpConditionDes = '你金币不够了！';
  } else if (p_shop_id == 653) {
    tmpAddSuccessDes = "你售出了一把黄钥匙！";
    tmpAddPropertyArray.push({property:"jinbi",min:SHOUCHU_HUANG_YAOSHI,max:SHOUCHU_HUANG_YAOSHI,am:"add",mmin:0});
    tmpConditionPropertyName = 'huangyaoshi',tmpConditionValue = 1,tmpConditionDes = '你黄钥匙没有了！';
  }
  return {
    addPropertyFlag:true,
    addPropertyObj:{
      des:tmpAddSuccessDes,
      property_array:tmpAddPropertyArray
    },
    conditionObj:{
      property:tmpConditionPropertyName,
      value:tmpConditionValue,
      des:tmpConditionDes
    }
  }
};

/**
 * 购买时选择的行为
 * @param p_shop_id    商店id，也就是对象的id
 */
GouMaiWin.prototype.click2 = function(p_shop_id) {
  var tmpAddSuccessDes,tmpAddPropertyArray = new Array();
  var tmpConditionPropertyName,tmpConditionValue,tmpConditionDes;
  if (p_shop_id == 605) {
    tmpAddSuccessDes = "你增加{0}-{1}点攻击！";
    tmpAddPropertyArray.push({property:'gongjiMin',min:JINBI_CHUJI_GONGJI_MIN_MIN,max:JINBI_CHUJI_GONGJI_MIN_MAX,am:"add",mmin:0});
    tmpAddPropertyArray.push({property:'gongjiMax',min:JINBI_CHUJI_GONGJI_MAX_MIN,max:JINBI_CHUJI_GONGJI_MAX_MAX,am:"add",mmin:0});
    tmpConditionPropertyName = 'jinbi',tmpConditionValue = JINBI_CHUJI_JINBI,tmpConditionDes = '你金币不够了！';
  } else if (p_shop_id == 652) {
    tmpAddSuccessDes = "你增加{0}-{1}点攻击！";
    tmpAddPropertyArray.push({property:'gongjiMin',min:JINBI_GAOJI_GONGJI_MIN_MIN,max:JINBI_GAOJI_GONGJI_MIN_MAX,am:"add",mmin:0});
    tmpAddPropertyArray.push({property:'gongjiMax',min:JINBI_GAOJI_GONGJI_MAX_MIN,max:JINBI_GAOJI_GONGJI_MAX_MAX,am:"add",mmin:0});
    tmpConditionPropertyName = 'jinbi',tmpConditionValue = JINBI_GAOJI_JINBI,tmpConditionDes = '你金币不够了！';
  } else if (p_shop_id == 650) {
    tmpAddSuccessDes = "你增加{0}-{1}点攻击！";
    tmpAddPropertyArray.push({property:'gongjiMin',min:JINGYAN_CHUJI_GONGJI_MIN_MIN,max:JINGYAN_CHUJI_GONGJI_MIN_MAX,am:"add",mmin:0});
    tmpAddPropertyArray.push({property:'gongjiMax',min:JINGYAN_CHUJI_GONGJI_MAX_MIN,max:JINGYAN_CHUJI_GONGJI_MAX_MAX,am:"add",mmin:0});
    tmpConditionPropertyName = 'jingyan',tmpConditionValue = JINGYAN_CHUJI_JINGYAN,tmpConditionDes = '你经验不够了！';
  } else if (p_shop_id == 654) {
    tmpAddSuccessDes = "你增加{0}-{1}点攻击！";
    tmpAddPropertyArray.push({property:'gongjiMin',min:JINGYAN_GAOJI_GONGJI_MIN_MIN,max:JINGYAN_GAOJI_GONGJI_MIN_MAX,am:"add",mmin:0});
    tmpAddPropertyArray.push({property:'gongjiMax',min:JINGYAN_GAOJI_GONGJI_MAX_MIN,max:JINGYAN_GAOJI_GONGJI_MAX_MAX,am:"add",mmin:0});
    tmpConditionPropertyName = 'jingyan',tmpConditionValue = JINGYAN_GAOJI_JINGYAN,tmpConditionDes = '你经验不够了！';
  } else if (p_shop_id == 651) {
    tmpAddSuccessDes = "你购买了一把蓝钥匙！";
    tmpAddPropertyArray.push({property:"lanyaoshi",min:1,max:1,am:"add",mmin:0});
    tmpConditionPropertyName = 'jinbi',tmpConditionValue = GOUMAI_LAN_YAOSHI,tmpConditionDes = '你金币不够了！';
  } else if (p_shop_id == 653) {
    tmpAddSuccessDes = "你售出了一把蓝钥匙！";
    tmpAddPropertyArray.push({property:"jinbi",min:SHOUCHU_LAN_YAOSHI,max:SHOUCHU_LAN_YAOSHI,am:"add",mmin:0});
    tmpConditionPropertyName = 'lanyaoshi',tmpConditionValue = 1,tmpConditionDes = '你蓝钥匙没有了！';
  }
  return {
    addPropertyFlag:true,
    addPropertyObj:{
      des:tmpAddSuccessDes,
      property_array:tmpAddPropertyArray
    },
    conditionObj:{
      property:tmpConditionPropertyName,
      value:tmpConditionValue,
      des:tmpConditionDes
    }
  }
};

/**
 * 购买时选择的行为
 * @param p_shop_id  商店id，也就是对象的id
 */
GouMaiWin.prototype.click3 = function(p_shop_id) {
  var tmpAddSuccessDes,tmpAddPropertyArray = new Array();
  var tmpConditionPropertyName,tmpConditionValue,tmpConditionDes;
  if (p_shop_id == 605) {
    tmpAddSuccessDes = "你增加{0}点防御！";
    tmpAddPropertyArray.push({property:'fangyu',min:JINBI_CHUJI_FANGYU_MIN,max:JINBI_CHUJI_FANGYU_MAX,am:"add",mmin:0});
    tmpConditionPropertyName = 'jinbi',tmpConditionValue = JINBI_CHUJI_JINBI,tmpConditionDes = '你金币不够了！';
  } else if (p_shop_id == 652) {
    tmpAddSuccessDes = "你增加{0}点防御！";
    tmpAddPropertyArray.push({property:'fangyu',min:JINBI_GAOJI_FANGYU_MIN,max:JINBI_GAOJI_FANGYU_MAX,am:"add",mmin:0});
    tmpConditionPropertyName = 'jinbi',tmpConditionValue = JINBI_GAOJI_JINBI,tmpConditionDes = '你金币不够了！';
  } else if (p_shop_id == 650) {
    tmpAddSuccessDes = "你增加{0}点防御！";
    tmpAddPropertyArray.push({property:'fangyu',min:JINGYAN_CHUJI_FANGYU_MIN,max:JINGYAN_CHUJI_FANGYU_MAX,am:"add",mmin:0});
    tmpConditionPropertyName = 'jingyan',tmpConditionValue = JINGYAN_CHUJI_JINGYAN,tmpConditionDes = '你经验不够了！';
  } else if (p_shop_id == 654) {
    tmpAddSuccessDes = "你增加{0}点防御！";
    tmpAddPropertyArray.push({property:'fangyu',min:JINGYAN_GAOJI_FANGYU_MIN,max:JINGYAN_GAOJI_FANGYU_MAX,am:"add",mmin:0});
    tmpConditionPropertyName = 'jingyan',tmpConditionValue = JINGYAN_GAOJI_JINGYAN,tmpConditionDes = '你经验不够了！';
  } else if (p_shop_id == 651) {
    tmpAddSuccessDes = "你购买了一把红钥匙！";
    tmpAddPropertyArray.push({property:"hongyaoshi",min:1,max:1,am:"add",mmin:0});
    tmpConditionPropertyName = 'jinbi',tmpConditionValue = GOUMAI_HONG_YAOSHI,tmpConditionDes = '你金币不够了！';
  } else if (p_shop_id == 653) {
    tmpAddSuccessDes = "你售出了一把红钥匙！";
    tmpAddPropertyArray.push({property:"jinbi",min:SHOUCHU_HONG_YAOSHI,max:SHOUCHU_HONG_YAOSHI,am:"add",mmin:0});
    tmpConditionPropertyName = 'hongyaoshi',tmpConditionValue = 1,tmpConditionDes = '你红钥匙没有了！';
  }
  return {
    addPropertyFlag:true,
    addPropertyObj:{
      des:tmpAddSuccessDes,
      property_array:tmpAddPropertyArray
    },
    conditionObj:{
      property:tmpConditionPropertyName,
      value:tmpConditionValue,
      des:tmpConditionDes
    }
  }
};

/**
 * 原来想购买速度，现在取消
 * 购买时选择的行为
 * @param p_shop_id 商店id，也就是对象的id
 */
GouMaiWin.prototype.click4 = function(p_shop_id) {
  var tmpAddSuccessDes,tmpAddPropertyArray = new Array();
  var tmpConditionPropertyName,tmpConditionValue,tmpConditionDes;
  var tmpAddPropertyFlag = false;
  //购买时没有速度
//  if (p_shop_id == 652) {
//    tmpAddPropertyFlag = true;
//    tmpAddSuccessDes = "你增加{0}点速度！";
//    tmpAddPropertyArray.push({property:'sudu',min:JINBI_GAOJI_SUDU_MIN,max:JINBI_GAOJI_SUDU_MAX,am:"minus",mmin:10});
//    tmpConditionPropertyName = 'jinbi',tmpConditionValue = JINBI_GAOJI_JINBI,tmpConditionDes = '你金币不够了！';
//  } else if(p_shop_id == 654){
//    tmpAddPropertyFlag = true;
//    tmpAddSuccessDes = "你增加{0}点速度！";
//    tmpAddPropertyArray.push({property:'sudu',min:JINGYAN_GAOJI_SUDU_MIN,max:JINGYAN_GAOJI_SUDU_MAX,am:"minus",mmin:10});
//    tmpConditionPropertyName = 'jingyan',tmpConditionValue = JINGYAN_GAOJI_JINGYAN,tmpConditionDes = '你经验不够了！';
//  }
  return {
    addPropertyFlag:tmpAddPropertyFlag,
    addPropertyObj:{
      des:tmpAddSuccessDes,
      property_array:tmpAddPropertyArray
    },
    conditionObj:{
      property:tmpConditionPropertyName,
      value:tmpConditionValue,
      des:tmpConditionDes
    }
  }
};

/**
 * 关闭购买框
 * @param p_action 在关闭完对话框后需要添加的行为
 */
GouMaiWin.prototype.close = function(p_action) {
  this.player.isMoveing = true;
  this.player.isGouMai = false;
  this.pageContainer.css('display', 'none');
  if (p_action) {
    p_action();
  }
};