function fillTable(tablename, versions, ida, idb, data) {
    var table = document.createElement('table');
    table.className = "table table-bordered table-condensed";//适应bootstrap布局
    var body = document.createElement('tbody');

    var caption = document.createElement('caption');
    caption.className = "text-center";//适应bootstrap布局
    var highlight = document.createElement('b');
    var title = document.createTextNode(tablename);
    table.appendChild(caption).appendChild(highlight).appendChild(title);

    var head = ["测试版本", "CPU均值(%)", "CPU标准差", "CPU中位数",
        "Memory均值(MB)", "Memory标准差", "Memory中位数",
        "Duration均值(ms)", "Duration标准差", "Duration中位数"];
    var row = document.createElement('tr');
    for (var i = 0; i < head.length; i++) {
        var m = document.createTextNode(head[i]);
        var thead = document.createElement('th');
        thead.appendChild(m);
        row.appendChild(thead);
    }
    body.appendChild(row);

    for (var i = 0; i < versions; i++) {
        var row = document.createElement('tr');
        var column = document.createElement('td');
        var message;
        if (i == 0) {
            message = document.createTextNode('noSDK');
        } else {
            message = document.createTextNode('SDK' + i + '.0');
        }
        column.appendChild(message);
        row.appendChild(column);
        for (var j = 0; j < head.length - 1; j++) {
            var column = document.createElement('td');
            var message = document.createTextNode(data[i][j]);
            column.appendChild(message);
            row.appendChild(column);
        }
        body.appendChild(row);

    }
    table.appendChild(body);
    document.getElementById(ida).appendChild(table);
    table.setAttribute('border', '1');

    //增加“嵌码比不嵌码增加百分比”表

    var table = document.createElement('table');
    table.className = "table table-bordered table-condensed";//适应bootstrap布局
    var body = document.createElement('tbody');
    var caption = document.createElement('caption');
    caption.className = "text-center";//适应bootstrap布局
    var highlight = document.createElement('b');
    var title = document.createTextNode(tablename);
    table.appendChild(caption).appendChild(highlight).appendChild(title);
    var head2 = ["Version", "CPU", "Memory", "Duration"];
    var row = document.createElement('tr');
    for (var i = 0; i < head2.length; i++) {
        var m = document.createTextNode(head2[i]);
        var thead = document.createElement('th');
        thead.appendChild(m);
        row.appendChild(thead);
    }
    body.appendChild(row);

    for (var i = 1; i < versions; i++) {
        var row = document.createElement('tr');
        var column = document.createElement('td');
        var message = document.createTextNode('SDK' + i + '.0');
        row.appendChild(column).appendChild(message);
        for (var j = 0; j < head2.length - 1; j++) {
            var column = document.createElement('td');
            var tmp;
            if (data[0][j] == 0) {
                tmp = "--";
            }
            else {
                tmp = (data[i][j * 3] - data[0][j * 3]) / data[0][j * 3] * 100;
                tmp = tmp.toFixed(2);
            }
            var message = document.createTextNode(tmp);
            column.appendChild(message);
            row.appendChild(column);
        }
        body.appendChild(row);
    }
    table.appendChild(body);
    document.getElementById(idb).appendChild(table);
    table.setAttribute('border', '1');
}

