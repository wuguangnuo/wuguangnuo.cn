<?php
namespace Admin\Model;
use Think\Model;

class VistorModel extends Model {
	public function getCountGroupDate($type){
		$sql = "SELECT DATE(dday) AS ddate, COUNT(*) - 1 AS num
				FROM(
				SELECT datelist AS dday FROM wu_calendar WHERE DATE(datelist) BETWEEN '2018-08-12' AND CURDATE()
				UNION ALL
				SELECT tm FROM wu_vistor WHERE (";
		switch ($type){
		case 'all':
			$sql .= "1=1";
			break;
		case 'vistor':
			$sql .= "ag NOT LIKE '%spider%' AND ag NOT LIKE '%bot%' AND ag NOT LIKE '%sitemap%' AND ag NOT LIKE '%parser%'";
			break;
		case 'sitemap':
			$sql .= "ag LIKE '%sitemap%' OR ag LIKE '%parser%'";
			break;
		default:
			$sql .= "(ag LIKE '%spider%' OR ag LIKE '%bot%') AND ag LIKE '%{$type}%'";
		}
		$sql .= ") AND (DATE(tm) BETWEEN '2018-08-12' AND CURDATE())
				)T GROUP BY ddate ORDER BY ddate";
		return $this->query($sql);
	}
	
	public function getCountGroupLink($type){
		$Dic = D('dictionary');
		$linkCode = array_column($Dic->getDictionary('vistor_link'), 'code_value');

		switch ($type){
		case 'all':
			$where['ag'] = array('neq','null');
			break;
		case 'vistor':
			$where['ag'] = array('notlike',array('%spider%','%bot%'),'AND');
			break;
		case 'spider':
			$where['ag'] = array('like',array('%spider%','%bot%'),'OR');
			break;
		}
		
		$data = array();
		foreach($linkCode as $v){
			$where['lk'] = array('like', explode(',', $v), 'or');
			array_push($data, $this->field('count(id) as num')->where($where)->find());
		}
		return $data;
	}
	
	public function getCountLike($type){
		$where['ag'] = array('like', "%{$type}%");
		$data = $this->field('count(id) as num')->where($where)->find();
		return $data['num'];
	}
	
	public function getSystemCount($systemShow){
		$where['ag'] = array('notlike', '%bot%');
		$agent = $this->field('ag')->where($where)->select();
		foreach($agent as $v){
			$v = $v['ag'];
			if (preg_match('/sitemap/i', $v) || preg_match('/Parser/i', $v)) {
				$data['sitemap'] += 1;
			} else if (preg_match('/spider/i', $v)){
				$data['spider'] += 1;
			} else if (preg_match('/win/i', $v) && preg_match('/[^.\d]95/i', $v)) {
				$data['Windows 95'] += 1;
			} else if (preg_match('/win/i', $v) && preg_match('/[^.\d]98/i', $v)) {
				$data['Windows 98'] += 1;
			} else if (preg_match('/win/i', $v) && preg_match('/nt\s*5.0/i', $v)) {
				$data['Windows 2000'] += 1;
			} else if (preg_match('/win/i', $v) && preg_match('/nt\s*5.1/i', $v)) {
				$data['Windows XP'] += 1;
			} else if (preg_match('/win/i', $v) && preg_match('/nt\s*5.2/i', $v)) {
				$data['Windows XP'] += 1;
			} else if (preg_match('/win/i', $v) && preg_match('/nt\s*6.0/i', $v)) {
				$data['Windows Vista'] += 1;
			} else if (preg_match('/win/i', $v) && preg_match('/nt\s*6.1/i', $v)) {
				$data['Windows 7'] += 1;
			} else if (preg_match('/win/i', $v) && preg_match('/nt\s*6.2/i', $v)) {
				$data['Windows 8'] += 1;
			} else if (preg_match('/win/i', $v) && preg_match('/nt\s*10.0/i', $v)) {
				$data['Windows 10'] += 1;
			} else if (preg_match('/win/i', $v) && preg_match('/nt/i', $v)) {
				$data['Windows NT'] += 1;
			} else if (preg_match('/android\s*([\d\.]+)/i', $v, $Android)) {
				$data['Android'] += 1;
			} else if (preg_match('/iphone/i', $v)) {
				$data['iPhone'] += 1;
			} else if (preg_match('/ipad/i', $v)) {
				$data['iPad'] += 1;
			} else if (preg_match('/linux/i', $v)) {
				$data['Linux'] += 1;
			} else if (preg_match('/unix/i', $v)) {
				$data['Unix'] += 1;
			} else if (preg_match('/sun/i', $v) && preg_match('/os/i', $v)) {
				$data['SunOS'] += 1;
			} else if (preg_match('/ibm/i', $v) && preg_match('/os/i', $v)) {
				$data['IBM OS/2'] += 1;
			} else if (preg_match('/Mac/i', $v) && preg_match('/PC/i', $v)) {
				$data['Macintosh'] += 1;
			} else if (preg_match('/Macintosh/i', $v) && preg_match('/Mac/i', $v)) {
				$data['MacOS'] += 1;
			} else if (preg_match('/PowerPC/i', $v)) {
				$data['PowerPC'] += 1;
			} else if (preg_match('/AIX/i', $v)) {
				$data['AIX'] += 1;
			} else if (preg_match('/HPUX/i', $v)) {
				$data['HPUX'] += 1;
			} else if (preg_match('/NetBSD/i', $v)) {
				$data['NetBSD'] += 1;
			} else if (preg_match('/BSD/i', $v)) {
				$data['BSD'] += 1;
			} else if (preg_match('/OSF1/i', $v)) {
				$data['OSF1'] += 1;
			} else if (preg_match('/IRIX/i', $v)) {
				$data['IRIX'] += 1;
			} else if (preg_match('/FreeBSD/i', $v)) {
				$data['FreeBSD'] += 1;
			} else if (preg_match('/teleport/i', $v)) {
				$data['teleport'] += 1;
			} else if (preg_match('/flashget/i', $v)) {
				$data['flashget'] += 1;
			} else if (preg_match('/webzip/i', $v)) {
				$data['webzip'] += 1;
			} else if (preg_match('/offline/i', $v)) {
				$data['offline'] += 1;
			} else {
				$others += 1;
			}
		}
		arsort($data);//根据值降序排序
		foreach($data as $k=>&$v){
			if(!in_array($k, $systemShow)){
				$others += $v;
				unset($data[$k]);
			}
		}
		$data['others'] = $others;
		return($data);
	}
	
	public function getBrowserCount($browserShow){
		$where['ag'] = array('notlike', '%bot%');
		$agent = $this->field('ag')->where($where)->select();
		foreach($agent as $v){
			$v = $v['ag'];
			if (preg_match('/sitemap/i', $v) || preg_match('/Parser/i', $v)) {
				$data['sitemap'] += 1;
			} else if (preg_match('/spider/i', $v) || preg_match('/bot/i', $v)) {
				$data['spider'] += 1;
			} else if (stripos($v, 'Firefox/')) {
				$data['Firefox'] += 1;
			} else if (stripos($v, 'Maxthon')) {
				$data['Maxthon'] += 1;
			} else if (stripos($v, 'MSIE')) {
				$data['IE'] += 1;
			} else if (stripos($v, 'OPR')) {
				$data['Opera'] += 1;
			} else if (stripos($v, 'Edge')) {
				$data['Edge'] += 1;
			} else if (stripos($v, 'Chrome')) {
				$data['Chrome'] += 1;
			} else if (stripos($v, 'Safari')) {
				$data['Safari'] += 1;
			} else if (stripos($v, 'rv:') && stripos($v, 'Gecko')) {
				$data['IE'] += 1;
			} else {
				$others += 1;
			}
		}
		arsort($data);//根据值降序排序
		foreach($data as $k=>&$v){
			if(!in_array($k, $browserShow)){
				$others += $v;
				unset($data[$k]);
			}
		}
		$data['others'] = $others;
		return($data);
	}
}
?>