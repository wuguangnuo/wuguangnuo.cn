<?php
namespace Admin\Controller;
use Think\Controller;

class DiaryController extends AdminController {
	public function insert(){//添加数据
		$Form = M('diary');
		$Form->create();
		$Form->diary_date = $_POST['diary_time1'] . ' ' . $_POST['diary_time2'] . ':00';
		$Form->diary_content = $_POST['diary_content']; // 防止HTML转义
		$result = $Form->add();
		if($result) {
			$this->success('操作成功！');
		}else{
			$this->error('写入错误！');
		}
	}
	
	public function read($id = 1){//读取数据，同select
		$Form = M('diary');
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
}