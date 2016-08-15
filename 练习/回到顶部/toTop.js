/**
 * Created by yangjianzhong on 16/7/10.
 */
var oBtn = document.getElementById("btn");

window.onscroll = computedStyle;
function computedStyle() {
        if (utils.win("scrollTop") > utils.win("clientHeight")) {
            oBtn.style.display = "block";
        } else {
            oBtn.style.display = "none";
        }

}
oBtn.onclick = function () {
    oBtn.style.display="none";
    window.onscroll=null;
    var target = utils.win("scrollTop");
    var time = 500;
    var duration = 10;
    var step = target / time * duration;
    var curTop = utils.win("scrollTop");
    var timer = setInterval(function () {
        if (curTop <= 0) {
            clearInterval(timer);
            utils.win("scrollTop", 0);
            window.onscroll = computedStyle
        }
        curTop = curTop - step;
        utils.win("scrollTop", curTop)
    }, duration)
};
