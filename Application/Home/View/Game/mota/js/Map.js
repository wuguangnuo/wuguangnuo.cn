//定义地图格子图片数组
//为了更快的显示地图，预先定义一个图片数组，在每个楼层切换时，把图片的src从新指向
var __map_grid_images = new Array();

/**
 * 定义地图
 * @param p_floor      地图楼层
 * @param p_goods_id   地图内的物品数组【地图内所有物品的id 是一个二维数组】
 * @param p_location_up    地图的上楼位置
 * @param p_location_down  地图的下楼位置
 * @param p_all_goods_array  所有物品的一个数组
 */
function Map(p_floor, p_goods_id, p_location_up, p_location_down, p_all_goods_array) {
  this.floor = p_floor;
  this.datas = p_goods_id;
  this.up = p_location_up;
  this.down = p_location_down;
  this.rows = p_goods_id.length - 1;
  this.columns = p_goods_id[0].length - 1;
  for (var i = 0; i < this.datas.length; i++) {
    for (var j = 0; j < this.datas[i].length; j++) {
      this.datas[i][j] = p_all_goods_array[this.datas[i][j]].clone();
    }
  }
}

/**
 * 获得某一位置上的地图对象
 * @param p_location   位置对象
 */
Map.prototype.getLocationObj = function(p_location) {
  return this.datas[p_location.y][p_location.x];
};

/**
 * 显示地图
 * @param p_player   玩家对象
 * @param p_up_down  0 上楼楼梯 1 下楼楼梯
 */
Map.prototype.mapView = function(p_player, p_up_down) {
  //添加地图的img信息
  for (var i = 0; i < this.datas.length; i++) {
    if (!(__map_grid_images[i] instanceof Array)) {
      __map_grid_images[i] = new Array();
    }
    for (var j = 0; j < this.datas[i].length; j++) {
      var tmpImageObj = __map_grid_images[i][j];
      if (tmpImageObj == undefined) {
        tmpImageObj = $('<img src="' + this.datas[i][j].image + '" class="gameGrid"/>');
        __map_grid_images[i][j] = tmpImageObj;
        $('#gameFrame').append(tmpImageObj);
      } else {
        tmpImageObj.attr('src', this.datas[i][j].image);
      }
    }
  }
  //设置玩家位置信息
  var tmpLocation;
  if (p_up_down == 0) {
    tmpLocation = this.up;
    p_player.pagePlayer.css("background-image", "url('" + p_player.imageDown + "')");
  } else {
    tmpLocation = this.down;
    p_player.pagePlayer.css("background-image", "url('" + p_player.imageUp + "')");
  }
  p_player.pagePlayer.css('left', tmpLocation.x * GRID_WIDTH).css('top', tmpLocation.y * GRID_HEIGHT);
  p_player.location = tmpLocation;
  p_player.property['floor'] = this.floor;
  p_player.isMoveing = true;
  p_player.updatePageInfo();
};
/**
 * 改变地图内容
 * @param p_location 位置
 * @param p_wupin    物品对象
 */
Map.prototype.changeMapContent = function(p_location, p_wupin) {
  this.datas[p_location.y][p_location.x] = p_wupin.clone();
  __map_grid_images[p_location.y][p_location.x].attr('src', p_wupin.image);
};
