<?php
namespace Home\Controller;
use Think\Controller;

class IndexController extends VistorController {
    public function index(){
		$this->assign('meta_title', "首页");
		$this->display();
    }
}