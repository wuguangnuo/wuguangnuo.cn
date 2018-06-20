<?php
namespace Admin\Controller;
use Think\Controller;

class ToolController extends AdminController {
	public function index(){
		$this->assign('meta_title', "Tool管理");
		$this->display();
	}
	
	public function add(){
		$this->assign('meta_title', "添加Tool");
		$this->display();
	}
	
	public function insert(){//添加数据
		$Form = M('tool');
		$Form->create();
		$result = $Form->add();
		if($result) {
			$this->success('操作成功！');
		}else{
			$this->error('写入错误！');
		}
	}
	
	public function read($id = 1){//读取数据，同select
		$Form = M('tool');
		//读取数据
		$data = $Form->find($id);
		//$Form->where('id=1')->getField('title');//直接获取
		if($data) {
			$this->data = $data;// 模板变量赋值
		}else{
			$this->error('没找到');
		}
		$this->display();
	}
}