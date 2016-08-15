/**
 * Created by yangjianzhong on 16/7/10.
 */
var oTab=document.getElementById("tab");
var tHead=oTab.tHead;
var tCells=tHead.rows[0].cells;
var tBody=oTab.tBodies[0];
var aRows=tBody.rows;

var data=null;
getData();
function getData() {
   var xml=new XMLHttpRequest();
    xml.open("get","data.txt",false);
    xml.onreadystatechange=function () {
        if(xml.readyState===4 &&/^2\d{2}$/.test(xml.status)){
            data=utils.jsonParse(xml.responseText);
            console.log(data)
        }
    };
    xml.send(null);
}
bind();
function bind() {
    // var str="";
    // for(var i=0;i<data.length;i++){
    //     data[i].sex=data[i].sex==0?"男":"女";
    //     str+=" <tr>\
    //         <td>"+data[i].name+"</td>\
    //         <td>"+data[i].age+"</td>\
    //         <td>"+data[i].score+"</td>\
    //         <td>"+data[i].sex+"</td>\
    //         </tr>"
    // }
    // tBody.innerHTML=str

    var frg=document.createDocumentFragment();
    for(var i=0;i<data.length;i++){
        var tr=document.createElement("tr");
        var cur=data[i];
        for(var attr in cur){
            if(attr==="sex"){
                cur[attr]=cur[attr]==0?"男":"女";
            }
            var td=document.createElement("td");
            td.innerHTML=cur[attr];
            tr.appendChild(td);
        }
        frg.appendChild(tr);
    }
    tBody.appendChild(frg);
    frg=null;
}

changeColor();
function changeColor() {
    for(var i=0;i<aRows.length;i++){
        switch(i%2){
            case 0:
                aRows[i].style.background="lightpink";
                break;
            default:
                aRows[i].style.background="lightyellow";
        }
    }
}

function sort(n) {
    var _this=this;
    for(var k=0;k<tCells.length;k++){
        if(k===n){
            tCells[k].flag*=-1;
        }else{
            tCells[k].flag=-1;
        }
    }
    var ary=utils.listToArray(aRows);
    ary.sort(function (a,b) {
        var cur=a.cells[n].innerHTML;
        var next=b.cells[n].innerHTML;
        var curNum=Number(a.cells[n].innerHTML);
        var nextNum=Number(b.cells[n].innerHTML);
        if(isNaN(cur)||isNaN(next)){
            return (cur.localeCompare(next))*_this.flag;
        }
        return (cur-next)*_this.flag;

    });

    var frg=document.createDocumentFragment();
    for(var i=0;i<ary.length;i++){
        frg.appendChild(ary[i]);
    }
    tBody.appendChild(frg);
    frg=null;
    changeColor();
}
for(var i=0;i<tCells.length;i++){
    tCells[i].index=i;
    tCells[i].flag=-1;
    tCells[i].onclick=function () {
        sort.call(this,this.index)
    }
}