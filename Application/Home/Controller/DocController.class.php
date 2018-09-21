<?php
namespace Home\Controller;
use Think\Controller;

class DocController extends VistorController {
    public function index(){
		$Doc = M('doc');
		$where = "1 = 1";
		$list = $Doc->field(true)->where($where)->order('rand()')->select(); // 结果随机排序
		foreach($list as &$doc){
			if(!strpos($doc['doc_link'], '://')){
				$doc['doc_link'] = __ROOT__.'/doc/'.$doc['doc_link'];
			}
			$fileName = 'Application/Home/View/Doc/img/'.$doc['doc_img'];
			$doc['doc_img'] = is_file($fileName)?$doc['doc_img']:'default.png';
		}
		$this->assign('list', $list); // 赋值数据集
		$this->assign('meta_title', "开发文档");
		$this->display(); // 模版输出
    }
	
	public function search($q = 'null') {
		$Doc = M('doc');
		if($q == 'null'){
			$where = "1 = 1";
		}else{
			$where['doc_title'] = array('like', '%'.$q.'%'); // 查询条件
			$where['goc_img'] = array('like', '%'.$q.'%');
			$where['_logic'] = 'or';
		}
		$list = $Doc->field(true)->where($where)->order('id asc')->select();
		foreach($list as &$doc){
			if(!strpos($doc['doc_link'], '://')){
				$doc['doc_link'] = __ROOT__.'/doc/'.$doc['doc_link'];
			}
			$fileName = 'Application/Home/View/Doc/img/'.$doc['doc_img'];
			$doc['doc_img'] = is_file($fileName)?$doc['doc_img']:'default.png';
		}
		$this->assign('list', $list); // 赋值数据集
		$this->assign('keyword', $q); // 赋值数据集
		$this->assign('meta_title', "搜索文档");
		$this->display(); // 模版输出
	}
}