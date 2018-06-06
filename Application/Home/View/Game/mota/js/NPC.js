//NPC对象
function NPC(p_id, p_image_id, p_speak_array) {
  this.id = p_id;
  this.imageId = p_image_id;
  this.image = IMAGE_PATH + p_image_id + ".jpg";
  this.speakArray = p_speak_array;
  this.viewSpeakNum = new Array();
  this.visitNum = 0;
  this.action = 0;
  this.jiangli = new Array();
  for (var i = 0; i < p_speak_array.length; i++) {
    this.viewSpeakNum[i] = 0;
  }
}
//显示说话
NPC.prototype.getSpeakMsg = function() {
  return this.speakArray[this.visitNum].speaking[this.viewSpeakNum[this.visitNum]];
};
//说话是否结束
NPC.prototype.isSpeakEnd = function() {
  if (this.speakArray[this.visitNum].speaking.length == this.viewSpeakNum[this.visitNum] + 1) {
    return true;
  } else {
    this.viewSpeakNum[this.visitNum]++;
    return false;
  }
};
//获得奖励
NPC.prototype.geiyuJiangLi = function(p_player) {
  if (!this.speakArray[this.action].geiyu) {
    addPlayerProperty(p_player, null, {
      des:"",
      property_array:this.speakArray[this.action].jiangli
    }, null);
    this.speakArray[this.action].geiyu = true;
    p_player.updatePageInfo();
  }
};
//克隆属性
NPC.prototype.clone = function() {
  return new NPC(this.id, this.imageId, this.speakArray);
};