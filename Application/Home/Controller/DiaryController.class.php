<?php
namespace Home\Controller;
use Think\Controller;

class DiaryController extends VistorController {
    public function index(){
		$this->assign('meta_title', "日记");
		$Diary = M('diary');
		$data = $Diary->field('diary_title,diary_content,year(diary_date),month(diary_date),day(diary_date)')->order('diary_date desc')->limit(1)->find();
		
		$month_str = 'NULL,Jan,Feb,Mar,Apr,May,June,July,Aug,Sept,Oct,Nov,Dec';
		$month_arr = explode(',', $month_str);
		$data['month(diary_date)'] = $month_arr[$data['month(diary_date)']];
		
		$this->data = $data; // 模板变量赋值
		$this->display();
    }
}