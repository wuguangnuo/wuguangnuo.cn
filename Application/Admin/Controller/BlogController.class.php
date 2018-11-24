<?php
namespace Admin\Controller;
use Think\Controller;

class BlogController extends AdminController {
	public function index(){
		$this->assign('meta_title', "Blog管理");
		$this->display();
	}
	
	public function add(){
		$Form = D('blog');
		$this->assign('nextID', $Form->getNextID());
		$this->assign('lastDate', $Form->getLastDate());
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