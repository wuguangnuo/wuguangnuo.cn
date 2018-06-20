<?php
namespace Admin\Controller;
use Think\Controller;

class IndexController extends Controller {
    public function index(){
		if(isset($_SESSION['username']) && isset($_SESSION['password'])){
			$User = M('user');
			$where['username'] = $_SESSION['username'];
			$where['password'] = $_SESSION['password'];
			$data = $User->where($where)->select();
			if($data) {
				$this->assign('username', $_SESSION['username']);
				$this->assign('meta_title', "管理首页");
				$this->display();
			}else{
				$this->redirect('Index/login','',1,'登录状态失效');
			}
		}
		else{
			$this->redirect('Index/login','',1,'未登录');
		}
    }
	
	// 登录
	public function login(){
		session_destroy();
		if(!empty($_POST['username']) && !empty($_POST['password'])){
			$User = M('user');
			$where['username'] = $_POST['username'];
			$where['password'] = md5($_POST['password']);
			$data = $User->where($where)->select();
			if($data) {
				session_start();
				$_SESSION['username'] = $_POST['username'];
				$_SESSION['password'] = md5($_POST['password']);
				$this->redirect('Index/index','',1,'登录中');
			}else{
				$this->assign('messages', "账号或密码错误");
			}
		}
		$this->assign('messages', "请输入账号密码");
		$this->assign('meta_title', "登录");
		$this->display();
	}
	
	// 注销
	public function logout(){
		session_destroy();
		$this->redirect('Index/login','',1,'已注销');
	}
}