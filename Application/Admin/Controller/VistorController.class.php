<?php
namespace Admin\Controller;
use Think\Controller;

class VistorController extends AdminController {
	public function index() {
		$Vistor = M('vistor');
		$list = $Vistor->field(true)->order('id desc')->limit('20')->select();
		$url = "http://ip.taobao.com/service/getIpInfo.php?ip=";
		foreach($list as &$v) {
			$v['ip'] = long2ip($v['ip']);
			$v = array_merge($v, (array)(json_decode(file_get_contents($url.$v['ip'])))->data);
		}
		
		$this->assign('list', $list);
		$this->assign('meta_title', '访客统计');
		$this->display();
	}
}