<?php
namespace Admin\Controller;
use Think\Controller;

class AdminController extends Controller {
	protected function _initialize(){
		if(isset($_SESSION['username']) && isset($_SESSION['password'])){
			$User = M('user');
			$where['username'] = $_SESSION['username'];
			$where['password'] = $_SESSION['password'];
			$data = $User->where($where)->select();
			if($data) {
				$this->assign('username', $_SESSION['username']);
			}else{
				$this->redirect('Index/login','',1,'登录状态失效');
			}
		}
		else{
			$this->redirect('Index/login','',1,'未登录');
		}
	}
}