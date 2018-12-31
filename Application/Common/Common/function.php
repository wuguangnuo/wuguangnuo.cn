<?php
/**
 * 名字过长截断
 */
function cut_str($str, $len, $tail=false){
	$str = strip_tags($str);
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
	$p->setConfig('header', '<span class="pageRemark">共<strong>%TOTAL_PAGE%</strong>页<strong>%TOTAL_ROW%</strong>条数据</span>');
	$p->setConfig('prev', '上一页');
	$p->setConfig('next', '下一页');
	$p->setConfig('last', '尾页');
	$p->setConfig('first', '首页');
	$p->setConfig('theme', '%FIRST%%UP_PAGE%%ELLIPSIS_LEFT%%LINK_PAGE%%ELLIPSIS_RIGHT%%DOWN_PAGE%%END%%PAGE_TURN%');
	$p->lastSuffix = false; // 最后一页不显示为总页数
	return $p;
}

/**
 * 图片地址 src 转换成 data-original
 */
function srcToOriginal($content = ''){
	$pregRule = "/<[img|IMG].*?src=[\'|\"](.*?(?:[\.jpg|\.jpeg|\.png|\.gif|\.bmp|\.webp]))[\'|\"].*?[\/]?>/";
	$content = preg_replace($pregRule, '<img data-original="${1}">', $content);
	return $content;
}

/**
 * 转码 UTF-8
 */
function characet($data){
	if(!empty($data)){
		$encode = mb_detect_encoding($data, array('ASCII', 'UTF-8', 'GB2312', 'GBK', 'LATIN1', 'BIG5')) ;
		if($encode != 'UTF-8'){
			$data = mb_convert_encoding($data ,'utf-8' , $encode);
		}
	}
	return $data;
}
?>