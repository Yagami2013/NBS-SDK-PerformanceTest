function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一张含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}
function start(path, platform, tableId,table2Id, classname, versions, ids) {
    //var versions =3;
    //var classname = "URLConnection";
    var flag = Array();
    var srcData_noSDK = [[0], [0], [0]];
    var srcData_SDK1 = [[0], [0], [0]];
    var srcData_SDK2 = [[0], [0], [0]];
    var srcFile = Array();

    for (var i = 0; i < versions; i++) {

        flag[i] = false;
        var dataPath = String.format("/data/{0}/{1}/{2}_{3}.csv", path, platform, classname, i);
        srcFile[i] = dataPath;
        //srcFile[i] = "/data/"+platform +"/"+ classname + "_" + i + ".csv";

    }


    d3.csv(srcFile[0], function (error, data) {
        if (error) {
            console.log("source file "+srcFile[0]+" open failed");
        }
        else {
            srcData_noSDK = getSrcData(data);
            console.log(srcData_noSDK[2]);
        }
        flag[0] = true;
    });
    d3.csv(srcFile[1], function (error, data) {
        if (error) {
            console.log("source file "+srcFile[1]+" open failed");
        }
        else {
            srcData_SDK1 = getSrcData(data);
        }
        flag[1] = true;
    });
    d3.csv(srcFile[2], function (error, data) {
        if (error) {
            console.log("source file "+srcFile[2]+" open failed");
        }
        else {
            srcData_SDK2 = getSrcData(data);
        }
        flag[2] = true;
    });
    var isFinished2 = self.setInterval(clock, 50);

    function clock() {

        if (flag[0] && flag[1] && flag[2]) {

            isFinished2 = window.clearInterval(isFinished2);
            displayData2(srcData_noSDK, srcData_SDK1, srcData_SDK2, ids[0], ids[1], ids[2]);
            fillTable(classname,versions, tableId,table2Id, [getMathData(srcData_noSDK), getMathData(srcData_SDK1), getMathData(srcData_SDK2)]);

        }
    }
}