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
			},2000);}
	});

	//提示复制
	document.body.oncopy = function(){
		alert("复制成功！")
	};
	//禁止右键
	document.body.oncontextmenu = function(){
		return false;
	};
	//禁止拖动
	document.body.ondragstart = function(){
		return false;
	};
	
	//控制台输出
	eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('k.l("%c%m o n f%c","0:5 6;h-j:g;7:2(\'3://4.d/b/e/8/i.p\') a-9","1-w:\'x y\';1-z:v;1-r:q;0:s","0:5 6;7:2(\'3://4.d/b/e/8/u.t\') a-9");',36,36,'padding|font|url|http|wuguangnuo|47px|50px|background|img|repeat|no|Public||cn|wugn|328|100px|line|alipay|height|console|log|c我|打钱|諾哥|jpg|bold|weight|5px|png|wechat|16px|family|Microsoft|YaHei|size'.split('|'),0,{}));

	//百度统计
	var _hmt=_hmt||[];(function(){var hm=document.createElement("script");hm.src="https://hm.baidu.com/hm.js?b058ebe6a38c1861af55616ce957f00e";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(hm,s);})();

});

