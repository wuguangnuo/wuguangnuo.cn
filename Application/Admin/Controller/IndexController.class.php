<?php
namespace Admin\Controller;
use Think\Controller;

class IndexController extends Controller {
	protected function _initialize() {
		$Vistor = M('vistor');
		$Vistor->create();
		$Vistor->lk = $_SERVER['PHP_SELF'];
		$Vistor->ip = ip2long(get_client_ip());
		$Vistor->ag = $_SERVER['HTTP_USER_AGENT'];
		$Vistor->tm = date('Y-m-d H:i:s');
		$Vistor->add();
	}
	
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
		session('username', null);
		session('password', null);
		if(IS_POST) {
			$username = I('post.username', '');
			$password = I('post.password', '');
			if($username && $password && I('post.verify/b', '')) {
				$Verify = new \Think\Verify();
				if($Verify->check(I('post.verify')) === true) {
					$User = M('user');
					$where['username'] = $username;
					$where['password'] = md5($password);
					$data = $User->where($where)->select();
					if(count($data) == 1) {
						if($data[0]['roleid'] == 1) {
							$User->login_at = date("Y-m-d H-i-s");
							$result = $User->where($where)->save();
							if($result) {
								session('username', $username);
								session('password', md5($password));
								$this->redirect('Index/index', '', 1, 'Signing in ...');
							} else {
								$msg = "更新用户失败";
							}
						} else {
							$msg = "权限不足";
						}
					} else {
						$msg = "账号或密码错误";
					}
				} else {
					$msg = "验证码错误";
				}
			} else {
				$msg = "请填写完整";
			}
		} else {
			$msg = "请填写用户信息";
		}
		$this->assign('messages', $msg);
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
		$Verify->codeSet = '0123456789';
		$Verify->entry();
	}
}