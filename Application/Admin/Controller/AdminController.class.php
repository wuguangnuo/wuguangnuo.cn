<?php
namespace Admin\Controller;
use Think\Controller;

class AdminController extends Controller {
	protected function _initialize() {
		if(session('?username') && session('?password')) {
			$User = M('user');
			$where['username'] = session('username');
			$where['password'] = session('password');
			$data = $User->where($where)->select();
			if($data) {
				$this->assign('username', session('username'));
			} else {
				$this->redirect('Index/login','',1,'登录状态失效');
			}
		}
		else {
			$this->redirect('Index/login','',1,'Please waitting ...');
		}
	}
}