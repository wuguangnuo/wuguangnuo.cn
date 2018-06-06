<?php
namespace Home\Controller;
use Think\Controller;

class IndexController extends Controller {
    public function index(){
		$this->assign('meta_title', "首页");
		$this->display(); // 模版输出
    }
}