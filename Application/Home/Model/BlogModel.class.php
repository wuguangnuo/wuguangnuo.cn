<?php
namespace Home\Model;
use Think\Model;

class BlogModel extends Model {
	
	public function getBlogById($id) {
		$where['id'] = array('eq', $id); 
		return $this->field(true)->where($where)->find();
	}
	
	// 获取最后一个
	public function getLast() {
		return $this->field(true)->order('id desc')->limit(1)->find();
	}
	
	// 获取上一个
	public function getPreviousPage($id) {
		$where['id'] = array('lt', $id);
		$previous = $this->field('id,post_title')->where($where)->order('id desc')->limit(1)->find();
		if(!$previous) {
			$previous['id'] = $id;
			$previous['post_title'] = '无';
		}
		$previous['post_title_cut'] = cut_str($previous['post_title'], 18, true);
		return $previous;
	}
	
	// 获取下一个
	public function getNextPage($id) {
		$where['id'] = array('gt', $id);
		$next = $this->field('id,post_title')->where($where)->order('id asc')->limit(1)->find();
		if(!$next) {
			$next['id'] = $id;
			$next['post_title'] = '无';
		}
		$next['post_title_cut'] = cut_str($next['post_title'], 18, true);
		return $next;
	}
	
	// 获取翻页
	public function getFlippage($id) {
		$flippage['previous'] = $this->getPreviousPage($id);
		$flippage['next'] = $this->getNextPage($id);
		return $flippage;
	}
}
?>