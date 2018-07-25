<?php
namespace Home\Controller;
use Think\Controller;

class GameController extends Controller {
    public function index(){
		$Game = M('game');
		$where = "1 = 1";
		$list = $Game->field(true)->where($where)->order('rand()')->select();
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
		$this->assign('list', $list); // 赋值数据集
		$this->assign('keyword', $q); // 赋值数据集
		$this->assign('meta_title', "搜索游戏");
		$this->display(); // 模版输出
	}
	
	public function _empty($name){
		$this->showGame($name);
	}
	
	public function showGame($name){
		echo "<iframe src='".__ROOT__."/Application/Home/View/Game/".$name."/' height='97%' width='100%' frameborder='0' scrolling='yes'></iframe>";
	}
}