<?php
namespace Admin\Controller;
use Think\Controller;

class UserController extends AdminController {
	public function index(){
		$this->assign('username', session('username'));
		$this->assign('meta_title', "个人中心");
		$this->display();
	}
}