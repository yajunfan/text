/**
 * Created by yangjianzhong on 16/7/10.
 */
var aImg=document.getElementsByTagName("img");

window.onscroll=function () {
    var scrollBottom=utils.win("scrollTop")+utils.win("clientHeight");
    //console.log(scrollBottom);
    for(var i=0;i<aImg.length;i++){
        var imgBottom=utils.offset(aImg[i]).top+utils.css(aImg[i],"height");
        //console.log(imgBottom);
        if(imgBottom<=scrollBottom){
            lazyImg(aImg[i]);
        }
    }

};
function lazyImg(img) {
    if(img.loaded){
        return;
    }
    var tmpImg=new Image;
    tmpImg.src=img.getAttribute("realImg");
    tmpImg.onload=function () {
        img.src=tmpImg.src;
        tmpImg=null;
        img.loaded=true;
    };
    tmpImg.onerror=function () {
        tmpImg=null;
        img.loaded=true;
    }
}