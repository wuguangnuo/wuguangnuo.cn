<?php
namespace Home\Controller;
use Think\Controller;

class BlogController extends BlogsideController {
    public function index() {
		$Blog = M('blog');
		$where = '1 = 1';
		$count = $Blog->where($where)->count(); // 查询总数
		$p = getpage($count, 8); // 每页几个
		$list = $Blog->field(true)->where($where)->order('id desc')->limit($p->firstRow, $p->listRows)->select();
		
		foreach ($list as &$val) {
			$val['post_date'] = cut_str($val['post_date'], 16);
			$val['post_content'] = str_replace(PHP_EOL, '\r\n', htmlspecialchars(cut_str($val['post_content'], 300, true))); // 简介,转义
		}
		
		$this->assign('meta_title', '諾的博客');
		$this->assign('list', $list);
		$this->assign('page', $p->show());
		$this->display();
    }
	
	public function read($id = 1) {
		$Blog = M('blog');
		$data = $Blog->find($id);
		if($data) {
			$this->data = $data; // 模板变量赋值
		} else {
			$this->error('没找到');
		}
		$this->assign('meta_title', $data['post_title']);
		
		//上一篇
		$map['id'] = array('lt', $id);
		$lp = $Blog->field('id,post_title')->where($map)->order('id desc')->limit(1)->find();
		if(!$lp) {
			$lp['id'] = $data['id'];
			$lp['post_title'] = '无';
		}

		//下一篇
		$map['id'] = array('gt', $id);
		$np = $Blog->field('id,post_title')->where($map)->order('id')->limit(1)->find();
		if(!$np) {
			$np['id'] = $data['id'];
			$np['post_title'] = '无';
		}
		$lp['post_title_cut'] = cut_str($lp['post_title'], 18, true);
		$np['post_title_cut'] = cut_str($np['post_title'], 18, true);
		
		$this->lp = $lp;
		$this->np = $np;
		$this->display();
	}
	
	public function search($q = null, $t = null) {
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
			$val['post_content'] = str_replace(PHP_EOL, '\r\n', htmlspecialchars(cut_str($val['post_content'], 300, true))); // 简介,转义
		}
		$keyword = strtoupper($q?'文章搜索：'.$q:'文章分类：'.$t);
		
		$this->assign('list', $list);
		$this->assign('keyword', $keyword);
		$this->assign('page', $p->show()); // 赋值分页输出
		$this->assign('meta_title', '搜索博客');
		$this->display(); // 模版输出
	}
}