<?php
namespace Home\Controller;
use Think\Controller;

class VistorController extends Controller {
	protected function _initialize() {
		
		function get_ip(){
			if ($_SERVER['REMOTE_ADDR']) { //判断SERVER里面有没有ip，因为用户访问的时候会自动给你网这里面存入一个ip
				$ip = $_SERVER['REMOTE_ADDR'];
			} elseif (getenv('REMOTE_ADDR')) { //如果没有去系统变量里面取一次 getenv()取系统变量的方法名字
				$ip = getenv('REMOTE_ADDR');
			} elseif (getenv('HTTP_CLIENT_IP')) { //如果还没有在去系统变量里取下客户端的ip
				$ip = getenv('HTTP_CLIENT_IP');
			} else {
				$ip = '0.0.0.0';
			}
			return ip2long($ip);
		}
		
		function get_broswer(){
			$sys = $_SERVER['HTTP_USER_AGENT']; //获取用户代理字符串
			if (stripos($sys, 'Firefox/') > 0) {
				preg_match('/Firefox\/([^;)]+)+/i', $sys, $b);
				$exp[0] = 'Firefox';
				$exp[1] = $b[1]; //获取火狐浏览器的版本号
			} elseif (stripos($sys, 'Maxthon') > 0) {
				preg_match('/Maxthon\/([\d\.]+)/', $sys, $aoyou);
				$exp[0] = 'Maxthon';
				$exp[1] = $aoyou[1];
			} elseif (stripos($sys, 'MSIE') > 0) {
				preg_match('/MSIE\s+([^;)]+)+/i', $sys, $ie);
				$exp[0] = 'IE';
				$exp[1] = $ie[1]; //获取IE的版本号
			} elseif (stripos($sys, 'OPR') > 0) {
				preg_match('/OPR\/([\d\.]+)/', $sys, $opera);
				$exp[0] = 'Opera';
				$exp[1] = $opera[1];
			} elseif(stripos($sys, 'Edge') > 0) {
			//win10 Edge浏览器 添加了chrome内核标记 在判断Chrome之前匹配
				preg_match('/Edge\/([\d\.]+)/', $sys, $Edge);
				$exp[0] = 'Edge';
				$exp[1] = $Edge[1];
			} elseif (stripos($sys, 'Chrome') > 0) {
				preg_match('/Chrome\/([\d\.]+)/', $sys, $google);
				$exp[0] = 'Chrome';
				$exp[1] = $google[1]; //获取google chrome的版本号
			} elseif(stripos($sys,'rv:')>0 && stripos($sys,'Gecko')>0){
				preg_match('/rv:([\d\.]+)/', $sys, $IE);
				$exp[0] = 'IE';
				$exp[1] = $IE[1];
			}else {
				$exp[0] = '未知浏览器';
				$exp[1] = '';
			}
			return $exp[0].'('.$exp[1].')';
		}

		function get_os() {
			$agent = $_SERVER['HTTP_USER_AGENT'];
			if (preg_match('/win/i', $agent) && strpos($agent, '95')){
				$os = 'Windows 95';
			} else if (preg_match('/win 9x/i', $agent) && strpos($agent, '4.90')){
				$os = 'Windows ME';
			} else if (preg_match('/win/i', $agent) && preg_match('/98/i', $agent)){
				$os = 'Windows 98';
			} else if (preg_match('/win/i', $agent) && preg_match('/nt 6.0/i', $agent)){
				$os = 'Windows Vista';
			} else if (preg_match('/win/i', $agent) && preg_match('/nt 6.1/i', $agent)){
				$os = 'Windows 7';
			} else if (preg_match('/win/i', $agent) && preg_match('/nt 6.2/i', $agent)){
				$os = 'Windows 8';
			} else if (preg_match('/win/i', $agent) && preg_match('/nt 10.0/i', $agent)){
				$os = 'Windows 10'; //添加win10判断
			} else if (preg_match('/win/i', $agent) && preg_match('/nt 5.1/i', $agent)){
				$os = 'Windows XP';
			} else if (preg_match('/win/i', $agent) && preg_match('/nt 5/i', $agent)){
				$os = 'Windows 2000';
			} else if (preg_match('/win/i', $agent) && preg_match('/nt/i', $agent)){
				$os = 'Windows NT';
			} else if (preg_match('/win/i', $agent) && preg_match('/32/i', $agent)){
				$os = 'Windows 32';
			} else if (preg_match('/linux/i', $agent)){
				$os = 'Linux';
			} else if (preg_match('/unix/i', $agent)){
				$os = 'Unix';
			} else if (preg_match('/sun/i', $agent) && preg_match('/os/i', $agent)){
				$os = 'SunOS';
			} else if (preg_match('/ibm/i', $agent) && preg_match('/os/i', $agent)){
				$os = 'IBM OS/2';
			} else if (preg_match('/Mac/i', $agent) && preg_match('/PC/i', $agent)){
				$os = 'Macintosh';
			} else if (preg_match('/PowerPC/i', $agent)){
				$os = 'PowerPC';
			} else if (preg_match('/AIX/i', $agent)){
				$os = 'AIX';
			} else if (preg_match('/HPUX/i', $agent)){
				$os = 'HPUX';
			} else if (preg_match('/NetBSD/i', $agent)){
				$os = 'NetBSD';
			} else if (preg_match('/BSD/i', $agent)){
				$os = 'BSD';
			} else if (preg_match('/OSF1/i', $agent)){
				$os = 'OSF1';
			} else if (preg_match('/IRIX/i', $agent)){
				$os = 'IRIX';
			} else if (preg_match('/FreeBSD/i', $agent)){
				$os = 'FreeBSD';
			} else if (preg_match('/teleport/i', $agent)){
				$os = 'teleport';
			} else if (preg_match('/flashget/i', $agent)){
				$os = 'flashget';
			} else if (preg_match('/webzip/i', $agent)){
				$os = 'webzip';
			} else if (preg_match('/offline/i', $agent)){
				$os = 'offline';
			} else {
				$os = '未知操作系统';
			}
			return $os;
		}

		$Vistor = M('vistor');
		$Vistor->create();
		$Vistor->lk = $_SERVER['PHP_SELF'];
		$Vistor->ip = get_ip();
		$Vistor->os = get_os();
		$Vistor->br = get_broswer();
		$Vistor->tm = date('Y-m-d H:i:s');
		$result = $Vistor->add();
	}
}