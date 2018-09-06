<?php
namespace Admin\Controller;
use Think\Controller;

class VistorController extends AdminController {
	public function index() {
		function get_os($sys) {
			if (preg_match('/\+http:\/\//i', $sys) && preg_match('/spider/i', $sys)) {
				$os = '网络蜘蛛';
			} else if (preg_match('/win/i', $sys) && strpos($sys, '95')) {
				$os = 'Windows 95';
			} else if (preg_match('/win/i', $sys) && preg_match('/98/i', $sys)) {
				$os = 'Windows 98';
			} else if (preg_match('/win/i', $sys) && preg_match('/nt 5/i', $sys)) {
				$os = 'Windows 2000';
			} else if (preg_match('/win 9x/i', $sys) && strpos($sys, '4.90')) {
				$os = 'Windows ME';
			} else if (preg_match('/win/i', $sys) && preg_match('/nt 5.1/i', $sys)) {
				$os = 'Windows XP';
			} else if (preg_match('/win/i', $sys) && preg_match('/nt 6.0/i', $sys)) {
				$os = 'Windows Vista';
			} else if (preg_match('/win/i', $sys) && preg_match('/nt 6.1/i', $sys)) {
				$os = 'Windows 7';
			} else if (preg_match('/win/i', $sys) && preg_match('/nt 6.2/i', $sys)) {
				$os = 'Windows 8';
			} else if (preg_match('/win/i', $sys) && preg_match('/nt 10.0/i', $sys)) {
				$os = 'Windows 10';
			} else if (preg_match('/win/i', $sys) && preg_match('/nt/i', $sys)) {
				$os = 'Windows NT';
			} else if (preg_match('/android ([\d\.]+)/i', $sys, $Android)) {
				$os = 'Android ' . $Android[1];
			} else if (preg_match('/iphone/i', $sys)) {
				$os = 'iPhone';
			} else if (preg_match('/ipad/i', $sys)) {
				$os = 'iPad';
			} else if (preg_match('/linux/i', $sys)) {
				$os = 'Linux';
			} else if (preg_match('/unix/i', $sys)) {
				$os = 'Unix';
			} else if (preg_match('/sun/i', $sys) && preg_match('/os/i', $sys)) {
				$os = 'SunOS';
			} else if (preg_match('/ibm/i', $sys) && preg_match('/os/i', $sys)) {
				$os = 'IBM OS/2';
			} else if (preg_match('/Mac/i', $sys) && preg_match('/PC/i', $sys)) {
				$os = 'Macintosh';
			} else if (preg_match('/Macintosh/i', $sys) && preg_match('/Mac/i', $sys)) {
				$os = 'MacOS';
			} else if (preg_match('/PowerPC/i', $sys)) {
				$os = 'PowerPC';
			} else if (preg_match('/AIX/i', $sys)) {
				$os = 'AIX';
			} else if (preg_match('/HPUX/i', $sys)) {
				$os = 'HPUX';
			} else if (preg_match('/NetBSD/i', $sys)) {
				$os = 'NetBSD';
			} else if (preg_match('/BSD/i', $sys)) {
				$os = 'BSD';
			} else if (preg_match('/OSF1/i', $sys)) {
				$os = 'OSF1';
			} else if (preg_match('/IRIX/i', $sys)) {
				$os = 'IRIX';
			} else if (preg_match('/FreeBSD/i', $sys)) {
				$os = 'FreeBSD';
			} else if (preg_match('/teleport/i', $sys)) {
				$os = 'teleport';
			} else if (preg_match('/flashget/i', $sys)) {
				$os = 'flashget';
			} else if (preg_match('/webzip/i', $sys)) {
				$os = 'webzip';
			} else if (preg_match('/offline/i', $sys)) {
				$os = 'offline';
			} else {
				$os = '未知操作系统';
			}
			return $os;
		}
		
		function get_br($agent) {
			if (preg_match('/\+http:\/\//i', $agent) && preg_match('/spider/i', $agent)) {
				$exp[0] = '网络蜘蛛';
				$exp[1] = '';
			} else if (stripos($agent, 'Firefox/')) {
				preg_match('/Firefox\/([^;)]+)+/i', $agent, $b);
				$exp[0] = 'Firefox';
				$exp[1] = $b[1]; //获取火狐浏览器的版本号
			} else if (stripos($agent, 'Maxthon')) {
				preg_match('/Maxthon\/([\d\.]+)/i', $agent, $aoyou);
				$exp[0] = 'Maxthon';
				$exp[1] = $aoyou[1];
			} else if (stripos($agent, 'MSIE')) {
				preg_match('/MSIE\s+([^;)]+)+/i', $agent, $ie);
				$exp[0] = 'IE';
				$exp[1] = $ie[1]; //获取IE的版本号
			} else if (stripos($agent, 'OPR')) {
				preg_match('/OPR\/([\d\.]+)/i', $agent, $opera);
				$exp[0] = 'Opera';
				$exp[1] = $opera[1];
			} else if (stripos($agent, 'Edge')) {
			//win10 Edge浏览器 添加了chrome内核标记 在判断Chrome之前匹配
				preg_match('/Edge\/([\d\.]+)/i', $agent, $Edge);
				$exp[0] = 'Edge';
				$exp[1] = $Edge[1];
			} else if (stripos($agent, 'Chrome')) {
				preg_match('/Chrome\/([\d\.]+)/i', $agent, $google);
				$exp[0] = 'Chrome';
				$exp[1] = $google[1]; //获取google chrome的版本号
			} else if (stripos($agent, 'Safari')) {
				preg_match('/Safari\/([\d\.]+)/i', $agent, $Safari);
				$exp[0] = 'Safari';
				$exp[1] = $Safari[1];
			} else if (stripos($agent, 'rv:') && stripos($agent, 'Gecko')) {
				preg_match('/rv:([\d\.]+)/i', $agent, $IE);
				$exp[0] = 'IE';
				$exp[1] = $IE[1];
			} else {
				$exp[0] = '未知浏览器';
				$exp[1] = '';
			}
			return $exp[0].'('.$exp[1].')';
		}
		
		$Vistor = M('vistor');
		$list = $Vistor->field(true)->order('id desc')->limit('50')->select();
		$Location = new \Org\Net\IpLocation('UTFWry.dat');
		foreach($list as &$v) {
			$v['ip'] = long2ip($v['ip']);
			$v['os'] = get_os($v['ag']);
			$v['br'] = get_br($v['ag']);
			$v = array_merge($v, $Location->getlocation($v['ip']));
		}
		
		$this->assign('list', $list);
		$this->assign('meta_title', '访客统计');
		$this->display();
	}
}