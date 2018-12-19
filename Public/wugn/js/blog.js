$(function(){
	//初始化
	$("#gotop").hide();//小火箭默认隐藏
	$("#gotop2").hide();//小火箭二号
	
	$("#signup").click(function(){
		swal({
			type: 'error',
			title: '暂未开放注册',
			allowOutsideClick: false,
			allowEnterKey: false,
			confirmButtonText: '确认',
			animation: false,
			customClass: 'animated wobble'
		});
	});
	
	$(".postCon img").click(function(){
		imgShow("#replyImg", "#bigImg", $(this).attr("src"));
	});

	function imgShow(div, img, src){
		$(div).css("height", $(window).height()*3 + "px").css("top", 0-$(window).height() + "px").attr('display', 'block').fadeIn("fast");
		$(img).css("max-height", ($(window).height()-80) + "px").css("top", "50px").attr("src", src);
		$(div).click(function(){
			$(this).fadeOut("fast");
		});
	};

	//Blog内容规范化
	$(".post-content table").css("border", "0").addClass("table table-striped table-condensed table-hover");//表格样式
	$(".post-content img").addClass("img-responsive img-thumbnail");//图片样式
	$(".flip").addClass("btn btn-primary").css("margin-bottom","6px");//添加按钮样式
	$(".flip+pre").hide();//代码默认隐藏
	$(".flip").click(function(){//代码展开功能
		$(".flip+pre:eq(" + $(this).index(".flip") + ")").slideToggle("slow");
	});
	
	//小火箭gotop
	var e = $("#gotop"), t = $(document).scrollTop(), n, r, i = !0;
	$(window).scroll(function(){
		var t = $(document).scrollTop();
		t == 0 ? e.css("background-position") == "0px 0px" ? e.fadeOut("slow") : i && (i = !1, $(".level-2").css("opacity", 1), e.delay(100).animate({
			marginTop: "-1000px"
		},
		"normal",
		function(){
			e.css({
				"margin-top": "-125px",
				display: "none"
			}),
			i = !0
		})) : e.fadeIn("slow")
	}),
	e.hover(function(){
		$(".level-2").stop(!0).animate({
			opacity: 1
		})
	},
	function(){
		$(".level-2").stop(!0).animate({
			opacity: 0
		})
	}),
	$(".level-3").click(function(){
		function t(){
			var t = e.css("background-position");
			if(e.css("display") == "none" || i == 0){
				clearInterval(n),
				e.css("background-position", "0px 0px");
				return
			}
			switch(t){
			case "0px 0px":
				e.css("background-position", "-298px 0px");
				break;
			case "-298px 0px":
				e.css("background-position", "-447px 0px");
				break;
			case "-447px 0px":
				e.css("background-position", "-596px 0px");
				break;
			case "-596px 0px":
				e.css("background-position", "-745px 0px");
				break;
			case "-745px 0px":
				e.css("background-position", "-298px 0px");
			}
		}
		if(!i) return;
		n = setInterval(t, 50),
		$("html,body").animate({
			scrollTop: 0
		},
		"slow");
	});
	
	//小火箭二号
	$(window).scroll(function(){
		if($(window).scrollTop() >= 100){
			$("#gotop2").fadeIn();
		}else {
			$("#gotop2").fadeOut();
		}
	});
	
	$("#gotop2").click(function(event){
		$('html,body').animate({scrollTop:0},100);
	});

	//点赞区域
	$(".newsItem").click(function(e){
		var n = Math.round(Math.random() * 100);
		var $i = $("<b>").text("+" + n + "❤");
		var x = e.pageX,
		y = e.pageY;
		$i.css({
			"z-index": 99999,
			"top": y - 15,
			"left": x,
			"position": "absolute",
			"color": "red",
			"user-select": "none"
		});
		$("body").append($i);
		$i.animate({
			"top": y - 180,
			"opacity": 0
		},
		1500,
		function(){
			$i.remove();
		});
		e.stopPropagation();
	});
});

/* -- sidebar-follow- 跟随 -- */
SidebarFollow = function(){
	this.config = {
		element: null,//处理的节点
		distanceToTop: 0//节点上边到页面顶部的距离
	};
	this.cache = {
		originalToTop: 0,//原本到页面顶部的距离
		prevElement: null,//上一个节点
		parentToTop: 0,//父节点的上边到顶部距离
		placeholder: jQuery('<div>')//占位节点
	}
};

SidebarFollow.prototype = {
	init: function(config){
		this.config = config || this.config;
		var _self = this;
		var element = jQuery(_self.config.element);
		// 如果没有找到节点, 不进行处理
		if(element.length <= 0){
			return;
		}
		// 获取上一个节点
		var prevElement = element.prev();
		while(prevElement.is(':hidden')){
			prevElement = prevElement.prev();
			if(prevElement.length <= 0){
				break;
			}
		}
		_self.cache.prevElement = prevElement;
		// 计算父节点的上边到顶部距离
		var parent = element.parent();
		var parentToTop = parent.offset().top;
		var parentBorderTop = parent.css('border-top');
		var parentPaddingTop = parent.css('padding-top');
		_self.cache.parentToTop = parentToTop + parentBorderTop + parentPaddingTop;
		// 滚动屏幕
		jQuery(window).scroll(function(){
			_self._scrollScreen({element:element, _self:_self});
		});
		// 改变屏幕尺寸
		jQuery(window).resize(function(){
			_self._scrollScreen({element:element, _self:_self});
		});
	},
	//修改节点位置
	_scrollScreen: function(args){
		var _self = args._self;
		var element = args.element;
		var prevElement = _self.cache.prevElement;
		// 获得到顶部的距离
		var toTop = _self.config.distanceToTop;
		// 如果 body 有 top 属性, 消除这些位移
		var bodyToTop = parseInt(jQuery('body').css('top'), 10);
		if(!isNaN(bodyToTop)){
			toTop += bodyToTop;
		}
		// 获得到顶部的绝对距离
		var elementToTop = element.offset().top - toTop;
		// 如果存在上一个节点, 获得到上一个节点的距离; 否则计算到父节点顶部的距离
		var referenceToTop = 0;
		if(prevElement && prevElement.length === 1){
			referenceToTop = prevElement.offset().top + prevElement.outerHeight();
		} else {
			referenceToTop = _self.cache.parentToTop - toTop;
		}
		// 当节点进入跟随区域, 跟随滚动
		if(jQuery(document).scrollTop() > elementToTop){
			// 添加占位节点
			var elementHeight = element.outerHeight();
			_self.cache.placeholder.css('height', elementHeight).insertBefore(element);
			// 记录原位置
			_self.cache.originalToTop = elementToTop;
			// 修改样式
			element.css({
				top: toTop + 'px',
				position: 'fixed'
			});
		// 否则回到原位
		} else if(_self.cache.originalToTop > elementToTop || referenceToTop > elementToTop){
			// 删除占位节点
			_self.cache.placeholder.remove();
			// 修改样式
			element.css({
				position: 'static'
			});
		}
	}
};
