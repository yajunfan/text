/**
 * Created by yangjianzhong on 16/7/11.
 */
(function () {
    var zhufengEffect={
        Linear:function (t,b,c,d) {
            return c*t/d+b;
        }
    }
    function move(curEle,target,duration,effect,callback) {
        var tmpLinear=zhufengEffect.Linear;
        var ary=[];
        if(typeof effect==="number"){
            var str=ary[effect%ary.length];
            ary=ary.split("-");
            tmpLinear=ary.length>=2?zhufengEffect[ary[0]][ary[1]]:zhufengEffect[ary[0]];
        }else if(typeof effect==="object"){
            tmpLinear=effect.length>=2?zhufengEffect[effect[0]][effect[1]]:zhufengEffect[effect[0]];
        }else if(typeof  effect==="function"){
            callback=effect;
        }
        var begin={};
        var change={};
        var time=null;
        var autoTimer=setInterval(function () {
            for(var attr in target){
                begin[attr]=utils.css(curEle,attr);
                change[attr]=target[attr]=begin[attr];
                if(time>=duration){
                    clearInterval(autoTimer);
                    utils.css(curEle,target);
                    callback &&callback.call(curEle);
                    return;
                }
                time+=10;
                for(var attr in target){
                    var curPos=zhufengEffect.Linear(time,begin[attr],change[attr],duration);
                    utils.css(curEle,attr,curPos)
                }
            }
        },10)
    }
    window.zhufengAnimate=move;
})()