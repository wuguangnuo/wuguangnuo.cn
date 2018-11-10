<?php
namespace Home\Controller;
use Think\Controller;

class DemoController extends VistorController {
	public function index($k = null) {
		$Demo = M('demo');
		if($k == null){
			$where = "1 = 1";
			$meta_title = 'DEMO';
		}else{
			$where['demo_title'] = array('like', '%'.$k.'%'); // 查询条件
			$where['demo_author'] = array('like', '%'.$k.'%');
			$where['demo_img'] = array('like', '%'.$k.'%');
			$where['_logic'] = 'or';
			$meta_title = '搜索DEMO：' . $k;
		}
		$list = $Demo->field(true)->where($where)->order('rand()')->select(); // 结果随机排序
		foreach($list as &$demo){
			if(!strpos($demo['demo_link'], '://')){
				$demo['demo_link'] = __ROOT__.'/demo/'.$demo['demo_link'];
			}
		}
		$this->assign('list', $list); // 赋值数据集
		$this->assign('meta_title', $meta_title);
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