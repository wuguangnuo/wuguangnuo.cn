<?php
namespace Admin\Controller;
use Think\Controller;

class IndexController extends Controller {
    public function index(){
		$this->assign('meta_title', "管理首页");
		$this->display();
    }
}