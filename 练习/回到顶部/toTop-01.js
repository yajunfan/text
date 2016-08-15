/**
 * Created by yangjianzhong on 16/7/10.
 */
var oBtn = document.getElementById("btn");
var bOK=false;
var timer=null
window.onscroll = computedStyle;
function computedStyle() {
    if(bOK){
        clearInterval(timer)
    }
    bOK=true;
    if (utils.win("scrollTop") > utils.win("clientHeight")) {
        oBtn.style.display = "block";
    } else {
        oBtn.style.display = "none";
    }
}

oBtn.onclick = function () {
    var target = utils.win("scrollTop");
    var time = 500;
    var duration = 50;
    var step = target / time * duration;
    timer = setInterval(function () {
        var curTop = utils.win("scrollTop");
        if (curTop <= 0) {
            clearInterval(timer);
            return;
        }
        curTop = curTop - step;
        utils.win("scrollTop", curTop);
        bOK=false;
    }, duration)
};
