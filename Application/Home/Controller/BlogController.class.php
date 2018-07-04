<?php
namespace Home\Controller;
use Think\Controller;

class BlogController extends BlogsideController {
    public function index(){
		$Blog = M('blog');
		$where = "1 = 1"; // 查询条件
		$count = $Blog->where($where)->count(); // 查询总数
		$p = getpage($count, 8); // 每页几个
		$list = $Blog->field(true)->where($where)->order('id desc')->limit($p->firstRow, $p->listRows)->select();
		
		foreach ($list as $key=>&$val) {
			$val['post_date'] = cut_str($val['post_date'], 16);
			$val['post_content'] = cut_str(htmlspecialchars($val['post_content']), 150, true); // 简介,转义
		}
		
		$this->assign('meta_title', "諾的博客");
		$this->assign('list', $list); // 赋值数据集
		$this->assign('page', $p->show()); // 赋值分页输出
		$this->display();
    }
	
	public function read($id = 1){
		$Blog = M('blog');
		$data = $Blog->find($id);
		if($data) {
			$this->data = $data; // 模板变量赋值
		}else{
			$this->error('没找到');
		}
		$this->assign('meta_title', $data['post_title']);
		
		//上一篇
		$map['id'] = array('lt', $id);
		$lp = $Blog->Field('id,post_title')->where($map)->order('id desc')->limit(1)->find();
		if(!$lp) {
			$lp['id'] = $data['id'];
			$lp['post_title'] = "无";
		}

		//下一篇
		$map['id'] = array('gt', $id);
		$np = $Blog->Field('id,post_title')->where($map)->order('id')->limit(1)->find();
		if(!$np) {
			$np['id'] = $data['id'];
			$np['post_title'] = "无";
		}
		$lp['post_title'] = cut_str($lp['post_title'], 18, true);
		$np['post_title'] = cut_str($np['post_title'], 18, true);
		
		$this->lp = $lp;
		$this->np = $np;
		$this->display();
	}
	
	public function search($q = 'null') {
		$Blog = M('blog');
		if($q == 'null'){
			$where1 = "1 = 1";
			$where2 = "1 = 1";
		}else{
			$where1['post_title'] = array('like', '%'.$q.'%'); // 查询条件
			$where1['post_author'] = array('like', '%'.$q.'%');
			$where1['_logic'] = 'or'; // 搜索第一顺序
			$where2['post_type'] = array('like', '%'.$q.'%');
			$where2['post_from'] = array('like', '%'.$q.'%');
			$where2['_logic'] = 'or'; // 搜索第二顺序
		}
		$count = $Blog->where($where1)->where($where2)->count(); // 查询总数
		$p = getpage($count, 8); // 每页几个
		// 无法解决 union() 闭包用法问题，暂用原生SQL语句
		$list = $Blog->query("(SELECT * FROM wu_blog WHERE post_title LIKE '%".$q."%' OR post_author LIKE '%".$q."%' ORDER BY id DESC) UNION (SELECT * FROM wu_blog WHERE post_type LIKE '%".$q."%' OR post_from LIKE '%".$q."%' ORDER BY id DESC) LIMIT ".$p->firstRow.",".$p->listRows);
		
		foreach ($list as $key=>&$val) {
			$val['post_date'] = cut_str($val['post_date'], 16);
			$val['post_content'] = cut_str(htmlspecialchars($val['post_content']), 150, true); // 简介,转义
		}
		
		$this->assign('list', $list); // 赋值数据集
		$this->assign('keyword', $q); // 赋值数据集
		$this->assign('page', $p->show()); // 赋值分页输出
		$this->assign('meta_title', "搜索博客");
		$this->display(); // 模版输出
	
	}
}