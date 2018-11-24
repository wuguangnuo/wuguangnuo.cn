<?php
namespace Admin\Model;
use Think\Model;

class BlogModel extends Model {
	
	public function getLast() {
		return $this->field(true)->order('id desc')->limit(1)->find();
	}
	
	public function getNextID() {
		return $this->max('id') + 1;
	}
	
	public function getLastDate() {
		$data = $this->field('year(post_date),month(post_date),day(post_date)')->order('id desc')->limit(1)->find(); // 获取最后一天
		$post_month = $data['month(post_date)']>9?$data['month(post_date)']:'0'.$data['month(post_date)']; // 将小于 10 的补 0
		$post_day = $data['day(post_date)']>9?$data['day(post_date)']:'0'.$data['day(post_date)'];
		$lastDate = $data['year(post_date)'].'-'.$post_month.'-'.$post_day;
		return $lastDate;
	}
}
?>