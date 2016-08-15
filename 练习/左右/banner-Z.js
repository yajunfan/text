/**
 * Created by yangjianzhong on 16/7/9.
 */
function Banner(idName) {
    this.oBox=document.getElementById(idName);
    this.oBoxInner=this.oBox.getElementsByTagName("div")[0];
    this.aDiv=this.oBoxInner.getElementsByTagName("div");
    this.aImg=this.oBoxInner.getElementsByTagName("img");
    this.oUl=this.oBox.getElementsByTagName("ul")[0];
    this.aLis=this.oBox.getElementsByTagName("li");
    this.oBtnLeft=this.oBox.getElementsByTagName("a")[0];
    this.oBtnRight=this.oBox.getElementsByTagName("a")[1];
    this.step=0;
    this.interval=1000;
    this.autoTimer=null;
    this.data=null;
    this.inti();
}
Banner.prototype={
    constructor:Banner,
    inti:function () {
        var _this=this;
        this.getData();
        this.bind();
        this.lazyImg();
        clearInterval( _this.autoTimer);
        this.autoTimer=setInterval(function () {
            _this.autoMove();
        },this.interval);
        this.mouse();
        this.handleChange();
        this.button();
    },
    getData:function () {
        var _this=this;
        var xml=new XMLHttpRequest();
        xml.open("get","json1/data.txt",false);
        xml.onreadystatechange=function () {
            if(xml.readyState===4 && /^2\d{2}$/.test(xml.status)){
                _this.data=utils.jsonParse(xml.responseText);
                console.log(_this.data)
            }
        };
        xml.send(null);
    },
    bind:function () {
        var str1="";
        var str2="";
        for(var i=0;i<this.data.length;i++){
            str1+=' <div><img realImg="'+this.data[i].imgSrc+'" alt=""></div>';
            str2+=i===0?'<li class="bg"></li>':'<li></li>';
        }
        str1+='<div><img realImg="'+this.data[0].imgSrc+'" alt=""></div>';
        this.oBoxInner.innerHTML=str1;
        this.oUl.innerHTML=str2;
        this.oBoxInner.style.width=this.aDiv.length*this.aDiv[0].offsetWidth+"px";
    },
    lazyImg:function () {
        var _this=this;
        for(var i=0;i<this.aDiv.length;i++){
            var tmpImg=new Image;
            tmpImg.src=this.aImg[i].getAttribute("realImg");
            tmpImg.index=i;
            tmpImg.onload=function () {
                _this.aImg[this.index].src=this.src;
                tmpImg=null;
            }
        }
    },
    autoMove:function () {
        if(this.step>=this.aDiv.length-1){
            this.step=0;
            utils.css(this.oBoxInner,"left",-this.step*1000)
        }
        this.step++;
        zhufengAnimate(this.oBoxInner,{left:-this.step*1000},500);
        this.bannerTip();
    },
    bannerTip:function () {
        for(var i=0;i<this.aLis.length;i++){
            var tmpStep=this.step>=this.aLis.length?0:this.step;
            this.aLis[i].className=i===tmpStep?"bg":"";
        }
    },
    mouse:function () {
        var _this=this;
        _this.oBox.onmouseover=function () {
            clearInterval(_this.autoTimer);
           // _this.oBtnLeft.style.display=_this.oBtnRight.style.display="block";
            _this.oBtnRight .style.display=_this.oBtnLeft.style.display="block";
        };
        _this.oBox.onmouseout=function () {
            _this.autoTimer=setInterval(function () {
                _this.autoMove()
            },_this.interval);
            _this.oBtnLeft.style.display=_this.oBtnRight.style.display="none";
        }
    },
    handleChange:function () {
        var _this=this;
        for(var i=0;i<_this.aLis.length;i++){
            _this.aLis[i].index=i;
            _this.aLis[i].onclick=function () {
                _this.step=this.index;
                zhufengAnimate(_this.oBoxInner,{left:-_this.step*1000},500);
                _this.bannerTip();

            }
        }
    },
    button:function () {
        var _this=this;
        _this.oBtnLeft.onclick=function () {
            if(_this.step<=0){
                _this.step=_this.aLis.length;
                utils.css(_this.oBoxInner,"left",-_this.step*1000)
            }
            _this.step--;
            zhufengAnimate(_this.oBoxInner,{left:-_this.step*1000},500);
            _this.bannerTip();

        };
        _this.oBtnRight.onclick=function () {
            _this.autoMove();
        }
    }


}