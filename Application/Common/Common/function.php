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
?>