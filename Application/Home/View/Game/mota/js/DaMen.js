/**
 * 大门对象
 * @param p_id          物品ID
 * @param p_name        物品名称
 * @param p_image_id    对应图片的id
 * @param p_condition_property_name  需要玩家那个属性，属性默认1
 * @param p_success_des  玩家属性符合大门开启条件的文字描述
 * @param p_failed_des   玩家属性不符合大门开启条件的文字描述
 */
function DaMen(p_id, p_name, p_image_id, p_condition_property_name, p_success_des, p_failed_des) {
  this.id = p_id;
  this.name = p_name;
  this.imageId = p_image_id;
  this.conditionPropertyName = p_condition_property_name;
  this.successDes = p_success_des;
  this.failedDes = p_failed_des;
  this.image = IMAGE_PATH + p_image_id + ".jpg";
}

//克隆属性
DaMen.prototype.clone = function() {
  return new DaMen(this.id, this.name, this.imageId, this.conditionPropertyName, this.successDes, this.failedDes);
};