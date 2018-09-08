<?php
namespace Admin\Model;
use Think\Model;

class BlogModel extends Model {
	
	public function getLast() {
		return $this->field(true)->order('id desc')->limit(1)->select();
	}
}
?>