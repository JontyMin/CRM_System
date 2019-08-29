function MyAjax(type,url,callBack)
{
    var xmlhttp = null;
    if(window.ActiveXObject)
    {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else
    {
        xmlhttp = new XMLHttpRequest();
    }
    if(!xmlhttp)
    {
        alert('您的浏览器不支持ajax');
        return false;
    }

    xmlhttp.open(type, url, false);
    xmlhttp.onreadystatechange = function()
    {
        if(xmlhttp.readyState==4&&xmlhttp.status==200)
        {
            var text = xmlhttp.responseText;
            callBack(text);
        }
    }
    xmlhttp.send(null);
}

$(function () {
        $.extend(
          {
              cursomAjax: function (url,data,cb) {
                  $.ajax({
                      type: "post",
                      url:url,
                      contentType: "application/json;charset=utf-8",
                      dataType: "JSON",
                      data: data == null ? null : JSON.stringify(data),
                      success: function (d) {
                          cb(d.d);
                      }
                  });
              }
          }
         

        );
})



$(function () {
    $.fn.extend({
        
//        autoTable: function (cols, data, ops) {
//            var tab = $(this);
//            tab.empty();
//            var tr = $("<tr>");
//            $.each(cols, function (k, v) {
//                $("<td>").text(v).appendTo(tr);
//            });
//            tab.append(tr);


//            $.each(data, function (index, obj) {
//                var tr2 = $("<tr>");
//                $.each(cols, function (key, value) {
//                    var td = $("<td>");
//                    if (obj[key] == undefined) {
//                        if (ops != "" && ops != null) {
//                            $.each(ops, function (k, v) {
//                                //alert(v.c1);
//                                //console.log(v.c1);
//                                $("<" + v.type + ">")
//                                    .text(v.title)
//                                    .attr("href", "#")
//                                    .css(v.cssStyle==undefined?{"color":"black"}:v.cssStyle)
//                                    .click(function () {
//                                    var row=$(this).parent().parent();
//                                    if (v.title=="删除") {
//                                        if (confirm("你确定要删除吗")) {
//                                            v.ck(obj,row);
//                                        }
//                                    } else {
//                                        v.ck(obj,row);
//                                    }
                                    
//                                }).appendTo(td);
//                            });
//                        }
//                    }
//                        $(td).text(obj[key]).appendTo(tr2);
                    
//                })
//                tab.append(tr2);

//            });
//        },
//        myPage: function (cols,data,ops,pages) {
//            var tab = $(this);
//            $(tab).autoTable(cols, data, ops);
//            var tabDiv = $("#tool_div");
//            if (tabDiv.size()>0) {
//                tabDiv.empty();
//            } else {
//                tabDiv = $("<div>").prop("id", "tool_div");
//                tabDiv.insertAfter(tab);
//            }
//            var callBack = pages.pageCk;
//            var index = pages.pageIndex;
//            var count = pages.pageCount;
//            var span = $("<span>").text("第" +index + "页/共" + count + "页").appendTo(tabDiv);
//            $("<a>").text("首页").prop("href", "#").click(function () {
//                callBack(1);
//            }).appendTo(span);
//            $("<a>").text("上一页").prop("href", "#").click(function () {
//                callBack(index > 1 ? index-1 : index);
//            }).appendTo(span);
//            $("<a>").text("下一页").prop("href", "#").click(function () {
//                callBack(index < count ? index + 1 : index);
//                console.log(index);
//            }).appendTo(span);
//            $("<a>").text("尾页").prop("href", "#").click(function () {
//                callBack(count);
//            }).appendTo(span);

//            var sel = $("<select>");
//            for (var i = 1; i <= count; i++) {

//                if (i == index)
//                {
//                    $("<option selected=true>").val(i).text(i).appendTo(sel);
//                }
//                else
//                {
//                    $("<option>").val(i).text(i).appendTo(sel);
//                }
               
//            }
//            $(span).append(sel);

         
//            $(sel).change(function () {
//                //a = $(this).val();
//                callBack($(this).val());
//            });
            
//        },
        setPage: function(size, index) {
               var tab = $(this);
           
                var count = $(this).get(0).rows.length;
                
                var totle = count % size == 0 ? count / size : Math.floor(count / size) + 1;
              
                var arr = new Set();
            
                for (var i = (index - 1) * size + 1; i <= index * size; i++) {          
                        var txt = $(this).children().eq(0).children().eq(i).children().eq(0).text();
                        if (txt != undefined) {
                            arr.add(txt);
                        }
                }
                for (var i = 1; i <=count; i++) {
                    if (arr.has($(this).children().eq(0).children().eq(i).children().eq(0).text()))
                    {
                        $(this).children().eq(0).children().eq(i).show();
                    }
                    else {
                        $(this).children().eq(0).children().eq(i).hide();
                    }
                }
                //var tr = $("<tr>");
                var td = $("<span>");     
			$("<input>").text("首页").src("../images/first.gif").attr("type", "image").click(function () {
                $(this).parent().remove();
                tab.setPage(size, 1);
            }).appendTo(td);
            $("<a>").text("上一页").attr("href", "#").click(function () {
                $(this).parent().remove();
                
                        tab.setPage(size, index>1?index-1:index);                  
            }).appendTo(td);
            $("<a>").text("下一页").attr("href", "#").click(function () {
                       $(this).parent().remove();
                        tab.setPage(size, index<totle?index+1:index);
            }).appendTo(td);

            $("<a>").text("尾页").attr("href", "#").click(function () {
                    $(this).parent().remove();
                    tab.setPage(size, totle);
                    
                }).appendTo(td);
                td.appendTo("body");                
        }
    });
})


//1.数据  2.
//分页
$(function () {
    $.fn.extend({
//   function mypage(index) {
//            var tab = $("#userTable");
//    $.cursomAjax("../UserService/UsersService.asmx/GetMenuAll", null, function (d) {
//        var str = {
//            cols: { "ID": "编号", "MenuName": "姓名" ,"aaa":"操作"},
//            data: d,
//            ops: [{
//                title: "删除",
//                url: "../UserService/UsersService.asmx/GetUserAll",
//            }, {
//                title: "修改",
//                url: "EditUser.htm?data=" + Math.random(),
//            }],
//            id: "ID",
//            index: index,
//            size: 3
//        }
//        tab.AllModelPage(str, mypage, function (d,row) {
//            $(row).children().eq(0).text(d.a);
//        });
//    });
//}
//        $(function () {
//            mypage(2);
//        })
        //var str = {
        //    cols: { "ID": "编号", "MenuName": "姓名" ,"aaa":"操作"},
        //    data: d,
        //    ops: [{
        //        title: "删除",
        //        url: "../UserService/UsersService.asmx/GetUserAll",
		//type:"<input type='button' value=''>"
        //        parms : "id"
        //    }, {
        //        title: "修改",
        //        url: "EditUser.htm?data=" + Math.random(),
        //       parms : "id"
        //    }],
        //    id: "ID",
        //    index: index,
        //    size: 3
        //}
        //tab.AllModelPage(str,mypage);
        //cols 要显示的列(多加一列显示操作符)
        //data 数据
        //ops 操作符
        //id 找到此表的id并根据id分页
        //index 页码
        //parms 参数的名字 不写 默认对应方法种参数名为"id"
        //size 大小
        //title操作符的文本值
        //url 页面的访问路径
        //id 根据哪一列进行分页(最好是主键)
        //callback 回调函数
        //upcallback 修改的回调函数(第一个值是数据，第二个值是当前行对象)

        AllModelPage: function (pamater, callback,upcallback) {      
            var object = $(this);
            object.empty();
            var count = pamater.data.length;
            var index = pamater.index;
            var size = pamater.size;
            var totle = count % size == 0 ? count / size : count / size + 1;            
            var tr = $("<tr>");
            ///添加表头
            $.each(pamater.cols, function (k, v) {
                $("<td>").text(v).css(pamater.cssStyle == null ? { "color": "black" } : pamater.cssStyle).appendTo(tr);
            });
            tr.appendTo(object);
            var list = [];
          
            //循环数据根据页面拿到当前页的应有的id值
            $.each(pamater.data, function (i, j) {
                if (i+1>=(index-1)*size+1 && i+1<=index*size) {
                    list.push(j[pamater.id]);
                }        
            });

            //添加数据
            $.each(pamater.data, function (k, v) {
                var tr2 = $("<tr>");
                if (list.indexOf(v[pamater.id]) > -1) {
                    //添加数据行
                    $.each(v, function (i,j) {//循环所有对象里面的键跟值
                        $.each(pamater.cols, function (m, n) {
                            if (i == m) {//判断列里面有没有相应的列名 
                                $("<td>").text(j).css(pamater.cssStyle == null ? { "color": "black" } : pamater.cssStyle).appendTo(tr2);
                            }
                        });
                    })

                    //添加操作符
                    if (pamater.ops != null) {
                        var td = $("<td>");
                        $.each(pamater.ops, function (i, j) {
                            if (j.title=="删除") {
                                $(j.type==undefined || j.type=="a"?"<a>":j.type ).attr("href", "#").attr("del", v[pamater.id]).text(j.title).click(function () {
                                    if (confirm('你确定要删除吗？')) {
										var row = $(this).parent().parent();  //移除当前的行                   
                                        var parm = j.parms;
                                        $.cursomAjax(j.url, parm == undefined ? { "id": $(this).attr("del") } : { parm: $(this).attr("del") }, function (d) {
                                            if (d > 0) {
                                                row.remove();
                                            }
                                        });
                                    }
                                }).appendTo(td);
                            } else if (j.title=="修改") {
                                $(j.type == undefined || j.type == "a" ? "<a>" : j.type).attr("href", "#").attr("up", v[pamater.id]).text(j.title).click(function () {
                                    if (upcallback != undefined) {
                                        var parm = j.parms;
                                        var row = $(this).parent().parent();
                                        $.showModalDialog(j.url, parm == undefined ? { "id": $(this).attr("up") } : { parm: $(this).attr("up") }, 600, 300, function (d) {
                                            upcallback(d,row);
                                        });
                                    }
                                }).appendTo(td);                              
                            }
                        });
                        td.appendTo(tr2);
                    }
                }
                tr2.appendTo(object);
            })
            //跳转
            var cb = callback;
            var div = $("<div id='yangDiv'>");

            $("<a href='#'>首页</a>").click(
                function () {
                    $(this).parent().remove();
                    cb(1);
                }
              ).appendTo(div);

            $("<a href='#'>上一页</a>").click(
                function () {
                    $(this).parent().remove();
                    cb(index > 1 ? index - 1 : 1);
                }
                ).appendTo(div);

            $("<a href='#'>下一页</a>").click(function () {
                $(this).parent().remove();
                    cb(index<Math.floor(totle)?index+1:index);
               
            }).appendTo(div);

            $("<a href='#'>尾页</a>").click(function () {
                $(this).parent().remove();
                cb(Math.floor(totle));
            }).appendTo(div);

            $("<span></span>").text("第"+index+"页/共"+Math.floor(totle)+"页").appendTo(div)
            var sel = $("<select>").change(function () {
                $(this).parent().remove();
                callback($(this).val());
            });
            for (var i = 1; i <= Math.floor(totle) ; i++) {
                if (i==index) {
                    $("<option selected='selected'>").val(i).text(i).appendTo(sel);
                } else {
                    $("<option>").text(i).appendTo(sel);
                }
                
            }
            sel.appendTo(div);
            div.insertAfter(object);
           
        }
    })
})