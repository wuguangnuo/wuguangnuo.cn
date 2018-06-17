<?php
namespace Home\Controller;
use Think\Controller;

class BlogsideController extends Controller {
	protected function _initialize(){
		$Blog = M('blog');
		$side = $Blog->field('id,post_title')->order('rand()')->limit(8)->select();
		
		foreach ($side as $key=>&$val) {
			$val['post_title'] = cut_str($val['post_title'], 20, true);
		}
		$this->assign('side', $side); // 赋值数据集
	}
}