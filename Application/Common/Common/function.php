<?php
//名字过长截断
function cut_str($str, $len, $tail=false){
	if(mb_strlen($str, 'utf-8') > $len){
		$str = mb_substr($str, 0, $len, 'utf-8');
		if($tail){
			$str .= '...';
		}
	}
	return $str;
}

/**
 * 分页类
 * TODO 基础分页的相同代码封装，使前台的代码更少
 * @param $count 要分页的总记录数
 * @param int $pagesize 每页查询条数
 * @return \Think\Page
 */
function getpage($count, $pagesize = 8) {
	$p = new Think\Page($count, $pagesize);
	$p->setConfig('header', '<br /><li class="rows">共<b>%TOTAL_ROW%</b>条记录 第<b>%NOW_PAGE%</b>页/共<b>%TOTAL_PAGE%</b>页</li>');
	$p->setConfig('prev', '上一页');
	$p->setConfig('next', '下一页');
	$p->setConfig('last', '末页');
	$p->setConfig('first', '首页');
	$p->setConfig('theme', '%FIRST%%UP_PAGE%%LINK_PAGE%%DOWN_PAGE%%END%%HEADER%');
	$p->lastSuffix = false; // 最后一页不显示为总页数
	return $p;
}
?>