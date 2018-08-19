<?php
namespace Home\Controller;
use Think\Controller;

class VistorController extends Controller {
	protected function _initialize() {
		$Vistor = M('vistor');
		$Vistor->create();
		$Vistor->lk = $_SERVER['PHP_SELF'];
		$Vistor->ip = ip2long(get_client_ip());
		$Vistor->ag = $_SERVER['HTTP_USER_AGENT'];
		$Vistor->tm = date('Y-m-d H:i:s');
		$result = $Vistor->add();
	}
}