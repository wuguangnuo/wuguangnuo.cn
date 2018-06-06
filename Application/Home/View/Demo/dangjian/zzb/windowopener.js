/** 用于在当前页面用Div打开一个新页面                           **/
/** 打开页面的方法为divWin.open(arg0,arg1,...);                **/
/** 参数详见方法说明，关闭页面的方法为divWin.close();            **/
/** 如果是在被打开的页面来关闭自己方法为parent.divWin.close();   **/
/** author:jzhou                                              **/
/** date:2009-11-10 为richfaces修改                            **/

DivWindow = function(){};

DivWindow.prototype = {

    idSuffix : parseInt(Math.random() * 10000),
    moving : false,
    pX : 0,
    pY : 0,
    draging : false,
    height : 300,
    width : 500,
    parentReloadUrl : "",
	isRefreshParent : false,
    dpX : 0,
    dpY : 0,
    mainDiv : null,
    contentDiv : null,
    shadowDiv : null,
    iframeTd : null,

    init : function () {
        this.mainDiv = document.createElement("div");
        with (this.mainDiv.style) {
            display = "none";
            zIndex = 9997;
            top = 0 + "px";
            left = 0 + "px";
            position = "absolute";
            backgroundColor = "#000000";
            filter = "alpha(opacity=10)";
            opacity = "0.1";
            }
        document.body.appendChild(this.mainDiv);
        
        this.contentDiv = document.createElement("div");
        with (this.contentDiv.style) {
            display = "none";
            zIndex = 9999;
            position = "absolute";
            backgroundColor = "#FFFFFF";
            }
        document.body.appendChild(this.contentDiv);

        this.shadowDiv = document.createElement("div");
        this.shadowDiv.className = "divshadow";
        document.body.appendChild(this.shadowDiv);

        var strFrame = '<TABLE class="divwinmaintable" cellpadding="0" cellspacing="1" width="100%" height="100%">';
        strFrame += '		<TR>';
        strFrame += '			<TD height="25px" class="divwintitbg">';
        strFrame += '				<TABLE cellSpacing=0 cellPadding=0 width="100%" height="24px" border="0">';
        strFrame += '					<TR>';
        strFrame += '						<TD width="9px"></TD><TD width="12px" height="12px" class="divwintitarrow"></TD><TD width="9px"></TD>';
        strFrame += '						<TD id="divWinTitle' + this.idSuffix + '" class="divwintitle"></TD>';
        strFrame += '						<TD id="divWinCloseButton' + this.idSuffix + '" width="12px" height="12px" title="&#20851;&#38381;" class="divwinclose"></TD><TD width="9px"></TD>';
        strFrame += '					</TR>';
        strFrame += '				</TABLE>';
        strFrame += '			</TD>';
        strFrame += '		</TR>';
        strFrame += '		<TR>';
        strFrame += '			<TD id="iframeTd' + this.idSuffix + '">';
        strFrame += '				<iframe src="" style="width:100%;height:100%;" frameborder="0" name="divWinPageFrame' + this.idSuffix + '" id="divWinPageFrame' + this.idSuffix + '"></iframe>';
        strFrame += '			</TD>';
        strFrame += '		</TR>';
        strFrame += '		<TR>';
        strFrame += '			<TD height="7px"  class="divwinstatebar">';
        strFrame += '				<TABLE cellSpacing=0 cellPadding=0 width="7px" height="100%" border="0" align="right">';
        strFrame += '					<TR>';
        strFrame += '						<TD id="divWinStateBar' + this.idSuffix + '" class="divwinls"></TD>';
        strFrame += '					</TR>';
        strFrame += '				</TABLE>';
        strFrame += '			</TD>';
        strFrame += '		</TR>';
        strFrame += '	</TABLE>';

        this.contentDiv.innerHTML = strFrame;
        this.closeButton = document.getElementById("divWinCloseButton" + this.idSuffix);
        Object.addEvent(this.closeButton, ["onclick"], this.close.bindx(this));
        this.title = document.getElementById("divWinTitle" + this.idSuffix);
        Object.addEvent(this.title, ["onmousedown"], this.beginMove.bindx(this));
        Object.addEvent(this.title, ["onmousemove"], this.move.bindx(this));
        Object.addEvent(this.title, ["onmouseup"], this.endMove.bindx(this));
        this.iframeTd = document.getElementById("iframeTd" + this.idSuffix);
        this.pageFrame = document.getElementById("divWinPageFrame" + this.idSuffix);
        this.stateBar = document.getElementById("divWinStateBar" + this.idSuffix);
        Object.addEvent(this.stateBar, ["onmousedown"], this.beginDrag.bindx(this));
        Object.addEvent(this.stateBar, ["onmousemove"], this.drag.bindx(this));
        Object.addEvent(this.stateBar, ["onmouseup"], this.endDrag.bindx(this));
    },

    /**
	 * 参数说明
	 * url 要打开的页面的地址
	 * title 页面的标题，默认为“新页面”
	 * height 打开页面的高度，默认为 300
	 * width 打开页面的宽度，默认为500
	 * refreshParent 是否在关闭时刷新父页面,默认不刷新
	 * keepParentAlive 是否保持父页面能活动，默认不能活动
	 * position 窗口的位置0中间 1左上 2 右上 3左下 4右下，默认为0
	 */
    open : function (url, title, height, width, refreshParent, keepParentAlive, position) {
        if (title) {
            this.title.innerHTML = title;
        } else {
            this.title.innerHTML = "&#26032;&#39029;&#38754;";
        }
        if (height) {
            this.height = parseInt(height);
        }
        if (width) {
            this.width = parseInt(width);
        }
        this.contentDiv.style.height = this.height + "px";
        this.iframeTd.style.height = parseInt(this.contentDiv.style.height) - 38 + "px";
        this.contentDiv.style.width = this.width + "px";
        this.shadowDiv.style.height = this.height + "px";
        this.shadowDiv.style.width = this.width + "px";
        switch (position) {
            case 0 :
                this.contentDiv.style.top = (window.document.body.clientHeight - divWin.height) / 2 - 30 + "px";
                this.contentDiv.style.left = (window.document.body.clientWidth - divWin.width) / 2 + "px";
                break;
            case 1 :
                this.contentDiv.style.top = 0 + "px";
                this.contentDiv.style.left = 0 + "px";
                break;
            case 2 :
                this.contentDiv.style.top = 0 + "px";
                this.contentDiv.style.left = window.document.body.clientWidth - this.width + "px";
                break;
            case 3 :
                this.contentDiv.style.top = window.document.body.clientHeight - this.height + "px";
                this.contentDiv.style.left = 0 + "px";
                break;
            case 4 :
                this.contentDiv.style.top = window.document.body.clientHeight - this.height + "px";
                this.contentDiv.style.left = window.document.body.clientWidth - this.width + "px";
                break;
            case 5:
                this.contentDiv.style.top = 0 + "px";
                this.contentDiv.style.left = (window.document.body.clientWidth - this.width) / 2 + "px";
                break;
            case 6:
                this.contentDiv.style.top = window.document.body.clientHeight - this.height + "px";
                this.contentDiv.style.left = (window.document.body.clientWidth - this.width) / 2 + "px";
                break;
            default :
                this.contentDiv.style.top = (window.document.body.clientHeight - this.height) / 2 - 30 + "px";
                this.contentDiv.style.left = (window.document.body.clientWidth - this.width) / 2 + "px";
        }
        this.shadowDiv.style.top = parseInt(this.contentDiv.style.top) + 4 + "px";
        this.shadowDiv.style.left = parseInt(this.contentDiv.style.left) + 4 + "px";
        if (parseInt(this.contentDiv.style.top) < 0){
            this.contentDiv.style.top = 0 + "px";
            this.shadowDiv.style.top = 0 + "px";
        }
        this.mainDiv.style.width = document.body.scrollWidth + "px";
        if (document.body.clientHeight > document.body.scrollHeight) {
            this.mainDiv.style.height = document.body.clientHeight + "px";
        } else {
            this.mainDiv.style.height = document.body.scrollHeight + "px";
        }
        this.pageFrame.src = url + (url.indexOf("?") == -1 ? "?" : "&") + new Date().getTime() + (10000 + parseInt(Math.random() * 10000));
        if (!keepParentAlive) {
            this.mainDiv.style.display = "block";
        }
        this.contentDiv.style.display = "block";
        this.shadowDiv.style.display = "block";

		if (refreshParent) {
			this.isRefreshParent = true;
		}
    },

    /**
	 * 关闭窗口，注意：如果是在被打开的页面上关闭自己需要调用parent.divWin.close();
	 */
    close : function () {
        this.mainDiv.style.display = "none";
        this.contentDiv.style.display = "none";
        this.shadowDiv.style.display = "none";
        this.pageFrame.src = "";
		if (this.isRefreshParent) {
			document.execCommand("Refresh");
        }
    },

    /**
     * 关闭并刷新父窗口
     */
    closeR : function (){
        this.mainDiv.style.display = "none";
        this.contentDiv.style.display = "none";
        this.shadowDiv.style.display = "none";
        this.pageFrame.src = "";
        if (this.parentReloadUrl!=""){
            if (document.getElementById(this.parentReloadUrl)){
                click(this.parentReloadUrl);
            }else{
                location.href = this.parentReloadUrl;
            }
        }
    },


    beginMove : function (e) {
        if (ISIE) {
            this.title.setCapture();
            this.pX = event.x - this.contentDiv.style.pixelLeft;
            this.pY = event.y - this.contentDiv.style.pixelTop;
        } else {
            document.addEventListener("mousemove", divWin.move.bindx(this), true);
            this.pX = e.clientX - parseInt(this.contentDiv.style.left);
            this.pY = e.clientY - parseInt(this.contentDiv.style.top);
        }
        this.moving = true;
    },
	
    /**
	 * �ƶ���
	 */
    move : function (e) {
        if (this.moving) {
            if (ISIE) {
                this.contentDiv.style.left = event.x - this.pX + "px";
                if (event.y - this.pY > 0){
                    this.contentDiv.style.top = event.y - this.pY + "px";
                }else{
                    this.contentDiv.style.top = 0 + "px";
                }
                this.shadowDiv.style.top = parseInt(this.contentDiv.style.top) + 4 + "px";
                this.shadowDiv.style.left = parseInt(this.contentDiv.style.left) + 4 + "px";
            } else {
                this.contentDiv.style.left = e.clientX - this.pX + "px";
                if (e.clientY - this.pY > 0){
                    this.contentDiv.style.top = e.clientY - this.pY + "px";
                }else{
                    this.contentDiv.style.top = 0 + "px";
                }
                this.shadowDiv.style.top = parseInt(this.contentDiv.style.top) + 4 + "px";
                this.shadowDiv.style.left = parseInt(this.contentDiv.style.left) + 4 + "px";
            }
        }
    },
	
    /**
	 * �ƶ�����
	 */
    endMove : function (e) {
        if (ISIE) {
            this.title.releaseCapture();
        } else {
            document.removeEventListener("mousemove", this.move.bindx(this), true);
        }
        this.moving = false;
    },

    beginDrag : function (e) {
        if (ISIE) {
            this.stateBar.setCapture();
            this.dpX = event.x;
            this.dpY = event.y;
        } else {
            document.addEventListener("mousemove", this.drag.bindx(this), true);
            document.addEventListener("mouseup", this.endDrag.bindx(this), true);
            this.dpX = e.clientX;
            this.dpY = e.clientY;
        }
        this.draging = true;
    },
	
    drag : function (e) {
        if (this.draging) {
            if (ISIE) {
                try{
                    this.contentDiv.style.width = this.width + event.x - this.dpX + "px";
                    this.contentDiv.style.height = this.height + event.y - this.dpY + "px";
                    this.iframeTd.style.height = parseInt(this.contentDiv.style.height) - 38 + "px";
                    this.shadowDiv.style.width = parseInt(this.contentDiv.style.width) + "px";
                    this.shadowDiv.style.height = parseInt(this.contentDiv.style.height) + "px";
                } catch (e) {
                }
            } else {
                this.contentDiv.style.width = this.width + e.clientX - this.dpX + "px";
                this.contentDiv.style.height = this.height + e.clientY - this.dpY + "px";
                this.iframeTd.style.height = parseInt(this.contentDiv.style.height) - 38 + "px";
                this.shadowDiv.style.width = parseInt(this.contentDiv.style.width) + "px";
                this.shadowDiv.style.height = parseInt(this.contentDiv.style.height) + "px";
            }
        }
    },
	
    endDrag : function (e) {
        if (ISIE) {
            this.stateBar.releaseCapture();
        } else {
            document.removeEventListener("mousemove", this.drag.bindx(this), true);
            document.removeEventListener("mouseup", this.endDrag.bindx(this), true);
        }
        this.width = parseInt(this.contentDiv.style.width);
        this.height = parseInt(this.contentDiv.style.height);
        this.draging = false;
    }
}

var divWin;

Object.addEvent(window, ["onload"], function () {
    divWin = new DivWindow();
    divWin.init();
});


