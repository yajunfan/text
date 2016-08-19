function getRandom(n, m) {
    return Math.round(Math.random() * (m - n) + n);
}
var str1 = "赵钱孙李周吴郑王冯陈楚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏桃江";//0-31
var str2 = "一二三四五六七八九壹贰叁肆伍陆柒捌玖";//->0-17


var ary = [];
for (var i = 1; i <= 96; i++) {
    var obj = {};
    obj["id"] = i;
    obj["name"] = str1[getRandom(0, 31)] + str2[getRandom(0, 17)] + str2[getRandom(0, 17)];
    obj["sex"] = getRandom(0, 1);
    obj["score"] = getRandom(50, 99);
    ary.push(obj);
}

var fs = require("fs");
fs.writeFileSync("./student.json", JSON.stringify(ary), "utf-8");

