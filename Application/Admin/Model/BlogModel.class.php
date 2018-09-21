<?php
namespace Admin\Model;
use Think\Model;

class BlogModel extends Model {
	
	public function getLast() {
		$data = $this->field(true)->order('id desc')->limit(1)->select();
		return $data[0];
	}
}
?>