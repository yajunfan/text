/**
 * Created by Administrator on 2016/6/30.
 */
//单例模式封装
var utils = (function () {
    var flag = 'getComputedStyle' in window;

    /**
     * rnd:兼容版的求一定范围的随机数 n,m
     * @param n
     * @param m
     * @returns {number}
     */
    function rnd(n, m) {
        n = Number(n);
        m = Number(m);
        if (isNaN(n) || isNaN(m)) {
            return Math.random();//如果传的数字无效，直接返回0-1随机小数
        }
        if (n > m) {
            tmp = n;
            n = m;
            m = tmp;
        }
        return Math.round(Math.random() * (m - n) + n);
    }
    /**
     * listToArray：类数组转数组
     * @param arg 类数组
     * @returns {*}  数组
     */
    function listToArray(arg) {
        if (flag) {
            return Array.prototype.slice.call(arg)
        }
        var ary = [];
        for (var i = 0; i < arg.length; i++) {
            ary[ary.length] = arg[i];
        }
        return ary;
    }

    /**
     * jsonParse:将JSON格式的字符串转化为JSON格式的对象
     * @param jsonStr
     * @returns {Object}
     */
    function jsonParse(jsonStr) {
        /*var obj={};
         if('JSON' in window){//高级浏览器支持
         obj=JSON.parse(jsonStr);
         }else{//处理低级浏览器的兼容
         obj=eval('('+jsonStr+')')
         }
         return obj;*/
        return 'JSON' in window ? JSON.parse(jsonStr) : eval('(' + jsonStr + ')');
    }

    function win(attr, value) {
        //获取时候就得return； 设置的时候不需要；
        //win有两个功能： 获取-return 设置（不需要return）
        //当win方法调用时，传了一个参数的时候（1.arguments.length 2.typeof value==='undefined'）；就是获取；否则就是设置；
        if (typeof value === 'undefined') {//获取
            return document.documentElement[attr] || document.body[attr];
        }
        //设置；
        document.documentElement[attr] = document.body[attr] = value;
    }

    function offset(curEle) {
        var l = curEle.offsetLeft;
        var t = curEle.offsetTop;
        var par = curEle.offsetParent;
        while (par) {
            if (navigator.userAgent.indexOf('MSIE 8.0') === -1) {
                l += par.clientLeft;
                t += par.clientTop;
            }
            l += par.offsetLeft;
            t += par.offsetTop;
            par = par.offsetParent;
        }
        return {left: l, top: t}
    }

    function getByClass(curEle, strClass) {
        curEle = curEle || document;
        if (flag) {
            return this.listToArray(curEle.getElementsByClassName(strClass))
        }
        var aryClass = strClass.replace(/(^ +)|( +$)/g, '').split(/\s+/g);
        var nodeList = curEle.getElementsByTagName('*');
        var ary = [];
        for (var i = 0; i < nodeList.length; i++) {
            var curNode = nodeList[i];
            var bOk = true;
            for (var k = 0; k < aryClass.length; k++) {
                var curClass = aryClass[k];
                //var reg=new RegExp('(^| +)'+curClass+'( +|$)')
                var reg = new RegExp('\\b' + curClass + '\\b');
                if (!reg.test(curNode.className)) {
                    bOk = false;
                    break;
                }
            }
            if (bOk) {
                ary[ary.length] = curNode;
            }
        }
        return ary;
    }

    function hasClass(curEle, cName) {
        cName = cName.replace(/(^ +)|( +$)/g, '')
        var reg = new RegExp('\\b' + cName + '\\b');
        return reg.test(curEle.className)
    }

    function addClass(curEle, strClass) {
        var aryClass = strClass.replace(/(^ +)|( +$)/g, '').split(/\s+/g);
        for (var i = 0; i < aryClass.length; i++) {
            var curClass = aryClass[i];
            if (!this.hasClass(curEle, curClass)) {
                curEle.className += ' ' + curClass;
            }
        }
    }

    function removeClass(curEle, strClass) {
        var aryClass = strClass.replace(/(^ +)|( +$)/g, "").split(/\s+/g);
        for (var i = 0; i < aryClass.length; i++) {
            var curClass = aryClass[i];
            var reg = new RegExp("(^| +)" + curClass + "( +|$)");
            if (reg.test(curEle.className)) {
                curEle.className = curEle.className.replace(reg, " ").replace(/\s+/, " ").replace(/(^ +)|( +$)/g, "");//先去除中间的空格，再去除首位的空格
            }
        }
    }

    function getCss(curEle, attr) {
        var val, reg;
        if (flag) {
            val = getComputedStyle(curEle, null)[attr];
        } else {
            if (attr === 'opacity') {
                val = curEle.currentStyle['filter'];
                reg = /^alpha\(opacity[=:](\d+)\)$/;
                return reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = curEle.currentStyle[attr];
            }

        }
        reg = /^([+-])?\d+(\.\d+)?(pt|px|rem|em)$/
        return reg.test(val) ? parseFloat(val) : val;
    }

    function setCss(curEle, attr, value) {
        if (attr === "float") {
            curEle.style.styleFloat = value;
            curEle.style.cssFloat = value;
            return;
        }
        if (attr === "opacity") {
            curEle.style.opacity = value;
            curEle.style.filter = "alpha(opacity=" + value * 100 + ")";
            return;
        }
        var reg = /(width|height|top|right|bottom|left|font-size|((margin|padding)(top|right|bottom|left)?))/g;
        if (reg.test(attr)) {
            value = parseFloat(value) + "px";
        }
        curEle.style[attr] = value;
    }

    function setGroupCss(curEle, option) {
        for (var attr in option) {
            this.setCss(curEle,attr,option[attr])
        }
    }

    function css(curEle) {
        var arg1 = arguments[1];//第二个参数
        if (typeof arg1 === "string") {//是字符串的话，就是获取css或者设置一个样式，判断有没有第三个参数
            var arg2 = arguments[2];
            if (typeof arg2 === "undefined") {//没有，那么就是获取css样式
                return utils.getCss(curEle, arg1)
            } else {
                utils.setCss(curEle, arg1, arg2)
            }

        } else {
            if (arg1.toString() === "[object Object]") {
                utils.setGroupCss(curEle, arg1)
            }

        }
    }

    function getChildren(curEle) {
        if (flag) {
            return this.listToArray(curEle.children)
        }
        var ary = [];
        var nodeList = curEle.childNodes;
        for (var i = 0; i < nodeList.length; i++) {
            if (nodeList[i].nodeType === 1) {
                ary[ary.length] = nodeList[i]
            }
        }
        return ary;
    }

    function prev(curEle) {
        if (flag) {
            return curEle.previousElementSibling;
        }
        var pre = curEle.previousSibling;
        while (pre && pre.nodeType !== 1) {
            pre = pre.previousSibling
        }
        return pre;
    }

    function prevAll(curEle) {
        var pre = this.prev(curEle);
        var ary = [];
        while (pre) {
            ary.push(pre);
            pre = this.prev(pre);
        }
        return ary;
    }

    function next(curEle) {
        if (flag) {
            return curEle.nextElementSibling;
        }
        var nex = curEle.nextSibling;
        while (nex) {
            if (nex && nex.nodeType !== 1) {
                nex = nex.nextSibling;
            }
            return nex;
        }
    }

    function nextAll(curEle) {
        var net = this.next(curEle);
        var ary = [];
        while (net) {
            if (net && net.nodeType == 1) {
                ary.push(net);
                net = this.next(net);
            }
        }
        return ary
    }

    function sibling(curEle) {
        var pre = this.prev(curEle);
        var nex = this.next(curEle);
        var ary = [];
        if (pre) {
            ary.push(pre);
        }
        if (nex) {
            ary.push(nex)
        }
        return ary;
    }

    function siblings(curEle) {
        return this.prevAll(curEle).concat(this.nextAll(curEle))
    }

    function firstChild(curEle) {
        return this.getChildren(curEle)[0];
    }

    function lastChild(curEle) {
        var lChild = this.getChildren(curEle);
        return lChild[lChild.length - 1];
    }

    function index(curEle) {
        return this.prevAll(curEle).length
    }

    function prependChild(parent, newEle) {
        var first = this.firstChild(parent);
        if (first) {
            parent.insertBefore(newEle, first);
        } else {
            parent.appendChild(newEle);
        }
    }

    function insertBefore(newEle, oldEle) {
        oldEle.parentNode.insertBefore(newEle, oldEle)
    }

    function insertAfter(newEle, oldEle) {
        var nex = this.next(oldEle);
        if (nex) {
            oldEle.parentNode.insertBefore(newEle, nex);
        } else {
            oldEle.parentNode.appendChild(newEle);
        }
    }

    return {
        //
        rnd: rnd,
        //
        listToArray: listToArray,
        //jsonParse:把JSON格式的字符串转成JSON格式的数据(对象)
        jsonParse: jsonParse,
        //win:浏览器盒子模型的兼容性处理；
        win: win,
        //offset:当前元素距离body的位置 {left:l,top:t}
        offset: offset,
        //getByClass：在一定的范围内，通过className来获取元素
        getByClass: getByClass,
        //hasClass:验证这个元素上是否有某个class名；
        hasClass: hasClass,
        //addClass:如果元素身上没有这个class名，我们才会添加
        addClass: addClass,
        //removeClass:移除某个className
        removeClass: removeClass,
        //getCss:获取经过浏览器计算过的样式（面试：如何获取非行间样式）
        getCss: getCss,
        //setCss:设置一个样式；给某个元素添加某个属性添加某个值，三个参数
        setCss: setCss,
        //设置一组样式 ；给某个元素添加一组属性和属性值。两个参数
        setGroupCss: setGroupCss,
        //取值赋值合体的函数：getcss，setcss，setGroupCss
        css: css,
        //getChildren：获取当前元素下的所有子元素
        getChildren: getChildren,
        //prev:获取上一个哥哥元素节点
        prev: prev,
        //prevAll:获取当前元素的所有哥哥元素节点
        prevAll: prevAll,
        //nex:获取下一个弟弟元素节点
        next: next,
        //nexAll：获取当前元素的所有弟弟元素节点
        nextAll: nextAll,
        //sibling:获取当前元素的相邻元素-->上一个哥哥+下一个弟弟
        sibling: sibling,
        //siblings:获取当前元素的所有兄弟节点
        siblings: siblings,
        /**
         * firstChild:获取当前元素下的第一个子元素
         * @param curEle
         * @returns {*}
         */
        firstChild: firstChild,
        /**
         * lastChild:获取当前元素下的最后一个子元素
         * @param curEle
         * @returns {*}
         */
        lastChild: lastChild,
        /**
         * 获取当前元素的索引
         * @param curEle
         * @returns {*}
         */
        index: index,
        /**
         * prependChild：把新元素插到当前容器的最开始
         * @param parent
         * @param newEle
         */
        prependChild: prependChild,
        /**
         * insertBefore：把新元素插入到当前元素的前面
         * @param newEle
         * @param oldEle
         */
        insertBefore: insertBefore,
        /**
         * insertAfter:把新元素插入到当前元素的后面
         * @param newEle
         * @param oldEle
         */
        insertAfter: insertAfter
    }
})();