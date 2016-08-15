/**
 * Created by yangjianzhong on 16/7/10.
 */
(function () {
    var oDiv=document.getElementById("box");
    var oUl=oDiv.getElementsByTagName("ul");
    //var aLis=oUl.getElementsByTagName("li");
    
    //rnd();
    function rnd(n,m) {//封装任意数的时候,两点注意1)判断是否是有效数字2)如果前面的大于后面的,要记得调整位置
        n=Number(n);
        m=Number(m);
        if(isNaN(n)||isNaN(m)){
            return Math.random();
        }
        if(n>m){
            var tmp=n;
            n=m;
            m=tmp;

        }
        return Math.round(Math.random()*(n-m)+m);
    }
    alert(rnd(2,50));
    //高度不限,颜色不限
    function createLi() {
        var li=document.createElement("li");
        li.style.height=rnd(50,300)+"px";//高度要加上px
        li.style.background="rgb("+rnd(0,255)+","+rnd(0,255)+","+rnd(0,255)+")";
        return li;
    }
    li50();
    function li50() {
        var ary=utils.listToArray(oUl);
        console.log(ary);
        for(var i=0;i<50;i++){
           var eLi=createLi();
            console.log(eLi);
            ary=ary.sort(function(a,b){//比较的时ul的高度,ul的高度是由li撑起来的
                var aH=utils.css(a,"height");
                var bH=utils.css(b,"height");
                return aH-bH
            });
            ary[0].appendChild(eLi);
        }
    }
    window.onscroll=function () {
        if(utils.win("scrollTop")>utils.css(oDiv,"height")-500){
            li50();
        }
    }
   

})()