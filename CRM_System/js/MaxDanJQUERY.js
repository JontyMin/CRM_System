$.extend({
    convertJsonDate: function (ds) {
        if (ds == null || ds == "")
            return "";

        var str = parseFloat(ds.substr(6));
        var d = new Date(str);
        return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    },
    maxDanAjax: function (type, url, data, callBack) {
        $.ajax({
            type: type,
            url: url,
            data: data == null ? "" : JSON.stringify(data),
            contentType: "application/json;charset=utf-8",//
            success: function (res) {
                callBack(res.d);
            }
        });
    }
});

$.fn.extend({

    autoTable: function (cols, data, ops) {
        var tagTable = $(this);//获得了当前的表格JQUERY对象

        tagTable.empty();//清除了表格的内容

        //表头
        var theader = $("<tr>");
        $.each(cols, function (k, v) {
            $("<th>").text(v).appendTo(theader);

        });
        $(theader).appendTo(tagTable);
        //数据
        $.each(data, function (index, obj) {

            var tr = $("<tr>");
            $.each(cols, function (kName, v1) {

                if (obj[kName] == undefined) {
                   var td= $("<td>").appendTo(tr);
                    if(ops!=undefined)
                    {
                        $.each(ops, function (okey,ovalue) {
                            $("<a>").text(ovalue["title"]).attr("href", "#")
                                .click(function () {
                                    ovalue.click(obj);
                                })

                                .appendTo(td);
                        });
                    }
                }
                else {
                    $("<td>").text(obj[kName]).appendTo(tr);
                }


            });

            $(tagTable).append(tr);
        })

    }

});