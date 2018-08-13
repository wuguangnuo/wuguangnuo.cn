<?php
namespace Admin\Controller;
use Think\Controller;

class VistorController extends AdminController {
	public function index() {
		$Vistor = M('vistor');
		$list = $Vistor->field(true)->order('id desc')->limit('50')->select();
		$Location = new \Org\Net\IpLocation('UTFWry.dat');
		foreach($list as &$v) {
			$v['ip'] = long2ip($v['ip']);
			$v = array_merge($v, $Location->getlocation($v['ip']));
		}
		
		$this->assign('list', $list);
		$this->assign('meta_title', '访客统计');
		$this->display();
	}
}