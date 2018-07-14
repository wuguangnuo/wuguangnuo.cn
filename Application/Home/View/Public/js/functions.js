$(function(){
	//标题变换
	var OriginTitile = document.title;
	var titleTime;
	document.addEventListener('visibilitychange',
	function(){
		if (document.hidden){
			document.title = '(●—●)你还会回来吗？' + OriginTitile;
			clearTimeout(titleTime);
		} else {
			document.title = '今天，又是充满希望的一天！' + OriginTitile;
			titleTime = setTimeout(function(){
				document.title = OriginTitile;
			},2000);
		}
	});
/*
 * 测试环境 -- 禁用 *
 * 线上使用加密压缩文件

	//提示复制
	document.body.oncopy = function(){
		alert("复制成功！")
	};
	
	//禁止右键
	document.body.oncontextmenu = function(){
		return false
	};
	
	//禁止拖动
	document.body.ondragstart = function(){
		return false
	};

	//控制台输出
	console.log("%c%c我 諾哥 打钱%c3̶2̶8̶%c488%c","padding:47px 50px;line-height:100px;background:url('http://wuguangnuo.cn/Public/wugn/img/alipay.jpg')no-repeat","font-family:'Microsoft YaHei';font-size:18px;font-weight:bold;padding:5px","font-family:'Microsoft YaHei';font-size:16px;font-weight:normal;padding:5px","font-family:'Microsoft YaHei';font-size:18px;font-weight:bold;color:red;padding:5px","padding:47px 50px;background:url('http://wuguangnuo.cn/Public/wugn/img/wechat.png')no-repeat");
	
	//百度统计
	var _hmt=_hmt||[];(function(){var hm=document.createElement("script");hm.src="https://hm.baidu.com/hm.js?b058ebe6a38c1861af55616ce957f00e";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(hm,s);})();
/*
 * 结束 *
 */
});

