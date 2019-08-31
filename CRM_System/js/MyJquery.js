$.extend({

    convertJonsTime: function (time) {

        if (time == "" || time == null)
            return "";
        var str = parseFloat(time.substr(6));
        var t = new Date(str);
        return t.getFullYear() + "年" + (t.getMonth() + 1) + "月" + t.getDate()+"日";


    },
    myAjax: function (url,data,callBack) {
        $.ajax({
            type: "POST",
            url:url,
            dataType: "JSON",
            contentType: "application/json;charset=utf-8",//
			data: data == null ? "" : JSON.stringify(data),
			async: false,
            success: function (d) {
                callBack(d.d);
            }

        });
    }

});

//对象方法

$.fn.extend({
    autoTable: function (cols,datas,ops) {

        //1 得到表格对象

        var tbs = $(this);
        // 2根据传入的数据动态的产生表头
        $(tbs).empty();
        var tr=$("<tr>");
        $.each(cols, function (k,v) {
            
            var theader = $("<th>").text(v).appendTo(tr);

        });

        $(tbs).append(tr);

        //数据 obj {"stuID":101,"stuName":admin,....}
        $.each(datas, function (index,obj) {
           
            var tr = $("<tr>").appendTo(tbs);
            $.each(cols, function (kname, v1) {
                var td = $("<td>").text(obj[kname]).appendTo(tr);
                if (obj[kname] == undefined)
                {
                    //创建操作按钮

                    if (ops != undefined)
                    {
                        $.each(ops, function (kk,vv) {
                           
                            var a = $("<a>").text(vv.title)
                                            .attr("href", "#")
                                          
                                            .click(function () {
                                                vv.ck(obj,$(this).parent().parent());
                                            })
                                            .appendTo(td);

                        })
                    }
                }
            });
            $(tbs).append(tr);
        })

        

       
    },
    //colos 表头 datats 数据，ops 操作列，pages 分页的对象(index,size,count,分页的事件){"index":1,size:2,count:7,ck:function(){}}
    setPage: function (cols,datas,ops,pages) {
       
        var tbs = $(this);//得到表格对象

        $(tbs).autoTable(cols, datas, ops);
        //生成分页控件出来

        var toolsDiv = $("#page_div");
        if (toolsDiv.size() > 0) //分页组件有的话
        {
            $(toolsDiv).empty();//清空这个分页的组件
        }
        else
        {
            toolsDiv = $("<div id='page_div'>");
            //显示在页面上
            //$(tbs).append(toolsDiv);
            toolsDiv.insertAfter(tbs);//追加到表格的结束标签以后

        }
        //得到当前是在第几页
        var index = pages.pageIndex;
        var count = pages.pageCount;
        var callBack = pages.pageCk;//事件数据

        var showSpan = $("<span>").text("当前第：" + index + "页/共" + count + "页")
        .appendTo(toolsDiv);
        //分页的按钮

        var first = $("<a>").text("首页").attr("href", "#")
            .click(function () {
                callBack(1);    
            })
        .appendTo(showSpan);

        var prev = $("<a>").text("上一页").attr("href", "#")
            .click(function () {
                callBack(index=index==1?1:index-1);
            })
        .appendTo(showSpan);

        var next = $("<a>").text("下一页").attr("href", "#")
            .click(function () {
                callBack(index=index == count ? count : index + 1);
            })
        .appendTo(showSpan);

        var last = $("<a>").text("尾页").attr("href", "#")
            .click(function () {
                callBack(count);
            })
        .appendTo(showSpan);

        $(toolsDiv).find("a").css("margin-left","5px");


     

    },


    //$.fn.autoTable.fo=function(aaa){
    //    return aaa;
    //}

});