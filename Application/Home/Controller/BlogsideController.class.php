<?php
namespace Home\Controller;
use Think\Controller;

class BlogsideController extends Controller {
	protected function _initialize() {
		$ip = get_client_ip(1, false);
		if($ip > 128*256*256*256){
			$ip -= 256*256*256*256;
		}
		$Vistor = M('visitor');
		$Vistor->create();
		$Vistor->lk = $_SERVER['SCRIPT_NAME'] . $_SERVER['PATH_INFO'];
		$Vistor->ip = $ip;
		$Vistor->ag = $_SERVER['HTTP_USER_AGENT'];
		$Vistor->tm = date('Y-m-d H:i:s');
		$Vistor->add();
		
		$Blog = M('blog');
		$side = $Blog->field('id,post_title')->order('rand()')->limit(8)->select();
		foreach ($side as &$val) {
			$val['post_title_cut'] = cut_str($val['post_title'], 17, true);
		}
		$this->assign('side', $side);
	}
}