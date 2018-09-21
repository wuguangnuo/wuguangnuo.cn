<?php
namespace Home\Controller;
use Think\Controller;

class GameController extends VistorController {
    public function index(){
		$Game = M('game');
		$where = "1 = 1";
		$list = $Game->field(true)->where($where)->order('rand()')->select();
		foreach($list as &$game){
			if(!strpos($game['game_link'], '://')){
				$game['game_link'] = __ROOT__.'/game/'.$game['game_link'];
			}
			$fileName = 'Application/Home/View/Game/img/'.$game['game_img'];
			$game['game_img'] = is_file($fileName)?$game['game_img']:'default.png';
		}
		$this->assign('list', $list); // 赋值数据集
		$this->assign('meta_title', "H5游戏");
		$this->display(); // 模版输出
    }
	
	public function search($q = 'null') {
		$Game = M('game');
		if($q == 'null'){
			$where = "1 = 1";
		}else{
			$where['game_title'] = array('like', '%'.$q.'%'); // 查询条件
			$where['game_author'] = array('like', '%'.$q.'%');
			$where['game_img'] = array('like', '%'.$q.'%');
			$where['_logic'] = 'or';
		}
		$list = $Game->field(true)->where($where)->order('id asc')->select();
		foreach($list as &$game){
			if(!strpos($game['game_link'], '://')){
				$game['game_link'] = __ROOT__.'/game/'.$game['game_link'];
			}
			$fileName = 'Application/Home/View/Game/img/'.$game['game_img'];
			$game['game_img'] = is_file($fileName)?$game['game_img']:'default.png';
		}
		$this->assign('list', $list); // 赋值数据集
		$this->assign('keyword', $q); // 赋值数据集
		$this->assign('meta_title', "搜索游戏");
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