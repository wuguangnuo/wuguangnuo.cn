<?php
namespace Home\Controller;
use Think\Controller;

class GameController extends VistorController {
	public function index($k = null) {
		$Game = M('game');
		if($k == null){
			$where = '1 = 1';
			$meta_title = 'H5游戏';
		}else{
			$where['game_title'] = array('like', '%'.$k.'%'); // 查询条件
			$where['game_author'] = array('like', '%'.$k.'%');
			$where['game_img'] = array('like', '%'.$k.'%');
			$where['_logic'] = 'or';
			$meta_title = '搜索游戏：' . $k;
		}
		$list = $Game->field(true)->where($where)->order('rand()')->select();
		foreach($list as &$game){
			if(!strpos($game['game_link'], '://')){
				$game['game_link'] = __ROOT__.'/game/'.$game['game_link'];
			}
		}
		$this->assign('list', $list); // 赋值数据集
		$this->assign('meta_title', $meta_title);
		$this->display(); // 模版输出
    }
	
	public function _empty($name){
		$fileName = 'Application/Home/View/Game/'.$name;
		if(is_dir($fileName)){
			$this->showApp($name);
		}else{
			$this->error("资源不存在");
		}
	}
	
	public function showApp($name){
		$this->assign('link', __ROOT__."/Application/Home/View/Game/".$name);
		$this->display('./Application/Home/View/Public/showApp.html');
	}
}