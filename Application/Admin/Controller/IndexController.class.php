<?php
namespace Admin\Controller;
use Think\Controller;

class IndexController extends Controller {
	public function index() {
		if(isset($_SESSION['username']) && isset($_SESSION['password'])) {
			$User = M('user');
			$where['username'] = $_SESSION['username'];
			$where['password'] = $_SESSION['password'];
			$data = $User->where($where)->select();
			if($data) {
				$this->assign('username', $_SESSION['username']);
				$this->assign('meta_title', "管理首页");
				$this->display();
			} else {
				$this->redirect('Index/login', '', 1, '登录状态失效');
			}
		} else {
			$this->redirect('Index/login', '', 1, '未登录');
		}
	}
	
	// 登录
	public function login() {
		session_destroy();
		$v = new \Think\Verify();
		if(!empty($_POST['username']) && !empty($_POST['password']) && !empty($_POST['verify'])) {
			if($v->check($_POST['verify']) === true) {
				$User = M('user');
				$where['username'] = $_POST['username'];
				$where['password'] = md5($_POST['password']);
				$data = $User->where($where)->select();
				if($data) {
					if($data[0]['roleid'] == 1) {
						$User->login_at = date("Y-m-d H-i-s");
						$result = $User->where($where)->save();
						if($result) {
							session_start();
							$_SESSION['username'] = $_POST['username'];
							$_SESSION['password'] = md5($_POST['password']);
							$this->redirect('Index/index', '', 1, '登录中');
						} else {
							$this->assign('messages', "更新用户失败");
						}
					} else {
						$this->assign('messages', "权限不足");
					}
				} else {
					$this->assign('messages', "账号或密码错误");
				}
			} else {
				$this->assign('messages', "验证码错误");
			}
		} else {
			$this->assign('messages', "请填写完整");
		}
		$this->assign('meta_title', "登录");
		$this->display();
	}
	
	// 注销
	public function logout() {
		session_destroy();
		$this->redirect('Index/login', '', 1, '已注销');
	}
	
	// 验证码
	public function verify() {
		$Verify = new \Think\Verify();
		$Verify->useImgBg = false;
		$Verify->fontSize = 20;
		$Verify->useCurve = false;
		$Verify->useNoise = false;
		$Verify->length = 4;
		$Verify->entry();
	}
}