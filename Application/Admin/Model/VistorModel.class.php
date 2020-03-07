<?php
namespace Admin\Model;
use Think\Model;

class VistorModel extends Model {
	public function getCountGroupDate($type){
		// 2020.03.07 修改sql,调整查询过慢的情况,改为最近90天
		$sql = "SELECT DATE(dday) AS ddate, COUNT(*) - 1 AS num
				FROM(
				SELECT datelist AS dday FROM wu_calendar WHERE DATE(datelist) BETWEEN DATE_SUB(CURDATE(), INTERVAL 90 DAY) AND CURDATE()
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
		$sql .= ") AND (DATE(tm) BETWEEN DATE_SUB(CURDATE(), INTERVAL 90 DAY) AND CURDATE())
				)T GROUP BY ddate ORDER BY ddate";
		return $this->query($sql);
	}
	
	public function getCountGroupLink($type, $date){
		$date1 = $date['date1'];
		$date2 = $date['date2'];
		if(!empty($date1) && !empty($date2)){
			$where['tm'] = array('between', "$date1,$date2");
		} else if (!empty($date1)){
			$where['tm'] = array('gt', "$date1");
		} else if (!empty($date2)){
			$where['tm'] = array('lt', "$date2");
		}
		
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

		$Dic = D('dictionary');
		$linkCode = array_column($Dic->getDictionary('vistor_link'), 'code_value');
		$data = array();
		foreach($linkCode as $v){
			$where['lk'] = array('like', explode(',', $v), 'or');
			array_push($data, $this->field('count(id) as num')->where($where)->find());
		}
		return $data;
	}
	/*
	public function getCountLike($type){
		$where['ag'] = array('like', "%{$type}%");
		$data = $this->field('count(id) as num')->where($where)->find();
		return $data['num'];
	}
	*/
	public function getSystemCount($systemShow, $date){
		$date1 = $date['date1'];
		$date2 = $date['date2'];
		if(!empty($date1) && !empty($date2)){
			$where['tm'] = array('between', "$date1,$date2");
		} else if (!empty($date1)){
			$where['tm'] = array('gt', "$date1");
		} else if (!empty($date2)){
			$where['tm'] = array('lt', "$date2");
		}

		$where['ag'] = array('notlike', '%bot%');
		$agent = $this->field('ag')->where($where)->select();
		$data = get_os_count($agent, $systemShow);
		return $data;
	}
	
	public function getBrowserCount($browserShow, $date){
		$date1 = $date['date1'];
		$date2 = $date['date2'];
		if(!empty($date1) && !empty($date2)){
			$where['tm'] = array('between', "$date1,$date2");
		} else if (!empty($date1)){
			$where['tm'] = array('gt', "$date1");
		} else if (!empty($date2)){
			$where['tm'] = array('lt', "$date2");
		}

		$where['ag'] = array('notlike', '%bot%');
		$agent = $this->field('ag')->where($where)->select();
		$data = get_br_count($agent, $browserShow);
		return $data;
	}
}
?>
