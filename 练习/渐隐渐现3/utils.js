/**
 * Created by yangjianzhong on 16/7/11.
 */
var utils={
    jsonParse:function (str) {
        return "JSON" in window?JSON.parse(str):eval("("+str+")");
    },
    getCss:function (curELe,attr) {
        var val,reg;
        if("getComputedStyle" in window){
            val=getComputedStyle(curELe,null)[attr];
        }else{
            if(attr==="opacity"){
                val=curELe.currentStyle["filter"];
                reg=/^alpha\(opacity[:=](\d+)\)/g;
                return reg.test(val)?RegExp.$1/100:1;
            }else{
                val=curELe.currentStyle[attr];
            }
        }
        reg=/([+-])?\d+(\.\d+)?(px|pt|em|rem)/g;
        return reg.test(val)?parseFloat(val):val;
    },
    setCss:function (curELe,attr,value) {
        if(attr==="float"){
            curELe.style.styleFloat=value;
            curELe.style.cssFloat=value;
            return;
        }
        if(attr==="opacity"){
            curELe.style.opacity=value;
            curELe.style.filter="alpha(opacity="+value*100+")";
            return;
        }
        var reg=/width|height|top|right|bottom|left|((margin|padding)(top|right|bottom|left)?)/g;
        if(reg.test(attr)){
            value=parseFloat(value)+"px";
        }
        curELe.style[attr]=value;
    },
    setGroupCss:function (curEle,option) {
        for(var attr in option){
            this.setCss(curEle,attr,option[attr]);
        }
    },
    css:function css(curEle) {
        var arg1=arguments[1];
        if(typeof arg1==="string"){
            var arg2=arguments[2];
            if(typeof arg2==="undefined"){
                return this.getCss(curEle,arg1);
            }else{
                this.setCss(curEle,arg1,arg2);
            }
        }else if(arg1.toString()==="[object Object]"){
            this.setGroupCss(curEle,arg1)
        }
    },
    
}