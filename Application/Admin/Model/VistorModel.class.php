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

		if($type == 'all'){
			$sql .= "1=1";
		} else if($type == 'guest'){
			$sql .= "ag NOT LIKE '%spider%' AND ag NOT LIKE '%bot%' AND ag NOT LIKE '%sitemap%' AND ag NOT LIKE '%parser%'";
		} else if($type == 'sitemap'){
			$sql .= "ag LIKE '%sitemap%' OR ag LIKE '%parser%'";
		} else {
			$sql .= "(ag LIKE '%spider%' OR ag LIKE '%bot%') AND ag LIKE '%{$type}%'";
		}
		$sql .= ") AND (DATE(tm) BETWEEN '2018-08-12' AND CURDATE())
				)T GROUP BY ddate ORDER BY ddate";
		return $this->query($sql);
	}
}
?>