/**
 * Created by yangjianzhong on 16/7/10.
 */
(function () {
    var oBox=document.getElementById("box");
    var oBoxInner=oBox.getElementsByTagName("div")[0];
    var aDiv=oBoxInner.getElementsByTagName("div");
    var aImg=oBoxInner.getElementsByTagName("img");
    var oUl=oBox.getElementsByTagName("ul")[0];
    var aLis=oBox.getElementsByTagName("li");
    var oBtnLeft=oBox.getElementsByTagName("a")[0];
    var oBtnRight=oBox.getElementsByTagName("a")[1];
    var data=null;
    var step=0;
    var autoTimer=null;
    var interval=1000;
    getData();
    function getData() {
        var xml=new XMLHttpRequest();
        xml.open("get","json/data.txt",false);
        xml.onreadystatechange=function () {
            if(xml.readyState===4 && /^2\d{2}$/.test(xml.status)){
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
            str2+=i===0?'<li class="bg"></li>':'<li></li>'
        }
        str1+='<div><img realImg="'+data[0].imgSrc+'" alt=""></div>';
        oBoxInner.innerHTML=str1;
        oUl.innerHTML=str2;
        oBoxInner.style.width=aDiv[0].offsetWidth*aDiv.length+"px";
    }
    setInterval(lazyImg,300);
    function lazyImg() {
        for(var i=0;i<aImg.length;i++){
            var tmp=new Image;
            tmp.src=aImg[i].getAttribute("realImg");
            tmp.index=i;
            tmp.onload=function () {
                aImg[this.index].src=this.src;
                tmp=null;
            }
        }
    }
    clearInterval(autoTimer);
    autoTimer=setInterval(autoMove,interval);
    function autoMove() {
        if(step>=aDiv.length-1){
            step=0;
            utils.css(oBoxInner,"left",-step*1000)
        }
        step++;
        zhufengAnimate(oBoxInner,{left:-step*1000},500);
        bannerTip();
    }
    function bannerTip() {
        for(var i=0;i<aLis.length;i++){
            var tmpStep=step>=aLis.length?0:step;
            aLis[i].className=i===tmpStep?"bg":"";
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
        for(var i=0;i<aLis.length;i++){
            aLis[i].index=i;
            aLis[i].onclick=function () {
                step=this.index;
                zhufengAnimate(oBoxInner,{left:-step*1000},500);
                bannerTip();
            }
        }
    }

    button();
    function button() {
        oBtnRight.onclick=autoMove;
        oBtnLeft.onclick=function () {
            if(step<=0){
                step=aLis.length;
                utils.css(oBoxInner,"left",-step*1000)
            }
            step--;
            zhufengAnimate(oBoxInner,{left:-step*1000},500);
            bannerTip();
        }
    }
})()