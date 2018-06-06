<?php
namespace Home\Controller;
use Think\Controller;

class DocController extends Controller {
    public function index(){
		$Doc = M('doc');
		$where = "1 = 1";
		$list = $Doc->field(true)->where($where)->order('rand()')->select(); // 结果随机排序
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
		$this->assign('list', $list); // 赋值数据集
		$this->assign('keyword', $q); // 赋值数据集
		$this->assign('meta_title', "搜索文档");
		$this->display(); // 模版输出
	}
}