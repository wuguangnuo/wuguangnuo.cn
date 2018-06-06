/**
 * 基本物品对象
 * @param p_id        物品ID
 * @param p_name      物品名称
 * @param p_image_id  对应图片的id
 */
function BaseGoods(p_id, p_name, p_image_id) {
  this.id = p_id;
  this.name = p_name;
  this.imageId = p_image_id;
  this.image = IMAGE_PATH + p_image_id + ".jpg";
}

/**
 * 克隆属性
 */
BaseGoods.prototype.clone = function() {
  return new BaseGoods(this.id, this.name, this.imageId);
};