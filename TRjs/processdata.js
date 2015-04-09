var stepCount = 10;
var stepSize = 5;
function getSrcData(data) {
    if (data == null) {
        console.log("get source data failed!");
        return;
    }
    else {
        var length = data.length;
        var cpu = Array();
        var memory = Array();
        var duration = Array();
        for (var i = 0; i < length; i++) {
            cpu[i] = parseFloat(data[i]['Cpu']);
            memory[i] = parseFloat(data[i]['Mem']) / 1000000;
            duration[i] = parseFloat(data[i]['Duration']);

        }
//        console.log("@@ "+duration);
        return [cpu, memory, duration]
    }
}

function getMathData(data) {
    var mathData = Array();
    if (data == undefined) {
        mathData = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    } else {
        for (var i = 0; i < data.length; i++) {
            mathData = mathData.concat(sortData(data[i]));
        }
    }
    return mathData;
}

function bubbleSort(arr, length) {
    var i = length, j;
    var tempExchangVal;
    while (i > 0) {
        for (j = 0; j < i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                tempExchangVal = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tempExchangVal;
            }
        }
        i--;
    }
    return arr;
}


function sortData(key) {
    var avg = 0;
    var mid = 0;
    var length = key.length

    //中位数
    var sorted = bubbleSort(key, length);
    if (length % 2 == 0) {
        mid = (sorted[length / 2] + sorted[length / 2 - 1]) / 2;
    } else {
        mid = sorted[(length + 1) / 2 - 1];
    }

    //去掉离散值,求均值
    var multiple = 50;
    var deleteCount = 0;
    var deletedArray = [];
    for (var i = 0; i < length; i++) {
        if ((key[i] / mid) > multiple) {
            deleteCount++;
        } else {
            deletedArray.push(key[i]);
            avg += key[i];
        }
    }
    var newLength = length - deleteCount;
    avg = avg / newLength;
    console.log(deleteCount + " data deleted");
    var sum = 0;

    for (var i = 0; i < newLength; i++) {
        sum += (deletedArray[i] - avg) * (deletedArray[i] - avg);
    }
    var sd = Math.sqrt(sum / newLength);

    var decimalLength = 2;
    return [avg.toFixed(decimalLength), sd.toFixed(decimalLength), mid.toFixed(decimalLength)];
}

function cloneObject(obj) {
    var o;
    if (obj.constructor == Object) {
        o = new obj.constructor();
    } else {
        o = new obj.constructor(obj.valueOf());
    }
    for (var key in obj) {
        if (o[key] != obj[key]) {
            if (typeof(obj[key]) == 'object') {
                o[key] = cloneObject(obj[key]);
            } else {
                o[key] = obj[key];
            }
        }
    }
    o.toString = obj.toString;
    o.valueOf = obj.valueOf;
    return o;
}

function countCpu(data) {
    var cpu_stepCount = window.stepCount;
    var stepSize = 100 / cpu_stepCount;
    //var stepCount = Math.ceil(100 / stepSize); //向上取整;
    var result = Array(); //统计CPU使用%比的频率;

    for (var i = 0; i < cpu_stepCount + 1; i++) {
        result[i] = 0; //初始所有数据为 0;
    }

    for (var i = 0; i < data.length; i++) {
        var cpu = data[i];
        var steps = Math.floor(cpu / stepSize);
        result[steps]++;
    }
    //result[]
    var myd = Array();

    for (var i = 0; i < result.length; i++) {
        myd[i] = [i, result[i]]; //转换成 x,y的格式;
    }

    return myd;
}

function countMem2(mem) {
    var mem_stepCount = window.stepCount;
    var mem_result = Array(); //统计Memory使用的频率;
    var mem_stepSize = mem.length / mem_stepCount;
    for (var i = 0; i < mem_stepCount + 1; i++) {
        mem_result[i] = 0; //初始所有数据为 0;
    }
    for (var i = 0; i < mem.length; i++) {
        var steps = Math.ceil(i / mem_stepSize);
        mem_result[steps] += mem[i];
    }

    var mem_count = Array();
    var avgStepSize = mem.length / mem_stepCount;
    for (var i = 0; i < mem_result.length; i++) {
        mem_count[i] = [i, mem_result[i] / avgStepSize]; //转换成 x,y的格式;
    }
    return mem_count;
}

function countDuration(duration) {

    var result = Array();
    for (var i = 0; i < duration.length; i++) {
        result[i] = [i, duration[i]];
    }
    return result;
}

function getHistogram(max,data){
    var stepSize = window.stepSize;
    var result = Array(); //统计Memory使用的频率;
    var stepCount = max/stepSize;
    for (var i = 0; i < stepCount + 1; i++) {
        result[i] = 0; //初始所有数据为 0;
    }
    for (var i = 0; i < data.length; i++) {
        var val = data[i];
        if(val>max){
            console.log(val);
            //console.log("丢弃离散值%s"%val);
        }else{
            var steps = Math.floor(val / stepSize);
            result[steps]++;
        }

    }
    var myd = Array();

    for (var i = 0; i < result.length; i++) {
        myd[i] = [i*stepSize, result[i]]; //转换成 x,y的格式;
    }
    return myd;
}
function countMem(mem) {
    var mem_stepCount = window.stepCount;
    var mem_result = Array(); //统计Memory使用的频率;
    var mem_stepSize = mem.length / mem_stepCount;
    for (var i = 0; i < mem_stepCount + 1; i++) {
        mem_result[i] = 0; //初始所有数据为 0;
    }
    for (var i = 0; i < mem.length; i++) {
        var steps = Math.ceil(i / mem_stepSize);
        mem_result[steps] += mem[i];
    }

    var mem_count = Array();
    var avgStepSize = mem.length / mem_stepCount;
    for (var i = 0; i < mem_result.length; i++) {
        mem_count[i] = [i, mem_result[i] / avgStepSize]; //转换成 x,y的格式;
    }
    return mem_count;
}

function displayData2(data0, data1, data2, id_cpu, id_mem, id_duration) {
    var max_mem = 100;//假定内存使用不超过50MB
    var max_dur = 100;//假定响应时间最大不超过100ms
    var max_cpu = 100;

    var label0 = "noSDK";
    var label1 = "SDK1.0";
    var label2 = "SDK2.0";

    var color0 = "#0077FF";
    var color1 = "#7D0096";
    var color2 = "#DE000F";

    var resultdata0 = getHistogram(max_cpu,data0[0]);
    var resultdata1 = getHistogram(max_cpu,data1[0]);
    var resultdata2 = getHistogram(max_cpu,data2[0]);


    var cpuSet = [
        {label: label0, data: resultdata0, color: color0},
        {label: label1, data: resultdata1, color: color1},
        {label: label2, data: resultdata2, color: color2}
    ];

    var memdata0 = getHistogram(max_mem,data0[1]);
    var memdata1 = getHistogram(max_mem,data1[1]);
    var memdata2 = getHistogram(max_mem,data2[1]);

    var memSet = [
        {label: label0, data: memdata0, color: color0},
        {label: label1, data: memdata1, color: color1},
        {label: label2, data: memdata2, color: color2}
    ];


    var durations0 = getHistogram(max_dur,data0[2]);
    var durations1 = getHistogram(max_dur,data1[2]);
    var durations2 = getHistogram(max_dur,data2[2]);


    var durSet = [
        {label: label0, data: durations0, color: color0},
        {label: label1, data: durations1, color: color1},
        {label: label2, data: durations2, color: color2}
    ];

    var series = {
        //lines: {show: true, fill: true},
        bars: {
            show: true,
            barWidth: stepSize
        },
        points: {
            radius: 2,
            fill: true,
            show: true
        }
    }

    var xaxis = {

        axisLabel: "CPU使用率(%)",
        axisLabelUseCanvas: true,
        axisLabelFontSizePixels: 20,
        axisLabelFontFamily: 'Verdana, Arial',
        axisLabelPadding: 10
    }

    var yaxis = {
        axisLabel: "出现次数",
        axisLabelUseCanvas: true,
        axisLabelFontSizePixels: 20,
        axisLabelFontFamily: 'Verdana, Arial',
        axisLabelPadding: 3,
        tickFormatter: function (v, axis) {
            return $.formatNumber(v, {format: "#,###", locale: "us"});
        }
    }
    var legend = {
        noColumns: 0,
        labelBoxBorderColor: "#000000",
        position: "nw"
    }
    var colors = ["#FF0000", "#0022FF", "00224f"];
    var grid = {
        hoverable: true,
        borderWidth: 2,
        borderColor: "#633200",
        backgroundColor: {colors: ["#ffffff", "#EDF5FF"]}
    }
    var options1 = {
        series: series,
        xaxis: xaxis,
        yaxis: yaxis,
        legend: legend,
        grid: grid,
        colors: colors
    };
    var options2 = cloneObject(options1);
    options2.xaxis.axisLabel = String.format("内存使用(MB");
    options2.yaxis.axisLabel = "出现次数";

    var options3 = cloneObject(options1);
    options3.xaxis.axisLabel = String.format("响应时间(ms)");
    options3.yaxis.axisLabel = "出现次数";

    $.plot($("#" + id_cpu), cpuSet, options1);
    $("#" + id_cpu).CpuUseTooltip("<strong>{0}</strong><br> <strong> CPU使用率{1}%~{2}% : 共计{3}次</strong>");
    $.plot($("#" + id_mem), memSet, options2);
    $("#" + id_mem).CpuUseTooltip("<strong>{0}</strong><br> <strong> 内存使用{1}M~{2}M : 共计{3}次</strong>");
    $.plot($("#" + id_duration), durSet, options3);
    $("#" + id_duration).CpuUseTooltip("<strong>{0}</strong><br> <strong> 响应时间{1}ms~{2}ms : 共计{3}次</strong>");
}

function showTooltip(x, y, color, contents) {
    $('<div id="tooltip">' + contents + '</div>').css({
        position: 'absolute',
        display: 'none',
        top: y - 40,
        left: x - 120,
        border: '2px solid ' + color,
        padding: '3px',
        'font-size': '9px',
        'border-radius': '5px',
        'background-color': '#fff',
        'font-family': 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
        opacity: 0.9
    }).appendTo("body").fadeIn(200);
}
String.format = function () {
    if (arguments.length == 0)
        return null;

    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
}

$.fn.CpuUseTooltip = function (htmlFormat, fixYValue, fixLength) {
    $(this).bind("plothover", function (event, pos, item) {
        if (item) {
            if ((previousLabel != item.series.label) || (previousPoint != item.dataIndex)) {
                previousPoint = item.dataIndex;
                previousLabel = item.series.label;
                $("#tooltip").remove();
                var x = item.datapoint[0];
                var y = item.datapoint[1];
                var color = item.series.color;
                if (fixYValue) {
                    y = y.toFixed(parseInt(fixLength))
                }
                var tipHtml = String.format(htmlFormat, item.series.label, x, (x + stepSize), y); //cpu使用80 %: 65次
                showTooltip(item.pageX,
                    item.pageY,
                    color,
                    tipHtml);
            }
        } else {
            $("#tooltip").remove();
            previousPoint = null;
        }
    });
};

var previousPoint = null, previousLabel = null;


$.fn.UseTooltip = function (htmlFormat, fixYValue, fixLength) {
    $(this).bind("plothover", function (event, pos, item) {
        if (item) {
            if ((previousLabel != item.series.label) || (previousPoint != item.dataIndex)) {
                previousPoint = item.dataIndex;
                previousLabel = item.series.label;
                $("#tooltip").remove();
                var x = item.datapoint[0];
                var y = item.datapoint[1];
                var color = item.series.color;
                if (fixYValue) {
                    y = y.toFixed(parseInt(fixLength))
                }
                var tipHtml = String.format(htmlFormat, item.series.label, x, y); //cpu使用80 %: 65次
                showTooltip(item.pageX,
                    item.pageY,
                    color,
                    tipHtml);
            }
        } else {
            $("#tooltip").remove();
            previousPoint = null;
        }
    });
};

