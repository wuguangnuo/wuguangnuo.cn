function getVersion()
{
    var browser=navigator.appName;
    var b_version=navigator.appVersion;
    var version=b_version.split(";");
    var trim_Version=version[1].replace(/[ ]/g,"");
    return (browser=="Microsoft Internet Explorer" && trim_Version=="MSIE10.0");
}

function ImageChangeNews(uid, width, height, interval, duration, btitle, bsummary, zoomtype, zoomout)
{
    var _this = this; //把this保存下来，以后用_this代替this，这样就不会被this弄晕了

    _this.imgs = new Array(); //图片组
    _this.urls = new Array(); //链接组
    _this.titles = new Array(); //标题组
    _this.summarys = new Array(); //摘要组
    
    _this.nextIndex=0;   //下次显示的滚动图
    _this.currentIndex=-1;   //当前显示的滚动图
    _this.firstFlag = 0;  //标识是否为第一次开始执行
    _this.currentTimer = null;     //标识作用     
    
    //图片加载完毕事件
    _this.onimgload = function(loadIndex)
    {
        _this.imgs[loadIndex].setAttribute("loadedflag", true);
        if(loadIndex == _this.currentIndex)
        {
            _this.constrainimg(document.getElementById(uid + "pic"), _this.imgs[loadIndex], document.getElementById(uid + "imgdiv"));
        }
    }   
    
    //添加图片
    _this.addimg = function(img, url, title, summary)
    {
        var imgcount = _this.imgs.length;
        _this.imgs[imgcount] = new Image();
        
        _this.imgs[imgcount].onload = function(){_this.onimgload(imgcount)};
        
        _this.imgs[imgcount].src = img;
        
        _this.urls[imgcount] = url;
        _this.titles[imgcount] = title;
        _this.summarys[imgcount] = summary;
        
    }

    //触发图片改变
    _this.changeimg = function (n)
    {       
        if(_this.imgs.length < 1)
        {       
            return;       
        }       
        
        if(_this.currentTimer != null)
            window.clearInterval(_this.currentTimer); //清除用于循环的currentTimer  
        
        _this.currentTimer = window.setInterval(_this.onchangeimg, interval * 1000);//设置循环周期为4000
        
        _this.nextIndex = n; //要显示的ID等于传入的N值,
        _this.onchangeimg();
    }
    
    //改变图片操作
    _this.onchangeimg = function()       
    {
        try
        {
             if(_this.imgs.length < 1)
             {       
                 return;       
             }     
             if(_this.firstFlag == 0)
             {
                _this.firstFlag = 1;
             }       
             else if(document.all && !getVersion())
             {
                 var imgfilter = document.getElementById(uid + "div").filters[0];
                 imgfilter.Apply();
                 imgfilter.Play(duration);
                 imgfilter.transition=23;
             }
             //图片未加载完毕
             if(_this.imgs[_this.nextIndex].getAttribute("loadedflag") == null)
             {
                document.getElementById(uid + "pic").src = "/system/resource/images/space.gif";
             }
             else
             {
                //图片正常加载, 设置图片
                _this.constrainimg(document.getElementById(uid + "pic"), _this.imgs[_this.nextIndex], document.getElementById(uid + "imgdiv"));
             }
             //设置当前图片编号
             _this.currentIndex = _this.nextIndex;
             
             
             document.getElementById(uid + "url").href = _this.urls[_this.nextIndex];
			
			 btitle = true;
             if(btitle)
             {       
                 document.getElementById(uid + "newstitle").innerHTML = _this.titles[_this.nextIndex];
                 
                 document.getElementById(uid + "newstitle").href = _this.urls[_this.nextIndex];
                 document.getElementById(uid + "newstitle").title =_this.titles[_this.nextIndex];
             }       
             if(bsummary)
             {
                 document.getElementById(uid + "newssummary").innerHTML = _this.summarys[_this.nextIndex];
                 document.getElementById(uid + "newssummary").href = _this.urls[_this.nextIndex];
             }       
             //设置所有按钮的样式
             for(var i = 0;i < _this.imgs.length; i++)
             {       
                  if(i == _this.nextIndex)
                    document.getElementById(uid + "selectNode"+i).className='imagechangenews_fnode';
                  else
                    document.getElementById(uid + "selectNode"+i).className='imagechangenews_pnode';
             }       
             _this.nextIndex++;       
             if(_this.nextIndex >= _this.imgs.length)
             {
                //如果ID大于总图片数量。则从头开始循环       
                _this.nextIndex = 0;       
             }       
        }       
        catch(e)
        {
        }
    }
    
    //等比例设置图片
    _this.constrainimg = function(imgobj, imagevar, imgdiv)
    {
        try
        {
            var widthrate = imagevar.width / width;
            var heightrate = imagevar.height / height;
            var imgwidth = 0;
            var imgheight = 0;
            
            if(widthrate > 1 || heightrate > 1) //图片过大时
            {
                if(zoomtype)//按比例缩小
                {
                    var rate = Math.max(widthrate, heightrate);
                    imgwidth = Math.max(1, Math.min(imagevar.width/rate, width));
                    imgheight = Math.max(1, Math.min(imagevar.height/rate, height));
                }
                else//拉伸
                {
                    imgwidth = width;
                    imgheight = height;
                }
            }
            else if(widthrate < 1 || heightrate < 1) //图片小
            {
                if(zoomout)//自动放大
                {
                    if(zoomtype)//按比例放大
                    {
                        var rate = Math.max(widthrate, heightrate);
                        imgwidth = Math.max(1, Math.min(imagevar.width/rate, width));
                        imgheight = Math.max(1, Math.min(imagevar.height/rate, height));
                    }
                    else //拉伸
                    {
                        imgwidth = width;
                        imgheight = height;
                    }
                }
                else
                {
                   imgwidth = imagevar.width;
                   imgheight = imagevar.height;
                }
            }
            else //大小合适
            {
               imgwidth = width;
               imgheight = height;
            }

            imgobj.src = imagevar.src;
            imgobj.width = imgwidth;
            imgobj.height = imgheight;
            imgdiv.style.paddingTop = (height - imgheight)/2;
        }
        catch(e)
        {
        }
    }
}