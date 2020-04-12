<?php
namespace Home\Controller;
use Think\Controller;

class VistorController extends Controller {
	protected function _initialize() {
		// 修复IP过大问题，适应数据库int(4)
		$ip = get_client_ip(1, false);
		if($ip > 128*256*256*256){
			$ip -= 256*256*256*256;
		}
		
		$Vistor = M('vistor');
		$Vistor->create();
		$Vistor->lk = $_SERVER['PHP_SELF'];
		$Vistor->ip = $ip;
		$Vistor->ag = $_SERVER['HTTP_USER_AGENT'];
		$Vistor->tm = date('Y-m-d H:i:s');
		$Vistor->add();
	}
}