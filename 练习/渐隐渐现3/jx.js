/**
 * Created by yangjianzhong on 16/7/11.
 */
(function () {
    var oBox=document.getElementById("box");
    var oBoxInner=oBox.getElementsByTagName("div")[0];
    var aDiv=oBoxInner.getElementsByTagName("div");
    var aImg=oBoxInner.getElementsByTagName("img");
    var oUl=oBox.getElementsByTagName("ul")[0];
    var aLi=oBox.getElementsByTagName("li");
    var oBtnLeft=oBox.getElementsByTagName("a")[0];
    var oBtnRight=oBox.getElementsByTagName("a")[1];
    var step=0;
    var autoTimer=null;
    var interval=1000;
    var data=null;
    getData();
    function getData() {
        var xml=new XMLHttpRequest();
        xml.open("get","json/data.txt",false);
        xml.onreadystatechange=function () {
            if(xml.readyState===4 && /^2\d{2}$/.test(xml.status)){
                data=utils.jsonParse(xml.responseText);
                console.log(data);
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
        //utils.css(aDiv[0],"opacity",1);
    }

    lazyImg();
    function lazyImg() {
        for(var i=0;i<aImg.length;i++){
            var tmpImg=new Image;
            tmpImg.src=aImg[i].getAttribute("realImg");
            tmpImg.index=i;
            tmpImg.onload=function () {
                aImg[this.index].src=this.src;
                tmpImg=null;
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
    //每次出现的错误有:1,让每一个div运动,而不是让div这个组合运动,导致公式报错,还有第二个循环中得索引不一样,记得更改
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
                utils.css(aDiv[i],"zIndex",0)
            }
        }
        bannerTip();
    }
    function bannerTip() {
        for(var i=0;i<aLi.length;i++){
            var tmpStep=step===aLi.length?0:step;
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
                setBanner();
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
})()