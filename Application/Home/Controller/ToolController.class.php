<?php
namespace Home\Controller;
use Think\Controller;

class ToolController extends VistorController {
	public function index($k = null) {
		$Tool = M('tool');
		if($k == null){
			$where = "1 = 1";
			$meta_title = '工具箱';
		}else{
			$where['tool_title'] = array('like', '%'.$k.'%'); // 查询条件
			$where['tool_author'] = array('like', '%'.$k.'%');
			$where['tool_img'] = array('like', '%'.$k.'%');
			$where['_logic'] = 'or';
			$meta_title = '搜索工具：' . $k;
		}
		$list = $Tool->field(true)->where($where)->order('rand()')->select();
		foreach($list as &$tool){
			if(!strpos($tool['tool_link'], '://')){
				$tool['tool_link'] = __ROOT__.'/tool/'.$tool['tool_link'];
			}
		}
		$this->assign('list', $list); // 赋值数据集
		$this->assign('meta_title', $meta_title);
		$this->display(); // 模版输出
    }
		
	public function _empty($name){
		$fileName = 'Application/Home/View/Tool/'.$name;
		if(is_dir($fileName)){
			$this->assign('link', __ROOT__."/Application/Home/View/Tool/".$name);
		}else{
			$this->assign('link', C('WUGN.COSWEB')."/cdn/tool/".$name);
		}
		$this->display('./Application/Home/View/Public/showApp.html');
	}
}