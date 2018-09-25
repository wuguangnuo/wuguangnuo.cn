<?php
/**
 * 获取操作系统
 */
function get_os($sys) {
	if (preg_match('/spider/i', $sys) || preg_match('/bot/i', $sys)) {
		$os = get_sp($sys);
	} else if (preg_match('/win/i', $sys) && preg_match('/[^.\d]95/i', $sys)) {
		$os = 'Windows 95';
	} else if (preg_match('/win/i', $sys) && preg_match('/[^.\d]98/i', $sys)) {
		$os = 'Windows 98';
	} else if (preg_match('/win/i', $sys) && preg_match('/nt\s*5.0/i', $sys)) {
		$os = 'Windows 2000';
	} else if (preg_match('/win/i', $sys) && preg_match('/nt\s*5.1/i', $sys)) {
		$os = 'Windows XP';
	} else if (preg_match('/win/i', $sys) && preg_match('/nt\s*5.2/i', $sys)) {
		$os = 'Windows XP';
	} else if (preg_match('/win/i', $sys) && preg_match('/nt\s*6.0/i', $sys)) {
		$os = 'Windows Vista';
	} else if (preg_match('/win/i', $sys) && preg_match('/nt\s*6.1/i', $sys)) {
		$os = 'Windows 7';
	} else if (preg_match('/win/i', $sys) && preg_match('/nt\s*6.2/i', $sys)) {
		$os = 'Windows 8';
	} else if (preg_match('/win/i', $sys) && preg_match('/nt\s*10.0/i', $sys)) {
		$os = 'Windows 10';
	} else if (preg_match('/win/i', $sys) && preg_match('/nt/i', $sys)) {
		$os = 'Windows NT';
	} else if (preg_match('/android\s*([\d\.]+)/i', $sys, $Android)) {
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

/**
 * 获取浏览器
 */
function get_br($agent) {
	if (preg_match('/\+http:\/\//i', $agent) && (preg_match('/spider/i', $agent) || preg_match('/bot/i', $agent))) {
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
		preg_match('/MSIE\s*([^;)]+)+/i', $agent, $ie);
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

/**
 * 获取网络蜘蛛
 */
function get_sp($sys) {
	if (preg_match('/Baiduspider/i', $sys)) {
		return '百度蜘蛛';
	} else if (preg_match('/Googlebot/i', $sys)) {
		return '谷歌蜘蛛';
	} else if (preg_match('/360Spider/i', $sys)) {
		return '360蜘蛛';
	} else if (preg_match('/Sosospider/i', $sys)) {
		return 'SOSO蜘蛛';
	} else if (preg_match('/Yahoo!/i', $sys)) {
		return '雅虎蜘蛛';
	} else if (preg_match('/YoudaoBot/i', $sys) || preg_match('/YodaoBot/i', $sys)) {
		return '有道蜘蛛';
	} else if (preg_match('/Sogou/i', $sys) && preg_match('/spider/i', $sys)) {
		return '搜狗蜘蛛';
	} else if (preg_match('/msnbot/i', $sys)) {
		return 'MSN蜘蛛';
	} else if (preg_match('/bingbot/i', $sys)) {
		return '必应蜘蛛';
	} else if (preg_match('/YisouSpider/i', $sys)) {
		return '一搜蜘蛛';
	} else if (preg_match('/ia_archiver/i', $sys)) {
		return 'Alexa蜘蛛';
	} else if (preg_match('/EasouSpider/i', $sys)) {
		return '宜sou蜘蛛';
	} else if (preg_match('/JikeSpider/i', $sys)) {
		return '即刻蜘蛛';
	} else if (preg_match('/EtaoSpider/i', $sys)) {
		return '一淘蜘蛛';
	} else if (preg_match('/YandexBot/i', $sys)) {
		return 'Yandex蜘蛛';
	} else if (preg_match('/AhrefsBot/i', $sys)) {
		return 'Ahrefs蜘蛛';
	} else if (preg_match('/ezooms.bot/i', $sys)) {
		return 'ezooms蜘蛛';
	} else if (preg_match('/MJ12bot/i', $sys)) {
		return 'MJ12蜘蛛';
	} else if (preg_match('/Linkdex/i', $sys)) {
		return 'Linkdex蜘蛛';
	} else if (preg_match('/archive/i', $sys)) {
		return 'Archive蜘蛛';
	} else {
		return '其他蜘蛛';
	}
}
?>