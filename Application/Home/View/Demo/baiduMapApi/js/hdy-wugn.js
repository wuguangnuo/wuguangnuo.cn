function G(id) {
			return document.getElementById(id);
		}
		
		var map = new BMap.Map("allmap");          // 创建地图实例  
		
		var point = new BMap.Point(118.090635,24.610362);  // 创建点坐标  

		var myDis = new BMapLib.DistanceTool(map);
		map.addEventListener("load",function(){
			myDis.open();  //开启鼠标测距
			myDis.close();  //关闭鼠标测距大
		});
		
		var myDrag = new BMapLib.RectangleZoom(map, {
			followText: "拖拽鼠标进行操作"
		});
		
		// 添加定位控件
		var geolocationControl = new BMap.GeolocationControl();
		geolocationControl.addEventListener("locationSuccess", function(e){
			// 定位成功事件
			var address = '';
			address += e.addressComponent.province;
			address += e.addressComponent.city;
			address += e.addressComponent.district;
			address += e.addressComponent.street;
			address += e.addressComponent.streetNumber;
			alert("当前定位地址为：" + address);
		});
		geolocationControl.addEventListener("locationError",function(e){
			// 定位失败事件
			alert(e.message);
		});
			
		var traffic = new BMapLib.TrafficControl({anchor:BMAP_ANCHOR_TOP_RIGHT});
		traffic.setOffset(new BMap.Size(10, 25));//路况信息
			
		var stCtrl = new BMap.PanoramaControl({anchor:BMAP_ANCHOR_TOP_LEFT});
		stCtrl.setOffset(new BMap.Size(40, 10));//全景地图
		
		/*
		var removeMarker = function(e,ee,marker){
				map.removeOverlay(marker);
			}
		//创建标注右键菜单
		var markerMenu=new BMap.ContextMenu();
		markerMenu.addItem(new BMap.MenuItem('删除',removeMarker.bind(marker)));
		*/
		//marker.addContextMenu(markerMenu);

		//创建地图右键菜单
		var menu = new BMap.ContextMenu();
		var txtMenuItem = [
			{
				text:'放大',
				callback:function(){map.zoomIn()}
			},
			{
				text:'缩小',
				callback:function(){map.zoomOut()}
			}
		];
		for(var i=0; i < txtMenuItem.length; i++){
			menu.addItem(new BMap.MenuItem(txtMenuItem[i].text,txtMenuItem[i].callback,100));
		}
		
		var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
			{"input" : "suggestId"
			,"location" : map
		});

		ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
		var str = "";
			var _value = e.fromitem.value;
			var value = "";
			if (e.fromitem.index > -1) {
				value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
			}    
			str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
			
			value = "";
			if (e.toitem.index > -1) {
				_value = e.toitem.value;
				value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
			}    
			str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
			G("searchResultPanel").innerHTML = str;
		});

		var myValue;
		ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
		var _value = e.item.value;
			myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
			G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
			
			setPlace();
		});

		function setPlace(){
			//map.clearOverlays();    //清除地图上所有覆盖物
			function myFun(){
				var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
				map.centerAndZoom(pp, 18);
				map.addOverlay(new BMap.Marker(pp));    //添加标注
			}
			var local = new BMap.LocalSearch(map, { //智能搜索
			  onSearchComplete: myFun
			});
			local.search(myValue);
		}
		
		/*
		var marker = new BMap.Marker(new BMap.Point(118.090635,24.610362));    //创建标注
		map.addOverlay(marker);                  // 将标注添加到地图中
		*/
		
		/*
		marker.addEventListener("click", function(){    
		 alert("您点击了标注");    
		});//监听标注事件
		*/
		
		/*
		marker.enableDragging();    
		marker.addEventListener("dragend", function(e){    
		 alert("当前位置：" + e.point.lng + ", " + e.point.lat);    
		})//可拖拽的标注
		*/
		
		/*
		var opts3 = {    
		 width : 250,     // 信息窗口宽度    
		 height: 100,     // 信息窗口高度    
		 title : "标题"  // 信息窗口标题   
		} 
		var infoWindow = new BMap.InfoWindow("介绍", opts3);  // 创建信息窗口对象    
		map.openInfoWindow(infoWindow,new BMap.Point(118.090635,24.610362));      // 打开信息窗口
		*/
		
		
		map.centerAndZoom(point, 17);// 初始化地图，设置中心点坐标和地图级别  
		map.enableScrollWheelZoom(true);//鼠标滚轮控制
		map.addControl(geolocationControl);//添加定位控件
		map.addControl(new BMap.NavigationControl({type: BMAP_NAVIGATION_CONTROL_ZOOM , anchor: BMAP_ANCHOR_TOP_LEFT}));//鱼骨
		map.addControl(new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT}));    //比例尺
		map.addControl(new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:false}));   //缩略图 
		map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP],anchor: BMAP_ANCHOR_BOTTOM_RIGHT}));//2D图，卫星图
		map.addControl(traffic);//路况信息
		map.addControl(stCtrl);//全景地图
		map.addContextMenu(menu);//右键菜单
		
		//map.addOverlay(marker);               // 将标注添加到地图中(默认不可拖拽)
		//**********************
		/*
		// 定义一个控件类,即function
		function ZoomControl(){
		  // 默认停靠位置和偏移量
		  this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
		  this.defaultOffset = new BMap.Size(10, 10);
		}

		// 通过JavaScript的prototype属性继承于BMap.Control
		ZoomControl.prototype = new BMap.Control();

		// 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
		// 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
		ZoomControl.prototype.initialize = function(map){
		  // 创建一个DOM元素
		  var div = document.createElement("div");
		  // 添加文字说明
		  div.appendChild(document.createTextNode("坐标拾取"));
		  // 设置样式
		  div.style.cursor = "pointer";
		  div.style.border = "1px solid gray";
		  div.style.backgroundColor = "white";

		  div.onclick = function(e){
			map.addEventListener("click",function(e){
			alert(e.point.lng + "," + e.point.lat);
				});
			}
		
		  // 添加DOM元素到地图中
		  map.getContainer().appendChild(div);
		  // 将DOM元素返回
		  return div;
		  }
		  // 创建控件
		var myZoomCtrl = new ZoomControl();
		// 添加到地图当中
		map.addControl(myZoomCtrl);
		*/
		//*******************
		
		
		//=====签到=====
		//拼接infowindow内容字串
		var html = [];
		html.push('<span style="font-size:15px"><b>签到: </b></span><br/>');
		html.push('<table border="0" cellpadding="1" cellspacing="1" >');
		html.push('  <tr>'); 
		html.push('      <td align="left" class="common">名 称：</td>');
		html.push('      <td colspan="2"><input type="text" maxlength="50" size="18"  id="txtName"></td>');
		html.push('	     <td valign="top"><span class="star">*</span></td>');
		html.push('  </tr>');
		html.push('  <tr>');
		html.push('      <td  align="left" class="common">电 话：</td>');
		html.push('      <td colspan="2"><input type="text" maxlength="30" size="18"  id="txtTel"></td>');
		html.push('	     <td valign="top"><span class="star">*</span></td>');
		html.push('  </tr>');
		html.push('  <tr>');
		html.push('      <td  align="left" class="common">地 址：</td>');
		html.push('      <td  colspan="2"><input type="text" maxlength="50" size="18"  id="txtAddr"></td>');
		html.push('	     <td valign="top"><span class="star">*</span></td>');
		html.push('  </tr>');
		html.push('  <tr>');
		html.push('      <td align="left" class="common">描 述：</td>');
		html.push('      <td colspan="2"><textarea rows="2" cols="15"  id="areaDesc"></textarea></td>');
		html.push('	     <td valign="top"></td>');
		html.push('  </tr>');
		html.push('  <tr>');
		html.push('	     <td  align="center" colspan="3">');
		html.push('          <input type="button" name="btnOK"  onclick="fnOK()" value="确定">&nbsp;&nbsp;');
		html.push('		     <input type="button" name="btnClear" onclick="fnClear();" value="重填">');
		html.push('	     </td>');
		html.push('  </tr>');
		html.push('</table>');	

		var infoWin = new BMap.InfoWindow(html.join(""), {offset: new BMap.Size(0, -10)});
		
		var curMkr = null; // 记录当前添加的Mkr

		var mkrTool = new BMapLib.MarkerTool(map, {autoClose: true, followText: "请添加标注点"});
		mkrTool.addEventListener("markend", function(evt){ 
			var mkr = evt.marker;
			mkr.openInfoWindow(infoWin);
			curMkr = mkr;
		});

		//签到按钮
		function openStylePnl(){
			mkrTool.open(); //打开工具 
			var icon = BMapLib.MarkerTool.SYS_ICONS[2]; //设置工具样式，使用系统提供的样式BMapLib.MarkerTool.SYS_ICONS[0] -- BMapLib.MarkerTool.SYS_ICONS[23]
			mkrTool.setIcon(icon); 
			document.getElementById("divStyle").style.display = "none"; 
		}


		//提交数据
		function fnOK(){
			var name = encodeHTML(document.getElementById("txtName").value);
			var tel = encodeHTML(document.getElementById("txtTel").value);
			var addr = encodeHTML(document.getElementById("txtAddr").value);
			var desc = encodeHTML(document.getElementById("areaDesc").value);

			if(!name || !tel || !addr){
				alert("星号字段必须填写");    
				return;
			}

			if(curMkr){
				//设置label
				var lbl = new BMap.Label(name, {offset: new BMap.Size(15, 10)});
				lbl.setStyle({border: "solid 1px gray"});
				curMkr.setLabel(lbl);
				
				//设置title
				var title = "电话: " + tel + "\n\r" + "地址: " +addr + "\n\r" + "描述: " + desc;
				curMkr.setTitle(title);        
			}
			if(infoWin.isOpen()){
				map.closeInfoWindow();
			}

			//在此用户可将数据提交到后台数据库中
		}

		//输入校验
		function encodeHTML(a){
			return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
		}

		//重填数据
		function fnClear(){
			document.getElementById("txtName").value = "";
			document.getElementById("txtTel").value = "";
			document.getElementById("txtAddr").value = "";
			document.getElementById("areaDesc").value = "";
		}

		//*****签到*****
		
		
		//===================
		//=====A区=====
		var point1 = new BMap.Point(118.092683,24.607303);
		var marker = new BMap.Marker(point1);  // 创建标注
		map.addOverlay(marker);              // 将标注添加到地图中

		var label = new BMap.Label("A区",{offset:new BMap.Size(20,-10)});
		marker.setLabel(label);//添加标签
		
		var opts1 = {
			width : 200,     // 信息窗口宽度
			height: 100,     // 信息窗口高度
			title : "A区" , // 信息窗口标题
		}
		var infoWindow1 = new BMap.InfoWindow("A区行政大楼很高", opts1);  // 创建信息窗口对象 
		marker.addEventListener("click", function(){          
			map.openInfoWindow(infoWindow1,point1); //开启信息窗口
		});

		
		//=====B区=====
		var point2 = new BMap.Point(118.092019,24.607631);
		var marker = new BMap.Marker(point2);  // 创建标注
		map.addOverlay(marker);              // 将标注添加到地图中

		var label = new BMap.Label("B区",{offset:new BMap.Size(20,-10)});
		marker.setLabel(label);//添加标签
		
		var opts2 = {
			width : 200,     // 信息窗口宽度
			height: 100,     // 信息窗口高度
			title : "B区" , // 信息窗口标题
		}
		var infoWindow2 = new BMap.InfoWindow("B区大楼很长", opts2);  // 创建信息窗口对象 
		marker.addEventListener("click", function(){          
			map.openInfoWindow(infoWindow2,point2); //开启信息窗口
		});
		

		//=====C区=====
		var point3 = new BMap.Point(118.091264,24.607993);
		var marker = new BMap.Marker(point3);  // 创建标注
		map.addOverlay(marker);              // 将标注添加到地图中
		
		var label = new BMap.Label("C区",{offset:new BMap.Size(20,-10)});
		marker.setLabel(label);//添加标签
		
		var opts3 = {
			width : 200,     // 信息窗口宽度
			height: 100,     // 信息窗口高度
			title : "C区" , // 信息窗口标题
		}
		var infoWindow3 = new BMap.InfoWindow("C区大楼哈哈哈", opts3);  // 创建信息窗口对象 
		marker.addEventListener("click", function(){          
			map.openInfoWindow(infoWindow3,point3); //开启信息窗口
		});
		
		
		//=====D区=====
		var point4 = new BMap.Point(118.090204,24.608584);
		var marker = new BMap.Marker(point4);  // 创建标注
		map.addOverlay(marker);              // 将标注添加到地图中
		
		var label = new BMap.Label("D区",{offset:new BMap.Size(20,-10)});
		marker.setLabel(label);//添加标签
		
		var opts4 = {
			width : 200,     // 信息窗口宽度
			height: 100,     // 信息窗口高度
			title : "D区" , // 信息窗口标题
		}
		var infoWindow4 = new BMap.InfoWindow("D区大楼嘿嘿嘿", opts4);  // 创建信息窗口对象 
		marker.addEventListener("click", function(){          
			map.openInfoWindow(infoWindow4,point4); //开启信息窗口
		});
		
		
		//=====E区=====
		var point5 = new BMap.Point(118.089288,24.609208);
		var marker = new BMap.Marker(point5);  // 创建标注
		map.addOverlay(marker);              // 将标注添加到地图中
		
		var label = new BMap.Label("E区",{offset:new BMap.Size(20,-10)});
		marker.setLabel(label);//添加标签
		
		var opts5 = {
			width : 200,     // 信息窗口宽度
			height: 100,     // 信息窗口高度
			title : "E区" , // 信息窗口标题
		}
		var infoWindow5 = new BMap.InfoWindow("E区大楼呵呵呵", opts5);  // 创建信息窗口对象 
		marker.addEventListener("click", function(){          
			map.openInfoWindow(infoWindow5,point5); //开启信息窗口
		});
		
		
		//=====F区=====
		var point6 = new BMap.Point(118.088246,24.609865);
		var marker = new BMap.Marker(point6);  // 创建标注
		map.addOverlay(marker);              // 将标注添加到地图中
		
		var label = new BMap.Label("F区",{offset:new BMap.Size(20,-10)});
		marker.setLabel(label);//添加标签
		
		var opts6 = {
			width : 200,     // 信息窗口宽度
			height: 100,     // 信息窗口高度
			title : "F区" , // 信息窗口标题
		}
		var infoWindow6 = new BMap.InfoWindow("F区啦啦啦", opts6);  // 创建信息窗口对象 
		marker.addEventListener("click", function(){          
			map.openInfoWindow(infoWindow6,point6); //开启信息窗口
		});
		
		
		//=====G区=====
		var point7 = new BMap.Point(118.087312,24.610342);
		var marker = new BMap.Marker(point7);  // 创建标注
		map.addOverlay(marker);              // 将标注添加到地图中
		
		var label = new BMap.Label("G区",{offset:new BMap.Size(20,-10)});
		marker.setLabel(label);//添加标签
		
		var opts7 = {
			width : 200,     // 信息窗口宽度
			height: 100,     // 信息窗口高度
			title : "G区" , // 信息窗口标题
		}
		var infoWindow7 = new BMap.InfoWindow("G区大楼在最后", opts7);  // 创建信息窗口对象 
		marker.addEventListener("click", function(){          
			map.openInfoWindow(infoWindow7,point7); //开启信息窗口
		});
		
		
		//=====1区=====
		var point8 = new BMap.Point(118.090536,24.615068);
		var marker = new BMap.Marker(point8,{icon:new BMap.Icon("images/icon2.png",new BMap.Size(20,25))});  // 创建标注
		map.addOverlay(marker);              // 将标注添加到地图中
		
		var label = new BMap.Label("西北拉面",{offset:new BMap.Size(20,-10)});
		marker.setLabel(label);//添加标签
		
		/*
		var opts8 = {
			width : 200,     // 信息窗口宽度
			height: 100,     // 信息窗口高度
			title : "西北拉面" , // 信息窗口标题
		}
		var infoWindow8 = new BMap.InfoWindow("这儿有各种火锅", opts8);  // 创建信息窗口对象 
		marker.addEventListener("click", function(){          
			map.openInfoWindow(infoWindow8,point8); //开启信息窗口
		});*/
		marker.addEventListener("click", function(){  
		var sContent =
		"<h4 style='margin:0 0 5px 0;padding:0.2em 0'><a href='http://wc666666.hk158.16data.com/index.php?ctrl=wxsite&action=shopshow&typelx=wm&id=188' style='text-decoration:none'>西北拉面<a></h4>" + 
		"<img style='float:right;margin:4px' id='imgDemo' src='images/西北拉面.jpg' width='150' height='110'title='西北拉面'/>"+ 
		"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>推荐菜:牛肉炒刀削面、新疆大盘鸡、土豆牛肉盖浇面、清汤面、炸酱面。订餐电话：6666666</p>" + 
		"</div>";
		var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象       
		   this.openInfoWindow(infoWindow);
		   //图片加载完毕重绘infowindow
		   document.getElementById('imgDemo').onload = function (){
			   infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
		   }
		   });
		
		
		//=====2区=====
		var point9 = new BMap.Point(118.089674,24.614329);
		var marker = new BMap.Marker(point9,{icon:new BMap.Icon("images/icon2.png",new BMap.Size(20,25))});  // 创建标注
		map.addOverlay(marker);              // 将标注添加到地图中
		
		var label = new BMap.Label("肯德基",{offset:new BMap.Size(20,-10)});
		marker.setLabel(label);//添加标签
		
		/*
		var opts9 = {
			width : 200,     // 信息窗口宽度
			height: 100,     // 信息窗口高度
			title : "肯德基" , // 信息窗口标题
		}
		var infoWindow9 = new BMap.InfoWindow("美味炸鸡店", opts9);  // 创建信息窗口对象 
		marker.addEventListener("click", function(){          
			map.openInfoWindow(infoWindow9,point9); //开启信息窗口
		});*/
		marker.addEventListener("click", function(){  
		var sContent =
		"<h4 style='margin:0 0 5px 0;padding:0.2em 0'><a href='http://wc666666.hk158.16data.com/index.php?ctrl=wxsite&action=shopshow&typelx=wm&id=189' style='text-decoration:none'>肯德基</a></h4>" + 
		"<img style='float:right;margin:4px' id='imgDemo' src='images/肯德基.jpg' width='130' height='130' title='肯德基'/>" + 
		"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>肯德基，简称KFC，是美国跨国连锁餐厅之一，也是世界第二大速食及最大炸鸡连锁企业，由哈兰·山德士于1930年在肯塔基州路易斯维尔创建，主要出售炸鸡、汉堡、薯条、蛋挞、汽水等高热量快餐食品。</p>" + 
		"</div>";
		var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象       
		   this.openInfoWindow(infoWindow);
		   //图片加载完毕重绘infowindow
		   document.getElementById('imgDemo').onload = function (){
			   infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
		   }
		   });
		
		
		//=====3区=====
		var point10 = new BMap.Point(118.088884,24.613688);
		var marker = new BMap.Marker(point10,{icon:new BMap.Icon("images/icon2.png",new BMap.Size(20,25))});  // 创建标注
		map.addOverlay(marker);              // 将标注添加到地图中
		
		var label = new BMap.Label("泉牛馆",{offset:new BMap.Size(20,-10)});
		marker.setLabel(label);//添加标签
		
		/*
		var opts10 = {
			width : 200,     // 信息窗口宽度
			height: 100,     // 信息窗口高度
			title : "泉牛馆" , // 信息窗口标题
		}
		var infoWindow10 = new BMap.InfoWindow("黑凤梨¥100一斤", opts10);  // 创建信息窗口对象 
		marker.addEventListener("click", function(){          
			map.openInfoWindow(infoWindow10,point10); //开启信息窗口
		});
		*/
		marker.addEventListener("click", function(){  
		var sContent =
		"<h4 style='margin:0 0 5px 0;padding:0.2em 0'><a href='http://wc666666.hk158.16data.com/index.php?ctrl=wxsite&action=shopshow&typelx=wm&id=190' style='text-decoration:none'>泉牛馆</a></h4>" + 
		"<img style='float:right;margin:4px' id='imgDemo' src='images/泉牛馆.jpg' width='139' height='104' title='泉牛馆'/>" + 
		"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>泉牛馆，以二十多种纯天然中药材，科学的调配出独家秘方，精选上等牛肉，用大铁锅木柴经数小时烧煮而成，肉质鲜美、汤味纯正，香气四溢，鲜而略回甜。</p>" + 
		"</div>";
		var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象       
		   this.openInfoWindow(infoWindow);
		   //图片加载完毕重绘infowindow
		   document.getElementById('imgDemo').onload = function (){
			   infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
		   }
		   });
		
		//=====4区=====
		var point11 = new BMap.Point(118.092099,24.609615);
		var marker = new BMap.Marker(point11,{icon:new BMap.Icon("images/icon2.png",new BMap.Size(20,25))});  // 创建标注
		map.addOverlay(marker);              // 将标注添加到地图中
		
		var label = new BMap.Label("图书馆",{offset:new BMap.Size(20,-10)});
		marker.setLabel(label);//添加标签
		
		marker.addEventListener("click", function(){  
		var sContent =
		"<h4 style='margin:0 0 5px 0;padding:0.2em 0'><a href='http://lib.hqu.edu.cn/' style='text-decoration:none'>郑年锦图书馆</a></h4>" + 
		"<img style='float:right;margin:4px' id='imgDemo' src='images/图书馆.jpg' width='139' height='104' title='图书馆'/>" + 
		"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>厦门校区图书馆“郑年锦图书馆” 建筑面积14639平方米，五层框架结构，总投资2805万元，于2008年10月7日开始试运行。</p>" + 
		"</div>";
		var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象       
		   this.openInfoWindow(infoWindow);
		   //图片加载完毕重绘infowindow
		   document.getElementById('imgDemo').onload = function (){
			   infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
		   }
		   });
		
		
		
		//=====5区=====
		var point12 = new BMap.Point(118.093959,24.610609);
		var marker = new BMap.Marker(point12,{icon:new BMap.Icon("images/icon2.png",new BMap.Size(20,25))});  // 创建标注
		map.addOverlay(marker);              // 将标注添加到地图中
		
		var label = new BMap.Label("BOC",{offset:new BMap.Size(20,-10)});
		marker.setLabel(label);//添加标签
		
		marker.addEventListener("click", function(){  
		var sContent =
		"<h4 style='margin:0 0 5px 0;padding:0.2em 0'><a href='http://boc.cn' style='text-decoration:none'>BOC</a></h4>" + 
		"<img style='float:right;margin:4px' id='imgDemo' src='images/BOC.jpg' width='139' height='104' title='BOC'/>" + 
		"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>中国银行股份有限公司（Bank of China Limited，简称BOC），成立于1912年2月5日，总行位于北京复兴门内大街1号，是五大国有商业银行之一。旗下有中银香港、中银国际、中银保险等控股金融机构，在全球范围内为个人和公司客户提供金融服务。</p>" + 
		"</div>";
		var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象       
		   this.openInfoWindow(infoWindow);
		   //图片加载完毕重绘infowindow
		   document.getElementById('imgDemo').onload = function (){
			   infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
			}
		});
		
		//===============
		
		//***************
		
		/*
		var data_info = [
				[118.092683,24.607303,"A区你好"],
				[118.092019,24.607631,"B区hello"],
				[118.091264,24.607993,"C区welcome"],
				[118.090204,24.608584,"D区good"],
				[118.089288,24.609208,"E区greet"],
				[118.088246,24.609865,"F区perfect"],
				[118.087312,24.610342,"G区beautiful"],
				[118.090536,24.615068,"火锅店，啥都有。  订餐电话：12345678"],
				[118.089674,24.614329,"啃的鸡炸鸡，美滋滋。  加盟热线：23456789"],
				[118.088884,24.613688,"泉牛馆，大减价。  地址：西街666号"],
				[118.092099,24.609615,"郑年锦图书馆。书籍是人类进步的阶梯"],
				[118.093959,24.610609,"中国人民银行。Bank Of China Limited"]
				];
		var opts = {
					width : 250,     // 信息窗口宽度
					height: 100,     // 信息窗口高度
				   };
		for(var i=0;i<data_info.length;i++){
			var marker = new BMap.Marker(new BMap.Point(data_info[i][0],data_info[i][1]));  // 创建标注
			var content = data_info[i][2];
			map.addOverlay(marker);               // 将标注添加到地图中
			addClickHandler(content,marker);
		}
		function addClickHandler(content,marker){
			marker.addEventListener("click",function(e){
				openInfo(content,e)}
			);
		}
		function openInfo(content,e){
			var p = e.target;
			var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
			var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
			map.openInfoWindow(infoWindow,point); //开启信息窗口
		}
		
		*/
		//***************
		
		
		//map.addOverlay(marker);               // 将标注添加到地图中(默认不可拖拽)
		//marker.enableDragging();//标注可拖拽
		//marker.disableDragging();//标注不可拖拽
		
		/*
		marker.addEventListener("click",getAttr);
		function getAttr(){
			var p = marker.getPosition();       //获取marker的位置
			alert("此点的位置是" + p.lng + "," + p.lat);   
		}
		*/
		
		var cr = new BMap.CopyrightControl({anchor: BMAP_ANCHOR_TOP_RIGHT});   //设置版权控件位置
		map.addControl(cr); //添加版权控件
		cr.addCopyright({id: 1, content: "<a style='font-size:10px;color:red'>Made By WuGN</a>"});  	
	