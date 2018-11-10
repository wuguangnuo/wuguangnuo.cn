<?php
namespace Home\Controller;
use Think\Controller;

class DocController extends VistorController {
	public function index($k = null) {
		$Doc = M('doc');
		if($k == null){
			$where = "1 = 1";
			$meta_title = '开发文档';
		}else{
			$where['doc_title'] = array('like', '%'.$k.'%'); // 查询条件
			$where['goc_img'] = array('like', '%'.$k.'%');
			$where['_logic'] = 'or';
			$meta_title = '搜索文档：' . $k;
		}
		$list = $Doc->field(true)->where($where)->order('rand()')->select(); // 结果随机排序
		foreach($list as &$doc){
			if(!strpos($doc['doc_link'], '://')){
				$doc['doc_link'] = __ROOT__.'/doc/'.$doc['doc_link'];
			}
		}
		$this->assign('list', $list); // 赋值数据集
		$this->assign('meta_title', $meta_title);
		$this->display(); // 模版输出
    }
}