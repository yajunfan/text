/**
 * Created by yangjianzhong on 16/7/10.
 */
(function () {
    var oBox=document.getElementById("box");
    var oBoxInner=oBox.getElementsByTagName("div")[0];
    var aDiv=oBoxInner.getElementsByTagName("div");
    var aImg=oBoxInner.getElementsByTagName("img");
    var oUl=document.getElementsByTagName("ul")[0];
    var aLi=document.getElementsByTagName("li");
    var oBtnLeft=document.getElementsByTagName("a")[0];
    var oBtnRight=document.getElementsByTagName("a")[1];
    var step=0;
    var autoTimer=null;
    var interval=1000;
    var data=null;
    getData();
    function getData() {
        var xml=new XMLHttpRequest();
        xml.open("get","json/data.txt",false);
        xml.onreadystatechange=function () {
            if(xml.readyState===4 &&/^2\d{2}$/.test(xml.status)){
                data=utils.jsonParse(xml.responseText);
                console.log(data)
            }
        }
        xml.send(null);
    }
    bind();
    function bind() {
        var str1="";
        var str2="";
        for(var i=0;i<data.length;i++){
            str1+='<div><img realImg="'+data[i].imgSrc+'" alt=""></div>';
            str2+=i===0?'<li class="bg"></li>':'<li></li>';
        }
        oBoxInner.innerHTML=str1;
        oUl.innerHTML=str2;
        utils.css(aDiv[0],"opacity",1)
    }
    // setInterval(lazyImg,interval);
    lazyImg()
    function lazyImg() {
        for(var i=0;i<aImg.length;i++){
            var tmp= new Image;
            tmp.src=aImg[i].getAttribute("realImg");
            tmp.index=i;
            tmp.onload=function () {
                aImg[this.index].src=this.src;
                tmp=null;
                utils.css(aDiv[0],"opacity",1);
            }
        }
    }
    clearInterval(autoTimer);
    autoTimer=setInterval(autoMove,interval);
    function autoMove() {
        if(step>=aDiv.length-1){
            step=-1;
        }
        step++;
        setBanner();

    }
    function setBanner() {
        for(var i=0;i<aDiv.length;i++){
            if(i===step){
                utils.css(aDiv[i],"zIndex",1);
                zhufengAnimate(aDiv[i],{opacity:1},500,function () {
                    var siblings=utils.siblings(this);
                    for(var k=0;k<siblings.length;k++){
                        zhufengAnimate(siblings[k],{opacity:0},500)
                    }
                })
            }else{
                utils.css(aDiv[i],"zIndex",0);
            }
        }
        bannerTip();
    }
    function bannerTip() {
        for(var i=0;i<aLi.length;i++){
            var tmpStep=step>=aLi.length?0:step;
            aLi[i].className=i===tmpStep?"bg":"";
        }
    }
    mouse();
    function mouse() {
        oBox.onmouseover=function () {
            clearInterval(autoTimer);
            oBtnLeft.style.display=oBtnRight.style.display="block";
        };
        oBox.onmouseout=function () {
            autoTimer=setInterval(autoMove,interval);
            oBtnLeft.style.display=oBtnRight.style.display="none";
        }
    }
    handleChange();
    function handleChange() {
        for(var i=0;i<aLi.length;i++){
            aLi[i].index=i;
            aLi[i].onclick=function () {
                step=this.index;
                setBanner()
            }
        }
    }
   button();
    function button() {
        oBtnRight.onclick=autoMove;
        oBtnLeft.onclick=function () {
            if(step<=0){
                step=aLi.length;
            }
            step--;
            setBanner();
        }
    }

})();