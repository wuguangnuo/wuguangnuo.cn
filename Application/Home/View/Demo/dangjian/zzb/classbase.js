Object.extend = function (a, b) {
    //追加方法
    for (var i in b) a[i] = b[i];
    return a;
}

Object.extend(Object, {

    addEvent : function (a, b, c, d) {
        //给对象增加事件
        if (a.attachEvent) a.attachEvent(b[0], c);
        else a.addEventListener(b[1] || b[0].replace(/^on/, ""), c, d || false);
        return c;
    },

    delEvent : function (a, b, c, d) {
        if (a.detachEvent) a.detachEvent(b[0], c);
        else a.removeEventListener(b[1] || b[0].replace(/^on/, ""), c, d || false);
        return c;
    },

    reEvent : function () {
        //移除对象事件
        return window.event ? window.event : (function (o) {
            do {
                o = o.caller;
            } while (o && !/^\[object[ A-Za-z]*Event\]$/.test(o.arguments[0]));
            return o.arguments[0];
        })(this.reEvent);
    }

})

function isCursorInComponentBody(obj,eventTag){
    try{
        var event = eventTag;
        return event.clientX > getComponentLeft(obj) - document.body.scrollLeft && event.clientX < getComponentLeft(obj) + obj.clientWidth - document.body.scrollLeft && event.clientY > getComponentTop(obj) - document.body.scrollTop && event.clientY < getComponentTop(obj) + obj.offsetHeight - document.body.scrollTop;
    }catch(e){
        return false;
    }
}

function getComponentLeft(obj){
    var left = obj.offsetLeft;
    var objParent = obj.offsetParent;
    while (objParent){
        left += objParent.offsetLeft;
        objParent = objParent.offsetParent;
    }
    return left;
}

function getComponentTop(obj){
    var top = obj.offsetTop;
    var objParent = obj.offsetParent;
    while (objParent){
        top += objParent.offsetTop;
        objParent = objParent.offsetParent;
    }
    return top;
}

var $Arr = function (a) {
    return a ? Array.apply(null, a) : new Array;
}

Function.prototype.bindx = function () {
    var funcObj = this, a = $Arr(arguments), o = a.shift();
    return function () {
        funcObj.apply(o, a.concat($Arr(arguments)));
    };
}

var ISIE = /MSIE/.test(window.navigator.userAgent);

function getEvent(){

    if(ISIE)    return window.event;
    func=getEvent.caller;
    while(func!=null){
        var arg0=func.arguments[0];
        if(arg0){
            if((arg0.constructor==Event || arg0.constructor ==MouseEvent)
                || (typeof(arg0)=="object" && arg0.preventDefault && arg0.stopPropagation)){
                return arg0;
            }
        }
        func=func.caller;
    }
    return null;
}

function click(buttonId){
    if (ISIE){
        document.getElementById(buttonId).click();
    }else{
        document.getElementById(buttonId).onclick();
    }
}
function parentClick(buttonId){
    if (ISIE){
        parent.document.getElementById(buttonId).click();
    }else{
        parent.document.getElementById(buttonId).onclick();
    }
}