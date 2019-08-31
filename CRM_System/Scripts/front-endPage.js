;(function($, window, document,undefined) {
  var cjjTable = function(ele,opt){
        this.$element = ele,
        this.defaults ={
              title:null,
              body:null,
              display:null,
              pageNUmber:8,
              pageLength:0,
              url:null,
              operation:0,
              dbTrclick:function(e,ar){

              },
              buttonSave:function(ar){

              },
              buttonRemove:function(ar){

              }
        }
        this.options = $.extend({},this.defaults,opt)
  }
  var maxpagenumberBoxRemove,jsonRemove,eRemove;
  cjjTable.prototype = {
        start:function(){
            var _this = this;
            var titlelistBox="";
            var titlesmall=_this.options.operation==0?"":"<th style='width:160px;'><input type='checkbox' name='checkBoth' class='cjjTable-checkBoth' style='display:none'><button class='cjjTable-edit'>编辑</button></th>";
            for(var i=0;i<_this.options.title.length;i++){
                titlesmall+="<th>"+_this.options.title[i]+"</th>";
                titlelistBox = titlesmall;
            }
            var json = "";
            var maxpagenumberBox = 5;//选择项最多的数量
            var json = this.options.url;
            var histroy_DDBox = "";
            var histroy_DD ="";
            var firstPageNumber=json.length>_this.options.pageNUmber?_this.options.pageNUmber:json.length;
            for (var i = 0; i <firstPageNumber; i++) {
                var bodyBigBox="";
                var bodyBox=_this.options.operation==0?"":"<td style='width:160px;'><input type='checkbox' name='checkList' class='cjjTable-checkList' style='display:none'><button class='cjjTable-change' style='display:none;'>更改</button><button class='cjjTable-remove' style='display:none;'>删除</button><button class='cjjTable-save' style='display:none;'>保存</button><button class='cjjTable-cancel' style='display:none;'>取消</button></td>";
                for(var x=0;x<_this.options.body.length;x++){
                    var type = _this.options.body[x];
                    var display = "table-cell";
                    if(_this.options.body.length>_this.options.title.length&&_this.options.display[x]!=undefined){
                        display = _this.options.display[x]*1==1?"table-cell":"none";
                    }
                    bodyBox+="<td data-html='"+json[i][type]+"' class='"+type+"' style='display:"+display+"'>"+json[i][type]+"</td>";
                    bodyBigBox = bodyBox;
                }
                histroy_DD +="<tr data-number='"+i+"' class='new_productBox'>"+bodyBigBox+"</tr>";
                histroy_DDBox = histroy_DD;
            }
            $( _this.$element.selector+" table tfoot").html("");
            if (Math.ceil(json.length/ _this.options.pageNUmber) == 1) {
                $( _this.$element.selector+" .nextPage").css("display", "none");
                $(_this.$element.selector+" .endPage").css("display", "none");
            }
            var maxpagenumberBoxBigbox = "";
            var maxpagenumberBoxBig = "";
            if (Math.ceil(json.length/ _this.options.pageNUmber) < maxpagenumberBox) {
                for (var i = 0; i < Math.ceil(json.length/ _this.options.pageNUmber); i++) {
                    var  className = "";
                    if(i==0){
                       className = "pagenumberBoxLi";
                    }
                    maxpagenumberBoxBig += '<li class="'+className+'">' + (i * 1 + 1) + '</li>';
                    maxpagenumberBoxBigbox = maxpagenumberBoxBig;
                }
            } else {
                for (var i = 0; i < maxpagenumberBox; i++) {
                    var  className = "";
                    if(i==0){
                       className = "pagenumberBoxLi";
                    }
                    maxpagenumberBoxBig += '<li class="'+className+'">' + (i * 1 + 1) + '</li>';
                    maxpagenumberBoxBigbox = maxpagenumberBoxBig;
                }
            }
            var buttonTfoot = "<tr>"+
            "<td  colspan='"+_this.options.title.length+"'>"+
                "<div style='float:right;margin-left:10px;' class='tfootRight'>"+
                    "<input  placeholder='输入页码' type='text'>"+
                    "<button>确定</button>"+
                    "</div>"+
                    "<div style='float:right'>"+
                        "<span class='firstPage' style='margin-right:10px;cursor: pointer;float:left;display: none;margin-left:10px;'>首页</span>"+
                        "<span class='lastPage' style='margin-right:10px;cursor: pointer;float:left;display: none;'>上一页</span>"+
                        "<ul class='pagenumberBox'>"+maxpagenumberBoxBigbox+"</ul>"+
                        "<input class='typeNumber' type='text' value='1' onfocus='this.blur()' style='display:none;width:20px;height:20px;text-align:center;line-height:20px;border:1px solid #666;margin-right:5px;float:left;margin-top:2.5px;'>"+
                        "<span class='nextPage' style='margin-right:10px;float:left;cursor: pointer;'>下一页</span>"+
                        "<span class='endPage' style='cursor: pointer;float:left;'>尾页</span>"+
                    "</div>"+
                    "<div style='float:right'>"+
                          "<select><option value='5'>5</option><option value='10'>10</option><option value='20'>20</option><option value='50'>50</option><option value='100'>100</option><option value='200'>200</option><option value='500'>500</option></select>"
                    "</div>"+
                "</div>"
            "<td>"+
            "<tr>";
            _this.$element.html("<table class='CJJ-Table'><thead>"+titlelistBox+"</thead><tbody>"+histroy_DDBox+"</tbody><tfoot>"+buttonTfoot+"</tfoot></table>");
            $(_this.$element.selector+ ' select').val(_this.options.pageNUmber);
            if(Math.ceil(json.length/_this.options.pageNUmber)<2){
                $(_this.$element.selector+ ' .endPage').hide();
                $(_this.$element.selector+ ' .nextPage').hide();
            }
            $(_this.$element.selector+ ' .tfootRight input').unbind('keyup').keyup(function(){
                _this.inputKeyup(_this,maxpagenumberBox,json);
            })
            $(_this.$element.selector+ ' .tfootRight button').unbind('click').click(function(){
                  _this.button(_this,maxpagenumberBox,json);
            });
            $(_this.$element.selector+ ' .firstPage').unbind('click').click(function(){
                  _this.firstPage(_this,maxpagenumberBox,json);
            });
            $(_this.$element.selector+ ' .endPage').unbind('click').click(function(){
                  _this.endPage(_this,maxpagenumberBox,json);
            });
            $(_this.$element.selector+ ' .nextPage').unbind('click').click(function(){
                  _this.nextPage(_this,maxpagenumberBox,json);
            });
            $(_this.$element.selector+ ' table tfoot ul li').unbind('click').click(function(){
                  _this.nextTableLi(_this,maxpagenumberBox,json,$(this));
            });
            $(_this.$element.selector+ ' .lastPage').unbind('click').click(function(){
                  _this.lastPage(_this,maxpagenumberBox,json);
            });
            $(_this.$element.selector+ ' select').unbind('change').change(function(){
                  _this.select(_this,maxpagenumberBox,json,$(this));
            });
            $(_this.$element.selector+' .cjjTable-change').unbind('click').click(function(){
                  _this.trChange(_this,$(this));
            });
            $(_this.$element.selector+' .cjjTable-remove').unbind('click').click(function(){
                maxpagenumberBoxRemove = maxpagenumberBox;
                jsonRemove = json;
                eRemove = _this;
                var listnumberRemove = $(this).parents('tr').attr('data-number');
                var jsonList = new Array();
                jsonList.push(jsonRemove[listnumberRemove]);
                $(_this.$element.selector).find("input[name='checkList']").removeAttr('checked');
                var x = $(this).index(_this.$element.selector+' .cjjTable-remove');
                $(_this.$element.selector).find("input[name='checkList']").get(x).checked=true; 
                $(_this.$element.selector).find("input[name='checkBoth']").removeAttr('checked');
                _this.options.buttonRemove(jsonList);

            });
            $(_this.$element.selector+' .cjjTable-edit').unbind('click').click(function(){
                if($(this).html()=="编辑"){
                    $(_this.$element.selector+" .cjjTable-change").show();
                    $(_this.$element.selector+" .cjjTable-remove").show();
                    $(_this.$element.selector+" .cjjTable-checkBoth").show();
                    $(_this.$element.selector+" .cjjTable-checkList").show();
                    $(_this.$element.selector+" thead th").eq(0).append("<button class='cjjTable-removeBoth'>批量删除</button>");
                    $(this).html("完成");
                    $(_this.$element.selector+" .cjjTable-removeBoth").unbind("click").click(function(){
                        maxpagenumberBoxRemove = maxpagenumberBox;
                        jsonRemove = json;
                        eRemove = _this;
                        var checks = document.getElementsByName("checkList");
                        var n=0;
                        var jsonList = new Array();
                        for(var i=0;i<$(_this.$element.selector+" .cjjTable-checkList").length;i++){
                            if(checks[i].checked){
                                var listnumberRemove = $(_this.$element.selector+" .cjjTable-checkList").eq(i).parents("tr").attr("data-number");
                                jsonList.push(jsonRemove[listnumberRemove-n])
                                n++;
                            }
                        };
                        _this.options.buttonRemove(jsonList);
                    })
                }else if($(this).html()=="完成"){
                    var display = "none";
                    for(var i=0;i<$(_this.$element.selector+" .cjjTable-save").length;i++){
                        if($(_this.$element.selector+" .cjjTable-save").eq(i).css("display")=="inline-block"){
                            display = "inline-block";
                        }
                    }
                    if(display!="none"){
                        $("body").append('<div id="Cjj-messageBigBox"></div>');
                        $("#Cjj-messageBigBox").show();
                        $("#Cjj-messageBigBox").html('<div id="Cjj-messageBox"><span id="Cjj-messageBoxClosed" style="float: right;margin-right: 10px;margin-top: 8px;cursor: pointer;">X</span><div class="clearfix"></div><p>您有修改的类目没保存，是否保存</p><button style="float:left;margin-left:20%;width:26%;" id="CJJ-save">保存</button><button style="float:right;margin-right:20%;width:26%;" id="CJJ-cancel">不保存</button></div>')
                        $("#Cjj-messageBox").animate({size: "1"}, {
                            step: function (now, fx) {
                                $("#Cjj-messageBox").css({"transform": "scale(" + now + ")"});
                                $("#Cjj-messageBox").css({"-webkit-transform": "scale(" + now + ")"});
                                $("#Cjj-messageBox").css({"-moz-transform": "scale(" + now + ")"});
                                $("#Cjj-messageBox").css({"-o-transform": "scale(" + now + ")"});
                                $("#Cjj-messageBox").css({"-ms-transform": "scale(" + now + ")"});
                                $("#Cjj-messageBox").css({"opacity": "1"});
                            },
                            duration: 200
                        });
                        $("#Cjj-messageBoxClosed").unbind("click").click(function () {
                            $("#Cjj-messageBigBox").remove();
                        })
                        $("#CJJ-save").unbind("click").click(function () {
                            $("#Cjj-messageBigBox").remove();
                            $(_this.$element.selector+" .cjjTable-save").hide();
                            $(_this.$element.selector+" .cjjTable-cancel").hide();
                            $(_this.$element.selector+" .cjjTable-change").hide();
                            $(_this.$element.selector+" .cjjTable-remove").hide();
                            $(_this.$element.selector+" .cjjTable-checkBoth").hide();
                            $(_this.$element.selector+" .cjjTable-checkList").hide();
                            $(_this.$element.selector+" .cjjTable-removeBoth").remove();
                            $(_this.$element.selector).find("input[name='checkList']").removeAttr('checked');
                            $(_this.$element.selector).find("input[name='checkBoth']").removeAttr('checked');
                            $(_this.$element.selector+' .cjjTable-edit').html("编辑");
                            var numberList = new Array();
                            for(var i=0;i<$(_this.$element.selector+" .new_productBox").length;i++){
                                if($(_this.$element.selector+" .new_productBox").eq(i).find("input[type='text']").length>0){
                                    numberList.push(i)
                                }
                            }
                            _this.trSave(_this,numberList,0);
                        })
                        $("#CJJ-cancel").unbind("click").click(function () {
                            $("#Cjj-messageBigBox").remove();
                            $(_this.$element.selector+" .cjjTable-save").hide();
                            $(_this.$element.selector+" .cjjTable-cancel").hide();
                            $(_this.$element.selector+" .cjjTable-change").hide();
                            $(_this.$element.selector+" .cjjTable-remove").hide();
                            $(_this.$element.selector+" .cjjTable-checkBoth").hide();
                            $(_this.$element.selector+" .cjjTable-checkList").hide();
                            $(_this.$element.selector+" .cjjTable-removeBoth").remove();
                            $(_this.$element.selector).find("input[name='checkList']").removeAttr('checked');
                            $(_this.$element.selector).find("input[name='checkBoth']").removeAttr('checked');
                            $(_this.$element.selector+' .cjjTable-edit').html("编辑");
                            var numberList = new Array();
                            for(var i=0;i<$(_this.$element.selector+" .new_productBox").length;i++){
                                if($(_this.$element.selector+" .new_productBox").eq(i).find("input[type='text']").length>0){
                                    numberList.push(i)
                                }
                            }
                            _this.trCancel(_this,numberList,0);
                        })
                    }else{
                        $(_this.$element.selector+" .cjjTable-change").hide();
                        $(_this.$element.selector+" .cjjTable-remove").hide();
                        $(_this.$element.selector+" .cjjTable-checkBoth").hide();
                        $(_this.$element.selector+" .cjjTable-checkList").hide();
                        $(_this.$element.selector+" .cjjTable-removeBoth").remove();
                        $(_this.$element.selector).find("input[name='checkList']").removeAttr('checked');
                        $(_this.$element.selector).find("input[name='checkBoth']").removeAttr('checked');
                        $(this).html("编辑");
                    }
                } 
            })
            $(_this.$element.selector+' .cjjTable-checkBoth').unbind('click').click(function(){
                 if($(_this.$element.selector+' .cjjTable-checkBoth').is(':checked')){
                    for(var i=0;i<$(_this.$element.selector+" .cjjTable-checkList").length;i++){
                        $(_this.$element.selector).find("input[name='checkList']").get(i).checked=true; 
                    };
                 }else{
                      $(_this.$element.selector).find("input[name='checkList']").removeAttr('checked');
                 }
            })
            $(_this.$element.selector+ ' tbody tr').unbind('dblclick').dblclick(function(){
                debugger;
                var array = new Array();
                for(var i=0;i<$(this).find("td").length;i++){
                    if(_this.options.operation==1){
                        if(i>0){
                            array.push($(this).find("td").eq(i).html());
                        }
                    }else if(_this.options.operation==0){
                        array.push($(this).find("td").eq(i).html());
                    }
                }
                if($(this).find("input").length==1){
                      _this.options.dbTrclick($(this),array);
                }
            });
        },
        inputKeyup:function(e,maxpagenumberBox,json){
            var val = $(e.$element.selector+ " .tfootRight input").val();
            if (val == 0) {
                var val2 = val.replace(0, "");
            } else if (val > 0 && val <= Math.ceil(json.length / e.options.pageNUmber)) {
                var val2 = val.replace(/[^0-9]/g, "");
            } else if (val > Math.ceil(json.length/ e.options.pageNUmber)) {
                var val2 = Math.ceil(json.length / e.options.pageNUmber);
            }
            $(e.$element.selector+ ' .tfootRight input').val(val2);
        },
        trChange:function(e,that){
            for(var i=0;i<that.parents(e.$element.selector+" tbody tr").find("td").length;i++){
                if(i==0){
                    that.parents(e.$element.selector+" tbody tr").find("td").eq(i).find(".cjjTable-change").hide();
                    that.parents(e.$element.selector+" tbody tr").find("td").eq(0).find(".cjjTable-remove").hide();
                    that.parents(e.$element.selector+" tbody tr").find("td").eq(i).find(".cjjTable-save").show();
                    that.parents(e.$element.selector+" tbody tr").find("td").eq(i).find(".cjjTable-cancel").show();
                }else if(i>0){
                    var html = that.parents(e.$element.selector+" tbody tr").find("td").eq(i).html();
                    that.parents(e.$element.selector+" tbody tr").find("td").eq(i).html("<input type='text' value='"+html+"'>");
                }
            }  
            $(e.$element.selector+' .cjjTable-cancel').unbind('click').click(function(){
                var numberList = new Array();
                var x = $($(e.$element.selector+' .cjjTable-cancel')).index(this);
                numberList.push(x);
                e.trCancel(e,numberList,1);
            })
            $(e.$element.selector+' .cjjTable-save').unbind('click').click(function(){
                var numberList = new Array();
                var x = $($(e.$element.selector+' .cjjTable-save')).index(this);
                numberList.push(x);
                e.trSave(e,numberList,1);
            })
        },
        trSave:function(e,list,type){
            var newArryBox = new Array();
            for(var x=0;x<list.length;x++){
                var newarray = new Object();
                for(var i=0;i<$(e.$element.selector+" tbody tr").eq(list[x]).find("td").length;i++){
                    if(i>0){
                        var html = $(e.$element.selector+" tbody tr").eq(list[x]).find("td").eq(i).find("input").val();
                        if(html.length==0){
                            e.message("请修改正确数据");
                            return false;
                        }
                        $(e.$element.selector+" tbody tr").eq(list[x]).find("td").eq(i).html(html);
                        $(e.$element.selector+" tbody tr").eq(list[x]).find("td").eq(i).attr("data-html",html);
                        newarray[i] = html;
                    }
                }
                if(type==1){
                    $(e.$element.selector+" tbody tr").eq(list[x]).find("td").eq(0).find(".cjjTable-change").show();
                    $(e.$element.selector+" tbody tr").eq(list[x]).find("td").eq(0).find(".cjjTable-remove").show();
                    $(e.$element.selector+" tbody tr").eq(list[x]).find("td").eq(0).find(".cjjTable-save").hide();
                    $(e.$element.selector+" tbody tr").eq(list[x]).find("td").eq(0).find(".cjjTable-cancel").hide();
                }
                newArryBox.push(newarray)
            }
            e.options.buttonSave(newArryBox);
        },
        trCancel:function(e,list,type){
            for(var x=0;x<list.length;x++){
                for(var i=0;i<$(e.$element.selector+" tbody tr").eq(list[x]).find("td").length;i++){
                    if(i==0){
                        if(type==1){
                            $(e.$element.selector+" tbody tr").eq(list[x]).find("td").eq(i).find(".cjjTable-change").show();
                            $(e.$element.selector+" tbody tr").eq(list[x]).find("td").eq(0).find(".cjjTable-remove").show();
                            $(e.$element.selector+" tbody tr").eq(list[x]).find("td").eq(i).find(".cjjTable-save").hide();
                            $(e.$element.selector+" tbody tr").eq(list[x]).find("td").eq(i).find(".cjjTable-cancel").hide();
                        }
                        
                    }else if(i>0){
                        var html = $(e.$element.selector+" tbody tr").eq(list[x]).find("td").eq(i).attr("data-html");
                        $(e.$element.selector+" tbody tr").eq(list[x]).find("td").eq(i).html(html);
                    }
                }
            }   
        },
        message:function(index){
            $("body").append('<div id="Cjj-messageBigBox"></div>');
            $("#Cjj-messageBigBox").show();
            $("#Cjj-messageBigBox").html('<div id="Cjj-messageBox"><span id="Cjj-messageBoxClosed" style="float: right;margin-right: 10px;margin-top: 8px;cursor: pointer;">X</span><div class="clearfix"></div><p>' + index + '</p><button>我知道了</button></div>')
            $("#Cjj-messageBox").animate({size: "1"}, {
                step: function (now, fx) {
                    $("#Cjj-messageBox").css({"transform": "scale(" + now + ")"});
                    $("#Cjj-messageBox").css({"-webkit-transform": "scale(" + now + ")"});
                    $("#Cjj-messageBox").css({"-moz-transform": "scale(" + now + ")"});
                    $("#Cjj-messageBox").css({"-o-transform": "scale(" + now + ")"});
                    $("#Cjj-messageBox").css({"-ms-transform": "scale(" + now + ")"});
                    $("#Cjj-messageBox").css({"opacity": "1"});
                },
                duration: 200
            });
            $("#Cjj-messageBox button,#Cjj-messageBoxClosed").unbind("click").click(function () {
                $("#Cjj-messageBigBox").remove();
            })
        },
        button:function(e,maxpagenumberBox,json){
            var val = $(e.$element.selector+ ' .tfootRight input').val();
            $(e.$element.selector+ " .typeNumber").val(val);
            if (val != "") {
                e.page(maxpagenumberBox,json, e);
            }
        },
        firstPage:function(e,maxpagenumberBox,json){
            $(e.$element.selector+ " .typeNumber").val(1);
            e.page(maxpagenumberBox,json, e);
        },
        endPage:function(e,maxpagenumberBox,json){
            $(e.$element.selector+ " .typeNumber").val(Math.ceil(json.length / e.options.pageNUmber));
            e.page(maxpagenumberBox,json, e);
        },
        nextPage:function(e,maxpagenumberBox,json){
            var number = $(e.$element.selector+ " .typeNumber").val();
            $(e.$element.selector+ " .typeNumber").val(number * 1 + 1);
            e.page(maxpagenumberBox,json, e);
        },
        nextTableLi:function(e,maxpagenumberBox,json,that){
            var val = that.html();
            $(e.$element.selector+ " .typeNumber").val(val);
            e.page(maxpagenumberBox,json, e);
        },
        lastPage:function(e,maxpagenumberBox,json){
            var number = $(e.$element.selector+ " .typeNumber").val();
            if (number > 1) {
                $(e.$element.selector+ " .typeNumber").val(number * 1 - 1);
                e.page(maxpagenumberBox,json, e);
            }
        },
        select:function(e,maxpagenumberBox,json,that){
           var select =  that.find("option:selected").val();
           $(e.$element.selector+ " .typeNumber").val(1); 
           e.options.pageNUmber = select;
           e.page(maxpagenumberBox,json, e);
        },
        page:function(maxpagenumberBox,json,e) {
            $(e.$element.selector).find("input[name='checkBoth']").removeAttr('checked');
            var histroy_DDBox = "";
            var histroy_DD = "";
            var pageNUmber = e.options.pageNUmber;
            var that = e.$element;
            var Pagenumber = $(e.$element.selector+ " .typeNumber").val();
            var jsonLength = json.length==0?1:json.length;
            var lastPage=Pagenumber<Math.ceil(jsonLength / pageNUmber)?Pagenumber*pageNUmber:jsonLength;
            $(e.$element.selector+ " .typeNumber").val(Pagenumber<Math.ceil(jsonLength / pageNUmber)?Pagenumber:Math.ceil(jsonLength / pageNUmber));
            Pagenumber = Pagenumber<Math.ceil(jsonLength / pageNUmber)?Pagenumber:Math.ceil(jsonLength / pageNUmber);
            var buttonDispiay = $(that.selector+" .cjjTable-edit").html()=="完成"?"inline-block":"none";
            if(json.length>0){
                for (var i =(Pagenumber-1)*pageNUmber; i < lastPage; i++) {
                    var bodyBigBox="";
                    var bodyBox=e.options.operation==0?"":"<td style='width:160px'><input type='checkbox' name='checkList' class='cjjTable-checkList' style='display:"+buttonDispiay+"'><button class='cjjTable-change' style='display:"+buttonDispiay+";'>更改</button><button class='cjjTable-remove' style='display:"+buttonDispiay+";'>删除</button><button class='cjjTable-save' style='display:none;'>保存</button><button class='cjjTable-cancel' style='display:none;'>取消</button></td>";
                    for(var x=0;x<e.options.body.length;x++){
                        var type = e.options.body[x];
                        var display = "table-cell";
                        if(e.options.body.length>e.options.title.length&&e.options.display[x]!=undefined){
                            display = e.options.display[x]*1==1?"table-cell":"none";
                        }
                        bodyBox+="<td data-html='"+json[i][type]+"' class='"+type+"'  style='display:"+display+"'>"+json[i][type]+"</td>";
                        bodyBigBox = bodyBox;
                    }
                    histroy_DD +="<tr data-number='"+i+"' class='new_productBox'>"+bodyBigBox+"</tr>";
                    histroy_DDBox = histroy_DD;
                }
                $(that.selector+" table tbody").html(histroy_DD);
            }else{
                $(that.selector+" table tbody").html("");
            }
            var maxpagenumberBoxBigbox = "";
            var maxpagenumberBoxBig = "";
            if (Math.ceil(jsonLength/ e.options.pageNUmber) < maxpagenumberBox) {
                for (var i = 0; i < Math.ceil(jsonLength/ e.options.pageNUmber); i++) {
                    var  className = "";
                    if(i==0){
                       className = "pagenumberBoxLi";
                    }
                    maxpagenumberBoxBig += '<li class="'+className+'">' + (i * 1 + 1) + '</li>';
                    maxpagenumberBoxBigbox = maxpagenumberBoxBig;
                }
            } else {
                for (var i = 0; i < maxpagenumberBox; i++) {
                    var  className = "";
                    if(i==0){
                       className = "pagenumberBoxLi";
                    }
                    maxpagenumberBoxBig += '<li class="'+className+'">' + (i * 1 + 1) + '</li>';
                    maxpagenumberBoxBigbox = maxpagenumberBoxBig;
                }
            }
            $(that.selector+" table tfoot ul").html(maxpagenumberBoxBigbox);
            if (Pagenumber == 1) {
                $(that.selector+" .firstPage,"+that.selector+" .lastPage").hide();
            } else {
                $(that.selector+" .firstPage,"+that.selector+" .lastPage").show();
            }
            if (Pagenumber == Math.ceil(jsonLength / pageNUmber)) {
                $(that.selector+" .endPage,"+that.selector+" .nextPage").hide();
            } else {
                $(that.selector+" .endPage,"+that.selector+" .nextPage").show();
            }
            if (Math.ceil(jsonLength/ pageNUmber) > maxpagenumberBox) {
                if (Pagenumber > 0 && Pagenumber < Math.ceil(maxpagenumberBox / 2) * 1 + 1) {
                    maxpagenumberBoxBigbox = "";
                    maxpagenumberBoxBig = "";
                    for (var i = 0; i < maxpagenumberBox; i++) {
                        maxpagenumberBoxBig += '<li>' + (i * 1 + 1) + '</li>';
                        maxpagenumberBoxBigbox = maxpagenumberBoxBig;
                    }
                    $(that.selector+" .pagenumberBox").html(maxpagenumberBoxBigbox);
                    $(that.selector+' .pagenumberBox li').eq(Pagenumber - 1).addClass('pagenumberBoxLi');
                } else if (Pagenumber >= Math.ceil(maxpagenumberBox / 2) * 1 + 1 && Pagenumber < Math.ceil(jsonLength / pageNUmber) - Math.ceil(maxpagenumberBox / 2) + 2) {
                    maxpagenumberBoxBigbox = "";
                    maxpagenumberBoxBig = "";
                    for (var i = Pagenumber - Math.ceil(maxpagenumberBox / 2) + 1; i < Pagenumber * 1 + Math.ceil(maxpagenumberBox / 2) * 1; i++) {
                        maxpagenumberBoxBig += '<li>' + (i) + '</li>';
                        maxpagenumberBoxBigbox = maxpagenumberBoxBig;
                    }
                    $(that.selector+" .pagenumberBox").html(maxpagenumberBoxBigbox);
                    $(that.selector+' .pagenumberBox li').eq(Math.ceil(maxpagenumberBox / 2) - 1).addClass('pagenumberBoxLi');
                } else if (Pagenumber >= Math.ceil(jsonLength / pageNUmber) - Math.ceil(maxpagenumberBox / 2) + 2 && Pagenumber <= Math.ceil(jsonLength/ pageNUmber)) {
                    maxpagenumberBoxBigbox = "";
                    maxpagenumberBoxBig = "";
                    for (var i = Math.ceil(jsonLength / pageNUmber) - maxpagenumberBox; i < Math.ceil(jsonLength / pageNUmber); i++) {
                        maxpagenumberBoxBig += '<li>' + (i * 1 + 1) + '</li>';
                        maxpagenumberBoxBigbox = maxpagenumberBoxBig;
                    }
                    $(that.selector+" .pagenumberBox").html(maxpagenumberBoxBigbox);
                    $(that.selector+' .pagenumberBox li').eq(Pagenumber - Math.ceil(jsonLength/ pageNUmber) + maxpagenumberBox * 1 - 1).addClass('pagenumberBoxLi');
                }
            } else {
                if (Pagenumber <= Math.ceil(jsonLength/ pageNUmber)) {
                    $(that.selector+' .pagenumberBox li').removeClass('pagenumberBoxLi');
                    $(that.selector+' .pagenumberBox li').eq(Pagenumber - 1).addClass('pagenumberBoxLi');
                }
            }
            $(that.selector+ ' table tfoot ul li').unbind('click').click(function(){
                  e.nextTableLi(e,maxpagenumberBox,json,$(this));
            });
            $(that.selector+ ' tbody tr').unbind('dblclick').dblclick(function(){
                var array = new Array();
                for(var i=0;i<$(this).find("td").length;i++){
                    if(e.options.operation==1){
                        if(i>0){
                            array.push($(this).find("td").eq(i).html());
                        }
                    }else if(e.options.operation==0){
                        array.push($(this).find("td").eq(i).html());
                    }
                }
                e.options.dbTrclick(array);
            });
            $(that.selector+' .cjjTable-change').unbind('click').click(function(){
                  e.trChange(e,$(this));
            });
            $(that.selector+' .cjjTable-remove').unbind('click').click(function(){
                maxpagenumberBoxRemove = maxpagenumberBox;
                jsonRemove = json;
                eRemove = e;
                var listnumberRemove = $(this).parents('tr').attr('data-number');
                var jsonList = new Array();
                jsonList.push(jsonRemove[listnumberRemove]);
                $(e.$element.selector).find("input[name='checkList']").removeAttr('checked');
                var x = $(this).index(e.$element.selector+' .cjjTable-remove');
                $(e.$element.selector).find("input[name='checkList']").get(x).checked=true; 
                $(e.$element.selector).find("input[name='checkBoth']").removeAttr('checked');
                e.options.buttonRemove(jsonList);
            });
        },
        reload:function(maxpagenumberBox,json,e){
            var checks = document.getElementsByName("checkList");
            var n=0;
            for(var i=0;i<$(e.$element.selector+" .cjjTable-checkList").length;i++){
                if(checks[i].checked){
                    var listnumberRemove = $(e.$element.selector+" .cjjTable-checkList").eq(i).parents("tr").attr("data-number");
                    json.splice(listnumberRemove-n,1);
                    n++;
                }
            };
            $(e.$element.selector).find("input[name='checkBoth']").removeAttr('checked');
            e.page(maxpagenumberBox,json,e);
        }

  }
  $.fn.CJJTable = function(options){
        var cjj = new cjjTable(this,options);
        $.fn.CJJReload = function(){
            return cjj.reload(maxpagenumberBoxRemove,jsonRemove,eRemove);
        }
        return cjj.start();
  }

})(jQuery, window, document);