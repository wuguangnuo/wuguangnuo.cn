<?php
namespace Home\Controller;
use Think\Controller;

class DemoController extends Controller {
     public function index(){
		$Demo = M('demo');
		$where = "1 = 1";
		$list = $Demo->field(true)->where($where)->order('rand()')->select(); // 结果随机排序
		$this->assign('list', $list); // 赋值数据集
		$this->assign('meta_title', "DEMO");
		$this->display(); // 模版输出
    }
	
	public function search($q = 'null') {
		$Demo = M('demo');
		if($q == 'null'){
			$where = "1 = 1";
		}else{
			$where['demo_title'] = array('like', '%'.$q.'%'); // 查询条件
			$where['demo_author'] = array('like', '%'.$q.'%');
			$where['demo_img'] = array('like', '%'.$q.'%');
			$where['_logic'] = 'or';
		}
		$list = $Demo->field(true)->where($where)->order('id asc')->select();
		$this->assign('list', $list); // 赋值数据集
		$this->assign('keyword', $q); // 赋值数据集
		$this->assign('meta_title', "搜索DEMO");
		$this->display(); // 模版输出
	}
		
	public function _empty($name){
		$fileName = 'Application/Home/View/Demo/'.$name;
		if(is_dir($fileName)){
			$this->showApp($name);
		}else{
			$this->error("资源不存在");
		}
	}
	
	public function showApp($name){
		$this->assign('link', __ROOT__."/Application/Home/View/Demo/".$name);
		$this->display('./Application/Home/View/Public/showApp.html');
	}
}