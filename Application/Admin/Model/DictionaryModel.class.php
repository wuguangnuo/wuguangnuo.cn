<?php
namespace Admin\Model;
use Think\Model;

class DictionaryModel extends Model {
	public function getDictionary($group_key) {
		$where['group_key'] = $group_key;
		return $this->field(true)->where($where)->select();
	}
}
?>