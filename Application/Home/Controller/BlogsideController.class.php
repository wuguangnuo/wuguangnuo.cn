<?php
namespace Home\Controller;
use Think\Controller;

class BlogsideController extends Controller {
	protected function _initialize() {
		$Blog = M('blog');
		$side = $Blog->field('id,post_title')->order('rand()')->limit(8)->select();
		foreach ($side as &$val) {
			$val['post_title_cut'] = cut_str($val['post_title'], 17, true);
		}
		$this->assign('side', $side);
	}
}