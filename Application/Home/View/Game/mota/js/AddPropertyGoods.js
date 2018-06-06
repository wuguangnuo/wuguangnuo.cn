/**
 * 增加属性物品
 * @param p_id        物品ID
 * @param p_name      物品名称
 * @param p_image_id  对应图片的id
 * @param p_add_property_array
 *        p_add_property_array 其中的元素{property:'属性名称',min:'最小值',max:'最大值',des:'描述'}
 * @param p_gain_goods_des      获得该物品时的描述信息
 * @param p_condition_obj       获得该物品需要的条件对象
 *        p_condition_obj{property:需要玩家那个属性,value:需要玩家的属性值,des:玩家没有达到这个条件时提示信息}
 */
function AddPropertyGoods(p_id, p_name, p_image_id, p_add_property_array, p_gain_goods_des, p_condition_obj) {
  this.id = p_id;
  this.name = p_name;
  this.imageId = p_image_id;
  this.addPropertyArray = p_add_property_array;
  this.gainGoodsDes = p_gain_goods_des;
  this.conditionObj = p_condition_obj;
  this.image = IMAGE_PATH + p_image_id + ".jpg";
}

/**
 * 克隆属性
 */
AddPropertyGoods.prototype.clone = function() {
  return new AddPropertyGoods(this.id, this.name, this.imageId, this.addPropertyArray, this.gainGoodsDes, this.conditionObj);
};