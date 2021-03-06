<?php
namespace Home\Controller;
use Think\Controller;

class BlogController extends BlogsideController {
    public function index() {
		$this->assign('meta_title', '諾的博客');
		$this->display();
    }
	
	public function loadTable($q = null, $t = null) {
		$q = characet($q);
		$Blog = M('blog');
		if(empty($q) && !empty($t)) {
			//按标签查询
			$arr = explode(',', $t);
			foreach($arr as &$val) {
				$val = '%'.$val.'%';
			}
			$where['post_type'] = array('like', $arr, 'or');
		} else {
			//普通查询
			if(empty($q)) {
				$where = '1 = 1';
			} else {
				$where['post_title'] = array('like', '%'.$q.'%');
				$where['post_author'] = array('like', '%'.$q.'%');
				$where['post_type'] = array('like', '%'.$q.'%');
				$where['post_from'] = array('like', '%'.$q.'%');
				$where['_logic'] = 'or';
			}
		}
		
		$count = $Blog->where($where)->count(); // 查询总数
		$p = getpage($count, 8); // 每页几个
		$list = $Blog->field(true)->where($where)->order('id desc')->limit($p->firstRow, $p->listRows)->select();
		
		foreach ($list as &$val) {
			$val['post_date'] = cut_str($val['post_date'], 16);
			$val['post_content'] = str_replace("\n", '\r\n', str_replace(PHP_EOL, '\r\n', htmlspecialchars(cut_str($val['post_content'], 300, true)))); // 简介,转义
		}
		$data['keyword'] = strtoupper($q ? '文章搜索：'.$q : ($t ? '文章分类：'.$t : '最近文章'));
		$data['list'] = $list;
		$data['pages'] = $p->show();

		$this->ajaxReturn($data);
	}
	
	public function read($id = 1) {
		$Blog = D('blog');
		$data = $Blog->find($id);
		if($data) {
			$data['post_content'] = srcToOriginal($data['post_content']);
			$this->data = $data;
		} else {
			$this->error('没找到');
		}
		$flippage = $Blog->getFlippage($id);
		
		$this->assign('meta_title', $data['post_title']);
		$this->assign('blog_data', $data);
		$this->flippage = $flippage;
		$this->display();
	}
	
	// SEO优化，取消接口调用
	public function loadBlog($id = null) {
		$Blog = D('blog');
		$result = null;
		if($id) {
			$result['data'] = $Blog->getBlogById($id);
		} else {
			$result['data'] = $Blog->getLast();
		}
		$result['flippage'] = $Blog->getFlippage($id);
		$result['data']['post_content'] = srcToOriginal($result['data']['post_content']);
		$this->ajaxReturn($result); 
	}
}
