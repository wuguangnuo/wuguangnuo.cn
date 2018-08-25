<?php
namespace Admin\Controller;
use Think\Controller;

class IndexController extends Controller {
	public function index() {
		if(session('?username') && session('?password')) {
			$User = M('user');
			$where['username'] = session('username');
			$where['password'] = session('password');
			$data = $User->where($where)->select();
			if($data) {
				$this->assign('username', session('username'));
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
		session(null);
		if($_POST['username'] && $_POST['password'] && $_POST['verify']) {
			$v = new \Think\Verify();
			if($v->check($_POST['verify']) === true) {
				$User = M('user');
				$where['username'] = $_POST['username'];
				$where['password'] = md5($_POST['password']);
				$data = $User->where($where)->select();
				if(count($data) == 1) {
					if($data[0]['roleid'] == 1) {
						$User->login_at = date("Y-m-d H-i-s");
						$result = $User->where($where)->save();
						if($result) {
							session('username', $_POST['username']);
							session('password', md5($_POST['password']));
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
		session(null);
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