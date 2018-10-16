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
	
	public function chart() {
		$this->assign('meta_title', '访客统计');
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
		$p = getpage($count, 20);
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
	
	public function loadChart() {
		$Vistor = D('vistor');
		$allDate = array_column($Vistor->getCountGroupDate('all'), 'ddate');

		$data['title'] = array('text' => '访客类型统计图');
		$data['tooltip'] = array('trigger' => 'axis');
		$data['legend'] = array('data' => array('总访问量', '访客', '谷歌蜘蛛', '必应蜘蛛', 'Ahrefs蜘蛛', 'MJ12蜘蛛', 'Archive蜘蛛'));
		$data['xAxis'] = array('type' => 'category', 'boundaryGap' => false, 'data' => $allDate);
		$data['yAxis'] = array('type' => 'value');
		$data['series'] = array(array('name' => '总访问量', 'type' => 'line', 'data' => array_column($Vistor->getCountGroupDate('all'), 'num')),
								array('name' => '访客', 'type' => 'line', 'data' => array_column($Vistor->getCountGroupDate('guest'), 'num')),
								array('name' => '谷歌蜘蛛', 'type' => 'line', 'data' => array_column($Vistor->getCountGroupDate('Googlebot'), 'num')),
								array('name' => '必应蜘蛛', 'type' => 'line', 'data' => array_column($Vistor->getCountGroupDate('bingbot'), 'num')),
								array('name' => 'Ahrefs蜘蛛', 'type' => 'line', 'data' => array_column($Vistor->getCountGroupDate('AhrefsBot'), 'num')),
								array('name' => 'MJ12蜘蛛', 'type' => 'line', 'data' => array_column($Vistor->getCountGroupDate('MJ12bot'), 'num')),
								array('name' => 'Archive蜘蛛', 'type' => 'line', 'data' => array_column($Vistor->getCountGroupDate('AhrefsBot'), 'num')));
		$this->ajaxReturn($data);
	}
}