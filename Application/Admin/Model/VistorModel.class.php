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
		$data = get_os_count($agent, $systemShow);
		return $data;
	}
	
	public function getBrowserCount($browserShow){
		$where['ag'] = array('notlike', '%bot%');
		$agent = $this->field('ag')->where($where)->select();
		$data = get_br_count($agent, $browserShow);
		return $data;
	}
}
?>