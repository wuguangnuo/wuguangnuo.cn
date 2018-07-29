<?php
namespace Home\Controller;
use Think\Controller;

class ToolController extends Controller {
    public function index(){
		$Tool = M('tool');
		$where = "1 = 1";
		$list = $Tool->field(true)->where($where)->order('rand()')->select();
		$this->assign('list', $list); // 赋值数据集
		$this->assign('meta_title', "工具箱");
		$this->display(); // 模版输出
    }
	
	public function search($q = 'null') {
		$Tool = M('tool');
		if($q == 'null'){
			$where = "1 = 1";
		}else{
			$where['tool_title'] = array('like', '%'.$q.'%'); // 查询条件
			$where['tool_author'] = array('like', '%'.$q.'%');
			$where['tool_img'] = array('like', '%'.$q.'%');
			$where['_logic'] = 'or';
		}
		$list = $Tool->field(true)->where($where)->order('id asc')->select();
		$this->assign('list', $list); // 赋值数据集
		$this->assign('keyword', $q); // 赋值数据集
		$this->assign('meta_title', "搜索工具");
		$this->display(); // 模版输出
	}
		
	public function _empty($name){
		$fileName = 'Application/Home/View/Tool/'.$name;
		if(is_dir($fileName)){
			$this->showApp($name);
		}else{
			$this->error("资源不存在");
		}
	}
	
	public function showApp($name){
		$this->assign('link', __ROOT__."/Application/Home/View/Tool/".$name);
		$this->display('./Application/Home/View/Public/showApp.html');
	}
}