/**
 * 显示物品对象
 * @param p_id              物品ID
 * @param p_name            物品名称
 * @param p_image_id        对应图片的id
 * @param p_gain_goods_obj  获得物品对象
 *        p_gain_goods_obj {property：玩家的那个物品增加，des：获得物品时的描述，tipDes：替换物品描述中{0}，{1},这个{0}，{1}用来提示玩家文字，改变颜色和大小}
 */
function BaseViewGoods(p_id, p_name, p_image_id, p_gain_goods_obj) {
  this.id = p_id;
  this.name = p_name;
  this.imageId = p_image_id;
  this.image = IMAGE_PATH + p_image_id + ".jpg";
  this.gainGoodsObj = p_gain_goods_obj;
}

//克隆属性
BaseViewGoods.prototype.clone = function() {
  return new BaseViewGoods(this.id, this.name, this.imageId, this.gainGoodsObj);
};