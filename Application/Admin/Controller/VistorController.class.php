<?php
namespace Admin\Controller;
use Think\Controller;

class VistorController extends AdminController {
	public function index() {
		$sql = 'SELECT ip FROM wu_vistor;';
		$url = "http://ip.taobao.com/service/getIpInfo.php?ip=";
		$Form = M();
		$data = json_encode($Form->query($sql), 320);
		$arr = json_decode($data, true);
		foreach($arr as $k=>$v) {
			$vistor[$k] = (array)(json_decode(file_get_contents($url.long2ip($v['ip']))))->data;
		}
		$this->assign('vistor', $vistor);
		$this->assign('meta_title', '访客统计');
		$this->display();
	}
}