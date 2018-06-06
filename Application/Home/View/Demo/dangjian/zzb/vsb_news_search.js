function vsb_news_search()
{
    //当前是否显示了验证码
    this.isShowCode = false;
    //当前是否能够查询，一般用于查询验证码错误时，直接显示验证码输入框
    this.isSearch = false;
    //tooltip 显示层的编号
    this.tooltipid = "tooltip";
    //不再body上挂接 本div 而在这个目标上编号上挂接，防止模板保存会多
    this.apptag="";
    //遮盖select iframe编号 可以没有
    this.frametag="";
    //层的优先级值
    var zIndexvalue = 9999;
    //设置div 名字 在模板删除时使用
    this.deldivname = "javascript_create_body_append_node";
    function $(oid)
    {
        return  document.getElementById(oid)  
    }
    
    this.addEvent = function(elm, evType, fn, useCapture) { 
        if (elm.addEventListener) {  
            elm.addEventListener(evType, fn, useCapture);//DOM2.0   
            return true; 
        } 
        else if (elm.attachEvent) { 
            var r = elm.attachEvent('on' + evType, fn);//IE5+ 
            return r; 
        }
        else {  
            elm['on' + evType] = fn;//DOM 0 
        } 
    }
    
    
    this.newelement = function(newid)
    {   
        if(document.createElement)
        {
            var el = document.createElement('div');
            el.id = newid;
            el.name= this.deldivname;
            with(el.style)
            {
                display = 'none';
                position = 'absolute';
                background='#ffffe1';
            }
            el.innerHTML = ' ';
            //var to = $(this.apptag);
            //if(to)
            //{
                document.body.appendChild(el);
            //}
        }              
    } 
    this.tgetAbsTop = function (e)
    {
          var   t=e.offsetTop;
          while(e=e.offsetParent)
              t += e.offsetTop;
          return t ;           
    }
    this.tgetAbsLeft = function (e)
    {
          var   t=e.offsetLeft;
          while(e=e.offsetParent)
              t += e.offsetLeft;
          return t;          
    } 
    
    this.show= function ()
    {
        var obj = $(this.tooltipid);
        if(obj)
        {
            obj.style.display = 'block';
        }
        var ifrRef = $(this.frametag);
        if(ifrRef)
        {
            ifrRef.style.display = 'block';
        }
    }
    
    
    this.exit= function ()
    {
        var obj = $(this.tooltipid);
        if(obj)
        {
            obj.style.display = 'none';
        }
        var ifrRef = $(this.frametag);
        if(ifrRef)
        {
            ifrRef.style.display = 'none';
        }
    }
    
    this.tooltip = function (tip,obj)
    {
        var otag = $(this.tooltipid);
        if(otag) 
        {
            otag = null;
        }
        this.newelement(this.tooltipid);
        var lixlpixel_tooltip = $(this.tooltipid);
        lixlpixel_tooltip.innerHTML = tip;
        lixlpixel_tooltip.style.display = 'block';
        lixlpixel_tooltip.style.left = this.tgetAbsLeft(obj)+ 'px';
        lixlpixel_tooltip.style.top =this.tgetAbsTop(obj) + obj.offsetHeight + 'px';
        lixlpixel_tooltip.style.zIndex = zIndexvalue;
        lixlpixel_tooltip.style.border = '1px solid #cccccc';
        
        var ifrRef = $(this.frametag);
        if(ifrRef)
        {
            ifrRef.style.width   =   lixlpixel_tooltip.offsetWidth;   
            ifrRef.style.height   =   lixlpixel_tooltip.offsetHeight;   
            ifrRef.style.top   =   lixlpixel_tooltip.style.top;   
            ifrRef.style.left   =   lixlpixel_tooltip.style.left;
            ifrRef.style.zIndex   =  lixlpixel_tooltip.style.zIndex   -   1;   
            ifrRef.style.display   =   "block";    
        } 
    }
}