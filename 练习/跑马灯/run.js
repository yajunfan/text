/**
 * Created by yangjianzhong on 16/7/10.
 */
var oBox=document.getElementById("box");
var aList=oBox.getElementsByTagName("div")[0];
var aImg=aList.getElementsByTagName("img");

aList.innerHTML+=aList.innerHTML;
aList.style.width=aImg[0].offsetWidth*aImg.length+"px";

var curLeft=aList.offsetLeft;
var autoTimer=setInterval(autoMove,10);
function autoMove() {
    if(curLeft<=-utils.css(aList,"width")/2){
        curLeft=0;
    }
    curLeft--;
    utils.css(aList,"left",curLeft)
}

