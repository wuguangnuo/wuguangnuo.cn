function SpeakDialogWin(p_player) {
  this.player = p_player;
  this.pageContainer = $('<div/>');
  this.pageContainer.append($('<div id="speakDialogInner"></div>')).
          append($('<div>******【按空格继续】******</div>')).addClass('speakDialogCss').css('display', 'none');
}

SpeakDialogWin.prototype.show = function(p_msg, p_action) {
  this.player.isMoveing = false;
  this.player.isSpeaking = true;
  $("#speakDialogInner", this.pageContainer).attr("innerHTML",p_msg);
  this.pageContainer.css('display', 'block');
  if (p_action) {
    p_action();
  }
};

SpeakDialogWin.prototype.close = function(p_action) {
  this.player.isMoveing = true;
  this.player.isSpeaking = false;
  this.pageContainer.css('display', 'none');
  if (p_action) {
    p_action();
  }
};