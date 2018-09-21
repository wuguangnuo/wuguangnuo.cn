<?php
namespace Admin\Controller;
use Think\Controller;

class BlogController extends AdminController {
	public function index(){
		$this->assign('meta_title', "Blog管理");
		$this->display();
	}
	
	public function add(){
		$Form = M('blog');
		$data = $Form->field('year(post_date),month(post_date),day(post_date)')->order('id desc')->limit(1)->find(); // 获取最后一天
		$post_month = $data['month(post_date)']>9?$data['month(post_date)']:'0'.$data['month(post_date)']; // 将小于 10 的补 0
		$post_day = $data['day(post_date)']>9?$data['day(post_date)']:'0'.$data['day(post_date)'];
		$laseDate = $data['year(post_date)'].'-'.$post_month.'-'.$post_day;
		$this->assign('laseDate', $laseDate);
		$this->assign('meta_title', "添加Blog");
		$this->display();
	}
	
	public function insert(){
		$Form = M('blog');
		$Form->create();
		$Form->post_content = I('post.post_content', 'get post error!', '');
		$result = $Form->add();
		if($result) {
			$this->ajaxReturn("1");
		}else{
			$this->ajaxReturn("save error!");
		}
	}
	
	public function read(){
		$Form = D('blog');
		$data = $Form->getLast();
		if($data) {
			$this->data = $data;
		}else{
			$this->error('没找到');
		}
		$this->display();
	}
}