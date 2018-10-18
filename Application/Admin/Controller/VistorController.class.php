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
		switch ($check){
		case 'bot':
			$where['ag'] = array('like',array('%spider%','%bot%'),'OR');
			break;
		case 'vis':
			$where['ag'] = array('notlike',array('%spider%','%bot%'),'AND');
			break;
		default:
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
	
	public function loadChart($type = 'vistor') {
		$Vistor = D('vistor');
		$Dic = D('dictionary');

		$vistorShow = array('all' => '总访问量', 'vistor' => '访客', 'Googlebot' => '谷歌蜘蛛', 'bingbot' => '必应蜘蛛', 'AhrefsBot' => 'Ahrefs蜘蛛', 'other' => '其他流量');
		$linkShow = array('all' => '访问总量', 'vistor' => '访客', 'spider' => '爬虫');
		$systemShow = array('win' => 'Windows', 'android' => '安卓', 'iphone' => 'iPhone', 'linux' => 'Linux', 'spider' => '网络蜘蛛', 'bot' => '机器人', 'sitemap' => '地图爬虫', 'other' => '其他系统');
		$browserShow = array('Firefox' => 'Firefox', 'MSIE' => 'IE', 'OPR' => 'Opera', 'Edge' => 'Edge', 'Chrome' => 'Chrome', 'Safari' => 'Safari', 'spider' => '网络蜘蛛', 'bot' => '机器人', 'sitemap' => '地图爬虫', 'other' => '其他客户端');

		switch ($type){
		case 'vistor':
			$countGroupDate = array();//临时存放数据，计算其余类型
			$vistorCountGroupDate = array_column($Vistor->getCountGroupDate('all'), 'num');//总量线
			$data['title'] = array('left' => '5%', 'text' => '访客类型统计图', 'subtext' => C('WUGN.WEB_SITE'));
			$data['tooltip'] = array('trigger' => 'axis');
			$data['legend'] = array('data' => array_values($vistorShow));
			$data['toolbox'] = array('right' => '5%', 'feature' => array('dataZoom' => array('yAxisIndex' => 'none'), 'restore' => array(), 'dataView' => array(), 'saveAsImage' => array()));
			$data['dataZoom'] = array(array('startValue' => '2018-09-20'), array('type' => 'inside'));
			$data['xAxis'] = array('type' => 'category', 'boundaryGap' => false, 'data' => array_column($Vistor->getCountGroupDate('all'), 'ddate'));
			$data['yAxis'] = array('type' => 'value');
			$data['series'] = array();
			foreach($vistorShow as $k=>$v) {
				if($k != 'other'){
					$temp = array_column($Vistor->getCountGroupDate($k), 'num');//本条线
					array_push($data['series'], array('name' => $v, 'type' => 'line', 'data' => $temp));
					foreach($temp as $i=>$j){
						$countGroupDate[$i] += $j;
					}
				}
			}
			foreach($countGroupDate as $k=>&$v){
				$v = $vistorCountGroupDate[$k] * 2 - $v;
			}
			array_push($data['series'], array('name' => '其他流量', 'type' => 'line', 'data' => $countGroupDate));
			break;
		case 'link':
			$data['title'] = array('left' => '5%', 'text' => '受访页面统计图', 'subtext' => C('WUGN.WEB_SITE'));
			$data['tooltip'] = array('trigger' => 'axis', 'axisPointer' => array('type' => 'cross'));
			$data['legend'] = array('data' => array_values($linkShow));
			$data['toolbox'] = array('right' => '5%', 'feature' => array('dataView' => array('readOnly' => true), 'magicType' => array('type' => array('line', 'bar')), 'restore' => array(), 'saveAsImage' => array()));
			$data['xAxis'] = array('type' => 'category', 'axisPointer' => array('type' => 'shadow'), 'data' => array_column($Dic->getDictionary('vistor_link'), 'code_note'));
			$data['yAxis'] = array('type' => 'value');
			$data['series'] = array();
			foreach($linkShow as $k=>$v){
				$temp = array_column($Vistor->getCountGroupLink($k), 'num');
				array_push($data['series'], array('name' => $v, 'type' => ($k=='all'?'line':'bar'), 'data' => $temp));
			}
			break;
		case 'system':
			$countGroupSystem = 0;//临时存放数据，计算其余类型
			$data['title'] = array('left' => '5%', 'text' => '操作系统统计图', 'subtext' => C('WUGN.WEB_SITE'));
			$data['tooltip'] = array('trigger' => 'item', 'formatter' => '{a}<br />{b}：{c}({d}%)');
			$data['legend'] = array('orient' => 'vertical', 'right' => '5%', 'data' => array_values($systemShow));
			$data['toolbox'] = array('right' => '5%', 'bottom' => '0', 'feature' => array('dataView' => array('readOnly' => true), 'restore' => array(), 'saveAsImage' => array()));
			$data['series'] = array('name' => '操作系统', 'type' => 'pie', 'itemStyle' => array('emphasis' => array('shadowBlur' => '10', 'shadowOffsetX' => '0', 'shadowColor' => 'rgba(0, 0, 0, 0.5)')), 'data' => array());
			foreach($systemShow as $k=>$v){
				if($k != 'other'){
					$value = $Vistor->getCountLike($k);
					array_push($data['series']['data'], array('value' => $value, 'name' => $v));
					$countGroupSystem += $value;
				}
			}//!!其他类型统计错误
			array_push($data['series']['data'], array('value' => abs($Vistor->getCountLike('') - $countGroupSystem), 'name' => '其他系统'));
			break;
		case 'browser':
			$countGroupBrowser = 0;//临时存放数据，计算其余类型
			$data['title'] = array('left' => '5%', 'text' => '用户客户端统计图', 'subtext' => C('WUGN.WEB_SITE'));
			$data['tooltip'] = array('trigger' => 'item', 'formatter' => '{a}<br />{b}：{c}({d}%)');
			$data['legend'] = array('orient' => 'vertical', 'right' => '5%', 'data' => array_values($browserShow));
			$data['toolbox'] = array('right' => '5%', 'bottom' => '0', 'feature' => array('dataView' => array('readOnly' => true), 'restore' => array(), 'saveAsImage' => array()));
			$data['series'] = array('name' => '客户端', 'type' => 'pie', 'itemStyle' => array('emphasis' => array('shadowBlur' => '10', 'shadowOffsetX' => '0', 'shadowColor' => 'rgba(0, 0, 0, 0.5)')), 'data' => array());
			foreach($browserShow as $k=>$v){
				if($k != 'other'){
					$value = $Vistor->getCountLike($k);
					array_push($data['series']['data'], array('value' => $value, 'name' => $v));
					$countGroupBrowser += $value;
				}
			}//!!其他类型统计错误
			array_push($data['series']['data'], array('value' => abs($Vistor->getCountLike('') - $countGroupBrowser), 'name' => '其他客户端'));
			break;
		}
		$this->ajaxReturn($data);
	}
}