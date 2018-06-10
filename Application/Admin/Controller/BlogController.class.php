<?php
namespace Admin\Controller;
use Think\Controller;

class BlogController extends Controller {
    public function index(){
		$this->show("<a href='./add'>add</a><br /><a href='./read'>read</a>");
    }
	
	public function insert(){//添加数据
		$Form = M('blog');
		$Form->create();
		$Form->post_date = $_POST['post_time1'] . ' ' . $_POST['post_time2'] . ':00';
		$Form->post_content = $_POST['post_content']; // 防止HTML转义
		$result = $Form->add();
		if($result) {
			$this->success('操作成功！');
		}else{
			$this->error('写入错误！');
		}
	}
	
	public function read($id = 1){//读取数据，同select
		$Form = M('blog');
		//读取数据
		$data = $Form->find($id);
		//$Form->where('id=1')->getField('title');//直接获取
		if($data) {
			$this->data = $data;// 模板变量赋值
		}else{
			$this->error('没找到');
		}
		$this->display();
	}
	
	public function add(){
		$Form = M('blog');
		$data = $Form->field('year(post_date),month(post_date),day(post_date)')->order('id desc')->limit(1)->find(); // 获取最后一天
		$post_month = $data['month(post_date)']>9?$data['month(post_date)']:'0'.$data['month(post_date)']; // 将小于 10 的补 0
		$post_day = $data['day(post_date)']>9?$data['day(post_date)']:'0'.$data['day(post_date)'];
		$laseDate = $data['year(post_date)'].'-'.$post_month.'-'.$post_day;
		$this->assign('laseDate', $laseDate);
		$this->display();
	}
}