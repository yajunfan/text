/**
 * Created by yangjianzhong on 16/7/10.
 */
(function () {
    var zhufengEffect = {
        Linear: function (t, b, c, d) {
            return c * t / d + b
        }
    };

    function move(curEle, target, duration, effect, callback) {
        var begin = {};
        var change = {};
        var time = null;
        var tmpLinear = zhufengEffect.Linear;
        var ary = ["Linear", "Elastic-easeOut", "Back-easeOut", "Bounce-easeOut", "Expo-easeIn", "Back-easeInOut", "Back-easeIn"];
        if (typeof effect === "number") {
            var str = ary[effect % ary.length];
            ary = str.split("-");
            tmpLinear = ary.length >= 2 ? zhufengEffect[ary[0]][ary[1]] : zhufengEffect[ary[0]];
        } else if (typeof effect === "object") {
            tmpLinear = effect.length >= 2 ? zhufengEffect[effect[0]][effect[1]] : zhufengEffect[effect[0]];
        } else if (typeof effect === "function") {
            callback = effect
        }
        for (var attr in target) {
            begin[attr] = utils.css(curEle, attr);
            change[attr] = target[attr] - begin[attr];
        }
        clearInterval(curEle.timer);
        curEle.timer = setInterval(function () {
            time += 10;
            if (time >= duration) {
                clearInterval(curEle.timer);
                utils.css(curEle, target);
                callback && callback.call(curEle);
                return;
            }
            for (var attr in target) {
                var curPos = zhufengEffect.Linear(time, begin[attr], change[attr], duration);
                 utils.css(curEle, attr, curPos)
                }


        },10)
    }

    window.zhufengAnimate = move;
})()