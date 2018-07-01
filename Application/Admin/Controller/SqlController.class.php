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
		$data['execute'] = $Form->execute($_POST['sql']);
		$data['sql'] = cut_str($_POST['sql'], 50, true);
		$data['query'] = cut_str(htmlspecialchars(json_encode($Form->query($_POST['sql']), 320)), 3000, true); // 截取，转义，编码(JSON_UNESCAPED_UNICODE(256) + JSON_UNESCAPED_SLASHES(64))，查询
		$this->ajaxReturn($data); // 默认JSON格式返回
	}
}