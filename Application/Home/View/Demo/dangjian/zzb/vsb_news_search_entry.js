function vsb_news_search_entry()
{
    _searchthis = this;
    this.formname="";
    this.formobj="";
    this.news_search_obj;   
    this.querytxtsize = 155;
    this.yzmts="";
    this.qdstyle="";
    this.qdname="";
    this.qxstyle="";
    this.qxname="";
    this.showstr="请输入查询验证码";
    this.searchCodestr = "searchCode";
}
vsb_news_search_entry.prototype = 
{  
    checkdata:function(formname)
    {
        var  base64 = new Base64();
        _searchthis.formobj = formname;
        if(window.toFF==1)
        {
            var ssvalue = formname.INTEXT.value;
            formname.INTEXT2.value = Simplized(ssvalue);
            //new VsbFormFunc().disableAutoEnable(formname.INTEXT);
            formname.INTEXT2.value = base64.encode(formname.INTEXT2.value);
            formname.INTEXT.value ="";
        }else
        {
            formname.INTEXT2.value = formname.INTEXT.value;
            //new VsbFormFunc().disableAutoEnable(formname.INTEXT);
            formname.INTEXT2.value = base64.encode(formname.INTEXT2.value);
            formname.INTEXT.value ="";
        }
        if(_searchthis.news_search_obj.isShowCode==false)
        {
            NewsSearchDWR.isSearch(_searchthis.getSearchResult);
        }else
        {
            var searchCode = document.getElementById(_searchthis.searchCodestr+_searchthis.formname);
            if(searchCode)
            {
                if(searchCode.value=="")
                {
                    searchCode.focus();
                    alert(_searchthis.showstr);   
                    
                    return false;
                }else
                {
                     formname.news_search_code.value=searchCode.value;
                    _searchthis.news_search_obj.isShowCode = false;
                    _searchthis.news_search_obj.exit();
                    return true;
                }
            }else
            {
                return true;
            }
        }
        return false;
    },
    getSearchResult:function(data)
    {
        //alert(data);
        if(data && data==true)
        {
            _searchthis.news_search_obj.isShowCode = false;
            _searchthis.news_search_obj.exit();            
            if(!_searchthis.isIE())
            {
                
                var openformname = _searchthis.formname+parseInt(Math.random()*99);
                var testopen = window.open("about:blank",openformname); 
                if(testopen)
                {
                        _searchthis.formobj.target=openformname;
                }else
                {
                       _searchthis.formobj.target="_self"        
                }
            }
            _searchthis.formobj.submit();  
        }else
        {
            _searchthis.news_search_obj.isShowCode = true;
            _searchthis.createDiv();      
        }

    },
    createDiv:function()
    {
        var tagobj = _searchthis.formobj.INTEXT;

        if(tagobj)
        {
            var content = "<table width='"+_searchthis.querytxtsize+"' ><tr><td colspan=2 style='font-size:10pt'>"+_searchthis.yzmts+"</td></tr><tr><td width='1%' nowrap><img src='/system/resource/code/news/newsearch/createimage.jsp' width='60' height='20'></td><td><input type='text' id='searchCode"+_searchthis.formname+"' name='searchCode"+_searchthis.formobj.name+"' value='' style='width:60px' maxlength='4'></input></td></tr><tr><td nowrap align='right' "+_searchthis.qdstyle+" style='font-size:10pt'><span onclick='if(document."+_searchthis.formobj.name+".onsubmit()){document."+_searchthis.formobj.name+".submit()} ' style='cursor:pointer;'>"+_searchthis.qdname+"</span></td><td "+_searchthis.qxstyle+" style='font-size:10pt;padding-left:10px' nowrap ><span onclick='_searchthis.hiddenDiv()' style='cursor:pointer;'>"+_searchthis.qxname+"</span></td></td></tr></table>";
            _searchthis.news_search_obj.tooltip(content,tagobj);  
            _searchthis.news_search_obj.addEvent(window,'resize',_searchthis.fixPosDiv,true);
            _searchthis.formobj.INTEXT.disabled=false;
        }   

    },
    fixPosDiv:function()
    {
        var obj = document.getElementById(_searchthis.news_search_obj.tooltipid);
        var tagobj = document.getElementById(_searchthis.news_search_obj.apptag);
        var tagframeobj = document.getElementById( _searchthis.news_search_obj.frametag);
        
        if(obj)
        {
            var showleft = _searchthis.news_search_obj.tgetAbsLeft(tagobj)+ 'px';
            var showtop = _searchthis.news_search_obj.tgetAbsTop(tagobj) + _searchthis.formobj.INTEXT.clientHeight+3+ 'px';
            
            obj.style.left = showleft;
            obj.style.top = showtop;
            tagframeobj.style.left = showleft;
            tagframeobj.style.top = showtop;            
            
            
        }
    },
    isIE:function()
    {
        if(navigator.userAgent.indexOf("MSIE")>0)
        {  
         return true;  
        }        
    },
    hiddenDiv:function()
    {
        _searchthis.news_search_obj.exit();
        _searchthis.news_search_obj.isShowCode = false;
        
    }
    
    
}