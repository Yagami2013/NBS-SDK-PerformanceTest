function fillTable(tablename, funname, versions, id,data) {

    var table = document.createElement('table');
    var body = document.createElement('tbody');

    var caption = document.createElement('caption');
    var highlight = document.createElement('b');
    var title = document.createTextNode(tablename);
    table.appendChild(caption).appendChild(highlight).appendChild(title);

    var head = ["测试版本", "CPU均值(%)", "CPU标准差", "CPU中位数",
        "Memory均值(MB)", "Memory标准差", "Memory中位数",
        "Duration均值(ms)", "Duration标准差", "Duration中位数"];
    var row = document.createElement('tr');
    for (var i = 0; i < 10; i++) {
        var m = document.createTextNode(head[i]);
        var thead = document.createElement('th');
        thead.appendChild(m);
        row.appendChild(thead);
    }
    table.appendChild(row);

    for (var i = 0; i < versions; i++) {
        var row = document.createElement('tr');
        var column = document.createElement('td');
        var message = document.createTextNode('SDK' + i +'.0');
        row.appendChild(column).appendChild(message);
        for (var j = 0; j < 9; j++) {
            var column = document.createElement('td');
            var message = document.createTextNode(data[i][j]);
            column.appendChild(message);
            row.appendChild(column);
        }
        body.appendChild(row);
    }

    table.appendChild(body);
    document.getElementById(id).appendChild(table);
    table.setAttribute('border', '1');
}