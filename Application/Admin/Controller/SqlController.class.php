<?php
namespace Admin\Controller;
use Think\Controller;

class SqlController extends AdminController {
	public function query(){
		$Form = M();
		$data['result'] = $Form->execute($_POST['sql']); 
		$data['info'] = $_POST['sql'];
		$this->ajaxReturn($data); // 默认JSON格式返回
	}
}