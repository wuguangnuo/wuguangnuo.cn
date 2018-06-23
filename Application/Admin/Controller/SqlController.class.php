<?php
namespace Admin\Controller;
use Think\Controller;

class SqlController extends AdminController {
	public function index(){
		$this->assign('meta_title', "SQL管理");
		$this->display();
	}
	
	public function query(){
		$Form = M();
		$data['result'] = $Form->execute($_POST['sql']);
		$data['info'] = cut_str($_POST['sql'], 50, true);
		$this->ajaxReturn($data); // 默认JSON格式返回
	}
}