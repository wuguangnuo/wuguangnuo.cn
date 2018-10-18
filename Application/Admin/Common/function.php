<?php
/**
 * 获取操作系统
 */
function get_os($agent) {
	if (preg_match('/sitemap/i', $agent) || preg_match('/Parser/i', $agent)) {
		$os = '地图爬虫';
	} else if (preg_match('/spider/i', $agent) || preg_match('/bot/i', $agent)) {
		$os = get_sp($agent);
	} else if (preg_match('/win/i', $agent) && preg_match('/[^.\d]95/i', $agent)) {
		$os = 'Windows 95';
	} else if (preg_match('/win/i', $agent) && preg_match('/[^.\d]98/i', $agent)) {
		$os = 'Windows 98';
	} else if (preg_match('/win/i', $agent) && preg_match('/nt\s*5.0/i', $agent)) {
		$os = 'Windows 2000';
	} else if (preg_match('/win/i', $agent) && preg_match('/nt\s*5.1/i', $agent)) {
		$os = 'Windows XP';
	} else if (preg_match('/win/i', $agent) && preg_match('/nt\s*5.2/i', $agent)) {
		$os = 'Windows XP';
	} else if (preg_match('/win/i', $agent) && preg_match('/nt\s*6.0/i', $agent)) {
		$os = 'Windows Vista';
	} else if (preg_match('/win/i', $agent) && preg_match('/nt\s*6.1/i', $agent)) {
		$os = 'Windows 7';
	} else if (preg_match('/win/i', $agent) && preg_match('/nt\s*6.2/i', $agent)) {
		$os = 'Windows 8';
	} else if (preg_match('/win/i', $agent) && preg_match('/nt\s*10.0/i', $agent)) {
		$os = 'Windows 10';
	} else if (preg_match('/win/i', $agent) && preg_match('/nt/i', $agent)) {
		$os = 'Windows NT';
	} else if (preg_match('/android\s*([\d\.]+)/i', $agent, $Android)) {
		$os = 'Android ' . $Android[1];
	} else if (preg_match('/iphone/i', $agent)) {
		$os = 'iPhone';
	} else if (preg_match('/ipad/i', $agent)) {
		$os = 'iPad';
	} else if (preg_match('/linux/i', $agent)) {
		$os = 'Linux';
	} else if (preg_match('/unix/i', $agent)) {
		$os = 'Unix';
	} else if (preg_match('/sun/i', $agent) && preg_match('/os/i', $agent)) {
		$os = 'SunOS';
	} else if (preg_match('/ibm/i', $agent) && preg_match('/os/i', $agent)) {
		$os = 'IBM OS/2';
	} else if (preg_match('/Mac/i', $agent) && preg_match('/PC/i', $agent)) {
		$os = 'Macintosh';
	} else if (preg_match('/Macintosh/i', $agent) && preg_match('/Mac/i', $agent)) {
		$os = 'MacOS';
	} else if (preg_match('/PowerPC/i', $agent)) {
		$os = 'PowerPC';
	} else if (preg_match('/AIX/i', $agent)) {
		$os = 'AIX';
	} else if (preg_match('/HPUX/i', $agent)) {
		$os = 'HPUX';
	} else if (preg_match('/NetBSD/i', $agent)) {
		$os = 'NetBSD';
	} else if (preg_match('/BSD/i', $agent)) {
		$os = 'BSD';
	} else if (preg_match('/OSF1/i', $agent)) {
		$os = 'OSF1';
	} else if (preg_match('/IRIX/i', $agent)) {
		$os = 'IRIX';
	} else if (preg_match('/FreeBSD/i', $agent)) {
		$os = 'FreeBSD';
	} else if (preg_match('/teleport/i', $agent)) {
		$os = 'teleport';
	} else if (preg_match('/flashget/i', $agent)) {
		$os = 'flashget';
	} else if (preg_match('/webzip/i', $agent)) {
		$os = 'webzip';
	} else if (preg_match('/offline/i', $agent)) {
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
	if (preg_match('/sitemap/i', $agent) || preg_match('/Parser/i', $agent)) {
		$exp[0] = '地图爬虫';
		$exp[1] = '';
	} else if (preg_match('/spider/i', $agent) || preg_match('/bot/i', $agent)) {
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
function get_sp($agent) {
	if (preg_match('/Baiduspider/i', $agent)) {
		return '百度蜘蛛';
	} else if (preg_match('/Googlebot/i', $agent)) {
		return '谷歌蜘蛛';
	} else if (preg_match('/360Spider/i', $agent)) {
		return '360蜘蛛';
	} else if (preg_match('/Sosospider/i', $agent)) {
		return 'SOSO蜘蛛';
	} else if (preg_match('/Yahoo!/i', $agent)) {
		return '雅虎蜘蛛';
	} else if (preg_match('/YoudaoBot/i', $agent) || preg_match('/YodaoBot/i', $agent)) {
		return '有道蜘蛛';
	} else if (preg_match('/Sogou/i', $agent)) {
		return '搜狗蜘蛛';
	} else if (preg_match('/msnbot/i', $agent)) {
		return 'MSN蜘蛛';
	} else if (preg_match('/bingbot/i', $agent)) {
		return '必应蜘蛛';
	} else if (preg_match('/YisouSpider/i', $agent)) {
		return '一搜蜘蛛';
	} else if (preg_match('/ia_archiver/i', $agent)) {
		return 'Alexa蜘蛛';
	} else if (preg_match('/EasouSpider/i', $agent)) {
		return '宜sou蜘蛛';
	} else if (preg_match('/JikeSpider/i', $agent)) {
		return '即刻蜘蛛';
	} else if (preg_match('/EtaoSpider/i', $agent)) {
		return '一淘蜘蛛';
	} else if (preg_match('/YandexBot/i', $agent)) {
		return 'Yandex蜘蛛';
	} else if (preg_match('/AhrefsBot/i', $agent)) {
		return 'Ahrefs蜘蛛';
	} else if (preg_match('/ezooms.bot/i', $agent)) {
		return 'ezooms蜘蛛';
	} else if (preg_match('/MJ12bot/i', $agent)) {
		return 'MJ12蜘蛛';
	} else if (preg_match('/Linkdex/i', $agent)) {
		return 'Linkdex蜘蛛';
	} else if (preg_match('/archive/i', $agent)) {
		return 'Archive蜘蛛';
	} else {
		return '其他蜘蛛';
	}
}
?>