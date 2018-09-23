<?php
namespace Admin\Controller;
use Think\Controller;

class VistorController extends AdminController {
	public function index() {
		$Dic = D('dictionary');
		$link = $Dic->getDictionary('vistor_link');

		$this->assign('meta_title', '访客统计');
		$this->assign('link', $link);
		$this->display();
	}
	
	public function loadTable($link = null, $date1 = null, $date2 = null, $check = 'all') {
		if(!empty($link)){
			$arr = explode(',', $link);
			$where['lk'] = array('like', $arr, 'or');
		}
		if(!empty($date1) && !empty($date2)){
			if($date1 > $date2){
				$date1 = $date1 ^ $date2;
				$date2 = $date1 ^ $date2;
				$date1 = $date1 ^ $date2;
			}
			$where['tm'] = array('between',"$date1,$date2");
		} else if (!empty($date1)){
			$where['tm'] = array('gt',"$date1");
		} else if (!empty($date2)){
			$where['tm'] = array('lt',"$date2");
		}
		if($check == 'bot'){
			$where['ag'] = array('like',array('%spider%','%bot%'),'OR');
		} else if ($check == 'vis'){
			$where['ag'] = array('notlike',array('%spider%','%bot%'),'AND');
		} else {
			$where['ag'] = array('neq','null');
		}
		
		$Vistor = M('vistor');
		$count = $Vistor->where($where)->count();
		$p = getpage($count, 5);
		$list = $Vistor->field(true)->where($where)->order('id desc')->limit($p->firstRow, $p->listRows)->select();
		
		$Location = new \Org\Net\IpLocation('UTFWry.dat');
		foreach($list as &$v) {
			$v['ip'] = long2ip($v['ip']);
			$v['os'] = get_os($v['ag']);
			$v['br'] = get_br($v['ag']);
			$v = array_merge($v, $Location->getlocation($v['ip']));
		}
		$data['list'] = $list;
		$data['pages'] = $p->show();

		$this->ajaxReturn($data);
	}
}