$.extend({

    //将21位日期数据转换为年月日
    //time:所需转换日期
    //join:年月日间隔符
    convertJsonTime: function (time, join) {
        try {
            if (time.length >= 21) {
                var newTime = new Date(parseFloat(time.substr(6)));
                return newTime.getFullYear() + "" + (join != undefined && join.length < 3 && join.length > 0 ? join : "-")
                    + "" + (newTime.getMonth() + 1) + "" + (join != undefined && join.length < 3 && join.length > 0 ? join : "-")
                    + "" + newTime.getDate() + "";
            }
        } catch (e) {
            return time;
        }
    },

    //Ajax拓展
    // url:ajax所需路径
    //data:ajax所需data
    //callBack:回传ajax得到的数据
    extendAjax: function (url, data, callBack) {
        $.ajax({
            type: "post",
            url: url,
            dataType: "JSON",
            contentType: "application/json;charset=utf-8",
            data: data == null ? "" : JSON.stringify(data),
            success: function (data) {
                callBack(data.d);
            }
        });
    },

});


$.fn.extend({

    //表体生成
    // thead:表头内容 {数据库列名:显示文字}
    //data:表身内容
    //option:其他操作
    createTableContent: function (thead, data, option,transition) {
        if(transition!=undefined){
            $(data).each(function(key,value){
                $(transition).each(function(key1,value1){
                    value[value1.colName]=value1.switchValue[value[value1.colName]];
                 });
            });
        }
        var table1 = $(this);//当前表
        $(table1).empty();
        //表头
        var thead1 = $("<thead>").append($("<tr>"));
        table1.append(thead1);
        //为表头添加单元格
        $.each(thead, function (key, value) {

            $("<td>").text(value)
                .appendTo($(thead1).children("tr"));

        });

        //表身
        var tbody1 = $("<tbody>").appendTo(table1);
        $.each(data, function (key, value) {
            //表身单行
            var tbTr = $("<tr>").appendTo(tbody1);
            //循环表头键值对
            $.each(thead, function (key1, value1) {
                //跳过空数据列
                if (value[key1] != undefined) {
                    //将表头与数据源对应列键入单元格并键入表身单行
                    var td = $("<td>").text(value[key1]); 
                    $(td).text($.convertJsonTime($(td).text())).appendTo(tbTr);
                }
            });
            //添加选项,将选项提供的class样式类添加至选项提供标签元素
            if (option != null) {
                //将标签元素键入一个新的单元格也将其键入表身单行中
                var opTd = $("<td>").appendTo(tbTr);
                $.each(option, function (key2, value2) {
                    //console.log(value2);
                    //获取选项提供标签元素
                    var tools = $(value2.toolname).text(value2.text).val(value[value2.value] == null ? value2.nullValue : value[value2.value]  )
                        .click(function () {
                            //单机选项按钮时将选项所在行回传至选项的click键
                            value2.click($(this).parent().parent());
                        })
                        .appendTo(opTd);
                    //将选项提供的css样式键值对赋予标签元素
                    $.each(value2.toolCss, function (key3, value3) {
                        $(tools).css(value3);
                    });
                    //将选项提供的属性键值对赋予标签元素
                    $.each(value2.attrs, function (key4, value4) {
                        if(typeof value4=='string'){
                            $(tools).attr(key4, value4);
                        }else{
                            $(tools).attr(key4, value4[$(tools).val()]);
                        }          
                    });
                });
            }
        });
    },

    //WebService实例
    /*
         [WebMethod]
            public string Paging(int index,int size)
            {
                return new JavaScriptSerializer().Serialize(new
                {
                    PagingData =分页数据
                    PageCount = 页总量
                });
            }
         */

    //带注释实例
    /** function paging(index) {
            //表头:键为表状数据源列名,值为table元素内thead单个单元格的显示文本,操作列可以去除,如需使用操作列,请将操作列的键设为非数据源列名
            var thead = { "UserID": "用户编号", "UserLName": "登陆名", "UserLPWD": "真实姓名", "RoleName": "所属角色", "option": "操作" };
            //操作选项:键为位列先后,值为---------
            var option = {
                "0": {
                    "toolname": "<input>",//工具单个单位(元素)名
                    "text": "修改",//标签内嵌文本
                    "attrs": {//属性列表,添加元素属性
                        "type": "image",
                        "class": "tools",
                        "title": "修改",
                        "src": "../images/edt.gif"
                    },
                    //"toolCss": { "0": { "color": "blue", "font-size": "20px" } },//键:工具单个单位(元素)添加css样式,值:键----,值:键值对为一组css样式
                    "click": function (row) {//工具单个单位(元素)单击触发,键-----,值:回调函数,回传当前触发单位所在元素tr(整行)
                        showEdit({
                            "UserID": $(row).children().eq(0).text(),
                            "UserLName": $(row).children().eq(1).text(),
                            "UserName": $(row).children().eq(2).text(),
                            "RoleName": $(row).children().eq(3).text(),
                        });
                    }
                },
                "1": {
                    "toolname": "<input>",
                    "text": "删除",
                    "attrs": {
                        "type": "image",
                        "class": "tools",
                        "title": "删除",
                        "src": "../images/del.gif"
                    },
                    //"toolCss": { "0": { "color": "blue", "font-size": "20px" } },
                    "click": function (row) {
                        if (confirm("确认删除此角色?")) {
                            $.extendAjax("../WebService/", { "users": { "UserID": $(row).children().eq(0).text() } }, function (data) {
                                if (data) {
                                    $(row).remove();
                                }
                            });
                        }
                    }
                },
            }
            //获取数据源,此处需访问WebService,且该服务将提供分页数据与分页目标的页总量
            $.extendAjax("../WebService/", { "index": index, "size": 4 }, function (data) {
                $(".dataTable")
                    .createTablePaging(thead, JSON.parse(data).PagingData, option,
                        {
                            "pageIndex": index,
                            "pageCount": JSON.parse(data).PageCount,
                            "pagingClick": paging,
                            "toolName": "<input>",
                            "attrs": {
                                "type": "image",
                                "class": "pagingTools",
                                //"src":"../images/first.gif"
                            },
                        });

            });
        }
     */
    /*无注释实例*/
    /*
     var thead = {
            "ChanID": "销售机会编号",
            "ChanName": "客户名",
            "ChanTitle": "概要",
            "ChanLinkMan": "联系人",
            "ChanLinkTel": "联系电话",
            "ChanCreateManName": "创建人",
            "ChanCreateDate": "创建时间",
            //"ChanDueManName": "分配人",
            "option": "分配人"
        };
        var option = {
            "0": {
                "toolname": "<input>",
                "text": "修改",
                "attrs": {
                    "class": "tools",
                    "title": "修改",
                },
                "value": "ChanDueManName",
                "nullValue": "未分配",
                "click": function (row) {
                    //showEmp($(row).children().last().children().eq(0), 1);
                    showEmp($(row).children().last().children().eq(0), $(row).children().first().text());
                }
            },
        }

        $(function () {
            paging(1);

            $(".tableEdit Input[type=button]").click(function () {
                $.extendAjax("../WebService/_BpWebService.asmx/Select_V_Chances_Users",
                    {
                        "ChanName": $(".tableEdit input").eq(0).val(),
                        "ChanLinkMan": $(".tableEdit input").eq(1).val(),
                        "ChanCreateMan": $(".tableEdit input").eq(2).val(),
                        "ChanDueMan": $(".tableEdit input").eq(3).val(),
                    }, function (data) {
                        $(".dataTable").createTableContent(thead, data, option);
                    });
            });
        });

        function paging(index) {
            $.extendAjax("../WebService/_BpWebService.asmx/Paging_V_Chances_Users", { "index": index, "size": 4 }, function (data) {
                $(".dataTable")
                    .createTablePaging(thead, JSON.parse(data).PagingData, option,
                        {
                            "pageIndex": index,
                            "pageCount": JSON.parse(data).PageCount,
                            "pagingClick": paging,
                            "toolName": "<div>",
                            "attrs": {
                                "type": "image",
                                "class": "pagingTools",
                            },
                        });
            });
        }
    */

    /**生成分页表格
     * @param {any} thead 表头
     * @param {any} data 数据源
     * @param {any} option 选项
     * @param {any} pagingData 分页数据{
     *             pageIndex:当前页
     *             pageCount:分页目标的页总量
     *             pagingClick:回调函数,对应分页元素所有单位的click事件内的pagingData.pagingClick(---)
     *             toolName:所有分页元素单位的元素名
     *             attrs:所有分页元素单位的属性}
     */
    createTablePaging: function (thead, data, option, pagingData,transition) {
        var table1 = $(this);
        table1.empty();
        $(table1).createTableContent(thead, data, option,transition);
        //分页控制器
        var pagingDiv = $(".pagingDiv_");
        if (pagingDiv.length > 0) {
            $(pagingDiv).empty();
        } else {
            pagingDiv = $("<div class='pagingDiv_'>");
            pagingDiv.insertAfter(table1);
        }

        var index = pagingData.pageIndex;
        var count = pagingData.pageCount;
        var toolName = pagingData.toolName;
        var toolsDiv = $("<div class='.toolsDiv_'>").appendTo(pagingDiv).css({ "float": "left" });

        $(toolName).text("首页").click(function () {
            index = 1;
            pagingData.pagingClick(index);
        }).appendTo(toolsDiv);

        $(toolName).text("上一页").click(function () {
            index = index == 1 ? 1 : index - 1;
            pagingData.pagingClick(index);
        }).appendTo(toolsDiv);

        $(toolName).text("下一页").click(function () {
            index = index == count ? count : index + 1;
            pagingData.pagingClick(index);
        }).appendTo(toolsDiv);

        $(toolName).text("末页").click(function () {
            index = count;
            pagingData.pagingClick(index);
        }).appendTo(toolsDiv);

        $.each(toolsDiv.find(toolName.substr(1, toolName.length - 2)), function (key, value) {
            var tool = $(this);
            $.each(pagingData.attrs, function (key1, value1) {
                $(tool).attr(key1, value1);
            });
        });

        $("<div>").text("共" + count + "页 / 第" + index + "页").css({ "float": "left" }).appendTo($("<div class='pagingMessage_'>").css({ "float": "right" }).appendTo(pagingDiv));
        $("<input type='image' src='../images/go.gif' />").click(function () {
            if (!isNaN(parseInt($(this).prev().val()))) {
                pagingData.pagingClick($(this).prev().val() > count ? count : $(this).prev().val() );
            }
        }).insertAfter($("<input type='text' size='1' style='height:10px;width:30px'/>").insertAfter($("<span>").html("&nbsp&nbsp&nbsp&nbsp跳转到").appendTo(".pagingMessage_")));
    }
});
