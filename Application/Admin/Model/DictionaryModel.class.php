<?php
namespace Admin\Model;
use Think\Model;

class DictionaryModel extends Model {
	public function getDictionary($group_key) {
		$where['group_key'] = $group_key;
		return $this->field('code_index,code_note,group_concat(code_value)as code_value')->where($where)->group('code_index')->order('id asc')->select();
	}
}
?>